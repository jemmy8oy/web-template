# Spec Driven Development (SDD) Workflow

A structured development process designed to get from idea to working MVP in as few passes as possible — with the AI doing the heavy lifting and the human reviewing and correcting, not answering endless questions.

## Core Philosophy

- **Behaviour first, appearance second** — define what the user can *do*, not what it looks like. Visual polish comes after something works.
- **AI proposes, human approves** — the AI should present concrete proposals with reasoning at every step. The human's job is to read, validate, and only speak up when something is wrong.
- **Minimal rounds** — each phase aims for one AI pass → one human review → merge. Avoid back-and-forth by front-loading decisions.
- **DB before code** — entity design drives EF Core migrations which drive the skeleton. Never write service logic against an undefined schema.
- **Numbered phases are scaffolding** — the [1]–[5] numbering is for the structured early lifecycle only. After [5] the project is a normal living codebase with issues raised as needed.

---

## Phase Overview

| Phase | Name | Who leads | Output |
|-------|------|-----------|--------|
| [1a] | Project setup | Human | Repo created, bot access granted, secrets configured |
| [1b] | CI/CD setup | AI | Pipeline, branch protection, image build wired |
| [1c] | Webhook setup | AI | `waiting-for-ai` label workflow live on the repo |
| [1d] | High-level design discussion | Human + AI | Agreed user workflows, external deps, auth approach |
| [1e] | Formal workflow + API proposal | AI | Structured doc: all workflows, endpoints, dependencies |
| [2] | DB entity design | AI | EF Core entities, relationships, initial migration |
| [3] | Backend skeleton | AI | All endpoints stubbed, wired to real schema, Faker data |
| [4] | Frontend MVP | AI | Functional UI wired to stub API — works, not polished |
| [5] | Backend — feature by feature | AI | Real business logic, feature by feature, TDD |

After [5]: normal project — issues raised incrementally as needed. No fixed numbering.

---

## Phase Detail

### [1a] — Project Setup
**Human action.**

- Create the GitHub repo
- Grant the bot's GitHub App access to the repo
- Configure repository secrets (CI/CD, OCIR credentials, etc.)
- Create the four standard labels: `waiting-for-ai`, `waiting-for-human`, `ai-error`, `action-ready`

```bash
gh label create "waiting-for-ai"    --color "7B61FF" --description "Waiting for Claude to pick this up"
gh label create "waiting-for-human" --color "0E8A16" --description "Claude is done — waiting for human review"
gh label create "ai-error"          --color "D93F0B" --description "Claude encountered an error — needs human attention"
gh label create "action-ready"      --color "F9D0C4" --description "Ready for the next action"
```

---

### [1b] — CI/CD Setup
**AI action.** Apply `waiting-for-ai` to the [1b] issue to trigger.

AI sets up:
- GitHub Actions CI pipeline (build + test on PR)
- Docker image build + push workflow (manual trigger)
- Branch protection rules for `main` and `dev`
- Helm chart base configuration

---

### [1c] — Webhook Setup
**AI action.** Apply `waiting-for-ai` to the [1c] issue to trigger.

AI registers the GitHub webhook on this repo:
- URL: `https://balenthiran.co.uk/webhooks/claude`
- Events: **Issues** + **Pull requests** only
- Secret: from cluster secret `GITHUB_WEBHOOK_SECRET`

After this, applying `waiting-for-ai` to any issue or PR on this repo will automatically trigger Claude.

---

### [1d] — High-Level Design Discussion
**Casual conversation in the issue.**

Human opens a [1d] issue and answers the following prompts (rough answers are fine):

- What problem does this product solve, and for whom?
- What does a successful MVP look like?
- What are the key user workflows? (e.g. "auth", "create a record", "view a dashboard")
- Are there external APIs, data sources, or third-party integrations?
- Auth requirements? (none / email+password / OAuth — which providers?)
- What is explicitly out of scope for MVP?

AI asks follow-up questions in the issue comments and proposes resolutions to any ambiguities. Once the discussion has settled, AI opens a [1e] issue.

**Goal:** consensus on scope and major architectural decisions before anything is formalised.

---

### [1e] — Formal Workflow + API Proposal
**AI opens as a new issue once [1d] discussion has settled.**

The [1e] issue contains a structured proposal:

```
## User Workflows

### Auth
- User registers with email + password
- User logs in
- User resets password via email link

### [Feature name]
- User can [action]
- User can [action]

## External Dependencies

| Dependency | Purpose | Notes |
|------------|---------|-------|
| SendGrid | Transactional email | Password reset, confirmations |
| Stripe | Payments | Post-MVP |

## Required API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Return JWT |
| GET  | /api/[resource] | ... |

## Open decisions (if any)
- [decision] — Proposal: [recommendation]. Rationale: [reason]. ✅ Unless you disagree?
```

Human reviews and comments. AI iterates until approved. Apply `waiting-for-ai` to hand back to AI after comments.

---

### [2] — DB Entity Design
**AI action.** Apply `waiting-for-ai` to the [2] issue to trigger.

AI produces a PR containing:
- Mermaid ER diagram
- EF Core entity classes in `EntityModels/`
- Relationships, indexes, and constraints
- Initial EF Core migration

No business logic. No service layer. Just the schema.

**Why before the skeleton?** EF Core entities are the foundation of the type system. Stubbing endpoints against a real schema (even with Faker data) means the API contract is correct from day one and codegen produces the right hooks.

---

### [3] — Backend Skeleton
**AI action.** Apply `waiting-for-ai` to the [3] issue to trigger.

AI produces a PR containing:
- All endpoints from [1e] stubbed in .NET Minimal API routes
- Faker-generated DTOs returned from each endpoint
- OpenAPI spec auto-generated from the running app
- RTK Query codegen run against the spec — `generatedApi.ts` up to date

**Goal:** a running API that returns realistic fake data for every endpoint, so the frontend can be built against real hooks.

---

### [4] — Frontend MVP
**AI action.** Apply `waiting-for-ai` to the [4] issue to trigger.

AI produces a PR containing:
- All user workflows from [1e] implemented as React pages/components
- Wired to RTK Query hooks (real API calls, Faker data on the backend)
- Functional — every workflow works end to end
- Unstyled / minimally styled — this is an MVP, not a polished product

**Goal:** a working, demonstrable product. Every workflow the human listed in [1d] is clickable.

---

### [5] — Backend — Feature by Feature
**One issue per feature. AI picks up each with `waiting-for-ai`.**

Replace stubbed endpoints with real business logic, feature by feature:
- Real DB queries via EF Core repositories
- Service layer with proper SRP (see `docs/specs/backend-srp.md`)
- Unit tests per service method (TDD — tests first)
- In-process integration tests for end-to-end workflows

Each [5] issue scopes to one feature (e.g. "implement auth endpoints", "implement [resource] CRUD"). One PR per issue.

The OpenAPI contract should not change during this phase — if a contract change is needed, flag it explicitly.

---

## Issue Numbering Convention

| Format | Meaning |
|--------|---------|
| `[1a]`, `[1b]`, `[1c]` | Setup orchestrator issues — one-off actions |
| `[1d]`, `[1e]` | Design discussion and proposal issues |
| `[2]`, `[3]`, `[4]` | Phase-level delivery issues — one per phase |
| `[5] Feature name` | Backend implementation — one per feature |

Post-[5] issues are not numbered. Use descriptive titles and `action-ready` / `waiting-for-ai` labels to drive the workflow.

---

## Considered Alternatives

When a meaningful design decision is made, the AI should document the rejected options in the PR body under a **"Considered alternatives"** table:

```markdown
## Considered alternatives
| Option | Reason rejected |
|--------|----------------|
| JWT stored in localStorage | XSS risk — httpOnly cookie chosen instead |
| Polling instead of webhooks | Higher latency and server load — webhooks preferred |
```

This prevents the same debate happening again and creates a searchable audit trail in git history.

---

## Tooling

| Concern | Tool |
|---------|------|
| Workflow & ER diagrams | Mermaid |
| API contract | OpenAPI (.NET routes + `dotnet run`) |
| Frontend API client | RTK Query (codegen from OpenAPI) |
| Fake data | Faker (.NET skeleton routes) |
| Backend unit tests | xUnit + Moq |
| In-process integration tests | xUnit + Moq (real services, external I/O mocked) |
| Frontend unit tests | Vitest + React Testing Library |

---

## Summary Flow

```
[1a] Project setup        (human)
[1b] CI/CD setup          (AI)
[1c] Webhook setup        (AI)
[1d] Design discussion    (human + AI, casual)
[1e] Formal proposal      (AI opens, human approves)
[2]  DB entity design     (AI → PR)
[3]  Backend skeleton     (AI → PR, Faker data)
[4]  Frontend MVP         (AI → PR, all workflows working)
[5]  Backend per feature  (AI → PR per feature, TDD)
     → normal project
```
