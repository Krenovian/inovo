import { db } from '@/lib/db';
import ProjectsClient from './ProjectsClient';

export default async function OurProjectsPage() {
  // Fetch initial projects (page 1, limit 6)
  const limit = 6;
  const [projects, total] = await Promise.all([
    db.project.findMany({
      orderBy: { order: 'asc' },
      take: limit,
    }),
    db.project.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return <ProjectsClient initialProjects={projects} initialTotalPages={totalPages} />;
}
