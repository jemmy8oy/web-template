# Spec Driven Development (SDD) Workflow

A structured, iterative development process designed to maximise in-chat planning before any code is written — ensuring the full scope of the application is understood before committing to implementation.

## Core Philosophy

- **Iterate in chat first** — decisions made in chat are cheap; decisions made in code are expensive.
- **Defer implementation details** — don't think about databases or frameworks until the product shape is fully understood.
- **Let the spec drive the code** — user stories, mockups, and API contracts are the source of truth.
- **Tests are a spec artefact** — a unit test is a more precise, executable version of a spec step. Writing tests before implementation is not extra work; it is the spec becoming code.

---

## The Six Phases

### Phase 1 — Vision & High-Level Planning
**In chat**

Align on what we are building and why before any decomposition.

**Activities:**
- Define the product vision in 2–3 sentences
- List the core problems being solved
- Identify the primary user personas
- Agree on MVP scope boundaries — what is explicitly out of scope for POC

**Outputs:**
- Vision statement
- High-level backlog (epics + top-level features)
- Initial out-of-scope list

---

### Phase 2 — Feature Breakdown & User Stories
**In chat**

Decompose features into user stories at a high level — establishing what the app needs to do, not how.

**Activities:**
- Write high-level user stories: *As a [persona], I want to [action] so that [outcome]*
- Flag stories that are unclear or need design input
- Identify obvious technical risks or unknowns

**Outputs:**
- Story list per feature
- List of open questions / unknowns

---

### Phase 3 — UI/UX Design
**In chat — ASCII + Mermaid**

Fully design the user-facing product before touching a component. Every meaningful page state and user journey should be covered.

**Activities:**
- User journey mapping — narrative descriptions of key workflows
- ASCII mockups — for each page / modal / drawer, iterate until signed off
- Data flow consideration — what data is displayed, where it comes from, what mutations occur
- UI user stories — written as each screen is signed off

**Outputs:**
- Signed-off ASCII mockup per page/state
- Data flow notes (Mermaid where appropriate)
- UI user stories attached to features

**Why ASCII mockups?**
ASCII mockups can be reviewed, critiqued, and iterated entirely within the chat window — no screenshots, no build steps, no rendering pipeline. Once the design is locked in ASCII, translating it to React is straightforward because the component structure is already implicit in the layout.

---

### Phase 4 — UI + Skeleton Backend
**Implementation**

Build a fully navigable, fully wired-up frontend backed by faked endpoints. The app should look and behave like the real thing — just no real data.

**Activities:**
- Scaffold routes in .NET — one route per endpoint, returning Faker-generated DTOs
- Generate OpenAPI spec from the running skeleton app
- Run codegen to produce RTK Query hooks from the OpenAPI spec
- Implement the frontend using generated hooks — no hardcoded data
- Deploy to scratch environment for interactive QA and sign-off
- Write backend user stories as each route is faked

**Outputs:**
- Fully functional skeleton app (deployed to scratch)
- Complete OpenAPI spec
- Backend user stories for every endpoint

---

### Phase 5 — Backend Architecture & DB Design
**In chat**

Now that the full scope of business contracts is known, design the backend before writing any implementation code.

**Activities:**
- Entity design — identify domain entities from API contracts, draw ER diagram in Mermaid
- EF Core model design — define entities, relationships, indexes, and constraints
- Service/repository architecture — agree on layering, service decomposition, and cross-cutting concerns
- Define integration test scenarios — capture what end-to-end workflows must be verified (these are implemented in Phase 6 once the dependency tree is known)
- Architectural Decision Records (ADRs) — capture significant decisions as short notes in `docs/`

**Outputs:**
- Mermaid ER diagram
- EF Core entity list with key properties
- Service layer outline (see `docs/specs/backend-architecture.md`)
- Integration test scenarios (what, not how)
- ADR notes for significant decisions

---

### Phase 6 — Backend Implementation
**Story by story, test first**

Replace faked skeleton endpoints with real business logic, backed by the designed database. Follow top-down TDD — see `docs/specs/backend-tdd.md` for the full process.

**Activities:**
- Work story by story from the backend user story list
- Each story: write unit tests for the service → implement → wire to repository → write EF Core migration
- Verify against the frontend in the scratch environment
- The OpenAPI spec should not change during this phase — flag any contract changes explicitly
- Implement integration tests once the full dependency tree is built

**Outputs:**
- Production-ready backend
- EF Core migrations
- Unit tests per service
- Integration tests covering the scenarios defined in Phase 5
- Verified end-to-end feature set

---

## Tooling Conventions

| Concern | Tool |
|---|---|
| UI Mockups | ASCII (in-chat) |
| Architecture / Data flow | Mermaid diagrams |
| API contract generation | OpenAPI (.NET routes) |
| Frontend API client | RTK Query (codegen) |
| Fake data | Faker (.NET skeleton routes) |
| PR / QA review | Scratch environment deployment |
| Backend unit tests | xUnit + Moq |
| Frontend unit tests | Vitest + React Testing Library |
| Integration tests | xUnit + real DB (test container or local) |

---

## Summary Flow

```
1. Vision & Planning          (chat)
2. Feature Breakdown          (chat)
3. UI/UX Design               (chat — ASCII + Mermaid)
4. UI + Skeleton Backend      (implementation)
5. Backend Architecture       (chat — Mermaid + ADRs)
6. Backend Implementation     (TDD, story by story)
```
