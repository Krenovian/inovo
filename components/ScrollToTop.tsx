'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Next.js App Router can preserve scroll when html { scroll-behavior: smooth }.
 * Force an instant jump to the top on every pathname change.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    // Restore after paint so in-page smooth scroll still works.
    requestAnimationFrame(() => {
      html.style.scrollBehavior = previous;
    });
  }, [pathname]);

  return null;
}
