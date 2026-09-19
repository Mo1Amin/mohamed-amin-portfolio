import type { Metadata } from 'next';
import './style.css';
export const metadata: Metadata = { title: 'Mohamed Amin — Software Engineer', description: 'Web, mobile and AI. Selected work, leadership and experiments by Mohamed Amin, software engineer and founder of SU ACM Student Chapter.' };
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
