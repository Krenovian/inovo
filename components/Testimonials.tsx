'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Volume2, VolumeX } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Homeowner, Calicut',
    photo: '/images/calicut-courtyard.jpg',
    videoUrl: 'https://www.youtube.com/embed/YykjpeuMNEk?autoplay=1&mute=1&controls=0&loop=1&enablejsapi=1',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CEO, TechFlow',
    photo: '/images/interior-living.jpg',
    videoUrl: 'https://www.youtube.com/embed/YykjpeuMNEk?autoplay=1&mute=1&controls=0&loop=1&enablejsapi=1',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Founder, Studio 9',
    photo: '/images/wayanad-pavilion.jpg',
    videoUrl: 'https://www.youtube.com/embed/YykjpeuMNEk?autoplay=1&mute=1&controls=0&loop=1&enablejsapi=1',
  },
  {
    id: 4,
    name: 'David Okafor',
    role: 'Managing Director, Apex',
    photo: '/images/calicut-courtyard.jpg',
    videoUrl: 'https://www.youtube.com/embed/YykjpeuMNEk?autoplay=1&mute=1&controls=0&loop=1&enablejsapi=1',
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth);
      setWindowWidth(window.innerWidth);
    };
    
    measure();
    window.addEventListener('resize', measure);
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      
      if (scrolled >= 0 && scrolled <= scrollableDistance) {
        setScrollProgress(scrolled / scrollableDistance);
      } else if (scrolled < 0) {
        setScrollProgress(0);
      } else if (scrolled > scrollableDistance) {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const maxTranslate = Math.max(0, trackWidth - windowWidth);
  const translateX = scrollProgress * maxTranslate;

  return (
    <section ref={containerRef} id="testimonials" style={{ 
      height: '350vh',
      backgroundColor: '#000',
      position: 'relative' 
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#000'
      }}>
        
        {/* Header - Matching Team.tsx layout & typography */}
        <div className="container-wide" style={{ padding: '0 3rem' }}>
          <div style={{ marginBottom: 'clamp(4rem, 6vh, 6rem)' }}>
            <span style={{ 
              fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '4px', color: '#888', 
              textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem'
            }}>
              Client Stories
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4.8vw, 4.8rem)', color: '#FFF',
              textTransform: 'uppercase', lineHeight: 1, margin: 0
            }}>
              Hear from<br /><span style={{ color: '#888' }}>our clients.</span>
            </h2>
          </div>
        </div>

        {/* Carousel Track */}
        <div style={{ width: '100%', height: '55vh' }}>
          <div ref={trackRef} style={{
            display: 'flex',
            gap: '2rem',
            padding: '0 clamp(2rem, 5vw, 6rem)',
            height: '100%',
            width: 'max-content',
            transform: `translate3d(-${translateX}px, 0, 0)`,
            willChange: 'transform'
          }}>
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card events if any
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      className="testimonial-card hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: '0 0 clamp(300px, 35vw, 450px)',
        height: '100%',
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#111',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}
    >
      {/* Background Image / Photo Placeholder */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, transition: 'opacity 0.4s' }}>
        <Image 
          src={testimonial.photo} 
          alt={testimonial.name} 
          fill 
          style={{ objectFit: 'cover' }}
        />
        <div style={{ 
          position: 'absolute', inset: 0, 
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' 
        }} />
      </div>

      {/* YouTube Video Overlay on Hover */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        backgroundColor: '#000'
      }}>
        {isHovered && (
          <iframe
            ref={iframeRef}
            src={testimonial.videoUrl}
            title={testimonial.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ width: '100%', height: '100%', pointerEvents: 'none', border: 'none' }}
          />
        )}
      </div>
      
      {/* Interactive Controls (Mute/Unmute) */}
      <div style={{
        position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 4,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: isHovered ? 'auto' : 'none'
      }}>
        <button 
          onClick={toggleMute}
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)', color: '#FFF',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%', width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(5px)',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Text Info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
        padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem',
        pointerEvents: 'none'
      }}>
        <h3 style={{ 
          fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#FFF', margin: 0, textTransform: 'uppercase', lineHeight: 1
        }}>
          {testimonial.name}
        </h3>
        <span style={{ 
          display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.8rem', 
          color: '#CCC', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase'
        }}>
          {testimonial.role}
        </span>
      </div>
    </div>
  );
}
