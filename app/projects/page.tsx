import type { Metadata } from 'next';
import { ProjectsView } from './projects-view';

export const metadata: Metadata = {
  title: 'Projects — Mohamed Amin',
  description: 'Selected work across web, mobile and AI by Mohamed Amin, software engineer and founder of SU ACM Student Chapter.',
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
