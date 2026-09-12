# Roadmap

- [x] Connect the project to the shared FundEzer Supabase backend
- [x] Real email/password sign-in (with self sign-up) on the login screen
- [x] Application submission writes to the real `applications` table, linked to the signed-in patient
- [x] Application status page reads the patient's own application (loading + error states)
- [x] Portal is gated: signed-out visitors are sent back to the login screen; log out clears the session
- [ ] Signed-in end-to-end check (submit + refresh) — blocked: no test account password for the shared backend

Other portal pages (campaign, treatment, documents, notifications, profile, settings) intentionally keep sample content.
