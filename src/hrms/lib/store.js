// Data layer. Uses Supabase when configured; otherwise a browser-only demo store.
import { supabase, DEMO_MODE } from './supabaseClient';
import { DEFAULT_SETTINGS, EMPTY_STAFF } from './defaults';
import { SEED_STAFF } from './seed';

const LS = 'h4zp_hrms_demo_v1';
const uid = () =>
  crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now()) + Math.random().toString(16).slice(2);
const merge = (base, over) => {
  const out = { ...base };
  for (const k of Object.keys(over || {}))
    out[k] =
      over[k] && typeof over[k] === 'object' && !Array.isArray(over[k])
        ? merge(base[k] || {}, over[k])
        : over[k];
  return out;
};

function demoLoad() {
  try {
    const s = JSON.parse(localStorage.getItem(LS));
    if (s) return s;
  } catch (e) {
    /* ignore */
  }
  const db = {
    settings: DEFAULT_SETTINGS,
    staff: SEED_STAFF.map((s) => ({ ...s, id: uid() })),
    revisions: [],
    attendance: {},
    payments: {},
  };
  localStorage.setItem(LS, JSON.stringify(db));
  return db;
}
const demoSave = (db) => localStorage.setItem(LS, JSON.stringify(db));

// ---------- auth ----------
export async function signIn(email, password) {
  if (DEMO_MODE) {
    if (password !== 'h4zp-demo')
      throw new Error('Demo mode: use password h4zp-demo (connect Supabase for real logins).');
    sessionStorage.setItem('h4zp_demo_session', email || 'admin');
    return { email };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error)
    throw new Error(
      error.message === 'Invalid login credentials'
        ? 'Email or password is incorrect.'
        : error.message,
    );
  const { data: ok, error: e2 } = await supabase.rpc('is_admin');
  if (e2 || !ok) {
    await supabase.auth.signOut();
    throw new Error(
      'This account is not an HRMS admin. Ask the Chairperson to add it in Supabase.',
    );
  }
  return data.user;
}
export async function currentUser() {
  if (DEMO_MODE) {
    const e = sessionStorage.getItem('h4zp_demo_session');
    return e ? { email: e } : null;
  }
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;
  const { data: ok } = await supabase.rpc('is_admin');
  return ok ? data.session.user : null;
}
export async function signOut() {
  if (DEMO_MODE) {
    sessionStorage.removeItem('h4zp_demo_session');
    return;
  }
  await supabase.auth.signOut();
}

// ---------- load everything ----------
export async function loadAll() {
  if (DEMO_MODE) {
    const db = demoLoad();
    db.settings = merge(DEFAULT_SETTINGS, db.settings);
    return db;
  }
  const [s, st, rv, at, py] = await Promise.all([
    supabase.from('hrms_settings').select('data').eq('id', 1).maybeSingle(),
    supabase.from('hrms_staff').select('id,data').order('created_at'),
    supabase.from('hrms_salary_revisions').select('*').order('effective_from'),
    supabase.from('hrms_attendance').select('*'),
    supabase.from('hrms_payments').select('*'),
  ]);
  for (const r of [s, st, rv, at, py]) if (r.error) throw new Error(r.error.message);
  const attendance = {},
    payments = {};
  for (const a of at.data) {
    (attendance[a.staff_id] ||= {})[a.ym] = { codes: a.codes || {}, extra: a.extra || {} };
  }
  for (const p of py.data) {
    (payments[p.staff_id] ||= {})[p.ym] = p.data || {};
  }
  return {
    settings: merge(DEFAULT_SETTINGS, s.data?.data || {}),
    staff: st.data.map((r) => ({ ...EMPTY_STAFF, ...r.data, id: r.id })),
    revisions: rv.data.map((r) => ({ ...r, gross: Number(r.gross), night: Number(r.night || 0) })),
    attendance,
    payments,
  };
}

// ---------- writes (each returns the updated db copy) ----------
export async function saveSettings(db, settings) {
  if (DEMO_MODE) {
    const n = { ...db, settings };
    demoSave(n);
    return n;
  }
  const { error } = await supabase.from('hrms_settings').upsert({ id: 1, data: settings });
  if (error) throw new Error(error.message);
  return { ...db, settings };
}
export async function saveStaff(db, st) {
  const dup = db.staff.find(
    (x) => x.emp_id.trim().toLowerCase() === st.emp_id.trim().toLowerCase() && x.id !== st.id,
  );
  if (dup) throw new Error(`Emp ID ${st.emp_id} is already used by ${dup.name}.`);
  const { id, ...data } = st;
  let rec = st;
  if (DEMO_MODE) {
    rec = { ...st, id: id || uid() };
  } else if (id) {
    const { error } = await supabase
      .from('hrms_staff')
      .update({ data, emp_id: st.emp_id })
      .eq('id', id);
    if (error) throw new Error(error.message);
  } else {
    const { data: row, error } = await supabase
      .from('hrms_staff')
      .insert({ data, emp_id: st.emp_id })
      .select('id')
      .single();
    if (error) throw new Error(error.message);
    rec = { ...st, id: row.id };
  }
  const staff = id ? db.staff.map((x) => (x.id === id ? rec : x)) : [...db.staff, rec];
  const n = { ...db, staff };
  if (DEMO_MODE) demoSave(n);
  return n;
}
export async function deleteStaff(db, id) {
  if (!DEMO_MODE) {
    const { error } = await supabase.from('hrms_staff').delete().eq('id', id);
    if (error) throw new Error(error.message);
  }
  const n = {
    ...db,
    staff: db.staff.filter((x) => x.id !== id),
    revisions: db.revisions.filter((r) => r.staff_id !== id),
  };
  if (DEMO_MODE) demoSave(n);
  return n;
}
export async function addRevision(db, rev) {
  if (
    db.revisions.some((r) => r.staff_id === rev.staff_id && r.effective_from === rev.effective_from)
  )
    throw new Error('This employee already has a revision on that date.');
  let rec = { ...rev, id: uid() };
  if (!DEMO_MODE) {
    const { data, error } = await supabase
      .from('hrms_salary_revisions')
      .insert(rev)
      .select('*')
      .single();
    if (error) throw new Error(error.message);
    rec = data;
  }
  const n = { ...db, revisions: [...db.revisions, rec] };
  if (DEMO_MODE) demoSave(n);
  return n;
}
export async function deleteRevision(db, id) {
  if (!DEMO_MODE) {
    const { error } = await supabase.from('hrms_salary_revisions').delete().eq('id', id);
    if (error) throw new Error(error.message);
  }
  const n = { ...db, revisions: db.revisions.filter((r) => r.id !== id) };
  if (DEMO_MODE) demoSave(n);
  return n;
}
/** rows: [{staff_id, ym, codes, extra}] */
export async function saveAttendance(db, rows) {
  if (!DEMO_MODE && rows.length) {
    const { error } = await supabase
      .from('hrms_attendance')
      .upsert(rows, { onConflict: 'staff_id,ym' });
    if (error) throw new Error(error.message);
  }
  const attendance = { ...db.attendance };
  for (const r of rows)
    attendance[r.staff_id] = {
      ...(attendance[r.staff_id] || {}),
      [r.ym]: { codes: r.codes, extra: r.extra },
    };
  const n = { ...db, attendance };
  if (DEMO_MODE) demoSave(n);
  return n;
}
/** rows: [{staff_id, ym, data}] */
export async function savePayments(db, rows) {
  if (!DEMO_MODE && rows.length) {
    const { error } = await supabase
      .from('hrms_payments')
      .upsert(rows, { onConflict: 'staff_id,ym' });
    if (error) throw new Error(error.message);
  }
  const payments = { ...db.payments };
  for (const r of rows) payments[r.staff_id] = { ...(payments[r.staff_id] || {}), [r.ym]: r.data };
  const n = { ...db, payments };
  if (DEMO_MODE) demoSave(n);
  return n;
}
export function exportBackup(db) {
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `h4zp-hrms-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
}
export function resetDemo() {
  localStorage.removeItem(LS);
}
