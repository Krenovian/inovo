'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollEngine from '@/components/ScrollEngine';
import ProjectModal from '@/components/ProjectModal';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { CATEGORIES, type Project } from '@/data/projects';

const INTRO_A =
  'Explore the work of INOVO Developers, where thoughtful design, technical expertise, and attention to detail come together to create distinctive spaces.';

const INTRO_B =
  'Our portfolio showcases residential and commercial projects featuring exterior design, interior design, landscape design, lighting, furniture, and 3D visualization.';

const INTRO_C =
  'Every project is carefully developed around the client’s requirements, lifestyle, functionality, and vision. From contemporary homes to sophisticated commercial spaces, our projects reflect our approach to creating spaces that are visually appealing, practical, and built to last.';

const APPROACH =
  'Every project begins with understanding the client’s vision. Through detailed planning, creative design thinking, and technical expertise, we develop concepts that bring together architecture, interiors, landscapes, lighting, and functionality as one cohesive design.';

const EXPLORE =
  'Discover our completed and ongoing projects across Calicut and Kerala and see how INOVO Developers transforms ideas into thoughtfully designed spaces.';

type CategoryFilter = (typeof CATEGORIES)[number];

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const mousePos = useMouseParallax();
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [approachIn, setApproachIn] = useState(false);
  const [listIn, setListIn] = useState(false);
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
      if (
        approachRef.current &&
        approachRef.current.getBoundingClientRect().top < window.innerHeight * 0.82
      ) {
        setApproachIn(true);
      }
      if (
        listRef.current &&
        listRef.current.getBoundingClientRect().top < window.innerHeight * 0.85
      ) {
        setListIn(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filtered = useMemo(() => {
    if (category === 'All') return projects;
    return projects.filter((p) => p.category === category);
  }, [projects, category]);

  const selected = selectedId ? projects.find((p) => p.id === selectedId) ?? null : null;

  const openNext = () => {
    if (!selected) return;
    const idx = filtered.findIndex((p) => p.id === selected.id);
    const next = filtered[(idx + 1) % filtered.length];
    if (next) setSelectedId(next.id);
  };

  return (
    <>
      <ScrollEngine />
      <Navbar />

      <main>
        {/* 01 — White hero (nav-readable) */}
        <section ref={heroRef} className="op-hero">
          <div
            aria-hidden
            className={`op-orb op-orb-a${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * -18}px, 0)`,
            }}
          />
          <div
            aria-hidden
            className={`op-orb op-orb-b${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate3d(${mousePos.x * 28}px, ${mousePos.y * 20}px, 0)`,
            }}
          />
          <span
            aria-hidden
            className={`op-watermark${loaded ? ' is-in' : ''}`}
            style={{
              transform: `translate(-50%, calc(-50% + ${heroProgress * 60}px)) scale(${1 + heroProgress * 0.08})`,
              opacity: Math.max(0, 1 - heroProgress * 1.3),
            }}
          >
            WORK
          </span>

          <div
            className={`container-wide op-hero-inner${loaded ? ' is-in' : ''}`}
            style={{
              opacity: 1 - heroProgress * 0.9,
              transform: `translate3d(${mousePos.x * 6}px, ${heroProgress * -48}px, 0)`,
            }}
          >
            <div className="op-meta">
              <span>01</span>
              <i />
              <span>Our Projects</span>
            </div>

            <h1>
              Our Projects
              <br />
              <em>Spaces Designed</em>
              <br />
              With Purpose
            </h1>

            <p className="op-lead">
              Distinctive residential and commercial spaces across Kerala — designed with clarity, craft, and purpose.
            </p>

            <a href="#work" className="op-cta">
              Explore Our Work <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* 02 — Black */}
        <section ref={approachRef} className="op-approach">
          <div className={`container-wide op-approach-inner${approachIn ? ' is-in' : ''}`}>
            <div className="op-meta light">
              <span>02</span>
              <i />
              <span>Our Design Approach</span>
            </div>
            <h2>Our Design Approach</h2>
            <div className="op-approach-copy">
              <p>{INTRO_A}</p>
              <p>{INTRO_B}</p>
              <p>{INTRO_C}</p>
              <p>{APPROACH}</p>
            </div>
          </div>
        </section>

        {/* 03 — White */}
        <section ref={listRef} id="work" className="op-work">
          <div className="container-wide op-work-inner">
            <div className={`op-work-head${listIn ? ' is-in' : ''}`}>
              <div>
                <div className="op-meta">
                  <span>03</span>
                  <i />
                  <span>Explore Our Work</span>
                </div>
                <h2>Explore Our Work</h2>
                <p>{EXPLORE}</p>
              </div>

              <div className="op-filters" role="tablist" aria-label="Filter projects by category">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={category === cat}
                    className={category === cat ? 'is-on' : undefined}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="op-empty">No projects in this category yet.</p>
            ) : (
              <div className={`op-grid${listIn ? ' is-in' : ''}`}>
                {filtered.map((project, i) => (
                  <article
                    key={project.id}
                    className="op-card"
                    style={{ transitionDelay: `${Math.min(i, 8) * 0.06}s` }}
                  >
                    <button
                      type="button"
                      className="op-card-btn"
                      onClick={() => setSelectedId(project.id)}
                      aria-label={`View ${project.title}`}
                    >
                      <div className="op-card-media">
                        <Image
                          src={project.heroImage}
                          alt={project.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 900px) 100vw, 50vw"
                        />
                        <div className="op-card-veil" />
                        <span className="op-card-status">{project.status}</span>
                      </div>
                      <div className="op-card-body">
                        <div className="op-card-meta">
                          <span>{project.category}</span>
                          <em>{project.location}</em>
                        </div>
                        <h3>{project.title}</h3>
                        <div className="op-card-foot">
                          <span>{project.year}</span>
                          <span>{project.area}</span>
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <ProjectModal
        project={selected}
        onClose={() => setSelectedId(null)}
        onNextProject={openNext}
      />

      <style jsx>{`
        .op-hero {
          position: relative;
          height: 100svh;
          min-height: 100svh;
          background: #fff;
          color: #000;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .op-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(42px);
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .op-orb.is-in { opacity: 1; }
        .op-orb-a {
          width: min(42vw, 460px);
          height: min(42vw, 460px);
          top: 8%;
          left: -12%;
          background: radial-gradient(circle, rgba(0,0,0,0.05), transparent 70%);
        }
        .op-orb-b {
          width: min(34vw, 380px);
          height: min(34vw, 380px);
          right: -10%;
          bottom: 12%;
          background: radial-gradient(circle, rgba(0,0,0,0.04), transparent 70%);
          transition-delay: 0.25s;
        }
        .op-watermark {
          position: absolute;
          left: 50%;
          top: 50%;
          font-family: var(--font-display);
          font-size: clamp(6rem, 22vw, 16rem);
          font-weight: 300;
          letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,0,0,0.06);
          text-transform: uppercase;
          pointer-events: none;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .op-watermark.is-in { opacity: 1; }
        .op-hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: calc(var(--nav-height) + 1.5rem) clamp(1.2rem, 4vw, 3rem) clamp(2.5rem, 6vh, 4rem);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .op-hero-inner.is-in {
          opacity: 1;
          transform: none;
        }
        .op-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.1rem;
        }
        .op-meta span {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
        }
        .op-meta.light span { color: rgba(255,255,255,0.45); }
        .op-meta i {
          width: 28px;
          height: 1px;
          background: #ccc;
        }
        .op-meta.light i { background: rgba(255,255,255,0.35); }
        .op-hero-inner h1 {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 7.5vw, 5.8rem);
          line-height: 0.92;
          letter-spacing: -0.035em;
          text-transform: uppercase;
          max-width: 14ch;
          color: #000;
        }
        .op-hero-inner h1 em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(0,0,0,0.35);
        }
        .op-lead {
          margin: 1.25rem 0 0;
          max-width: 32rem;
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.15vw, 1.08rem);
          line-height: 1.65;
          color: #555;
        }
        .op-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
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

        .op-approach {
          background: #000;
          color: #fff;
          padding: clamp(4rem, 10vh, 6.5rem) 0;
        }
        .op-approach-inner {
          padding: 0 clamp(1.2rem, 4vw, 3rem);
          max-width: 860px;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .op-approach-inner.is-in {
          opacity: 1;
          transform: none;
        }
        .op-approach h2 {
          margin: 0 0 1.3rem;
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.6rem);
          line-height: 0.95;
          text-transform: uppercase;
          letter-spacing: -0.03em;
        }
        .op-approach-copy {
          max-width: 42rem;
        }
        .op-approach-copy p {
          margin: 0 0 1rem;
          font-family: var(--font-body);
          font-size: clamp(0.98rem, 1.2vw, 1.12rem);
          line-height: 1.75;
          color: rgba(255,255,255,0.7);
        }
        .op-approach-copy p:last-child {
          margin-bottom: 0;
          color: rgba(255,255,255,0.85);
        }

        .op-work {
          background: #fff;
          color: #000;
          padding: clamp(4rem, 10vh, 7rem) 0;
        }
        .op-work-inner {
          padding: 0 clamp(1.2rem, 4vw, 3rem);
        }
        .op-work-head {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: clamp(2rem, 5vh, 3.5rem);
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .op-work-head.is-in {
          opacity: 1;
          transform: none;
        }
        .op-work-head h2 {
          margin: 0 0 0.9rem;
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.6rem);
          line-height: 0.95;
          text-transform: uppercase;
          letter-spacing: -0.03em;
        }
        .op-work-head p {
          margin: 0;
          max-width: 34rem;
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.7;
          color: #555;
        }
        .op-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          align-content: flex-start;
          max-width: 420px;
        }
        .op-filters button {
          border: 1px solid rgba(0,0,0,0.15);
          background: transparent;
          color: #666;
          border-radius: 999px;
          padding: 0.55rem 0.95rem;
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .op-filters button.is-on {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .op-empty {
          font-family: var(--font-body);
          color: #888;
        }

        .op-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(1.2rem, 3vw, 2rem);
        }
        .op-grid.is-in .op-card {
          opacity: 1;
          transform: none;
        }
        .op-card {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .op-card-btn {
          display: block;
          width: 100%;
          text-align: left;
          background: transparent;
          border: 0;
          padding: 0;
          cursor: pointer;
          color: inherit;
        }
        .op-card-media {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 20px;
          background: #111;
        }
        .op-card-media :global(img) {
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .op-card-btn:hover .op-card-media :global(img) {
          transform: scale(1.05);
        }
        .op-card-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35), transparent 45%);
        }
        .op-card-status {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 2;
          background: rgba(255,255,255,0.92);
          color: #000;
          border-radius: 999px;
          padding: 0.4rem 0.75rem;
          font-family: var(--font-body);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .op-card-body {
          padding: 1.15rem 0.15rem 0.25rem;
        }
        .op-card-meta {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.55rem;
        }
        .op-card-meta span,
        .op-card-meta em {
          font-style: normal;
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888;
        }
        .op-card-body h3 {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(1.35rem, 2.4vw, 1.9rem);
          line-height: 1.05;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }
        .op-card-foot {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-top: 0.85rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: #777;
        }
        .op-card-foot :global(svg) {
          margin-left: auto;
        }

        @media (max-width: 900px) {
          .op-grid {
            grid-template-columns: 1fr;
          }
          .op-hero-inner h1 {
            font-size: clamp(2.5rem, 11vw, 3.6rem);
          }
          .op-filters {
            max-width: none;
          }
        }
      `}</style>
    </>
  );
}
