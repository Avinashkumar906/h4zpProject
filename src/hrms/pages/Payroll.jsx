/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { PAY_STATUSES, PAY_MODES } from '../lib/defaults';
import { inr, days, ymLabel } from '../lib/format';
import { MonthRibbon, Badge, payTone, Empty } from '../components/ui';
import logo from '../assets/logo.png';

export default function Payroll({ db, act, store, results, months, monthIdx, setMonthIdx, go }) {
  const mo = months[monthIdx];
  const [pay, setPay] = useState({});
  const [dirty, setDirty] = useState(new Set());
  useEffect(() => {
    const p = {};
    for (const s of db.staff) p[s.id] = { ...(db.payments[s.id]?.[mo.ym] || {}) };
    setPay(p);
    setDirty(new Set());
  }, [db, mo.ym]);
  const rows = db.staff
    .map((s) => ({ s, r: results[s.id][monthIdx] }))
    .filter(({ r }) => r.onPayroll);
  const setP = (sid, k, v) => {
    setPay((p) => ({ ...p, [sid]: { ...p[sid], [k]: v } }));
    setDirty((d) => new Set(d).add(sid));
  };
  const save = async () => {
    const out = [...dirty].map((sid) => ({ staff_id: sid, ym: mo.ym, data: pay[sid] }));
    if (await act((d) => store.savePayments(d, out), `Payments for ${ymLabel(mo.ym, true)} saved`))
      setDirty(new Set());
  };
  const markAll = () => {
    const today = new Date().toISOString().slice(0, 10);
    const p = { ...pay };
    const d = new Set(dirty);
    rows.forEach(({ s, r }) => {
      if (r.totPay > 0 && (p[s.id].status || 'Pending') === 'Pending') {
        p[s.id] = {
          ...p[s.id],
          status: 'Paid',
          date: p[s.id].date || today,
          mode: p[s.id].mode || s.payment_mode || 'Bank Transfer',
        };
        d.add(s.id);
      }
    });
    setPay(p);
    setDirty(d);
  };
  const T = (f) => rows.reduce((t, x) => t + (f(x.r) || 0), 0);
  const bankCsv = () => {
    const lines = [['S.No', 'Emp ID', 'Name', 'Bank', 'Account No', 'IFSC', 'Amount'].join(',')];
    rows
      .filter(({ r }) => r.totPay > 0)
      .forEach(({ s, r }, i) =>
        lines.push(
          [
            i + 1,
            s.emp_id,
            `"${s.name}"`,
            `"${s.bank_name || ''}"`,
            `="${s.bank_ac || ''}"`,
            s.ifsc || '',
            r.totPay,
          ].join(','),
        ),
      );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }));
    a.download = `H4ZP-bank-transfer-${mo.ym}.csv`;
    a.click();
  };

  return (
    <div className="hr-page">
      <header className="hr-head no-print">
        <div>
          <h1>Salary & payments — {ymLabel(mo.ym, true)}</h1>
          <p className="hr-muted">
            Salary is calculated from attendance and the Staff page. Record each payment here;
            anything unpaid carries to next month.
          </p>
        </div>
        <div className="hr-head__actions">
          <button className="hr-btn" onClick={markAll}>
            Mark pending as paid
          </button>
          <button className="hr-btn" onClick={bankCsv}>
            Bank transfer file (CSV)
          </button>
          <button className="hr-btn" onClick={() => window.print()}>
            Print register
          </button>
          <button className="hr-btn hr-btn--primary" disabled={!dirty.size} onClick={save}>
            {dirty.size ? 'Save payments' : 'Saved'}
          </button>
        </div>
      </header>
      <div className="no-print">
        <MonthRibbon
          months={months}
          value={monthIdx}
          onChange={(i) => {
            if (dirty.size && !window.confirm('Leave without saving payments?')) return;
            setMonthIdx(i);
          }}
          results={db.staff.map((s) => results[s.id])}
        />
      </div>
      {rows.length === 0 ? (
        <Empty title={`No one is on payroll in ${ymLabel(mo.ym, true)}`}>
          Provisional staff appear here once you confirm them on the Staff page.
        </Empty>
      ) : (
        <div className="print-area print-landscape">
          <div className="print-only hr-print-head">
            <img src={logo} alt="" />
            <div>
              <h2>{db.settings.org}</h2>
              <p>Salary register — {ymLabel(mo.ym, true)}</p>
            </div>
          </div>
          <div className="hr-table-wrap">
            <table className="hr-table hr-table--num hr-table--dense">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th className="hr-l">Name</th>
                  <th>Paid days</th>
                  <th>LOP</th>
                  <th>Fixed salary</th>
                  <th>Earned</th>
                  <th>OT + extras</th>
                  <th>Total earnings</th>
                  <th>PF</th>
                  <th>ESI</th>
                  <th>TDS</th>
                  <th>Other ded.</th>
                  <th>Net payable</th>
                  <th>Brought fwd</th>
                  <th>Total payable</th>
                  <th className="hr-l">Status</th>
                  <th>Partial</th>
                  <th>Paid</th>
                  <th>Due (c/f)</th>
                  <th className="hr-l no-print">Date · mode · UTR</th>
                  <th className="hr-l">This month&apos;s salary</th>
                  <th className="print-only">Signature</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ s, r }, i) => {
                  const p = pay[s.id] || {};
                  return (
                    <tr key={s.id}>
                      <td>{i + 1}</td>
                      <td className="hr-l">
                        <button className="hr-link" onClick={() => go('payslip')}>
                          {s.name}
                        </button>
                        <small className="hr-sub">
                          {s.emp_id} · {s.designation}
                        </small>
                      </td>
                      <td>{days(r.paid)}</td>
                      <td>{days(r.lop)}</td>
                      <td>{inr(r.gross)}</td>
                      <td>{inr(r.egross)}</td>
                      <td>{inr(r.otPay + r.arrears + r.bonus + r.incentive + r.otherEarn)}</td>
                      <td>
                        <b>{inr(r.totEarn)}</b>
                      </td>
                      <td>{inr(r.pfEE)}</td>
                      <td>{inr(r.esiEE)}</td>
                      <td>{inr(r.tds)}</td>
                      <td>{inr(r.pt + r.advance + r.otherDed + r.loanDed)}</td>
                      <td>
                        <b>{inr(r.net)}</b>
                      </td>
                      <td>{inr(r.prevDue)}</td>
                      <td>
                        <b>{inr(r.totPay)}</b>
                      </td>
                      <td className="hr-l">
                        <select
                          className="hr-input hr-input--small no-print"
                          value={p.status || 'Pending'}
                          onChange={(e) => setP(s.id, 'status', e.target.value)}
                          aria-label={`Payment status for ${s.name}`}
                        >
                          {PAY_STATUSES.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                        <span className="print-only">{p.status || 'Pending'}</span>
                      </td>
                      <td>
                        {p.status === 'Partial' ? (
                          <input
                            className="hr-input hr-input--small hr-input--num"
                            type="number"
                            min="0"
                            value={p.partial ?? ''}
                            onChange={(e) => setP(s.id, 'partial', e.target.value)}
                            aria-label="Partial amount"
                          />
                        ) : (
                          '–'
                        )}
                      </td>
                      <td>{inr(r.paidAmt)}</td>
                      <td className={r.closeDue > 0 ? 'hr-bad' : ''}>{inr(r.closeDue)}</td>
                      <td className="hr-l no-print">
                        <div className="hr-paycell">
                          <input
                            className="hr-input hr-input--small"
                            type="date"
                            value={p.date || ''}
                            onChange={(e) => setP(s.id, 'date', e.target.value)}
                            aria-label="Payment date"
                          />
                          <select
                            className="hr-input hr-input--small"
                            value={p.mode || ''}
                            onChange={(e) => setP(s.id, 'mode', e.target.value)}
                            aria-label="Mode"
                          >
                            <option value="">Mode</option>
                            {PAY_MODES.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                          <input
                            className="hr-input hr-input--small"
                            placeholder="UTR / ref"
                            value={p.utr || ''}
                            onChange={(e) => setP(s.id, 'utr', e.target.value)}
                            aria-label="UTR"
                          />
                        </div>
                      </td>
                      <td className="hr-l">
                        {r.thisSalary ? (
                          <Badge tone={payTone(r.thisSalary)}>{r.thisSalary}</Badge>
                        ) : (
                          '–'
                        )}
                      </td>
                      <td className="print-only" />
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  <td className="hr-l">Total — {rows.length} staff</td>
                  <td />
                  <td />
                  <td>{inr(T((r) => r.gross))}</td>
                  <td>{inr(T((r) => r.egross))}</td>
                  <td>
                    {inr(T((r) => r.otPay + r.arrears + r.bonus + r.incentive + r.otherEarn))}
                  </td>
                  <td>{inr(T((r) => r.totEarn))}</td>
                  <td>{inr(T((r) => r.pfEE))}</td>
                  <td>{inr(T((r) => r.esiEE))}</td>
                  <td>{inr(T((r) => r.tds))}</td>
                  <td>{inr(T((r) => r.pt + r.advance + r.otherDed + r.loanDed))}</td>
                  <td>{inr(T((r) => r.net))}</td>
                  <td>{inr(T((r) => r.prevDue))}</td>
                  <td>{inr(T((r) => r.totPay))}</td>
                  <td />
                  <td />
                  <td>{inr(T((r) => r.paidAmt))}</td>
                  <td>{inr(T((r) => r.closeDue))}</td>
                  <td className="no-print" />
                  <td />
                  <td className="print-only" />
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="hr-muted hr-small">
            Paid = clears this month and everything brought forward · Paid – This Month Only = only
            this month · Partial = type the amount (oldest dues are cleared first). Employer share
            this month: PF {inr(T((r) => r.eps + r.erEPF + r.edli))}, ESI {inr(T((r) => r.erESI))}.
          </p>
        </div>
      )}
    </div>
  );
}
/* eslint-disable react/prop-types */
