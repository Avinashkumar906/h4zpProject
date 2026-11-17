/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { inr, ymLabel, fmtLongDate, todayIso } from '../lib/format';
import { ON_ROLL, EXITED, PCC_STATUSES } from '../lib/defaults';
import { monthStarted, pccAlert, salarySplit } from '../lib/payroll';
import { MonthRibbon, Stat, Badge } from '../components/ui';

const sum = (arr, f) => arr.reduce((t, x) => t + (f(x) || 0), 0);

function Bars({ data }) {
  const max = Math.max(1, ...data.map((d) => Math.max(d.a, d.b)));
  const W = 640,
    H = 190,
    bw = 18,
    gap = W / data.length;
  return (
    <svg
      viewBox={`0 0 ${W} ${H + 28}`}
      className="hr-chart"
      role="img"
      aria-label="Net payable and paid by month"
    >
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1="0" x2={W} y1={H - H * f} y2={H - H * f} className="hr-chart__grid" />
      ))}
      {data.map((d, i) => {
        const x = i * gap + gap / 2 - bw;
        return (
          <g key={d.label} opacity={d.started ? 1 : 0.35}>
            <rect
              x={x}
              y={H - (d.a / max) * H}
              width={bw}
              height={(d.a / max) * H}
              className="hr-chart__a"
            >
              <title>{`${d.label}: net payable ${inr(d.a)}`}</title>
            </rect>
            <rect
              x={x + bw}
              y={H - (d.b / max) * H}
              width={bw}
              height={(d.b / max) * H}
              className="hr-chart__b"
            >
              <title>{`${d.label}: paid ${inr(d.b)}`}</title>
            </rect>
            <text x={i * gap + gap / 2} y={H + 18} textAnchor="middle" className="hr-chart__label">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Dashboard({ db, results, months, monthIdx, setMonthIdx, go }) {
  const staff = db.staff;
  const R = staff.map((s) => results[s.id]);
  const started = months.map(monthStarted);
  const cur = monthIdx;

  const perMonth = useMemo(
    () =>
      months.map((m, i) => {
        const rows = R.map((r) => r[i]);
        const on = rows.filter((r) => r.emp > 0);
        return {
          label: m.label,
          ym: m.ym,
          started: started[i],
          head: on.length,
          fixed: sum(on, (r) => r.gross),
          earn: sum(rows, (r) => r.totEarn),
          ded: sum(rows, (r) => r.ded),
          net: sum(rows, (r) => r.net),
          paid: sum(rows, (r) => r.paidAmt),
          close: sum(rows, (r) => r.closeDue),
          prev: sum(rows, (r) => r.prevDue),
          pf: sum(rows, (r) => r.pfChallan),
          esi: sum(rows, (r) => r.esiChallan),
          tds: sum(rows, (r) => r.tds),
          cost: sum(rows, (r) => r.cost),
          settled: rows.filter((r) => r.thisSalary && r.thisSalary.startsWith('Paid')).length,
          salaries: rows.filter((r) => r.thisSalary).length,
        };
      }),
    [R, months, started],
  );

  const opening = sum(staff, (s) => Number(s.opening_due) || 0);
  const fyNet =
    sum(
      perMonth.filter((m) => m.started),
      (m) => m.net,
    ) + opening;
  const fyPaid = sum(perMonth, (m) => m.paid);
  const cm = perMonth[cur];
  const count = (st) => staff.filter((s) => s.status === st).length;
  const current = staff.filter((s) => !EXITED.includes(s.status));
  const attention = [];
  for (const s of staff) {
    if (EXITED.includes(s.status)) continue;
    if (s.status !== 'Provisional' && !(Number(s.gross) > 0))
      attention.push([s, 'Salary not entered']);
    const a = pccAlert(s);
    if (a.level !== 'ok') attention.push([s, a.text]);
  }
  const monthlyCTC = sum(
    staff.filter((s) => ON_ROLL.includes(s.status) && !s.dol),
    (s) => {
      const g = (Number(s.gross) || 0) + (Number(s.night_salary) || 0);
      const sp = salarySplit(g, db.settings);
      const pf =
        s.deduct_pf === 'Y'
          ? Math.min(
              Math.round(Math.min(sp.codeWages, db.settings.pf.ceilNew) * db.settings.pf.er),
              db.settings.pf.max,
            )
          : 0;
      return g + pf;
    },
  );

  return (
    <div className="hr-page">
      <header className="hr-head">
        <div>
          <h1>{db.settings.org}</h1>
          <p className="hr-muted">
            As on {fmtLongDate(todayIso())}. Pick a month below to see it in detail.
          </p>
        </div>
        <div className="hr-head__actions">
          <button className="hr-btn" onClick={() => go('attendance')}>
            Mark attendance
          </button>
          <button className="hr-btn hr-btn--primary" onClick={() => go('payroll')}>
            Run salary
          </button>
        </div>
      </header>

      <MonthRibbon months={months} value={cur} onChange={setMonthIdx} results={R} />

      <section className="hr-grid hr-grid--stats">
        <Stat label="Staff on record" value={staff.length} note={`${current.length} current`} />
        <Stat
          label="Active / permanent"
          value={count('Active') + count('Permanent') + count('Notice Period')}
          tone="ok"
        />
        <Stat
          label="Provisional"
          value={count('Provisional')}
          tone="amber"
          note="no salary until confirmed"
        />
        <Stat
          label="PCC alerts"
          value={attention.filter((a) => a[1].startsWith('PCC')).length}
          tone={attention.some((a) => a[1].startsWith('PCC')) ? 'bad' : undefined}
        />
        <Stat label="Monthly payroll (approx. CTC)" value={inr(monthlyCTC)} />
      </section>

      <section className="hr-panel">
        <div className="hr-panel__head">
          <h2>{ymLabel(cm.ym, true)}</h2>
          {!cm.started && <Badge tone="mute">not started yet</Badge>}
        </div>
        <div className="hr-grid hr-grid--stats">
          <Stat label="On payroll" value={cm.head} />
          <Stat label="Total earnings" value={inr(cm.earn)} />
          <Stat label="Deductions" value={inr(cm.ded)} />
          <Stat
            label="Net payable"
            value={inr(cm.net)}
            note={cm.prev ? `+ ${inr(cm.prev)} brought forward` : undefined}
          />
          <Stat label="Paid" value={inr(cm.paid)} tone="ok" />
          <Stat label="Still due" value={inr(cm.close)} tone={cm.close > 0 ? 'bad' : undefined} />
        </div>
        <p className="hr-muted hr-small">
          PF challan {inr(cm.pf)} · ESI challan {inr(cm.esi)} · TDS {inr(cm.tds)} · Salaries settled{' '}
          {cm.settled} of {cm.salaries}
        </p>
      </section>

      <section className="hr-grid hr-grid--two">
        <div className="hr-panel">
          <div className="hr-panel__head">
            <h2>This year so far</h2>
          </div>
          <div className="hr-grid hr-grid--stats3">
            <Stat label="Net payable (incl. brought forward)" value={inr(fyNet)} />
            <Stat label="Paid" value={inr(fyPaid)} tone="ok" />
            <Stat
              label="Balance due"
              value={inr(fyNet - fyPaid)}
              tone={fyNet - fyPaid > 0 ? 'bad' : undefined}
            />
          </div>
          <Bars
            data={perMonth.map((m) => ({
              label: m.label,
              a: m.net + m.prev,
              b: m.paid,
              started: m.started,
            }))}
          />
          <p className="hr-legend">
            <span className="hr-key hr-key--a" /> Total payable{' '}
            <span className="hr-key hr-key--b" /> Paid
          </p>
        </div>
        <div className="hr-panel">
          <div className="hr-panel__head">
            <h2>Needs attention</h2>
          </div>
          {attention.length === 0 ? (
            <p className="hr-muted">Nothing needs attention.</p>
          ) : (
            <ul className="hr-list">
              {attention.slice(0, 12).map(([s, t], i) => (
                <li key={i}>
                  <button className="hr-link" onClick={() => go('staff')}>
                    {s.name}
                  </button>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
          {count('Provisional') > 0 && (
            <p className="hr-muted hr-small">
              {count('Provisional')} provisional staff: confirm them on the Staff page once
              certification is received.
            </p>
          )}
        </div>
      </section>

      <section className="hr-panel">
        <div className="hr-panel__head">
          <h2>Month by month</h2>
        </div>
        <div className="hr-table-wrap">
          <table className="hr-table hr-table--num">
            <thead>
              <tr>
                <th>Month</th>
                <th>Staff</th>
                <th>Fixed salary</th>
                <th>Earnings</th>
                <th>Deductions</th>
                <th>Net payable</th>
                <th>Brought fwd</th>
                <th>Paid</th>
                <th>Due (c/f)</th>
                <th>PF challan</th>
                <th>ESI challan</th>
                <th>TDS</th>
                <th>Cost to Trust</th>
                <th>Settled</th>
              </tr>
            </thead>
            <tbody>
              {perMonth.map((m, i) => (
                <tr
                  key={m.ym}
                  className={(i === cur ? 'is-cur ' : '') + (m.started ? '' : 'is-future')}
                  onClick={() => setMonthIdx(i)}
                >
                  <td>
                    {m.label} {months[i].year}
                  </td>
                  <td>{m.head}</td>
                  <td>{inr(m.fixed)}</td>
                  <td>{inr(m.earn)}</td>
                  <td>{inr(m.ded)}</td>
                  <td>{inr(m.net)}</td>
                  <td>{inr(m.prev)}</td>
                  <td>{inr(m.paid)}</td>
                  <td className={m.close > 0 && m.started ? 'hr-bad' : ''}>{inr(m.close)}</td>
                  <td>{inr(m.pf)}</td>
                  <td>{inr(m.esi)}</td>
                  <td>{inr(m.tds)}</td>
                  <td>{inr(m.cost)}</td>
                  <td>{m.salaries ? `${m.settled}/${m.salaries}` : '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="hr-grid hr-grid--three">
        <div className="hr-panel">
          <h2>By department</h2>
          <ul className="hr-counts">
            {db.settings.departments.map((d) => (
              <li key={d}>
                <span>{d}</span>
                <b>{current.filter((s) => s.department === d).length}</b>
              </li>
            ))}
          </ul>
        </div>
        <div className="hr-panel">
          <h2>By status</h2>
          <ul className="hr-counts">
            {['Active', 'Permanent', 'Provisional', 'Notice Period', ...EXITED].map((s) => (
              <li key={s}>
                <span>{s}</span>
                <b>{count(s)}</b>
              </li>
            ))}
          </ul>
        </div>
        <div className="hr-panel">
          <h2>PCC (current staff)</h2>
          <ul className="hr-counts">
            {[...PCC_STATUSES, ''].map((p) => (
              <li key={p || 'none'}>
                <span>{p || 'Not recorded'}</span>
                <b>{current.filter((s) => (s.pcc_status || '') === p).length}</b>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
/* eslint-disable react/prop-types */
