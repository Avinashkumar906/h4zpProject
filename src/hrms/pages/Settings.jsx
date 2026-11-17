/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Field, Input, Select } from '../components/ui';
import { DEMO_MODE } from '../lib/supabaseClient';

const pct = (v) => (v === '' ? '' : Math.round(Number(v) * 10000) / 100);
const unpct = (v) => (v === '' ? 0 : Number(v) / 100);

export default function Settings({ db, act, store }) {
  const [S, setS] = useState(db.settings);
  const set = (path) => (v) => {
    const n = structuredClone(S);
    const keys = path.split('.');
    let o = n;
    keys.slice(0, -1).forEach((k) => (o = o[k]));
    o[keys.at(-1)] = v;
    setS(n);
  };
  const numSet = (path) => (v) => set(path)(v === '' ? '' : Number(v));
  const pctSet = (path) => (v) => set(path)(unpct(v));
  const save = () => act((d) => store.saveSettings(d, S), 'Settings saved');
  const fy = Array.from({ length: 10 }, (_, i) => 2024 + i);
  return (
    <div className="hr-page">
      <header className="hr-head">
        <div>
          <h1>Settings</h1>
          <p className="hr-muted">
            Rules used for every calculation. Check statutory rates with your CA when the law
            changes.
          </p>
        </div>
        <div className="hr-head__actions">
          <button className="hr-btn" onClick={() => store.exportBackup(db)}>
            Download backup
          </button>
          <button className="hr-btn hr-btn--primary" onClick={save}>
            Save settings
          </button>
        </div>
      </header>

      <section className="hr-panel">
        <h2>Organisation & year</h2>
        <div className="hr-form">
          <Field
            label="Financial year"
            hint="All 12 months, holidays and the PF ceiling follow this."
          >
            <Select
              value={S.fyStart}
              onChange={(v) => set('fyStart')(Number(v))}
              options={fy.map((y) => ({ value: y, label: `${y}-${String(y + 1).slice(2)}` }))}
            />
          </Field>
          <Field label="Organisation name">
            <Input value={S.org} onChange={set('org')} />
          </Field>
          {[0, 1, 2].map((i) => (
            <Field key={i} label={`Address line ${i + 1}`}>
              <Input
                value={S.address[i]}
                onChange={(v) => {
                  const a = [...S.address];
                  a[i] = v;
                  set('address')(a);
                }}
              />
            </Field>
          ))}
        </div>
      </section>

      <section className="hr-panel">
        <h2>Salary split from gross</h2>
        <div className="hr-form">
          <Field label="Basic (% of gross)">
            <Input type="number" value={pct(S.basicPct)} onChange={pctSet('basicPct')} />
          </Field>
          <Field label="DA (% of gross)">
            <Input type="number" value={pct(S.daPct)} onChange={pctSet('daPct')} />
          </Field>
          <Field label="HRA (% of basic)">
            <Input type="number" value={pct(S.hraPctOfBasic)} onChange={pctSet('hraPctOfBasic')} />
          </Field>
          <Field label="Conveyance (₹/month)">
            <Input type="number" value={S.conveyance} onChange={numSet('conveyance')} />
          </Field>
          <Field label="Salary divisor (days)" hint="Blank = calendar days of each month.">
            <Input
              type="number"
              value={S.divisor ?? ''}
              onChange={(v) => set('divisor')(v === '' ? null : Number(v))}
            />
          </Field>
          <Field label="Code wages minimum (% of gross)">
            <Input type="number" value={pct(S.minWagePct)} onChange={pctSet('minWagePct')} />
          </Field>
        </div>
      </section>

      <section className="hr-panel">
        <h2>Leave</h2>
        <div className="hr-form">
          <Field label="CL per year">
            <Input type="number" value={S.leave.CL} onChange={numSet('leave.CL')} />
          </Field>
          <Field label="SL per year">
            <Input type="number" value={S.leave.SL} onChange={numSet('leave.SL')} />
          </Field>
          <Field label="EL per year">
            <Input type="number" value={S.leave.EL} onChange={numSet('leave.EL')} />
          </Field>
          <Field label="Cover absences from CL, then EL">
            <Select
              value={S.leave.adjust ? 'Y' : 'N'}
              onChange={(v) => set('leave.adjust')(v === 'Y')}
              options={['Y', 'N']}
            />
          </Field>
          <Field label="Pro-rate for mid-year starts">
            <Select
              value={S.leave.prorate ? 'Y' : 'N'}
              onChange={(v) => set('leave.prorate')(v === 'Y')}
              options={['Y', 'N']}
            />
          </Field>
        </div>
      </section>

      <section className="hr-panel">
        <h2>PF & ESI</h2>
        <div className="hr-form">
          <Field label="PF employee %">
            <Input type="number" value={pct(S.pf.ee)} onChange={pctSet('pf.ee')} />
          </Field>
          <Field label="PF employer %">
            <Input type="number" value={pct(S.pf.er)} onChange={pctSet('pf.er')} />
          </Field>
          <Field label="EPS % (within employer share)">
            <Input type="number" value={pct(S.pf.eps)} onChange={pctSet('pf.eps')} />
          </Field>
          <Field label="EDLI %">
            <Input type="number" value={pct(S.pf.edli)} onChange={pctSet('pf.edli')} />
          </Field>
          <Field label="Admin charges %">
            <Input type="number" value={pct(S.pf.admin)} onChange={pctSet('pf.admin')} />
          </Field>
          <Field label="PF ceiling — old (₹)">
            <Input type="number" value={S.pf.ceilOld} onChange={numSet('pf.ceilOld')} />
          </Field>
          <Field label="New ceiling from">
            <Input type="date" value={S.pf.ceilDate} onChange={set('pf.ceilDate')} />
          </Field>
          <Field label="PF ceiling — new (₹)">
            <Input type="number" value={S.pf.ceilNew} onChange={numSet('pf.ceilNew')} />
          </Field>
          <Field label="Maximum PF per month (₹)">
            <Input type="number" value={S.pf.max} onChange={numSet('pf.max')} />
          </Field>
          <Field label="EPS stops at age">
            <Input type="number" value={S.pf.epsAge} onChange={numSet('pf.epsAge')} />
          </Field>
          <Field label="ESI employee %">
            <Input type="number" value={pct(S.esi.ee)} onChange={pctSet('esi.ee')} />
          </Field>
          <Field label="ESI employer %">
            <Input type="number" value={pct(S.esi.er)} onChange={pctSet('esi.er')} />
          </Field>
          <Field label="ESI wage limit (₹)">
            <Input type="number" value={S.esi.limit} onChange={numSet('esi.limit')} />
          </Field>
          <Field label="ESI limit — PwD (₹)">
            <Input type="number" value={S.esi.pwdLimit} onChange={numSet('esi.pwdLimit')} />
          </Field>
          <Field label="No employee ESI if daily salary ≤ (₹)">
            <Input type="number" value={S.esi.dailyExempt} onChange={numSet('esi.dailyExempt')} />
          </Field>
        </div>
      </section>

      <section className="hr-panel">
        <h2>Income tax (new regime, for the TDS estimate)</h2>
        <div className="hr-form">
          <Field label="Standard deduction (₹)">
            <Input type="number" value={S.tax.std} onChange={numSet('tax.std')} />
          </Field>
          <Field label="No tax up to taxable income (₹)">
            <Input type="number" value={S.tax.rebate} onChange={numSet('tax.rebate')} />
          </Field>
          <Field label="Cess %">
            <Input type="number" value={pct(S.tax.cess)} onChange={pctSet('tax.cess')} />
          </Field>
          <Field label="Slabs" hint="From ₹ : rate %, one per line" wide>
            <textarea
              className="hr-input"
              rows={7}
              value={S.tax.slabs.map(([f, r]) => `${f}:${pct(r)}`).join('\n')}
              onChange={(e) =>
                set('tax.slabs')(
                  e.target.value
                    .split('\n')
                    .map((l) => l.split(':').map(Number))
                    .filter((x) => x.length === 2 && !x.some(isNaN))
                    .map(([f, r]) => [f, r / 100]),
                )
              }
            />
          </Field>
        </div>
      </section>

      <section className="hr-grid hr-grid--two">
        <div className="hr-panel">
          <h2>Departments</h2>
          <textarea
            className="hr-input"
            rows={9}
            value={S.departments.join('\n')}
            onChange={(e) =>
              set('departments')(
                e.target.value
                  .split('\n')
                  .map((x) => x.trim())
                  .filter(Boolean),
              )
            }
            aria-label="Departments, one per line"
          />
          <p className="hr-muted hr-small">One per line.</p>
        </div>
        <div className="hr-panel">
          <h2>Holidays</h2>
          <textarea
            className="hr-input"
            rows={9}
            value={S.holidays.map((h) => `${h.md} ${h.name}`).join('\n')}
            onChange={(e) =>
              set('holidays')(
                e.target.value
                  .split('\n')
                  .map((l) => {
                    const m = l.trim().match(/^(\d{2}-\d{2})\s+(.*)$/);
                    return m ? { md: m[1], name: m[2] } : null;
                  })
                  .filter(Boolean),
              )
            }
            aria-label="Holidays"
          />
          <p className="hr-muted hr-small">
            One per line as MM-DD Name, e.g. <code>11-01 Diwali</code>. Used by “Holidays → HO” on
            the attendance page.
          </p>
        </div>
      </section>
      {DEMO_MODE && (
        <section className="hr-panel">
          <h2>Demo data</h2>
          <p className="hr-muted">Start the demo again from the 15 staff in the workbook.</p>
          <button
            className="hr-btn"
            onClick={() => {
              if (window.confirm('Erase demo data in this browser?')) {
                store.resetDemo();
                window.location.reload();
              }
            }}
          >
            Reset demo data
          </button>
        </section>
      )}
    </div>
  );
}
/* eslint-disable react/prop-types */
