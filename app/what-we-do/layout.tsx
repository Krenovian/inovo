import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'INOVO Developers offers integrated exterior, interior, landscape, 3D visualization, lighting, furniture, and construction solutions in Calicut.',
  alternates: { canonical: 'https://inovo.co/what-we-do' },
  openGraph: {
    title: 'What We Do | INOVO Developers',
    description:
      'Integrated design and development solutions for residential and commercial projects in Calicut.',
    url: 'https://inovo.co/what-we-do',
  },
};

export default function WhatWeDoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
