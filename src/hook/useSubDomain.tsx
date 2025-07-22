import { useMemo } from 'react';

export const useSubdomain = (): string | null => {
  return useMemo(() => {
    if (typeof window === 'undefined') return null;

    const host = window.location.hostname;

    const isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(host);

    if (isLocalhost) {
      // Prompt only once per session to avoid annoyance
      const existing = sessionStorage.getItem('dev-subdomain');
      if (existing) {
        console.log(`🪄 Using injected dev subdomain: ${existing}`);
        return existing || null;
      }

      const subdomain = window.prompt(
        'Enter a subdomain for local testing (or leave empty for none):',
        '',
      );
      if (subdomain) {
        sessionStorage.setItem('dev-subdomain', subdomain);
        console.log(`🪄 Using injected dev subdomain: ${subdomain}`);
        return subdomain;
      }
      return null;
    }

    const parts = host.split('.');

    if (parts.length < 3) {
      return null;
    }

    const subdomain = parts.slice(0, parts.length - 2).join('.');

    if (subdomain === 'www') return null;

    return subdomain;
  }, []);
};
