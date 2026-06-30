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
