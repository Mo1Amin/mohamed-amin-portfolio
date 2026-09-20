'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { RouteControls } from '../route-controls';
import { projectCatalog, projectStatusLabels, type ProjectContent, type ProjectStatus } from '../content-model';
import { createSupabaseBrowserClient } from '../lib/supabase/client';

const draftKey = 'amin-portfolio-admin-drafts-v1';
const statusOptions: ProjectStatus[] = ['published', 'coming_soon', 'private', 'in_development'];

function cloneCatalog() {
  return structuredClone(projectCatalog);
}

export function AdminView() {
  const [projects, setProjects] = useState<ProjectContent[]>(cloneCatalog);
  const [selectedId, setSelectedId] = useState(projectCatalog[0].id);
  const [saved, setSaved] = useState(false);
  const [remoteStatus, setRemoteStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [remoteError, setRemoteError] = useState('');
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  useEffect(() => {
    const stored = window.localStorage.getItem(draftKey);
    if (!stored) return;
    try { setProjects(JSON.parse(stored) as ProjectContent[]); } catch { window.localStorage.removeItem(draftKey); }
  }, []);

  const selected = useMemo(() => projects.find((project) => project.id === selectedId) ?? projects[0]!, [projects, selectedId]);
  const updateSelected = (update: Partial<ProjectContent>) => {
    setProjects((current) => current.map((project) => project.id === selected.id ? { ...project, ...update } : project));
    setSaved(false);
  };

  const saveDraft = () => {
    window.localStorage.setItem(draftKey, JSON.stringify(projects));
    setSaved(true);
  };
  const saveToSupabase = async () => {
    setRemoteStatus('saving');
    setRemoteError('');
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selected),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Unable to save to Supabase.');
      setRemoteStatus('saved');
    } catch (error) {
      setRemoteStatus('error');
      setRemoteError(error instanceof Error ? error.message : 'Unable to save to Supabase.');
    }
  };
  const resetDraft = () => { window.localStorage.removeItem(draftKey); setProjects(cloneCatalog()); setSaved(false); };
  const signOut = async () => { if (supabase) await supabase.auth.signOut(); window.location.assign('/admin/login'); };

  return <main className="admin-page">
    <header className="route-header admin-header">
      <Link className="brand" href="/" aria-label="Mohamed Amin">ma<span>↗</span></Link>
      <div className="admin-heading"><span className="eyebrow"><span className="dot" />CONTENT WORKSPACE</span><strong>Admin foundation</strong></div>
      <div className="admin-header-actions"><RouteControls />{supabase && <button className="text-link" onClick={signOut}>Sign out</button>}</div>
    </header>

    <section className="admin-intro">
      <div>
        <p className="eyebrow">LOCAL DRAFT WORKSPACE</p>
        <h1>Shape the work.<br /><em>Keep the facts.</em></h1>
        <p>Edit the verified project catalog locally, then save the selected project to Supabase when the owner session is configured.</p>
      </div>
      <div className="admin-actions"><button className="primary" onClick={saveDraft}>Save local draft <span>↗</span></button><button className="text-link" onClick={saveToSupabase} disabled={remoteStatus === 'saving'}>{remoteStatus === 'saving' ? 'Saving…' : 'Save to Supabase'} <span>↗</span></button><button className="text-link" onClick={resetDraft}>Reset draft</button></div>
    </section>

    <section className="admin-shell" aria-label="Project content workspace">
      <aside className="admin-list">
        <div className="admin-list-top"><span>PROJECTS</span><b>{projects.length.toString().padStart(2, '0')}</b></div>
        {projects.map((project) => <button key={project.id} className={project.id === selected.id ? 'admin-project active' : 'admin-project'} onClick={() => { setSelectedId(project.id); setSaved(false); }}>
          <span className="admin-project-index">{project.order.toString().padStart(2, '0')}</span><span><strong>{project.title.en}</strong><small>{projectStatusLabels[project.status]}</small></span><i>↗</i>
        </button>)}
      </aside>

      <article className="admin-editor">
        <div className="editor-top"><div><p className="eyebrow">EDITING PROJECT · {selected.order.toString().padStart(2, '0')}</p><h2>{selected.title.en}</h2></div><span className={`status-chip status-${selected.status}`}>{projectStatusLabels[selected.status]}</span></div>
        <div className="editor-grid">
          <label>English title<input value={selected.title.en} onChange={(event) => updateSelected({ title: { ...selected.title, en: event.target.value } })} /></label>
          <label>Arabic title<input dir="rtl" value={selected.title.ar} onChange={(event) => updateSelected({ title: { ...selected.title, ar: event.target.value } })} /></label>
          <label>Swedish title<input value={selected.title.sv} onChange={(event) => updateSelected({ title: { ...selected.title, sv: event.target.value } })} /></label>
          <label>Status<select value={selected.status} onChange={(event) => updateSelected({ status: event.target.value as ProjectStatus })}>{statusOptions.map((status) => <option value={status} key={status}>{projectStatusLabels[status]}</option>)}</select></label>
          <label className="editor-wide">English summary<textarea value={selected.shortSummary.en} onChange={(event) => updateSelected({ shortSummary: { ...selected.shortSummary, en: event.target.value } })} /></label>
          <label className="editor-wide">Arabic summary<textarea dir="rtl" value={selected.shortSummary.ar} onChange={(event) => updateSelected({ shortSummary: { ...selected.shortSummary, ar: event.target.value } })} /></label>
          <label className="editor-wide">Swedish summary<textarea value={selected.shortSummary.sv} onChange={(event) => updateSelected({ shortSummary: { ...selected.shortSummary, sv: event.target.value } })} /></label>
          <label>Role<input value={selected.role.en} onChange={(event) => updateSelected({ role: { ...selected.role, en: event.target.value } })} /></label>
          <label>Technologies<input value={selected.technologies.join(', ')} onChange={(event) => updateSelected({ technologies: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} /></label>
          <label>GitHub link<input type="url" placeholder="https://github.com/..." value={selected.links.github ?? ''} onChange={(event) => updateSelected({ links: { ...selected.links, github: event.target.value || undefined } })} /></label>
          <label>Live link<input type="url" placeholder="https://..." value={selected.links.live ?? ''} onChange={(event) => updateSelected({ links: { ...selected.links, live: event.target.value || undefined } })} /></label>
        </div>
        <div className="editor-foot"><label className="check-row"><input type="checkbox" checked={selected.featured} onChange={(event) => updateSelected({ featured: event.target.checked })} /> Featured project</label><span>{remoteStatus === 'error' ? remoteError : remoteStatus === 'saved' ? 'Saved to Supabase.' : saved ? 'Draft saved in this browser.' : 'Unsaved local changes.'}</span></div>
      </article>
    </section>
    <footer><Link className="text-link" href="/">← Back to portfolio</Link><p>Admin foundation · local draft mode</p></footer>
  </main>;
}
