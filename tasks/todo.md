# CeetLode Implementation Tasks

## Phase 1: Development Infrastructure

- [x] Task 1: Scaffold Docker Compose and application containers.
  - Acceptance: Compose defines frontend, backend, PostgreSQL, and Redis services.
  - Verify: `docker compose config` and `docker compose up --build`.
  - Dependencies: None.
  - Scope: Medium.

- [x] Task 2: Scaffold the uv-managed FastAPI project.
  - Acceptance: FastAPI starts, exposes `/api/health`, uses Pydantic settings, and has a uv lock.
  - Verify: `uv sync --group dev`, `uv run pytest`, `uv run ruff check .`.
  - Dependencies: Task 1.
  - Scope: Medium.

- [ ] Task 3: Scaffold the Bun-managed React/Vite project.
  - Acceptance: React/Vite starts, uses JavaScript, and includes the approved dependencies.
  - Verify: `bun install`, `bun run build`, `bun run lint`, `bun run test`.
  - Dependencies: Task 1.
  - Scope: Medium.

- [ ] Task 4: Configure PostgreSQL and Redis services and health checks.
  - Acceptance: Both services are persistent, reachable by container names, and health-checked.
  - Verify: `docker compose ps` and service health checks.
  - Dependencies: Task 1.
  - Scope: Small.

- [ ] Task 5: Establish database settings, Alembic, and test configuration.
  - Acceptance: Backend has async settings, SQLAlchemy session setup, Alembic, and isolated test configuration.
  - Verify: Migration upgrade/downgrade smoke test.
  - Dependencies: Tasks 1 and 2.
  - Scope: Medium.

## Checkpoint: Infrastructure

- [ ] `docker compose up --build` starts all four services.
- [ ] Frontend loads through Docker.
- [ ] FastAPI health endpoint succeeds.
- [ ] PostgreSQL and Redis pass readiness checks.

## Phase 2: Core Data and API

- [ ] Task 6: Add exercise, rubric, reference-answer, submission, and rubric-match migrations.
  - Acceptance: PostgreSQL schema matches the MVP domain model.
  - Verify: Alembic upgrade/downgrade test.
  - Dependencies: Task 5.
  - Scope: Medium.

- [ ] Task 7: Add Pydantic contracts and SQLAlchemy models.
  - Acceptance: API schemas do not expose SQLAlchemy internals and validate fields.
  - Verify: Schema unit tests and Ruff.
  - Dependencies: Task 6.
  - Scope: Medium.

- [ ] Task 8: Seed five curated Python exercises.
  - Acceptance: Exercises cover pair lookup, nested-loop optimization, binary search, stack validation, and sliding window.
  - Verify: Seed integration test checks complete required content.
  - Dependencies: Task 6.
  - Scope: Medium.

- [ ] Task 9: Implement exercise list/detail endpoints.
  - Acceptance: Exercise list/detail endpoints return the minimal exercise data.
  - Verify: API integration tests.
  - Dependencies: Tasks 7 and 8.
  - Scope: Medium.

- [ ] Task 10: Implement Redis draft get/save/delete endpoints.
  - Acceptance: Drafts are replaceable, namespaced, and expire after seven days refreshed on save.
  - Verify: API integration and Redis TTL tests.
  - Dependencies: Tasks 4 and 7.
  - Scope: Medium.

- [ ] Task 11: Implement immutable final submission endpoint and progress.
  - Acceptance: Both fields contain 20 non-whitespace characters; attempts remain immutable; progress derives from finalized submissions.
  - Verify: API integration tests and Hypothesis validation tests.
  - Dependencies: Tasks 7 and 10.
  - Scope: Medium.

- [ ] Task 12: Implement reveal and rubric-selection behavior.
  - Acceptance: Reveal requires final submission and can persist optional user rubric selections.
  - Verify: API integration tests.
  - Dependencies: Task 11.
  - Scope: Medium.

## Checkpoint: API Slice

- [ ] Exercise, draft, submission, reveal, and progress API tests pass.
- [ ] Property tests cover response validation and draft/submission invariants.
- [ ] OpenAPI documents the complete exercise flow.

## Phase 3: Frontend Core Flow

- [ ] Task 13: Implement shell, routes, API client, and providers.
  - Acceptance: Library, workspace, submission, and progress routes exist with loading/error shells.
  - Verify: Frontend component tests and build.
  - Dependencies: Tasks 2 and 3.
  - Scope: Medium.

- [ ] Task 14: Implement exercise library.
  - Acceptance: Users can browse and open all five exercises.
  - Verify: Component and API integration tests.
  - Dependencies: Tasks 9 and 13.
  - Scope: Medium.

- [ ] Task 15: Implement CodeMirror code-review workspace.
  - Acceptance: Python code is visible with syntax highlighting and explanation/optimization fields are editable.
  - Verify: Component tests and responsive browser check.
  - Dependencies: Task 14.
  - Scope: Medium.

- [ ] Task 16: Implement save and restore draft behavior.
  - Acceptance: Draft text can be saved, restored, and deleted.
  - Verify: Component, API integration, and browser tests.
  - Dependencies: Tasks 10 and 15.
  - Scope: Medium.

- [ ] Task 17: Implement final submission validation and history.
  - Acceptance: Submission is blocked until both fields pass validation and attempts remain visible.
  - Verify: Component tests and Playwright final-submission flow.
  - Dependencies: Tasks 11 and 16.
  - Scope: Medium.

- [ ] Task 18: Implement rubric/reference reveal and self-assessment.
  - Acceptance: Reveal appears only after final submission and supports optional checklist selections.
  - Verify: Component and browser tests.
  - Dependencies: Tasks 12 and 17.
  - Scope: Medium.

- [ ] Task 19: Implement progress view.
  - Acceptance: Progress reflects finalized submissions across the exercise library.
  - Verify: Component and API integration tests.
  - Dependencies: Tasks 11 and 14.
  - Scope: Medium.

## Checkpoint: Complete Vertical Slice

- [ ] Playwright covers opening, saving, submitting, revealing, and progress.
- [ ] Frontend component tests cover loading, empty, error, draft, submitted, and reveal states.
- [ ] Responsive smoke checks pass at 320, 768, 1024, and 1440 pixels.

## Phase 4: Quality and Reproducibility

- [ ] Task 20: Add fast-check and Hypothesis property suites.
  - Acceptance: Pure helper/state invariants and domain validation are property-tested.
  - Verify: Focused property-test commands pass repeatedly.
  - Dependencies: Implementation tasks.
  - Scope: Medium.

- [ ] Task 21: Document local setup and Compose commands.
  - Acceptance: A developer can start, reset, test, and stop the complete stack.
  - Verify: Fresh Docker Compose setup smoke test.
  - Dependencies: Core implementation.
  - Scope: Small.

- [ ] Task 22: Add final lint/test scripts and verify the MVP.
  - Acceptance: One documented command or script verifies relevant backend/frontend checks.
  - Verify: All test, lint, migration, build, and Compose checks pass.
  - Dependencies: All implementation tasks.
  - Scope: Medium.
