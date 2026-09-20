-- Public media bucket for project images and video.
--
-- Safe to run more than once: the bucket upsert and the policy drops make a
-- second run a no-op rather than an error.

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read portfolio media" on storage.objects;
create policy "Public can read portfolio media"
on storage.objects for select
using (bucket_id = 'portfolio-media');

-- Uploads are namespaced by user id, so the owner can only write inside their
-- own folder.
drop policy if exists "Owner can upload portfolio media" on storage.objects;
create policy "Owner can upload portfolio media"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'portfolio-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Owner can update portfolio media" on storage.objects;
create policy "Owner can update portfolio media"
on storage.objects for update to authenticated
using (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Owner can delete portfolio media" on storage.objects;
create policy "Owner can delete portfolio media"
on storage.objects for delete to authenticated
using (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text);
