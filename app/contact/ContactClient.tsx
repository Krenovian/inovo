'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollEngine from '@/components/ScrollEngine';
import { useMouseParallax } from '@/hooks/useMouseParallax';

const SERVICES = [
  'Exterior Design',
  'Interior Design',
  'Landscape Design',
  '3D Visualization',
  'Lighting Design',
  'Furniture Design',
  'Construction & Development Solutions',
];

const WHY = [
  'Creative and functional design solutions',
  'Integrated architectural and interior design services',
  'Professional project planning and consultation',
  'Personalized solutions for residential and commercial spaces',
];

const TOPICS = [
  'Residential',
  'Commercial',
  'Hospitality',
  'Interiors',
  'Architecture',
  'Other',
];

interface SiteSettings {
  whatsappNumber?: string;
  [key: string]: any;
}

export default function ContactClient({ settings }: { settings: SiteSettings }) {
  const mousePos = useMouseParallax();
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: 'Residential', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) {
      if (settings.whatsappNumber) {
        const text = `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\nMessage: ${form.message}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedText}`, '_blank');
      }
      setSubmitted(true);
    }
  };

  const enquiryText = `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\nMessage: ${form.message}`;

  return (
    <>
      <ScrollEngine />
      <Navbar />

      <main>

        {/* ── SECTION 1: HERO — White ── */}
        <section className="cp-hero" style={{ backgroundColor: '#fff', color: '#000' }}>
          {/* Background watermark */}
          <span aria-hidden className={`cp-watermark${loaded ? ' is-in' : ''}`}>HELLO</span>

          {/* Parallax orbs */}
          <div aria-hidden className={`cp-orb cp-orb-a${loaded ? ' is-in' : ''}`}
            style={{ transform: `translate3d(${mousePos.x * -28}px, ${mousePos.y * -20}px, 0)` }} />
          <div aria-hidden className={`cp-orb cp-orb-b${loaded ? ' is-in' : ''}`}
            style={{ transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 28}px, 0)` }} />

          <div className="container-wide" style={{ position: 'relative', zIndex: 5 }}>
            {/* Label */}
            <div className={`cp-eyebrow${loaded ? ' is-in' : ''}`}>
              <span>Contact</span>
              <i />
              <span>INOVO Developers</span>
            </div>

            {/* Hero headline */}
            <h1 className={`cp-h1${loaded ? ' is-in' : ''}`}>
              <span className="cp-line"><span className="cp-word" style={{ transitionDelay: '0.2s' }}>Contact</span></span>
              <span className="cp-line"><span className="cp-word cp-word-ghost" style={{ transitionDelay: '0.36s' }}>INOVO</span></span>
            </h1>

            {/* Subheading + intro */}
            <div className="cp-hero-body"
              style={{ transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 5}px, 0)` }}>
              <p className={`cp-subhead${loaded ? ' is-in' : ''}`}>
                Let's Create Something Exceptional Together
              </p>
              <div className={`cp-rule${loaded ? ' is-in' : ''}`} />
              <div className={`cp-intro${loaded ? ' is-in' : ''}`}>
                <p>Have a project in mind? Whether you're planning a new home, designing a commercial space, or looking for professional interior, exterior, or landscape design services, INOVO Developers is here to help.</p>
                <p>As a leading design consultancy in Calicut, we bring together creativity, technical expertise, and thoughtful planning to turn your ideas into beautifully designed spaces.</p>
                <p className="cp-intro-highlight">Get in touch with our team today to discuss your project and take the first step towards bringing your vision to life.</p>
              </div>
            </div>

            <div className={`cp-scroll-cue${loaded ? ' is-in' : ''}`} aria-hidden>
              <span>Scroll</span>
              <i />
            </div>
          </div>
        </section>

        {/* ── SECTION 2: SERVICES — Black ── */}
        <section className="cp-services" style={{ backgroundColor: '#000', color: '#fff' }}>
          {/* Background marquee text */}
          <div aria-hidden className="cp-marquee-bg">
            <div className="cp-marquee-track">
              <span>OUR SERVICES &nbsp;&nbsp;&nbsp; OUR SERVICES &nbsp;&nbsp;&nbsp; OUR SERVICES &nbsp;&nbsp;&nbsp; OUR SERVICES &nbsp;&nbsp;&nbsp;</span>
              <span>OUR SERVICES &nbsp;&nbsp;&nbsp; OUR SERVICES &nbsp;&nbsp;&nbsp; OUR SERVICES &nbsp;&nbsp;&nbsp; OUR SERVICES &nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>

          <div className="container-wide" style={{ position: 'relative', zIndex: 5 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '2rem',
                marginBottom: 'clamp(3rem, 6vh, 5rem)',
                transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 8}px, 0)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div data-reveal="up">
                <span className="cp-kicker">02 — What We Offer</span>
                <h2 className="cp-section-h2">Our<br /><span style={{ color: '#555' }}>Services</span></h2>
              </div>
              <p data-reveal="up" data-delay="1" className="cp-section-desc">
                A full-spectrum of architectural and interior services, from initial concept to final execution.
              </p>
            </div>

            {/* Service rows — ecosystem style */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {SERVICES.map((service, i) => (
                <div key={service} className="cp-svc-row" data-reveal="up" style={{ transitionDelay: `${0.04 * i}s` }}>
                  <div className="cp-svc-row-bg" />
                  <span className="cp-svc-num">{String(i + 1).padStart(2, '0')}</span>
                  <strong className="cp-svc-name">{service}</strong>
                  <div className="cp-svc-arrow">
                    <ArrowUpRight size={20} className="cp-svc-arrow-icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: WHY — White ── */}
        <section className="cp-why" style={{ backgroundColor: '#fff', color: '#000' }}>
          <div className="container-wide">
            <div data-reveal="up" style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
              <span className="cp-kicker cp-kicker-dark">03 — Our Edge</span>
              <h2 className="cp-section-h2 cp-section-h2-dark">
                Why Contact<br /><span style={{ color: '#aaa' }}>INOVO Developers?</span>
              </h2>
            </div>

            <div className="cp-why-grid">
              {WHY.map((reason, i) => (
                <div key={reason} data-reveal="up" style={{ transitionDelay: `${0.08 * i}s` }} className="cp-why-card">
                  <span className="cp-why-num">{String(i + 1).padStart(2, '0')}</span>
                  <p className="cp-why-text">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: FORM — Black ── */}
        <section id="enquire" className="cp-form-section" style={{ backgroundColor: '#000', color: '#fff' }}>
          {/* Background marquee */}
          <div aria-hidden className="cp-marquee-bg cp-marquee-bg-bottom">
            <div className="cp-marquee-track cp-marquee-reverse">
              <span>START YOUR PROJECT &nbsp;&nbsp;&nbsp; START YOUR PROJECT &nbsp;&nbsp;&nbsp; START YOUR PROJECT &nbsp;&nbsp;&nbsp;</span>
              <span>START YOUR PROJECT &nbsp;&nbsp;&nbsp; START YOUR PROJECT &nbsp;&nbsp;&nbsp; START YOUR PROJECT &nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>

          <div className="container-wide" style={{ position: 'relative', zIndex: 5 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start' }}>
              {/* Copy */}
              <div data-reveal="up" style={{ paddingTop: '0.5rem' }}>
                <span className="cp-kicker">04 — Enquire</span>
                <h2 className="cp-section-h2" style={{ marginBottom: '2rem' }}>
                  Let's Discuss<br /><span style={{ color: '#555' }}>Your Project</span>
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', color: '#aaa', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Share your project details with us, and our team will get back to you to understand your requirements and explore the right design solutions for your space.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', color: '#fff', fontWeight: 500, lineHeight: 1.6 }}>
                  Start your project with INOVO Developers today.
                </p>
              </div>

              {/* Form */}
              <div data-reveal="up" data-delay="1">
                {!submitted ? (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
                    <div className="cp-field dark">
                      <label htmlFor="name">Name *</label>
                      <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Enter your name" />
                      <div className="cp-field-line" />
                    </div>
                    <div className="cp-field dark">
                      <label htmlFor="email">Email *</label>
                      <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email address" />
                      <div className="cp-field-line" />
                    </div>
                    <div className="cp-field dark">
                      <label htmlFor="topic">Topic *</label>
                      <select id="topic" name="topic" value={form.topic} onChange={handleChange}>
                        {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <div className="cp-field-line" />
                    </div>
                    <div className="cp-field dark">
                      <label htmlFor="message">Project Details</label>
                      <textarea id="message" name="message" rows={2} value={form.message} onChange={handleChange} placeholder="Tell us about your space" style={{ resize: 'none' }} />
                      <div className="cp-field-line" />
                    </div>
                    <div>
                      <button type="submit" className="cp-submit hover-lift">
                        Submit Enquiry <ArrowUpRight size={18} className="cp-submit-arrow" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div data-reveal="scale">
                    <div style={{ width: '68px', height: '68px', borderRadius: '50%', backgroundColor: '#fff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                      <Check size={28} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                      Enquiry Ready
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#aaa', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                      Thank you, <strong style={{ color: '#fff' }}>{form.name}</strong>. Your enquiry for {form.topic} is prepared.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem' }}>
                      <button onClick={() => {
                        const s = encodeURIComponent(`INOVO Enquiry — ${form.name}`);
                        const b = encodeURIComponent(enquiryText);
                        window.location.href = `mailto:inovodevelopers@gmail.com?subject=${s}&body=${b}`;
                      }} className="cp-submit hover-lift" style={{ fontSize: '0.95rem', padding: '1rem 2rem' }}>
                        <Mail size={16} style={{ marginRight: '0.5rem' }} /> Send via Email
                      </button>
                      <button onClick={() => {
                        navigator.clipboard.writeText(enquiryText);
                        setCopied(true); setTimeout(() => setCopied(false), 2000);
                      }} className="cp-submit-ghost hover-lift">
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied' : 'Copy Text'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: STUDIO — White ── */}
        <section className="cp-studio" style={{ backgroundColor: '#fff', color: '#000' }}>
          <div className="container-wide">
            <div data-reveal="up" style={{ marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>
              <span className="cp-kicker cp-kicker-dark">05 — Studio</span>
            </div>

            <h2 data-reveal="up" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 10vw, 10rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.04em',
              lineHeight: 0.85,
              marginBottom: 'clamp(4rem, 8vh, 7rem)',
              color: '#000',
            }}>
              INOVO<br /><span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(0,0,0,0.25)' }}>Developers</span>
            </h2>

            <div className="cp-studio-grid">
              <address data-reveal="up" style={{ fontStyle: 'normal' }}>
                <span className="cp-studio-label">Address</span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', color: '#444', lineHeight: 1.9 }}>
                  2422, 4th Floor, T2, HiLITE Business Park,<br />
                  HiLITE City, Kozhikode, Pantheeramkavu,<br />
                  Kerala 673014, India
                </p>
              </address>

              <div data-reveal="up" data-delay="1">
                <span className="cp-studio-label">Contact</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <a href="mailto:inovodevelopers@gmail.com" className="cp-contact-link hover-line">
                    inovodevelopers@gmail.com
                  </a>
                  <a href="tel:+919809442227" className="cp-contact-link hover-line">
                    📲 : +91 9809442227
                  </a>
                </div>
              </div>

              <div data-reveal="up" data-delay="2">
                <span className="cp-studio-label">Social</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <a href="https://www.instagram.com/inovodevelopers" target="_blank" rel="noreferrer" className="cp-social-row">
                    <div className="cp-social-icon">
                      <FaInstagram size={18} />
                    </div>
                    <span>Instagram</span>
                    <ArrowUpRight size={16} className="cp-social-arrow" />
                  </a>
                  <a href="https://www.linkedin.com/company/81495212/" target="_blank" rel="noreferrer" className="cp-social-row">
                    <div className="cp-social-icon">
                      <FaLinkedinIn size={18} />
                    </div>
                    <span>LinkedIn</span>
                    <ArrowUpRight size={16} className="cp-social-arrow" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style jsx>{`
        /* ─── HERO ─── */
        .cp-hero {
          min-height: 100vh;
          min-height: 100svh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding-top: var(--nav-height);
        }
        .cp-hero .container-wide {
          width: 100%;
          padding: clamp(3rem, 6vh, 5rem) clamp(1.2rem, 3.2vw, 2.4rem) clamp(4rem, 8vh, 7rem);
        }
        .cp-watermark {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-display);
          font-size: clamp(7rem, 26vw, 22rem);
          font-weight: 300;
          letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,0,0,0.05);
          text-transform: uppercase;
          pointer-events: none;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 1.4s ease;
        }
        .cp-watermark.is-in { opacity: 1; }
        .cp-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(60px);
          opacity: 0;
          transition: opacity 1.4s ease;
        }
        .cp-orb.is-in { opacity: 1; }
        .cp-orb-a {
          width: min(45vw, 520px); height: min(45vw, 520px);
          top: -5%; left: -8%;
          background: radial-gradient(circle, rgba(0,0,0,0.05), transparent 70%);
        }
        .cp-orb-b {
          width: min(38vw, 440px); height: min(38vw, 440px);
          right: -6%; bottom: 5%;
          background: radial-gradient(circle, rgba(0,0,0,0.04), transparent 70%);
          transition-delay: 0.4s;
        }
        .cp-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: clamp(1.5rem, 3vh, 2.5rem);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
        }
        .cp-eyebrow.is-in { opacity: 1; transform: none; }
        .cp-eyebrow i { display: block; width: 32px; height: 1px; background: currentColor; opacity: 0.5; }

        .cp-h1 {
          margin: 0 0 clamp(2rem, 4vh, 3.5rem);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .cp-line { display: block; overflow: hidden; }
        .cp-word {
          display: inline-block;
          font-family: var(--font-display);
          font-size: clamp(4rem, 12vw, 11rem);
          font-weight: 300;
          line-height: 0.88;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          color: #000;
          opacity: 0;
          transform: translateY(110%);
          transition: opacity 1s var(--ease-out-expo), transform 1s var(--ease-out-expo);
        }
        .cp-h1.is-in .cp-word { opacity: 1; transform: none; }
        .cp-word-ghost {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(0,0,0,0.3);
        }
        .cp-hero-body {
          transition: transform 0.35s ease-out;
          max-width: 760px;
        }
        .cp-subhead {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          font-weight: 500;
          color: #555;
          letter-spacing: 0.01em;
          margin: 0;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.9s var(--ease-out-expo) 0.55s, transform 0.9s var(--ease-out-expo) 0.55s;
        }
        .cp-subhead.is-in { opacity: 1; transform: none; }
        .cp-rule {
          width: 0; height: 1px;
          background: #000;
          margin: clamp(1.5rem, 3vh, 2.2rem) 0;
          transition: width 1s var(--ease-out-expo) 0.72s;
        }
        .cp-rule.is-in { width: min(100px, 25vw); }
        .cp-intro {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.95s var(--ease-out-expo) 0.88s, transform 0.95s var(--ease-out-expo) 0.88s;
        }
        .cp-intro.is-in { opacity: 1; transform: none; }
        .cp-intro p {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          line-height: 1.8;
          color: #666;
          margin: 0 0 1.1rem;
        }
        .cp-intro-highlight { color: #111 !important; font-weight: 500; }
        .cp-scroll-cue {
          position: absolute;
          bottom: 2.5rem;
          left: clamp(1.2rem, 3.2vw, 2.4rem);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.7rem;
          opacity: 0;
          transition: opacity 1s ease 1.3s;
        }
        .cp-scroll-cue.is-in { opacity: 1; }
        .cp-scroll-cue span {
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #aaa;
        }
        .cp-scroll-cue i {
          display: block; width: 1px; height: 40px;
          background: linear-gradient(to bottom, #000, transparent);
          animation: cpCuePulse 1.7s ease-in-out infinite;
        }
        @keyframes cpCuePulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); }
        }

        /* ─── SHARED KICKER ─── */
        .cp-kicker {
          display: block;
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1.6rem;
        }
        .cp-kicker-dark { color: #999; }
        .cp-section-h2 {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 6vw, 6rem);
          font-weight: 300;
          letter-spacing: -0.04em;
          line-height: 0.9;
          text-transform: uppercase;
          margin: 0;
          color: #fff;
        }
        .cp-section-h2-dark { color: #000; }
        .cp-section-desc {
          max-width: 380px;
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          line-height: 1.75;
          color: #666;
          margin: 0;
        }

        /* ─── SERVICES ─── */
        .cp-services {
          padding: clamp(5rem, 10vh, 8rem) 0;
          position: relative;
          overflow: hidden;
        }
        .cp-marquee-bg {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
          opacity: 0.06;
          white-space: nowrap;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .cp-marquee-bg-bottom {
          top: auto;
          bottom: 0;
          transform: none;
          opacity: 0.04;
        }
        .cp-marquee-track {
          display: inline-flex;
          animation: cpMarquee 30s linear infinite;
          font-family: var(--font-display);
          font-size: clamp(5rem, 14vw, 14rem);
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px #fff;
        }
        .cp-marquee-reverse {
          animation-direction: reverse;
          -webkit-text-stroke: 1px #000;
          color: transparent;
        }
        @keyframes cpMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .cp-svc-row {
          display: grid;
          grid-template-columns: 3.5rem 1fr auto;
          gap: clamp(1rem, 3vw, 3rem);
          align-items: center;
          padding: clamp(1.4rem, 3vh, 2.2rem) 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          cursor: default;
          position: relative;
          overflow: hidden;
          transition: all 0.4s var(--ease-out-expo);
        }
        .cp-svc-row-bg {
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.04);
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.4s var(--ease-out-expo);
          z-index: 0;
        }
        .cp-svc-row:hover .cp-svc-row-bg { transform: scaleY(1); transform-origin: top; }
        .cp-svc-num {
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: #555;
          position: relative; z-index: 2;
          transition: color 0.4s ease;
        }
        .cp-svc-row:hover .cp-svc-num { color: #fff; }
        .cp-svc-name {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 3vw, 2.6rem);
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #fff;
          position: relative; z-index: 2;
          transition: transform 0.4s var(--ease-out-expo);
        }
        .cp-svc-row:hover .cp-svc-name { transform: translateX(16px); }
        .cp-svc-arrow {
          width: clamp(44px, 5vw, 68px);
          height: clamp(44px, 5vw, 68px);
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 2;
          transition: all 0.4s var(--ease-out-expo);
        }
        .cp-svc-row:hover .cp-svc-arrow {
          background: #fff;
          border-color: #fff;
          transform: scale(1.08);
        }
        .cp-svc-arrow-icon { transition: all 0.4s ease; }
        .cp-svc-row:hover .cp-svc-arrow-icon { stroke: #000; transform: rotate(45deg); }

        /* ─── WHY ─── */
        .cp-why {
          padding: clamp(5rem, 10vh, 8rem) 0;
        }
        .cp-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2px;
          border: 1px solid var(--gray-100);
        }
        .cp-why-card {
          padding: clamp(2rem, 4vh, 3rem);
          border: 1px solid var(--gray-100);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: background 0.4s ease;
        }
        .cp-why-card:hover { background: #f7f7f7; }
        .cp-why-num {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 300;
          color: #ddd;
          letter-spacing: -0.03em;
          line-height: 1;
          display: block;
        }
        .cp-why-text {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          font-weight: 500;
          line-height: 1.6;
          color: #111;
          margin: 0;
        }

        /* ─── FORM ─── */
        .cp-form-section {
          padding: clamp(5rem, 10vh, 8rem) 0;
          position: relative;
          overflow: hidden;
        }
        .cp-field {
          position: relative;
          display: flex;
          flex-direction: column;
          padding-bottom: 0.8rem;
        }
        .cp-field label {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 0.8rem;
        }
        .cp-field.dark label { color: rgba(255,255,255,0.35); }
        .cp-field input, .cp-field select, .cp-field textarea {
          background: transparent;
          border: none; outline: none;
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          color: #000;
          width: 100%;
          appearance: none;
        }
        .cp-field.dark input, .cp-field.dark select, .cp-field.dark textarea { color: #fff; }
        .cp-field.dark select option { color: #000; }
        .cp-field input::placeholder, .cp-field textarea::placeholder { color: #ccc; }
        .cp-field.dark input::placeholder, .cp-field.dark textarea::placeholder { color: rgba(255,255,255,0.2); }
        .cp-field-line {
          position: absolute; bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: rgba(0,0,0,0.15);
          transform-origin: left;
          transition: transform 0.5s var(--ease-out-expo), background 0.5s ease;
        }
        .cp-field.dark .cp-field-line { background: rgba(255,255,255,0.15); }
        .cp-field:focus-within .cp-field-line { background: #000; transform: scaleY(2); }
        .cp-field.dark:focus-within .cp-field-line { background: #fff; transform: scaleY(2); }

        .cp-submit {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: #fff;
          color: #000;
          border: none;
          border-radius: 50px;
          padding: 1.1rem 2.4rem;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          cursor: pointer;
          transition: all 0.4s var(--ease-out-expo);
        }
        .cp-submit:hover { background: #eee; }
        .cp-submit-arrow { transition: transform 0.4s var(--ease-out-expo); }
        .cp-submit:hover .cp-submit-arrow { transform: translate(4px, -4px); }
        .cp-submit-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 50px;
          padding: 1.1rem 2.4rem;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          cursor: pointer;
          transition: all 0.4s var(--ease-out-expo);
        }
        .cp-submit-ghost:hover { border-color: rgba(255,255,255,0.7); }

        /* ─── STUDIO ─── */
        .cp-studio {
          padding: clamp(5rem, 10vh, 8rem) 0;
        }
        .cp-studio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 4rem;
          border-top: 1px solid var(--gray-100);
          padding-top: clamp(3rem, 5vh, 4rem);
        }
        .cp-studio-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 1.5rem;
        }
        .cp-contact-link {
          display: inline-block;
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          color: #111;
          font-weight: 400;
          transition: color 0.3s ease;
        }
        .cp-contact-link:hover { color: #000; }
        .cp-social-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          color: #111;
        }
        .cp-social-row:hover { color: #000; }
        .cp-social-icon {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid var(--gray-200);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .cp-social-row:hover .cp-social-icon {
          background: #000;
          border-color: #000;
          color: #fff;
        }
        .cp-social-row span {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          flex: 1;
        }
        .cp-social-arrow { opacity: 0; transition: all 0.3s ease; }
        .cp-social-row:hover .cp-social-arrow { opacity: 1; transform: translate(4px, -4px); }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
          .cp-form-section .container-wide > div { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .cp-svc-name { font-size: 1.2rem; }
          .cp-field input, .cp-field select, .cp-field textarea { font-size: 1.5rem; }
        }
      `}</style>
    </>
  );
}
