/* eslint-disable react/prop-types */
import React from 'react';
import { EXITED } from '../lib/defaults';
import { days } from '../lib/format';
import { leaveEntitlement } from '../lib/payroll';
import { Badge, statusTone } from '../components/ui';

export default function Leave({ db, results }) {
  const S = db.settings;
  const staff = db.staff.filter((s) => !EXITED.includes(s.status));
  const sum = (arr, f) => arr.reduce((t, x) => t + f(x), 0);
  return (
    <div className="hr-page">
      <header className="hr-head">
        <div>
          <h1>Leave register</h1>
          <p className="hr-muted">
            FY {S.fyStart}-{String(S.fyStart + 1).slice(2)} · CL {S.leave.CL}, SL {S.leave.SL}, EL{' '}
            {S.leave.EL} days a year
            {S.leave.prorate ? ', pro-rated for mid-year joiners and confirmations' : ''}.
            Provisional staff get no leave until confirmed.
          </p>
        </div>
      </header>
      <div className="hr-table-wrap">
        <table className="hr-table hr-table--num">
          <thead>
            <tr>
              <th className="hr-l">Employee</th>
              <th className="hr-l">Status</th>
              <th>CL entitled</th>
              <th>CL taken</th>
              <th>CL left</th>
              <th>SL entitled</th>
              <th>SL taken</th>
              <th>SL left</th>
              <th>EL entitled</th>
              <th>EL taken</th>
              <th>EL left</th>
              <th>LWP</th>
              <th>Absent</th>
              <th>LOP days</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => {
              const R = results[s.id];
              const t = (k) => sum(R, (r) => r.cnt[k]);
              const cl = {
                e: (Number(s.opening_cl) || 0) + leaveEntitlement(s, 'CL', S),
                t: t('CL') + sum(R, (r) => r.clAdj),
              };
              const sl = {
                e: (Number(s.opening_sl) || 0) + leaveEntitlement(s, 'SL', S),
                t: t('SL'),
              };
              const el = {
                e: (Number(s.opening_el) || 0) + leaveEntitlement(s, 'EL', S),
                t: t('EL') + sum(R, (r) => r.elAdj),
              };
              const cell = (o) => (
                <>
                  <td>{days(o.e)}</td>
                  <td>{days(o.t)}</td>
                  <td className={o.e - o.t < 0 ? 'hr-bad' : ''}>{days(o.e - o.t)}</td>
                </>
              );
              return (
                <tr key={s.id}>
                  <td className="hr-l">
                    {s.name}
                    <small className="hr-sub">{s.emp_id}</small>
                  </td>
                  <td className="hr-l">
                    <Badge tone={statusTone(s.status)}>{s.status}</Badge>
                  </td>
                  {cell(cl)}
                  {cell(sl)}
                  {cell(el)}
                  <td>{days(t('LWP'))}</td>
                  <td>
                    {days(
                      t('A') +
                        sum(R, (r) => Number((db.attendance[s.id]?.[r.ym]?.extra || {}).xabs) || 0),
                    )}
                  </td>
                  <td>{days(sum(R, (r) => r.lop))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="hr-muted hr-small">
        CL and EL taken include absences covered automatically. A negative balance (red) means more
        leave was marked than available.
      </p>
    </div>
  );
}
/* eslint-disable react/prop-types */
