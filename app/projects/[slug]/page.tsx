import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { slugs } from '../../projects-data';
import { getPublicProjectEntries } from '../../projects-data-server';
import { defaultLocale } from '../../settings';
import { CaseView } from './case-view';

export function generateStaticParams(){return slugs.map(slug=>({slug}))}

// Without this an unknown slug was rendered on demand and cached, so a missing
// project answered 200 OK with the not-found screen inside it. Now anything
// outside the known slugs is a real 404.
export const dynamicParams=false;

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params; const projects=await getPublicProjectEntries(); const index=projects.findIndex((project) => project.slug === slug);
 if(index<0)return {title:'Project — Mohamed Amin'};
 // Metadata is produced before the reader's language is known, so it uses the
 // default locale — the same one the document is first rendered with.
 const project = projects[index];
 return {title:`${project.content.title[defaultLocale]} — Mohamed Amin`,description:project.content.shortSummary[defaultLocale]};
}

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const projects=await getPublicProjectEntries(); const index=projects.findIndex((project) => project.slug === slug);
 if(index<0)notFound();
 return <CaseView index={index} project={projects[index]} />;
}
