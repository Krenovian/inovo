import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'About INOVO Developers | Design Consultancy in Calicut',
  },
  description:
    'Learn about INOVO Developers, a design consultancy in Calicut delivering integrated exterior, interior, landscape, visualization, and development solutions.',
  keywords: [
    'Design Consultancy in Calicut',
    'Best design consultancy in Calicut',
    'Interior design services in Calicut',
    'Exterior design services in Calicut',
    'Landscape design services in Calicut',
    '3D visualization services in Calicut',
    'Lighting design services in Calicut',
    'Construction and development solutions in Calicut',
    'INOVO Developers',
  ],
  alternates: { canonical: 'https://inovo.co/about-inovo-developers' },
  openGraph: {
    title: 'About INOVO Developers | Design Consultancy in Calicut',
    description:
      'Learn about INOVO Developers, a design consultancy in Calicut delivering integrated exterior, interior, landscape, visualization, and development solutions.',
    url: 'https://inovo.co/about-inovo-developers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About INOVO Developers | Design Consultancy in Calicut',
    description:
      'Learn about INOVO Developers, a design consultancy in Calicut delivering integrated exterior, interior, landscape, visualization, and development solutions.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
