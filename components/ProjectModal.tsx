'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowRight, ArrowUpRight, MapPin, Calendar, Maximize2 } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNextProject: () => void;
}

export default function ProjectModal({ project, onClose, onNextProject }: ProjectModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNextProject();
      };
      window.addEventListener('keydown', onKey);
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
    } else {
      document.body.style.overflow = '';
    }
  }, [project, onClose, onNextProject]);

  if (!project) return null;

  return (
    <div role="dialog" aria-modal="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', maxWidth: '860px', height: '100vh',
          backgroundColor: '#FFF', overflowY: 'auto',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          backgroundColor: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(10,10,10,0.06)',
          padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span className="label">Project Specification</span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={onNextProject} className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
              Next <ArrowRight size={12} />
            </button>
            <button onClick={onClose} style={{
              width: '36px', height: '36px', border: '1px solid rgba(10,10,10,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><X size={16} /></button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '2.5rem 2.5rem 4rem' }}>
          {/* Meta */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem',
            fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#A3A3A3', fontFamily: 'var(--font-body)', fontWeight: 500,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={12} /> {project.location}</span>
            <span>·</span><span>{project.category}</span><span>·</span>
            <span>{project.status}</span><span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={12} /> {project.year}</span>
            <span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Maximize2 size={12} /> {project.area}</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300, letterSpacing: '-0.03em', marginBottom: '1.5rem',
          }}>{project.title}</h2>

          {/* Specs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1.25rem 0',
            borderTop: '1px solid rgba(10,10,10,0.08)',
            borderBottom: '1px solid rgba(10,10,10,0.08)',
          }}>
            {[
              { label: 'Location', value: project.location },
              { label: 'Category', value: project.category },
              { label: 'Year', value: project.year },
              { label: 'Status', value: project.status },
              { label: 'Area', value: project.area },
            ].map((spec) => (
              <div key={spec.label}>
                <span className="label" style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.62rem' }}>
                  {spec.label}
                </span>
                <strong style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#0A0A0A',
                }}>{spec.value}</strong>
              </div>
            ))}
          </div>

          {/* Scope badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {project.scope.map((s) => (
              <span key={s} style={{
                padding: '0.35rem 0.8rem', backgroundColor: '#0A0A0A', color: '#FFF',
                fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                fontFamily: 'var(--font-body)', fontWeight: 500,
              }}>{s}</span>
            ))}
          </div>

          {/* Hero Image */}
          <div style={{ position: 'relative', width: '100%', height: '420px', overflow: 'hidden', backgroundColor: '#F5F5F5', marginBottom: '2rem' }}>
            <Image src={project.heroImage} alt={project.title} fill sizes="860px" priority style={{ objectFit: 'cover' }} />
          </div>

          {/* Overview */}
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>Overview</span>
            <p style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.25rem',
              lineHeight: 1.55, fontWeight: 300, color: '#525252',
            }}>{project.overview}</p>
          </div>

          {/* Visual Journey */}
          <span className="label" style={{ display: 'block', marginBottom: '1.25rem' }}>Visual Journey</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {project.gallery.map((item, idx) => (
              <div key={idx} style={{ overflow: 'hidden', backgroundColor: '#FAFAFA' }}>
                <div style={{ position: 'relative', width: '100%', height: '360px' }}>
                  <Image src={item.image} alt={item.title} fill sizes="800px" style={{ objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    padding: '0.3rem 0.7rem', backgroundColor: 'rgba(10,10,10,0.85)',
                    color: '#FFF', fontSize: '0.65rem', letterSpacing: '0.14em',
                    textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                  }}>{item.stage}</div>
                </div>
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', marginBottom: '0.3rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#737373' }}>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div style={{
            borderTop: '1px solid rgba(10,10,10,0.1)', paddingTop: '2rem',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem',
          }}>
            <a href="#contact" onClick={onClose} className="btn-primary">
              Discuss Similar Project <ArrowUpRight size={14} />
            </a>
            <button onClick={onNextProject} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', fontFamily: 'var(--font-body)',
            }}>Next Project <ArrowRight size={15} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
