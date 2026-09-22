'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useMouseParallax } from '@/hooks/useMouseParallax';

interface AboutData {
  headlinePart1: string;
  headlinePart2: string;
  body: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  shard1Image: string;
  shard2Image: string;
}

const DEFAULT_ABOUT: AboutData = {
  headlinePart1: 'Built on',
  headlinePart2: 'Precision.',
  body: 'What began as a focused design studio has grown into a multidisciplinary consultancy known for raw aesthetic clarity, uncompromised detailing, and the relentless pursuit of perfection. True spatial luxury is found in precision of proportion, quiet light, and the enduring honesty of materials.',
  stat1Value: '120+',
  stat1Label: 'Environments',
  stat2Value: '04',
  stat2Label: 'Pillars',
  shard1Image: '/images/calicut-courtyard.jpg',
  shard2Image: '/images/detail-craft.jpg',
};

export default function About() {
  const mousePos = useMouseParallax();
  const [content, setContent] = useState<AboutData>(DEFAULT_ABOUT);

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data.about) setContent(data.about);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="aboutus" className="section-vh" style={{ backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* Floating Shard 1 (Background deep) */}
      <div style={{
        position: 'absolute', top: '10%', left: '10%', width: '30vw', height: '40vh',
        transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 0) rotate(-5deg)`,
        transition: 'transform 0.4s ease-out', zIndex: 1, opacity: 0.6,
        borderRadius: '30px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)'
      }} className="hide-mobile">
        <Image src={content.shard1Image} alt="Architecture Fragment" fill style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      </div>

      {/* Floating Shard 2 (Foreground shallow) */}
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-2%', width: '35vw', height: '50vh',
        transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 40}px, 0) rotate(3deg)`,
        transition: 'transform 0.2s ease-out', zIndex: 3,
        borderRadius: '30px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
      }} className="hide-mobile">
        <Image src={content.shard2Image} alt="Detail Fragment" fill style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 100%)' }} />
      </div>

      {/* Main Central Typography */}
      <div className="container-wide" style={{ position: 'relative', zIndex: 5, padding: '0 3rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        
        <div style={{
          transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0)`,
          transition: 'transform 0.3s ease-out', maxWidth: '1000px'
        }}>
          <span data-reveal="up" data-delay="1" style={{ 
            fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '4px', color: '#888', 
            textTransform: 'uppercase', display: 'block', marginBottom: '2rem'
          }}>
            Our Philosophy
          </span>
          
          <h2 data-reveal="up" data-delay="2" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5.6vw, 6.4rem)', color: '#FFF',
            lineHeight: 0.9, textTransform: 'uppercase', margin: '0 0 3rem 0', textShadow: '0 10px 40px rgba(0,0,0,0.8)'
          }}>
            {content.headlinePart1} <br/><span style={{ color: '#CCC' }}>{content.headlinePart2}</span>
          </h2>
          
          <p data-reveal="up" data-delay="3" style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: '#BBB',
            lineHeight: 1.8, maxWidth: '800px', margin: '0 auto 4rem auto', textShadow: '0 5px 20px rgba(0,0,0,0.8)'
          }}>
            {content.body}
          </p>
          
          <div style={{ display: 'flex', gap: '4rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <div data-reveal="up" data-delay="4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: '#FFF', lineHeight: 1 }}>{content.stat1Value}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', color: '#888', textTransform: 'uppercase' }}>{content.stat1Label}</span>
            </div>
            <div data-reveal="up" data-delay="5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: '#FFF', lineHeight: 1 }}>{content.stat2Value}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', color: '#888', textTransform: 'uppercase' }}>{content.stat2Label}</span>
            </div>
            <div data-reveal="up" data-delay="6">
              <a href="#projects" className="hover-lift about-btn" style={{
                display: 'inline-flex', alignItems: 'center', gap: '1rem',
                backgroundColor: '#FFF', color: '#000', padding: '1.2rem 2.5rem', borderRadius: '40px',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', textDecoration: 'none'
              }}>
                Explore Approach <ArrowRight size={16} className="about-arrow" style={{ transition: 'transform 0.3s ease' }} />
              </a>
            </div>
          </div>
        </div>

      </div>
      <style jsx>{`
        .about-btn:hover .about-arrow { transform: translateX(6px); }
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
