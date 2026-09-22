'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, Image as ImageIcon, FolderOpen, Users, Briefcase,
  MessageSquare, Settings, LogOut, Plus, Trash2, Save, ChevronDown, ChevronUp,
  GripVertical, Edit3, Eye, Globe, Check, X, AlertCircle, Loader2,
} from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

// ── Types (client-side mirror of Prisma models) ────────────────────────────

interface HeroSlide { id: string; title: string; location: string; image: string; order: number; }
interface GalleryItem { title: string; stage: string; image: string; caption: string; }
interface Project {
  id: string; slug: string; title: string; location: string; category: string;
  year: string; status: string; area: string; heroImage: string; overview: string;
  scope: string[]; gallery: GalleryItem[]; order: number;
}
interface TeamMember { id: string; name: string; role: string; quote: string; image: string; order: number; }
interface Service { id: string; slug: string; title: string; number: string; shortDesc: string; deliverables: string[]; image: string; order: number; }
interface Testimonial { id: string; name: string; role: string; photo: string; videoUrl: string; order: number; }
interface AboutSection {
  id: string; headlinePart1: string; headlinePart2: string; body: string;
  stat1Value: string; stat1Label: string; stat2Value: string; stat2Label: string;
  shard1Image: string; shard2Image: string;
}
interface SiteSettings { logo?: string; tagline?: string; availabilityStatus?: string; availabilityNote?: string; enquireText?: string; heroWord1?: string; heroWord2?: string; heroManifesto?: string; heroSubtext?: string; heroHeadings?: string; whatsappNumber?: string; }

type TabId = 'overview' | 'hero' | 'projects' | 'about' | 'team' | 'services' | 'testimonials' | 'settings';

const NAV_ITEMS: { id: TabId; label: string; icon: React.FC<{ size?: number }> }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'hero', label: 'Hero Slides', icon: ImageIcon },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'about', label: 'About', icon: Globe },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'settings', label: 'Site Settings', icon: Settings },
];

// ── Utility ────────────────────────────────────────────────────────────────

function cuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ── Toast ──────────────────────────────────────────────────────────────────

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      backgroundColor: type === 'success' ? '#052e16' : '#2d0a0a',
      border: `1px solid ${type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
      borderRadius: '14px', padding: '1rem 1.25rem',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      color: type === 'success' ? '#86efac' : '#fca5a5',
      fontSize: '0.88rem', fontWeight: 600,
      animation: 'slideUp 0.3s ease',
    }}>
      {type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, marginLeft: '0.5rem' }}>
        <X size={14} />
      </button>
      <style jsx>{`@keyframes slideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }`}</style>
    </div>
  );
}

// ── Shared Styles ─────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  padding: '0.75rem 1rem',
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', color: '#fff',
  fontSize: '0.9rem', fontFamily: 'inherit',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block', color: '#666', fontSize: '0.7rem',
  fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
  marginBottom: '0.5rem',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '20px', padding: '1.75rem',
  marginBottom: '1.25rem',
};

const saveBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
  backgroundColor: '#fff', color: '#000',
  border: 'none', borderRadius: '10px',
  padding: '0.75rem 1.5rem', fontSize: '0.82rem',
  fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
  cursor: 'pointer', fontFamily: 'inherit',
  transition: 'all 0.2s ease',
};

const deleteBtnStyle: React.CSSProperties = {
  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
  color: '#f87171', borderRadius: '8px', padding: '0.5rem 0.75rem',
  cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'inherit',
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  transition: 'all 0.2s ease',
};

const addBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
  backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff', borderRadius: '10px', padding: '0.65rem 1.25rem',
  fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
  fontFamily: 'inherit', transition: 'all 0.2s ease',
};

const stickyFooterStyle: React.CSSProperties = {
  position: 'sticky', bottom: '-2.5rem',
  backgroundColor: 'rgba(12,12,12,0.95)', backdropFilter: 'blur(20px)',
  borderTop: '1px solid rgba(255,255,255,0.1)',
  padding: '1.25rem 2.5rem', zIndex: 100,
  display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap',
  margin: '2rem -2.5rem 0',
};

// ── Field Components ────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, multiline = false }: {
  value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  const props = {
    value, placeholder,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    style: { ...inputStyle, ...(multiline ? { minHeight: '100px', resize: 'vertical' as const } : {}) },
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => e.target.style.borderColor = 'rgba(255,255,255,0.35)',
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => e.target.style.borderColor = 'rgba(255,255,255,0.1)',
  };
  return multiline ? <textarea {...props} /> : <input {...props} />;
}

function SelectInput({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...inputStyle, cursor: 'pointer' }}
    >
      {options.map(o => <option key={o} value={o} style={{ backgroundColor: '#111' }}>{o}</option>)}
    </select>
  );
}

// ── Section Wrapper ─────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.4rem' }}>{title}</h2>
      <p style={{ color: '#555', fontSize: '0.88rem', margin: 0 }}>{description}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ── TAB: OVERVIEW ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

function OverviewTab({ data }: { data: AdminData }) {
  return (
    <div>
      <SectionHeader title="Dashboard Overview" description="Quick summary of your INOVO website content." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Hero Slides', count: data.heroSlides.length, icon: '🖼️' },
          { label: 'Projects', count: data.projects.length, icon: '🏛️' },
          { label: 'Team Members', count: data.teamMembers.length, icon: '👥' },
          { label: 'Services', count: data.services.length, icon: '⚙️' },
          { label: 'Testimonials', count: data.testimonials.length, icon: '💬' },
        ].map(item => (
          <div key={item.label} style={cardStyle}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
            <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>{item.count}</div>
            <div style={{ color: '#555', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.3rem' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div style={cardStyle}>
        <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '0.75rem', fontSize: '1rem' }}>Quick Links</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href="/" target="_blank" rel="noopener" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: '#888', fontSize: '0.82rem', textDecoration: 'none',
            backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', padding: '0.5rem 1rem',
          }}>
            <Eye size={14} /> View Live Site
          </a>
          <a href="/our-projects" target="_blank" rel="noopener" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: '#888', fontSize: '0.82rem', textDecoration: 'none',
            backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', padding: '0.5rem 1rem',
          }}>
            <FolderOpen size={14} /> Projects Page
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ── TAB: HERO SLIDES ───────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

function HeroTab({ slides, onChange, onSave, saving }: {
  slides: HeroSlide[]; onChange: (s: HeroSlide[]) => void;
  onSave: () => void; saving: boolean;
}) {
  const updateSlide = (idx: number, field: keyof HeroSlide, value: string) => {
    const next = slides.map((s, i) => i === idx ? { ...s, [field]: value } : s);
    onChange(next);
  };

  const addSlide = () => {
    onChange([...slides, { id: cuid(), title: 'New Slide', location: 'Location', image: '/images/wayanad-pavilion.jpg', order: slides.length }]);
  };

  const removeSlide = (idx: number) => {
    onChange(slides.filter((_, i) => i !== idx).map((s, i) => ({ ...s, order: i })));
  };

  return (
    <div>
      <SectionHeader title="Hero Slides" description="Manage the full-screen hero slideshow on the homepage. Each slide scrolls into view as the user scrolls down." />
      {slides.map((slide, idx) => (
        <div key={slide.id} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <GripVertical size={16} color="#444" />
              <span style={{ color: '#888', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Slide {idx + 1}
              </span>
            </div>
            <button onClick={() => removeSlide(idx)} style={deleteBtnStyle}>
              <Trash2 size={13} /> Remove
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Field label="Project Title">
              <TextInput value={slide.title} onChange={(v) => updateSlide(idx, 'title', v)} placeholder="e.g. The Mist Pavilion" />
            </Field>
            <Field label="Location">
              <TextInput value={slide.location} onChange={(v) => updateSlide(idx, 'location', v)} placeholder="e.g. Wayanad" />
            </Field>
          </div>
          <ImageUploader
            currentImage={slide.image}
            onUpload={(url) => updateSlide(idx, 'image', url)}
            label="Hero Image"
            aspectRatio="16/9"
            height={220}
          />
        </div>
      ))}
      <div style={stickyFooterStyle}>
        <button onClick={addSlide} style={addBtnStyle}><Plus size={15} /> Add Slide</button>
        <button onClick={onSave} disabled={saving} style={saveBtnStyle}>
          {saving ? <Loader2 size={15} className="spin" /> : <Save size={15} />}
          {saving ? 'Saving…' : 'Save Hero Slides'}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ── TAB: PROJECTS ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

function ProjectCard({ project, onChange, onDelete, onSave }: {
  project: Project; onChange: (p: Project) => void; onDelete: () => void; onSave: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (field: keyof Project, value: unknown) => onChange({ ...project, [field]: value });

  const addGalleryItem = () => {
    const newGallery = [...project.gallery, { title: '', stage: 'Exterior', image: '/images/detail-craft.jpg', caption: '' }];
    update('gallery', newGallery);
  };

  const updateGallery = (idx: number, field: keyof GalleryItem, value: string) => {
    const newGallery = project.gallery.map((g, i) => i === idx ? { ...g, [field]: value } : g);
    update('gallery', newGallery);
  };

  const removeGallery = (idx: number) => {
    update('gallery', project.gallery.filter((_, i) => i !== idx));
  };

  const scopeOptions = ['Design & Planning', 'Interior Design', 'Site Supervision'];
  const toggleScope = (s: string) => {
    const next = project.scope.includes(s) ? project.scope.filter(x => x !== s) : [...project.scope, s];
    update('scope', next);
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave();
    setSaving(false);
  };

  return (
    <div style={cardStyle}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 48, height: 48, borderRadius: '10px', overflow: 'hidden', flexShrink: 0, position: 'relative', backgroundColor: '#222' }}>
            {project.heroImage && <Image src={project.heroImage} alt={project.title} fill style={{ objectFit: 'cover' }} />}
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{project.title || 'Untitled Project'}</div>
            <div style={{ color: '#555', fontSize: '0.78rem', marginTop: '0.2rem' }}>{project.location} · {project.category} · {project.year}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={deleteBtnStyle}>
            <Trash2 size={13} />
          </button>
          {expanded ? <ChevronUp size={18} color="#666" /> : <ChevronDown size={18} color="#666" />}
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Field label="Project Title">
              <TextInput value={project.title} onChange={(v) => update('title', v)} placeholder="e.g. The Mist Pavilion" />
            </Field>
            <Field label="Slug (URL)">
              <TextInput value={project.slug} onChange={(v) => update('slug', v.toLowerCase().replace(/\\s+/g, '-'))} placeholder="e.g. wayanad-mist-pavilion" />
            </Field>
            <Field label="Location">
              <SelectInput value={project.location} onChange={(v) => update('location', v)} options={['Calicut', 'Kannur', 'Wayanad', 'Malappuram', 'Kochi', 'Other active project locations']} />
            </Field>
            <Field label="Category">
              <SelectInput value={project.category} onChange={(v) => update('category', v)} options={['Residential', 'Commercial', 'Hospitality', 'InteriorDesign']} />
            </Field>
            <Field label="Year">
              <TextInput value={project.year} onChange={(v) => update('year', v)} placeholder="e.g. 2024" />
            </Field>
            <Field label="Status">
              <SelectInput value={project.status} onChange={(v) => update('status', v)} options={['Completed', 'InProgress']} />
            </Field>
            <Field label="Area">
              <TextInput value={project.area} onChange={(v) => update('area', v)} placeholder="e.g. 6,400 sq.ft" />
            </Field>
          </div>

          <Field label="Overview">
            <TextInput value={project.overview} onChange={(v) => update('overview', v)} multiline placeholder="Project description..." />
          </Field>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Scope</label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {scopeOptions.map(s => (
                <button
                  key={s}
                  onClick={() => toggleScope(s)}
                  style={{
                    padding: '0.45rem 1rem', borderRadius: '20px', fontSize: '0.78rem',
                    fontFamily: 'inherit', cursor: 'pointer', fontWeight: 600,
                    backgroundColor: project.scope.includes(s) ? '#fff' : 'transparent',
                    color: project.scope.includes(s) ? '#000' : '#666',
                    border: `1px solid ${project.scope.includes(s) ? '#fff' : 'rgba(255,255,255,0.15)'}`,
                    transition: 'all 0.2s ease',
                  }}
                >{s}</button>
              ))}
            </div>
          </div>

          <ImageUploader
            currentImage={project.heroImage}
            onUpload={(url) => update('heroImage', url)}
            label="Hero Image"
            height={240}
          />

          {/* Gallery */}
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <label style={labelStyle}>Gallery ({project.gallery.length} images)</label>
              <button onClick={addGalleryItem} style={addBtnStyle}><Plus size={13} /> Add Image</button>
            </div>
            {project.gallery.map((item, gi) => (
              <div key={gi} style={{
                backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px', padding: '1rem', marginBottom: '0.75rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#666', fontSize: '0.78rem', fontWeight: 600 }}>Gallery Image {gi + 1}</span>
                  <button onClick={() => removeGallery(gi)} style={{ ...deleteBtnStyle, padding: '0.3rem 0.5rem' }}>
                    <Trash2 size={12} />
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <Field label="Title"><TextInput value={item.title} onChange={(v) => updateGallery(gi, 'title', v)} /></Field>
                  <Field label="Stage">
                    <SelectInput value={item.stage} onChange={(v) => updateGallery(gi, 'stage', v)}
                      options={['Exterior', 'Interior', 'Details', 'Landscape', 'Completed Work']} />
                  </Field>
                </div>
                <Field label="Caption"><TextInput value={item.caption} onChange={(v) => updateGallery(gi, 'caption', v)} /></Field>
                <ImageUploader
                  currentImage={item.image}
                  onUpload={(url) => updateGallery(gi, 'image', url)}
                  label="Gallery Image"
                  height={180}
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
            <button onClick={handleSave} disabled={saving} style={{ ...saveBtnStyle, backgroundColor: '#22c55e', color: '#fff' }}>
              {saving ? <Loader2 size={15} className="spin" /> : <Save size={15} />}
              {saving ? 'Saving...' : 'Save This Project'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchProjects = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects?page=${p}&limit=10`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setPage(data.page);
      }
    } catch (e) {
      console.error(e);
      setToast({ message: 'Failed to load projects', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects(page);
  }, [page, fetchProjects]);

  const updateProject = (idx: number, p: Project) => setProjects(projects.map((x, i) => i === idx ? p : x));
  
  const addProject = () => {
    setProjects([{
      id: cuid(), slug: `project-${Date.now()}`, title: 'New Project', location: 'Calicut',
      category: 'Residential', year: new Date().getFullYear().toString(), status: 'InProgress',
      area: '', heroImage: '/images/wayanad-pavilion.jpg', overview: '',
      scope: ['Design & Planning'], gallery: [], order: projects.length,
    }, ...projects]);
  };

  const saveProject = async (p: Project) => {
    setToast(null);
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: p }),
      });
      if (res.ok) {
        setToast({ message: 'Project saved successfully!', type: 'success' });
      } else {
        throw new Error();
      }
    } catch {
      setToast({ message: 'Failed to save project.', type: 'error' });
    }
  };

  const deleteProject = async (id: string, idx: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      // If it's a new unsaved project (ID likely starts with cuid structure, but safe to just attempt delete and remove locally)
      const res = await fetch('/api/admin/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      if (res.ok) {
        setProjects(projects.filter((_, i) => i !== idx));
        setToast({ message: 'Project deleted!', type: 'success' });
      } else {
        setToast({ message: 'Failed to delete project.', type: 'error' });
      }
    } catch {
      setToast({ message: 'Failed to delete project.', type: 'error' });
    }
  };

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  if (loading && projects.length === 0) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><Loader2 size={24} className="spin" color="#555" /></div>;
  }

  return (
    <div>
      <SectionHeader title="Projects" description="Manage all portfolio projects. Expand a project to edit its details and save." />
      
      {toast && (
        <div style={{ padding: '0.75rem 1rem', marginBottom: '1.25rem', borderRadius: '10px', backgroundColor: toast.type === 'success' ? '#052e16' : '#2d0a0a', color: toast.type === 'success' ? '#86efac' : '#fca5a5', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {toast.message}
        </div>
      )}

      {projects.map((p, idx) => (
        <ProjectCard
          key={p.id} project={p}
          onChange={(updated) => updateProject(idx, updated)}
          onDelete={() => deleteProject(p.id, idx)}
          onSave={() => saveProject(p)}
        />
      ))}

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={{ ...addBtnStyle, opacity: page <= 1 ? 0.5 : 1 }}>Prev</button>
          <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>Page {page} of {totalPages} (Total: {total})</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} style={{ ...addBtnStyle, opacity: page >= totalPages ? 0.5 : 1 }}>Next</button>
        </div>
      )}

      <div style={stickyFooterStyle}>
        <button onClick={addProject} style={addBtnStyle}><Plus size={15} /> Add New Project</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ── TAB: ABOUT ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

function AboutTab({ about, onChange, onSave, saving }: {
  about: AboutSection; onChange: (a: AboutSection) => void;
  onSave: () => void; saving: boolean;
}) {
  const update = (field: keyof AboutSection, value: string) => onChange({ ...about, [field]: value });

  return (
    <div>
      <SectionHeader title="About Section" description='Manage the "Built on Precision" section with philosophy text, stats, and background images.' />
      <div style={cardStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Headline Part 1 (e.g. 'Built on')">
            <TextInput value={about.headlinePart1} onChange={(v) => update('headlinePart1', v)} />
          </Field>
          <Field label="Headline Part 2 (e.g. 'Precision.')">
            <TextInput value={about.headlinePart2} onChange={(v) => update('headlinePart2', v)} />
          </Field>
        </div>
        <Field label="Body Text">
          <TextInput value={about.body} onChange={(v) => update('body', v)} multiline />
        </Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
          <Field label="Stat 1 Value"><TextInput value={about.stat1Value} onChange={(v) => update('stat1Value', v)} placeholder="120+" /></Field>
          <Field label="Stat 1 Label"><TextInput value={about.stat1Label} onChange={(v) => update('stat1Label', v)} placeholder="Environments" /></Field>
          <Field label="Stat 2 Value"><TextInput value={about.stat2Value} onChange={(v) => update('stat2Value', v)} placeholder="04" /></Field>
          <Field label="Stat 2 Label"><TextInput value={about.stat2Label} onChange={(v) => update('stat2Label', v)} placeholder="Pillars" /></Field>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={cardStyle}>
          <ImageUploader currentImage={about.shard1Image} onUpload={(url) => update('shard1Image', url)} label="Background Shard 1 (top-left)" height={200} />
        </div>
        <div style={cardStyle}>
          <ImageUploader currentImage={about.shard2Image} onUpload={(url) => update('shard2Image', url)} label="Background Shard 2 (bottom-right)" height={200} />
        </div>
      </div>
      <div style={stickyFooterStyle}>
        <button onClick={onSave} disabled={saving} style={saveBtnStyle}>
          {saving ? <Loader2 size={15} className="spin" /> : <Save size={15} />}
          {saving ? 'Saving…' : 'Save About Section'}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ── TAB: TEAM ──────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

function TeamTab() {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/team?page=${p}&limit=10`);
      if (res.ok) {
        const json = await res.json();
        setData(json.teamMembers);
        setTotalPages(json.totalPages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  const update = (idx: number, field: keyof TeamMember, value: string) => {
    setData((prev) => prev.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };

  const handleSave = async (item: TeamMember) => {
    setSavingId(item.id);
    try {
      const res = await fetch('/api/admin/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamMember: item }),
      });
      if (res.ok) {
        const json = await res.json();
        setData(prev => prev.map(m => m.id === json.teamMember.id ? json.teamMember : m));
      } else {
        alert('Failed to save team member');
      }
    } catch (error) {
      alert('Error saving team member');
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      const res = await fetch('/api/admin/team', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchData(page);
      }
    } catch (error) {
      alert('Error deleting team member');
    }
  };

  const addMember = () => {
    const newItem: TeamMember = {
      id: cuid(), name: 'New Member', role: 'Role', quote: '', image: '/images/founder-bilal.jpg', order: 0
    };
    setData([newItem, ...data]);
    setExpandedId(newItem.id);
  };

  return (
    <div>
      <SectionHeader title="Team Members" description="Manage founding partners and team portraits shown on the homepage." />
      
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading Team Members...</div>
      ) : (
        <>
          {data.map((m, idx) => {
            const isExpanded = expandedId === m.id;
            return (
              <div key={m.id} style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : m.id)}
                  style={{
                    width: '100%', padding: '1.25rem', background: 'transparent',
                    border: 'none', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', cursor: 'pointer', color: '#fff',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', background: '#333',
                      backgroundImage: `url(${m.image})`, backgroundSize: 'cover', backgroundPosition: 'top center'
                    }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{m.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{m.role}</div>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isExpanded && (
                  <div style={{ padding: '1.25rem', borderTop: '1px solid #333' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <Field label="Name"><TextInput value={m.name} onChange={(v) => update(idx, 'name', v)} /></Field>
                      <Field label="Role"><TextInput value={m.role} onChange={(v) => update(idx, 'role', v)} /></Field>
                    </div>
                    <Field label="Quote / Bio">
                      <TextInput value={m.quote} onChange={(v) => update(idx, 'quote', v)} multiline />
                    </Field>
                    <ImageUploader
                      currentImage={m.image}
                      onUpload={(url) => update(idx, 'image', url)}
                      label="Portrait Photo"
                      height={280}
                      aspectRatio="3/4"
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                      <button onClick={() => handleDelete(m.id)} style={{ ...deleteBtnStyle, padding: '0.6rem 1rem' }}>
                        <Trash2 size={14} /> Delete
                      </button>
                      <button onClick={() => handleSave(m)} disabled={savingId === m.id} style={{ ...saveBtnStyle, position: 'static' }}>
                        {savingId === m.id ? <Loader2 size={14} className="spin" /> : <Save size={14} />}
                        Save Member
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
              <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} style={addBtnStyle}>
                Prev
              </button>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} style={addBtnStyle}>
                Next
              </button>
            </div>
          )}
        </>
      )}

      <div style={stickyFooterStyle}>
        <button onClick={addMember} style={addBtnStyle}><Plus size={15} /> Add Member</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ── TAB: SERVICES ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

function ServicesTab({ services, onChange, onSave, saving }: {
  services: Service[]; onChange: (s: Service[]) => void;
  onSave: () => void; saving: boolean;
}) {
  const update = (idx: number, field: keyof Service, value: unknown) => {
    onChange(services.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const updateDeliverable = (sIdx: number, dIdx: number, value: string) => {
    const next = services[sIdx].deliverables.map((d, i) => i === dIdx ? value : d);
    update(sIdx, 'deliverables', next);
  };

  const addDeliverable = (sIdx: number) => update(sIdx, 'deliverables', [...services[sIdx].deliverables, 'New deliverable']);
  const removeDeliverable = (sIdx: number, dIdx: number) => update(sIdx, 'deliverables', services[sIdx].deliverables.filter((_, i) => i !== dIdx));

  const addService = () => onChange([...services, {
    id: cuid(), slug: `service-${Date.now()}`, title: 'New Service', number: String(services.length + 1).padStart(2, '0'),
    shortDesc: '', deliverables: [], image: '/images/model.jpg', order: services.length,
  }]);

  const remove = (idx: number) => onChange(services.filter((_, i) => i !== idx));

  return (
    <div>
      <SectionHeader title="Services" description='Manage the "What We Do" scroll section with service details and background images.' />
      {services.map((s, idx) => (
        <div key={s.id} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ color: '#888', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {s.number} — {s.title}
            </span>
            <button onClick={() => remove(idx)} style={deleteBtnStyle}><Trash2 size={13} /> Remove</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '1rem' }}>
            <Field label="Number"><TextInput value={s.number} onChange={(v) => update(idx, 'number', v)} placeholder="01" /></Field>
            <Field label="Title"><TextInput value={s.title} onChange={(v) => update(idx, 'title', v)} /></Field>
            <Field label="Slug"><TextInput value={s.slug} onChange={(v) => update(idx, 'slug', v)} /></Field>
          </div>
          <Field label="Short Description">
            <TextInput value={s.shortDesc} onChange={(v) => update(idx, 'shortDesc', v)} multiline />
          </Field>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={labelStyle}>Deliverables</label>
              <button onClick={() => addDeliverable(idx)} style={{ ...addBtnStyle, fontSize: '0.72rem', padding: '0.35rem 0.75rem' }}>
                <Plus size={12} /> Add
              </button>
            </div>
            {s.deliverables.map((d, di) => (
              <div key={di} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  value={d}
                  onChange={(e) => updateDeliverable(idx, di, e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button onClick={() => removeDeliverable(idx, di)} style={{ ...deleteBtnStyle, padding: '0.5rem' }}>
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <ImageUploader
            currentImage={s.image}
            onUpload={(url) => update(idx, 'image', url)}
            label="Background Image"
            height={220}
          />
        </div>
      ))}
      <div style={stickyFooterStyle}>
        <button onClick={addService} style={addBtnStyle}><Plus size={15} /> Add Service</button>
        <button onClick={onSave} disabled={saving} style={saveBtnStyle}>
          {saving ? <Loader2 size={15} className="spin" /> : <Save size={15} />}
          {saving ? 'Saving…' : 'Save Services'}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ── TAB: TESTIMONIALS ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

function TestimonialsTab() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/testimonials?page=${p}&limit=10`);
      if (res.ok) {
        const json = await res.json();
        setData(json.testimonials);
        setTotalPages(json.totalPages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  const update = (idx: number, field: keyof Testimonial, value: string) => {
    setData((prev) => prev.map((t, i) => i === idx ? { ...t, [field]: value } : t));
  };

  const handleSave = async (item: Testimonial) => {
    setSavingId(item.id);
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testimonial: item }),
      });
      if (res.ok) {
        const json = await res.json();
        setData(prev => prev.map(t => t.id === json.testimonial.id ? json.testimonial : t));
      } else {
        alert('Failed to save testimonial');
      }
    } catch (error) {
      alert('Error saving testimonial');
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchData(page);
      }
    } catch (error) {
      alert('Error deleting testimonial');
    }
  };

  const add = () => {
    const newItem: Testimonial = {
      id: cuid(), name: 'New Client', role: 'Role, Location',
      photo: '/images/calicut-courtyard.jpg', videoUrl: '', order: 0,
    };
    setData([newItem, ...data]);
    setExpandedId(newItem.id);
  };

  return (
    <div>
      <SectionHeader title="Testimonials" description="Manage client testimonials shown in the horizontal scroll section." />
      
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Loading Testimonials...</div>
      ) : (
        <>
          {data.map((t, idx) => {
            const isExpanded = expandedId === t.id;
            return (
              <div key={t.id} style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : t.id)}
                  style={{
                    width: '100%', padding: '1.25rem', background: 'transparent',
                    border: 'none', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', cursor: 'pointer', color: '#fff',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', background: '#333',
                      backgroundImage: `url(${t.photo})`, backgroundSize: 'cover', backgroundPosition: 'center'
                    }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{t.role}</div>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isExpanded && (
                  <div style={{ padding: '1.25rem', borderTop: '1px solid #333' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <Field label="Name"><TextInput value={t.name} onChange={(v) => update(idx, 'name', v)} /></Field>
                      <Field label="Role / Location"><TextInput value={t.role} onChange={(v) => update(idx, 'role', v)} placeholder="Homeowner, Calicut" /></Field>
                    </div>
                    <Field label="YouTube Video URL (embed format)">
                      <TextInput value={t.videoUrl} onChange={(v) => update(idx, 'videoUrl', v)} placeholder="https://www.youtube.com/embed/..." />
                    </Field>
                    <ImageUploader
                      currentImage={t.photo}
                      onUpload={(url) => update(idx, 'photo', url)}
                      label="Profile / Thumbnail Photo"
                      height={200}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                      <button onClick={() => handleDelete(t.id)} style={{ ...deleteBtnStyle, padding: '0.6rem 1rem' }}>
                        <Trash2 size={14} /> Delete
                      </button>
                      <button onClick={() => handleSave(t)} disabled={savingId === t.id} style={{ ...saveBtnStyle, position: 'static' }}>
                        {savingId === t.id ? <Loader2 size={14} className="spin" /> : <Save size={14} />}
                        Save Testimonial
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
              <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} style={addBtnStyle}>
                Prev
              </button>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} style={addBtnStyle}>
                Next
              </button>
            </div>
          )}
        </>
      )}

      <div style={stickyFooterStyle}>
        <button onClick={add} style={addBtnStyle}><Plus size={15} /> Add Testimonial</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ── TAB: SETTINGS ──────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

function SettingsTab({ settings, onChange, onSave, saving }: {
  settings: SiteSettings; onChange: (s: SiteSettings) => void;
  onSave: () => void; saving: boolean;
}) {
  const update = (key: keyof SiteSettings, value: string) => onChange({ ...settings, [key]: value });

  return (
    <div>
      <SectionHeader title="Site Settings" description="Manage global site settings including logo, availability status, and branding text." />
      <div style={cardStyle}>
        <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '1.5rem', fontSize: '1rem' }}>Logo</h3>
        <ImageUploader
          currentImage={settings.logo || '/images/logo.png'}
          onUpload={(url) => update('logo', url)}
          label="Site Logo (PNG recommended)"
          height={160}
          aspectRatio="1/1"
        />
      </div>
      <div style={cardStyle}>
        <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '1.5rem', fontSize: '1rem' }}>Hero Status Card</h3>
        <Field label="Availability Status (shown in hero card)">
          <TextInput value={settings.availabilityStatus || ''} onChange={(v) => update('availabilityStatus', v)} placeholder="Accepting New Projects" />
        </Field>
        <Field label="Availability Note">
          <TextInput value={settings.availabilityNote || ''} onChange={(v) => update('availabilityNote', v)} placeholder="For Q4 2026 onwards." />
        </Field>
        <Field label="Enquire CTA Text">
          <TextInput value={settings.enquireText || ''} onChange={(v) => update('enquireText', v)} placeholder="Enquire Now" />
        </Field>
      </div>
      <div style={cardStyle}>
        <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '1.5rem', fontSize: '1rem' }}>Branding & Contact</h3>
        <Field label="Site Tagline">
          <TextInput value={settings.tagline || ''} onChange={(v) => update('tagline', v)} placeholder="Spaces shaped with intention." />
        </Field>
        <Field label="WhatsApp Number (include country code, e.g. +91...)">
          <TextInput value={settings.whatsappNumber || ''} onChange={(v) => update('whatsappNumber', v)} placeholder="+919876543210" />
        </Field>
      </div>
      <div style={cardStyle}>
        <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '1.5rem', fontSize: '1rem' }}>Hero Texts</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Typewriter Word 1 (e.g. Purpose)">
            <TextInput value={settings.heroWord1 || ''} onChange={(v) => update('heroWord1', v)} />
          </Field>
          <Field label="Typewriter Word 2 (e.g. Legacy)">
            <TextInput value={settings.heroWord2 || ''} onChange={(v) => update('heroWord2', v)} />
          </Field>
        </div>
        <Field label="Hero Subtext (under dynamic headings)">
          <TextInput value={settings.heroSubtext || ''} onChange={(v) => update('heroSubtext', v)} multiline />
        </Field>
        <Field label="Mobile Manifesto Note">
          <TextInput value={settings.heroManifesto || ''} onChange={(v) => update('heroManifesto', v)} />
        </Field>
        <Field label="Dynamic Scramble Headings (Comma separated)">
          <TextInput value={settings.heroHeadings || ''} onChange={(v) => update('heroHeadings', v)} placeholder="Context & Execution, Light & Shadow, Form & Void" />
        </Field>
      </div>
      <div style={stickyFooterStyle}>
        <button onClick={onSave} disabled={saving} style={saveBtnStyle}>
          {saving ? <Loader2 size={15} className="spin" /> : <Save size={15} />}
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ── MAIN ADMIN PAGE ────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

interface AdminData {
  heroSlides: HeroSlide[];
  projects: Project[];
  teamMembers: TeamMember[];
  services: Service[];
  testimonials: Testimonial[];
  about: AboutSection;
  settings: SiteSettings;
}

const DEFAULT_ABOUT: AboutSection = {
  id: 'about-main',
  headlinePart1: 'Built on',
  headlinePart2: 'Precision.',
  body: 'What began as a focused design studio has grown into a multidisciplinary consultancy known for raw aesthetic clarity, uncompromised detailing, and the relentless pursuit of perfection.',
  stat1Value: '120+',
  stat1Label: 'Environments',
  stat2Value: '04',
  stat2Label: 'Pillars',
  shard1Image: '/images/calicut-courtyard.jpg',
  shard2Image: '/images/detail-craft.jpg',
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [data, setData] = useState<AdminData>({
    heroSlides: [],
    projects: [],
    teamMembers: [],
    services: [],
    testimonials: [],
    about: DEFAULT_ABOUT,
    settings: {},
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  }, []);

  // ── Load data ──────────────────────────────────────────────────────────

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/content');
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        if (!res.ok) throw new Error('Failed to load');
        const json = await res.json();
        setData({
          heroSlides: json.heroSlides || [],
          projects: json.projects || [],
          teamMembers: json.teamMembers || [],
          services: json.services || [],
          testimonials: json.testimonials || [],
          about: json.about || DEFAULT_ABOUT,
          settings: {
            logo: json.settings?.logo,
            tagline: json.settings?.tagline,
            availabilityStatus: json.settings?.availabilityStatus,
            availabilityNote: json.settings?.availabilityNote,
            enquireText: json.settings?.enquireText,
            heroWord1: json.settings?.heroWord1,
            heroWord2: json.settings?.heroWord2,
            heroManifesto: json.settings?.heroManifesto,
            heroSubtext: json.settings?.heroSubtext,
            heroHeadings: json.settings?.heroHeadings,
          },
        });
      } catch {
        showToast('Failed to load content. Check your DB connection.', 'error');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router, showToast]);

  // ── Save handlers ──────────────────────────────────────────────────────

  const save = useCallback(async (endpoint: string, payload: unknown, label: string) => {
    setSaving(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      showToast(`${label} saved successfully!`);
    } catch {
      showToast(`Failed to save ${label}. Please try again.`, 'error');
    } finally {
      setSaving(false);
    }
  }, [showToast]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <Loader2 size={36} color="#555" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#555', fontSize: '0.88rem' }}>Loading dashboard…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const SIDEBAR_W = 260;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#080808', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: SIDEBAR_W, flexShrink: 0,
        backgroundColor: '#0c0c0c',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', overflow: 'hidden', flexShrink: 0, position: 'relative', backgroundColor: '#1a1a1a' }}>
            <Image src={data.settings.logo || '/images/logo.png'} alt="INOVO" fill style={{ objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '2px' }}>INOVO</div>
            <div style={{ color: '#444', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
          {NAV_ITEMS.map(item => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  width: '100%', padding: '0.7rem 0.9rem',
                  backgroundColor: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: active ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                  borderRadius: '10px', color: active ? '#fff' : '#555',
                  fontSize: '0.85rem', fontWeight: active ? 700 : 500,
                  cursor: 'pointer', fontFamily: 'inherit',
                  textAlign: 'left', marginBottom: '0.2rem',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#aaa'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#555'; }}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.65rem 0.9rem', borderRadius: '10px',
              color: '#555', fontSize: '0.82rem', textDecoration: 'none',
              marginBottom: '0.25rem', transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#aaa'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
          >
            <Eye size={15} /> View Live Site
          </a>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              width: '100%', padding: '0.65rem 0.9rem', borderRadius: '10px',
              color: '#555', fontSize: '0.82rem', cursor: 'pointer',
              background: 'none', border: 'none', fontFamily: 'inherit',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#f87171'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, minWidth: 0, padding: '2.5rem', overflowY: 'auto', maxHeight: '100vh' }}>

        {/* Page header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: '#444', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.3rem' }}>
              INOVO Admin
            </div>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
              {NAV_ITEMS.find(n => n.id === activeTab)?.label}
            </h1>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: '20px', padding: '0.45rem 1rem',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} />
            <span style={{ color: '#86efac', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px' }}>LIVE</span>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && <OverviewTab data={data} />}

        {activeTab === 'hero' && (
          <HeroTab
            slides={data.heroSlides}
            onChange={(slides) => setData(d => ({ ...d, heroSlides: slides }))}
            onSave={() => save('/api/admin/hero-slides', { slides: data.heroSlides }, 'Hero Slides')}
            saving={saving}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsTab />
        )}

        {activeTab === 'about' && (
          <AboutTab
            about={data.about}
            onChange={(about) => setData(d => ({ ...d, about }))}
            onSave={() => save('/api/admin/about', { about: data.about }, 'About Section')}
            saving={saving}
          />
        )}

        {activeTab === 'team' && (
          <TeamTab />
        )}

        {activeTab === 'services' && (
          <ServicesTab
            services={data.services}
            onChange={(services) => setData(d => ({ ...d, services }))}
            onSave={() => save('/api/admin/services', { services: data.services }, 'Services')}
            saving={saving}
          />
        )}

        {activeTab === 'testimonials' && (
          <TestimonialsTab />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            settings={data.settings}
            onChange={(settings) => setData(d => ({ ...d, settings }))}
            onSave={() => save('/api/admin/settings', { settings: data.settings }, 'Site Settings')}
            saving={saving}
          />
        )}
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: #444; }
        select option { background: #1a1a1a; color: #fff; }
      `}</style>
    </div>
  );
}
