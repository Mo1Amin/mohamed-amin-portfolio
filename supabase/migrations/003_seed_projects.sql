-- Seed the verified project catalog.
--
-- Generated from app/content-model.ts by scripts/generate-seed.mjs.
-- Do not edit by hand: run the generator again instead.
--
-- Safe to run more than once. Projects are matched by slug, so re-running
-- refreshes the seeded facts without creating duplicates. Media is never
-- touched here, because media is uploaded through the admin workspace.
--
-- Private projects are seeded on purpose: row-level security is what keeps them
-- out of public queries, and an empty table would not prove that.

do $$
declare
  owner_id uuid;
  target_id uuid;
  owner_count integer;
begin
  select count(*) into owner_count from auth.users;
  if owner_count = 0 then
    raise exception 'No Auth user exists. Create the owner account in Supabase Auth before seeding.';
  end if;
  if owner_count > 1 then
    raise exception 'Expected exactly one Auth user, found %. Seed with an explicit owner instead.', owner_count;
  end if;
  select id into owner_id from auth.users limit 1;

  -- med-notes (coming_soon)
  insert into public.projects (owner_user_id, slug, status, featured, sort_order)
  values (owner_id, 'med-notes', 'coming_soon', true, 1)
  on conflict (slug) do update set status = excluded.status, featured = excluded.featured, sort_order = excluded.sort_order
  returning id into target_id;

  insert into public.project_translations (project_id, locale, title, short_summary, role, case_note, problem, solution, challenges, outcome)
  values
    (target_id, 'en', 'Med Notes', 'Project details are being prepared.', 'Details to be confirmed.', 'This project remains unpublished until its content is verified.', '', '', '', ''),
    (target_id, 'ar', 'Med Notes', 'Project details are being prepared.', 'Details to be confirmed.', 'This project remains unpublished until its content is verified.', '', '', '', ''),
    (target_id, 'sv', 'Med Notes', 'Project details are being prepared.', 'Details to be confirmed.', 'This project remains unpublished until its content is verified.', '', '', '', '')
  on conflict (project_id, locale) do update set title = excluded.title, short_summary = excluded.short_summary, role = excluded.role, case_note = excluded.case_note, problem = excluded.problem, solution = excluded.solution, challenges = excluded.challenges, outcome = excluded.outcome;

  delete from public.project_technologies where project_id = target_id;

  delete from public.project_links where project_id = target_id;
  -- No confirmed links for this project yet.

  -- myqat (coming_soon)
  insert into public.projects (owner_user_id, slug, status, featured, sort_order)
  values (owner_id, 'myqat', 'coming_soon', true, 2)
  on conflict (slug) do update set status = excluded.status, featured = excluded.featured, sort_order = excluded.sort_order
  returning id into target_id;

  insert into public.project_translations (project_id, locale, title, short_summary, role, case_note, problem, solution, challenges, outcome)
  values
    (target_id, 'en', 'MyQat', 'Project details are being prepared.', 'Details to be confirmed.', 'This project remains unpublished until its content is verified.', '', '', '', ''),
    (target_id, 'ar', 'MyQat', 'Project details are being prepared.', 'Details to be confirmed.', 'This project remains unpublished until its content is verified.', '', '', '', ''),
    (target_id, 'sv', 'MyQat', 'Project details are being prepared.', 'Details to be confirmed.', 'This project remains unpublished until its content is verified.', '', '', '', '')
  on conflict (project_id, locale) do update set title = excluded.title, short_summary = excluded.short_summary, role = excluded.role, case_note = excluded.case_note, problem = excluded.problem, solution = excluded.solution, challenges = excluded.challenges, outcome = excluded.outcome;

  delete from public.project_technologies where project_id = target_id;

  delete from public.project_links where project_id = target_id;
  -- No confirmed links for this project yet.

  -- su-acm-website (in_development)
  insert into public.projects (owner_user_id, slug, status, featured, sort_order)
  values (owner_id, 'su-acm-website', 'in_development', true, 3)
  on conflict (slug) do update set status = excluded.status, featured = excluded.featured, sort_order = excluded.sort_order
  returning id into target_id;

  insert into public.project_translations (project_id, locale, title, short_summary, role, case_note, problem, solution, challenges, outcome)
  values
    (target_id, 'en', 'SU ACM official website', 'The digital home for the student chapter Mohamed founded and supports through its official web work.', 'Founder and responsible for the official website and web activities.', 'Live URL and implementation details will be added after verification.', '', '', '', ''),
    (target_id, 'ar', 'الموقع الرسمي لـ SU ACM', 'البيت الرقمي للفرع الطلابي الذي أسسه محمد ويدعمه من خلال عمله على الموقع الرسمي.', 'مؤسس الفرع ومسؤول الموقع الرسمي وأنشطة الويب.', 'سيُضاف رابط الموقع وتفاصيل التنفيذ بعد التحقق منها.', '', '', '', ''),
    (target_id, 'sv', 'SU ACM:s officiella webbplats', 'Det digitala hemmet för studentföreningen som Mohamed grundade och stödjer genom dess officiella webbarbete.', 'Grundare och ansvarig för den officiella webbplatsen och webbarbetet.', 'Live-URL och implementationsdetaljer läggs till efter verifiering.', '', '', '', '')
  on conflict (project_id, locale) do update set title = excluded.title, short_summary = excluded.short_summary, role = excluded.role, case_note = excluded.case_note, problem = excluded.problem, solution = excluded.solution, challenges = excluded.challenges, outcome = excluded.outcome;

  delete from public.project_technologies where project_id = target_id;

  delete from public.project_links where project_id = target_id;
  -- No confirmed links for this project yet.

  -- graduation-ml-fitness-health (coming_soon)
  insert into public.projects (owner_user_id, slug, status, featured, sort_order)
  values (owner_id, 'graduation-ml-fitness-health', 'coming_soon', true, 4)
  on conflict (slug) do update set status = excluded.status, featured = excluded.featured, sort_order = excluded.sort_order
  returning id into target_id;

  insert into public.project_translations (project_id, locale, title, short_summary, role, case_note, problem, solution, challenges, outcome)
  values
    (target_id, 'en', 'Fitness × Intelligence', 'A Flutter application and machine learning model for fitness and health, led as an A+ graduation project.', 'Team leader. The project received an A+ grade.', 'GitHub and Google Play releases are planned.', '', '', '', ''),
    (target_id, 'ar', 'اللياقة × الذكاء', 'تطبيق Flutter ونموذج تعلم آلي للياقة والصحة، قاده كمشروع تخرج بتقدير A+.', 'قائد الفريق. حصل المشروع على تقدير A+.', 'يُخطط لنشر المشروع على GitHub وGoogle Play.', '', '', '', ''),
    (target_id, 'sv', 'Träning × Intelligens', 'En Flutter-app och maskininlärningsmodell för träning och hälsa, ledd som ett examensprojekt med betyget A+.', 'Teamledare. Projektet fick betyget A+.', 'Publicering på GitHub och Google Play planeras.', '', '', '', '')
  on conflict (project_id, locale) do update set title = excluded.title, short_summary = excluded.short_summary, role = excluded.role, case_note = excluded.case_note, problem = excluded.problem, solution = excluded.solution, challenges = excluded.challenges, outcome = excluded.outcome;

  delete from public.project_technologies where project_id = target_id;
  insert into public.project_technologies (project_id, technology, sort_order) values (target_id, 'Flutter', 0), (target_id, 'Machine Learning', 1), (target_id, 'Fitness and Health', 2);

  delete from public.project_links where project_id = target_id;
  -- No confirmed links for this project yet.

  -- flight-web (private)
  insert into public.projects (owner_user_id, slug, status, featured, sort_order)
  values (owner_id, 'flight-web', 'private', false, 5)
  on conflict (slug) do update set status = excluded.status, featured = excluded.featured, sort_order = excluded.sort_order
  returning id into target_id;

  insert into public.project_translations (project_id, locale, title, short_summary, role, case_note, problem, solution, challenges, outcome)
  values
    (target_id, 'en', 'Flight Web', 'Flight booking, hotels, and rental cars at competitive prices.', 'Details to be confirmed.', 'This project is private and is not returned by public queries.', '', '', '', ''),
    (target_id, 'ar', 'Flight Web', 'Flight booking, hotels, and rental cars at competitive prices.', 'Details to be confirmed.', 'This project is private and is not returned by public queries.', '', '', '', ''),
    (target_id, 'sv', 'Flight Web', 'Flight booking, hotels, and rental cars at competitive prices.', 'Details to be confirmed.', 'This project is private and is not returned by public queries.', '', '', '', '')
  on conflict (project_id, locale) do update set title = excluded.title, short_summary = excluded.short_summary, role = excluded.role, case_note = excluded.case_note, problem = excluded.problem, solution = excluded.solution, challenges = excluded.challenges, outcome = excluded.outcome;

  delete from public.project_technologies where project_id = target_id;
  insert into public.project_technologies (project_id, technology, sort_order) values (target_id, 'HTML', 0), (target_id, 'CSS', 1), (target_id, 'JavaScript', 2);

  delete from public.project_links where project_id = target_id;
  -- No confirmed links for this project yet.

  -- speed-store (private)
  insert into public.projects (owner_user_id, slug, status, featured, sort_order)
  values (owner_id, 'speed-store', 'private', false, 6)
  on conflict (slug) do update set status = excluded.status, featured = excluded.featured, sort_order = excluded.sort_order
  returning id into target_id;

  insert into public.project_translations (project_id, locale, title, short_summary, role, case_note, problem, solution, challenges, outcome)
  values
    (target_id, 'en', 'Speed Store', 'A store for games and in-game items.', 'Details to be confirmed.', 'This project is private and is not returned by public queries.', '', '', '', ''),
    (target_id, 'ar', 'Speed Store', 'A store for games and in-game items.', 'Details to be confirmed.', 'This project is private and is not returned by public queries.', '', '', '', ''),
    (target_id, 'sv', 'Speed Store', 'A store for games and in-game items.', 'Details to be confirmed.', 'This project is private and is not returned by public queries.', '', '', '', '')
  on conflict (project_id, locale) do update set title = excluded.title, short_summary = excluded.short_summary, role = excluded.role, case_note = excluded.case_note, problem = excluded.problem, solution = excluded.solution, challenges = excluded.challenges, outcome = excluded.outcome;

  delete from public.project_technologies where project_id = target_id;
  insert into public.project_technologies (project_id, technology, sort_order) values (target_id, 'HTML', 0), (target_id, 'CSS', 1), (target_id, 'JavaScript', 2), (target_id, 'Node.js', 3), (target_id, 'MySQL', 4);

  delete from public.project_links where project_id = target_id;
  -- No confirmed links for this project yet.

  -- spark-motors (private)
  insert into public.projects (owner_user_id, slug, status, featured, sort_order)
  values (owner_id, 'spark-motors', 'private', false, 7)
  on conflict (slug) do update set status = excluded.status, featured = excluded.featured, sort_order = excluded.sort_order
  returning id into target_id;

  insert into public.project_translations (project_id, locale, title, short_summary, role, case_note, problem, solution, challenges, outcome)
  values
    (target_id, 'en', 'Spark Motors', 'A website for selling cars and editing information about cars and motorcycles.', 'Details to be confirmed.', 'This project is private and is not returned by public queries.', '', '', '', ''),
    (target_id, 'ar', 'Spark Motors', 'A website for selling cars and editing information about cars and motorcycles.', 'Details to be confirmed.', 'This project is private and is not returned by public queries.', '', '', '', ''),
    (target_id, 'sv', 'Spark Motors', 'A website for selling cars and editing information about cars and motorcycles.', 'Details to be confirmed.', 'This project is private and is not returned by public queries.', '', '', '', '')
  on conflict (project_id, locale) do update set title = excluded.title, short_summary = excluded.short_summary, role = excluded.role, case_note = excluded.case_note, problem = excluded.problem, solution = excluded.solution, challenges = excluded.challenges, outcome = excluded.outcome;

  delete from public.project_technologies where project_id = target_id;
  insert into public.project_technologies (project_id, technology, sort_order) values (target_id, 'HTML', 0), (target_id, 'CSS', 1), (target_id, 'JavaScript', 2);

  delete from public.project_links where project_id = target_id;
  -- No confirmed links for this project yet.
end $$;
