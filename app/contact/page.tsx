import React from 'react';
import ContactClient from './ContactClient';
import { getSiteSettings } from '@/lib/content';

export const revalidate = 60; // Revalidate every minute

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return <ContactClient settings={settings} />;
}
