'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useMouseParallax } from '@/hooks/useMouseParallax';

const FOUNDERS = [
  { name: 'Bilal M', role: 'Co-Founder & Managing Partner', image: '/images/founder-bilal.jpg',
    quote: 'True spatial luxury is found in precision of proportion, quiet light, and the enduring honesty of materials.' },
  { name: 'Anu Shamil', role: 'Co-Founder & Managing Partner', image: '/images/founder-anu.jpg',
    quote: 'Our responsibility is to ensure that what begins as an inspired concept on paper survives every challenge of construction intact.' },
];

export default function Team() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [exactMousePos, setExactMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const mousePos = useMouseParallax();

  return (
    <section id="team" className="section-vh" 
      onMouseMove={(e) => setExactMousePos({ x: e.clientX, y: e.clientY })}
      onMouseEnter={() => setIsHoveringSection(true)}
      onMouseLeave={() => setIsHoveringSection(false)}
      style={{ backgroundColor: '#FAFAFA', position: 'relative', overflow: 'hidden' }}
    >
      
      {/* Floating Custom Cursor Text (Follows exact mouse position) */}
      <div style={{
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
        transform: `translate(${exactMousePos.x + 20}px, ${exactMousePos.y + 20}px)`,
        opacity: isHoveringSection && hoveredIndex === null ? 1 : 0,
        transition: 'opacity 0.3s ease, transform 0.05s linear',
      }} className="hide-mobile">
        <span style={{
          backgroundColor: '#000', color: '#FFF', padding: '0.5rem 1rem', borderRadius: '30px',
          fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
          whiteSpace: 'nowrap', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          Hover to reveal
        </span>
      </div>
      
      {/* Floating Magnetic Portrait */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', pointerEvents: 'none', zIndex: 10,
        transform: `translate(-50%, -50%) translate3d(${mousePos.x * 300}px, ${mousePos.y * 300}px, 0) scale(${hoveredIndex !== null ? 1 : 0.8})`,
        opacity: hoveredIndex !== null ? 1 : 0,
        transition: 'opacity 0.4s ease, transform 0.2s ease-out',
        width: 'clamp(250px, 30vw, 400px)', height: 'clamp(350px, 45vw, 550px)',
        borderRadius: '20px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
      }} className="hide-mobile">
        {FOUNDERS.map((f, i) => (
          <div key={`img-${i}`} style={{
            position: 'absolute', inset: 0,
            opacity: hoveredIndex === i ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }}>
            <Image src={f.image} alt={f.name} fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      <div className="container-wide" style={{ position: 'relative', zIndex: 5, padding: '0 3rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Header */}
        <div data-reveal="up" style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
          <span style={{ 
            fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '4px', color: '#888', 
            textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem'
          }}>
            Leadership
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4.8vw, 4.8rem)', color: '#000',
            textTransform: 'uppercase', lineHeight: 1, margin: 0
          }}>
            The founding<br /><span style={{ color: '#888' }}>partners.</span>
          </h2>
        </div>

        {/* Cinematic Typographic List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {FOUNDERS.map((f, i) => (
            <div key={f.name} 
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-reveal="up" data-delay={String(i + 1)} 
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap',
                padding: '2rem 0', borderBottom: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer',
                transition: 'all 0.4s ease', opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.3
              }}
              className="team-row"
            >
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5.6vw, 6.4rem)', color: '#000',
                  textTransform: 'uppercase', lineHeight: 0.9, margin: '0 0 1rem 0', transition: 'transform 0.4s ease'
                }} className="team-name">{f.name}</h3>
                <span style={{ 
                  display: 'block', fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8rem, 1vw, 1rem)', 
                  color: '#555', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', transition: 'transform 0.4s ease'
                }} className="team-role">{f.role}</span>
              </div>
              
              {/* Mobile-only visible portrait */}
              <div className="show-mobile" style={{
                width: 'min(70%, 260px)',
                aspectRatio: '3 / 4',
                position: 'relative',
                marginTop: '1.5rem',
                borderRadius: '15px',
                overflow: 'hidden',
                backgroundColor: '#eee',
              }}>
                <Image src={f.image} alt={f.name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              
              <div style={{ maxWidth: '400px', opacity: hoveredIndex === i ? 1 : 0.5, transition: 'opacity 0.4s ease' }} className="hide-mobile">
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666', lineHeight: 1.6, fontStyle: 'italic'
                }}>"{f.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        :global(.team-row):hover :global(.team-name) { transform: translateX(20px); }
        :global(.team-row):hover :global(.team-role) { transform: translateX(20px); }
        .show-mobile { display: none !important; }
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
