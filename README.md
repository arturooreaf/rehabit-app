# Rehabit

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/status-in_progress-orange?style=flat-square)

The **online schedule for a physiotherapy clinic**: appointments, patients and treatment sessions in one place.

This is the frontend. It talks to [clinica-api](https://github.com/arturooreaf/clinica-api), a REST API built with Node.js, Express and PostgreSQL.

---

## Features

**Done**

- **Login** against the real API, with loading and error states.
- **Brand layout**: split screen with an animated panel that hides on small screens.
- **Accessible animations**: they respect the "reduce motion" system setting.

**Next**

- Routing (`/login`, `/register`, `/agenda`, `/patients`) with protected pages.
- Registration.
- Daily schedule of appointments.
- Patient list and treatment sessions.

## Tech stack

| Technology                  | Purpose                                     |
| --------------------------- | ------------------------------------------- |
| **React 19 + TypeScript**   | UI with static typing (strict mode)         |
| **Vite 8 + React Compiler** | Dev server, build and automatic memoization |
| **Tailwind CSS 4**          | Styling with utility classes                |
| **shadcn/ui**               | Accessible components (Radix UI)            |
| **Zustand**                 | Global state (session)                      |
| **zod**                     | Validation of API responses and env vars    |
| **ESLint + Prettier**       | Linting and formatting                      |
| **Vitest**                  | Tests                                       |

## Architecture

The code is organized **by feature**. Each feature has three layers, and each layer only talks to the next one:

```
LoginPage.tsx  →  auth.store.ts  →  auth.service.ts  →  clinica-api
  (renders)        (state)           (fetch + zod)
```

```
src/
├── features/
│   └── auth/              # login: page, store and service
└── shared/
    ├── components/ui/     # shadcn/ui components
    ├── config/env.ts      # the only file that reads env vars (validated with zod)
    ├── layouts/           # page frames (AuthLayout)
    └── lib/
```

- Components never call `fetch`; services never use React.
- Everything that comes from outside (API responses, env vars) is validated with zod.

## Security decisions

- The access token lives **in memory only**, never in `localStorage`.
- No secrets in `VITE_*` variables: they end up in the browser.
- The UI uses clearly fake demo data. No real patient data.

## Getting started

**Requirements:** Node.js 24 and [clinica-api](https://github.com/arturooreaf/clinica-api) running on `http://localhost:3000`.

```bash
git clone https://github.com/arturooreaf/rehabit-app.git
cd rehabit-app
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

### Environment variables

| Variable       | Example                 | Description             |
| -------------- | ----------------------- | ----------------------- |
| `VITE_API_URL` | `http://localhost:3000` | Base URL of clinica-api |

## Scripts

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Dev server on port 5173                   |
| `npm run build`     | Typecheck and production build in `dist/` |
| `npm run lint`      | ESLint                                    |
| `npm run format`    | Prettier                                  |
| `npm run typecheck` | TypeScript                                |
| `npm test`          | Vitest                                    |
| `npm run verify`    | Format check, lint, typecheck and tests   |
