'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PROJECTS, type Project } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import ProjectModal from '@/components/ProjectModal';

export default function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const mousePos = useMouseParallax();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const offset = viewportHeight / 2;
      const totalScrollable = height;
      const scrolledDistance = offset - top;
      
      let progress = scrolledDistance / totalScrollable;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const displayProjects = PROJECTS.slice(0, 6);

  const openNext = () => {
    if (!selected) return;
    const idx = displayProjects.findIndex((p) => p.id === selected.id);
    const next = displayProjects[(idx + 1) % displayProjects.length];
    if (next) setSelected(next);
  };

  // Calculate roaming meteor position (Chaotic Noise)
  const wave1 = Math.sin(scrollProgress * Math.PI * 8); 
  const wave2 = Math.cos(scrollProgress * Math.PI * 3); 
  const wave3 = Math.sin(scrollProgress * Math.PI * 13); 
  const wave4 = Math.cos(scrollProgress * Math.PI * 5); 

  const chaoticNoise = (wave1 + (wave2 * 1.5) + (wave3 * 0.5) + (wave4 * 0.8)) / 3.8; 
  
  const crosshairLeft = 50 + (chaoticNoise * 40);
  const crosshairTop = scrollProgress * 100;

  return (
    <section id="projects" ref={containerRef} style={{ position: 'relative', backgroundColor: '#000', overflow: 'hidden' }}>
      
      {/* Roaming Architectural Crosshair */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
        
        {/* Crosshair Center */}
        <div style={{
          position: 'absolute',
          top: `${crosshairTop}%`,
          left: `${crosshairLeft}%`,
          transform: 'translate(-50%, -50%)',
          width: '40px', height: '40px',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: '50%',
          transition: 'top 0.1s linear, left 0.1s linear',
        }}>
          {/* Inner Dot */}
          <div style={{ width: '4px', height: '4px', backgroundColor: '#FFF', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>

        {/* Vertical Drafting Line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: `${crosshairLeft}%`,
          width: '1px', height: '100%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
          transition: 'left 0.1s linear',
        }} />

        {/* Horizontal Drafting Line */}
        <div style={{
          position: 'absolute',
          top: `${crosshairTop}%`,
          left: 0,
          width: '100%', height: '1px',
          background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
          transition: 'top 0.1s linear',
        }} />

      </div>

      {/* Full-Bleed Projects Sequence */}
      <div style={{ position: 'relative', zIndex: 5 }}>
        {displayProjects.map((project, i) => {
          return (
            <div key={project.id} className="section-vh" style={{ position: 'relative', padding: 0 }}>
              
              {/* Full-Bleed Background Image with subtle parallax */}
              <div style={{ 
                position: 'absolute', inset: 0, zIndex: 0,
                transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0) scale(1.05)`,
                transition: 'transform 0.2s ease-out'
              }}>
                <Image src={project.heroImage} alt={project.title} fill style={{ objectFit: 'cover' }} />
                
                {/* Vignette Overlay for Text Legibility */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)'
                }} />
              </div>

              {/* Foreground Overlay Content with inverse parallax */}
              <div className="container-wide" style={{ 
                height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', 
                position: 'relative', zIndex: 5, paddingBottom: 'clamp(4rem, 10vh, 8rem)', paddingTop: '10rem',
                transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
                transition: 'transform 0.2s ease-out'
              }}>
                
                <div style={{ maxWidth: '800px' }}>
                  
                  {/* Category Pill */}
                  <div data-reveal="up" data-delay="1" style={{
                    display: 'inline-block', padding: '0.6rem 1.2rem', backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFF', 
                    borderRadius: '30px', fontFamily: 'var(--font-body)', fontSize: '0.7rem', 
                    textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600,
                    backdropFilter: 'blur(10px)', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    {project.category}
                  </div>

                  {/* Title */}
                  <h2 data-reveal="up" data-delay="2" style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 6.4vw, 5.6rem)',
                    color: '#FFF', textTransform: 'uppercase', lineHeight: 0.9, margin: '0 0 1.5rem 0',
                    textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}>
                    {project.title}
                  </h2>

                  {/* Number & Location */}
                  <div data-reveal="up" data-delay="3" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#FFF', textTransform: 'uppercase' }}>
                      0{i + 1}
                    </span>
                    <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '3px', color: '#CCC', textTransform: 'uppercase' }}>
                      {project.location}
                    </span>
                  </div>

                  {/* Overview */}
                  <p data-reveal="up" data-delay="4" style={{
                    fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                    color: '#DDD', lineHeight: 1.6, maxWidth: '600px', marginBottom: '3rem',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }}>
                    {project.overview}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                    {/* Tags */}
                    <div data-reveal="up" data-delay="5" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {project.scope.map(s => (
                        <span key={s} style={{
                          padding: '0.5rem 1.2rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '30px',
                          fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#FFF', textTransform: 'uppercase', 
                          fontWeight: 600, letterSpacing: '1px', backgroundColor: 'rgba(0,0,0,0.2)'
                        }}>{s}</span>
                      ))}
                    </div>

                    {/* Button */}
                    <button
                      type="button"
                      data-reveal="up"
                      data-delay="6"
                      className="hover-lift project-btn"
                      onClick={() => setSelected(project)}
                      style={{ 
                        backgroundColor: '#FFF', color: '#000', padding: '1rem 2rem', borderRadius: '30px',
                        display: 'flex', alignItems: 'center', gap: '0.8rem', fontFamily: 'var(--font-body)', 
                        fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
                        border: 0, cursor: 'pointer',
                      }}
                    >
                      View Project <ArrowUpRight size={18} className="project-arrow" style={{ transition: 'transform 0.3s ease' }} />
                    </button>
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        onNextProject={openNext}
      />

      <style jsx>{`
        .project-btn:hover .project-arrow { transform: translate(3px, -3px); }
      `}</style>
    </section>
  );
}
