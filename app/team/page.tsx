'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollEngine from '@/components/ScrollEngine';
import { useMouseParallax } from '@/hooks/useMouseParallax';

const HEADING = [
  { word: 'The', tone: 'solid' },
  { word: 'Team', tone: 'ghost' },
];

const INTRO =
  'Leadership at INOVO is grounded in craft, clarity, and responsibility — from the first concept to the final built detail.';

const FOUNDERS = [
  {
    num: '01',
    name: 'Bilal M',
    role: 'Co-Founder & Managing Partner',
    image: '/images/founder-bilal.jpg',
    quote:
      'True spatial luxury is found in precision of proportion, quiet light, and the enduring honesty of materials.',
  },
  {
    num: '02',
    name: 'Anu Shamil',
    role: 'Co-Founder & Managing Partner',
    image: '/images/founder-anu.jpg',
    quote:
      'Our responsibility is to ensure that what begins as an inspired concept on paper survives every challenge of construction intact.',
  },
];

export default function TeamPage() {
  const mousePos = useMouseParallax();
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const foundersRef = useRef<HTMLElement>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const { top, height } = heroRef.current.getBoundingClientRect();
        setHeroProgress(Math.min(1, Math.max(0, -top / (height * 0.75))));
      }

      if (foundersRef.current) {
        const rect = foundersRef.current.getBoundingClientRect();
        const scrollDistance = Math.max(1, rect.height - window.innerHeight);
        const scrolled = -rect.top;

        if (rect.top < window.innerHeight * 0.85) setEntered(true);

        if (scrolled >= 0 && scrolled <= scrollDistance) {
          const progress = scrolled / scrollDistance;
          setActiveIndex(
            Math.min(FOUNDERS.length - 1, Math.floor(progress * FOUNDERS.length))
          );
        } else if (scrolled < 0) {
          setActiveIndex(0);
        } else {
          setActiveIndex(FOUNDERS.length - 1);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = FOUNDERS[activeIndex];

  return (
    <>
      <ScrollEngine />
      <Navbar />

      <main>
        {/* Hero */}
        <section ref={heroRef} className="tm-hero">
          <div
            aria-hidden
            className={`tm-orb tm-orb-a${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * -18}px, 0)`,
            }}
          />
          <div
            aria-hidden
            className={`tm-orb tm-orb-b${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 22}px, 0)`,
            }}
          />

          <span
            aria-hidden
            className={`tm-watermark${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate(-50%, calc(-50% + ${heroProgress * 70}px)) scale(${1 + heroProgress * 0.1})`,
              opacity: Math.max(0, 1 - heroProgress * 1.35),
            }}
          >
            PEOPLE
          </span>

          <div
            className="container-wide tm-hero-inner"
            style={{
              opacity: 1 - heroProgress * 0.92,
              transform: `translate3d(${mousePos.x * 8}px, ${heroProgress * -64 + mousePos.y * 6}px, 0) scale(${1 - heroProgress * 0.04})`,
            }}
          >
            <div className="tm-meta">
              <span className={`tm-index${loaded ? ' is-in' : ''}`}>01</span>
              <span className={`tm-index-label${loaded ? ' is-in' : ''}`}>
                Leadership
              </span>
            </div>

            <h1 className="tm-heading">
              {HEADING.map((item, i) => (
                <span key={item.word} className="tm-line">
                  <span
                    className={`tm-word${loaded ? ' is-in' : ''}${item.tone === 'ghost' ? ' is-ghost' : ''}`}
                    style={{ transitionDelay: `${0.2 + i * 0.16}s` }}
                  >
                    {item.word}
                  </span>
                </span>
              ))}
            </h1>

            <p className={`tm-subhead${loaded ? ' is-in' : ''}`}>
              The founding partners.
            </p>

            <div className={`tm-rule${loaded ? ' is-in' : ''}`} />

            <p className={`tm-intro${loaded ? ' is-in' : ''}`}>{INTRO}</p>

            <div className={`tm-scroll-cue${loaded ? ' is-in' : ''}`} aria-hidden>
              <span>Scroll</span>
              <i />
            </div>
          </div>
        </section>

        {/* Sticky founders */}
        <section
          ref={foundersRef}
          className="tm-founders"
          style={{ height: `${FOUNDERS.length * 100 + 40}vh` }}
        >
          <div className="tm-sticky">
            {/* Soft ambient from active portrait — not a full-bleed crop */}
            {FOUNDERS.map((founder, i) => (
              <div
                key={`amb-${founder.num}`}
                className={`tm-ambient${i === activeIndex ? ' is-active' : ''}`}
                aria-hidden
              >
                <Image
                  src={founder.image}
                  alt=""
                  fill
                  priority={i === 0}
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
            ))}
            <div className="tm-ambient-veil" aria-hidden />

            <div className="container-wide tm-stage">
              <div className={`tm-stage-head${entered ? ' is-in' : ''}`}>
                <span className="tm-kicker">
                  <em>02</em>
                  <i />
                  Partners
                </span>
                <div className="tm-ticks" aria-hidden>
                  {FOUNDERS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={
                        i === activeIndex
                          ? 'is-on'
                          : i < activeIndex
                            ? 'is-past'
                            : undefined
                      }
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Go to ${FOUNDERS[i].name}`}
                    />
                  ))}
                </div>
              </div>

              <div className="tm-stage-body">
                <div
                  className={`tm-feature${entered ? ' is-in' : ''}`}
                  style={{
                    transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 8}px, 0)`,
                  }}
                >
                  <span key={`n-${activeIndex}`} className="tm-feature-num">
                    {active.num}
                  </span>
                  <h2 key={`t-${activeIndex}`} className="tm-feature-title">
                    {active.name}
                  </h2>
                  <p key={`r-${activeIndex}`} className="tm-feature-role">
                    {active.role}
                  </p>
                  <blockquote key={`q-${activeIndex}`} className="tm-feature-quote">
                    “{active.quote}”
                  </blockquote>
                </div>

                <div
                  className={`tm-portrait-frame${entered ? ' is-in' : ''}`}
                  style={{
                    transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -6}px, 0)`,
                  }}
                >
                  {FOUNDERS.map((founder, i) => (
                    <div
                      key={founder.num}
                      className={`tm-portrait${i === activeIndex ? ' is-active' : ''}`}
                    >
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        sizes="(max-width: 900px) 70vw, 340px"
                        priority={i === 0}
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center top',
                        }}
                      />
                    </div>
                  ))}
                </div>

                <ol className="tm-list">
                  {FOUNDERS.map((founder, i) => {
                    const isActive = i === activeIndex;
                    const isPast = i < activeIndex;
                    return (
                      <li
                        key={founder.num}
                        className={`tm-row${isActive ? ' is-active' : ''}${isPast ? ' is-past' : ''}${entered ? ' is-in' : ''}`}
                        style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
                        onClick={() => setActiveIndex(i)}
                      >
                        <span>{founder.num}</span>
                        <strong>{founder.name}</strong>
                        <em>{founder.role}</em>
                        <i className={isActive ? 'is-on' : undefined} />
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className={`tm-counter${entered ? ' is-in' : ''}`} aria-hidden>
                <span key={activeIndex} className="tm-counter-now">
                  {active.num}
                </span>
                <em>/</em>
                <span>{String(FOUNDERS.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .tm-hero {
          min-height: 100vh;
          min-height: 100svh;
          background: #fff;
          color: #000;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .tm-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(42px);
          opacity: 0;
          transition: opacity 1.3s ease;
        }
        .tm-orb.is-in { opacity: 1; }
        .tm-orb-a {
          width: min(40vw, 460px);
          height: min(40vw, 460px);
          top: 6%;
          left: -10%;
          background: radial-gradient(circle, rgba(0,0,0,0.05), transparent 70%);
        }
        .tm-orb-b {
          width: min(34vw, 400px);
          height: min(34vw, 400px);
          right: -8%;
          bottom: 8%;
          background: radial-gradient(circle, rgba(0,0,0,0.04), transparent 70%);
          transition-delay: 0.35s;
        }
        .tm-watermark {
          position: absolute;
          left: 50%;
          top: 50%;
          font-family: var(--font-display);
          font-size: clamp(6rem, 24vw, 18rem);
          font-weight: 300;
          letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,0,0,0.06);
          text-transform: uppercase;
          pointer-events: none;
          white-space: nowrap;
          will-change: transform, opacity;
        }
        .tm-hero-inner {
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
        }
        .tm-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: clamp(1.2rem, 3vh, 2rem);
        }
        .tm-index,
        .tm-index-label {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #999;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-index.is-in,
        .tm-index-label.is-in { opacity: 1; transform: none; }
        .tm-index-label { transition-delay: 0.1s; }
        .tm-heading {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.05em;
        }
        .tm-line { display: block; overflow: hidden; }
        .tm-word {
          display: inline-block;
          font-family: var(--font-display);
          font-size: clamp(3.6rem, 12vw, 9rem);
          line-height: 0.9;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #000;
          opacity: 0;
          transform: translateY(110%);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-word.is-in { opacity: 1; transform: none; }
        .tm-word.is-ghost {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(0,0,0,0.35);
        }
        .tm-subhead {
          margin: clamp(1.2rem, 2.5vh, 1.8rem) 0 0;
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.6vw, 1.25rem);
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #444;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s,
                      transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s;
        }
        .tm-subhead.is-in { opacity: 1; transform: none; }
        .tm-rule {
          width: 0;
          height: 1px;
          background: #000;
          margin: clamp(1.4rem, 3vh, 2rem) auto;
          transition: width 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s;
        }
        .tm-rule.is-in { width: min(120px, 30vw); }
        .tm-intro {
          margin: 0;
          max-width: 560px;
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.15vw, 1.1rem);
          line-height: 1.75;
          color: #555;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.85s,
                      transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.85s;
        }
        .tm-intro.is-in { opacity: 1; transform: none; }
        .tm-scroll-cue {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          opacity: 0;
          transition: opacity 1s ease 1.2s;
        }
        .tm-scroll-cue.is-in { opacity: 1; }
        .tm-scroll-cue span {
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #aaa;
        }
        .tm-scroll-cue i {
          display: block;
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, #000, transparent);
          animation: cuePulse 1.6s ease-in-out infinite;
        }

        .tm-founders {
          background: #0a0a0a;
          position: relative;
        }
        .tm-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          background: #0a0a0a;
        }
        .tm-ambient {
          position: absolute;
          inset: -8%;
          opacity: 0;
          filter: blur(48px) saturate(0.85);
          transform: scale(1.15);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .tm-ambient.is-active { opacity: 0.35; }
        .tm-ambient-veil {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 70% 40%, rgba(0,0,0,0.2), transparent 60%),
            linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.7) 100%);
          pointer-events: none;
        }
        .tm-stage {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: calc(var(--nav-height) + 1rem) clamp(1.2rem, 4vw, 3rem) clamp(2rem, 5vh, 3.5rem);
        }
        .tm-stage-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: clamp(1.5rem, 3vh, 2.5rem);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-stage-head.is-in { opacity: 1; transform: none; }
        .tm-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .tm-kicker em { font-style: normal; }
        .tm-kicker i {
          display: block;
          width: 28px;
          height: 1px;
          background: currentColor;
          opacity: 0.5;
        }
        .tm-ticks {
          display: flex;
          gap: 0.4rem;
        }
        .tm-ticks button {
          width: 26px;
          height: 3px;
          border: 0;
          padding: 0;
          background: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: all 0.35s ease;
        }
        .tm-ticks button.is-past { background: rgba(255,255,255,0.45); }
        .tm-ticks button.is-on { width: 42px; background: #fff; }
        .tm-stage-body {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(220px, 320px) minmax(0, 0.85fr);
          gap: clamp(1.5rem, 4vw, 3rem);
          align-items: center;
        }
        .tm-portrait-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          max-height: min(62vh, 560px);
          border-radius: 18px;
          overflow: hidden;
          background: #161616;
          box-shadow: 0 24px 60px rgba(0,0,0,0.45);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-portrait-frame.is-in {
          opacity: 1;
          transform: none;
        }
        .tm-portrait {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-portrait.is-active { opacity: 1; }
        .tm-portrait :global(img) {
          object-fit: cover;
          object-position: center top;
        }
        .tm-feature {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-feature.is-in { opacity: 1; transform: none; }
        .tm-feature-num {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          color: #fff;
          margin-bottom: 0.8rem;
          animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-feature-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 7vw, 5.6rem);
          line-height: 0.92;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #fff;
          text-shadow: 0 10px 30px rgba(0,0,0,0.8);
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-feature-role {
          margin: 1rem 0 0;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          animation: fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-feature-quote {
          margin: 1.5rem 0 0;
          max-width: 520px;
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.3vw, 1.2rem);
          line-height: 1.7;
          color: #ccc;
          font-style: italic;
          animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .tm-row {
          display: grid;
          grid-template-columns: 2.5rem 1fr;
          grid-template-rows: auto auto;
          column-gap: 1rem;
          row-gap: 0.25rem;
          padding: 1.1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          cursor: pointer;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      color 0.35s ease;
          position: relative;
        }
        .tm-row.is-in { opacity: 0.4; transform: none; }
        .tm-row.is-past { opacity: 0.55; }
        .tm-row.is-active {
          opacity: 1;
          transform: translateX(8px);
        }
        .tm-row span {
          grid-row: 1 / 3;
          align-self: center;
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: #fff;
        }
        .tm-row strong {
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 1.8vw, 1.5rem);
          font-weight: 400;
          text-transform: uppercase;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .tm-row em {
          font-style: normal;
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .tm-row i {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: #fff;
          transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-row i.is-on { width: 100%; }
        .tm-counter {
          position: absolute;
          right: clamp(1.2rem, 4vw, 3rem);
          top: clamp(5rem, 12vh, 7rem);
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          font-family: var(--font-display);
          color: #fff;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .tm-counter.is-in { opacity: 1; }
        .tm-counter-now {
          font-size: clamp(2rem, 4vw, 3.2rem);
          animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tm-counter em {
          font-style: normal;
          opacity: 0.35;
          font-size: 1.2rem;
        }
        .tm-counter > span:last-child {
          opacity: 0.35;
          font-size: 1.2rem;
        }

        @keyframes cuePulse {
          0%, 100% { opacity: 0.25; transform: scaleY(0.7); }
          50% { opacity: 1; transform: scaleY(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }

        @media (max-width: 900px) {
          .tm-stage {
            justify-content: center;
            padding-bottom: 1.5rem;
          }
          .tm-stage-body {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            align-items: center;
            min-height: 0;
          }
          .tm-portrait-frame {
            order: -1;
            width: min(72vw, 280px);
            max-height: min(42vh, 360px);
            margin: 0 auto;
            aspect-ratio: 3 / 4;
          }
          .tm-list { display: none; }
          .tm-counter { display: none; }
          .tm-feature-title {
            font-size: clamp(2.4rem, 11vw, 3.6rem);
            text-shadow: none;
            text-align: center;
          }
          .tm-feature {
            text-align: center;
          }
          .tm-feature-quote {
            margin-left: auto;
            margin-right: auto;
          }
          .tm-feature-num,
          .tm-feature-role {
            text-align: center;
          }
          .tm-word {
            font-size: clamp(3rem, 16vw, 5rem);
          }
        }
      `}</style>
    </>
  );
}
