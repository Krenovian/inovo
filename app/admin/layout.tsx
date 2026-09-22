import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard — INOVO',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#080808', fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
