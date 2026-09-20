import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicProjectEntries } from '../../projects-data-server';
import { defaultLocale } from '../../settings';
import { CaseView } from './case-view';

/**
 * The routes that exist are the ones a visitor is allowed to see, taken from
 * the same visible-only query the pages use. A private project has no route at
 * all, so it cannot be reached even by guessing the slug.
 */
export async function generateStaticParams(){
 const projects=await getPublicProjectEntries();
 return projects.map((project)=>({slug:project.slug}));
}

// Anything outside those slugs is a real 404 rather than a 200 carrying the
// not-found screen. This only holds while the route stays statically rendered,
// which is why public content is read without cookies.
export const dynamicParams=false;

// Content edited in the admin workspace appears within a minute. A brand new
// project still needs a deploy, because its route is generated at build time.
export const revalidate=60;

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
