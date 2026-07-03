# Planning Document

## Project Features

- Create, read, update, and delete notes
- Archive notes
- View all their notes
- View all archived notes
- View notes with specific tags
- Search notes by title, tag, and content
- Select their color theme
- Select their font theme
- Receive validation messages if required form fields aren't completed
- Navigate the whole app and perform all actions using only their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account, log in, change password (add user authentication to the full-stack app)
- **Bonus**: Reset their password (add password reset to the full-stack app)

## Global State Management

- Use React Context API to manage global state for notes, archived notes, and user preferences

## Routes + Folders

<!-- prettier-ignore -->
app/
├── (auth)/
│   └── login/
│       └── page.tsx
├── (app)/
│   ├── layout.tsx                  ← nav/sidebar + split pane shell
│   ├── page.tsx                    ← redirect to /notes
│   ├── notes/
│   │   ├── page.tsx                ← All Notes (?note=id for active note)
│   │   ├── archived/
│   │   │   └── page.tsx            ← Archived Notes (?note=id for active note)
│   │   └── tags/
│   │       └── [tag]/
│   │           └── page.tsx        ← Tag filtered notes (?note=id for active note)
│   └── settings/
│       └── page.tsx                ← Settings page (default to Color Theme)
└── layout.tsx                      ← root layout (fonts, theme provider)

<!-- prettier-ignore -->
## URL patterns:

/notes — All Notes
/notes?note=abc123 — All Notes, note open
/notes/archived — Archived Notes
/notes/archived?note=abc123 — Archived, note open
/notes/tags/dev — Dev tag
/notes/tags/dev?note=abc123 — Dev tag, note open

Auth.js + Backend Foundation (Google login, Neon Postgres, Prisma)
Context
The note-taking app currently has static UI with a json-server mock (db.json, now with UUID ids). The goal is a real backend: Google sign-in via Auth.js (NextAuth v5), per-user data in a free hosted Postgres (Neon), accessed through Prisma. Next.js itself serves as the backend — Server Components for reads, Server Actions for mutations (per the bundled docs in node_modules/next/dist/docs/). Scope is foundation only: auth working end-to-end, database schema in place, notes seeded. Wiring every page to live data is a follow-up.

Next.js 16 gotcha: middleware.ts is renamed proxy.ts here. Auth.js's official middleware instructions must be adapted to the proxy convention, and the docs warn proxy is for optimistic redirect checks only — real auth checks live in the data layer.

Manual prerequisites (user does these in a browser; agent provides instructions)
Neon: create free account + project at neon.tech → copy the pooled DATABASE_URL connection string.
Google OAuth client: Google Cloud Console → Credentials → OAuth client ID (Web application). Authorized redirect URI: http://localhost:3000/api/auth/callback/google. Copy client ID + secret.
Implementation

1. Dependencies & env
   npm install next-auth@beta @auth/prisma-adapter @prisma/client and npm install -D prisma tsx
   .env (git-ignored — verify .gitignore covers it): DATABASE_URL, AUTH_SECRET (generate via npx auth secret), AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET.
2. Prisma schema — prisma/schema.prisma (new)
   Standard Auth.js models: User, Account, Session, VerificationToken (from the official @auth/prisma-adapter schema).
   Note model: id (uuid, default), title, tags String[], content @db.Text, lastEdited DateTime @updatedAt, isArchived Boolean @default(false), userId FK → User (cascade delete), index on userId.
   Run npx prisma migrate dev --name init.
3. Auth.js setup
   auth.ts (project root, new): NextAuth({ adapter: PrismaAdapter(prisma), providers: [Google], session: { strategy: "database" } }); export handlers, auth, signIn, signOut.
   lib/prisma.ts (new): singleton PrismaClient (global-cached in dev).
   app/api/auth/[...nextauth]/route.ts (new): export const { GET, POST } = handlers.
   proxy.ts (project root, new — NOT middleware.ts): optimistic redirect of unauthenticated visitors from /(app) routes to /login, and authenticated visitors away from /login to /notes. Matcher excludes /api/auth, static assets.
   lib/session.ts (new): requireUser() — a React.cache-wrapped helper that calls auth() and redirects to /login if no session. This is the real protection; pages/actions call it (docs pattern from 02-guides/data-security.md).
4. Wire the UI
   components/login-form.tsx: the "Login with Google" button already exists — wrap it in a form whose server action calls signIn("google", { redirectTo: "/notes" }).
   Add a "Logout" server action (signOut({ redirectTo: "/login" })) hooked to the existing logout affordance in the sidebar/settings (app/(app)/\_components/SidebarNavigation.tsx or settings menu — match whatever the UI already has).
5. Seed notes — prisma/seed.ts (new)
   Reads db.json, upserts its 10 notes for the user whose email is given by SEED_USER_EMAIL env var (run after first Google sign-in creates the user row).
   Add "prisma": { "seed": "tsx prisma/seed.ts" } to package.json.
   Keep db.json + json-server script for now; remove in the follow-up once pages read from Postgres.
   Out of scope (follow-up)
   Wiring notes pages/CRUD server actions to Prisma; deploying to Vercel.

Verification (end-to-end)
npm run dev → visit /notes while signed out → redirected to /login.
Click "Login with Google" → Google consent screen → lands on /notes.
npx prisma studio → confirm User, Account, Session rows exist.
SEED_USER_EMAIL=<your gmail> npx prisma db seed → 10 notes appear in Studio linked to your user.
Visit /login while signed in → redirected to /notes. Sign out → back to /login.

Love it — and I see you've already pasted the plan into PLANNING.md, so it's tracked in the repo. From here on I'll be your guide: I'll explain each step and why it works the way it does, you write the code, and I'll review as you go. Ask "why" anytime — that's the point.

Here's your first chunk of work. It's all setup, no code yet:

Step 0 — Accounts (browser work)
Neon (your database):

Sign up at neon.tech (free tier) and create a project — call it notes-app.
On the project dashboard, find the connection string (it'll look like postgresql://user:password@ep-something.aws.neon.tech/neondb?sslmode=require). Grab the pooled one. This is your DATABASE_URL.
Google OAuth client (so Google will let your app authenticate users):

Go to console.cloud.google.com → create a project.
APIs & Services → OAuth consent screen → External → fill in the app name and your email. You only need yourself as a test user.
APIs & Services → Credentials → Create Credentials → OAuth client ID → type "Web application".
Add authorized redirect URI: http://localhost:3000/api/auth/callback/google — this exact path is where Auth.js receives Google's response; the URL pattern is /api/auth/callback/{provider}.
Copy the Client ID and Client Secret.
Step 1 — Dependencies and env vars (terminal work)

npm install next-auth@beta @auth/prisma-adapter @prisma/client
npm install -D prisma tsx

Why each: next-auth@beta is Auth.js v5 (the App Router version — the stable v4 npm tag is the older pages-router API); @auth/prisma-adapter lets Auth.js persist users/sessions into your database; @prisma/client is the runtime query client while prisma (dev) is the CLI for migrations; tsx runs TypeScript scripts like the seed file.

Then create a .env file at the project root:

DATABASE_URL="postgresql://...your neon pooled string..."
AUTH_GOOGLE_ID="...client id..."
AUTH_GOOGLE_SECRET="...client secret..."
And run npx auth secret — it generates a random AUTH_SECRET and appends it to .env for you (Auth.js uses it to encrypt session cookies).

⚠️ Before you commit anything: check that .gitignore covers .env (Next's default template ignores .env\*, but verify — leaking these secrets to GitHub is the classic beginner mistake, and yes, bots scan for them within minutes).

A note on naming: Auth.js v5 auto-reads env vars named AUTH_GOOGLE_ID/AUTH_GOOGLE_SECRET — with those exact names you won't have to pass credentials explicitly in code later.

Ping me when that's done (or if any step looks different than described), and we'll write your Prisma schema — that's where the interesting modeling decisions live.
