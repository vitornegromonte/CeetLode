# CeetLode Project Rules

## Scope

- CeetLode has separate React and FastAPI applications.
- Read `docs/architecture.md` before changing architectural boundaries or shared domain behavior.
- Keep backend implementation in `backend/` and frontend implementation in `frontend/`.
- Read the matching `AGENTS.md` before editing source in each application.
- Use `uv` for Python dependencies and commands; use `bun` for frontend dependencies and scripts.
- Preserve property-based test coverage at domain and pure-helper boundaries.

## Working Agreements

- Preserve the MVP boundaries: no accounts, leaderboards, or AI grading.
- Store curated exercises, submissions, rubrics, answers, and progress in PostgreSQL.
- Use migrations for every database schema change.
- Never commit secrets or environment files.
- Do not add dependencies or change schema without human approval.
- Run the smallest relevant test and lint commands before reporting a change complete.

## Repository Layout

```text
backend/       FastAPI and PostgreSQL implementation
frontend/      React/Vite browser application
docs/          Intent and architecture documents
```
