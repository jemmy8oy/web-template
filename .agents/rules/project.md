---
trigger: always_on
---

# Project Rules

## Documentation

- When you introduce a new pattern, architectural decision, or convention, update `CLAUDE.md` before the session ends.
- When a backend endpoint is added or changed, remind the user to run `npm run codegen` in `frontend/` to regenerate `generatedApi.ts`.
- If you discover a `CLAUDE.md` or `docs/specs/` entry that is wrong or stale, fix it in the same session.
- Do not create new doc files for one-off notes — commit messages are the right place for those.

## Backend

- New features follow the 7-layer checklist in `docs/specs/backend-architecture.md`.
- All new API endpoints must be registered within the `.WithOpenApi()` chain in `Program.cs` so they appear in the schema.
- Request models (`*Request`) must never include server-managed fields (`Id`, `CreatedAt`, `IsVerified`).
- Routes live in `Routes/` as extension methods — do not add routes directly in `Program.cs`.

## Frontend

- Never hand-edit `src/api/generatedApi.ts` — it is always overwritten by `npm run codegen`.
- Custom API endpoints (not covered by the OpenAPI schema) go in a separate file, not in `generatedApi.ts`.
- Components should be small and focused. Prefer vanilla CSS using the design system variables in `index.css` over inline styles where a class already exists.
- New nav links are added to `src/data/config.json` and wired into `Navbar.tsx`.

## Infrastructure

- `deploy.sh` and `helm/values.yaml` contain app-specific values that must be updated per project — flag these to the user when onboarding a new project.
- `docker-build-push.yml` is triggered manually (`workflow_dispatch`) — it does not run automatically on push.
- `ci.yml` runs on every push and PR and only validates that the code builds — it does not push images.
