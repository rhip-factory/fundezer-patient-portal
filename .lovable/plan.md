# Real account creation and production wording

## What will change
- Replace the hidden “try login, then silently register” behavior with clear **Log in** and **Create account** modes on the existing entry screen.
- Keep the current visual design while adding the minimum signup fields: full name, email, password, and password confirmation.
- Create accounts through the connected FundEzer authentication service and save each user’s full name and email to the existing private `profiles` record.
- If email confirmation is required, show a clear confirmation message; after confirmation, the first successful login will finish creating the profile.
- Keep returning-user login behavior and redirect successful sessions to the dashboard.
- Remove all visible references to “demo,” “prototype,” “fictional,” and “simulated” across the portal, including page metadata and document preview messages.

## Security and behavior
- Profile creation will use the signed-in user’s own session and the existing row-level access rules; users cannot create or read another user’s profile.
- No tables, policies, routes, or unrelated portal features will be changed.
- Existing application submission and status behavior will remain intact.

## Validation
- Check login and create-account modes, form validation, confirmation messaging, and dashboard redirect.
- Verify production wording on the entry page and document preview dialogs.
- Confirm the project still compiles and the updated screens render correctly on desktop and mobile.
