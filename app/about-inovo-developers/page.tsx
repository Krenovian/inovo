'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollEngine from '@/components/ScrollEngine';
import { useMouseParallax } from '@/hooks/useMouseParallax';

const HEADING = [
  { word: 'About', tone: 'solid' },
  { word: 'INOVO', tone: 'ghost' },
  { word: 'Developers', tone: 'solid' },
];

const EXPERTISE = [
  'Exterior Design',
  'Interior Design',
  'Landscape Design',
  '3D Visualization',
  'Lighting Design',
  'Furniture Design',
  'Construction & Development Solutions',
];

const STORY_LINES = [
  { text: 'Design', ghost: false },
  { text: 'consultancy', ghost: true },
  { text: 'in Calicut', ghost: false },
];

const STORY_A =
  'INOVO Developers is the best design consultancy in Calicut, interior design, landscape design, and visualization company in Calicut, Kerala. We bring together creativity, technical expertise, and careful planning to create spaces that are functional, elegant, and built around our clients’ needs.';

const STORY_B =
  'Our approach is rooted in quality. Every project is developed through detailed study, research, technical knowledge, and creative design thinking. From the first concept to the final visualization, we focus on delivering solutions that meet high industry standards while reflecting the unique vision of every client.';

const CLOSE_COPY =
  'By bringing multiple design disciplines together, we create a seamless experience where architecture, interiors, landscapes, and visual elements work together as one complete concept.';

function sectionProgress(el: HTMLElement | null) {
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const total = rect.height + window.innerHeight;
  const traveled = window.innerHeight - rect.top;
  return Math.min(1, Math.max(0, traveled / total));
}

function CharReveal({
  text,
  active,
  baseDelay = 0,
  className = '',
}: {
  text: string;
  active: boolean;
  baseDelay?: number;
  className?: string;
}) {
  return (
    <span className={`char-reveal ${className}${active ? ' is-on' : ''}`}>
      {text.split('').map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          style={{ transitionDelay: `${baseDelay + i * 0.018}s` }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

function WordReveal({
  text,
  progress,
  className = '',
}: {
  text: string;
  progress: number;
  className?: string;
}) {
  const words = useMemo(() => text.split(' '), [text]);
  return (
    <span className={`word-reveal ${className}`}>
      {words.map((word, i) => {
        const threshold = i / words.length;
        const on = progress > threshold * 0.85 + 0.08;
        return (
          <span
            key={`${word}-${i}`}
            className={on ? 'is-on' : undefined}
            style={{ transitionDelay: `${(i % 6) * 0.02}s` }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
}

export default function AboutUsPage() {
  const mousePos = useMouseParallax();
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLElement>(null);

  const [heroProgress, setHeroProgress] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [closeProgress, setCloseProgress] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [servicesEntered, setServicesEntered] = useState(false);
  const [storyEntered, setStoryEntered] = useState(false);
  const [closeEntered, setCloseEntered] = useState(false);
  const [serviceFlash, setServiceFlash] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    setServiceFlash((n) => n + 1);
  }, [activeService]);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const { top, height } = heroRef.current.getBoundingClientRect();
        setHeroProgress(Math.min(1, Math.max(0, -top / (height * 0.75))));
      }

      setStoryProgress(sectionProgress(storyRef.current));
      setCloseProgress(sectionProgress(closeRef.current));

      if (storyRef.current) {
        const r = storyRef.current.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.78) setStoryEntered(true);
      }
      if (closeRef.current) {
        const r = closeRef.current.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.75) setCloseEntered(true);
      }

      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        const scrollDistance = Math.max(1, rect.height - window.innerHeight);
        const scrolled = -rect.top;

        if (rect.top < window.innerHeight * 0.82) setServicesEntered(true);

        // Guard: if the scroll runway is too short (layout collapse), don't snap to the last item.
        if (scrollDistance < window.innerHeight * 0.5) {
          if (scrolled < 0) setActiveService(0);
          return;
        }

        if (scrolled <= 0) {
          setActiveService(0);
        } else if (scrolled >= scrollDistance) {
          setActiveService(EXPERTISE.length - 1);
        } else {
          const progress = scrolled / scrollDistance;
          // Spread evenly across items; keep last item only near the end of the runway.
          const index = Math.min(
            EXPERTISE.length - 1,
            Math.floor(progress * EXPERTISE.length)
          );
          setActiveService(index);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const storyShift = (storyProgress - 0.35) * 100;
  const closeWordProgress = Math.min(1, Math.max(0, (closeProgress - 0.2) * 1.5));

  return (
    <>
      <ScrollEngine />
      <Navbar />

      <main>
        {/* 01 — HERO */}
        <section ref={heroRef} className="about-hero">
          <div
            aria-hidden
            className={`about-orb about-orb-a${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate3d(${mousePos.x * -28}px, ${mousePos.y * -22}px, 0)`,
            }}
          />
          <div
            aria-hidden
            className={`about-orb about-orb-b${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate3d(${mousePos.x * 36}px, ${mousePos.y * 28}px, 0)`,
            }}
          />

          <span
            aria-hidden
            className={`about-watermark${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate(-50%, calc(-50% + ${heroProgress * 80}px)) scale(${1 + heroProgress * 0.12})`,
              opacity: Math.max(0, 1 - heroProgress * 1.4),
            }}
          >
            ABOUT
          </span>

          <div
            className="container-wide about-hero-inner"
            style={{
              opacity: 1 - heroProgress * 0.95,
              transform: `translate3d(${mousePos.x * 10}px, ${heroProgress * -72 + mousePos.y * 8}px, 0) scale(${1 - heroProgress * 0.05})`,
            }}
          >
            <div className="about-hero-meta">
              <span className={`about-index${loaded ? ' is-in' : ''}`}>01</span>
              <span className={`about-index-label${loaded ? ' is-in' : ''}`}>
                About Us
              </span>
            </div>

            <h1 className="about-heading">
              {HEADING.map((item, i) => (
                <span key={item.word} className="about-line">
                  <span
                    className={`about-word${loaded ? ' is-in' : ''}${item.tone === 'ghost' ? ' is-ghost' : ''}`}
                    style={{ transitionDelay: `${0.22 + i * 0.18}s` }}
                  >
                    {item.word}
                  </span>
                </span>
              ))}
            </h1>

            <div className={`about-rule${loaded ? ' is-in' : ''}`} />

            <p className={`about-subhead${loaded ? ' is-in' : ''}`}>
              Building Better Spaces Through Design & Expertise
            </p>

            <div className={`about-scroll-cue${loaded ? ' is-in' : ''}`} aria-hidden>
              <span>Scroll</span>
              <i />
            </div>
          </div>
        </section>

        {/* 02 — STUDIO */}
        <section ref={storyRef} className="about-story">
          <div
            aria-hidden
            className="about-story-glow"
            style={{
              transform: `translate3d(${mousePos.x * -40}px, ${storyShift * 0.4}px, 0)`,
            }}
          />

          <span
            aria-hidden
            className={`about-story-giant${storyEntered ? ' is-in' : ''}`}
            style={{
              transform: `translate3d(${mousePos.x * -18}px, ${-storyShift * 0.35}px, 0)`,
              opacity: Math.max(0.04, 0.14 - storyProgress * 0.08),
            }}
          >
            02
          </span>

          <div className="container-wide about-story-inner">
            <div
              className="about-story-top"
              style={{
                transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 8 - storyShift * 0.15}px, 0)`,
              }}
            >
              <span className={`about-kicker dark${storyEntered ? ' is-in' : ''}`}>
                <em>02</em>
                <i />
                Studio
              </span>

              <h2 className="about-story-title">
                {STORY_LINES.map((line, i) => (
                  <span
                    key={line.text}
                    className={`story-mask${storyEntered ? ' is-in' : ''}`}
                    style={{ transitionDelay: `${0.12 + i * 0.14}s` }}
                  >
                    <CharReveal
                      text={line.text}
                      active={storyEntered}
                      baseDelay={0.18 + i * 0.12}
                      className={line.ghost ? 'is-ghost' : ''}
                    />
                  </span>
                ))}
              </h2>
            </div>

            <div className="about-story-copy">
              <div
                className={`about-story-col${storyEntered ? ' is-in' : ''}`}
                style={{
                  transitionDelay: '0.35s',
                  transform: `translate3d(${mousePos.x * -8}px, ${(storyProgress - 0.4) * 28}px, 0)`,
                }}
              >
                <span className="about-story-label">Who we are</span>
                <p>
                  <WordReveal text={STORY_A} progress={Math.min(1, storyProgress * 1.6)} />
                </p>
              </div>
              <div
                className={`about-story-col${storyEntered ? ' is-in' : ''}`}
                style={{
                  transitionDelay: '0.5s',
                  transform: `translate3d(${mousePos.x * 8}px, ${(storyProgress - 0.45) * -22}px, 0)`,
                }}
              >
                <span className="about-story-label">Our approach</span>
                <p>
                  <WordReveal text={STORY_B} progress={Math.min(1, (storyProgress - 0.12) * 1.7)} />
                </p>
              </div>
            </div>

            <div className={`about-marquee${storyEntered ? ' is-in' : ''}`} aria-hidden>
              <div className="about-marquee-track">
                {[...EXPERTISE, ...EXPERTISE].map((item, i) => (
                  <span key={`${item}-${i}`}>{item}</span>
                ))}
              </div>
            </div>

            <div className={`about-story-rail${storyEntered ? ' is-in' : ''}`} aria-hidden>
              <span style={{ width: `${Math.min(100, storyProgress * 135)}%` }} />
            </div>
          </div>
        </section>

        {/* 03 — SERVICES */}
        <section
          ref={servicesRef}
          className="about-services"
          style={{ height: `${EXPERTISE.length * 60 + 100}vh` }}
        >
          <div className="about-services-sticky">
            <div
              aria-hidden
              className="about-services-wash"
              style={{
                opacity: servicesEntered ? 1 : 0,
                transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 14}px, 0)`,
              }}
            />

            <div className="container-wide about-services-stage">
              <div
                className={`about-services-head${servicesEntered ? ' is-in' : ''}`}
                style={{
                  transform: `translate3d(${mousePos.x * 6}px, ${mousePos.y * 4}px, 0)`,
                }}
              >
                <span className="about-kicker light is-forced">
                  <em>03</em>
                  <i />
                  Practice
                </span>

                <div className="about-services-head-grid">
                  <div>
                    <h2>
                      {['Integrated', 'Design &', 'Development', 'Services'].map((line, i) => (
                        <span
                          key={line}
                          className={`svc-mask${servicesEntered ? ' is-in' : ''}${i === 2 ? ' is-ghost' : ''}`}
                          style={{ transitionDelay: `${0.08 + i * 0.1}s` }}
                        >
                          <span>{line}</span>
                        </span>
                      ))}
                    </h2>
                  </div>

                  <div className={`about-services-aside${servicesEntered ? ' is-in' : ''}`}>
                    <p>
                      At INOVO Developers, we provide integrated services for
                      residential, commercial, and other built environments. Our
                      expertise includes:
                    </p>
                    <div className="about-services-ticks" aria-hidden>
                      {EXPERTISE.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={i === activeService ? 'is-on' : i < activeService ? 'is-past' : undefined}
                          onClick={() => setActiveService(i)}
                          aria-label={`Service ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-services-board">
                <div
                  key={serviceFlash}
                  className={`about-services-feature${servicesEntered ? ' is-in' : ''}`}
                  style={{
                    transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -8}px, 0)`,
                  }}
                >
                  <span className="about-services-feature-num">
                    {String(activeService + 1).padStart(2, '0')}
                  </span>
                  <h3>
                    <CharReveal
                      key={EXPERTISE[activeService]}
                      text={EXPERTISE[activeService]}
                      active={servicesEntered}
                      baseDelay={0.05}
                    />
                  </h3>
                </div>

                <div className="about-services-track">
                  <div className="about-services-progress" aria-hidden>
                    <div
                      className="about-services-progress-fill"
                      style={{
                        height: `${((activeService + 1) / EXPERTISE.length) * 100}%`,
                      }}
                    />
                  </div>

                  <ol className="about-expertise">
                    {EXPERTISE.map((item, i) => {
                      const isActive = i === activeService;
                      const isPast = i < activeService;
                      return (
                        <li
                          key={item}
                          className={`about-expertise-row${isActive ? ' is-active' : ''}${isPast ? ' is-past' : ''}${servicesEntered ? ' is-in' : ''}`}
                          style={{ transitionDelay: `${0.12 + i * 0.07}s` }}
                          onClick={() => setActiveService(i)}
                        >
                          <span className="about-expertise-num">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="about-expertise-body">
                            <strong>{item}</strong>
                            <div className="about-expertise-line" />
                          </div>
                          <span className="about-expertise-mark" aria-hidden>
                            <i className={isActive ? 'is-on' : undefined} />
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>

              <div className={`about-services-counter${servicesEntered ? ' is-in' : ''}`} aria-hidden>
                <span key={activeService} className="about-services-counter-now">
                  {String(activeService + 1).padStart(2, '0')}
                </span>
                <i>/</i>
                <span>{String(EXPERTISE.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — APPROACH */}
        <section ref={closeRef} className="about-close">
          <div
            aria-hidden
            className={`about-close-ring about-close-ring-a${closeEntered ? ' is-in' : ''}`}
            style={{
              transform: `translate(-50%, -50%) scale(${0.7 + closeProgress * 0.55}) rotate(${closeProgress * 28}deg)`,
            }}
          />
          <div
            aria-hidden
            className={`about-close-ring about-close-ring-b${closeEntered ? ' is-in' : ''}`}
            style={{
              transform: `translate(-50%, -50%) scale(${0.9 + closeProgress * 0.35}) rotate(${-closeProgress * 18}deg)`,
            }}
          />

          <span
            aria-hidden
            className="about-close-watermark"
            style={{
              transform: `translate(-50%, calc(-50% + ${(closeProgress - 0.35) * 50}px)) scale(${0.9 + closeProgress * 0.18})`,
              opacity: Math.min(0.14, Math.max(0, (closeProgress - 0.1) * 0.25)),
            }}
          >
            ONE
          </span>

          <div
            className="container-wide about-close-inner"
            style={{
              transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 8}px, 0)`,
            }}
          >
            <span className={`about-kicker dark${closeEntered ? ' is-in' : ''}`}>
              <em>04</em>
              <i />
              Approach
            </span>

            <p className={`about-close-copy${closeEntered ? ' is-in' : ''}`}>
              <WordReveal text={CLOSE_COPY} progress={closeWordProgress} />
            </p>

            <div
              className={`about-close-meta${closeEntered ? ' is-in' : ''}`}
              aria-hidden
            >
              <span>Architecture</span>
              <span>Interiors</span>
              <span>Landscapes</span>
              <span>Visualization</span>
            </div>

            <div
              className={`about-close-rule${closeEntered ? ' is-in' : ''}`}
              style={{ width: `${Math.min(100, closeWordProgress * 100)}%` }}
              aria-hidden
            />
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        /* ── Hero (kept) ── */
        .about-hero {
          min-height: 100vh;
          min-height: 100svh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fff;
          color: #000;
          position: relative;
          overflow: hidden;
        }
        .about-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(40px);
          opacity: 0;
          transition: opacity 1.4s ease 0.2s;
        }
        .about-orb.is-in { opacity: 1; }
        .about-orb-a {
          width: min(42vw, 480px);
          height: min(42vw, 480px);
          top: 8%;
          left: -8%;
          background: radial-gradient(circle, rgba(0,0,0,0.05), transparent 70%);
        }
        .about-orb-b {
          width: min(36vw, 420px);
          height: min(36vw, 420px);
          right: -6%;
          bottom: 6%;
          background: radial-gradient(circle, rgba(0,0,0,0.04), transparent 70%);
          transition-delay: 0.4s;
        }
        .about-watermark {
          position: absolute;
          left: 50%;
          top: 50%;
          font-family: var(--font-display);
          font-size: clamp(8rem, 28vw, 22rem);
          font-weight: 300;
          letter-spacing: -0.06em;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0, 0, 0, 0.06);
          text-transform: uppercase;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
          will-change: transform, opacity;
        }
        .about-hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: calc(var(--nav-height) + 1.5rem) clamp(1.2rem, 4vw, 3rem) 3.5rem;
          will-change: opacity, transform;
        }
        .about-hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: clamp(1.5rem, 4vh, 2.5rem);
        }
        .about-index,
        .about-index-label {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #999;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-index.is-in,
        .about-index-label.is-in { opacity: 1; transform: translateY(0); }
        .about-index-label { transition-delay: 0.1s; }
        .about-index::after {
          content: '';
          display: inline-block;
          width: 0;
          height: 1px;
          background: #ccc;
          margin-left: 1rem;
          vertical-align: middle;
          transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s;
        }
        .about-index.is-in::after { width: 28px; }
        .about-heading {
          width: 100%;
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 8vw, 7.2rem);
          font-weight: 300;
          line-height: 0.94;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #000;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: 0.28em;
          row-gap: 0.08em;
        }
        .about-line { display: inline-block; overflow: hidden; padding-bottom: 0.04em; }
        .about-word {
          display: block;
          transform: translateY(115%);
          transition: transform 1.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-word.is-in { transform: translateY(0); }
        .about-word.is-ghost { color: #d0d0d0; }
        .about-rule {
          width: min(100px, 24vw);
          height: 1px;
          background: #000;
          margin: clamp(1.8rem, 4vh, 2.8rem) auto;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.75s;
        }
        .about-rule.is-in { transform: scaleX(1); }
        .about-subhead {
          max-width: 560px;
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(0.74rem, 1.15vw, 0.86rem);
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #737373;
          line-height: 1.8;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.95s,
                      transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.95s;
        }
        .about-subhead.is-in { opacity: 1; transform: translateY(0); }
        .about-scroll-cue {
          position: absolute;
          bottom: clamp(1.5rem, 4vh, 2.5rem);
          left: 50%;
          transform: translateX(-50%) translateY(12px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          opacity: 0;
          transition: opacity 0.8s ease 1.3s, transform 0.8s ease 1.3s;
        }
        .about-scroll-cue.is-in {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .about-scroll-cue span {
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #aaa;
        }
        .about-scroll-cue i {
          display: block;
          width: 1px;
          height: 42px;
          background: linear-gradient(to bottom, #000, transparent);
          animation: aboutCue 1.8s ease-in-out infinite;
        }
        @keyframes aboutCue {
          0%, 100% { transform: scaleY(0.45); opacity: 0.35; transform-origin: top; }
          50% { transform: scaleY(1); opacity: 1; transform-origin: top; }
        }

        /* Shared micros */
        .about-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          margin-bottom: 1.6rem;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-kicker.is-in,
        .about-kicker.is-forced { opacity: 1; transform: translateY(0); }
        .about-services-head.is-in .about-kicker { opacity: 1; transform: translateY(0); }
        .about-kicker em { font-style: normal; opacity: 0.7; }
        .about-kicker i {
          display: inline-block;
          width: 0;
          height: 1px;
          background: currentColor;
          opacity: 0.45;
          transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }
        .about-kicker.is-in i,
        .about-services-head.is-in .about-kicker i,
        .about-kicker.is-forced i { width: 28px; }
        .about-kicker.dark { color: rgba(255,255,255,0.38); }
        .about-kicker.light { color: #999; }

        :global(.char-reveal) { display: inline-block; }
        :global(.char-reveal > span) {
          display: inline-block;
          opacity: 0;
          transform: translateY(1.1em) rotate(4deg);
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        :global(.char-reveal.is-on > span) {
          opacity: 1;
          transform: translateY(0) rotate(0);
        }
        :global(.char-reveal.is-ghost) { color: #3a3a3a; }

        :global(.word-reveal > span) {
          display: inline;
          opacity: 0.18;
          filter: blur(3px);
          transition: opacity 0.45s ease, filter 0.45s ease, color 0.35s ease;
        }
        :global(.word-reveal > span.is-on) {
          opacity: 1;
          filter: blur(0);
        }

        /* ── Studio ── */
        .about-story {
          background: #000;
          color: #fff;
          padding: clamp(6rem, 16vh, 12rem) 0 clamp(4rem, 8vh, 6rem);
          position: relative;
          overflow: hidden;
        }
        .about-story-glow {
          position: absolute;
          width: 55vw;
          height: 55vw;
          top: 10%;
          right: -15%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.06), transparent 68%);
          pointer-events: none;
          will-change: transform;
        }
        .about-story-giant {
          position: absolute;
          left: -4%;
          top: 8%;
          font-family: var(--font-display);
          font-size: clamp(12rem, 32vw, 28rem);
          font-weight: 300;
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.08);
          pointer-events: none;
          opacity: 0;
          transition: opacity 1.2s ease;
          will-change: transform, opacity;
        }
        .about-story-giant.is-in { opacity: 1; }
        .about-story-inner {
          position: relative;
          z-index: 2;
          padding: 0 clamp(1.2rem, 4vw, 3rem);
        }
        .about-story-top {
          margin-bottom: clamp(3rem, 7vh, 5rem);
          transition: transform 0.18s ease-out;
        }
        .about-story-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 7vw, 6.4rem);
          font-weight: 300;
          line-height: 0.92;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }
        .story-mask {
          display: block;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .story-mask.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .about-story-copy {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(2rem, 5vw, 5rem);
          max-width: 1120px;
        }
        .about-story-col {
          opacity: 0;
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .about-story-col.is-in {
          opacity: 1;
        }
        .about-story-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 1.1rem;
        }
        .about-story-col p {
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(1.02rem, 1.4vw, 1.18rem);
          font-weight: 300;
          line-height: 1.85;
          color: #ddd;
        }

        .about-marquee {
          margin-top: clamp(3.5rem, 8vh, 5.5rem);
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }
        .about-marquee.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .about-marquee-track {
          display: flex;
          width: max-content;
          gap: 3rem;
          padding: 1.1rem 0;
          animation: aboutMarquee 38s linear infinite;
        }
        .about-marquee-track span {
          font-family: var(--font-display);
          font-size: clamp(0.95rem, 1.5vw, 1.25rem);
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          white-space: nowrap;
        }
        @keyframes aboutMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .about-story-rail {
          margin-top: clamp(2.5rem, 5vh, 3.5rem);
          height: 1px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.6s ease 0.4s;
        }
        .about-story-rail.is-in { opacity: 1; }
        .about-story-rail span {
          display: block;
          height: 100%;
          background: rgba(255,255,255,0.55);
          transition: width 0.08s linear;
        }

        /* ── Services ── */
        .about-services {
          background: #fff;
          color: #000;
          position: relative;
        }
        .about-services-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .about-services-wash {
          position: absolute;
          width: 48vw;
          height: 48vw;
          right: -10%;
          top: 15%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,0,0,0.035), transparent 70%);
          pointer-events: none;
          transition: opacity 1s ease;
        }
        .about-services-stage {
          width: 100%;
          padding: clamp(4.5rem, 9vh, 6.5rem) clamp(1.2rem, 4vw, 3rem) clamp(2rem, 4vh, 3rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(1.2rem, 2.5vh, 2rem);
          height: 100%;
          position: relative;
          z-index: 2;
        }
        .about-services-head {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-services-head.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .about-services-head-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: end;
        }
        .about-services-head h2 {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(2.1rem, 4.6vw, 4.4rem);
          font-weight: 300;
          line-height: 0.92;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }
        .svc-mask {
          display: block;
          overflow: hidden;
        }
        .svc-mask > span {
          display: block;
          transform: translateY(110%);
          transition: transform 0.95s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .svc-mask.is-in > span { transform: translateY(0); }
        .svc-mask.is-ghost > span { color: #cfcfcf; }

        .about-services-aside {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s;
        }
        .about-services-aside.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .about-services-aside p {
          margin: 0 0 1.4rem;
          max-width: 420px;
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.2vw, 1.08rem);
          font-weight: 300;
          line-height: 1.8;
          color: #555;
        }
        .about-services-ticks {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
        }
        .about-services-ticks button {
          width: 28px;
          height: 3px;
          border: 0;
          padding: 0;
          background: #e5e5e5;
          cursor: pointer;
          transition: background 0.35s ease, transform 0.35s ease, width 0.35s ease;
        }
        .about-services-ticks button.is-past { background: #bbb; }
        .about-services-ticks button.is-on {
          background: #000;
          width: 42px;
          transform: scaleY(1.4);
        }

        .about-services-board {
          display: grid;
          grid-template-columns: minmax(220px, 0.85fr) minmax(280px, 1.15fr);
          gap: clamp(1.5rem, 4vw, 3.5rem);
          align-items: center;
          flex: 1;
          min-height: 0;
        }
        .about-services-feature {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }
        .about-services-feature.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .about-services-feature-num {
          display: block;
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #bbb;
          margin-bottom: 1rem;
          animation: svcNumPop 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes svcNumPop {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .about-services-feature h3 {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.8vw, 3.6rem);
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          color: #000;
          min-height: 2.2em;
        }

        .about-services-track {
          display: grid;
          grid-template-columns: 3px 1fr;
          gap: clamp(1rem, 2.5vw, 2rem);
          align-items: stretch;
          min-height: 0;
        }
        .about-services-progress {
          position: relative;
          background: #ebebeb;
          border-radius: 2px;
          overflow: hidden;
        }
        .about-services-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: #000;
          transition: height 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-expertise {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-top: 1px solid #ebebeb;
        }
        .about-expertise-row {
          display: grid;
          grid-template-columns: 3.2rem 1fr auto;
          align-items: center;
          gap: clamp(0.8rem, 2vw, 1.4rem);
          padding: clamp(0.55rem, 1.2vh, 0.9rem) 0;
          border-bottom: 1px solid #ebebeb;
          cursor: pointer;
          opacity: 0;
          transform: translateX(52px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            padding 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-expertise-row.is-in {
          opacity: 1;
          transform: translateX(0);
        }
        .about-expertise-row.is-past { opacity: 0.28; }
        .about-expertise-row.is-active {
          opacity: 1;
          padding-top: clamp(0.9rem, 1.8vh, 1.3rem);
          padding-bottom: clamp(0.9rem, 1.8vh, 1.3rem);
        }
        .about-expertise-num {
          font-family: var(--font-body);
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #c4c4c4;
          transition: color 0.35s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-expertise-row.is-active .about-expertise-num {
          color: #000;
          transform: translateX(4px);
        }
        .about-expertise-body { position: relative; overflow: hidden; }
        .about-expertise-body strong {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(0.98rem, 1.6vw, 1.45rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #999;
          transition: color 0.35s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      font-size 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-expertise-row.is-active .about-expertise-body strong {
          color: #000;
          transform: translateX(6px);
          font-size: clamp(1.15rem, 2.2vw, 1.9rem);
        }
        .about-expertise-line {
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 1px;
          width: 0;
          background: #000;
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-expertise-row.is-active .about-expertise-line { width: 100%; }
        .about-expertise-mark {
          width: 10px;
          height: 10px;
          display: grid;
          place-items: center;
        }
        .about-expertise-mark i {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 1px solid #ddd;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-expertise-mark i.is-on {
          background: #000;
          border-color: #000;
          transform: scale(1.4);
          box-shadow: 0 0 0 5px rgba(0,0,0,0.07);
        }

        .about-services-counter {
          position: absolute;
          right: clamp(1.2rem, 4vw, 3rem);
          bottom: clamp(1.2rem, 3vh, 2rem);
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: #bbb;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
        }
        .about-services-counter.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .about-services-counter-now {
          color: #000;
          font-size: 1rem;
          display: inline-block;
          animation: svcNumPop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-services-counter i { font-style: normal; opacity: 0.5; }

        /* ── Approach ── */
        .about-close {
          background: #000;
          color: #fff;
          padding: clamp(7rem, 18vh, 13rem) 0;
          position: relative;
          overflow: hidden;
        }
        .about-close-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 1s ease;
          will-change: transform;
        }
        .about-close-ring.is-in { opacity: 1; }
        .about-close-ring-a {
          width: min(70vw, 720px);
          height: min(70vw, 720px);
        }
        .about-close-ring-b {
          width: min(92vw, 980px);
          height: min(92vw, 980px);
          transition-delay: 0.15s;
        }
        .about-close-watermark {
          position: absolute;
          left: 50%;
          top: 50%;
          font-family: var(--font-display);
          font-size: clamp(10rem, 30vw, 24rem);
          font-weight: 300;
          letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.7);
          text-transform: uppercase;
          pointer-events: none;
          white-space: nowrap;
          will-change: transform, opacity;
        }
        .about-close-inner {
          position: relative;
          z-index: 2;
          padding: 0 clamp(1.2rem, 4vw, 3rem);
          max-width: 980px;
          transition: transform 0.18s ease-out;
        }
        .about-close-copy {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(1.55rem, 3.5vw, 3.1rem);
          font-weight: 300;
          line-height: 1.28;
          letter-spacing: -0.03em;
          color: #fff;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .about-close-copy.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .about-close-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1.5rem;
          margin-top: 2.5rem;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
        }
        .about-close-meta.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .about-close-meta span {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.32);
        }
        .about-close-rule {
          height: 1px;
          background: rgba(255,255,255,0.4);
          margin-top: 2.5rem;
          max-width: 220px;
          opacity: 0;
          transition: opacity 0.5s ease 0.35s, width 0.1s linear;
        }
        .about-close-rule.is-in { opacity: 1; }

        @media (max-width: 900px) {
          .about-story-copy,
          .about-services-head-grid,
          .about-services-board {
            grid-template-columns: 1fr;
          }
          .about-heading {
            font-size: clamp(2.4rem, 12vw, 4.2rem);
          }
          /* Keep sticky scroll runway on mobile so services advance 01→07 gradually */
          .about-services-sticky {
            position: sticky;
            top: 0;
            height: 100vh;
            height: 100svh;
            overflow: hidden;
          }
          .about-services-stage {
            padding: calc(var(--nav-height) + 1.25rem) clamp(1.1rem, 4vw, 1.5rem) 1.5rem;
            height: 100%;
            justify-content: space-between;
            gap: 1rem;
          }
          .about-services-head {
            flex-shrink: 0;
          }
          .about-services-board {
            flex: 1;
            min-height: 0;
            gap: 1.25rem;
            overflow: hidden;
          }
          .about-services-feature h3 {
            font-size: clamp(1.45rem, 6.5vw, 2.1rem);
            min-height: 0;
            margin-bottom: 0.5rem;
          }
          .about-expertise {
            gap: 0;
          }
          .about-expertise-row {
            padding: 0.7rem 0;
          }
          .about-expertise-row strong {
            font-size: clamp(0.85rem, 3.6vw, 1rem);
          }
          .about-services-counter {
            display: none;
          }
          .about-orb,
          .about-close-ring { display: none; }
          .about-marquee-track { animation-duration: 28s; }
        }
      `}</style>
    </>
  );
}
