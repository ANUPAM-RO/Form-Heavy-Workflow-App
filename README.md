Form-Heavy Workflow App
=======================

A premium multi-step grievance and request submission workflow built with the Next.js App Router. The experience focuses on clarity and structure for form-heavy processes, including draft saving, review confirmation, and server-action submission.

## Features
- Multi-step request flow with validation
- Draft save / restore / clear (localStorage)
- Review & confirm page with full submission summary
- Downloadable summary
- Server Actions for final submission
- Polished, premium UI styling

## Setup
1. Install dependencies:
```bash
npm install
```
2. Run the development server:
```bash
npm run dev
```
3. Open http://localhost:3000 in your browser.

## Architecture (High Level)
- `src/app/page.tsx`
  - Entry point rendering the multi-step request flow.
- `src/components/request-flow/`
  - `RequestFlow.tsx` container with state, validation, and navigation.
  - `StepFields.tsx` form steps and inputs.
  - `Field.tsx` shared field wrapper and styling.
  - `DraftControls.tsx` save/restore/clear draft buttons.
- `src/app/review/page.tsx`
  - Review summary and Server Action submission.
- `src/lib/`
  - `schemas.ts` Zod schemas for validation.
  - `storage.ts` localStorage draft helpers.


## Getting Started
You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform.

Check out the Next.js deployment documentation for more details.
