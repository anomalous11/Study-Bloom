# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

### StudyBloom (`artifacts/studybloom`)
A full-featured React + Vite student study companion app. Frontend-only, all data in localStorage. No backend/API.

**Features:**
- Dashboard with daily quote, stat cards, upcoming exams, today's tasks
- Semester Syllabus: add subjects with exam dates and topics, file drop UI
- AI Study Resources: subject-based resource mapping (websites, YouTube, books, tips)
- To-Do List: tasks with priority/subject/due date, progress bar
- Weekly Timetable: click grid slots to schedule study blocks with color tags
- Pomodoro Timer: circular SVG timer, Web Audio API bell, session counter
- Mood Tracker: emoji check-in, 30-day calendar heatmap, weekly bar chart

**Aesthetic:** Pinterest/cottagecore soft academia — warm cream + dusty rose + sage green, Playfair Display headings, DM Sans body, smooth dark mode toggle.

**Tech:** React 18, Vite, Tailwind CSS, Wouter routing, CSS variables for theming.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
