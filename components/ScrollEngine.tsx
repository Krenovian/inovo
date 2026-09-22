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

    const observeRevealElements = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        observer.observe(el);
      });
    };
    observeRevealElements(); // Initial observation

    // ─── Parallax Scroll Effect ───
    let parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]');
    
    const updateParallaxElements = () => {
      parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]');
    };

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

    // ─── Mutation Observer for Dynamic Elements ───
    // When components like ProjectsShowcase fetch data asynchronously,
    // they insert new DOM elements. We must observe them.
    const domObserver = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          shouldUpdate = true;
          break;
        }
      }
      if (shouldUpdate) {
        observeRevealElements();
        updateParallaxElements();
      }
    });

    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      domObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return null; // This component renders nothing, just initializes effects
}
