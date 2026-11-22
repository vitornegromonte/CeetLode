# Code Review Practice Intent

## Outcome

Build a local-first, LeetCode-inspired code-review practice app named CeetLode.

## User

The primary user is a developer practicing code analysis and optimization.

## Core Loop

1. Read a supplied code solution.
2. Explain what the code does and how it works.
3. Propose optimization opportunities and justify them.
4. Compare the submitted explanation with curated rubrics and a reference answer.

## MVP Constraints

- The app should run locally through Docker Compose with account-free FastAPI, PostgreSQL, Redis, and React services.
- Evaluation should use curated rubrics and revealable reference answers.
- The MVP should require both an explanation and an optimization proposal.

## Out of Scope

- Public platform features.
- Accounts and leaderboards.
- AI-generated grading or feedback.
