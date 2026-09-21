'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollEngine from '@/components/ScrollEngine';
import { useMouseParallax } from '@/hooks/useMouseParallax';

const INTRO =
  'At INOVO Developers, we bring together creativity, technical expertise, and thoughtful planning to create exceptional spaces. As one of the best design consultancies in Calicut, we offer integrated design and development solutions for residential and commercial projects.';

const PROJECTS_A =
  'Explore our portfolio of thoughtfully designed residential and commercial projects across Calicut and Kerala. From distinctive exteriors and elegant interiors to detailed landscapes and realistic 3D visualizations, every INOVO project reflects our commitment to creativity, functionality, and quality.';

const PROJECTS_B =
  'As one of the best design consultancies in Calicut, we approach every project with careful planning, innovative design thinking, and attention to detail. Our projects showcase how architecture, interiors, landscapes, lighting, and functionality can come together to create spaces that truly reflect our clients’ vision.';

const PROJECTS_CTA = 'Discover our projects and experience the INOVO difference.';

const CLIENTS =
  'Every project we undertake begins with understanding our client’s vision, requirements, and expectations. We believe that successful design is not simply about creating beautiful spaces—it is about creating spaces that work, last, and provide lasting value. Our growing portfolio and satisfied clients reflect our commitment to delivering reliable, creative, and quality-driven design solutions.';

const VISION =
  'To create exceptional spaces through innovative design, technical excellence, and a commitment to quality.';

const MISSION =
  'To deliver integrated architectural, interior, landscape, and visualization solutions that exceed client expectations and set new standards for design excellence in Calicut and across Kerala.';

const CLOSE_LINE = 'INOVO Developers — Designing Spaces. Creating Experiences.';

const SERVICES = [
  {
    num: '01',
    title: 'Exterior Design',
    desc: 'As one of the best exterior design companies in Calicut, we create distinctive and functional building exteriors that enhance the architectural character and visual appeal of your property.',
    image: '/images/calicut-courtyard.jpg',
    imageAlt: 'Exterior design by INOVO',
  },
  {
    num: '02',
    title: 'Interior Design',
    desc: 'Our interior design team delivers elegant, functional, and personalized spaces, making us a trusted choice for best interior design services in Calicut.',
    image: '/images/interior-living.jpg',
    imageAlt: 'Interior design by INOVO',
  },
  {
    num: '03',
    title: 'Landscape Design',
    desc: 'We create beautiful and functional outdoor environments through carefully planned landscape designs that complement your architecture, positioning us among the best landscape design services in Calicut.',
    image: '/images/wayanad-pavilion.jpg',
    imageAlt: 'Landscape design by INOVO',
  },
  {
    num: '04',
    title: '3D Visualization',
    desc: 'We bring your ideas to life with realistic 3D visualizations, helping you experience your project before construction. Our visualization solutions are designed to provide some of the best 3D visualization services in Calicut.',
    image: '/images/model.jpg',
    imageAlt: '3D visualization by INOVO',
  },
  {
    num: '05',
    title: 'Lighting Design',
    desc: 'We develop lighting concepts that enhance architectural features, improve functionality, and create the right ambience for every space, delivering best lighting design solutions in Calicut.',
    image: '/images/detail-interior.jpg',
    imageAlt: 'Lighting design by INOVO',
  },
  {
    num: '06',
    title: 'Furniture Design',
    desc: 'We design customized furniture that complements your interiors while balancing aesthetics, comfort, functionality, and space requirements, offering best furniture design solutions in Calicut.',
    image: '/images/detail-craft.jpg',
    imageAlt: 'Furniture design by INOVO',
  },
  {
    num: '07',
    title: 'Construction & Development Solutions',
    desc: 'From design coordination to execution, we provide practical construction and development solutions focused on quality, efficiency, and seamless project delivery, making INOVO a trusted name for construction and development solutions in Calicut.',
    image: '/images/site-supervision.jpg',
    imageAlt: 'Construction and development by INOVO',
  },
];

const HEADING = [
  { word: 'What', tone: 'solid' },
  { word: 'We', tone: 'ghost' },
  { word: 'Do', tone: 'solid' },
];

export default function WhatWeDoPage() {
  const mousePos = useMouseParallax();
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const clientsRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLElement>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entered, setEntered] = useState(false);
  const [projectsIn, setProjectsIn] = useState(false);
  const [clientsIn, setClientsIn] = useState(false);
  const [visionIn, setVisionIn] = useState(false);
  const [closeIn, setCloseIn] = useState(false);

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

      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        const scrollDistance = Math.max(1, rect.height - window.innerHeight);
        const scrolled = -rect.top;

        if (rect.top < window.innerHeight * 0.85) setEntered(true);

        // Avoid snapping to the last service if the scroll runway collapsed.
        if (scrollDistance >= window.innerHeight * 0.5) {
          if (scrolled <= 0) {
            setActiveIndex(0);
          } else if (scrolled >= scrollDistance) {
            setActiveIndex(SERVICES.length - 1);
          } else {
            const progress = scrolled / scrollDistance;
            setActiveIndex(
              Math.min(SERVICES.length - 1, Math.floor(progress * SERVICES.length))
            );
          }
        } else if (scrolled < 0) {
          setActiveIndex(0);
        }
      }

      const threshold = window.innerHeight * 0.82;
      if (projectsRef.current && projectsRef.current.getBoundingClientRect().top < threshold) {
        setProjectsIn(true);
      }
      if (clientsRef.current && clientsRef.current.getBoundingClientRect().top < threshold) {
        setClientsIn(true);
      }
      if (visionRef.current && visionRef.current.getBoundingClientRect().top < threshold) {
        setVisionIn(true);
      }
      if (closeRef.current && closeRef.current.getBoundingClientRect().top < threshold) {
        setCloseIn(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = SERVICES[activeIndex];

  return (
    <>
      <ScrollEngine />
      <Navbar />

      <main>
        {/* Hero */}
        <section ref={heroRef} className="wwd-hero">
          <div
            aria-hidden
            className={`wwd-orb wwd-orb-a${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * -18}px, 0)`,
            }}
          />
          <div
            aria-hidden
            className={`wwd-orb wwd-orb-b${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 22}px, 0)`,
            }}
          />

          <span
            aria-hidden
            className={`wwd-watermark${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate(-50%, calc(-50% + ${heroProgress * 70}px)) scale(${1 + heroProgress * 0.1})`,
              opacity: Math.max(0, 1 - heroProgress * 1.35),
            }}
          >
            WORK
          </span>

          <div
            className="container-wide wwd-hero-inner"
            style={{
              opacity: 1 - heroProgress * 0.92,
              transform: `translate3d(${mousePos.x * 8}px, ${heroProgress * -64 + mousePos.y * 6}px, 0) scale(${1 - heroProgress * 0.04})`,
            }}
          >
            <div className="wwd-meta">
              <span className={`wwd-index${loaded ? ' is-in' : ''}`}>01</span>
              <span className={`wwd-index-label${loaded ? ' is-in' : ''}`}>
                What We Do
              </span>
            </div>

            <h1 className="wwd-heading">
              {HEADING.map((item, i) => (
                <span key={item.word} className="wwd-line">
                  <span
                    className={`wwd-word${loaded ? ' is-in' : ''}${item.tone === 'ghost' ? ' is-ghost' : ''}`}
                    style={{ transitionDelay: `${0.2 + i * 0.16}s` }}
                  >
                    {item.word}
                  </span>
                </span>
              ))}
            </h1>

            <div className={`wwd-rule${loaded ? ' is-in' : ''}`} />

            <p className={`wwd-intro${loaded ? ' is-in' : ''}`}>{INTRO}</p>

            <div className={`wwd-scroll-cue${loaded ? ' is-in' : ''}`} aria-hidden>
              <span>Scroll</span>
              <i />
            </div>
          </div>
        </section>

        {/* Sticky services */}
        <section
          ref={servicesRef}
          className="wwd-services"
          style={{ height: `${SERVICES.length * 70 + 100}vh` }}
        >
          <div className="wwd-sticky">
            {SERVICES.map((service, i) => (
              <div
                key={service.num}
                className={`wwd-bg${i === activeIndex ? ' is-active' : ''}`}
                aria-hidden
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  priority={i === 0}
                  style={{
                    objectFit: 'cover',
                    transform:
                      i === activeIndex
                        ? `scale(1.06) translate3d(${mousePos.x * -12}px, ${mousePos.y * -10}px, 0)`
                        : 'scale(1)',
                  }}
                />
                <div className="wwd-bg-veil" />
              </div>
            ))}

            <div className="container-wide wwd-stage">
              <div className={`wwd-stage-head${entered ? ' is-in' : ''}`}>
                <span className="wwd-kicker">
                  <em>02</em>
                  <i />
                  Practice
                </span>
                <div className="wwd-ticks hide-mobile-ticks" aria-hidden>
                  {SERVICES.map((_, i) => (
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
                      aria-label={`Go to ${SERVICES[i].title}`}
                    />
                  ))}
                </div>
                <div className={`wwd-mobile-count${entered ? ' is-in' : ''}`} aria-hidden>
                  <strong key={activeIndex}>{active.num}</strong>
                  <em>/</em>
                  <span>{String(SERVICES.length).padStart(2, '0')}</span>
                </div>
              </div>

              <div className="wwd-stage-body">
                <div
                  className={`wwd-feature${entered ? ' is-in' : ''}`}
                  style={{
                    transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 8}px, 0)`,
                  }}
                >
                  <span key={`n-${activeIndex}`} className="wwd-feature-num">
                    {active.num}
                  </span>
                  <h2 key={`t-${activeIndex}`} className="wwd-feature-title">
                    {active.title}
                  </h2>
                  <p key={`d-${activeIndex}`} className="wwd-feature-desc">
                    {active.desc}
                  </p>

                  {/* Mobile-only progress + next label */}
                  <div className="wwd-mobile-foot">
                    <div className="wwd-mobile-progress" aria-hidden>
                      {SERVICES.map((service, i) => (
                        <button
                          key={service.num}
                          type="button"
                          className={
                            i === activeIndex
                              ? 'is-on'
                              : i < activeIndex
                                ? 'is-past'
                                : undefined
                          }
                          onClick={() => setActiveIndex(i)}
                          aria-label={service.title}
                        />
                      ))}
                    </div>
                    <p className="wwd-mobile-hint">
                      {activeIndex < SERVICES.length - 1
                        ? `Next · ${SERVICES[activeIndex + 1].title}`
                        : 'End of practice'}
                    </p>
                  </div>
                </div>

                <ol className="wwd-list">
                  {SERVICES.map((service, i) => {
                    const isActive = i === activeIndex;
                    const isPast = i < activeIndex;
                    return (
                      <li
                        key={service.num}
                        className={`wwd-row${isActive ? ' is-active' : ''}${isPast ? ' is-past' : ''}${entered ? ' is-in' : ''}`}
                        style={{ transitionDelay: `${0.1 + i * 0.06}s` }}
                        onClick={() => setActiveIndex(i)}
                      >
                        <span>{service.num}</span>
                        <strong>{service.title}</strong>
                        <i className={isActive ? 'is-on' : undefined} />
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className={`wwd-counter${entered ? ' is-in' : ''}`} aria-hidden>
                <span key={activeIndex} className="wwd-counter-now">
                  {active.num}
                </span>
                <em>/</em>
                <span>{String(SERVICES.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Our Projects (white) */}
        <section ref={projectsRef} className="wwd-block wwd-block-light">
          <div className={`container-wide wwd-block-inner${projectsIn ? ' is-in' : ''}`}>
            <div className="wwd-block-meta">
              <span>03</span>
              <i />
              <span>Our Projects</span>
            </div>
            <h2>Creating Spaces That Inspire</h2>
            <p>{PROJECTS_A}</p>
            <p>{PROJECTS_B}</p>
            <p className="wwd-block-lead">{PROJECTS_CTA}</p>
            <a href="/our-projects" className="wwd-block-cta">
              Explore Our Projects
            </a>
          </div>
        </section>

        {/* 04 — Clients (black) */}
        <section ref={clientsRef} className="wwd-block wwd-block-dark">
          <div className={`container-wide wwd-block-inner${clientsIn ? ' is-in' : ''}`}>
            <div className="wwd-block-meta light">
              <span>04</span>
              <i />
              <span>Clients</span>
            </div>
            <h2>Designed Around Our Clients</h2>
            <p>{CLIENTS}</p>
          </div>
        </section>

        {/* 05 — Vision & Mission (white) */}
        <section ref={visionRef} className="wwd-block wwd-block-light">
          <div className={`container-wide wwd-block-inner${visionIn ? ' is-in' : ''}`}>
            <div className="wwd-block-meta">
              <span>05</span>
              <i />
              <span>Purpose</span>
            </div>
            <div className="wwd-vm">
              <article>
                <h3>Our Vision</h3>
                <p>{VISION}</p>
              </article>
              <article>
                <h3>Our Mission</h3>
                <p>{MISSION}</p>
              </article>
            </div>
          </div>
        </section>

        {/* 06 — Close (black) */}
        <section ref={closeRef} className="wwd-close">
          <div className={`container-wide wwd-close-inner${closeIn ? ' is-in' : ''}`}>
            <p>{CLOSE_LINE}</p>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .wwd-hero {
          min-height: 100vh;
          min-height: 100svh;
          background: #fff;
          color: #000;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .wwd-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(42px);
          opacity: 0;
          transition: opacity 1.3s ease;
        }
        .wwd-orb.is-in { opacity: 1; }
        .wwd-orb-a {
          width: min(40vw, 460px);
          height: min(40vw, 460px);
          top: 6%;
          left: -10%;
          background: radial-gradient(circle, rgba(0,0,0,0.05), transparent 70%);
        }
        .wwd-orb-b {
          width: min(34vw, 400px);
          height: min(34vw, 400px);
          right: -8%;
          bottom: 8%;
          background: radial-gradient(circle, rgba(0,0,0,0.04), transparent 70%);
          transition-delay: 0.35s;
        }
        .wwd-watermark {
          position: absolute;
          left: 50%;
          top: 50%;
          font-family: var(--font-display);
          font-size: clamp(7rem, 26vw, 20rem);
          font-weight: 300;
          letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,0,0,0.06);
          text-transform: uppercase;
          pointer-events: none;
          white-space: nowrap;
          will-change: transform, opacity;
        }
        .wwd-hero-inner {
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
        .wwd-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: clamp(1.4rem, 3.5vh, 2.2rem);
        }
        .wwd-index,
        .wwd-index-label {
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
        .wwd-index.is-in,
        .wwd-index-label.is-in { opacity: 1; transform: translateY(0); }
        .wwd-index-label { transition-delay: 0.1s; }
        .wwd-index::after {
          content: '';
          display: inline-block;
          width: 0;
          height: 1px;
          background: #ccc;
          margin-left: 1rem;
          vertical-align: middle;
          transition: width 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
        }
        .wwd-index.is-in::after { width: 28px; }

        .wwd-heading {
          margin: 0;
          width: 100%;
          font-family: var(--font-display);
          font-size: clamp(3rem, 9vw, 8rem);
          font-weight: 300;
          line-height: 0.92;
          letter-spacing: -0.045em;
          text-transform: uppercase;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          column-gap: 0.28em;
        }
        .wwd-line { display: inline-block; overflow: hidden; }
        .wwd-word {
          display: block;
          transform: translateY(115%);
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwd-word.is-in { transform: translateY(0); }
        .wwd-word.is-ghost { color: #d0d0d0; }

        .wwd-rule {
          width: min(96px, 22vw);
          height: 1px;
          background: #000;
          margin: clamp(1.6rem, 3.5vh, 2.4rem) auto;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.7s;
        }
        .wwd-rule.is-in { transform: scaleX(1); }

        .wwd-intro {
          max-width: 720px;
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(0.98rem, 1.35vw, 1.15rem);
          font-weight: 300;
          line-height: 1.8;
          color: #555;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.9s,
                      transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.9s;
        }
        .wwd-intro.is-in { opacity: 1; transform: translateY(0); }

        .wwd-scroll-cue {
          position: absolute;
          bottom: clamp(1.4rem, 4vh, 2.4rem);
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          opacity: 0;
          transition: opacity 0.8s ease 1.25s, transform 0.8s ease 1.25s;
        }
        .wwd-scroll-cue.is-in {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .wwd-scroll-cue span {
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #aaa;
        }
        .wwd-scroll-cue i {
          display: block;
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, #000, transparent);
          animation: wwdCue 1.8s ease-in-out infinite;
        }
        @keyframes wwdCue {
          0%, 100% { transform: scaleY(0.45); opacity: 0.35; transform-origin: top; }
          50% { transform: scaleY(1); opacity: 1; transform-origin: top; }
        }

        .wwd-services {
          background: #000;
          color: #fff;
          position: relative;
        }
        .wwd-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
        }
        .wwd-bg {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwd-bg.is-active { opacity: 1; }
        .wwd-bg :global(img) {
          transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwd-bg-veil {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.35) 100%),
            linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%);
        }
        .wwd-mobile-count,
        .wwd-mobile-foot {
          display: none;
        }

        .wwd-stage {
          position: relative;
          z-index: 3;
          height: 100%;
          padding: calc(var(--nav-height) + 1.5rem) clamp(1.2rem, 4vw, 3rem) 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(1.4rem, 3vh, 2.4rem);
        }
        .wwd-stage-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .wwd-stage-head.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .wwd-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .wwd-kicker em { font-style: normal; }
        .wwd-kicker i {
          display: inline-block;
          width: 28px;
          height: 1px;
          background: currentColor;
          opacity: 0.6;
        }
        .wwd-ticks {
          display: flex;
          gap: 0.4rem;
        }
        .wwd-ticks button {
          width: 26px;
          height: 3px;
          border: 0;
          padding: 0;
          background: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: all 0.35s ease;
        }
        .wwd-ticks button.is-past { background: rgba(255,255,255,0.45); }
        .wwd-ticks button.is-on {
          width: 40px;
          background: #fff;
          transform: scaleY(1.35);
        }

        .wwd-stage-body {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: end;
          flex: 1;
          min-height: 0;
        }
        .wwd-feature {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease 0.15s, transform 0.75s ease 0.15s;
          max-width: 640px;
        }
        .wwd-feature.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .wwd-feature-num {
          display: block;
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1rem;
          animation: wwdPop 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwd-feature-title {
          margin: 0 0 1.4rem;
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 4.8rem);
          font-weight: 300;
          line-height: 0.95;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #fff;
          animation: wwdPop 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwd-feature-desc {
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          font-weight: 300;
          line-height: 1.8;
          color: rgba(255,255,255,0.72);
          animation: wwdPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
        }
        @keyframes wwdPop {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wwd-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .wwd-row {
          display: grid;
          grid-template-columns: 2.8rem 1fr auto;
          align-items: center;
          gap: 1rem;
          padding: clamp(0.7rem, 1.5vh, 1rem) 0;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          cursor: pointer;
          opacity: 0;
          transform: translateX(40px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            padding 0.35s ease;
        }
        .wwd-row.is-in {
          opacity: 1;
          transform: translateX(0);
        }
        .wwd-row.is-past { opacity: 0.3; }
        .wwd-row.is-active {
          opacity: 1;
          padding-top: clamp(1rem, 2vh, 1.35rem);
          padding-bottom: clamp(1rem, 2vh, 1.35rem);
        }
        .wwd-row span {
          font-family: var(--font-body);
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.3);
          transition: color 0.35s ease;
        }
        .wwd-row.is-active span { color: #fff; }
        .wwd-row strong {
          font-family: var(--font-display);
          font-size: clamp(0.95rem, 1.5vw, 1.35rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          transition: color 0.35s ease, transform 0.4s ease, font-size 0.4s ease;
        }
        .wwd-row.is-active strong {
          color: #fff;
          transform: translateX(6px);
          font-size: clamp(1.1rem, 1.9vw, 1.7rem);
        }
        .wwd-row i {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          transition: all 0.35s ease;
        }
        .wwd-row i.is-on {
          background: #fff;
          border-color: #fff;
          box-shadow: 0 0 0 5px rgba(255,255,255,0.1);
          transform: scale(1.3);
        }

        .wwd-counter {
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
          color: rgba(255,255,255,0.35);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
        }
        .wwd-counter.is-in {
          opacity: 1;
          transform: translateY(0);
        }
        .wwd-counter-now {
          color: #fff;
          font-size: 1rem;
          animation: wwdPop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwd-counter em { font-style: normal; opacity: 0.5; }

        .wwd-block {
          padding: clamp(4rem, 10vh, 7rem) 0;
        }
        .wwd-block-light {
          background: #fff;
          color: #000;
        }
        .wwd-block-dark {
          background: #000;
          color: #fff;
        }
        .wwd-block-inner {
          padding: 0 clamp(1.2rem, 4vw, 3rem);
          max-width: 880px;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwd-block-inner.is-in {
          opacity: 1;
          transform: none;
        }
        .wwd-block-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .wwd-block-meta span {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
        }
        .wwd-block-meta.light span { color: rgba(255,255,255,0.45); }
        .wwd-block-meta i {
          width: 28px;
          height: 1px;
          background: #ccc;
        }
        .wwd-block-meta.light i { background: rgba(255,255,255,0.35); }
        .wwd-block h2 {
          margin: 0 0 1.35rem;
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.6rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }
        .wwd-block p {
          margin: 0 0 1.05rem;
          font-family: var(--font-body);
          font-size: clamp(0.98rem, 1.2vw, 1.12rem);
          line-height: 1.75;
          color: #555;
        }
        .wwd-block-dark p { color: rgba(255,255,255,0.72); }
        .wwd-block-lead {
          color: #111 !important;
          font-weight: 500;
        }
        .wwd-block-dark .wwd-block-lead { color: #fff !important; }
        .wwd-block-cta {
          display: inline-flex;
          align-items: center;
          margin-top: 0.75rem;
          background: #000;
          color: #fff;
          border-radius: 999px;
          padding: 0.95rem 1.5rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
        }
        .wwd-vm {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(1.5rem, 4vw, 3rem);
          margin-top: 0.5rem;
        }
        .wwd-vm h3 {
          margin: 0 0 0.85rem;
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          line-height: 1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        .wwd-vm p {
          margin: 0;
          color: #555;
        }
        .wwd-close {
          background: #000;
          color: #fff;
          padding: clamp(4.5rem, 12vh, 8rem) 0;
          text-align: center;
        }
        .wwd-close-inner {
          padding: 0 clamp(1.2rem, 4vw, 3rem);
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .wwd-close-inner.is-in {
          opacity: 1;
          transform: none;
        }
        .wwd-close p {
          margin: 0 auto;
          max-width: 28ch;
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 4.2vw, 2.8rem);
          line-height: 1.15;
          letter-spacing: -0.025em;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .wwd-orb { display: none; }
          .wwd-heading { font-size: clamp(2.6rem, 13vw, 4.4rem); }

          /* Keep sticky runway — do not collapse height */
          .wwd-sticky {
            position: sticky;
            top: 0;
            height: 100vh;
            height: 100svh;
            overflow: hidden;
          }

          .wwd-bg-veil {
            background:
              linear-gradient(
                to top,
                rgba(0,0,0,0.94) 0%,
                rgba(0,0,0,0.55) 42%,
                rgba(0,0,0,0.4) 100%
              );
          }

          .wwd-stage {
            padding: calc(var(--nav-height) + 0.85rem) 1.15rem 1.25rem;
            height: 100%;
            justify-content: space-between;
            gap: 0.75rem;
          }

          .wwd-stage-head {
            flex-shrink: 0;
          }

          .hide-mobile-ticks {
            display: none !important;
          }

          .wwd-mobile-count {
            display: flex;
            align-items: baseline;
            gap: 0.3rem;
            font-family: var(--font-display);
            color: #fff;
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }
          .wwd-mobile-count.is-in {
            opacity: 1;
            transform: none;
          }
          .wwd-mobile-count strong {
            font-size: 1.15rem;
            font-weight: 400;
            animation: wwdPop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .wwd-mobile-count em,
          .wwd-mobile-count span {
            font-style: normal;
            font-size: 0.85rem;
            color: rgba(255,255,255,0.4);
          }

          .wwd-stage-body {
            grid-template-columns: 1fr;
            align-items: end;
            flex: 1;
            min-height: 0;
          }

          .wwd-list,
          .wwd-counter {
            display: none !important;
          }

          .wwd-feature {
            max-width: none;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            min-height: 0;
          }

          .wwd-feature-num {
            margin-bottom: 0.65rem;
            color: rgba(255,255,255,0.5);
          }

          .wwd-feature-title {
            font-size: clamp(2rem, 10vw, 2.85rem);
            margin-bottom: 0.85rem;
            max-width: 12ch;
            text-shadow: 0 10px 30px rgba(0,0,0,0.55);
          }

          .wwd-feature-desc {
            font-size: clamp(0.9rem, 3.6vw, 1.02rem);
            line-height: 1.65;
            color: rgba(255,255,255,0.78);
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: 1.15rem;
          }

          .wwd-mobile-foot {
            display: flex;
            flex-direction: column;
            gap: 0.7rem;
            padding-top: 0.25rem;
          }

          .wwd-mobile-progress {
            display: flex;
            gap: 0.35rem;
          }
          .wwd-mobile-progress button {
            flex: 1;
            height: 3px;
            border: 0;
            padding: 0;
            background: rgba(255,255,255,0.2);
            cursor: pointer;
            transition: background 0.35s ease, transform 0.35s ease;
          }
          .wwd-mobile-progress button.is-past {
            background: rgba(255,255,255,0.45);
          }
          .wwd-mobile-progress button.is-on {
            background: #fff;
            transform: scaleY(1.5);
          }

          .wwd-mobile-hint {
            margin: 0;
            font-family: var(--font-body);
            font-size: 0.62rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.4);
          }

          .wwd-vm {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
