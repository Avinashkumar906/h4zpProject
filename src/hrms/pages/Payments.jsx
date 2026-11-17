/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { inr, fmtDate, ymLabel } from '../lib/format';
import { monthStarted } from '../lib/payroll';
import { Badge, payTone } from '../components/ui';

export default function Payments({ db, results, months }) {
  const [view, setView] = useState('people');
  const [statusF, setStatusF] = useState('');
  const staff = db.staff;
  const started = months.map(monthStarted);
  const entries = [];
  months.forEach((m, i) => {
    if (!started[i]) return;
    staff.forEach((s) => {
      const r = results[s.id][i];
      if (r.onPayroll) entries.push({ s, r, m });
    });
  });
  const shown = entries.filter(
    (e) =>
      !statusF ||
      e.r.thisSalary === statusF ||
      (statusF === 'open' && ['Due', 'Partly paid'].includes(e.r.thisSalary)),
  );
  const opening = staff.reduce((t, s) => t + (Number(s.opening_due) || 0), 0);
  const totNet = entries.reduce((t, e) => t + e.r.net, 0) + opening,
    totPaid = entries.reduce((t, e) => t + e.r.paidAmt, 0);

  return (
    <div className="hr-page">
      <header className="hr-head">
        <div>
          <h1>Payment tracker</h1>
          <p className="hr-muted">
            Months up to today. Net payable {inr(totNet)} · paid {inr(totPaid)} ·{' '}
            <span className={totNet - totPaid > 0 ? 'hr-bad' : ''}>
              balance due {inr(totNet - totPaid)}
            </span>
          </p>
        </div>
        <div className="hr-seg">
          {[
            ['people', 'By employee'],
            ['all', 'Every payment'],
          ].map(([k, l]) => (
            <button key={k} className={view === k ? 'is-on' : ''} onClick={() => setView(k)}>
              {l}
            </button>
          ))}
        </div>
      </header>
      {view === 'people' ? (
        <div className="hr-table-wrap">
          <table className="hr-table hr-table--num hr-table--dense">
            <thead>
              <tr>
                <th className="hr-l">Employee</th>
                {months.map((m) => (
                  <th key={m.ym}>{m.label}</th>
                ))}
                <th>Total payable</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Months not fully paid</th>
              </tr>
            </thead>
            <tbody>
              {staff
                .filter((s) => results[s.id].some((r) => r.onPayroll) || Number(s.opening_due) > 0)
                .map((s) => {
                  const R = results[s.id];
                  const payable =
                    R.filter((r, i) => started[i]).reduce((t, r) => t + r.net, 0) +
                    (Number(s.opening_due) || 0);
                  const paid = R.reduce((t, r) => t + r.paidAmt, 0);
                  const open = R.filter((r) =>
                    ['Due', 'Partly paid'].includes(r.thisSalary),
                  ).length;
                  return (
                    <tr key={s.id}>
                      <td className="hr-l">
                        {s.name}
                        <small className="hr-sub">{s.emp_id}</small>
                      </td>
                      {R.map((r, i) => (
                        <td
                          key={r.ym}
                          className={
                            started[i] && r.emp > 0
                              ? `hr-cell--${(r.thisSalary || '').split(' ')[0].toLowerCase()}`
                              : 'hr-muted'
                          }
                        >
                          {started[i] && r.emp > 0 ? inr(r.net) : ''}
                        </td>
                      ))}
                      <td>{inr(payable)}</td>
                      <td>{inr(paid)}</td>
                      <td className={payable - paid > 0 ? 'hr-bad' : ''}>{inr(payable - paid)}</td>
                      <td>{open || '–'}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="hr-toolbar">
            <select
              className="hr-input"
              value={statusF}
              onChange={(e) => setStatusF(e.target.value)}
              aria-label="Filter"
            >
              <option value="">All salaries</option>
              <option value="open">Due or partly paid</option>
              <option>Paid</option>
              <option>Paid in later month</option>
              <option>Partly paid</option>
              <option>Due</option>
            </select>
          </div>
          <div className="hr-table-wrap">
            <table className="hr-table hr-table--num hr-table--dense">
              <thead>
                <tr>
                  <th className="hr-l">Month</th>
                  <th className="hr-l">Employee</th>
                  <th>Net payable</th>
                  <th>Brought fwd</th>
                  <th>Total payable</th>
                  <th className="hr-l">Status</th>
                  <th>Paid</th>
                  <th>Due (c/f)</th>
                  <th className="hr-l">Date</th>
                  <th className="hr-l">Mode</th>
                  <th className="hr-l">UTR</th>
                  <th className="hr-l">This month&apos;s salary</th>
                </tr>
              </thead>
              <tbody>
                {shown.map(({ s, r, m }) => (
                  <tr key={s.id + m.ym}>
                    <td className="hr-l">{ymLabel(m.ym)}</td>
                    <td className="hr-l">{s.name}</td>
                    <td>{inr(r.net)}</td>
                    <td>{inr(r.prevDue)}</td>
                    <td>{inr(r.totPay)}</td>
                    <td className="hr-l">
                      <Badge tone={payTone(r.payment.status)}>{r.payment.status}</Badge>
                    </td>
                    <td>{inr(r.paidAmt)}</td>
                    <td className={r.closeDue > 0 ? 'hr-bad' : ''}>{inr(r.closeDue)}</td>
                    <td className="hr-l">{r.payment.date ? fmtDate(r.payment.date) : '–'}</td>
                    <td className="hr-l">{r.payment.mode || '–'}</td>
                    <td className="hr-l">{r.payment.utr || '–'}</td>
                    <td className="hr-l">
                      {r.thisSalary ? (
                        <Badge tone={payTone(r.thisSalary)}>{r.thisSalary}</Badge>
                      ) : (
                        '–'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
/* eslint-disable react/prop-types */
