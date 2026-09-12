# Connect Patient Portal to the existing FundEzer backend

## Goal
Establish a backend connection between this Patient Portal project and the existing FundEzer Supabase project `jyoeyeeshllfaqzqeuzf` (created in another Lovable project), without creating a new backend, modifying the database, or changing the UI.

## Current state
- This Patient Portal is frontend-only.
- `package.json` has no Supabase client dependencies.
- `src/integrations/supabase/` does not exist.
- No `.env` files are present.
- The login form in `src/routes/index.tsx` uses local validation only.
- `.lovable/project.json` shows no backend/project identifier.
- Because no backend is currently attached, the "Connect an existing Supabase project" option is available in this project.

## Supported method
Yes — Lovable Cloud supports connecting this project to the existing FundEzer backend. The connection must be made inside the Lovable UI, not via chat or agent tools.

The flow is:
1. Link the Supabase organization that owns `jyoeyeeshllfaqzqeuzf` to this Lovable workspace (one-time, workspace-owner/admin step).
2. In this Patient Portal project, open **More > Cloud** and choose **"Already have a Supabase project? Connect it here"**.
3. Select the existing Supabase project `jyoeyeeshllfaqzqeuzf` and confirm the connection.

## Exact steps to take inside Lovable

### Step 1 — Link the Supabase organization to the workspace (if not already linked)
- In the Lovable dashboard sidebar, go to **Connectors**.
- Select **Supabase**.
- Click **Connect Supabase** or **Manage Connected Organizations**.
- Sign in to the Supabase account that owns project `jyoeyeeshllfaqzqeuzf` and authorize Lovable for that organization.
- This makes all projects in that Supabase organization available to the workspace.

### Step 2 — Connect this project to the existing Supabase project
- Open this Patient Portal project in the Lovable editor.
- Open **More > Cloud** from the left sidebar.
- Click **"Already have a Supabase project? Connect it here"**.
- In the **Linked Supabase organizations** dialog, click **Continue**.
- Select the project whose identifier is `jyoeyeeshllfaqzqeuzf`.
- Click **Connect**.

After connecting, Lovable will manage the backend (database, auth, storage, edge functions) using that existing Supabase project. The service role key will be retrieved securely for server-side runtime use.

## Important caveats
- This can only be done because this project currently has no backend attached. A project already running on Lovable Cloud cannot use this flow.
- If this project is ever connected to a different backend first, you must disconnect it in **Project Settings > Integrations** before reconnecting to `jyoeyeeshllfaqzqeuzf`.
- The connection is not made through chat/agent tools; it requires the Supabase OAuth flow in the Lovable UI.
- No new Supabase project is created, no tables are modified, and no UI or application code changes are made by this connection step alone.

## If the option is unavailable
If **More > Cloud** does not show the "Already have a Supabase project?" option, the most likely reasons are:
- The Supabase organization is not linked to the workspace yet (return to Step 1).
- This project already has a backend attached somewhere (check **Project Settings > Integrations > Supabase** and disconnect if needed).
- The workspace does not have permission to access the Supabase organization containing `jyoeyeeshllfaqzqeuzf`.

## Next step after connection
Once the connection is established, this project will have access to the shared FundEzer database. Only then should application code be updated to use the generated Supabase client and authentication infrastructure.
