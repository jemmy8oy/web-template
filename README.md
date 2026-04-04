# Personal Web Template

A high-performance monorepo template for .NET backends and React frontends, built on Clean Architecture principles.

## Stack

- **Backend**: .NET 10, Entity Framework Core, PostgreSQL, Scalar/OpenAPI
- **Frontend**: React, Vite, TypeScript, Redux Toolkit + RTK Query
- **Infrastructure**: Docker, Helm, Kubernetes

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) (local or Docker)
- `dotnet new` CLI

## Creating a New Project

### 1. Install the Template

```bash
dotnet new install /path/to/web-template
```

Or once published to NuGet:

```bash
dotnet new install Balenthiran.WebTemplate
```

### 2. Scaffold Your Project

Pass your solution name as `Company.ProjectName`:

```bash
dotnet new web-template -n Balenthiran.Apeify
```

This will generate:

```
Balenthiran.Apeify/
├── backend/
│   ├── Balenthiran.Apeify.Abstractions/
│   ├── Balenthiran.Apeify.DataModels/
│   ├── Balenthiran.Apeify.DomainModels/
│   ├── Balenthiran.Apeify.EntityModels/
│   ├── Balenthiran.Apeify.Services/
│   ├── Balenthiran.Apeify.Database/
│   ├── Balenthiran.Apeify.WebApi/
│   └── Balenthiran.Apeify.slnx
├── frontend/
├── scripts/
├── helm/
└── deploy.sh
```

### 3. Run the Onboarding Script

```bash
cd Balenthiran.Apeify
node scripts/init.mjs
```

This will:
- Prompt for your PostgreSQL connection details
- Generate `appsettings.Development.json` with a fresh JWT secret
- Generate `frontend/.env` with a unique project ID
- Run `dotnet restore` and `npm install`

### 4. Apply the Initial Migration

```bash
cd backend
dotnet ef database update --project Balenthiran.Apeify.Database --startup-project Balenthiran.Apeify.WebApi
```

### 5. Run the App

**Backend:**
```bash
cd backend
dotnet run --project Balenthiran.Apeify.WebApi
```

**Frontend:**
```bash
cd frontend
npm run dev
```

API docs available at: `http://localhost:5000/scalar/v1`

## Initialise as a New Git Repo

```bash
cd Balenthiran.Apeify
git init
git add .
git commit -m "Initial commit from web-template"
# Add your remote and push
```

## Kubernetes Deployment

### 1. Create the K8s Namespace

```bash
kubectl create namespace your-app
```

> This must match `KUBERNETES_NAMESPACE` in `deploy.sh` and `-n` in the commands below.

### 2. Provision a PostgreSQL Database

Create a PostgreSQL database on your cloud provider (e.g. OCI, AWS RDS, Supabase). Note down the connection string in the format:

```
Host=your-host;Database=your_db;Username=your_user;Password=your_password
```

### 3. Create the K8s Secret

```bash
kubectl create secret generic your-app-secrets \
  --from-literal=DATABASE_URL="Host=your-host;Database=your_db;Username=your_user;Password=your_password" \
  -n your-app
```

> **Important**: The secret name (`your-app-secrets`) must match `secretKeyRef.name` in `helm/values.yaml`.

### 4. Update Configuration

Update these two files before deploying:

**`helm/values.yaml`** — set `fullnameOverride`, domain, registry, and secret name.

**`deploy.sh`** — set `APP_NAME` to match `fullnameOverride` in `values.yaml`, and update `REGISTRY_NAMESPACE` and `COMPARTMENT_ID`.

### 5. Deploy

```bash
./deploy.sh
```

This will build and push Docker images, then trigger a rolling restart of both deployments.

## GitHub Actions

Two workflows are included in `.github/workflows/`:

| Workflow | Trigger | Purpose |
|---|---|---|
| `ci.yml` | Every push / PR | Builds backend (`dotnet build`) and frontend (`npm run build`) to catch compile errors |
| `docker-build-push.yml` | Manual (`workflow_dispatch`) | Builds ARM64 Docker images and pushes to OCI Container Registry |

### Required Secrets and Variables

Before using `docker-build-push.yml`, add these in your repository settings (**Settings → Secrets and variables**):

**Variables** (not secret, shown in logs):
- `OCIR_REGISTRY` — e.g. `lhr.ocir.io`
- `OCIR_NAMESPACE` — your OCI tenancy namespace

**Secrets** (encrypted):
- `OCIR_USERNAME` — e.g. `your-tenancy/oracleidentitycloudservice/your@email.com`
- `OCIR_AUTH_TOKEN` — OCI auth token (generated in OCI Console → User Settings → Auth Tokens)

Also update the `FRONTEND_IMAGE` and `BACKEND_IMAGE` env vars at the top of `docker-build-push.yml` to match your image names in `helm/values.yaml`.

### ARM64 Runner Note

The deploy workflow uses `ubuntu-24.04-arm` (native ARM64) to avoid QEMU emulation overhead. This runner is **free for public repositories**. For private repositories it requires a paid GitHub plan — see the comment at the top of `docker-build-push.yml` for the `ubuntu-latest` + QEMU alternative.

## Project Structure

| Layer | Project | Responsibility |
|---|---|---|
| API | `*.WebApi` | Routes, DI, OpenAPI, Middleware |
| Services | `*.Services` | Business logic, AutoMapper |
| Abstractions | `*.Abstractions` | Interfaces, DTOs, Contracts |
| Database | `*.Database` | EF Core DbContext, Migrations |
| Entity Models | `*.EntityModels` | Database entities |
| Domain Models | `*.DomainModels` | Business-layer objects |
| Data Models | `*.DataModels` | Request/Response DTOs |
