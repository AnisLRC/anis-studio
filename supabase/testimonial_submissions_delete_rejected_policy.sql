-- ============================================
-- Idempotent: DELETE policy for rejected testimonial_submissions only
-- ============================================
-- Pokreni u Supabase SQL Editoru ako već imaš tablicu i ostale politike,
-- a želiš samo dodati trajno brisanje odbijenih redova (authenticated).
--
-- Ne dodaje anon DELETE; briše se samo gdje je status = 'rejected'.
-- ============================================

drop policy if exists "testimonial_submissions_authenticated_delete_rejected"
  on public.testimonial_submissions;

create policy "testimonial_submissions_authenticated_delete_rejected"
on public.testimonial_submissions
for delete
to authenticated
using (status = 'rejected');
