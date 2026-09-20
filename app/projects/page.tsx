import type { Metadata } from 'next';
import { ProjectsView } from './projects-view';
import { getPublicProjectEntries } from '../projects-data-server';

export const metadata: Metadata = {
  title: 'Projects — Mohamed Amin',
  description: 'Selected work across web, mobile and AI by Mohamed Amin, software engineer and founder of SU ACM Student Chapter.',
};

/** Statically rendered, refreshed a minute after the owner saves a change. */
export const revalidate = 60;

export default async function ProjectsPage() {
  return <ProjectsView projects={await getPublicProjectEntries()} />;
}
