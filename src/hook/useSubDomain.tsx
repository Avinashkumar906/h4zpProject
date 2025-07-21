import { useMemo } from 'react';

export const useSubdomain = (): string | null => {
  return useMemo(() => {
    if (typeof window === 'undefined') return null;

    const host = window.location.hostname; // e.g., admin.h4zpindia.org

    const parts = host.split('.');

    // Handle localhost or IPs gracefully
    if (parts.length < 3) {
      return null;
    }

    // Example: ['admin', 'h4zpindia', 'org']
    const subdomain = parts.slice(0, parts.length - 2).join('.');

    // Ignore 'www'
    if (subdomain === 'www') return null;

    return subdomain;
  }, []);
};
