# Implementation Plan: CeetLode MVP

## Overview

Build one complete code-review practice flow and the local infrastructure that supports it:

1. Docker Compose starts React/Vite, FastAPI, PostgreSQL, and Redis.
2. PostgreSQL stores the five seeded Python exercises, rubrics, reference answers, finalized submissions, rubric selections, and progress.
3. Redis stores seven-day drafts.
4. A user opens an exercise, saves a draft, submits an explanation and optimization, reveals the rubric/reference answer, and records progress.

## Architecture Decisions

- Separate React and FastAPI applications.
- React uses JavaScript, Vite, Bun, Tailwind, React Router, TanStack Query, and CodeMirror 6.
- FastAPI uses Python, uv, Pydantic, SQLAlchemy 2, Alembic, and async-native Redis/PostgreSQL clients where routes are async.
- PostgreSQL is the authoritative relational store.
- Redis stores only replaceable drafts with a seven-day TTL refreshed on save.
- Docker Compose owns local development, database initialization, and service networking.
- Final submissions are immutable and retain every attempt.

## Dependency Graph

```text
Docker Compose
  -> PostgreSQL migrations -> exercise/rubric/submission models
  -> Redis draft service
  -> FastAPI health/exercise/draft/submission API
  -> React API client/routes/workspace
  -> End-to-end code-review flow
```

## Task List

### Phase 1: Development Infrastructure

- [ ] Task 1: Scaffold Docker Compose and application containers.
- [ ] Task 2: Scaffold the uv-managed FastAPI project.
- [ ] Task 3: Scaffold the Bun-managed React/Vite project.
- [ ] Task 4: Configure PostgreSQL and Redis Compose services and health checks.
- [ ] Task 5: Establish database settings, Alembic, and test configuration.

### Checkpoint: Infrastructure

- [ ] `docker compose up --build` starts all four services.
- [ ] Frontend loads through Docker.
- [ ] FastAPI health endpoint succeeds.
- [ ] PostgreSQL and Redis pass readiness checks.

### Phase 2: Core Data and API

- [ ] Task 6: Add exercise, rubric, reference-answer, submission, and rubric-match migrations.
- [ ] Task 7: Add Pydantic contracts and SQLAlchemy models.
- [ ] Task 8: Seed five curated Python exercises.
- [ ] Task 9: Implement exercise list/detail endpoints.
- [ ] Task 10: Implement Redis draft get/save/delete endpoints.
- [ ] Task 11: Implement immutable final-submission endpoint and progress derivation.
- [ ] Task 12: Implement reveal and rubric-selection endpoint behavior.

### Checkpoint: API Slice

- [ ] Exercise, draft, submission, reveal, and progress API tests pass.
- [ ] Property tests cover response validation and draft/submission invariants.
- [ ] OpenAPI documents the complete exercise flow.

### Phase 3: Frontend Core Flow

- [ ] Task 13: Implement application shell, routes, API client, and providers.
- [ ] Task 14: Implement exercise library.
- [ ] Task 15: Implement code-review workspace with CodeMirror.
- [ ] Task 16: Implement save-draft and restore-draft behavior.
- [ ] Task 17: Implement final-submission validation and submission history.
- [ ] Task 18: Implement rubric/reference reveal and optional self-assessment.
- [ ] Task 19: Implement progress view.

### Checkpoint: Complete Vertical Slice

- [ ] Playwright covers opening, saving, submitting, revealing, and progress.
- [ ] Frontend component tests cover loading, error, empty, draft, submitted, and reveal states.
- [ ] Responsive smoke checks pass at 320, 768, 1024, and 1440 pixels.

### Phase 4: Quality and Reproducibility

- [ ] Task 20: Add fast-check and Hypothesis property suites.
- [ ] Task 21: Document local setup and Compose commands.
- [ ] Task 22: Add repository-wide lint/test scripts and final verification.

### Checkpoint: MVP Ready

- [ ] All backend tests pass.
- [ ] All frontend tests pass.
- [ ] Production-like Docker build succeeds.
- [ ] No secrets or generated dependency/build directories are tracked.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Redis draft keys have no tenant isolation | Drafts collide | Include exercise and local session identifiers in namespaced keys |
| Final submission and draft deletion are not coordinated | Stale drafts survive submission | Finalize and invalidate the draft through one service operation |
| Docker Compose startup races | Services fail transiently | Add health checks and API retry/start rules |
| JavaScript property tests target implementation details | False confidence | Test public behavior and pure invariant helpers |
| Seed data and migrations drift | Recreated environments differ | Version seed data and test repeatable reset |

## Open Questions

- Draft key/session ownership for future multi-device support.
- Exercise difficulty naming values.
- Submission text maximum lengths.
- Final submission confirmation UX.
- Rubric selection persistence detail.
