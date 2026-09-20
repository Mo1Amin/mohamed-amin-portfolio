import { HomeView } from './home-view';
import { getPublicProjectEntries } from './projects-data-server';

/**
 * The landing page reads the same visible-only projects as the projects routes,
 * so a title or status edited in the admin workspace shows up here too. It
 * still falls back to the checked-in catalog when Supabase is not configured.
 */
export const revalidate = 60;

export default async function Home() {
  return <HomeView projects={await getPublicProjectEntries()} />;
}
