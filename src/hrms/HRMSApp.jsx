import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './hrms.css';
import logo from './assets/logo.png';
import { DEMO_MODE } from './lib/supabaseClient';
import * as store from './lib/store';
import { computeAll, fyMonths, currentMonthIndex } from './lib/payroll';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Staff from './pages/Staff';
import Attendance from './pages/Attendance';
import Payroll from './pages/Payroll';
import Payslip from './pages/Payslip';
import Leave from './pages/Leave';
import StaffList from './pages/StaffList';
import Statement from './pages/Statement';
import Payments from './pages/Payments';
import Settings from './pages/Settings';

const PAGES = [
  ['dashboard', 'Dashboard', Dashboard],
  ['staff', 'Staff', Staff],
  ['attendance', 'Attendance', Attendance],
  ['payroll', 'Salary & payments', Payroll],
  ['payslip', 'Payslips', Payslip],
  ['leave', 'Leave', Leave],
  ['payments', 'Payment tracker', Payments],
  ['statement', 'Employee statement', Statement],
  ['stafflist', 'Staff list (print)', StaffList],
  ['settings', 'Settings', Settings],
];

export default function HRMSApp() {
  const [user, setUser] = useState(undefined);
  const [db, setDb] = useState(null);
  const [page, setPage] = useState('dashboard');
  const [monthIdx, setMonthIdx] = useState(null);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    store
      .currentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);
  useEffect(() => {
    if (!user) return;
    store
      .loadAll()
      .then((d) => {
        setDb(d);
        setMonthIdx(currentMonthIndex(fyMonths(d.settings.fyStart)));
      })
      .catch((e) => setError(e.message));
  }, [user]);

  const notify = useCallback((msg, tone = 'ok') => {
    setToast({ msg, tone });
    setTimeout(() => setToast(null), 3200);
  }, []);
  /** Run a store write, update state, show a message. */
  const act = useCallback(
    async (fn, okMsg) => {
      try {
        const n = await fn(db);
        setDb(n);
        if (okMsg) notify(okMsg);
        return true;
      } catch (e) {
        notify(e.message, 'bad');
        return false;
      }
    },
    [db, notify],
  );

  const months = useMemo(() => (db ? fyMonths(db.settings.fyStart) : []), [db]);
  const results = useMemo(() => (db ? computeAll(db) : {}), [db]);

  if (user === undefined)
    return (
      <div className="hrms hr-center">
        <p>Loading…</p>
      </div>
    );
  if (!user) return <Login onLogin={setUser} />;
  if (error)
    return (
      <div className="hrms hr-center">
        <div className="hr-panel">
          <h2>Could not load HRMS data</h2>
          <p>{error}</p>
          <p>
            Check that the database tables were created (supabase/schema.sql) and that this account
            is in the admins table.
          </p>
        </div>
      </div>
    );
  if (!db || monthIdx == null)
    return (
      <div className="hrms hr-center">
        <p>Loading staff and salary data…</p>
      </div>
    );

  const Page = PAGES.find((p) => p[0] === page)[2];
  const ctx = { db, act, store, results, months, monthIdx, setMonthIdx, notify, go: setPage };

  return (
    <div className="hrms">
      <aside className={'hr-side bg-dark' + (menuOpen ? ' is-open' : '')}>
        <div className="hr-brand">
          {/* <img src={logo} alt="H4ZP stamp" /> */}
          <div>
            <strong>H4ZP HRMS</strong>
            <span>
              FY {db.settings.fyStart}-{String(db.settings.fyStart + 1).slice(2)}
            </span>
          </div>
        </div>
        <nav className="hr-nav">
          {PAGES.map(([key, label]) => (
            <button
              key={key}
              className={page === key ? 'is-on' : ''}
              onClick={() => {
                setPage(key);
                setMenuOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="hr-side__foot">
          <span title={user.email}>{user.email}</span>
          <button
            className="hr-link"
            onClick={async () => {
              await store.signOut();
              setUser(null);
              setDb(null);
            }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="hr-main">
        <button className="hr-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          ☰ Menu
        </button>
        {DEMO_MODE && (
          <div className="hr-demo">
            Demo mode — data is saved only in this browser. Connect Supabase (see README) before
            entering real staff details.
          </div>
        )}
        <Page {...ctx} />
      </main>
      {toast && (
        <div className={`hr-toast hr-toast--${toast.tone}`} role="status">
          {toast.msg}
        </div>
      )}
    </div>
  );
}
