'use client';

import React from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="section-vh" style={{
      backgroundColor: 'var(--pure-black)', 
      color: 'var(--white)',
      borderTop: '1px solid var(--border)'
    }}>
      
      <div className="container-wide" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        flex: 1 
      }}>
        
        {/* Top: Huge Typography & Call to Action - flex: 1 to push other content down */}
        <div data-reveal="up" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: '4rem 0'
        }}>
          <h2 className="heading-xl" style={{ 
            marginBottom: '1rem',
            background: 'linear-gradient(to bottom, #FFFFFF, #888888)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.05em'
          }}>
            LET'S BUILD
          </h2>
          <p className="body-lg" style={{ maxWidth: '600px', marginBottom: '3rem' }}>
            Ready to craft a restrained, climate-responsive built environment? Connect with us to discuss your next project.
          </p>
          <a href="https://wa.me/919809442227" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Start a Conversation <ArrowRight size={16} />
          </a>
        </div>

        {/* Middle: Links Grid */}
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '4rem', 
          paddingBottom: '3rem',
          borderBottom: '1px solid var(--border-strong)',
          marginBottom: '2rem'
        }}>
          
          <div data-reveal="up" data-delay="1" style={{ maxWidth: '300px' }}>
            <div style={{ position: 'relative', width: '120px', height: '64px', marginBottom: '1.5rem' }}>
              <Image src="/images/logo.png" alt="INOVO Logo" fill style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="body-sm" style={{ color: 'var(--text-muted)' }}>
              INOVO Design Consultancy.<br/>
              Crafting restrained, climate-responsive built environments with uncompromised detailing.
            </p>
          </div>

          <div data-reveal="up" data-delay="2">
            <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>Navigation</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { label: 'About Us', href: '/about-inovo-developers' },
                { label: 'What We Do', href: '/what-we-do' },
                { label: 'Our Ecosystem', href: '/#ourecosystem' },
                { label: 'Projects', href: '/our-projects' },
                { label: 'Team', href: '/team' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <a key={l.label} href={l.href}
                   className="hover-line body-sm" 
                   style={{ color: 'var(--text-secondary)', width: 'fit-content' }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div data-reveal="up" data-delay="3">
            <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>Ecosystem</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { name: 'INOVO Developers', tag: 'Consultancy', link: 'https://www.instagram.com/inovodevelopers' },
                { name: 'Upward', tag: 'Construction', link: 'https://www.instagram.com/upward.construction.llp/' },
                { name: 'Scale', tag: 'Interiors', link: 'https://www.instagram.com/scale_interiors_llp/' },
                { name: 'INOVO Properties', tag: 'Development', link: 'https://www.instagram.com/inovoproperties.in/' },
              ].map((e) => (
                <a key={e.name} href={e.link} target="_blank" rel="noopener noreferrer" className="hover-lift" style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', textDecoration: 'none' }}>
                  <span className="body-sm" style={{ color: 'var(--text)' }}>{e.name}</span>
                  <span className="label label-dark" style={{ fontSize: '0.6rem' }}>{e.tag}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div data-reveal="up" data-delay="4">
            <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>Studio</span>
            <address style={{ fontStyle: 'normal' }} className="body-sm">
              2422, 4th Floor, T2<br/>
              HiLITE Business Park, HiLITE City<br/>
              Kozhikode, Kerala 673014<br/><br/>
              <a href="mailto:inovodevelopers@gmail.com" className="hover-line" style={{ color: 'var(--text)', display: 'inline-block', marginBottom: '0.5rem' }}>inovodevelopers@gmail.com</a><br/>
              <a href="tel:+919809442227" style={{ color: 'var(--text)', textDecoration: 'none' }}>+91 9809442227</a>
            </address>
          </div>
        </div>

        {/* Bottom: Copyright & Top */}
        <div data-reveal="up" data-delay="5" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1rem'
        }}>
          <p className="label label-dark" style={{ margin: 0 }}>
            © {new Date().getFullYear()} INOVO. ALL RIGHTS RESERVED.
          </p>
          
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            style={{
              width: '50px', height: '50px', borderRadius: '50%',
              backgroundColor: 'var(--border)', border: '1px solid var(--border-strong)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--white)', transition: 'all var(--dur-fast) ease', cursor: 'pointer'
            }}
            className="back-top-btn hover-lift"
          ><ArrowUp size={20} className="back-arrow" style={{ transition: 'transform var(--dur-fast) ease' }} /></button>
        </div>

      </div>

      <style jsx>{`
        :global(.back-top-btn):hover { background: var(--white) !important; color: var(--pure-black) !important; }
        :global(.back-top-btn):hover .back-arrow { transform: translateY(-4px); }
      `}</style>
    </footer>
  );
}
