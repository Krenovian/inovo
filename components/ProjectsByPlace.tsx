'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { PROJECTS, LOCATION_LIST, CATEGORIES, Project } from '@/data/projects';
import ProjectModal from './ProjectModal';

export default function ProjectsByPlace() {
  const [location, setLocation] = useState<Project['location']>('Calicut');
  const [category, setCategory] = useState<string>('All');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const filtered = PROJECTS
    .filter((p) => p.location === location)
    .filter((p) => category === 'All' || p.category === category);

  const handleNext = () => {
    if (!modalProject) return;
    const idx = PROJECTS.findIndex((p) => p.id === modalProject.id);
    setModalProject(PROJECTS[(idx + 1) % PROJECTS.length]);
  };

  return (
    <section id="projects" className="section-vh" style={{ backgroundColor: '#FFF' }}>
      
      <div className="container-wide" style={{ padding: '0 3rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header & Filters row (very compact) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', gap: '1rem', flexShrink: 0 }}>
          <div data-reveal="up">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4vw, 4rem)',
              color: '#000', textTransform: 'uppercase', lineHeight: 1, margin: 0
            }}>
              Our work, <span style={{ color: '#888' }}>by place.</span>
            </h2>
          </div>
          
          <div data-reveal="left" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            {LOCATION_LIST.map((loc) => {
              const isActive = location === loc;
              return (
                <button key={loc} onClick={() => { setLocation(loc); setCategory('All'); }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 1rem', borderRadius: '30px',
                    backgroundColor: isActive ? '#000' : 'transparent',
                    color: isActive ? '#FFF' : '#555',
                    fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontWeight: 700, fontFamily: 'var(--font-body)',
                    border: isActive ? 'none' : '1px solid rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease', cursor: 'pointer'
                  }}
                  className="hover-lift"
                >
                  <MapPin size={12} /> {loc}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills */}
        <div data-reveal="right" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexShrink: 0, overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{
                padding: '0.3rem 0', whiteSpace: 'nowrap',
                fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: 'var(--font-body)', fontWeight: category === cat ? 700 : 500,
                color: category === cat ? '#000' : '#888',
                borderBottom: category === cat ? '2px solid #000' : '2px solid transparent',
                transition: 'all 0.2s ease', background: 'none', cursor: 'pointer'
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Project Horizontal Scroll Container */}
        {filtered.length > 0 ? (
          <div className="horizontal-scroll-container" style={{ gap: '2rem', paddingBottom: '1rem', flex: 1, minHeight: 0 }}>
            {filtered.map((project, i) => (
              <article key={project.id} data-reveal="up" data-delay={String(Math.min(i + 1, 4))}
                onClick={() => setModalProject(project)}
                className="hover-lift scroll-item project-card"
                style={{ 
                  cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                  backgroundColor: '#FAFAFA', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '20px',
                  width: 'clamp(300px, 35vw, 450px)', flexShrink: 0, height: '100%'
                }}
              >
                {/* Image */}
                <div className="grayscale-hover" style={{ position: 'relative', width: '100%', height: 'clamp(200px, 25vh, 300px)' }}>
                  <Image src={project.heroImage} alt={project.title} fill sizes="(max-width:900px) 100vw, 30vw"
                    style={{ objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    padding: '0.3rem 0.8rem', backgroundColor: '#000', color: '#FFF', borderRadius: '15px',
                    fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)', fontWeight: 700,
                  }}>{project.category}</div>
                </div>

                {/* Card Info */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap',
                    fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#888', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '0.8rem',
                  }}>
                    <span>{project.location}</span> <span>·</span>
                    <span>{project.year}</span> <span>·</span>
                    <span>{project.area}</span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 1.6vw, 1.6rem)',
                    textTransform: 'uppercase', color: '#000', lineHeight: 1, marginBottom: '0.8rem',
                  }}>{project.title}</h3>

                  <p style={{
                    fontSize: '0.8rem', color: '#555', lineHeight: 1.5,
                    marginBottom: '1rem', fontFamily: 'var(--font-body)'
                  }}>{project.overview.slice(0, 100)}...</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', marginBottom: '1.5rem' }}>
                    {project.scope.slice(0, 3).map((s) => (
                      <span key={s} style={{
                        padding: '0.2rem 0.6rem', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '10px',
                        fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                        fontFamily: 'var(--font-body)', color: '#333', fontWeight: 600
                      }}>{s}</span>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem',
                    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', fontFamily: 'var(--font-body)', color: '#000'
                  }} className="project-link">
                    <span>View Project</span>
                    <ArrowUpRight size={16} className="project-arrow" style={{ transition: 'transform 0.3s ease' }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div data-reveal="fade" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', borderRadius: '30px' }}>
            <p style={{ fontFamily: 'var(--font-body)', color: '#888', fontSize: '1.2rem', marginBottom: '1rem' }}>
              No {category.toLowerCase()} projects in {location}.
            </p>
            <button onClick={() => setCategory('All')} className="btn-primary" style={{ backgroundColor: '#000', color: '#FFF' }}>Reset Filters</button>
          </div>
        )}

      </div>

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} onNextProject={handleNext} />
      
      <style jsx>{`
        .project-card:hover .project-arrow { transform: translate(3px, -3px); }
      `}</style>
    </section>
  );
}
