import { createClient } from '@supabase/supabase-js';

// Keys come from your .env file (see README).
//   Create React App:  REACT_APP_SUPABASE_URL / REACT_APP_SUPABASE_ANON_KEY
//   Vite:              VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
let url, key;
try {
  url = process.env.REACT_APP_SUPABASE_URL;
  key = process.env.REACT_APP_SUPABASE_ANON_KEY;
} catch (e) {
  /* not CRA */
}
try {
  url = url || import.meta.env.VITE_SUPABASE_URL;
  key = key || import.meta.env.VITE_SUPABASE_ANON_KEY;
} catch (e) {
  /* not Vite */
}

export const supabase = url && key ? createClient(url, key) : null;
/** Without keys the HRMS runs in demo mode: data stays in this browser only. */
export const DEMO_MODE = !supabase;
