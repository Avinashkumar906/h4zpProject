/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import { EMPTY_STAFF, STATUSES, PCC_STATUSES, PAY_MODES, EMP_TYPES, EXITED } from '../lib/defaults';
import { inr, fmtDate, fmtLongDate, todayIso, experienceText } from '../lib/format';
import { salarySplit, totalExperienceMonths, pccAlert, rateOn, annualTax } from '../lib/payroll';
import { Field, Input, Select, Modal, Badge, statusTone, Empty } from '../components/ui';

const YN = ['Y', 'N'];

function SalaryPreview({ s, S }) {
  const total = (Number(s.gross) || 0) + (Number(s.night_salary) || 0);
  if (!total)
    return <p className="hr-muted hr-small">Type the monthly gross — the break-up appears here.</p>;
  const sp = salarySplit(total, S);
  const pf =
    s.deduct_pf === 'Y'
      ? Number(s.fixed_pf_ee) ||
        Math.min(Math.round(Math.min(sp.codeWages, S.pf.ceilNew) * S.pf.ee), S.pf.max)
      : 0;
  const lim = s.pwd === 'Y' ? S.esi.pwdLimit : S.esi.limit;
  const esiOn = s.deduct_esi === 'Y' || (s.deduct_esi === 'Auto' && sp.codeWages <= lim);
  const esi = esiOn ? Math.ceil(sp.codeWages * S.esi.ee) : 0;
  const tds =
    s.deduct_tds === 'Y' ? Number(s.fixed_tds) || Math.round(annualTax(total * 12, S) / 12) : 0;
  const net = total - pf - esi - tds - (Number(s.pt) || 0);
  return (
    <div className="hr-preview">
      <div>
        <span>Basic</span>
        <b>{inr(sp.basic)}</b>
      </div>
      {sp.da > 0 && (
        <div>
          <span>DA</span>
          <b>{inr(sp.da)}</b>
        </div>
      )}
      <div>
        <span>HRA</span>
        <b>{inr(sp.hra)}</b>
      </div>
      <div>
        <span>Conveyance</span>
        <b>{inr(sp.conv)}</b>
      </div>
      <div>
        <span>Special allowance</span>
        <b>{inr(sp.special)}</b>
      </div>
      <div>
        <span>PF (employee)</span>
        <b>{inr(pf)}</b>
      </div>
      <div>
        <span>
          ESI{' '}
          {s.deduct_esi === 'Auto' ? (esiOn ? '(auto: applies)' : '(auto: not applicable)') : ''}
        </span>
        <b>{inr(esi)}</b>
      </div>
      <div>
        <span>TDS / month</span>
        <b>{inr(tds)}</b>
      </div>
      <div className="hr-preview__net">
        <span>Take-home (full month)</span>
        <b>{inr(net)}</b>
      </div>
    </div>
  );
}

function StaffForm({ initial, db, act, store, onClose, notify }) {
  const [s, setS] = useState(initial);
  const [tab, setTab] = useState('job');
  const [rev, setRev] = useState({ effective_from: '', gross: '', night: '', reason: '' });
  const set = (k) => (v) => setS({ ...s, [k]: v });
  const S = db.settings;
  const revs = db.revisions
    .filter((r) => r.staff_id === s.id)
    .sort((a, b) => (a.effective_from < b.effective_from ? -1 : 1));
  const save = async () => {
    if (!s.emp_id.trim() || !s.name.trim()) {
      notify('Emp ID and name are required.', 'bad');
      return;
    }
    if (s.status !== 'Provisional' && !s.doj && !s.confirm_date) {
      notify('Add the date of joining (or the confirmation date).', 'bad');
      return;
    }
    if (await act((d) => store.saveStaff(d, s), `${s.name} saved`)) onClose();
  };
  const tabs = [
    ['job', 'Job & status'],
    ['salary', 'Salary & deductions'],
    ['personal', 'Personal'],
    ['bank', 'Bank & IDs'],
    ['pcc', 'PCC'],
    ['opening', 'Opening balances'],
  ];
  return (
    <Modal
      title={initial.id ? `Edit — ${initial.name}` : 'Add staff'}
      onClose={onClose}
      size="wide"
      footer={
        <>
          <button className="hr-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="hr-btn hr-btn--primary" onClick={save}>
            Save staff
          </button>
        </>
      }
    >
      <div className="hr-tabs" role="tablist">
        {tabs.map(([k, l]) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            className={tab === k ? 'is-on' : ''}
            onClick={() => setTab(k)}
          >
            {l}
          </button>
        ))}
      </div>
      {tab === 'job' && (
        <div className="hr-form">
          <Field label="Emp ID">
            <Input value={s.emp_id} onChange={set('emp_id')} placeholder="H4ZP-016" />
          </Field>
          <Field label="Full name">
            <Input value={s.name} onChange={set('name')} />
          </Field>
          <Field label="Designation">
            <Input value={s.designation} onChange={set('designation')} />
          </Field>
          <Field label="Department">
            <Select
              value={s.department}
              onChange={set('department')}
              options={S.departments}
              placeholder="Choose…"
            />
          </Field>
          <Field label="Sub department">
            <Input value={s.sub_department} onChange={set('sub_department')} />
          </Field>
          <Field label="Business unit">
            <Input value={s.business_unit} onChange={set('business_unit')} />
          </Field>
          <Field label="Employment type">
            <Select
              value={s.employment_type}
              onChange={set('employment_type')}
              options={EMP_TYPES}
              placeholder="—"
            />
          </Field>
          <Field
            label="Status"
            hint={
              s.status === 'Provisional'
                ? 'Provisional: no salary, attendance or leave until confirmed.'
                : undefined
            }
          >
            <Select value={s.status} onChange={set('status')} options={STATUSES} />
          </Field>
          <Field label="Date of joining">
            <Input type="date" value={s.doj} onChange={set('doj')} />
          </Field>
          <Field
            label="Confirmed (Provisional → Active / Permanent) from"
            hint="Salary, attendance and leave start from this date."
          >
            <Input type="date" value={s.confirm_date} onChange={set('confirm_date')} />
          </Field>
          <Field label="Date of leaving">
            <Input type="date" value={s.dol} onChange={set('dol')} />
          </Field>
          <Field label="Qualification">
            <Input value={s.qualification} onChange={set('qualification')} />
          </Field>
          <Field label="Experience before H4ZP (years)">
            <Input
              type="number"
              step="0.5"
              min="0"
              value={s.prev_exp_years}
              onChange={set('prev_exp_years')}
            />
          </Field>
          <Field label="Remarks" wide>
            <Input value={s.remarks} onChange={set('remarks')} />
          </Field>
          {s.status === 'Active' && s.dol && (
            <p className="hr-error">Status is Active but a leaving date is set.</p>
          )}
          {EXITED.includes(s.status) && !s.dol && (
            <p className="hr-error">Add the date of leaving for {s.status} staff.</p>
          )}
        </div>
      )}
      {tab === 'salary' && (
        <div className="hr-split">
          <div className="hr-form">
            <Field label="Monthly gross (₹)" hint="Everything else is calculated from this.">
              <Input type="number" min="0" value={s.gross} onChange={set('gross')} />
            </Field>
            <Field label="Effective from">
              <Input type="date" value={s.salary_effective} onChange={set('salary_effective')} />
            </Field>
            <Field label="Night salary (₹/month)">
              <Input type="number" min="0" value={s.night_salary} onChange={set('night_salary')} />
            </Field>
            <Field label="Deduct PF?">
              <Select value={s.deduct_pf} onChange={set('deduct_pf')} options={YN} />
            </Field>
            <Field label="Deduct ESI?" hint="Auto = applies while Code wages are within the limit.">
              <Select
                value={s.deduct_esi}
                onChange={set('deduct_esi')}
                options={['Auto', 'Y', 'N']}
              />
            </Field>
            <Field label="Person with disability (ESI limit ₹25,000)">
              <Select value={s.pwd} onChange={set('pwd')} options={YN} />
            </Field>
            <Field label="Deduct TDS?">
              <Select value={s.deduct_tds} onChange={set('deduct_tds')} options={YN} />
            </Field>
            <Field
              label="Fixed monthly TDS (₹)"
              hint="Leave blank for the automatic new-regime estimate."
            >
              <Input type="number" min="0" value={s.fixed_tds} onChange={set('fixed_tds')} />
            </Field>
            <Field label="Professional tax (₹/month)">
              <Input type="number" min="0" value={s.pt} onChange={set('pt')} />
            </Field>
            <Field label="Loan / advance given (₹)">
              <Input type="number" min="0" value={s.loan_given} onChange={set('loan_given')} />
            </Field>
            <Field label="Salary divisor (days)" hint="Blank = calendar days of the month.">
              <Input type="number" min="0" value={s.divisor} onChange={set('divisor')} />
            </Field>
            <Field label="Fixed PF — employee (₹)">
              <Input type="number" min="0" value={s.fixed_pf_ee} onChange={set('fixed_pf_ee')} />
            </Field>
            <Field label="Fixed PF — employer (₹)">
              <Input type="number" min="0" value={s.fixed_pf_er} onChange={set('fixed_pf_er')} />
            </Field>
          </div>
          <div>
            <h3 className="hr-h3">Monthly break-up</h3>
            <SalaryPreview s={s} S={S} />
            {s.id && (
              <>
                <h3 className="hr-h3">Increments & revisions</h3>
                {revs.length === 0 ? (
                  <p className="hr-muted hr-small">
                    No revisions yet. Earlier months keep the old salary when you add one.
                  </p>
                ) : (
                  <table className="hr-table hr-table--num hr-table--compact">
                    <thead>
                      <tr>
                        <th>From</th>
                        <th>Gross</th>
                        <th>Night</th>
                        <th>Reason</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {revs.map((r) => (
                        <tr key={r.id}>
                          <td>{fmtDate(r.effective_from)}</td>
                          <td>{inr(r.gross)}</td>
                          <td>{inr(r.night)}</td>
                          <td>{r.reason}</td>
                          <td>
                            <button
                              className="hr-link hr-bad"
                              onClick={() =>
                                act((d) => store.deleteRevision(d, r.id), 'Revision removed')
                              }
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <div className="hr-inline-form">
                  <Input
                    type="date"
                    value={rev.effective_from}
                    onChange={(v) => setRev({ ...rev, effective_from: v })}
                    aria-label="Effective from"
                  />
                  <Input
                    type="number"
                    placeholder="New gross"
                    value={rev.gross}
                    onChange={(v) => setRev({ ...rev, gross: v })}
                  />
                  <Input
                    type="number"
                    placeholder="Night"
                    value={rev.night}
                    onChange={(v) => setRev({ ...rev, night: v })}
                  />
                  <Input
                    placeholder="Reason"
                    value={rev.reason}
                    onChange={(v) => setRev({ ...rev, reason: v })}
                  />
                  <button
                    className="hr-btn"
                    onClick={async () => {
                      if (!rev.effective_from || !rev.gross) {
                        notify('Enter the date and new gross.', 'bad');
                        return;
                      }
                      if (
                        await act(
                          (d) =>
                            store.addRevision(d, {
                              staff_id: s.id,
                              effective_from: rev.effective_from,
                              gross: Number(rev.gross),
                              night: Number(rev.night) || 0,
                              reason: rev.reason,
                            }),
                          'Increment added',
                        )
                      )
                        setRev({ effective_from: '', gross: '', night: '', reason: '' });
                    }}
                  >
                    Add increment
                  </button>
                </div>
                <p className="hr-muted hr-small">
                  Salary in force today: {inr(rateOn(s, db.revisions, todayIso()).gross)}
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {tab === 'personal' && (
        <div className="hr-form">
          <Field label="Gender">
            <Select
              value={s.gender}
              onChange={set('gender')}
              options={['Female', 'Male', 'Other']}
              placeholder="—"
            />
          </Field>
          <Field label="Date of birth">
            <Input type="date" value={s.dob} onChange={set('dob')} />
          </Field>
          <Field label="Mobile">
            <Input value={s.mobile} onChange={set('mobile')} />
          </Field>
          <Field label="Email">
            <Input type="email" value={s.email} onChange={set('email')} />
          </Field>
          <Field label="Address" wide>
            <Input value={s.address} onChange={set('address')} />
          </Field>
          <Field label="Emergency contact" wide>
            <Input value={s.emergency} onChange={set('emergency')} />
          </Field>
        </div>
      )}
      {tab === 'bank' && (
        <div className="hr-form">
          <Field label="Payment mode">
            <Select value={s.payment_mode} onChange={set('payment_mode')} options={PAY_MODES} />
          </Field>
          <Field label="Bank name">
            <Input value={s.bank_name} onChange={set('bank_name')} />
          </Field>
          <Field label="Bank account no.">
            <Input value={s.bank_ac} onChange={set('bank_ac')} />
          </Field>
          <Field
            label="IFSC"
            hint={s.ifsc && s.ifsc.length !== 11 ? 'IFSC should be 11 characters.' : undefined}
          >
            <Input value={s.ifsc} onChange={(v) => set('ifsc')(v.toUpperCase())} />
          </Field>
          <Field label="PAN">
            <Input value={s.pan} onChange={(v) => set('pan')(v.toUpperCase())} />
          </Field>
          <Field label="Aadhaar no.">
            <Input value={s.aadhaar} onChange={set('aadhaar')} />
          </Field>
          <Field label="UAN (PF)">
            <Input value={s.uan} onChange={set('uan')} />
          </Field>
          <Field label="PF number">
            <Input value={s.pf_no} onChange={set('pf_no')} />
          </Field>
          <Field label="ESI number">
            <Input value={s.esi_no} onChange={set('esi_no')} />
          </Field>
          <Field label="Employee no. on payslip" hint="Blank = Emp ID.">
            <Input value={s.emp_no_payslip} onChange={set('emp_no_payslip')} />
          </Field>
        </div>
      )}
      {tab === 'pcc' && (
        <div className="hr-form">
          <Field label="PCC status">
            <Select
              value={s.pcc_status}
              onChange={set('pcc_status')}
              options={PCC_STATUSES}
              placeholder="Not recorded"
            />
          </Field>
          <Field label="Certificate no.">
            <Input value={s.pcc_no} onChange={set('pcc_no')} />
          </Field>
          <Field label="Issue date">
            <Input type="date" value={s.pcc_issue} onChange={set('pcc_issue')} />
          </Field>
          <Field label="Valid till">
            <Input type="date" value={s.pcc_valid_till} onChange={set('pcc_valid_till')} />
          </Field>
          <p className="hr-small">
            Current check:{' '}
            <Badge tone={{ ok: 'ok', warn: 'warn', bad: 'bad' }[pccAlert(s).level]}>
              {pccAlert(s).text}
            </Badge>
          </p>
        </div>
      )}
      {tab === 'opening' && (
        <div className="hr-form">
          <p className="hr-muted hr-small hr-field--wide">
            Only for the first year you use this system, or when carrying balances into a new
            financial year.
          </p>
          <Field label="Salary still owed at FY start (₹)">
            <Input type="number" min="0" value={s.opening_due} onChange={set('opening_due')} />
          </Field>
          <Field label="CL carried forward">
            <Input type="number" step="0.5" value={s.opening_cl} onChange={set('opening_cl')} />
          </Field>
          <Field label="SL carried forward">
            <Input type="number" step="0.5" value={s.opening_sl} onChange={set('opening_sl')} />
          </Field>
          <Field label="EL carried forward">
            <Input type="number" step="0.5" value={s.opening_el} onChange={set('opening_el')} />
          </Field>
        </div>
      )}
    </Modal>
  );
}

function ConfirmDialog({ st, act, store, onClose }) {
  const [date, setDate] = useState(todayIso());
  const [status, setStatus] = useState('Permanent');
  const [gross, setGross] = useState(st.gross || '');
  return (
    <Modal
      title={`Confirm ${st.name}`}
      onClose={onClose}
      footer={
        <>
          <button className="hr-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="hr-btn hr-btn--primary"
            onClick={async () => {
              const next = {
                ...st,
                status,
                confirm_date: date,
                doj: st.doj || date,
                gross: gross,
                salary_effective: st.salary_effective || date,
              };
              if (
                await act(
                  (d) => store.saveStaff(d, next),
                  `${st.name} is now ${status} from ${fmtLongDate(date)}`,
                )
              )
                onClose();
            }}
          >
            Confirm
          </button>
        </>
      }
    >
      <div className="hr-form">
        <Field label="New status">
          <Select value={status} onChange={setStatus} options={['Permanent', 'Active']} />
        </Field>
        <Field label="From date" hint="Salary, attendance and leave start from this date.">
          <Input type="date" value={date} onChange={setDate} />
        </Field>
        <Field label="Monthly gross (₹)">
          <Input type="number" min="0" value={gross} onChange={setGross} />
        </Field>
      </div>
    </Modal>
  );
}

export default function Staff({ db, act, store, notify }) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('current');
  const [edit, setEdit] = useState(null);
  const [confirmSt, setConfirmSt] = useState(null);
  const rows = useMemo(
    () =>
      db.staff.filter((s) => {
        if (filter === 'current' && EXITED.includes(s.status)) return false;
        if (filter === 'provisional' && s.status !== 'Provisional') return false;
        if (filter === 'exited' && !EXITED.includes(s.status)) return false;
        const t = q.toLowerCase();
        return (
          !t || [s.emp_id, s.name, s.designation, s.department].join(' ').toLowerCase().includes(t)
        );
      }),
    [db.staff, q, filter],
  );
  const nextId = () => {
    const n =
      Math.max(0, ...db.staff.map((s) => Number((s.emp_id.match(/(\d+)$/) || [])[1]) || 0)) + 1;
    return `H4ZP-${String(n).padStart(3, '0')}`;
  };

  return (
    <div className="hr-page">
      <header className="hr-head">
        <div>
          <h1>Staff</h1>
          <p className="hr-muted">
            {db.staff.length} people on record. Never delete someone who left — set their status and
            leaving date.
          </p>
        </div>
        <div className="hr-head__actions">
          <button
            className="hr-btn hr-btn--primary"
            onClick={() => setEdit({ ...EMPTY_STAFF, emp_id: nextId() })}
          >
            Add staff
          </button>
        </div>
      </header>
      <div className="hr-toolbar">
        <input
          className="hr-input hr-input--search"
          placeholder="Search name, ID, designation…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search staff"
        />
        <div className="hr-seg">
          {[
            ['current', 'Current'],
            ['provisional', 'Provisional'],
            ['exited', 'Exited'],
            ['all', 'All'],
          ].map(([k, l]) => (
            <button key={k} className={filter === k ? 'is-on' : ''} onClick={() => setFilter(k)}>
              {l}
            </button>
          ))}
        </div>
      </div>
      {rows.length === 0 ? (
        <Empty title="No staff match">Change the filter or add a new person.</Empty>
      ) : (
        <div className="hr-table-wrap">
          <table className="hr-table">
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Experience</th>
                <th className="hr-r">Gross</th>
                <th>PCC</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => {
                const p = pccAlert(s);
                return (
                  <tr key={s.id}>
                    <td className="hr-mono">{s.emp_id}</td>
                    <td>
                      <button className="hr-link" onClick={() => setEdit(s)}>
                        {s.name}
                      </button>
                    </td>
                    <td>{s.designation}</td>
                    <td>{s.department}</td>
                    <td>
                      <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                    </td>
                    <td>
                      {fmtDate(
                        s.confirm_date && s.confirm_date > (s.doj || '') ? s.confirm_date : s.doj,
                      )}
                    </td>
                    <td>{experienceText(totalExperienceMonths(s))}</td>
                    <td className="hr-r">
                      {s.status === 'Provisional' ? (
                        <span className="hr-muted">—</span>
                      ) : Number(s.gross) > 0 ? (
                        inr(s.gross)
                      ) : (
                        <Badge tone="bad">add salary</Badge>
                      )}
                    </td>
                    <td>
                      <Badge tone={{ ok: 'ok', warn: 'warn', bad: 'bad' }[p.level]}>{p.text}</Badge>
                    </td>
                    <td className="hr-r">
                      {s.status === 'Provisional' && (
                        <button className="hr-btn hr-btn--small" onClick={() => setConfirmSt(s)}>
                          Confirm
                        </button>
                      )}
                      <button className="hr-btn hr-btn--small" onClick={() => setEdit(s)}>
                        Edit
                      </button>
                      <button
                        className="hr-btn hr-btn--small hr-btn--ghost"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Delete ${s.name} and all their records? This cannot be undone. For staff who left, set status instead.`,
                            )
                          )
                            act((d) => store.deleteStaff(d, s.id), `${s.name} deleted`);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {edit && (
        <StaffForm
          initial={edit}
          db={db}
          act={act}
          store={store}
          notify={notify}
          onClose={() => setEdit(null)}
        />
      )}
      {confirmSt && (
        <ConfirmDialog st={confirmSt} act={act} store={store} onClose={() => setConfirmSt(null)} />
      )}
    </div>
  );
}
/* eslint-disable react/prop-types */
