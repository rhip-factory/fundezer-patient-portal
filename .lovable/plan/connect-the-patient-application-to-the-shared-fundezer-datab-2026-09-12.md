# Connect the patient application to the shared FundEzer database

Only the application part goes live. Every screen, route and interaction stays exactly as it is today; the campaign, treatment, documents, notifications and profile pages keep their sample content.

## What changes for the patient

1. **Real sign-in.** The login screen looks identical, but the email and password are now checked against the real FundEzer accounts. If the email has no account yet, an account is created and the person is signed in.
2. **Real submission.** Pressing "Submit application" on the review step saves the application to the shared database instead of pretending. The submitting screen and success screen behave as they do now, just driven by the real save.
3. **Their own record.** The first time someone submits, a patient record is created for their account (name, email, phone, date of birth, gender, city from what they entered) and linked to their login. Existing sample patient records are left untouched.
4. **Application status page.** "Application status" now shows the real application: its reference, submitted date, hospital, and its current status from the database. The existing summary and progress timeline design stays; the timeline highlights the stage matching the real status.
5. **Survives refresh.** Because the application lives in the database, refreshing or signing in again shows it.
6. **Loading and errors.** The status page shows a quiet loading state, a plain-language message if the database can't be reached, and an empty state with a link to start an application if none exists.

## Security

- Every read and write runs as the signed-in patient, so the database's existing rules only ever return that patient's own application.
- Nothing lets one patient request another patient's record; the application is always looked up through the signed-in account, never by an ID from the page.
- No tables, columns or database rules are changed.

## Technical notes

- **Auth:** `src/routes/index.tsx` calls `supabase.auth.signInWithPassword`, and on "Invalid login credentials" falls back to `supabase.auth.signUp` then signs in. Sign-out on the portal shell clears the query cache and returns to `/`. Route paths are unchanged, so no `_authenticated` folder is introduced; `/portal` and `/apply` keep a light session check that redirects to `/` when there is no session.
- **New file `src/lib/applications.functions.ts`:**
  - `submitApplication` — `createServerFn` + `requireSupabaseAuth`. Reads `patients` by `user_id` through `context.supabase`. If absent, creates the row with `supabaseAdmin` (loaded inside the handler) using a generated `reference_code`, `display_name`, `urgency`, and `current_hospital_id` resolved by name from `hospitals`. Then inserts into `applications` (`patient_id`, `hospital_id`, `title`, `description` = generated story, `requested_amount`, `status: 'Submitted'`) under the caller's own client so `applications_patient_create` applies. Guards against a duplicate insert if an open application already exists.
  - `getMyApplication` — `createServerFn` + `requireSupabaseAuth`, selects the caller's most recent application (plus hospital name) via RLS only.
- **Wiring:** `apply.review.tsx` calls `submitApplication` in its existing submit handler (dialog spinner reused, `toast.error` on failure). `portal.application.tsx` uses `useQuery` + `useServerFn` for `getMyApplication`, mapping DB `application_status` onto the existing five-stage timeline. `portal-store` keeps its mock data for all other pages.
- **Verify `src/start.ts`** registers the bearer-token `functionMiddleware`; add the generated attacher only if no equivalent exists.
- **Email confirmation:** if the connected Supabase project requires email confirmation, self sign-up will ask the patient to confirm before the first submission. Turning that off is a Supabase dashboard setting on your side.

## Testing after implementation

Sign up and sign in as a test account, submit an application end to end, confirm the row in `applications` is linked to that account, refresh the status page, check the status text matches the database, and confirm a second account sees only its own application.
