/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import signature from '../assets/signature.png';
import { EXITED, ON_ROLL } from '../lib/defaults';
import { fmtDate, fmtLongDate, todayIso, experienceText } from '../lib/format';
import { totalExperienceMonths } from '../lib/payroll';
import { Select, Input } from '../components/ui';

const SHOW = {
  current: 'Current staff (incl. Provisional)',
  active: 'Active & permanent only',
  all: 'All staff (incl. exited)',
};

export default function StaffList({ db }) {
  const [show, setShow] = useState('current');
  const [date, setDate] = useState(todayIso());
  const [place, setPlace] = useState('Gurugram');
  const [title, setTitle] = useState('Staff List');
  const S = db.settings;
  const rows = db.staff.filter(
    (s) =>
      show === 'all' ||
      (show === 'active' ? ON_ROLL.includes(s.status) : !EXITED.includes(s.status)),
  );
  const pcc = (s) =>
    !s.pcc_status
      ? 'Not recorded'
      : s.pcc_status === 'Verified – Clear' && s.pcc_valid_till
        ? `Verified – Clear (till ${fmtDate(s.pcc_valid_till)})`
        : s.pcc_status;
  return (
    <div className="hr-page">
      <header className="hr-head no-print">
        <div>
          <h1>Staff list for printing</h1>
          <p className="hr-muted">
            One page with logo and the Chairperson’s signature — for inspections, CARA / DCPU
            submissions, or anyone who asks.
          </p>
        </div>
        <div className="hr-head__actions">
          <button className="hr-btn hr-btn--primary" onClick={() => window.print()}>
            Print / save PDF
          </button>
        </div>
      </header>
      <div className="hr-toolbar no-print">
        <Select
          value={show}
          onChange={setShow}
          options={Object.entries(SHOW).map(([value, label]) => ({ value, label }))}
          aria-label="Who to include"
        />
        <Input value={title} onChange={setTitle} aria-label="Title" />
        <Input type="date" value={date} onChange={setDate} aria-label="List date" />
        <Input value={place} onChange={setPlace} aria-label="Place" placeholder="Place" />
      </div>
      <article className="hr-doc print-area">
        <header className="hr-doc__head">
          <img src={logo} alt="H4ZP" />
          <div>
            <h2>{S.org}</h2>
            {S.address.filter(Boolean).length > 0 && <p>{S.address.filter(Boolean).join(', ')}</p>}
          </div>
        </header>
        <h3 className="hr-doc__title">
          {title} — as on {fmtLongDate(date)}
        </h3>
        <table className="hr-doc__table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Date of Joining</th>
              <th>PCC Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.emp_id}</td>
                <td>{s.name}</td>
                <td>{s.designation}</td>
                <td>{s.qualification || '—'}</td>
                <td>{experienceText(totalExperienceMonths(s))}</td>
                <td>{s.doj ? fmtDate(s.doj) : '—'}</td>
                <td>{pcc(s)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="hr-doc__count">Total staff: {rows.length}</p>
        <footer className="hr-doc__sign">
          <div>
            <p>Date: {fmtDate(date)}</p>
            <p>Place: {place || '____________'}</p>
          </div>
          <figure>
            <img src={signature} alt="Signature of the Chairperson" />
            <figcaption>Authorised Signatory</figcaption>
          </figure>
        </footer>
      </article>
    </div>
  );
}
/* eslint-disable react/prop-types */
