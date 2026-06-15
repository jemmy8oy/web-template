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
| [1b] | CI/CD setup | Human | Pipeline, branch protection, image build wired |
| [1c] | Webhook setup | AI | `waiting-for-ai` label workflow live on the repo |
| [1d] | High-level design discussion | Human + AI | Agreed user workflows, external deps, auth approach |
| [1e] | Formal workflow + API proposal | AI | PR: proposal doc with workflows, mermaid diagrams, endpoints |
| [2] | Backend skeleton | AI | All endpoints stubbed with Faker data, OpenAPI + RTK codegen |
| [3] | Frontend MVP | AI | Functional UI wired to stub API — works, not polished |
| [4] | DB entity design | AI | EF Core entities, relationships, initial migration |
| [5] | Backend — feature by feature | AI | Real business logic, feature by feature, TDD |
| [9] | Retrospective | AI | Retro docs in `docs/retros/`, template gap fix PRs |

After [5]: normal project — issues raised incrementally as needed. No fixed numbering. [9] is a milestone phase triggered when the project reaches end-of-cycle.

---

## Phase Detail

### [1a] — Project Setup
**Human action.**

- Create the GitHub repo
- Grant the bot's GitHub App access to the repo
- Configure repository secrets (CI/CD, OCIR credentials, etc.)
- Create the three standard labels: `waiting-for-ai`, `action-ready`, `ai-error`

```bash
gh label create "waiting-for-ai" --color "7B61FF" --description "AI's turn — discuss, spec iterate, or implement"
gh label create "action-ready"   --color "F9D0C4" --description "Issue approved for implementation — AI should start coding"
gh label create "ai-error"       --color "D93F0B" --description "Claude encountered an error — needs human attention"
```

No `waiting-for-human` label — anything without a trigger label is implicitly the human's turn.

---

### [1b] — CI/CD Setup
**Human action.** Pipeline setup requires repository secrets, and branch protection rules require admin access the bot doesn't have.

Human sets up:
- GitHub Actions CI pipeline (`.github/workflows/ci.yml`) — build + test on every PR
- Docker image build + push workflow (`.github/workflows/docker-build-push.yml`) — manual trigger
- Branch protection rules for `main` and `dev` (Settings → Branches)
- **"Automatically delete head branches"** enabled (Settings → General)

Close the issue when done.

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

AI asks follow-up questions in the issue comments and proposes resolutions to any ambiguities. Once the discussion has settled, AI raises a [1e] PR.

**Goal:** consensus on scope and major architectural decisions before anything is formalised.

---

### [1e] — Formal Workflow + API Proposal
**AI raises a PR** once [1d] discussion has settled.

The PR adds `docs/specs/proposal.md` containing:
- **User workflow descriptions** — bullet-point list of what the user can do in each feature area
- **Mermaid flow diagrams** — one diagram per key workflow (auth, main CRUD flows, etc.)
- **Required API endpoints table** — method, path, and purpose for every endpoint
- **External dependencies table** — third-party services, auth providers, payment gateways
- **Open decisions** — any unresolved choices, each with a concrete recommendation and rationale

Human reviews and merges. Apply `waiting-for-ai` on the PR after comments to iterate.

---

### [2] — Backend Skeleton
**AI action.** Apply `waiting-for-ai` to the [2] issue to trigger.

AI produces a PR containing:
- All endpoints from [1e] stubbed as .NET Minimal API routes
- Simple DTO classes (no EF Core entities yet — DB design comes after the frontend validates the shape)
- Faker-generated responses from each endpoint (deterministic seed)
- OpenAPI spec auto-generated from the running app
- RTK Query codegen run — `generatedApi.ts` up to date

**Goal:** a running API with realistic fake data for every endpoint so the frontend can be built against real hooks.

---

### [3] — Frontend MVP
**AI action.** Apply `waiting-for-ai` to the [3] issue to trigger.

AI produces a PR containing:
- All user workflows from [1e] implemented as React pages/components
- Wired to RTK Query hooks (Faker data from skeleton backend)
- Functional — every workflow works end to end
- Unstyled / minimally styled — this is an MVP, not a polished product

**Goal:** a working, demonstrable product. Every workflow the human listed in [1d] is clickable.

---

### [4] — DB Entity Design
**AI action.** Apply `waiting-for-ai` to the [4] issue to trigger (after [3] is merged).

Now that the frontend has validated the data shape, AI produces a PR containing:
- Mermaid ER diagram
- EF Core entity classes in `EntityModels/`
- Relationships, indexes, and constraints
- Initial EF Core migration

No business logic. No service layer. Just the schema.

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

### [9] — Retrospective

**Triggered when:** Deployment is confirmed working or the project is at a natural stopping point.

**AI action.** Apply `action-ready` to trigger.

AI generates a retrospective in `docs/retros/<project-slug>/` covering:

| Document | Content |
|---|---|
| `00-overview.md` | POC timeline, what was built, open items at close |
| `01-process.md` | Phase-by-phase SDD assessment |
| `02-issues.md` | All issues categorised and assessed |
| `03-gaps.md` | Template gaps identified with proposed fixes |
| `04-technical.md` | Architecture decisions, bugs, technical debt |
| `05-recommendations.md` | Prioritised improvements for the next project |

The AI also opens PRs on `web-template` to apply any template fixes identified in the retro.

Human reviews and merges the retro PR.

---

## Issue Numbering Convention

| Format | Meaning |
|--------|---------|
| `[1a]`, `[1b]`, `[1c]` | Setup orchestrator issues — one-off actions |
| `[1d]`, `[1e]` | Design discussion and proposal issues |
| `[2]`, `[3]`, `[4]` | Phase-level delivery issues — one per phase |
| `[5] Feature name` | Backend implementation — one per feature |
| `[9]` | Retrospective — retro docs and template gap fix PRs |

Post-[5] issues are not numbered. Use descriptive titles and `action-ready` / `waiting-for-ai` labels to drive the workflow. [9] is a milestone phase triggered when the project reaches end-of-cycle.

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
[1b] CI/CD setup          (human)
[1c] Webhook setup        (AI)
[1d] Design discussion    (human + AI, casual)
[1e] Formal proposal      (AI → PR: workflows, mermaid, endpoints)
[2]  Backend skeleton     (AI → PR, Faker data)
[3]  Frontend MVP         (AI → PR, all workflows working)
[4]  DB entity design     (AI → PR, EF Core entities + migration)
[5]  Backend per feature  (AI → PR per feature, TDD)
     → normal project
[9]  Retrospective        (AI → retro docs + template fix PRs)
```
