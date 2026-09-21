'use client';

import { useState, useEffect } from 'react';

export function useMouseParallax() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only track if device supports hover to save performance on mobile
    if (window.matchMedia('(hover: hover)').matches) {
      const handleMouseMove = (e: MouseEvent) => {
        // Normalize mouse position between -1 and 1
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setMousePos({ x, y });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return mousePos;
}
