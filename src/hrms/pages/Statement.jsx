/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { inr, days, fmtDate, ymLabel, experienceText } from '../lib/format';
import { monthStarted, totalExperienceMonths, pccAlert, rateOn } from '../lib/payroll';
import { Select, Badge, payTone, Stat, statusTone } from '../components/ui';

export default function Statement({ db, results, months }) {
  const [sid, setSid] = useState(db.staff[0]?.id);
  const s = db.staff.find((x) => x.id === sid);
  if (!s)
    return (
      <div className="hr-page">
        <h1>Employee statement</h1>
        <p>No staff yet.</p>
      </div>
    );
  const R = results[s.id].filter((r, i) => monthStarted(months[i]) && r.onPayroll);
  const T = (f) => R.reduce((t, r) => t + f(r), 0);
  const payable = T((r) => r.net) + (Number(s.opening_due) || 0),
    paid = T((r) => r.paidAmt);
  const revs = db.revisions
    .filter((r) => r.staff_id === s.id)
    .sort((a, b) => (a.effective_from < b.effective_from ? -1 : 1));
  return (
    <div className="hr-page">
      <header className="hr-head no-print">
        <div>
          <h1>Employee statement</h1>
          <p className="hr-muted">Complete salary record of one person for the year.</p>
        </div>
        <div className="hr-head__actions">
          <Select
            value={sid}
            onChange={setSid}
            options={db.staff.map((x) => ({ value: x.id, label: `${x.emp_id} | ${x.name}` }))}
            aria-label="Employee"
          />
          <button className="hr-btn hr-btn--primary" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </header>
      <div className="print-area print-landscape">
        <div className="hr-print-head">
          <img src={logo} alt="" />
          <div>
            <h2>{s.name}</h2>
            <p>
              {s.emp_id} · {s.designation} · {s.department}
            </p>
          </div>
          <Badge tone={statusTone(s.status)}>{s.status}</Badge>
        </div>
        <dl className="hr-dl">
          {[
            ['Joined', fmtDate(s.doj)],
            ['Confirmed from', s.confirm_date ? fmtDate(s.confirm_date) : '—'],
            ['Left', s.dol ? fmtDate(s.dol) : '—'],
            ['Experience', experienceText(totalExperienceMonths(s))],
            ['Qualification', s.qualification || '—'],
            [
              'Current gross',
              inr(rateOn(s, db.revisions, new Date().toISOString().slice(0, 10)).gross),
            ],
            ['Bank A/c', s.bank_ac || '—'],
            ['PCC', pccAlert(s).text],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="hr-grid hr-grid--stats">
          <Stat label="Total payable" value={inr(payable)} />
          <Stat label="Paid" value={inr(paid)} tone="ok" />
          <Stat
            label="Balance due"
            value={inr(payable - paid)}
            tone={payable - paid > 0 ? 'bad' : undefined}
          />
          <Stat label="Bonus + arrears" value={inr(T((r) => r.bonus + r.arrears))} />
          <Stat
            label="Months not fully paid"
            value={R.filter((r) => ['Due', 'Partly paid'].includes(r.thisSalary)).length}
          />
        </div>
        <div className="hr-table-wrap">
          <table className="hr-table hr-table--num hr-table--dense">
            <thead>
              <tr>
                <th className="hr-l">Month</th>
                <th>Days</th>
                <th>Leave adj.</th>
                <th>LOP</th>
                <th>OT</th>
                <th>Earned</th>
                <th>Arrears</th>
                <th>Bonus</th>
                <th>Total earnings</th>
                <th>Deductions</th>
                <th>Net payable</th>
                <th>Brought fwd</th>
                <th>Paid</th>
                <th>Due (c/f)</th>
                <th className="hr-l">Paid on</th>
                <th className="hr-l">This month&apos;s salary</th>
              </tr>
            </thead>
            <tbody>
              {R.map((r) => (
                <tr key={r.ym}>
                  <td className="hr-l">{ymLabel(r.ym)}</td>
                  <td>{days(r.emp)}</td>
                  <td>{days(r.clAdj + r.elAdj)}</td>
                  <td>{days(r.lop)}</td>
                  <td>{days(r.ot)}</td>
                  <td>{inr(r.egross)}</td>
                  <td>{inr(r.arrears)}</td>
                  <td>{inr(r.bonus)}</td>
                  <td>{inr(r.totEarn)}</td>
                  <td>{inr(r.ded)}</td>
                  <td>
                    <b>{inr(r.net)}</b>
                  </td>
                  <td>{inr(r.prevDue)}</td>
                  <td>{inr(r.paidAmt)}</td>
                  <td className={r.closeDue > 0 ? 'hr-bad' : ''}>{inr(r.closeDue)}</td>
                  <td className="hr-l">
                    {r.payment.date ? `${fmtDate(r.payment.date)} ${r.payment.mode || ''}` : '–'}
                  </td>
                  <td className="hr-l">
                    {r.thisSalary ? (
                      <Badge tone={payTone(r.thisSalary)}>{r.thisSalary}</Badge>
                    ) : (
                      '–'
                    )}
                  </td>
                </tr>
              ))}
              {R.length === 0 && (
                <tr>
                  <td colSpan="16" className="hr-l hr-muted">
                    Not on payroll in any month so far
                    {s.status === 'Provisional' ? ' (Provisional)' : ''}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <h3 className="hr-h3">Salary history</h3>
        <table className="hr-table hr-table--num hr-table--compact">
          <thead>
            <tr>
              <th className="hr-l">From</th>
              <th>Gross</th>
              <th>Night</th>
              <th className="hr-l">Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="hr-l">{fmtDate(s.salary_effective || s.doj)}</td>
              <td>{inr(s.gross)}</td>
              <td>{inr(s.night_salary)}</td>
              <td className="hr-l">Opening salary</td>
            </tr>
            {revs.map((r) => (
              <tr key={r.id}>
                <td className="hr-l">{fmtDate(r.effective_from)}</td>
                <td>{inr(r.gross)}</td>
                <td>{inr(r.night)}</td>
                <td className="hr-l">{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
/* eslint-disable react/prop-types */
