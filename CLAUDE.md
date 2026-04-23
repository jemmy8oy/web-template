# CLAUDE.md — web-template

A `dotnet new` monorepo template for .NET 10 + React 19 projects. Every new project you start should be scaffolded from this template.

## Tech Stack

| Layer | Tech |
|---|---|
| Backend | .NET 10, ASP.NET Core Minimal APIs, EF Core + PostgreSQL, AutoMapper, Scalar/OpenAPI |
| Frontend | React 19, TypeScript, Vite (Rolldown), Redux Toolkit + RTK Query |
| Infrastructure | Docker (multi-stage), Helm, Kubernetes (OCI) |

## Repository Structure

```
/
├── backend/                       # .NET solution — 7 projects, Clean Architecture
│   ├── SolutionName.WebApi/       # Entry point: routes, DI, OpenAPI
│   ├── SolutionName.Services/     # Business logic, AutoMapper profiles
│   ├── SolutionName.Abstractions/ # Service interfaces + model interfaces
│   ├── SolutionName.Database/     # EF Core DbContext + migrations
│   ├── SolutionName.EntityModels/ # Database entities (anemic POCOs)
│   ├── SolutionName.DomainModels/ # Rich business-layer objects
│   └── SolutionName.DataModels/   # Request/Response DTOs
├── frontend/                      # React + TypeScript Vite app
│   └── src/
│       ├── api/                   # RTK Query: emptyApi, generatedApi (codegen), custom endpoints
│       ├── components/            # Reusable UI components (each with co-located .scss)
│       ├── context/               # React context for UI state
│       ├── data/                  # config.json and static JSON
│       ├── pages/                 # Route-level page components
│       ├── store/                 # Redux store
│       └── styles/                # Global SCSS: design tokens, resets, utilities
├── scripts/init.mjs               # First-run onboarding: generates appsettings + .env
├── helm/                          # Helm chart for Kubernetes deployment
├── deploy.sh                      # Local CD: build, push images, restart K8s deployments
├── docs/specs/                    # Architecture decisions and how-to guides
└── .agents/                       # AI rules and workflows
```

## Key Docs

| Doc | What it covers |
|---|---|
| `docs/specs/backend-architecture.md` | 7-project Clean Architecture layer structure |
| `docs/specs/backend-srp.md` | SRP, orchestrator pattern, service naming |
| `docs/specs/openapi-codegen.md` | OpenAPI → RTK Query codegen workflow |
| `docs/specs/testing-strategy.md` | Unit tests, in-process integration tests, Vitest |
| `docs/specs/sdd-workflow.md` | 7-phase Spec Driven Development process |
| `.agents/rules/project.md` | Coding conventions, branch strategy, GitHub workflow rules |
| `.claude/skills/action-issue/SKILL.md` | How to pick up and implement a GH issue |
| `.claude/skills/respond-to-pr/SKILL.md` | How to respond to PR review comments |
| `.claude/skills/pr-readiness/SKILL.md` | Pre-PR checklist — naming, AutoMapper, typed results, architecture |

## Backend Architecture Quick Reference

> Full detail in `docs/specs/backend-architecture.md`. These are the rules needed most often.

### Model Naming

| Type | Naming | Project | Rule |
|---|---|---|---|
| Data model | Plain noun | `DataModels/` | What the API returns; implements `I*` from Abstractions |
| Domain model | `Domain*` | `DomainModels/` | Extends its DataModels counterpart (`DomainRatio : Ratio`) |
| Entity | `*Entity` | `EntityModels/` | EF Core mapping only |
| Inbound DTO | `*Request` | `DataModels/` | Only for non-trivial POST/PUT bodies — never for query params |
| Custom response | `*Response` | `DataModels/` | Only when the route assembles a shape the service does NOT directly return |

### Key Rules
- **Abstractions** — interfaces only; zero concrete types; no project references to concrete projects
- **Service interfaces** — always return interfaces (`IRatio`), never concrete types
- **Route handlers** — named static methods; typed results (`Ok<T>` / `Results<T1,T2>`); map via `IMapper`; no business logic
- **AutoMapper** — `WebApi/Mapper.cs` for Domain→Data (API boundary); `Services/Mapper.cs` for Entity→Domain (DB boundary)
- **Always run `.claude/skills/pr-readiness/SKILL.md` before opening a PR**

## Running Locally

```bash
# Backend (Terminal 1)
cd backend && dotnet run --project SolutionName.WebApi
# API: http://localhost:5000  |  Docs: http://localhost:5000/scalar/v1

# Frontend (Terminal 2)
cd frontend && npm run dev
# App: http://localhost:5173

# Regenerate API client after backend changes
cd frontend && npm run codegen
```

## First-Time Setup

```bash
node scripts/init.mjs   # generates appsettings.Development.json + frontend/.env
cd backend && dotnet ef database update \
  --project SolutionName.Database \
  --startup-project SolutionName.WebApi
```

## Deployment

```bash
./deploy.sh   # builds ARM64 images, pushes to OCIR, rolling restart in K8s
```

CI runs on PRs only (`ci.yml`). Image builds are manual (`docker-build-push.yml`, `workflow_dispatch`).

## GitHub Conventions

- **Branch target**: All PRs target `dev`. Never target `main` — `dev` → `main` is a human-only action.
- **PR assignment**: Every PR the AI raises must be assigned to `the repo owner`.
- **Issue assignment**: Every issue the AI acts on must be assigned to `the repo owner`.
- **Issue linking**: Every PR body must include `Closes #N`. The AI also comments on the issue: *🤖 PR raised: #N — please review when ready.*
- **Labels**: After pushing changes and commenting on a PR, always apply the `waiting-for-human` label and remove `waiting-for-ai`. Apply `waiting-for-ai` when handing back to the AI (e.g. after raising a review comment).

## [1e] Formal Proposal Template

When the AI opens a `[1e]` issue from a [1d] discussion, use this structure:

```
## User Workflows

### [Workflow name]
- User can [action]
- User can [action]

## External Dependencies

| Dependency | Purpose | Notes |
|------------|---------|-------|

## Required API Endpoints

| Method | Path | Purpose |
|--------|------|---------|

## Open decisions
- [decision] — Proposal: [recommendation]. Rationale: [reason]. ✅ Unless you disagree?
```
