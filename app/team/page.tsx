import React from 'react';
import TeamClient from './TeamClient';
import { db } from '@/lib/db';

export const revalidate = 60; // Revalidate every minute

export default async function TeamPage() {
  const teamMembers = await db.teamMember.findMany({
    orderBy: { order: 'asc' },
  });

  return <TeamClient teamMembers={teamMembers} />;
}
