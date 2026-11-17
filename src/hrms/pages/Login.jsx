/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { signIn } from '../lib/store';
import { DEMO_MODE } from '../lib/supabaseClient';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      onLogin(await signIn(email.trim(), password));
    } catch (x) {
      setErr(x.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="hrms hr-login">
      <form className="hr-login__card" onSubmit={submit}>
        <img src={logo} alt="Hands 4 Zero Poverty Trust" className="hr-login__logo" />
        <h1>Staff & salary records</h1>
        <p className="hr-muted">Hands 4 Zero Poverty Trust — admin access only</p>
        <label className="hr-field">
          <span className="hr-field__label">Email</span>
          <input
            className="hr-input"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={!DEMO_MODE}
          />
        </label>
        <label className="hr-field">
          <span className="hr-field__label">Password</span>
          <input
            className="hr-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {err && (
          <p className="hr-error" role="alert">
            {err}
          </p>
        )}
        <button className="hr-btn hr-btn--primary hr-btn--block" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        {DEMO_MODE && (
          <p className="hr-hint">
            Demo mode: any email, password <b>h4zp-demo</b>.
          </p>
        )}
      </form>
    </div>
  );
}
/* eslint-disable react/prop-types */
