'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useMouseParallax } from '@/hooks/useMouseParallax';

const ECOSYSTEM_ENTITIES = [
  { number: '01', name: 'INOVO Developers', descriptor: 'Design Consultancy', link: 'https://www.instagram.com/inovodevelopers' },
  { number: '02', name: 'Upward', descriptor: 'Construction & Project Delivery', link: 'https://www.instagram.com/upward.construction.llp/' },
  { number: '03', name: 'Scale', descriptor: 'Interiors, Furniture & Finishing', link: 'https://www.instagram.com/scale_interiors_llp/' },
  { number: '04', name: 'INOVO Properties', descriptor: 'Property Development & Opportunities', link: 'https://www.instagram.com/inovoproperties.in/' },
];

export default function Ecosystem() {
  const mousePos = useMouseParallax();

  return (
    <section id="ourecosystem" className="section-vh" style={{ backgroundColor: '#000', color: '#FFF', position: 'relative', overflow: 'hidden', padding: 0 }}>
      
      {/* Deep Background Cinematic Marquee */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, width: '100%', transform: 'translateY(-50%)',
        opacity: 0.1, zIndex: 0, whiteSpace: 'nowrap', pointerEvents: 'none', display: 'flex'
      }}>
        <div style={{ display: 'inline-flex', animation: 'marquee 40s linear infinite' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 20rem)', margin: 0, textTransform: 'uppercase', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px #FFF' }}>
            &nbsp;ONE VISION ALL THE WAY THROUGH &nbsp;
          </h1>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem, 20vw, 20rem)', margin: 0, textTransform: 'uppercase', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px #FFF' }}>
            &nbsp;ONE VISION ALL THE WAY THROUGH &nbsp;
          </h1>
        </div>
      </div>

      {/* Main Foreground Content */}
      <div className="container-wide" style={{ position: 'relative', zIndex: 5, padding: '0 3rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Redesigned Massive Header */}
        <div style={{ 
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '4rem',
          marginBottom: 'clamp(4rem, 8vh, 6rem)',
          transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0)`,
          transition: 'transform 0.2s ease-out'
        }}>
          <div data-reveal="up" style={{ flex: '1 1 500px' }}>
            <span style={{ 
              fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '4px', color: '#888', 
              textTransform: 'uppercase', display: 'block', marginBottom: '2rem'
            }}>
              The Ecosystem
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5.6vw, 5.6rem)', color: '#FFF',
              lineHeight: 0.9, margin: 0, textTransform: 'uppercase', textShadow: '0 10px 40px rgba(0,0,0,0.8)'
            }}>
              One Vision.<br/>
              <span style={{ color: '#555' }}>All the way through.</span>
            </h2>
          </div>
          
          <div data-reveal="left" data-delay="1" style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <p className="body-lg" style={{
              color: '#CCC', margin: 0, fontSize: 'clamp(1rem, 1.2vw, 1.2rem)', lineHeight: 1.6, textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              Rather than hand off drawings to disconnected third parties, the INOVO ecosystem unifies master consultancy, structural delivery, interior craft, and property opportunities under one cohesive creative ethos.
            </p>
          </div>
        </div>

        {/* Ecosystem Rows */}
        <div style={{ 
          display: 'flex', flexDirection: 'column', gap: '0', borderTop: '1px solid rgba(255,255,255,0.1)',
          transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`,
          transition: 'transform 0.3s ease-out'
        }}>
          {ECOSYSTEM_ENTITIES.map((entity, i) => (
            <a key={entity.number}
              href={entity.link}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal="up" data-delay={String(i + 1)}
              style={{
                display: 'grid', gridTemplateColumns: 'clamp(40px, 5vw, 80px) 1fr auto',
                alignItems: 'center', gap: 'clamp(1rem, 3vw, 3rem)',
                padding: 'clamp(2rem, 4vh, 3rem) 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative', overflow: 'hidden', textDecoration: 'none'
              }}
              className="eco-row"
            >
              <div className="eco-hover-bg" style={{
                position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.03)',
                transform: 'scaleY(0)', transformOrigin: 'bottom', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)', zIndex: 0
              }} />

              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 1.6vw, 1.6rem)',
                color: '#444', transition: 'color 0.4s ease', position: 'relative', zIndex: 2
              }} className="eco-num">{entity.number}</span>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 4vw, 3.2rem)',
                  textTransform: 'uppercase', lineHeight: 1, margin: '0 0 0.5rem 0',
                  color: '#FFF', transition: 'color 0.4s ease, transform 0.4s ease',
                  textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }} className="eco-name">{entity.name}</h3>
                <span style={{
                  fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', color: '#888',
                  fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', transition: 'color 0.4s ease, transform 0.4s ease 0.1s'
                }} className="eco-desc">{entity.descriptor}</span>
              </div>

              <div style={{
                width: 'clamp(50px, 6vw, 80px)', height: 'clamp(50px, 6vw, 80px)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', zIndex: 2
              }} className="eco-arrow">
                <ArrowUpRight size={24} color="#FFF" style={{ transition: 'all 0.4s ease' }} className="eco-arrow-icon" />
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        :global(.eco-row):hover :global(.eco-hover-bg) { transform: scaleY(1) !important; transform-origin: top !important; }
        :global(.eco-row):hover :global(.eco-num) { color: #FFF !important; }
        :global(.eco-row):hover :global(.eco-name) { color: #FFF !important; transform: translateX(20px); }
        :global(.eco-row):hover :global(.eco-desc) { color: #CCC !important; transform: translateX(20px); display: inline-block; }
        :global(.eco-row):hover :global(.eco-arrow) {
          background: #FFF !important;
          border-color: #FFF !important;
          transform: scale(1.1);
        }
        :global(.eco-row):hover :global(.eco-arrow-icon) {
          stroke: #000 !important;
          transform: rotate(45deg);
        }
      `}</style>
    </section>
  );
}
