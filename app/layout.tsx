import type { Metadata } from 'next';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  metadataBase: new URL('https://inovo.co'),
  title: {
    default: 'Best Design Consultancy in Calicut | INOVO Developers',
    template: '%s | INOVO Developers',
  },
  description:
    'INOVO Developers is a leading design consultancy in Calicut offering exterior, interior, landscape, lighting, furniture, and 3D visualization services.',
  keywords: [
    'Best Design Consultancy in Calicut',
    'Design consultancy in Calicut',
    'Design consultants in Calicut',
    'Design company in Calicut',
    'Interior design company in Calicut',
    'Exterior design company in Calicut',
    'Landscape design company in Calicut',
    'INOVO Developers',
    'INOVO',
  ],
  authors: [{ name: 'Bilal M' }, { name: 'Anu Shamil' }],
  creator: 'INOVO',
  publisher: 'INOVO Ecosystem',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    title: 'Best Design Consultancy in Calicut | INOVO Developers',
    description:
      'INOVO Developers is a leading design consultancy in Calicut offering exterior, interior, landscape, lighting, furniture, and 3D visualization services.',
    url: 'https://inovo.co',
    siteName: 'INOVO Developers',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/images/wayanad-pavilion.jpg', width: 1200, height: 675, alt: 'INOVO Developers — Design Consultancy in Calicut' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Design Consultancy in Calicut | INOVO Developers',
    description:
      'INOVO Developers is a leading design consultancy in Calicut offering exterior, interior, landscape, lighting, furniture, and 3D visualization services.',
    images: ['/images/wayanad-pavilion.jpg'],
  },
  alternates: { canonical: 'https://inovo.co' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'INOVO Developers',
    legalName: 'INOVO Design Consultancy',
    foundingDate: '2016',
    url: 'https://inovo.co',
    description:
      'INOVO Developers is a leading design consultancy in Calicut offering exterior, interior, landscape, lighting, furniture, and 3D visualization services.',
    founders: [
      { '@type': 'Person', name: 'Bilal M', jobTitle: 'Co-Founder & Managing Partner' },
      { '@type': 'Person', name: 'Anu Shamil', jobTitle: 'Co-Founder & Managing Partner' },
    ],
    address: { '@type': 'PostalAddress', addressLocality: 'Calicut', addressRegion: 'Kerala', addressCountry: 'IN' },
    areaServed: ['Calicut', 'Kannur', 'Wayanad', 'Malappuram', 'Kochi'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Primary Design Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landscape Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '3D Visualization' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lighting Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Furniture Design' } },
      ],
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'The INOVO Ecosystem',
      subOrganization: [
        { '@type': 'Organization', name: 'INOVO Developers' },
        { '@type': 'Organization', name: 'Upward' },
        { '@type': 'Organization', name: 'Scale' },
        { '@type': 'Organization', name: 'INOVO Properties' },
      ],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body suppressHydrationWarning>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
