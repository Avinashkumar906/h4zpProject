/* eslint-disable react/prop-types */
// H4ZP payroll engine — same rules as the H4ZP HRMS workbook.
// All amounts in rupees; dates are 'YYYY-MM-DD' strings.
import { MONTHS, EXITED } from './defaults';
import { dayNum, iso, todayIso } from './format';

const N = (v) => (v === '' || v == null || isNaN(Number(v)) ? 0 : Number(v));
const round = (v) => Math.round(v + 1e-9);
const roundUp = (v) => Math.ceil(v - 1e-9);

/** The 12 months of the financial year: [{ym, label, start, end, dim, index}] */
export function fyMonths(fyStart) {
  return MONTHS.map((label, i) => {
    const y = i >= 9 ? fyStart + 1 : fyStart;
    const m = ((i + 3) % 12) + 1;
    const start = new Date(Date.UTC(y, m - 1, 1));
    const end = new Date(Date.UTC(y, m, 0));
    return {
      ym: `${y}-${String(m).padStart(2, '0')}`,
      label,
      index: i,
      start: iso(start),
      end: iso(end),
      dim: end.getUTCDate(),
      year: y,
      month: m,
    };
  });
}
export const monthStarted = (mo) => mo.start <= todayIso();
export const currentMonthIndex = (months) => {
  let k = 0;
  months.forEach((m, i) => {
    if (monthStarted(m)) k = i;
  });
  return k;
};

/** PF wage ceiling for a month (pro-rated in the month the ceiling changes). */
export function pfCeiling(mo, S) {
  const d = dayNum(S.pf.ceilDate),
    s = dayNum(mo.start),
    e = dayNum(mo.end);
  if (e < d) return S.pf.ceilOld;
  if (s >= d) return S.pf.ceilNew;
  return round((S.pf.ceilOld * (d - s) + S.pf.ceilNew * (e - d + 1)) / mo.dim);
}

/** Date from which an employee is on payroll (Infinity while Provisional). */
export function payrollFrom(st) {
  if (st.status === 'Provisional') return Infinity;
  return Math.max(dayNum(st.doj) ?? -Infinity, dayNum(st.confirm_date) ?? -Infinity);
}

/** Salary rate (day gross, night) in force on a date: latest revision on/before date, else base salary. */
export function rateOn(st, revisions, dateIso) {
  const mine = revisions.filter(
    (r) => r.staff_id === st.id && r.effective_from && r.effective_from <= dateIso,
  );
  mine.sort((a, b) => (a.effective_from < b.effective_from ? 1 : -1));
  const base = { gross: N(st.gross), night: N(st.night_salary) };
  if (mine.length && (!st.salary_effective || mine[0].effective_from >= st.salary_effective))
    return { gross: N(mine[0].gross), night: N(mine[0].night) };
  return base;
}

export function salarySplit(total, S) {
  const basic = round(total * S.basicPct),
    da = round(total * S.daPct),
    hra = round(basic * S.hraPctOfBasic);
  const conv = Math.min(N(S.conveyance), Math.max(0, total - basic - da - hra));
  return {
    basic,
    da,
    hra,
    conv,
    special: total - basic - da - hra - conv,
    codeWages: Math.max(basic + da, round(total * S.minWagePct)),
  };
}

export function annualTax(annualGross, S) {
  const T = Math.max(0, annualGross - S.tax.std);
  if (T <= S.tax.rebate) return 0;
  const sl = S.tax.slabs;
  let tax = 0;
  for (let i = 0; i < sl.length; i++) {
    const [from, rate] = sl[i];
    const step = rate - (i ? sl[i - 1][1] : 0);
    if (T > from) tax += (T - from) * step;
  }
  tax = Math.min(tax, T - S.tax.rebate); // marginal relief just above the rebate limit
  return round(tax * (1 + S.tax.cess));
}

/** Leave entitlement for the FY (0 while Provisional; pro-rated for mid-year starts). */
export function leaveEntitlement(st, type, S) {
  if (st.status === 'Provisional') return 0;
  const full = N(S.leave[type]);
  if (!S.leave.prorate) return full;
  const fys = dayNum(`${S.fyStart}-04-01`),
    fye = dayNum(`${S.fyStart + 1}-03-31`);
  const from = Math.max(fys, payrollFrom(st));
  const frac = Math.min(1, Math.max(0, (fye - from + 1) / (fye - fys + 1)));
  return Math.round(full * frac * 2) / 2;
}

function ageOn(dob, dateIso) {
  if (!dob) return null;
  const [y1, m1, d1] = dob.split('-').map(Number),
    [y2, m2, d2] = dateIso.split('-').map(Number);
  return y2 - y1 - (m2 < m1 || (m2 === m1 && d2 < d1) ? 1 : 0);
}

/**
 * Compute the whole financial year for one employee.
 * att:  { [ym]: { codes: {1:'P',...}, extra: {...} } }
 * pay:  { [ym]: { status, partial, date, mode, utr, remarks } }
 */
export function computeYear(st, revisions, att, pay, S) {
  const months = fyMonths(S.fyStart);
  const from = payrollFrom(st);
  const dol = dayNum(st.dol);
  const fys = dayNum(`${S.fyStart}-04-01`),
    fye = dayNum(`${S.fyStart + 1}-03-31`);
  const fyEmpDays = Math.max(0, Math.min(fye, dol ?? fye) - Math.max(fys, from) + 1);
  let clBal = N(st.opening_cl) + leaveEntitlement(st, 'CL', S);
  let elBal = N(st.opening_el) + leaveEntitlement(st, 'EL', S);
  let loanBal = N(st.loan_given);
  let due = N(st.opening_due);
  const out = [];

  for (const mo of months) {
    const a = att[mo.ym] || { codes: {}, extra: {} };
    const x = a.extra || {};
    const s = dayNum(mo.start),
      e = dayNum(mo.end);
    const emp = Math.max(0, Math.min(e, dol ?? e) - Math.max(s, from) + 1);
    const cnt = { P: 0, A: 0, CL: 0, SL: 0, EL: 0, HD: 0, LWP: 0, WO: 0, HO: 0 };
    if (emp > 0)
      for (let d = 1; d <= mo.dim; d++) {
        const c = a.codes?.[d];
        if (c && cnt[c] !== undefined) cnt[c]++;
      }

    let rowStatus = st.status;
    if (emp === 0) {
      if (st.status === 'Provisional' || (st.confirm_date && dayNum(st.confirm_date) > e))
        rowStatus = 'Provisional';
      else if (st.doj && dayNum(st.doj) > e) rowStatus = 'Not yet joined';
      else if (dol != null && dol < s) rowStatus = 'Left';
      else rowStatus = 'Not on payroll';
    }

    // leave auto-adjustment: Absent / Half-day / direct-entry absences covered from CL, then EL
    const absd = emp > 0 ? cnt.A + 0.5 * cnt.HD + N(x.xabs) : 0;
    const clOpen = clBal,
      elOpen = elBal;
    const clAdj = S.leave.adjust && emp > 0 ? Math.min(absd, Math.max(0, clOpen - cnt.CL)) : 0;
    const elAdj =
      S.leave.adjust && emp > 0 ? Math.min(absd - clAdj, Math.max(0, elOpen - cnt.EL)) : 0;
    clBal = clOpen - cnt.CL - clAdj;
    elBal = elOpen - cnt.EL - elAdj;
    const lop = Math.min(emp, absd - clAdj - elAdj + cnt.LWP);
    const paid = Math.max(0, emp - lop);
    const div = N(st.divisor) || N(S.divisor) || mo.dim;

    const rate = emp > 0 ? rateOn(st, revisions, mo.end) : { gross: 0, night: 0 };
    const gross = rate.gross + rate.night;
    const egross =
      emp === 0
        ? 0
        : Math.max(
            0,
            round(
              (rate.gross * emp) / mo.dim -
                (rate.gross / div) * lop +
                (rate.night * emp) / mo.dim -
                (rate.night / div) * Math.min(N(x.nabs), emp),
            ),
          );
    const sp = salarySplit(egross, S);
    const otPay = round((gross / div) * N(x.ot));
    const blocked = emp === 0 && (st.status === 'Provisional' || from > e);
    const extras = N(x.arrears) + N(x.bonus) + N(x.incentive) + N(x.other_earn);
    const totEarn = blocked ? 0 : egross + otPay + extras;

    // statutory wages (Code on Wages: Basic + DA, at least 50% of gross)
    const eCode = Math.max(sp.basic + sp.da, round(egross * S.minWagePct));
    const arrCode = round(N(x.arrears) * Math.max(S.basicPct + S.daPct, S.minWagePct));
    const rateCode = salarySplit(gross, S).codeWages;
    const esiLimit = st.pwd === 'Y' ? S.esi.pwdLimit : S.esi.limit;
    const esiApplies =
      st.deduct_esi === 'Y' || (st.deduct_esi === 'Auto' && rateCode > 0 && rateCode <= esiLimit);
    const pfWages = st.deduct_pf === 'Y' ? eCode + arrCode : 0;
    const esiWages = esiApplies ? eCode + arrCode : 0;
    const ceil = pfCeiling(mo, S);
    const capped = Math.min(pfWages, ceil);

    const pfEE =
      pfWages === 0
        ? 0
        : N(st.fixed_pf_ee) > 0
          ? N(st.fixed_pf_ee)
          : Math.min(round(capped * S.pf.ee), S.pf.max);
    const esiEE =
      esiWages > 0 && paid > 0
        ? gross / div <= S.esi.dailyExempt
          ? 0
          : roundUp(esiWages * S.esi.ee)
        : 0;
    const pt = paid > 0 ? N(st.pt) : 0;
    const annualGross = round((gross * 12 * fyEmpDays) / (fye - fys + 1));
    const tdsCalc = round(annualTax(annualGross, S) / 12);
    const tds =
      st.deduct_tds === 'Y' && emp > 0
        ? x.tds_override !== '' && x.tds_override != null
          ? N(x.tds_override)
          : N(st.fixed_tds) > 0
            ? N(st.fixed_tds)
            : tdsCalc
        : 0;
    const ded = pfEE + esiEE + pt + tds + N(x.advance) + N(x.other_ded) + N(x.loan_ded);
    const net = round(totEarn - ded);
    const loanOpen = loanBal;
    loanBal = loanOpen - N(x.loan_ded);

    const er12 =
      pfWages === 0
        ? 0
        : N(st.fixed_pf_er) > 0
          ? N(st.fixed_pf_er)
          : Math.min(round(capped * S.pf.er), S.pf.max);
    const age = ageOn(st.dob, mo.start);
    const epsBase = Math.min(N(st.fixed_pf_er) > 0 ? N(st.fixed_pf_er) / S.pf.er : pfWages, ceil);
    const eps =
      pfWages === 0 || (age != null && age >= S.pf.epsAge)
        ? 0
        : Math.min(round(epsBase * S.pf.eps), er12);
    const erEPF = er12 - eps;
    const edli = round(capped * S.pf.edli) + round(capped * S.pf.admin);
    const erESI = esiWages > 0 && paid > 0 ? roundUp(esiWages * S.esi.er) : 0;
    const cost = totEarn + eps + erEPF + edli + erESI;

    // payments & dues carried forward
    const p = pay[mo.ym] || {};
    const status = p.status || 'Pending';
    const prevDue = due,
      totPay = prevDue + net;
    const paidAmt =
      status === 'Paid'
        ? totPay
        : status === 'Paid – This Month Only'
          ? Math.max(0, Math.min(net, totPay))
          : status === 'Partial'
            ? Math.min(N(p.partial), totPay)
            : 0;
    const closeDue = totPay - paidAmt;
    due = closeDue;
    const applied = status === 'Paid – This Month Only' ? 0 : Math.min(prevDue, paidAmt);
    const unpaidThis =
      net <= 0 || status === 'Paid – This Month Only' ? 0 : Math.min(net, closeDue);

    out.push({
      ...mo,
      rowStatus,
      emp,
      cnt,
      absd,
      clOpen,
      clAdj,
      clClose: clBal,
      elOpen,
      elAdj,
      elClose: elBal,
      lop,
      paid,
      div,
      dayRate: rate.gross,
      nightRate: rate.night,
      gross,
      egross,
      ...sp,
      otPay,
      ot: N(x.ot),
      arrears: N(x.arrears),
      arrearsFor: x.arrears_for || '',
      bonus: N(x.bonus),
      bonusType: x.bonus_type || '',
      incentive: N(x.incentive),
      otherEarn: N(x.other_earn),
      totEarn,
      eCode,
      esiApplies,
      pfWages,
      esiWages,
      ceil,
      pfEE,
      esiEE,
      pt,
      annualGross,
      tdsCalc,
      tds,
      advance: N(x.advance),
      otherDed: N(x.other_ded),
      loanDed: N(x.loan_ded),
      ded,
      net,
      loanOpen,
      loanClose: loanBal,
      eps,
      erEPF,
      edli,
      erESI,
      cost,
      pfChallan: pfEE + eps + erEPF + edli,
      esiChallan: esiEE + erESI,
      payment: { ...p, status },
      prevDue,
      totPay,
      paidAmt,
      closeDue,
      applied,
      unpaidThis,
      onPayroll: emp > 0 || totPay > 0,
    });
  }
  // "This month's salary": Paid / Paid in later month / Partly paid / Due
  out.forEach((r, i) => {
    if (!monthStarted(r) || r.net <= 0) {
      r.thisSalary = '';
      return;
    }
    const later = out.slice(i + 1).reduce((t, q) => t + q.applied, 0);
    if (r.unpaidThis === 0) r.thisSalary = 'Paid';
    else if (later >= r.closeDue) r.thisSalary = 'Paid in later month';
    else if (r.unpaidThis < r.net || later > r.closeDue - r.unpaidThis)
      r.thisSalary = 'Partly paid';
    else r.thisSalary = 'Due';
  });
  return out;
}

/** Compute every employee: returns { [staffId]: months[] } */
export function computeAll(db) {
  const res = {};
  for (const st of db.staff)
    res[st.id] = computeYear(
      st,
      db.revisions,
      db.attendance[st.id] || {},
      db.payments[st.id] || {},
      db.settings,
    );
  return res;
}

export function totalExperienceMonths(st) {
  let m = Math.round(N(st.prev_exp_years) * 12);
  if (st.doj) {
    const end = st.dol || todayIso();
    const [y1, m1, d1] = st.doj.split('-').map(Number),
      [y2, m2, d2] = end.split('-').map(Number);
    const diff = (y2 - y1) * 12 + (m2 - m1) - (d2 < d1 ? 1 : 0);
    if (diff > 0) m += diff;
  }
  return m;
}

export function pccAlert(st) {
  const s = st.pcc_status;
  if (!s) return { level: 'warn', text: 'PCC status missing' };
  if (s === 'Adverse Report') return { level: 'bad', text: 'PCC adverse — review' };
  if (s === 'Not Required') return { level: 'ok', text: 'Not required' };
  if (s !== 'Verified – Clear') return { level: 'warn', text: `PCC: ${s}` };
  if (!st.pcc_valid_till) return { level: 'ok', text: 'Clear' };
  const left = dayNum(st.pcc_valid_till) - dayNum(todayIso());
  if (left < 0) return { level: 'bad', text: 'PCC expired' };
  if (left <= 30) return { level: 'warn', text: `PCC expires in ${left} days` };
  return { level: 'ok', text: 'Valid' };
}

export const isExited = (st) => EXITED.includes(st.status);
/* eslint-disable react/prop-types */
