import Home from './home-view';
import { getPublicProjectEntries } from './projects-data-server';

export default async function Page() {
  const projects = await getPublicProjectEntries();
  return <Home projects={projects} />;
}
