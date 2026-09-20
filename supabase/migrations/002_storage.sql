insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do update set public = excluded.public;

create policy "Public can read portfolio media"
on storage.objects for select
using (bucket_id = 'portfolio-media');

create policy "Owner can upload portfolio media"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'portfolio-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Owner can update portfolio media"
on storage.objects for update to authenticated
using (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Owner can delete portfolio media"
on storage.objects for delete to authenticated
using (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = auth.uid()::text);
