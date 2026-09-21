'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollEngine — Initializes IntersectionObserver for [data-reveal] elements
 * and scroll-based parallax for [data-parallax] images.
 * Place this once inside your page component.
 */
export default function ScrollEngine() {
  const rafId = useRef<number>(0);

  useEffect(() => {
    // ─── Scroll Reveal (IntersectionObserver) ───
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));

    // ─── Parallax Scroll Effect ───
    const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]');

    const handleParallax = () => {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;

      parallaxElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax || '0.15');

        // Only process if element is in viewport (with buffer)
        if (rect.bottom > -200 && rect.top < viewH + 200) {
          const center = rect.top + rect.height / 2;
          const distFromCenter = center - viewH / 2;
          const translateY = distFromCenter * speed;
          el.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(handleParallax);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleParallax(); // Initial call

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return null; // This component renders nothing, just initializes effects
}
