'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ArrowUpRight, MapPin, Calendar, Maximize2 } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const raf = requestAnimationFrame(() => setMounted(true));
      
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      };
      window.addEventListener('keydown', onKey);
      return () => { 
        cancelAnimationFrame(raf);
        document.body.style.overflow = ''; 
        window.removeEventListener('keydown', onKey); 
      };
    } else {
      setMounted(false);
      document.body.style.overflow = '';
    }
  }, [project, onClose]);

  const handleClose = () => {
    setMounted(false);
    setTimeout(onClose, 400);
  };

  if (!project) return null;

  return (
    <div role="dialog" aria-modal="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
      onClick={handleClose}
    >
      <div
        className="cinematic-modal-container"
        style={{
          width: '100%', maxWidth: '860px', height: '100vh',
          backgroundColor: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(30px) saturate(150%)',
          WebkitBackdropFilter: 'blur(30px) saturate(150%)',
          overflowY: 'auto',
          boxShadow: '-30px 0 100px rgba(0,0,0,0.8)',
          transform: mounted ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          color: '#FFF',
          borderLeft: '1px solid rgba(255,255,255,0.08)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          backgroundColor: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888' }}>Project Specification</span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handleClose} style={{
              width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)',
              cursor: 'pointer', borderRadius: '50%', color: '#FFF', transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFF'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#FFF'; }}
            ><X size={18} /></button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '3rem 2.5rem 5rem' }}>
          
          {/* Meta Tags */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1.5rem',
            fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#FFF', fontFamily: 'var(--font-body)', fontWeight: 600,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}><MapPin size={12} /> {project.location}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>{project.category}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>{project.status}</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 300, letterSpacing: '-0.02em', marginBottom: '2rem', marginTop: 0,
            lineHeight: 1
          }}>{project.title}</h2>

          {/* Glass Specs Grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem',
            marginBottom: '3rem',
          }}>
            {[
              { label: 'Location', value: project.location },
              { label: 'Category', value: project.category },
              { label: 'Year', value: project.year },
              { label: 'Status', value: project.status },
              { label: 'Area', value: project.area },
            ].map((spec) => (
              <div key={spec.label} style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px', padding: '1.25rem',
              }}>
                <span style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {spec.label}
                </span>
                <strong style={{
                  fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 500, color: '#FFF',
                }}>{spec.value}</strong>
              </div>
            ))}
          </div>

          {/* Scope badges */}
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ display: 'block', marginBottom: '1rem', fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scope of Work</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.scope.map((s) => (
                <span key={s} style={{
                  padding: '0.6rem 1.2rem', backgroundColor: '#FFF', color: '#000', borderRadius: '50px',
                  fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)', fontWeight: 700,
                }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Hero Image (Original Layout) */}
          <div className="hero-img-container" style={{ position: 'relative', width: '100%', height: '420px', overflow: 'hidden', backgroundColor: '#111', marginBottom: '3rem', borderRadius: '20px' }}>
            <Image src={project.heroImage} alt={project.title} fill sizes="860px" priority style={{ objectFit: 'cover' }} className="gallery-img" />
          </div>

          {/* Overview */}
          <div style={{ marginBottom: '4rem' }}>
            <span style={{ display: 'block', marginBottom: '1.5rem', fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Project Overview</span>
            <p style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
              lineHeight: 1.6, fontWeight: 300, color: 'rgba(255,255,255,0.85)', margin: 0
            }}>{project.overview}</p>
          </div>

          {/* Visual Journey */}
          <span style={{ display: 'block', marginBottom: '2rem', fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Visual Journey</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '4rem' }}>
            {project.gallery.map((item, idx) => (
              <div key={idx} className="gallery-item">
                <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#111' }}>
                  <Image src={item.image} alt={item.title} fill sizes="860px" style={{ objectFit: 'cover' }} className="gallery-img" />
                  <div style={{
                    position: 'absolute', top: '1.5rem', left: '1.5rem',
                    padding: '0.5rem 1.2rem', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#FFF', fontSize: '0.65rem', letterSpacing: '0.15em',
                    textTransform: 'uppercase', fontFamily: 'var(--font-body)', borderRadius: '50px'
                  }}>{item.stage}</div>
                </div>
                <div style={{ padding: '1.5rem 0 0' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2vw, 2rem)', margin: '0 0 0.5rem', textTransform: 'uppercase' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem',
          }}>
            <a href="/#contact" onClick={handleClose} className="btn-primary" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: '#FFF', color: '#000', padding: '1rem 2rem', borderRadius: '50px',
              fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,255,255,0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Discuss Similar Project <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cinematic-modal-container::-webkit-scrollbar {
          width: 8px;
        }
        .cinematic-modal-container::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .cinematic-modal-container::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
        }
        .cinematic-modal-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
        
        .gallery-img {
          transition: transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .gallery-item:hover .gallery-img,
        .hero-img-container:hover .gallery-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
