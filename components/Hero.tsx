'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { useMouseParallax } from '@/hooks/useMouseParallax';

const FALLBACK_SLIDES = [
  { id: 'wayanad', title: 'The Mist Pavilion', location: 'Wayanad', image: '/images/wayanad-pavilion.jpg' },
  { id: 'calicut', title: 'Nalukettu Continuum', location: 'Calicut', image: '/images/calicut-courtyard.jpg' },
  { id: 'kannur', title: 'Arabian Horizon', location: 'Kannur', image: '/images/kannur-cliff.jpg' },
  { id: 'kochi', title: 'Waterfront Penthouse', location: 'Kochi', image: '/images/kochi-penthouse.jpg' },
  { id: 'malappuram', title: 'Laterite Grove', location: 'Malappuram', image: '/images/malappuram-estate.jpg' },
];

const DYNAMIC_HEADINGS = [
  'Context &\nExecution',
  'Light &\nShadow',
  'Form &\nVoid',
  'Nature &\nStructure',
  'Material &\nTruth',
];

const Typewriter = ({
  text,
  delay = 0,
  speed = 40,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const initTimer = setTimeout(() => {
      let i = 0;
      const typeNext = () => {
        if (i < text.length) {
          setDisplayed(text.substring(0, i + 1));
          i++;
          timeout = setTimeout(typeNext, speed);
        }
      };
      typeNext();
    }, delay);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(timeout);
    };
  }, [text, delay, speed]);

  return <span>{displayed}</span>;
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  
  // Settings State
  const [settings, setSettings] = useState<Record<string, string>>({});
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', type: 'Residential', phoneNumber: '' });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) {
      const waNum = settings.whatsappNumber;
      if (waNum) {
        const text = `Name: ${form.name}\nEmail: ${form.email}\nType: ${form.type}\nPhone Number: ${form.phoneNumber}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/${waNum.replace(/[^0-9]/g, '')}?text=${encodedText}`, '_blank');
      }
      setIsModalOpen(false);
    }
  };

  const mousePos = useMouseParallax();

  // Fetch dynamic slides from DB
  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data.heroSlides && data.heroSlides.length > 0) {
          setSlides(data.heroSlides.map((s: { id: string; title: string; location: string; image: string }) => ({
            id: s.id, title: s.title, location: s.location, image: s.image,
          })));
          if (data.settings) {
            setSettings(data.settings);
          }
        }
      })
      .catch(() => {/* keep fallback */});
  }, []);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = height - viewportHeight;
      const scrolled = -top;

      let progress = 0;
      if (scrolled >= 0 && scrolled <= scrollableDistance) {
        progress = scrolled / scrollableDistance;
      } else if (scrolled > scrollableDistance) {
        progress = 1;
      }
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalSlides = slides.length;
  const activeIndex = Math.min(Math.floor(scrollProgress * totalSlides), totalSlides - 1);
  const activeSlide = slides[activeIndex];


  const smoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const dynamicHeadingsList = settings.heroHeadings 
    ? settings.heroHeadings.split(',').map(s => s.trim().replace(/\\n/g, '\n'))
    : DYNAMIC_HEADINGS;
  
  // Ensure we don't go out of bounds if there are fewer headings than slides
  const activeHeading = dynamicHeadingsList[activeIndex % dynamicHeadingsList.length] || dynamicHeadingsList[0];

  const word1 = settings.heroWord1 || 'Purpose';
  const word2 = settings.heroWord2 || 'Legacy';
  const manifesto = settings.heroManifesto || 'Spaces shaped with intention — lasting beyond the moment.';
  const subtext = settings.heroSubtext || 'We don\'t just design spaces; we curate environments that speak louder than words.';

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{ width: '100%', height: '400vh', backgroundColor: '#FFF', position: 'relative' }}
    >
      <div className={`hero-sticky${loaded ? ' is-in' : ''}`}>
        {/* ── Text half (desktop: row; mobile: top 50%) ── */}
        <div className="hero-text-pane">
          {/* Desktop headlines */}
          <div className="hero-headlines-desk hide-mobile">
            <h1>
              <span className="hero-prefix">Design with</span>
              {loaded && <Typewriter text={word1} delay={500} />}
            </h1>
            <h1 className="is-right">
              <span className="hero-prefix">Define by</span>
              {loaded && <Typewriter text={word2} delay={1200} />}
            </h1>
          </div>

          {/* Mobile manifesto — half screen */}
          <div className="hero-manifesto show-mobile">
            <div className="hero-manifesto-block is-a">
              <span className="hero-manifesto-label">Design with</span>
              <h1 className="hero-manifesto-word">
                {loaded && <Typewriter text={word1} delay={400} speed={55} />}
              </h1>
            </div>

            <div className="hero-manifesto-divider" aria-hidden>
              <span />
              <em>and</em>
              <span />
            </div>

            <div className="hero-manifesto-block is-b">
              <span className="hero-manifesto-label">Define by</span>
              <h1 className="hero-manifesto-word is-ghost">
                {loaded && <Typewriter text={word2} delay={1100} speed={55} />}
              </h1>
            </div>

            <p className="hero-manifesto-note">
              {manifesto}
            </p>
          </div>
        </div>

        {/* Universal Scroll Indicator */}
        <div className="hero-scroll-indicator" style={{ opacity: scrollProgress > 0.95 ? 0 : 1 }}>
          <div className="scroll-indicator-text">
            <span>Scroll</span>
            <strong>{Math.round(scrollProgress * 100)}%</strong>
          </div>
          <div className="scroll-indicator-track">
            <div className="scroll-indicator-fill" style={{ width: `${scrollProgress * 100}%` }} />
          </div>
        </div>

        {/* Elevation — desktop */}
        <div className="hero-elevation hide-mobile">
          <span>Elevation</span>
          <div className="hero-scale">
            {[0, 25, 50, 75, 100].map((tick) => (
              <div
                key={tick}
                className="hero-tick"
                style={{ top: `${tick}%`, width: tick % 50 === 0 ? 12 : 6 }}
              />
            ))}
            <div className="hero-indicator" style={{ top: `${scrollProgress * 100}%` }}>
              <i />
            </div>
          </div>
        </div>

        {/* ── Image half ── */}
        <div className="hero-stage">
          <div
            className="hero-media"
            style={{
              transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0) scale(1.05)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`hero-slide${index === activeIndex ? ' is-active' : ''}`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            ))}
            <div className="hero-vignette" aria-hidden />
          </div>

          {/* Desktop columns */}
          <div
            className="hero-desk-left hide-mobile"
            style={{
              transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
            }}
          >
            <span>Selected Works</span>
            <h2 key={`h-${activeIndex}`} className="dynamic-scramble">
              {activeHeading}
            </h2>
            <p>
              {subtext}
            </p>
            <a
              href="#projects"
              onClick={(e) => smoothScroll(e, '#projects')}
              className="hero-cta hover-lift"
            >
              Explore Our Work
              <span>
                <ArrowRight size={14} />
              </span>
            </a>
          </div>

          <div
            className="hero-desk-right hide-mobile"
            style={{
              transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0)`,
            }}
          >
            <div className="hero-status">
              <span>Current Status</span>
              <h3>{settings.availabilityStatus || 'Accepting New Projects'}</h3>
              <p>{settings.availabilityNote || 'For Q4 2026 onwards.'}</p>
              <button onClick={() => setIsModalOpen(true)} className="hero-cta-sm hover-lift" style={{ border: 'none', cursor: 'pointer' }}>
                {settings.enquireText || 'Enquire Now'} <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div
            key={`desk-t-${activeIndex}`}
            className="hero-desk-title hide-mobile dynamic-fade-up"
          >
            <h3>{activeSlide.title}</h3>
            <p>{activeSlide.location}</p>
          </div>

          {/* Mobile image overlay */}
          <div className="hero-mobile-stage show-mobile">
            <div className="hero-mobile-top">
              <span>Selected Works</span>
              <strong>
                {String(activeIndex + 1).padStart(2, '0')}
                <em>/{String(totalSlides).padStart(2, '0')}</em>
              </strong>
            </div>

            <div key={`m-h-${activeIndex}`} className="hero-mobile-heading dynamic-scramble">
              {activeHeading}
            </div>

            <div className="hero-mobile-foot">
              <div key={`m-t-${activeIndex}`} className="hero-mobile-project dynamic-fade-mobile">
                <h3>{activeSlide.title}</h3>
                <p>{activeSlide.location}</p>
              </div>
              <div className="hero-mobile-progress" aria-hidden>
                {slides.map((s, i) => (
                  <i
                    key={s.id}
                    className={
                      i === activeIndex ? 'is-on' : i < activeIndex ? 'is-past' : undefined
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="hero-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="hero-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="hero-modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </button>
            <h2 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#000', fontSize: '2rem' }}>
              Enquire Now
            </h2>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="hero-input-group">
                <label htmlFor="name">Name *</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleFormChange} placeholder="ENTER YOUR NAME" />
                <div className="input-line"></div>
              </div>
              <div className="hero-input-group">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleFormChange} placeholder="EMAIL ADDRESS" />
                <div className="input-line"></div>
              </div>
              <div className="hero-input-group">
                <label htmlFor="type">Type *</label>
                <select id="type" name="type" value={form.type} onChange={handleFormChange}>
                  {['Residential', 'Commercial', 'Hospitality', 'Interiors', 'Architecture', 'Other'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <div className="input-line"></div>
              </div>
              <div className="hero-input-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input id="phoneNumber" name="phoneNumber" type="tel" required value={form.phoneNumber} onChange={handleFormChange} placeholder="PHONE NUMBER" />
                <div className="input-line"></div>
              </div>
              <button type="submit" className="hero-cta hover-lift" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', background: '#000', color: '#fff' }}>
                Submit via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .hero-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100svh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 1rem;
          padding-top: 8rem;
        }

        .hero-text-pane {
          z-index: 10;
          flex-shrink: 0;
        }

        .hero-headlines-desk {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 0 2rem;
          gap: 0.75rem;
        }
        .hero-headlines-desk h1 {
          font-family: var(--font-display);
          font-size: clamp(1.65rem, 4.8vw, 5.6rem);
          color: #000;
          margin: 0;
          text-transform: uppercase;
          line-height: 0.9;
          min-height: clamp(2rem, 6vw, 7rem);
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.35rem 0.75rem;
        }
        .hero-headlines-desk h1.is-right {
          text-align: right;
          justify-content: flex-end;
        }
        .hero-prefix {
          font-size: 0.4em;
          letter-spacing: 2px;
          font-weight: 500;
          font-family: var(--font-body);
          opacity: 0.85;
        }


        .hero-elevation {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          gap: 1rem;
          align-items: center;
          z-index: 20;
          opacity: 0;
          transition: opacity 1s ease 2s;
        }
        
        .hero-scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 3rem;
          z-index: 30;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        
        .scroll-indicator-text {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          color: #000;
          mix-blend-mode: difference;
          color: #fff;
        }
        
        .scroll-indicator-text span {
          font-family: var(--font-body);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
          opacity: 0.8;
        }
        
        .scroll-indicator-text strong {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 400;
        }
        
        .scroll-indicator-track {
          width: 120px;
          height: 2px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
          mix-blend-mode: difference;
        }
        
        .scroll-indicator-fill {
          height: 100%;
          background: #fff;
          transition: width 0.1s linear;
        }
        .hero-sticky.is-in .hero-elevation {
          opacity: 1;
        }
        .hero-elevation > span {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 3px;
          color: #fff;
          text-transform: uppercase;
        }
        .hero-scale {
          position: relative;
          width: 20px;
          height: 150px;
          border-left: 1px solid rgba(255, 255, 255, 0.3);
        }
        .hero-tick {
          position: absolute;
          left: 0;
          height: 1px;
          background: #fff;
        }
        .hero-indicator {
          position: absolute;
          left: 0;
          width: 15px;
          height: 2px;
          background: #fff;
          transition: top 0.1s ease-out;
        }
        .hero-indicator i {
          position: absolute;
          right: -4px;
          top: -3px;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-right: 4px solid #fff;
        }

        .hero-stage {
          flex: 1;
          min-height: 0;
          background: #000;
          border-radius: 40px;
          margin-top: 1.5rem;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: space-between;
          padding: clamp(2rem, 3vw, 4rem);
          opacity: 0;
          transform: scale(0.98) translateY(20px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
        }
        .hero-sticky.is-in .hero-stage {
          opacity: 1;
          transform: none;
        }

        .hero-media {
          position: absolute;
          inset: 0;
          z-index: 1;
          transition: transform 0.3s ease-out;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }
        .hero-slide.is-active {
          opacity: 1;
        }
        .hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }

        .hero-desk-left,
        .hero-desk-right {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          max-width: 300px;
          transition: transform 0.25s ease-out;
        }
        .hero-desk-left {
          justify-content: center;
        }
        .hero-desk-left > span {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #ccc;
          text-transform: uppercase;
        }
        .hero-desk-left h2 {
          font-family: var(--font-display);
          font-size: 4rem;
          color: #fff;
          line-height: 1;
          margin: 1rem 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          white-space: pre-line;
        }
        .hero-desk-left p {
          font-family: var(--font-body);
          font-size: 1rem;
          color: #eee;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }
        .hero-cta {
          background: #fff;
          color: #000;
          border-radius: 30px;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.9rem;
          width: fit-content;
          text-transform: uppercase;
          text-decoration: none;
        }
        .hero-cta span {
          background: #000;
          color: #fff;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-desk-right {
          justify-content: flex-end;
          align-items: flex-end;
        }
        .hero-tags {
          display: flex;
          gap: 2rem;
        }
        .hero-tags div {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .hero-tags span {
          font-size: 1.2rem;
          font-family: var(--font-display);
          color: #fff;
        }
        .hero-tags em {
          font-style: normal;
          font-family: var(--font-body);
          font-size: 0.7rem;
          color: #ccc;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .hero-status {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 20px;
          padding: 2rem;
          width: 260px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          backdrop-filter: blur(15px);
        }
        .hero-status > span {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .hero-status h3 {
          margin: 0;
          font-size: 1.5rem;
          font-family: var(--font-display);
          color: #fff;
          text-transform: uppercase;
          line-height: 1.1;
        }
        .hero-status p {
          margin: 0;
          font-size: 0.9rem;
          color: #ddd;
          font-family: var(--font-body);
          line-height: 1.5;
        }
        .hero-cta-sm {
          margin-top: 1rem;
          background: #fff;
          color: #000;
          padding: 0.8rem 1.5rem;
          border-radius: 20px;
          display: flex;
          gap: 0.5rem;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
        }
        
        .hero-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        
        .hero-modal-content {
          background: #fff;
          padding: 3rem 2rem;
          border-radius: 20px;
          width: 100%;
          max-width: 500px;
          position: relative;
        }

        .hero-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
        }
        
        .hero-input-group {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .hero-input-group label {
          font-family: 'var(--font-body)';
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #888;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .hero-input-group input, .hero-input-group select {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'var(--font-body)';
          font-size: 1rem;
          font-weight: 500;
          color: #000;
          padding: 0.5rem 0;
          width: 100%;
          text-transform: uppercase;
          appearance: none;
          cursor: pointer;
        }
        .hero-input-group input::placeholder {
          color: #CCC;
        }
        .input-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: rgba(0,0,0,0.1);
          transform-origin: left;
          transition: transform 0.4s ease, background-color 0.4s ease;
        }
        .hero-input-group:focus-within .input-line {
          background-color: #000;
          transform: scaleY(2);
        }
        .hero-desk-title {
          position: absolute;
          bottom: clamp(1.5rem, 4vh, 3rem);
          left: 50%;
          text-align: center;
          width: 100%;
          z-index: 2;
          pointer-events: none;
        }
        .hero-desk-title h3 {
          font-family: var(--font-display);
          color: #fff;
          font-size: clamp(1.2rem, 3.2vw, 2.4rem);
          margin: 0;
          text-transform: uppercase;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        .hero-desk-title p {
          font-family: var(--font-body);
          color: #ccc;
          margin: 0.5rem 0 0;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: clamp(0.6rem, 2vw, 0.9rem);
          font-weight: 600;
        }

        .show-mobile {
          display: none !important;
        }

        @keyframes scramble {
          0% {
            filter: blur(10px);
            opacity: 0;
            transform: translateX(-20px);
            letter-spacing: -5px;
          }
          100% {
            filter: blur(0);
            opacity: 1;
            transform: translateX(0);
            letter-spacing: normal;
          }
        }
        @keyframes fadeUpDynamic {
          0% {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        @keyframes fadeUpMobile {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes manifestoIn {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }
        .dynamic-scramble {
          animation: scramble 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .dynamic-fade-up {
          animation: fadeUpDynamic 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .dynamic-fade-mobile {
          animation: fadeUpMobile 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ════════ Mobile: 35 / 65 split ════════ */
        @media (max-width: 960px) {
          .hide-mobile {
            display: none !important;
          }
          .show-mobile {
            display: flex !important;
          }

          .hero-sticky {
            padding: 0;
            padding-top: 0;
            display: grid;
            grid-template-rows: 35svh 65svh;
            height: 100svh;
          }

          .hero-text-pane {
            height: 100%;
            min-height: 0;
            display: flex;
            flex-direction: column;
            background:
              radial-gradient(ellipse 80% 60% at 10% 20%, rgba(0, 0, 0, 0.04), transparent 60%),
              radial-gradient(ellipse 70% 50% at 90% 80%, rgba(0, 0, 0, 0.03), transparent 55%),
              #fff;
            padding: calc(var(--nav-height, 96px) + 0.35rem) 1.25rem 0.85rem;
            box-sizing: border-box;
            overflow: hidden;
          }

          .hero-manifesto {
            flex: 1;
            min-height: 0;
            flex-direction: column;
            justify-content: flex-start;
            gap: clamp(0.4rem, 1.2vh, 0.85rem);
          }

          .hero-manifesto-block {
            opacity: 0;
            animation: manifestoIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .hero-manifesto-block.is-a {
            animation-delay: 0.2s;
          }
          .hero-manifesto-block.is-b {
            animation-delay: 0.45s;
            text-align: right;
            align-self: flex-end;
          }

          .hero-manifesto-label {
            display: block;
            font-family: var(--font-body);
            font-size: 0.68rem;
            font-weight: 600;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #888;
            margin-bottom: 0.35rem;
          }

          .hero-manifesto-word {
            margin: 0;
            font-family: var(--font-display);
            font-size: clamp(2.6rem, 12vw, 4.2rem);
            line-height: 0.88;
            letter-spacing: -0.04em;
            text-transform: uppercase;
            color: #000;
            display: inline-flex;
            align-items: baseline;
          }
          .hero-manifesto-word.is-ghost {
            color: transparent;
            -webkit-text-stroke: 1.5px rgba(0, 0, 0, 0.55);
          }

          .hero-manifesto-word.is-ghost em {
            background: rgba(0, 0, 0, 0.45);
          }

          .hero-manifesto-divider {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            width: 100%;
            opacity: 0;
            animation: manifestoIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
          }
          .hero-manifesto-divider span {
            flex: 1;
            height: 1px;
            background: rgba(0, 0, 0, 0.12);
          }
          .hero-manifesto-divider em {
            font-style: normal;
            font-family: var(--font-body);
            font-size: 0.58rem;
            font-weight: 600;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #aaa;
          }

          .hero-manifesto-note {
            margin: 0.35rem 0 0;
            max-width: 16rem;
            font-family: var(--font-body);
            font-size: 0.78rem;
            line-height: 1.55;
            color: #666;
            opacity: 0;
            animation: manifestoIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.65s forwards;
          }

          .hero-stage {
            height: 100%;
            margin-top: 0;
            border-radius: 0;
            padding: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
          }

          .hero-vignette {
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.88) 0%,
              rgba(0, 0, 0, 0.25) 45%,
              rgba(0, 0, 0, 0.35) 100%
            );
          }

          .hero-mobile-stage {
            position: absolute;
            inset: 0;
            z-index: 5;
            flex-direction: column;
            justify-content: space-between;
            padding: 1rem 1.15rem 1.15rem;
          }

          .hero-mobile-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .hero-mobile-top span {
            font-family: var(--font-body);
            font-size: 0.6rem;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.6);
          }
          .hero-mobile-top strong {
            font-family: var(--font-display);
            font-size: 0.9rem;
            color: #fff;
            font-weight: 400;
          }
          .hero-mobile-top em {
            font-style: normal;
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.75rem;
          }

          .hero-mobile-heading {
            font-family: var(--font-display);
            font-size: clamp(1.7rem, 8vw, 2.35rem);
            line-height: 0.95;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: -0.03em;
            white-space: pre-line;
            text-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
            max-width: 12rem;
          }

          .hero-mobile-foot {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          .hero-mobile-project h3 {
            margin: 0;
            font-family: var(--font-display);
            font-size: clamp(1.05rem, 4.5vw, 1.3rem);
            color: #fff;
            text-transform: uppercase;
            letter-spacing: -0.02em;
            line-height: 1.05;
          }
          .hero-mobile-project p {
            margin: 0.3rem 0 0;
            font-family: var(--font-body);
            font-size: 0.62rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.55);
          }
          .hero-mobile-progress {
            display: flex;
            gap: 0.3rem;
          }
          .hero-mobile-progress i {
            display: block;
            width: 18px;
            height: 2px;
            background: rgba(255, 255, 255, 0.22);
            transition: all 0.35s ease;
          }
          .hero-mobile-progress i.is-past {
            background: rgba(255, 255, 255, 0.45);
          }
          .hero-mobile-progress i.is-on {
            width: 32px;
            background: #fff;
          }

          .hero-scroll-indicator {
            left: 1.25rem;
            bottom: calc(65svh + 1.25rem); /* Just above the image section, in the text pane */
            mix-blend-mode: normal;
          }
          
          .scroll-indicator-text {
            color: #000; /* Black for text pane */
          }
          .scroll-indicator-track {
            background: rgba(0, 0, 0, 0.1);
          }
          .scroll-indicator-fill {
            background: #000;
          }
        }

        @media (max-width: 380px) {
          .hero-manifesto-word {
            font-size: clamp(2.7rem, 14vw, 3.4rem);
          }
          .hero-manifesto-note {
            font-size: 0.72rem;
          }
        }
      `}</style>
    </section>
  );
}
