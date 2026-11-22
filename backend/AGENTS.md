# Python and FastAPI Rules

## Environment

- Use Python with FastAPI, Pydantic, SQLAlchemy 2, and Alembic.
- Use uv for virtual environments, dependency resolution, locked dependencies, script execution, and tool execution.
- Use `pyproject.toml` and `uv.lock` for Python dependency state.
- Store configuration in environment variables and validate it through Pydantic settings.

## Code Style

- Use explicit, descriptive names and snake_case for modules, functions, variables, and fields.
- Keep route functions thin; move use cases and database operations into services or repositories.
- Prefer small pure functions and dependency injection over module-level mutable state.
- Use type annotations on public functions, route parameters, service methods, and Pydantic models.
- Use Ruff formatting and lint conventions.

Example:

```python
from fastapi import APIRouter, Depends, status

router = APIRouter(prefix="/exercises", tags=["exercises"])


@router.get("/{exercise_id}")
async def get_exercise(
    exercise_id: int,
    service: ExerciseService = Depends(get_exercise_service),
) -> ExerciseResponse:
    return await service.get_exercise(exercise_id)
```

## API and Validation

- Validate request bodies and query parameters with Pydantic schemas.
- Return documented HTTP status codes and structured error bodies.
- Do not leak SQLAlchemy, database, or internal stack traces to clients.
- Use async endpoints only when the underlying stack is async; do not wrap blocking database calls in fake async behavior.
- Never expose SQLAlchemy models directly in API responses.
- Never call blocking I/O inside `async def` route handlers. This includes synchronous HTTP clients, synchronous database drivers, heavy file I/O, and `time.sleep()`.
- Inside `async def`, use async-native implementations such as `httpx`, async SQLAlchemy, or `aiofiles`.
- Use a standard `def` endpoint for blocking work so FastAPI executes it in a thread pool.

## Routers and Layering

- Router functions must handle only request validation, Pydantic response serialization, and delegation to services.
- Never place inline database queries, raw SQL, or business or ML pipeline logic in route handlers.
- Router modules must import only service interfaces and Pydantic schemas.
- Router modules must never import database sessions, raw database implementations, ML model definitions, or internal worker scripts.

## Database

- Use PostgreSQL as the database.
- Use Redis only for replaceable draft state. Finalized submissions and progress remain authoritative in PostgreSQL.
- Use SQLAlchemy models for persistence and Pydantic schemas for API contracts.
- Define schema changes in Alembic migrations.
- Use transactions for operations that must complete atomically.
- Avoid N+1 queries and unbounded list queries.

## Testing

- Use pytest for unit and integration tests.
- Use Hypothesis for property-based tests around pure domain rules and edge-prone transformations.
- Test route behavior, validation, database transactions, and migration paths.
- Do not rely on a production database for tests.
- Keep integration fixtures isolated and reset state between tests.

Example:

```python
from hypothesis import given, strategies as st


@given(st.text(), st.text())
def test_explanation_and_optimization_remain_separate(explanation, optimization):
    submission = build_submission(explanation, optimization)

    assert submission.explanation == explanation
    assert submission.optimization == optimization
```

Property tests should have meaningful preconditions and assert invariants rather than duplicating implementation logic. Retain Hypothesis-generated counterexamples by converting important failures into focused regression tests.

## Boundary

- Never commit secrets or database credentials.
- Ask before changing schema or adding dependencies.
- Do not add authentication or AI grading unless separately specified.
- Do not add comments or `# type: ignore` patches to justify hacks or bypass Pydantic validation.
- Do not add `# noqa` suppressions to bypass lint architecture. Resolve the root mismatch so Ruff and mypy pass cleanly.
