'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body, system-ui)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.02) 0%, transparent 50%)',
      }} />

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '420px',
        padding: '2rem',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: '60px', height: '60px', margin: '0 auto 1.5rem',
            borderRadius: '16px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: '#111',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Image src="/images/logo.png" alt="INOVO" width={44} height={44} style={{ objectFit: 'contain' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display, serif)', fontSize: '1.5rem',
            color: '#fff', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 0.5rem',
          }}>INOVO</h1>
          <p style={{ color: '#555', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
            Admin Dashboard
          </p>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          padding: '2.5rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        }}>
          <h2 style={{
            color: '#fff', fontSize: '1.2rem', fontWeight: 700,
            marginBottom: '0.5rem', letterSpacing: '1px',
          }}>Sign in to continue</h2>
          <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2rem', lineHeight: 1.5 }}>
            Enter your admin credentials to access the dashboard.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="username" style={{
                display: 'block', color: '#888', fontSize: '0.75rem',
                fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.6rem',
              }}>Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                autoComplete="username"
                style={{
                  width: '100%', padding: '0.9rem 1.2rem', boxSizing: 'border-box',
                  backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px', color: '#fff', fontSize: '0.95rem',
                  fontFamily: 'inherit', outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={{
                display: 'block', color: '#888', fontSize: '0.75rem',
                fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.6rem',
              }}>Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                style={{
                  width: '100%', padding: '0.9rem 1.2rem', boxSizing: 'border-box',
                  backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px', color: '#fff', fontSize: '0.95rem',
                  fontFamily: 'inherit', outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
            </div>

            {error && (
              <div style={{
                backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1.25rem',
                color: '#fca5a5', fontSize: '0.85rem',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '1rem',
                backgroundColor: loading ? 'rgba(255,255,255,0.1)' : '#fff',
                color: loading ? '#888' : '#000',
                border: 'none', borderRadius: '12px',
                fontSize: '0.9rem', fontWeight: 700, fontFamily: 'inherit',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#e8e8e8'; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#fff'; }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#333', fontSize: '0.75rem', marginTop: '2rem' }}>
          INOVO Admin Portal — Restricted Access
        </p>
      </div>
    </div>
  );
}
