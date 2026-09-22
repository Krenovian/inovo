'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  currentImage: string;
  onUpload: (url: string) => void;
  label?: string;
  aspectRatio?: string; // e.g. '16/9', '1/1', '3/4'
  height?: number;
}

export default function ImageUploader({
  currentImage,
  onUpload,
  label = 'Image',
  aspectRatio = '16/9',
  height = 200,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string>(currentImage);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    setError('');
    setUploading(true);

    // Client-side preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Upload failed');
        setPreview(currentImage);
        return;
      }

      onUpload(data.url);
    } catch {
      setError('Network error during upload');
      setPreview(currentImage);
    } finally {
      setUploading(false);
    }
  }, [currentImage, onUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{
          display: 'block', color: '#888', fontSize: '0.72rem',
          fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.6rem',
        }}>{label}</label>
      )}

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          position: 'relative', height: `${height}px`, width: '100%',
          borderRadius: '12px', overflow: 'hidden',
          border: `2px dashed ${dragOver ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}`,
          backgroundColor: dragOver ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
          cursor: uploading ? 'wait' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            fill
            style={{ objectFit: 'cover', opacity: uploading ? 0.4 : 1, transition: 'opacity 0.2s' }}
            unoptimized={preview.startsWith('data:')}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '0.75rem', color: '#444',
          }}>
            <ImageIcon size={32} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>No image</span>
          </div>
        )}

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '1rem',
          opacity: dragOver ? 1 : 0,
          transition: 'opacity 0.2s',
        }}>
        </div>

        {/* Upload button overlay always visible at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0.75rem', display: 'flex', gap: '0.5rem', justifyContent: 'center',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        }}>
          {uploading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.8rem' }}>
              <Loader2 size={16} className="spin" />
              <span>Uploading...</span>
            </div>
          ) : (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px',
              padding: '0.5rem 1rem', color: '#fff', fontSize: '0.78rem', fontWeight: 600,
            }}>
              <Upload size={14} />
              <span>{preview ? 'Change Image' : 'Upload Image'}</span>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {error && (
        <p style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '0.5rem' }}>{error}</p>
      )}

      {preview && !preview.startsWith('data:') && (
        <p style={{ color: '#555', fontSize: '0.72rem', marginTop: '0.4rem', wordBreak: 'break-all' }}>
          {preview}
        </p>
      )}

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
