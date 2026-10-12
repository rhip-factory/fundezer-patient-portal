# Fundezer Patient Portal

REFINE THE EXISTING FUNDEZER PATIENT FRONTEND PROTOTYPE.




IMPORTANT:

Do NOT rebuild the project from scratch.

Do NOT redesign the existing application flow.

Do NOT remove existing screens or interactions.




Only refine the PATIENT DASHBOARD / POST-SUBMISSION EXPERIENCE and its navigation structure.




==================================================

1. CHANGE DASHBOARD NAVIGATION

==================================================




The patient dashboard must use a LEFT SIDEBAR navigation on desktop.




Do NOT use:

- top navigation as the primary navigation

- bottom navigation on desktop




The overall structure should be:




┌──────────────────────────────────────────────────────────────┐

│                         TOP HEADER                            │

├───────────────┬──────────────────────────────────────────────┤

│               │                                              │

│   SIDEBAR     │                MAIN CONTENT                  │

│               │                                              │

│   FundEzer    │                                              │

│   Logo        │                                              │

│               │                                              │

│   Home        │                                              │

│   Application │                                              │

│   Campaign    │                                              │

│   Treatment   │                                              │

│   Documents   │                                              │

│   Notifications│                                             │

│               │                                              │

│               │                                              │

│   Profile     │                                              │

│   Settings    │                                              │

│               │                                              │

│   Logout      │                                              │

│               │                                              │

└───────────────┴──────────────────────────────────────────────┘




==================================================

2. SIDEBAR

==================================================




Create a clean, persistent left sidebar.




Desktop width:

approximately 240–260px.




The sidebar should remain visually stable across all patient dashboard pages.




Use the existing FundEzer design system.




Do NOT make the sidebar overly colorful.




Use:

- white / very light neutral background

- subtle right border

- FundEzer brand color #AF5FA1 for active states

- dark neutral text

- muted secondary text

- simple line icons




==================================================

3. SIDEBAR BRANDING

==================================================




At the top of the sidebar:




FundEzer logo




Use the existing FundEzer logo already established in the project.




Do not create a new logo.




Below the logo, optionally show a subtle label:




"Patient Portal"




Keep it understated.




==================================================

4. SIDEBAR NAVIGATION

==================================================




Primary navigation:




HOME

Icon: Home




APPLICATION

Icon: Clipboard / File




CAMPAIGN

Icon: Heart / Campaign




TREATMENT

Icon: Medical / Activity




DOCUMENTS

Icon: File




NOTIFICATIONS

Icon: Bell




Each item must be clickable.




The active item should have:

- subtle tinted background using the FundEzer brand color

- #AF5FA1 icon

- stronger text weight

- rounded container




Do not use excessive pill styling.




==================================================

5. SIDEBAR BOTTOM SECTION

==================================================




Anchor these items toward the bottom:




PROFILE

SETTINGS

LOG OUT




Separate this section subtly from the primary navigation.




Profile should navigate to the patient profile screen.




Settings can open a simple frontend settings screen.




Logout should show a confirmation modal:




"Log out of FundEzer?"




Buttons:

"Cancel"

"Log out"




Since this is a prototype, logout can simply return to the initial patient entry/login screen.




==================================================

6. NOTIFICATION BADGE

==================================================




If there are unread notifications, show a small notification count next to:




NOTIFICATIONS




Example:




Notifications   3




Keep the badge subtle.




Clicking Notifications should open the notification center.




==================================================

7. TOP HEADER

==================================================




The top header should NOT contain the primary navigation.




Instead, it should contain contextual information.




Recommended structure:




Left:

Page title / breadcrumb




Right:

Notification icon

Patient avatar

Patient name

Small dropdown indicator




Example:




Home                                      🔔   Amina Yusuf ▾




For the current page:




Application

Campaign

Treatment

Documents

Notifications

Profile




Update the page title dynamically.




==================================================

8. PATIENT PROFILE MENU

==================================================




Clicking the patient name/avatar in the top-right should open a small dropdown.




Options:




Profile

Settings

Log out




These must be clickable.




Do not duplicate too much information from the sidebar.




==================================================

9. MAIN CONTENT AREA

==================================================




The main content area should occupy the remaining viewport.




Use a comfortable maximum content width.




Do not make content stretch excessively across very large screens.




Suggested structure:




Sidebar

→ fixed/sticky




Header

→ content area




Main content

→ scrollable




Maintain generous whitespace.




==================================================

10. PATIENT HOME DASHBOARD

==================================================




The Home page should be the default landing page after the application has been submitted.




Header:




"Good morning, Amina"




Supporting copy:




"Here's an update on your FundEzer journey."




Then prioritize information in this order:




1. Application status

2. Required actions

3. Campaign status

4. Funding progress

5. Treatment progress

6. Recent updates




==================================================

11. APPLICATION STATUS CARD

==================================================




Create a prominent application status card.




Example:




APPLICATION STATUS




Under hospital review




"Your application has been submitted and is currently being reviewed by Cedarcrest Hospital."




Show:




Application ID

FEZ-2026-00482




Submitted

04 August 2026




CTA:

"View application"




The CTA must navigate to the Application page.




==================================================

12. APPLICATION PROGRESS

==================================================




On the Application page, show a clean progress timeline:




✓ Application submitted

● Hospital review

○ Campaign preparation

○ Campaign live

○ Treatment




Clearly distinguish:

- completed

- current

- upcoming




Do not use color alone to communicate status.




==================================================

13. CAMPAIGN CARD

==================================================




When the application reaches the simulated "Campaign Live" state, display:




YOUR CAMPAIGN




₦4,850,000 raised




of ₦12,000,000




40.4%




127 donors




Show a progress bar.




CTA:




"View campaign"




Secondary CTA:




"Share campaign"




Both must work.




==================================================

14. TREATMENT CARD

==================================================




Create:




TREATMENT PROGRESS




Treatment ongoing




Show the current treatment milestone.




Example:




Treatment started

22 August 2026




CTA:




"View treatment"




Navigate to Treatment.




==================================================

15. RECENT UPDATES

==================================================




Create a compact Recent Updates section.




Include:




- application update

- campaign update

- donation update

- treatment update




Each update should be clickable and navigate to the relevant page.




==================================================

16. CAMPAIGN PAGE

==================================================




The Campaign page should be accessible from the sidebar.




Include:




Campaign title

Hospital verified badge

Hospital name

Patient story

Treatment information

Campaign goal

Funds raised

Percentage raised

Donor count

Progress bar




CTA:




"Share campaign"




Clicking it opens the existing share modal.




Do NOT add real payment functionality.




==================================================

17. TREATMENT PAGE

==================================================




The Treatment page should contain:




Treatment status




Treatment timeline




Treatment updates




Hospital information




Treatment milestones




Use a clean vertical timeline.




Example:




✓ Application submitted

✓ Campaign approved

✓ Treatment funded

● Treatment ongoing

○ Treatment completed




Each treatment update can open a detail modal/page.




==================================================

18. DOCUMENTS PAGE

==================================================




Sidebar → Documents




Show uploaded patient documents in clean cards/list rows.




Categories:




Medical

Identity

Treatment

Supporting




Each document should have:




Name

Type

Date

Status




Actions:




View

Download

Replace




All actions are simulated frontend interactions.




==================================================

19. NOTIFICATIONS PAGE

==================================================




Sidebar → Notifications




Create a dedicated notification center.




Show:




Application received

Application approved

Campaign live

Donation received

Treatment update

Campaign completed




Unread notifications should have a subtle visual distinction.




Clicking a notification should navigate to the appropriate page.




Example:




"Your campaign is now live"

→ Campaign




"New treatment update"

→ Treatment




"Your application has been received"

→ Application




==================================================

20. PROFILE PAGE

==================================================




Sidebar → Profile




Show:




Personal Information

Contact Information

Emergency Contact

Next of Kin




Use a clean two-column layout on desktop.




Primary CTA:




"Edit profile"




Editing should work entirely through frontend state.




==================================================

21. SETTINGS PAGE

==================================================




Create a lightweight settings page.




Include:




Notifications

Privacy

Account




Do not overbuild settings.




This is only a prototype.




==================================================

22. RESPONSIVE BEHAVIOUR

==================================================




IMPORTANT:




Desktop:

Use the LEFT SIDEBAR.




Tablet:

Use a narrower sidebar or collapsible sidebar.




Mobile:

Do NOT keep the full 250px sidebar permanently visible.




Instead use a collapsible drawer/sidebar.




The mobile header should have:




☰ FundEzer




Clicking the hamburger opens the sidebar drawer.




The sidebar should overlay the page on mobile.




When a navigation item is selected, close the drawer automatically.




Do NOT replace the desktop sidebar with bottom navigation.




The sidebar is the primary navigation model.




==================================================

23. SIDEBAR COLLAPSE

==================================================




On desktop, include an optional collapse control.




Expanded:




FundEzer

Home

Application

Campaign

Treatment

Documents

Notifications




Collapsed:




Logo

icons only




When collapsed:

- show tooltips on hover

- preserve active states

- maintain navigation functionality




Do not make collapse overly complicated.




==================================================

24. APPLICATION FLOW EXCEPTION

==================================================




IMPORTANT:




The multi-step application flow should NOT display the full dashboard sidebar.




When the patient is:




Start Application

→ Location

→ Hospital

→ Registration

→ Medical Story

→ Story Review

→ Documents

→ Review

→ Submission




keep the experience focused.




Use the existing application progress indicator.




The dashboard sidebar only appears after the patient enters the post-submission patient portal.




==================================================

25. VISUAL HIERARCHY

==================================================




The patient dashboard should NOT copy the hospital dashboard's density.




Hospital portal:

Operational / data-heavy




Patient portal:

Personal / guided / status-focused




Therefore use:

- fewer metrics

- larger status cards

- more whitespace

- clearer explanations

- simpler charts

- fewer tables




Avoid unnecessary analytics.




==================================================

26. INTERACTION REQUIREMENTS

==================================================




Do not break existing functionality.




Every sidebar item must work.




Test:




Home

→ dashboard




Application

→ application status




Campaign

→ campaign




Treatment

→ treatment timeline




Documents

→ documents




Notifications

→ notification center




Profile

→ profile




Settings

→ settings




Logout

→ logout confirmation




All buttons and CTAs should navigate correctly.




==================================================

27. PRESERVE EXISTING WORK

==================================================




Do NOT regenerate the application flow.




Do NOT remove:

- registration

- medical questions

- AI story simulation

- story editing

- document upload

- document preview

- application review

- submission

- success screen




Only update the post-submission dashboard architecture and navigation.




Reuse existing components wherever possible.




Do not introduce a completely new design system.




Keep the FundEzer visual identity consistent across the whole prototype.




==================================================

FINAL RESULT

==================================================




The final patient experience should feel like:




A polished healthcare crowdfunding PATIENT PORTAL with:




LEFT SIDEBAR

+

CONTEXTUAL TOP HEADER

+

CLEAN MAIN CONTENT AREA




The sidebar should become the primary navigation pattern for the patient portal.




The patient should always know:

- where they are

- what their application status is

- what action is required

- how their campaign is progressing

- what is happening with their treatment




Keep this frontend-only and prototype-focused.




Do not build backend functionality.

Do not add unnecessary infrastructure.

Do not rebuild existing screens.




Refine the existing prototype now.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fundezer-patient-portal.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a31a67a4-94f1-4bbb-9ef4-5bd50869deb5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
