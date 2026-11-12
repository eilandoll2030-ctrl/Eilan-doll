# Website concepts / نماذج الأعمال

Preview-only static gallery: `index.html`, café menu `cafe.html`, creative studio `studio.html`. Grouped under the existing Templates & Projects section, with two entry links to `#discover` (project idea question preview) and `#concepts` (website examples). The separate homepage portfolio block has been removed. The gallery links back to `/?section=templates`, supported by the main route resolver. Discovery now contains an eight-step local questionnaire in `survey.js`: optional radio choices, other/not-sure options, a free-text response shown only when the last option, Other, is selected on each step, back/next, editable summary, confirmed reset, and UTF-8 text download. State stays in memory across steps and language changes, but clears on reload/departure. No answers are submitted or persisted. This is not an automated recommendation service. Open `/portfolio/index.html` in the local preview. Add `?lang=en` for English.

## Scope and assets
- Original illustrative names, text, CSS cup and geometric art; not client projects. Names have not been trademark-cleared for commercial launch.
- Reuses the repository's approved `assets/logo/eilan-icon.svg`; system fonts only. No external assets, packages, APIs, AI subscriptions, analytics, server-side forms, checkout or browser storage added.
- Prices in the café are explicitly fictional examples, not offers. No ordering, reservations or contact collection.
- Pages carry `noindex,follow` while experimental; no deployment settings were changed.
- These files are public preview source, not paid product source. No commercial product or exclusive license is promised.
- Existing site-wide sales and account features are unchanged; the preview-only scope applies to these new portfolio pages.

## Checks
Run from repository root:
```
node --check portfolio/app.js
node tests/portfolio.test.cjs
git diff --check
```
Dependency-free smoke tests cover all three pages in both languages, local links/assets, direction, language switching, café filters and presence of studio FAQs. Survey rendering tests also cover all eight steps, open answers, other/not-sure choices and HTML escaping. They use a DOM stub, not a real browser.

Still required: real-browser mobile/iPad and desktop visual checks, keyboard checks, console inspection, QA review and owner approval before publishing. No browser automation tools were available; no packages were installed.

## Before sales
Confirm activity-specific Saudi requirements with official sources, clear names and asset licenses, define template versus exclusive deliverables, hosting and maintenance responsibilities, pricing, terms, privacy and applicable cancellation/refund policy, and conduct security and delivery checks. This concept is not a legal compliance certification.

Other-answer drafts remain in memory when switching options, but are excluded from the summary and downloaded brief unless Other is selected. Interaction-handler tests cover conditional visibility, next/back retention and reset using a lightweight DOM double. Real-browser visual/assistive-technology checks remain pending.

## Direct questionnaire access
`survey.html` is a dedicated questionnaire page without the gallery hero. It is embedded directly in Templates & Projects as `#projectSurvey`, with a full-page fallback link. The existing gallery still includes the questionnaire too. This avoids requiring visitors to find it below the gallery hero. No production deployment has been performed.

## Native main-site integration
The Templates & Projects renderer now calls `surveyHTML()` directly and `mountSurvey()` on mount. It no longer embeds an iframe. The main index loads the shared survey script before its app script and scoped `survey.css`. The dedicated survey page remains an optional standalone entry. Tests check the native render/mount wiring and no iframe. Browser visual testing is still pending.
