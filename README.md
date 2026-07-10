![App Preview Dekstop](/public/app-preveiw-desktop.png)

# Notes

A full-stack note-taking app — Google sign-in, per-user data, real-time search, and a keyboard-navigable, responsive UI. Originally scoped from a [Frontend Mentor](https://www.frontendmentor.io/) challenge and extended into a complete backend as a portfolio project.

**Live app:** [add your Vercel URL here]

## Overview

Notes lets a signed-in user create, edit, archive, tag, and search their own notes, with preferences (color theme, font theme) persisted per account. Every note and preference is scoped to the authenticated user and stored in Postgres — there's no mock data or local-only state once you're signed in.

## Features

- Google OAuth sign-in (Auth.js / NextAuth v5)
- Create, edit, delete, and archive notes
- Tag notes and browse by tag
- Global debounced search across title, tags, and content
- Per-user color theme and font theme, persisted to the database
- Fully responsive layout (mobile, tablet, desktop) with a distinct mobile shell
- Full keyboard navigation and visible focus states throughout
- Form validation with inline error messaging

## Tech stack

| Layer      | Choice                                                          | Why                                                                                           |
| ---------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org/) (App Router)                  | Server Components for reads, Server Actions for mutations — no separate API layer needed      |
| Auth       | [Auth.js (NextAuth v5)](https://authjs.dev/) + Google provider  | Database-backed sessions via the Prisma adapter, not JWT-only                                 |
| Database   | [Neon](https://neon.tech/) (serverless Postgres)                | Free-tier hosted Postgres with pooled connections suited to serverless functions              |
| ORM        | [Prisma 7](https://www.prisma.io/)                              | Type-safe schema and queries; driver adapter (`@prisma/adapter-pg`) for the pooled connection |
| Styling    | Tailwind CSS + [Radix UI](https://www.radix-ui.com/) primitives | Accessible unstyled primitives, styled to the design system                                   |
| Deployment | [Vercel](https://vercel.com/)                                   | Native Next.js hosting with per-request serverless functions                                  |

## Architecture notes

A few decisions worth calling out if you're reviewing this as a portfolio piece:

- **Server Components for reads, Server Actions for writes.** Pages fetch data directly on the server (no client-side data-fetching library); mutations go through typed Server Actions (`app/(app)/notes/actions.ts`, `app/(app)/settings/actions.ts`) rather than hand-rolled API routes.
- **Auth is enforced in the data layer, not just middleware.** `proxy.ts` (Next 16's renamed `middleware.ts`) does an optimistic redirect for unauthenticated visitors, but the actual authorization check happens per-request via a cached `requireUser()` helper (`lib/session.ts`) called from pages and actions — middleware alone is not trusted as the security boundary.
- **URL-as-state for note selection.** Which note is open is stored in the URL (`?note=<id>`), not component state, so selected notes are shareable, bookmarkable, and survive a refresh.
- **Split pooled/direct database connections.** Runtime queries use a pooled Postgres connection (`DATABASE_URL`) via Prisma's driver adapter, sized for serverless function concurrency; schema migrations use a separate direct connection (`DIRECT_URL`), configured in `prisma.config.ts` per Prisma 7's new connection model.
- **Per-user preferences live in Postgres**, not `localStorage` — font theme is read server-side in the root layout and applied before first paint, avoiding a flash of default styling.

## Data model

```
User ──┬── Account (OAuth identity)
        ├── Session (database session)
        └── Note (title, content, tags[], isArchived, timestamps)
```

Every `Note` is scoped by a foreign key to `User` with cascade delete, so removing an account removes its data. See `prisma/schema.prisma` for the full schema.

## Running locally

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with:
   ```
   DATABASE_URL=       # Neon pooled connection string
   DIRECT_URL=         # Neon direct connection string
   AUTH_GOOGLE_ID=
   AUTH_GOOGLE_SECRET=
   AUTH_SECRET=        # generate with: openssl rand -base64 32
   ```
3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

## What this project demonstrates

- Designing a normalized relational schema and wiring it end-to-end through an ORM
- Implementing OAuth sign-in with database-backed sessions, not just a client-side auth SDK
- Enforcing authorization at the data-access layer rather than trusting middleware alone
- Building fully responsive, keyboard-accessible UI from a component design system
- Working within a framework's breaking-change surface (Next.js 16, Prisma 7) by reading current docs rather than relying on defaults
