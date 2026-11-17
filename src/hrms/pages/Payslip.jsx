/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { inr, num, fmtDate, ymLabel, rupeesInWords } from '../lib/format';
import { Select } from '../components/ui';

export default function Payslip({ db, results, months, monthIdx, setMonthIdx }) {
  const staff = db.staff;
  const [sid, setSid] = useState(
    staff.find((s) => results[s.id][monthIdx].emp > 0)?.id || staff[0]?.id,
  );
  const s = staff.find((x) => x.id === sid);
  const r = s ? results[s.id][monthIdx] : null;
  const mo = months[monthIdx];
  const S = db.settings;
  const earnings = r
    ? [
        ['Basic', r.basic],
        ['Dearness Allowance', r.da],
        ['HRA', r.hra],
        ['Conveyance Allowance', r.conv],
        ['Special Allowance', r.special],
        ['Overtime', r.otPay],
        [`Arrears${r.arrearsFor ? ` (${r.arrearsFor})` : ''}`, r.arrears],
        [r.bonusType || 'Bonus', r.bonus],
        ['Incentive', r.incentive],
        ['Other Earnings', r.otherEarn],
      ].filter((x) => x[1])
    : [];
  const deductions = r
    ? [
        ['Provident Fund', r.pfEE],
        ['ESI', r.esiEE],
        ['Professional Tax', r.pt],
        ['Income Tax (TDS)', r.tds],
        ['Advance', r.advance],
        ['Other Deduction', r.otherDed],
        ['Loan Recovery', r.loanDed],
      ].filter((x) => x[1])
    : [];
  const lines = Math.max(earnings.length, deductions.length);
  const v = (x) => (x ? String(x) : 'N/A');

  return (
    <div className="hr-page">
      <header className="hr-head no-print">
        <div>
          <h1>Payslips</h1>
          <p className="hr-muted">Choose the month and employee, then print or save as PDF.</p>
        </div>
        <div className="hr-head__actions">
          <Select
            value={monthIdx}
            onChange={(x) => setMonthIdx(Number(x))}
            options={months.map((m, i) => ({ value: i, label: ymLabel(m.ym, true) }))}
            aria-label="Month"
          />
          <Select
            value={sid}
            onChange={setSid}
            options={staff.map((x) => ({ value: x.id, label: `${x.emp_id} | ${x.name}` }))}
            aria-label="Employee"
          />
          <button
            className="hr-btn hr-btn--primary"
            disabled={!r || r.emp === 0}
            onClick={() => window.print()}
          >
            Print / save PDF
          </button>
        </div>
      </header>
      {r && r.emp === 0 && (
        <p className="hr-error no-print">
          {s.name} is not on payroll in {ymLabel(mo.ym, true)} ({r.rowStatus}). No payslip for this
          month.
        </p>
      )}
      {r && r.emp > 0 && (
        <article className="hr-slip print-area">
          <header className="hr-slip__top">
            <div>
              <p className="hr-slip__title">
                <b>PAYSLIP</b>
                <span>{ymLabel(mo.ym).toUpperCase()}</span>
              </p>
              <p className="hr-slip__org">{S.org.toUpperCase()}</p>
              {S.address.filter(Boolean).map((a, i) => (
                <p key={i} className="hr-slip__addr">
                  {a.toUpperCase()}
                </p>
              ))}
            </div>
            <img src={logo} alt="H4ZP" className="hr-slip__logo" />
          </header>
          <h2 className="hr-slip__name">{s.name.toUpperCase()}</h2>
          <div className="hr-slip__grid">
            {[
              ['Employee Number', s.emp_no_payslip || s.emp_id],
              [
                'Date Joined',
                fmtDate(s.confirm_date && s.confirm_date > (s.doj || '') ? s.confirm_date : s.doj),
              ],
              ['Department', v(s.department)],
              ['Sub Department', v(s.sub_department)],
              ['Designation', v(s.designation)],
              ['Payment Mode', v(s.payment_mode)],
              ['UAN', v(s.uan)],
              ['PF Number', v(s.pf_no)],
              ['PAN Number', v(s.pan)],
              ['Business Unit', v(s.business_unit)],
              ['Account Number', v(s.bank_ac)],
              ['ESI Number', v(s.esi_no)],
            ].map(([l, val]) => (
              <div key={l}>
                <span>{l}</span>
                <b>{val}</b>
              </div>
            ))}
          </div>
          <h3 className="hr-slip__sec">SALARY DETAILS</h3>
          <div className="hr-slip__grid hr-slip__grid--one">
            {[
              ['Actual Payable Days', r.paid.toFixed(1)],
              ['Total Working Days', r.dim.toFixed(1)],
              ['Loss Of Pay Days', r.lop.toFixed(2)],
              ['Days Payable', (r.paid + r.ot).toFixed(1)],
            ].map(([l, val]) => (
              <div key={l}>
                <span>{l}</span>
                <b>{val}</b>
              </div>
            ))}
          </div>
          <div className="hr-slip__cols">
            <table>
              <thead>
                <tr>
                  <th>EARNINGS</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: lines + 1 }, (_, i) =>
                  i < earnings.length ? (
                    <tr key={i}>
                      <td>{earnings[i][0]}</td>
                      <td>{num(earnings[i][1])}</td>
                    </tr>
                  ) : i === lines ? (
                    <tr key={i} className="is-total">
                      <td>Total Earnings (A)</td>
                      <td>{num(r.totEarn)}</td>
                    </tr>
                  ) : (
                    <tr key={i}>
                      <td>&nbsp;</td>
                      <td />
                    </tr>
                  ),
                )}
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>{deductions.length ? 'DEDUCTIONS' : ''}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: lines + 1 }, (_, i) =>
                  i < deductions.length ? (
                    <tr key={i}>
                      <td>{deductions[i][0]}</td>
                      <td>{num(deductions[i][1])}</td>
                    </tr>
                  ) : i === lines && deductions.length ? (
                    <tr key={i} className="is-total">
                      <td>Total Deductions (B)</td>
                      <td>{num(r.ded)}</td>
                    </tr>
                  ) : (
                    <tr key={i}>
                      <td>&nbsp;</td>
                      <td />
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
          <div className="hr-slip__net">
            <span>
              {deductions.length ? 'Net Salary Payable ( A - B )' : 'Net Salary Payable ( A )'}
            </span>
            <b>{num(r.net)}</b>
          </div>
          <div className="hr-slip__net">
            <span>Net Salary in words</span>
            <b>{rupeesInWords(r.net)}</b>
          </div>
          {(r.prevDue > 0 || r.closeDue > 0) && (
            <p className="hr-slip__due">
              Previous due (b/f): {inr(r.prevDue)} | Paid this month: {inr(r.paidAmt)} | Balance due
              (c/f): {inr(r.closeDue)}
            </p>
          )}
          <p className="hr-slip__note">**Note : All amounts displayed in this payslip are in INR</p>
          <p className="hr-slip__foot">
            * This is computer generated statement, does not require signature.
          </p>
        </article>
      )}
    </div>
  );
}
/* eslint-disable react/prop-types */
