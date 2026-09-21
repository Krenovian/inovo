import { PROJECTS, type Project } from '@/data/projects';

/**
 * Data access for projects.
 * Currently returns static data; swap the body for an API fetch when the backend is ready.
 *
 * Example future implementation:
 *   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
 *     next: { revalidate: 60 },
 *   });
 *   if (!res.ok) throw new Error('Failed to load projects');
 *   return res.json();
 */
export async function getProjects(): Promise<Project[]> {
  // TODO: replace with backend API call
  return PROJECTS;
}

export async function getProjectById(id: string): Promise<Project | null> {
  // TODO: replace with backend API call — GET /projects/:id
  const projects = await getProjects();
  return projects.find((p) => p.id === id) ?? null;
}

export type { Project };
