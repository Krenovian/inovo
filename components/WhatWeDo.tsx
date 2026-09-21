'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { PRIMARY_SERVICES } from '@/data/services';

const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  'design-planning': { src: '/images/model.jpg', alt: 'Design and planning by INOVO' },
  'interior-design': { src: '/images/interior-living.jpg', alt: 'Interior design by INOVO' },
  'site-supervision': { src: '/images/site-supervision.jpg', alt: 'Site supervision by INOVO' },
};

export default function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mousePos = useMouseParallax();
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      const scrolled = -rect.top;

      if (scrolled >= 0 && scrolled <= scrollDistance) {
        const progress = scrolled / scrollDistance;
        const index = Math.min(
          PRIMARY_SERVICES.length - 1,
          Math.floor(progress * PRIMARY_SERVICES.length)
        );
        setActiveIndex(index);
      } else if (scrolled < 0) {
        setActiveIndex(0);
      } else if (scrolled > scrollDistance) {
        setActiveIndex(PRIMARY_SERVICES.length - 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const active = PRIMARY_SERVICES[activeIndex];

  return (
    <section
      ref={containerRef}
      id="whatwedo"
      style={{
        height: `${PRIMARY_SERVICES.length * 100}vh`,
        backgroundColor: '#000',
        padding: 0,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {PRIMARY_SERVICES.map((service, i) => {
          const img = SERVICE_IMAGES[service.id];
          return (
            <div
              key={service.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === activeIndex ? 1 : 0,
                transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform:
                    i === activeIndex
                      ? `scale(1.05) translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`
                      : 'scale(1)',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.55) 100%)',
                }}
              />
            </div>
          );
        })}

        <div
          className="container-wide"
          style={{
            position: 'relative',
            zIndex: 5,
            height: '100%',
            padding: '0 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: 'clamp(3rem, 7vh, 5rem)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '3rem',
              width: '100%',
              transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 8}px, 0)`,
              transition: 'transform 0.35s ease-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(1.5rem, 3vw, 3rem)', maxWidth: '780px' }}>
              <span
                key={`n-${active.number}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                  color: '#FFF',
                  lineHeight: 1,
                }}
              >
                {active.number}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                    margin: '0 0 1rem',
                  }}
                >
                  What We Do
                </p>
                <h3
                  key={`t-${active.id}`}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)',
                    color: '#FFF',
                    textTransform: 'uppercase',
                    lineHeight: 0.92,
                    margin: 0,
                    textShadow: '0 10px 30px rgba(0,0,0,0.8)',
                  }}
                >
                  {active.title}
                </h3>
                <p
                  key={`d-${active.id}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#CCC',
                    fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                    maxWidth: '560px',
                    lineHeight: 1.7,
                    margin: '1.5rem 0 0',
                  }}
                >
                  {active.shortDesc}
                </p>
              </div>
            </div>

            <div
              className="hide-mobile"
              key={`del-${active.id}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                maxWidth: '280px',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '0.25rem',
                }}
              >
                Deliverables
              </span>
              {active.deliverables.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: '#EEE',
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                    paddingBottom: '0.65rem',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              marginTop: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            {PRIMARY_SERVICES.map((service, i) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={service.title}
                style={{
                  width: i === activeIndex ? 42 : 26,
                  height: 3,
                  border: 0,
                  padding: 0,
                  background:
                    i === activeIndex
                      ? '#FFF'
                      : i < activeIndex
                        ? 'rgba(255,255,255,0.45)'
                        : 'rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
