// Formatting helpers: Indian currency, dates, number-to-words.
export const inr = (n, dec = 0) => {
  const v = Number(n) || 0;
  if (v === 0) return '–';
  return (
    '₹' + v.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec })
  );
};
export const num = (n, dec = 2) =>
  (Number(n) || 0).toLocaleString('en-IN', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
export const days = (n) => {
  const v = Number(n) || 0;
  return v === 0 ? '–' : Number.isInteger(v) ? String(v) : v.toFixed(1);
};

// Dates are stored as 'YYYY-MM-DD' strings. Work in UTC to avoid timezone shifts.
export const toDate = (s) => {
  if (!s) return null;
  const [y, m, d] = s.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
export const iso = (d) => d.toISOString().slice(0, 10);
export const dayNum = (s) => (s ? Math.floor(toDate(s).getTime() / 86400000) : null);
export const todayIso = () => {
  const t = new Date();
  return iso(new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())));
};
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const fmtDate = (s) => {
  if (!s) return '—';
  const d = toDate(s);
  return `${String(d.getUTCDate()).padStart(2, '0')}-${MON[d.getUTCMonth()]}-${d.getUTCFullYear()}`;
};
export const fmtLongDate = (s) => {
  if (!s) return '';
  const d = toDate(s);
  return `${d.getUTCDate()} ${MONTH_FULL[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};
export const ymLabel = (ym, long = false) => {
  const [y, m] = ym.split('-').map(Number);
  return `${(long ? MONTH_FULL : MON)[m - 1]} ${y}`;
};

const ONES = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const two = (n) =>
  n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
export function rupeesInWords(amount) {
  let n = Math.round(Number(amount) || 0);
  if (n <= 0) return 'Zero Rupees only';
  const parts = [];
  const crore = Math.floor(n / 1e7);
  n %= 1e7;
  const lakh = Math.floor(n / 1e5);
  n %= 1e5;
  const thousand = Math.floor(n / 1e3);
  n %= 1e3;
  const hundred = Math.floor(n / 100);
  n %= 100;
  if (crore) parts.push(two(crore) + ' Crore');
  if (lakh) parts.push(two(lakh) + ' Lakh');
  if (thousand) parts.push(two(thousand) + ' Thousand');
  if (hundred) parts.push(ONES[hundred] + ' Hundred');
  if (n) parts.push(two(n));
  return parts.join(' ') + ' Rupees only';
}
export const experienceText = (months) => {
  if (months == null) return '—';
  const y = Math.floor(months / 12),
    m = months % 12;
  return `${y} ${y === 1 ? 'yr' : 'yrs'}${m ? ` ${m} ${m === 1 ? 'mth' : 'mths'}` : ''}`;
};
