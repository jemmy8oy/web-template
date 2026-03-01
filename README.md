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
