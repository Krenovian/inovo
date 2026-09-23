'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { useMouseParallax } from '@/hooks/useMouseParallax';

const TOPICS = [
  'Residential', 'Commercial', 'Hospitality',
  'Interiors', 'Architecture', 'Other'
];

export default function ContactEditorial() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Residential', phoneNumber: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);
  const mousePos = useMouseParallax();

  React.useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.whatsappNumber) {
          setWhatsappNumber(data.settings.whatsappNumber);
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) {
      if (whatsappNumber) {
        const text = `Name: ${form.name}\nEmail: ${form.email}\nType: ${form.type}\nPhone Number: ${form.phoneNumber}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedText}`, '_blank');
      }
      setSubmitted(true);
    }
  };

  const enquiryText = `Name: ${form.name}\nEmail: ${form.email}\nType: ${form.type}\nPhone Number: ${form.phoneNumber}`;

  return (
    <section id="contact" className="section-vh" style={{ backgroundColor: '#FFF', color: '#000', position: 'relative', overflow: 'hidden', padding: 0 }}>
      
      <div className="container-wide" style={{ position: 'relative', zIndex: 5, padding: '0 3rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {!submitted ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Left: Minimal Editorial Text */}
            <div data-reveal="up" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ 
                fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '2px', color: '#888', 
                textTransform: 'uppercase', display: 'block', marginBottom: '2rem'
              }}>
                Enquiries
              </span>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: '#000', textTransform: 'uppercase', lineHeight: 1, margin: '0 0 1.5rem 0',
              }}>
                Let's Talk.
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1vw, 1rem)', color: '#666',
                maxWidth: '400px', lineHeight: 1.6
              }}>
                Whether you have a clear vision or are just beginning to explore possibilities, we are ready to listen. Provide a few details below to start the conversation.
              </p>
            </div>

            {/* Right: Minimal Form */}
            <div data-reveal="up" data-delay="2" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
                  <div className="minimal-input-group">
                    <label htmlFor="name">Name *</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="ENTER YOUR NAME" />
                    <div className="input-line"></div>
                  </div>
                  
                  <div className="minimal-input-group">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="EMAIL ADDRESS" />
                    <div className="input-line"></div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
                  <div className="minimal-input-group">
                    <label htmlFor="type">Type *</label>
                    <select id="type" name="type" value={form.type} onChange={handleChange}>
                      {TOPICS.map((t) => <option key={t} value={t} style={{ color: '#000' }}>{t}</option>)}
                    </select>
                    <div className="input-line"></div>
                  </div>
                  
                  <div className="minimal-input-group">
                    <label htmlFor="phoneNumber">Phone Number *</label>
                    <input id="phoneNumber" name="phoneNumber" type="tel" required value={form.phoneNumber} onChange={handleChange} placeholder="PHONE NUMBER" />
                    <div className="input-line"></div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem' }}>
                  <button type="submit" className="hover-lift minimal-submit-btn">
                    Submit Enquiry <ArrowUpRight size={16} className="submit-arrow" />
                  </button>
                </div>

              </form>
            </div>
          </div>
        ) : (
          /* Success State */
          <div data-reveal="scale" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', border: '1px solid #000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#000', margin: '0 auto 2rem auto',
            }}><Check size={24} /></div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', color: '#000', textTransform: 'uppercase', marginBottom: '1rem', lineHeight: 1
            }}>Enquiry Ready</h3>
            <p style={{ fontFamily: 'var(--font-body)', color: '#666', fontSize: '1rem', marginBottom: '3rem' }}>
              Thank you, <strong>{form.name}</strong>. Your enquiry for {form.type} is prepared.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
              <button onClick={() => {
                const s = encodeURIComponent(`INOVO Enquiry — ${form.name}`);
                const b = encodeURIComponent(enquiryText);
                window.location.href = `mailto:contact@inovo.co?subject=${s}&body=${b}`;
              }} className="hover-lift minimal-action-btn" style={{ backgroundColor: '#000', color: '#FFF' }}>
                <Mail size={16} /> Send via Email
              </button>
              <button onClick={() => {
                navigator.clipboard.writeText(enquiryText);
                setCopied(true); setTimeout(() => setCopied(false), 2000);
              }} className="hover-lift minimal-action-btn" style={{ backgroundColor: 'transparent', color: '#000', border: '1px solid rgba(0,0,0,0.2)' }}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .minimal-input-group {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .minimal-input-group label {
          font-family: 'var(--font-body)';
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #888;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .minimal-input-group input, .minimal-input-group select {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'var(--font-body)';
          font-size: 1rem;
          font-weight: 500;
          color: #000;
          padding: 0.5rem 0;
          width: 100%;
          text-transform: uppercase;
          appearance: none;
          cursor: pointer;
        }
        .minimal-input-group input::placeholder {
          color: #CCC;
        }
        .input-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: rgba(0,0,0,0.1);
          transform-origin: left;
          transition: transform 0.4s ease, background-color 0.4s ease;
        }
        .minimal-input-group:focus-within .input-line {
          background-color: #000;
          transform: scaleY(2);
        }
        .minimal-submit-btn {
          background: #000;
          border: none;
          color: #FFF;
          font-family: 'var(--font-body)';
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          padding: 1rem 2rem;
          border-radius: 40px;
          transition: all 0.3s ease;
        }
        .minimal-submit-btn:hover .submit-arrow {
          transform: translate(3px, -3px);
        }
        .minimal-action-btn {
          padding: 1rem 2rem;
          border-radius: 40px;
          font-family: 'var(--font-body)';
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          display: flex;
          gap: 0.5rem;
          align-items: center;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
}
