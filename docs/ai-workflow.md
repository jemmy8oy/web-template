# AI-Assisted Project Workflow

This document describes the end-to-end workflow for projects bootstrapped from this template. It covers the full lifecycle from project creation through to a working MVP, and defines conventions the AI agent follows throughout.

---

## Phase 0 — Bootstrap

> No GitHub issues. One-off actions performed once when the project is created.

1. Developer creates the GitHub repo and grants the bot's GitHub App access
2. AI scaffolds the project from this template and pushes the initial commit
3. AI creates all **initial issues** (see table below) with the `MVP` milestone
4. Developer adds the four standard labels (see [1a])

---

## Initial Issues

Created automatically at bootstrap. Apply `waiting-for-ai` to each when ready to trigger the AI.

| ID   | Title |
|------|-------|
| [1a] | Set up labels, pipeline secrets and variables |
| [1b] | Set up CI/CD pipeline and branch protection |
| [1c] | Set up GitHub webhook |
| [1d] | High-level design discussion |
| [1e] | *(AI creates this from [1d] discussion)* Formal workflow + API proposal |
| [2]  | Backend skeleton |
| [3]  | Frontend MVP |
| [4]  | DB entity design + migrations |
| [5] *per feature* | Backend implementation — one issue per feature |

> **[1e]** is not created at bootstrap — the AI raises a PR once [1d] discussion reaches consensus.
> **[5] issues** are not created at bootstrap — the AI opens one per feature once [4] is merged.

---

## Issue Numbering Convention

| Format | Meaning |
|--------|---------|
| `[1a]`–`[1c]` | Setup orchestrator issues — human action or one-off AI task |
| `[1d]`–`[1e]` | Design discussion and proposal — conversational then formal |
| `[2]`, `[3]`, `[4]` | Phase delivery issues — one per phase, AI raises a PR |
| `[5] Feature name` | Backend implementation — one per feature, AI raises a PR |

Post-[5] issues are not numbered. Use descriptive titles and the label system to drive work.

---

## Full Workflow

### [1a] — Labels, Pipeline Secrets and Variables
**Human action.**

- Create the four standard labels on the repo:

```bash
gh label create "waiting-for-ai"    --color "7B61FF" --description "Waiting for Claude to pick this up"
gh label create "ai-error"          --color "D93F0B" --description "Claude encountered an error — needs human attention"
gh label create "action-ready"      --color "F9D0C4" --description "Ready for the next action"
```

- Configure CI/CD pipeline secrets in repository settings
- Close the issue when done

---

### [1b] — CI/CD Pipeline and Branch Protection
**Human action.** Pipeline setup requires repository secrets, and branch protection rules require admin access the bot doesn't have.

Human sets up:
- GitHub Actions CI workflow (`.github/workflows/ci.yml`) — build + test on every PR
- Docker image build + push workflow (`.github/workflows/docker-build-push.yml`) — manual `workflow_dispatch`
- Branch protection rules for `main` and `dev` (Settings → Branches)
- **"Automatically delete head branches"** enabled (Settings → General)

Close the issue when done.

---

### [1c] — GitHub Webhook Setup
**AI action.** Apply `waiting-for-ai` to trigger.

AI registers the webhook on this repo:
- URL: `https://balenthiran.co.uk/webhooks/claude`
- Events: **Issues** + **Pull requests** only
- Secret: from cluster secret `GITHUB_WEBHOOK_SECRET`

After this, applying `waiting-for-ai` to any issue or PR on this repo will automatically trigger Claude without a manual Telegram prompt.

---

### [1d] — High-Level Design Discussion
**Casual conversation in the issue.** Human opens with rough answers to:

- What problem does this product solve, and for whom?
- What does a successful MVP look like?
- What are the key user workflows? (e.g. "auth", "create a report", "view a dashboard")
- External APIs, data sources, or third-party integrations?
- Auth requirements? (none / email+password / OAuth providers)
- What is explicitly out of scope for MVP?

AI responds with follow-up questions and proposals for any ambiguities. Once settled, AI opens [1e].

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
**AI action.** Apply `waiting-for-ai` to trigger.

AI raises a PR containing:
- All endpoints from [1e] stubbed as .NET Minimal API routes
- Simple DTO classes (no EF Core entities yet — DB design comes after the frontend validates the shape)
- Faker-generated responses from each endpoint (deterministic seed)
- OpenAPI spec auto-generated from the running app
- RTK Query codegen run — `generatedApi.ts` up to date

---

### [3] — Frontend MVP
**AI action.** Apply `waiting-for-ai` to trigger.

AI raises a PR containing:
- All user workflows from [1e] implemented as React pages/components
- Wired to RTK Query hooks (Faker data from skeleton backend)
- Every workflow is functional end to end
- Minimal styling — MVP, not a polished product

---

### [4] — DB Entity Design
**AI action.** Apply `waiting-for-ai` to trigger (after [3] is merged).

Now that the frontend validates the data shape, AI raises a PR containing:
- Mermaid ER diagram
- EF Core entity classes in `EntityModels/`
- Relationships, indexes, and constraints
- Initial EF Core migration

No business logic. Schema only.

---

### [5] — Backend — Feature by Feature
**AI opens one issue per feature after [4] is merged.**

Each [5] issue scopes to one feature. AI raises one PR per issue:
- Real DB queries via EF Core
- Service layer (see `docs/specs/backend-srp.md`)
- Unit tests first (TDD)
- In-process integration tests for end-to-end workflows

API contracts should not change during [5] — flag any needed contract changes explicitly.

---

## Post-[5]

Formal phases end here. The project becomes a normal living codebase:
- Human raises issues as needed (bugs, features, UI polish)
- Apply `waiting-for-ai` or `action-ready` to hand work to the AI
- No numbering scheme required

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready — merged from `dev` by the **human developer** only |
| `dev` | Integration branch — all PRs target `dev` |
| `feat/*`, `fix/*`, `docs/*` | Short-lived work branches — always from `dev`, always PR to `dev` |

**Never PR directly to `main`.** The AI always sets `dev` as the base branch.

---

## PR ↔ Issue Linking

When the AI raises a PR for an issue, it:
1. Includes `Closes #N` in the PR body
2. Posts a comment on the issue: *🤖 PR raised: #N — please review when ready.*
3. Assigns the PR to the repo owner

---

## Label-Driven Turns

Labels signal whose turn it is to act.

| Label | Meaning |
|-------|---------|
| `waiting-for-ai` | AI's turn — read the issue, respond with a comment. Discussion only, no implementation. |
| `action-ready` | AI's turn — implement the task and raise a PR. No discussion needed. |
| `ai-error` | Claude hit an error — human needs to review and re-apply the trigger label to retry. |

**No `waiting-for-human` label.** Anything without a trigger label is implicitly the human's turn — no label is needed to signal this.

**On `action-ready`:** if the AI has a blocking question it cannot resolve, it removes `action-ready` and posts a comment. Developer answers and re-applies `action-ready` to proceed.

No label = idle/backlog.

---

## Milestone

All initial issues are assigned to the **MVP** milestone for a single-view progress dashboard.
