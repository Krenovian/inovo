import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Our Projects | Best Design Consultancy in Calicut | INOVO Developers',
  },
  description:
    'Explore INOVO Developers’ residential and commercial design projects in Calicut, featuring exterior, interior, landscape, lighting, furniture, and 3D visualization.',
  keywords: [
    'Design Projects in Calicut',
    'Best design consultancy in Calicut',
    'Design projects in Calicut',
    'Interior design projects in Calicut',
    'Exterior design projects in Calicut',
    'Residential design projects in Calicut',
    'Commercial design projects in Calicut',
    'Design consultants in Calicut',
    'Design projects in Kozhikode',
    'INOVO Developers',
  ],
  alternates: { canonical: 'https://inovo.co/our-projects' },
  openGraph: {
    title: 'Our Projects | Best Design Consultancy in Calicut | INOVO Developers',
    description:
      'Explore INOVO Developers’ residential and commercial design projects in Calicut, featuring exterior, interior, landscape, lighting, furniture, and 3D visualization.',
    url: 'https://inovo.co/our-projects',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects | Best Design Consultancy in Calicut | INOVO Developers',
    description:
      'Explore INOVO Developers’ residential and commercial design projects in Calicut.',
  },
};

export default function OurProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
