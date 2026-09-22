'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaVimeoV, FaBehance, FaPinterestP, FaWhatsapp } from 'react-icons/fa';

const LEFT_NAV = [
  { id: 'aboutus', label: 'About Us', href: '/about-inovo-developers' },
  { id: 'whatwedo', label: 'What We Do', href: '/what-we-do' },
  { id: 'ourecosystem', label: 'Our Ecosystem', href: '/#ourecosystem' },
  { id: 'projects', label: 'Projects', href: '/our-projects' },
];

const RIGHT_NAV = [
  { id: 'team', label: 'Team', href: '/team' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

const ALL_NAV = [{ id: 'hero', label: 'Home', href: '/#hero' }, ...LEFT_NAV, ...RIGHT_NAV];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const isAbout = pathname === '/about-inovo-developers';
  const isWhatWeDo = pathname === '/what-we-do';
  const isProjects = pathname === '/our-projects';
  const isTeam = pathname === '/team';
  const isContact = pathname === '/contact';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(
    isContact
      ? 'Contact'
      : isTeam
        ? 'Team'
        : isProjects
          ? 'Projects'
          : isWhatWeDo
            ? 'What We Do'
            : isAbout
              ? 'About Us'
              : 'Home'
  );
  const [assistExpanded, setAssistExpanded] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    if (touchEnd - touchStart > 30) {
      setAssistExpanded(false);
    }
    setTouchStart(null);
  };

  useEffect(() => {
    setLoaded(true);

    const onScroll = () => {
      // Home hero is ~400vh; other pages use a short threshold.
      const threshold = isHome ? window.innerHeight * 3.5 : 64;
      setScrolled(window.scrollY > threshold);

      if (!isHome) {
        setActiveSection(
          isContact
            ? 'Contact'
            : isTeam
              ? 'Team'
              : isProjects
                ? 'Projects'
                : isWhatWeDo
                  ? 'What We Do'
                  : isAbout
                    ? 'About Us'
                    : 'Home'
        );
        return;
      }

      const sections = ALL_NAV.map(nav => document.getElementById(nav.id));
      let currentSection = ALL_NAV[0].label;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentSection = ALL_NAV[i].label;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome, isAbout, isWhatWeDo, isProjects, isTeam, isContact]);

  const navigateToPage = (path: string) => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    if (pathname === path) {
      requestAnimationFrame(() => {
        html.style.scrollBehavior = previous;
      });
      return;
    }

    router.push(path);
    // Ensure top even if the router restores position after paint.
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = previous;
    });
  };

  const smoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (href === '/about-inovo-developers') {
      navigateToPage('/about-inovo-developers');
      return;
    }

    if (href === '/what-we-do') {
      navigateToPage('/what-we-do');
      return;
    }

    if (href === '/our-projects') {
      navigateToPage('/our-projects');
      return;
    }

    if (href === '/team') {
      navigateToPage('/team');
      return;
    }

    if (href === '/contact') {
      navigateToPage('/contact');
      return;
    }

    const hash = href.includes('#') ? `#${href.split('#')[1]}` : href;

    if (!isHome) {
      const html = document.documentElement;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      router.push(`/${hash}`);
      // After home mounts, scroll to the section.
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
        html.style.scrollBehavior = previous;
      }, 80);
      return;
    }

    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  };

  const topNavColor = '#000';
  const topLogoFilter = 'brightness(0)';

  return (
    <>
      {/* Default Top Navbar (unscrolled state) - SPLIT LAYOUT */}
      <header
        className="top-nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '2.5rem 0',
          paddingTop: 'calc(2.5rem + env(safe-area-inset-top, 0px))',
          transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
          transform: scrolled ? 'translateY(-100%)' : (loaded ? 'translateY(0)' : 'translateY(-50px)'),
          opacity: scrolled ? 0 : (loaded ? 1 : 0),
          pointerEvents: scrolled ? 'none' : 'auto'
        }}
      >
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 3rem' }}>
          
          {/* Left Links */}
          <nav style={{ display: 'flex', gap: '2.5rem', flex: 1 }} className="nav-desktop">
            {LEFT_NAV.map((item, i) => (
              <a
                key={item.label} href={item.href} onClick={(e) => smoothScroll(e, item.href)}
                className="hover-line"
                style={{
                  fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontWeight: 600, fontFamily: 'var(--font-body)', color: topNavColor, textDecoration: 'none',
                  opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(-10px)',
                  transition: `all 0.5s ease ${i * 0.1}s`
                }}
              >{item.label}</a>
            ))}
          </nav>

          {/* Center Logo */}
          <div style={{ display: 'flex', flex: '0 1 auto', justifyContent: 'center' }}>
            <a href="/#hero" onClick={(e) => smoothScroll(e, '/#hero')} style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none',
              opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.8s ease'
            }}>
              <div className="top-nav-logo" style={{ position: 'relative', width: '120px', height: '60px' }}>
                <Image src="/images/logo.png" alt="INOVO Logo" fill style={{ objectFit: 'contain', filter: topLogoFilter }} />
              </div>
            </a>
          </div>

          {/* Right Links & CTA */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', flex: 1, justifyContent: 'flex-end' }} className="nav-desktop">
            {RIGHT_NAV.map((item, i) => (
              <a
                key={item.label} href={item.href} onClick={(e) => smoothScroll(e, item.href)}
                className="hover-line"
                style={{
                  fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontWeight: 600, fontFamily: 'var(--font-body)', color: topNavColor, textDecoration: 'none',
                  opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(-10px)',
                  transition: `all 0.5s ease ${0.4 + i * 0.1}s`
                }}
              >{item.label}</a>
            ))}

            <a
              href="/contact" onClick={(e) => smoothScroll(e, '/contact')}
              className="hover-lift"
              style={{ 
                padding: '0.8rem 1.8rem', fontSize: '0.75rem',
                backgroundColor: '#000',
                color: '#FFF', 
                borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', textDecoration: 'none',
                opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'all 0.5s ease 0.6s'
              }}
            >
              Start Project <ArrowUpRight size={14} />
            </a>
          </nav>
          
          {/* Mobile Hamburger */}
          <button className="nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'transparent', border: 'none', color: topNavColor, cursor: 'pointer', padding: '0.5rem'
          }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Premium Glassmorphism Social Pill (Top Right) */}
      <div className="nav-desktop" style={{
        position: 'fixed', top: 'clamp(1.5rem, 4vh, 2.5rem)', right: 'clamp(1.5rem, 4vh, 2.5rem)', zIndex: 9999,
        pointerEvents: scrolled ? 'auto' : 'none',
        display: 'flex', justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'rgba(20, 20, 20, 0.65)', 
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          padding: '0.4rem', 
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          transform: scrolled ? 'translateY(0) scale(1)' : 'translateY(-100px) scale(0.9)',
          opacity: scrolled ? 1 : 0,
          color: '#FFF'
        }}>
          {[
            { Icon: FaInstagram, href: 'https://www.instagram.com/inovodevelopers?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw%3D%3D', title: 'Instagram' },
            { Icon: FaFacebookF, href: 'https://www.facebook.com/InovoDevelopers', title: 'Facebook' },
            { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/81495212/admin/dashboard/', title: 'LinkedIn' },
            { Icon: FaYoutube, href: 'https://www.youtube.com/@InovoDevelopers', title: 'Youtube' },
            { Icon: FaVimeoV, href: 'https://vimeo.com/user263023400', title: 'Vimeo' },
            { Icon: FaBehance, href: 'https://www.behance.net/inovodevelopers', title: 'Behance' },
            { Icon: FaPinterestP, href: 'https://in.pinterest.com/inovodevelopers/', title: 'Pinterest' }
          ].map((social, i) => (
            <a key={i} href={social.href} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', 
              color: '#FFF', cursor: 'pointer', textDecoration: 'none',
              transition: 'all 0.3s ease'
            }} title={social.title}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
            }}
            >
              <social.Icon size={14} />
            </a>
          ))}
        </div>
      </div>

      {/* ── Desktop Floating Nav Pill ── */}
      <div className="nav-desktop" style={{
        position: 'fixed', bottom: 'clamp(1.5rem, 4vh, 2.5rem)', left: 0, right: 0, zIndex: 9999,
        pointerEvents: scrolled ? 'auto' : 'none',
        display: 'flex', justifyContent: 'center'
      }}>
        
        {/* The Glass Container */}
        <div style={{
          backgroundColor: 'rgba(20, 20, 20, 0.65)', 
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          padding: '0.4rem', 
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
          transform: scrolled ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0.9)',
          opacity: scrolled ? 1 : 0,
          color: '#FFF'
        }}>
          
          {/* Logo Button */}
          <button onClick={() => smoothScroll({ preventDefault: () => {} } as any, '/#hero')} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '46px', height: '46px', borderRadius: '50%', 
            backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', 
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
          >
            <div style={{ position: 'relative', width: '24px', height: '24px' }}>
              <Image src="/images/logo.png" alt="INOVO" fill style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
          </button>

          {/* Full Links */}
          <nav style={{ display: 'flex', alignItems: 'center', padding: '0 0.5rem', gap: '0.25rem' }}>
            {ALL_NAV.map((item) => {
              const isActive = activeSection === item.label;
              return (
                <a
                  key={item.label} href={item.href} onClick={(e) => smoothScroll(e, item.href)}
                  style={{
                    position: 'relative',
                    padding: '0.7rem 1.4rem',
                    fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontWeight: isActive ? 700 : 500, fontFamily: 'var(--font-body)', 
                    color: isActive ? '#000' : 'rgba(255, 255, 255, 0.65)', 
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    borderRadius: '40px',
                    backgroundColor: isActive ? '#FFF' : 'transparent',
                    boxShadow: isActive ? '0 4px 15px rgba(255,255,255,0.2)' : 'none',
                    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#FFF';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >{item.label}</a>
              );
            })}
          </nav>

          {/* Vertical Divider */}
          <div style={{ width: '1px', height: '24px', backgroundColor: '#FFF', opacity: 0.15, margin: '0 0.25rem' }}></div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', paddingRight: '0.2rem' }}>
            {/* WhatsApp */}
            <a href="https://wa.me/919809442227" target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '46px', height: '46px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', 
              color: '#FFF', cursor: 'pointer', textDecoration: 'none',
              transition: 'all 0.3s ease'
            }} title="Chat on WhatsApp"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#25D366';
              e.currentTarget.style.borderColor = '#25D366';
              e.currentTarget.style.color = '#FFF';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(37, 211, 102, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = '#FFF';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Mobile Sticky Pill / Edge Assist ── */}
      <div 
        className="nav-mobile-toggle"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'fixed', 
          bottom: 'clamp(1.5rem, 4vh, 2.5rem)', 
          right: assistExpanded ? '50%' : '1.5rem', 
          transform: assistExpanded ? 'translateX(50%)' : (scrolled ? 'translateX(0)' : 'translateX(150%)'),
          zIndex: 9999,
          pointerEvents: scrolled ? 'auto' : 'none',
          display: 'flex', 
          transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
          opacity: scrolled ? 1 : 0,
          maxWidth: assistExpanded ? 'calc(100vw - 1.5rem)' : 'auto',
        }}
      >
        <div style={{
          backgroundColor: 'rgba(20, 20, 20, 0.75)', 
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          padding: assistExpanded ? '0.4rem' : '0.4rem', 
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          display: 'flex', 
          flexDirection: assistExpanded ? 'row' : 'column',
          alignItems: 'center', 
          gap: assistExpanded ? '0.4rem' : '0',
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          width: '100%',
          justifyContent: 'space-between'
        }}>
          
          {assistExpanded ? (
            <>
              {/* Logo Button */}
              <button onClick={() => { smoothScroll({ preventDefault: () => {} } as any, '/#hero'); setAssistExpanded(false); }} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                width: '42px', height: '42px', borderRadius: '50%', 
                backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', 
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                  <Image src="/images/logo.png" alt="INOVO" fill style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                </div>
              </button>

              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />

              {/* Social Icons */}
              <div className="no-scrollbar" style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', flex: 1, WebkitOverflowScrolling: 'touch' }}>
                {[
                  { Icon: FaInstagram, href: 'https://www.instagram.com/inovodevelopers' },
                  { Icon: FaFacebookF, href: 'https://www.facebook.com/InovoDevelopers' },
                  { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/81495212/admin/dashboard/' },
                  { Icon: FaYoutube, href: 'https://www.youtube.com/@InovoDevelopers' },
                  { Icon: FaVimeoV, href: 'https://vimeo.com/user263023400' },
                  { Icon: FaBehance, href: 'https://www.behance.net/inovodevelopers' },
                  { Icon: FaPinterestP, href: 'https://in.pinterest.com/inovodevelopers/' }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noreferrer" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    width: '36px', height: '36px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.05)', color: '#FFF', textDecoration: 'none',
                  }}>
                    <social.Icon size={14} />
                  </a>
                ))}
              </div>

              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />

              {/* WhatsApp */}
              <a href="https://wa.me/919809442227" target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                width: '42px', height: '42px', borderRadius: '50%',
                backgroundColor: '#25D366', color: '#FFF', textDecoration: 'none',
                boxShadow: '0 5px 15px rgba(37, 211, 102, 0.3)',
              }}>
                <FaWhatsapp size={18} />
              </a>

              {/* Menu Toggle */}
              <button onClick={() => setMenuOpen(!menuOpen)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                width: '42px', height: '42px', borderRadius: '50%',
                backgroundColor: menuOpen ? '#FFF' : 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', color: menuOpen ? '#000' : '#FFF',
              }}>
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              
              {/* Collapse Handle */}
              <button onClick={() => setAssistExpanded(false)} style={{
                background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0.2rem', marginLeft: '-0.3rem'
              }}>
                <ChevronRight size={20} />
              </button>
            </>
          ) : (
            <>
              {/* Expand Handle */}
              <button onClick={() => setAssistExpanded(true)} style={{
                background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '46px', height: '46px', borderRadius: '50%'
              }}>
                <Menu size={24} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Mobile Full Screen Drawer ── */}
      <div className={`mobile-drawer-menu ${menuOpen ? 'open' : ''}`} style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(30px) saturate(150%)',
        WebkitBackdropFilter: 'blur(30px) saturate(150%)',
        padding: '5rem 2rem 3rem',
        display: 'flex', flexDirection: 'column', zIndex: 99998,
        justifyContent: 'space-between',
        transition: 'opacity 0.4s ease-in-out, transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)',
        pointerEvents: menuOpen ? 'auto' : 'none'
      }}>
        
        <button onClick={() => setMenuOpen(false)} style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
          color: '#FFF', cursor: 'pointer', borderRadius: '50%',
          width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999
        }}>
          <X size={24} />
        </button>

        {/* Navigation Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {ALL_NAV.map((item, i) => (
            <a key={item.label} href={item.href} onClick={(e) => smoothScroll(e, item.href)}
              className="drawer-link"
              style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 10vw, 3.6rem)', color: '#FFF', textDecoration: 'none',
                display: 'flex', alignItems: 'baseline', gap: '1rem',
                textTransform: 'uppercase', lineHeight: 0.9,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s`
              }}
            >
              <span style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '2px' }}>
                0{i + 1}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Drawer Footer (Contact Info) */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '0.8rem',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1) 0.5s'
        }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Get in touch
          </p>
          <a href="mailto:info@inovodevelopers.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFF', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
            <Mail size={16} /> info@inovodevelopers.com
          </a>
          <a href="tel:+919809442227" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFF', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
            <Phone size={16} /> +91 98094 42227
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          :global(.nav-desktop) { display: flex !important; }
          :global(.nav-mobile-toggle) { display: none !important; }
          :global(.mobile-drawer-menu) { display: none !important; }
        }
        @media (max-width: 1023px) {
          :global(.nav-desktop) { display: none !important; }
          :global(.nav-mobile-toggle) { display: flex !important; }
          :global(.desktop-popover-menu) { display: none !important; }
          :global(.top-nav) {
            padding: 0.65rem 0 !important;
            padding-top: calc(0.65rem + env(safe-area-inset-top, 0px)) !important;
          }
          :global(.top-nav) :global(.container-wide) {
            padding-left: 1.15rem !important;
            padding-right: 1.15rem !important;
          }
          :global(.top-nav-logo) {
            width: 96px !important;
            height: 48px !important;
          }
        }
        .drawer-link {
          position: relative;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .drawer-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 35px;
          width: 0;
          height: 2px;
          background-color: #fff;
          transition: width 0.3s ease;
        }
        .drawer-link:hover::after {
          width: calc(100% - 35px);
        }
        .drawer-link:hover {
          color: #DDD !important;
        }
      `}</style>
    </>
  );
}
