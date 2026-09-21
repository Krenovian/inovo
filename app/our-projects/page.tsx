import { getProjects } from '@/lib/projects';
import ProjectsClient from './ProjectsClient';

export default async function OurProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
