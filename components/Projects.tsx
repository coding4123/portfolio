import { getProjects } from '@/lib/Projects';
import ProjectsClient from './sections/ProjectsClient';

export default function Projects() {
  const projects = getProjects();

  return (
    <ProjectsClient projects={projects} />
  );
}