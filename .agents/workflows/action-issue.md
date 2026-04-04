# Workflow: Actioning a GitHub Issue

Use this workflow when picking up a GH issue for implementation.

**Important:** The developer is interfacing via GitHub only — they do not have access to the local machine. All progress must be visible via commits and pull requests. Pushing to the remote is how you communicate your work.

---

## Steps

### 1. Read the full issue before starting

Read the issue body AND all comments. The comments contain the negotiated spec — the final state of the discussion is the agreed implementation contract. Do not start until you have read everything.

### 2. Create a branch

Branch name format: `{issue-number}-{short-kebab-description}`

```bash
git checkout -b 42-user-registration-form
```

Always branch from the base branch (usually `dev`). Never work directly on `main` or `dev`.

### 3. Implement following TDD

Follow the top-down TDD flow in `docs/specs/testing-strategy.md`:
- Write unit tests first, then implement
- Commit after each meaningful unit of work — do not save everything for one large commit at the end

### 4. Commit and push frequently

Push after every meaningful commit. The developer cannot see your work until it is on the remote. Frequent pushes mean they can follow progress without waiting for a PR.

```bash
git push -u origin 42-user-registration-form
```

Commit messages should be descriptive enough to understand without reading the diff.

### 5. Create a pull request

Once the implementation is ready for review, open a PR:

- **Base branch:** `dev`
- **Title:** short, imperative description of what was done
- **Body:** must include `Closes #N` to auto-close the issue on merge, a summary of what was implemented, and any notes the reviewer needs to assess the work without running it locally (e.g. "the email is stubbed in tests — see `IEmailGateway` mock in the test setup")

```bash
gh pr create --base dev --head 42-user-registration-form \
  --title "Add user registration form" \
  --body "..."
```

### 6. Use the PR for all communication

If you have questions, concerns, or want to flag a decision, post them as comments on the PR — not only in a chat reply. The developer reviews via GitHub and may not see a chat response. A PR comment is the record.

### 7. Do not merge your own PR

Leave the PR open for the developer to review. They will leave comments, request changes, or approve and merge.

---

## Summary

```
Read issue + all comments
  ↓
Branch: {issue-number}-{description}
  ↓
Implement (TDD) → commit frequently → push frequently
  ↓
Open PR: Closes #N, describe work for GitHub-only review
  ↓
Await review
```
