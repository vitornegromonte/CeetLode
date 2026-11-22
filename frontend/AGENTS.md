# React and JavaScript Rules

## Environment

- Use React, Vite, JavaScript, Tailwind CSS, React Router, and TanStack Query.
- Use Bun for dependency installation and project scripts.
- Do not introduce TypeScript in the MVP.
- Keep API calls inside the API client and TanStack Query hooks rather than components.

## Code Style

- Use functional components and hooks.
- Prefer named exports and small composable components.
- Use camelCase for variables/functions and PascalCase for components.
- Colocate a component with its focused tests.
- Keep components below roughly 200 lines; extract hooks and presentation pieces as needed.
- Use semantic HTML and accessible interaction patterns.

Example:

```jsx
export function SubmitReviewButton({ isSubmitting, onSubmit }) {
  return (
    <button
      type="button"
      className="rounded-md px-4 py-2"
      disabled={isSubmitting}
      onClick={onSubmit}
    >
      {isSubmitting ? "Submitting..." : "Submit review"}
    </button>
  );
}
```

## State Management

- Use React state for component-local UI state.
- Use URL state for filters and navigation state.
- Use TanStack Query for server state and caching.
- Use a global store only when state is shared across unrelated parts of the application.
- Do not use `useEffect` to synchronize state or repair data flow. Use event handlers, derived state during rendering, or external store subscriptions instead.
- Do not use `setTimeout`, `requestAnimationFrame`, `requestIdleCallback`, or other imperative timers to synchronize React state. Fix the state architecture at its source.

## Implementation Standards

- Implement declarative patterns that pass deterministic linting and static analysis.
- Do not add comments that justify workaround patches, quick fixes, or architectural hacks. Resolve the root issue in code.
- Do not use comments or suppressions as substitutes for correct types or architecture.

## UI and Accessibility

- Build loading, empty, error, saved, submitted, and reveal states intentionally.
- Ensure every interaction works by keyboard.
- Associate labels with form controls.
- Do not rely on color alone to convey status.
- Maintain contrast and test at 320px, 768px, 1024px, and 1440px.

## API Integration

- Read API contracts from FastAPI OpenAPI output.
- Normalize API errors into user-facing messages.
- Cancel or disable duplicate submissions while a request is in progress.
- Keep secrets and database access out of the browser code.

## Testing

- Use Vitest and Testing Library for component behavior.
- Use fast-check for property-based tests of pure transformations and state transitions.
- Use Playwright for critical browser workflows.
- Test draft save, final submission, reference reveal, and progress after submission.

Example:

```jsx
import { test } from "vitest";
import fc from "fast-check";
import { filterExercises } from "./filter-exercises";

test("exercise filtering never adds exercises", () => {
  fc.assert(
    fc.property(
      fc.array(fc.record({ title: fc.string(), difficulty: fc.string() })),
      fc.string(),
      (exercises, query) => {
        const result = filterExercises(exercises, query);
        assert.ok(result.every((exercise) => exercises.includes(exercise)));
      },
    ),
  );
});
```

## Boundary

- Never commit secrets or environment files.
- Ask before changing shared API contracts or adding dependencies.
- Do not add authentication or AI grading unless separately specified.
