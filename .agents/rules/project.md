---
trigger: always_on
---

# Project Rules

## Branch Strategy

```
main  ← developer only, production-ready, never touched by the agent
 └── dev  ← integration branch, PRs are merged here by the developer
      └── {issue-number}-{description}  ← all agent work happens here
```

- **`main`**: managed by the developer only. Never commit or push to `main`.
- **`dev`**: the integration branch. Never commit or push directly to `dev`. All work reaches `dev` via a PR.
- **Feature branches**: always branch off `dev`, named `{issue-number}-{short-kebab-description}` (e.g. `42-user-registration-form`). All PRs target `dev`.
- **Branch deletion**: do not delete branches. Enable "Automatically delete head branches" in GitHub repository settings — GitHub will delete the feature branch after a PR is merged, and will never delete `dev` or `main`.

## GitHub Workflow

The developer interfaces via GitHub only — they do not have access to the local machine. All work must be visible via commits and PRs on the remote.

- When picking up a GH issue, follow `.agents/workflows/action-issue.md`
- When responding to PR review comments, follow `.agents/workflows/respond-to-pr.md`
- Never leave work uncommitted and unpushed at the end of a session
- Never merge your own PR

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
- Components should be small and focused.
- **Styling**: use SCSS. Each component gets its own `.scss` file co-located next to the `.tsx` file (e.g. `Navbar.tsx` + `Navbar.scss`). Shared design tokens, global resets, and reusable utilities live in `src/styles/` (e.g. `index.scss`, `_glass.scss`, `_layout.scss`). Do not write component-specific styles in global files, and do not use inline styles where a class can express the same thing.

## Infrastructure

- `deploy.sh` and `helm/values.yaml` contain app-specific values that must be updated per project — flag these to the user when onboarding a new project.
- `docker-build-push.yml` is triggered manually (`workflow_dispatch`) — it does not run automatically on push.
- `ci.yml` runs on pull requests only and only validates that the code builds — it does not push images.
