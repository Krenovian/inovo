import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Contact INOVO Developers | Design Consultancy in Calicut',
  },
  description:
    'Get in touch with INOVO Developers in Calicut for exterior, interior, landscape, visualization, and development projects. Let’s create something exceptional together.',
  keywords: [
    'Contact INOVO Developers',
    'Design consultancy Calicut contact',
    'Interior design Calicut',
    'Exterior design Calicut',
    'Landscape design Calicut',
  ],
  alternates: { canonical: 'https://inovo.co/contact' },
  openGraph: {
    title: 'Contact INOVO Developers | Design Consultancy in Calicut',
    description:
      'Have a project in mind? Contact INOVO Developers to discuss residential and commercial design solutions in Calicut.',
    url: 'https://inovo.co/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
