import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the founding partners of INOVO Developers — Bilal M and Anu Shamil, Co-Founders & Managing Partners.',
  alternates: { canonical: 'https://inovo.co/team' },
  openGraph: {
    title: 'Team | INOVO Developers',
    description: 'The founding partners behind INOVO Developers.',
    url: 'https://inovo.co/team',
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
