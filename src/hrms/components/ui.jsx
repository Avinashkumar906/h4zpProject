/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { MONTHS } from '../lib/defaults';

export function Field({ label, hint, children, wide }) {
  return (
    <label className={'hr-field' + (wide ? ' hr-field--wide' : '')}>
      <span className="hr-field__label">{label}</span>
      {children}
      {hint && <span className="hr-field__hint">{hint}</span>}
    </label>
  );
}
export const Input = ({ value, onChange, type = 'text', ...p }) => (
  <input
    className="hr-input"
    type={type}
    value={value ?? ''}
    onChange={(e) => onChange(e.target.value)}
    {...p}
  />
);
export const Select = ({ value, onChange, options, placeholder, ...p }) => (
  <select
    className="hr-input"
    value={value ?? ''}
    onChange={(e) => onChange(e.target.value)}
    {...p}
  >
    {placeholder !== undefined && <option value="">{placeholder}</option>}
    {options.map((o) =>
      typeof o === 'string' ? (
        <option key={o} value={o}>
          {o}
        </option>
      ) : (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ),
    )}
  </select>
);
export function Modal({ title, onClose, children, footer, size }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div
      className="hr-modal"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={'hr-modal__box' + (size === 'wide' ? ' hr-modal__box--wide' : '')}>
        <header className="hr-modal__head">
          <h2>{title}</h2>
          <button className="hr-icon-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <div className="hr-modal__body">{children}</div>
        {footer && <footer className="hr-modal__foot">{footer}</footer>}
      </div>
    </div>
  );
}
export const Badge = ({ tone = 'neutral', children }) => (
  <span className={`hr-badge hr-badge--${tone}`}>{children}</span>
);
export const statusTone = (s) =>
  ({
    Active: 'ok',
    Permanent: 'ok',
    'Notice Period': 'warn',
    Provisional: 'amber',
    Resigned: 'mute',
    Terminated: 'mute',
    Absconding: 'bad',
    Inactive: 'mute',
  })[s] || 'neutral';
export const payTone = (s) =>
  ({
    Paid: 'ok',
    'Paid – This Month Only': 'ok',
    'Paid in later month': 'info',
    Partial: 'warn',
    'Partly paid': 'warn',
    'On Hold': 'mute',
    Pending: 'bad',
    Due: 'bad',
  })[s] || 'neutral';

/** The FY ribbon — twelve months, each showing how much of its salary is settled. */
export function MonthRibbon({ months, value, onChange, results }) {
  return (
    <div className="hr-ribbon" role="tablist" aria-label="Month">
      {months.map((m, i) => {
        let state = 'future';
        if (results) {
          const rows = results.map((r) => r[i]).filter((r) => r.net > 0 && r.thisSalary);
          if (m.start <= new Date().toISOString().slice(0, 10))
            state =
              rows.length === 0
                ? 'none'
                : rows.every((r) => r.thisSalary.startsWith('Paid'))
                  ? 'paid'
                  : rows.some(
                        (r) => r.thisSalary.startsWith('Paid') || r.thisSalary === 'Partly paid',
                      )
                    ? 'part'
                    : 'due';
        }
        return (
          <button
            key={m.ym}
            role="tab"
            aria-selected={value === i}
            className={`hr-ribbon__m hr-ribbon__m--${state}` + (value === i ? ' is-on' : '')}
            onClick={() => onChange(i)}
          >
            <span className="hr-ribbon__name">{MONTHS[i]}</span>
            <span className="hr-ribbon__yr">{String(m.year).slice(2)}</span>
          </button>
        );
      })}
    </div>
  );
}
export const Empty = ({ title, children }) => (
  <div className="hr-empty">
    <p className="hr-empty__title">{title}</p>
    {children}
  </div>
);
export function Stat({ label, value, tone, note }) {
  return (
    <div className={'hr-stat' + (tone ? ` hr-stat--${tone}` : '')}>
      <span className="hr-stat__label">{label}</span>
      <span className="hr-stat__value">{value}</span>
      {note && <span className="hr-stat__note">{note}</span>}
    </div>
  );
}
/* eslint-disable react/prop-types */
