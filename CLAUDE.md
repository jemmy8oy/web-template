# CLAUDE.md — web-template

A `dotnet new` monorepo template for .NET 10 + React 19 projects. Every new project you start should be scaffolded from this template — keep it in top shape.

## Tech Stack

| Layer | Tech |
|---|---|
| Backend | .NET 10, ASP.NET Core Minimal APIs, EF Core + PostgreSQL, AutoMapper, Scalar/OpenAPI |
| Frontend | React 19, TypeScript, Vite (Rolldown), Redux Toolkit + RTK Query |
| Infrastructure | Docker (multi-stage), Helm, Kubernetes (OCI) |

## Repository Structure

```
/
├── backend/                    # .NET solution — 7 projects, Clean Architecture
│   ├── SolutionName.WebApi/    # Entry point: routes, DI, OpenAPI
│   ├── SolutionName.Services/  # Business logic, AutoMapper profiles
│   ├── SolutionName.Abstractions/ # Service interfaces + model interfaces
│   ├── SolutionName.Database/  # EF Core DbContext + migrations
│   ├── SolutionName.EntityModels/ # Database entities (anemic POCOs)
│   ├── SolutionName.DomainModels/ # Rich business-layer objects
│   └── SolutionName.DataModels/   # Request/Response DTOs
├── frontend/                   # React + TypeScript Vite app
│   └── src/
│       ├── api/                # RTK Query: emptyApi, generatedApi (codegen), custom endpoints
│       ├── components/         # Reusable UI components
│       ├── context/            # React context for UI state (theme, etc.)
│       ├── data/               # config.json and any static JSON
│       ├── pages/              # Route-level page components
│       └── store/              # Redux store
├── scripts/init.mjs            # First-run onboarding: generates appsettings + .env
├── helm/                       # Helm chart for Kubernetes deployment
├── deploy.sh                   # Local CD: build, push images, restart K8s deployments
├── docs/specs/                 # Architecture decisions and how-to guides
└── .agents/                    # AI assistant rules and workflows
```

## Backend Architecture

See `docs/specs/backend-architecture.md` for the full rationale. Summary:

- **7-project Clean Architecture**: each layer has a single responsibility and defined dependency direction
- **Minimal APIs**: routes are grouped via extension methods in `Routes/`, no controllers
- **Layered mapping**: `WebApi/Mapper.cs` handles `DataModel ↔ DomainModel`; `Services/Mapper.cs` handles `Entity ↔ DomainModel`
- **Interface-driven**: `WebApi` only depends on interfaces from `Abstractions`
- **Auto-run migrations**: `Program.cs` calls `dbContext.Database.Migrate()` on startup

Adding a new feature means: add entity → add EntityModel → add DomainModel + interface → add DataModel → add Service + interface → add Route group.

## OpenAPI → Frontend Codegen

See `docs/specs/openapi-codegen.md` for the full workflow. Summary:

1. Run the backend: `dotnet run --project SolutionName.WebApi`
2. In `frontend/`: `npm run codegen`
3. This hits `http://localhost:5257/openapi/v1.json` and regenerates `src/api/generatedApi.ts`
4. Typed RTK Query hooks (e.g. `useGetStatusQuery`) are immediately available

**Never hand-edit `generatedApi.ts`** — it is always overwritten by codegen.

## Coding Conventions

- **Backend**: Minimal API style (route groups, no controllers). One route file per domain area. Service methods accept/return interfaces, not concrete types.
- **Frontend**: Small, focused components. SCSS for all styling — component-specific styles in a co-located `.scss` file (e.g. `Navbar.tsx` + `Navbar.scss`), shared design tokens and utilities in `src/styles/`. No utility frameworks (no Tailwind etc.).
- **Request models**: POST/PUT endpoints use dedicated `*Request` models — never expose server-managed fields (`Id`, `CreatedAt`) in requests.
- **Naming**: Backend placeholder prefix is `SolutionName.*` — replace wholesale when scaffolding a new project.

## Documentation Maintenance

- Update `CLAUDE.md` any time a new pattern, convention, or architectural decision is introduced.
- Update `docs/specs/` when a feature's design changes significantly.
- Do not create new doc files for one-off notes — those belong in commit messages.
- If a doc describes something that no longer matches reality, update or delete it in the same session it was found.

## Running Locally

```bash
# Backend (Terminal 1)
cd backend
dotnet run --project SolutionName.WebApi
# API docs: http://localhost:5000/scalar/v1

# Frontend (Terminal 2)
cd frontend
npm run dev
# App: http://localhost:5173
```

## First-Time Setup

```bash
node scripts/init.mjs          # Generates appsettings.Development.json + frontend/.env
cd backend && dotnet ef database update --project SolutionName.Database --startup-project SolutionName.WebApi
```

## Deployment

Update `helm/values.yaml` and `deploy.sh` with your app name, registry, and domain, then:

```bash
./deploy.sh
```

GitHub Actions workflows live in `.github/workflows/`:
- `ci.yml` — runs on pull requests only: dotnet build + frontend build
- `docker-build-push.yml` — manual trigger only: builds ARM64 images and pushes to OCIR
