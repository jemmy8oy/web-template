#!/usr/bin/env node
/**
 * init-issues.mjs
 *
 * Scaffolds the initial SDD orchestrator issues for a new project.
 * Run this once after the repo is pushed to GitHub.
 *
 * Prerequisites:
 *   - gh CLI installed and authenticated (gh auth login)
 *   - Run from the project root
 *
 * Usage:
 *   node scripts/init-issues.mjs
 */

import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

function log(msg) {
  console.log(`[init-issues] ${msg}`);
}

function gh(args) {
  return execSync(`gh ${args}`, { encoding: 'utf8' }).trim();
}

function ghSilent(args) {
  try {
    return execSync(`gh ${args}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch {
    return null;
  }
}

// ── Labels ────────────────────────────────────────────────────────────────────

const LABELS = [
  { name: 'waiting-for-ai', color: '7B61FF', description: "AI's turn — discuss, spec iterate, or implement" },
  { name: 'action-ready',   color: 'F9D0C4', description: 'Issue approved for implementation — AI should start coding' },
  { name: 'ai-error',       color: 'D93F0B', description: 'Claude encountered an error — needs human attention' },
];

function ensureLabels() {
  log('Creating labels...');
  for (const label of LABELS) {
    const existing = ghSilent(`label list --search "${label.name}" --json name -q ".[0].name"`);
    if (existing === label.name) {
      log(`  Label "${label.name}" already exists — skipping`);
    } else {
      gh(`label create "${label.name}" --color "${label.color}" --description "${label.description}"`);
      log(`  Created label "${label.name}"`);
    }
  }
}

// ── Milestone ─────────────────────────────────────────────────────────────────

const MILESTONE_TITLE = 'MVP';

function ensureMilestone() {
  log('Creating MVP milestone...');
  const existing = ghSilent(`api repos/{owner}/{repo}/milestones --jq '.[] | select(.title=="MVP") | .number'`);
  if (existing) {
    log(`  Milestone "${MILESTONE_TITLE}" already exists (#${existing}) — using it`);
    return MILESTONE_TITLE;
  }
  const number = gh(`api repos/{owner}/{repo}/milestones --method POST --field title="${MILESTONE_TITLE}" --field description="All initial SDD phases through to first launch" --jq '.number'`);
  log(`  Created milestone "${MILESTONE_TITLE}" (#${number})`);
  return MILESTONE_TITLE;
}

// ── Issues ────────────────────────────────────────────────────────────────────

const ISSUES = [
  {
    title: '[1a] Set up labels, pipeline secrets and variables',
    body: `## Summary

**Human action.** Configure labels and CI/CD pipeline secrets so the repo is ready for the AI workflow.

## Acceptance Criteria

- [ ] Three standard labels created on the repo:
  \`\`\`bash
  gh label create "waiting-for-ai" --color "7B61FF" --description "AI's turn — discuss, spec iterate, or implement"
  gh label create "action-ready"   --color "F9D0C4" --description "Issue approved for implementation — AI should start coding"
  gh label create "ai-error"       --color "D93F0B" --description "Claude encountered an error — needs human attention"
  \`\`\`
  *(These are also created by this script, so you may already be done.)*
- [ ] Repository **Variables** added (Settings → Secrets and variables → Variables):
  - \`OCIR_REGISTRY\` — e.g. \`lhr.ocir.io\`
  - \`OCIR_NAMESPACE\` — your OCI tenancy namespace
- [ ] Repository **Secrets** added (Settings → Secrets and variables → Secrets):
  - \`OCIR_USERNAME\` — e.g. \`tenancy/oracleidentitycloudservice/your@email.com\`
  - \`OCIR_AUTH_TOKEN\` — OCI auth token

## AI Notes

This issue is actioned by the developer, not the AI. Close it once labels and secrets are configured.
`,
  },
  {
    title: '[1b] Set up CI/CD pipeline and branch protection',
    body: `## Summary

**Human action.** Pipeline setup requires repository secrets, and branch protection rules require admin access the bot doesn't have.

## Acceptance Criteria

- [ ] CI workflow (\`.github/workflows/ci.yml\`) — build + test on every PR
- [ ] Docker build + push workflow (\`.github/workflows/docker-build-push.yml\`) — manual \`workflow_dispatch\`
- [ ] Branch protection on \`main\`: require PR, no direct push
- [ ] Branch protection on \`dev\`: require PR, no direct push
- [ ] **"Automatically delete head branches"** enabled (Settings → General)

Close this issue when done.
`,
  },
  {
    title: '[1c] Set up GitHub webhook',
    body: `## Summary

**AI action.** Apply \`waiting-for-ai\` to trigger.

Register the GitHub webhook on this repo so \`waiting-for-ai\` and \`action-ready\` labels automatically trigger Claude.

## Acceptance Criteria

- [ ] Webhook created on this repo:
  - URL: \`https://balenthiran.co.uk/webhooks/claude\`
  - Events: **Issues** + **Pull requests** only
  - Secret: from cluster secret \`GITHUB_WEBHOOK_SECRET\`
- [ ] Applying \`waiting-for-ai\` to an issue or PR triggers a Claude response without a manual Telegram prompt
- [ ] PR raised and merged (or issue closed once webhook is confirmed working)

## AI Notes

Trigger: \`waiting-for-ai\` applied to this issue.
Action: Use the GitHub API (\`gh api repos/{owner}/{repo}/hooks\`) to register the webhook. Confirm it's listed and active.
`,
  },
  {
    title: '[1d] High-level design discussion',
    body: `## Summary

**Casual conversation in this issue.** Fill in the questionnaire below with rough answers — bullet points are fine. Apply \`waiting-for-ai\` when ready and Claude will respond with questions and proposals.

Once the discussion settles, Claude will open a [1e] issue with a formal proposal for human review.

## Design Questionnaire

- **What problem does this product solve, and for whom?**

- **What does a successful MVP look like?**

- **What are the key user workflows?** (e.g. "auth", "create a report", "view a dashboard")

- **Are there external APIs, data sources, or third-party integrations?**

- **Auth requirements?** (none / email+password / OAuth — which providers?)

- **What is explicitly out of scope for MVP?**

### AI Behaviour Preferences

How should the AI handle ambiguity?

- [ ] **Assume & Document** — AI makes sensible assumptions, implements, lists all assumptions in the PR. Developer reviews and overrides. Fastest flow.
- [ ] **Ask First** — AI posts all clarifying questions before starting. Developer answers. Slower but developer retains more control.
- [ ] **Mixed** — AI asks for major architectural decisions; assumes for minor/stylistic choices (recommended default).

## AI Notes

Trigger: \`waiting-for-ai\` applied to this issue.
Action: Read the questionnaire answers, ask follow-up questions in a comment, and propose resolutions to any ambiguities. Iterate until consensus is reached. Note the AI Behaviour Preference selected — it will be recorded in \`docs/specs/proposal.md\` and governs how the AI handles ambiguity throughout the project. Once settled, raise a [1e] PR with the formal workflow + API proposal — then close this issue.
`,
  },
  {
    title: '[2] Backend skeleton',
    body: `## Summary

**AI action.** Apply \`waiting-for-ai\` to trigger (after [1e] PR is merged).

Stub all API endpoints from [1e] using simple DTOs and Faker-generated data — no EF Core entities yet. The DB design comes after the frontend validates the data shape.

## Acceptance Criteria

- [ ] All endpoints from [1e] implemented as .NET Minimal API routes
- [ ] Simple DTO classes (no EF Core entities — DB design comes in [4])
- [ ] Faker-generated responses from each endpoint (deterministic seed)
- [ ] OpenAPI spec auto-generated from the running app
- [ ] RTK Query codegen run — \`generatedApi.ts\` up to date
- [ ] PR raised and merged

## Dependencies

Depends on [1e] PR being merged.

## AI Notes

Trigger: \`waiting-for-ai\` applied to this issue.
Action: Read \`docs/specs/proposal.md\` from the merged [1e] PR. Add Minimal API route handlers for every endpoint. Use simple DTO classes and Bogus-generated data — no real DB queries yet. Run \`dotnet run\` to generate the OpenAPI spec, then run \`npm run codegen\` to update \`generatedApi.ts\`. Raise a PR.
`,
  },
  {
    title: '[3] Frontend MVP',
    body: `## Summary

**AI action.** Apply \`waiting-for-ai\` to trigger (after [2] is merged).

Implement all user workflows from [1e] as React pages, wired to the RTK Query hooks from the skeleton backend.

## Acceptance Criteria

- [ ] All user workflows from [1e] implemented as React pages/components
- [ ] Wired to RTK Query hooks (Faker data from [2] skeleton backend)
- [ ] Every workflow is functional end to end — nothing is a dead end
- [ ] Minimal styling — MVP, not a polished product
- [ ] PR raised and merged

## Dependencies

Depends on [2] (backend skeleton) being merged.

## AI Notes

Trigger: \`waiting-for-ai\` applied to this issue.
Action: Implement all user workflows from \`docs/specs/proposal.md\` as React components using the generated RTK Query hooks. Keep styling minimal. Raise a PR once all workflows are functional end to end.
`,
  },
  {
    title: '[4] DB entity design + migrations',
    body: `## Summary

**AI action.** Apply \`waiting-for-ai\` to trigger (after [3] is merged).

Now that the frontend has validated the data shape, design the real EF Core entities and create the initial migration.

## Acceptance Criteria

- [ ] Mermaid ER diagram in the PR body
- [ ] EF Core entity classes in \`EntityModels/\`
- [ ] Relationships, indexes, and constraints defined
- [ ] Initial EF Core migration created and applied locally
- [ ] No business logic — schema only
- [ ] PR raised and merged

## Dependencies

Depends on [3] (frontend MVP) being merged.

## AI Notes

Trigger: \`waiting-for-ai\` applied to this issue.
Action: Read \`docs/specs/proposal.md\` and the existing DTO classes from [2] to understand the data shape the frontend uses. Design EF Core entities and relationships to match. Create the initial migration. Raise a PR with a Mermaid ER diagram and no service/business logic. After this is merged, open one [5] issue per backend feature.
`,
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function run() {
  log('Scaffolding initial SDD issues...');
  log('');

  const owner = gh(`repo view --json owner --jq .owner.login`).trim();
  log(`Repo owner: ${owner}`);
  log('');

  ensureLabels();
  log('');

  const milestone = ensureMilestone();
  log('');

  log(`Creating ${ISSUES.length} orchestrator issues...`);
  for (const issue of ISSUES) {
    const existing = ghSilent(`issue list --search "${issue.title}" --state all --json title -q ".[0].title"`);
    if (existing === issue.title) {
      log(`  SKIP  "${issue.title}" — already exists`);
      continue;
    }

    const bodyFile = join(tmpdir(), `issue-body-${Date.now()}.md`);
    writeFileSync(bodyFile, issue.body);

    gh(`issue create --title "${issue.title}" --body-file "${bodyFile}" --milestone "${milestone}" --assignee "${owner}"`);
    log(`  CREATED  "${issue.title}"`);

    try { unlinkSync(bodyFile); } catch { /* ignore */ }
  }

  log('');
  log('✅ Done. All initial SDD issues created.');
  log('   Next steps:');
  log('   1. Complete [1a] — add secrets, then close the issue');
  log('   2. Apply waiting-for-ai to [1b] to kick off CI/CD setup');
  log('   3. Apply waiting-for-ai to [1c] to set up the webhook');
  log('   4. Fill in [1d] questionnaire and apply waiting-for-ai to start the design discussion');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
