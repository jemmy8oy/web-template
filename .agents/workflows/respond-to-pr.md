# Workflow: Responding to PR Review Comments

Use this workflow when the developer has left comments on a pull request.

**Important:** The developer is interfacing via GitHub only. They cannot pull and run your changes locally in real time. Every change you make must be pushed so they can see it. Replying to a comment with text alone is not enough — the code change must be visible on the remote.

---

## Steps

### 1. Read all comments before making any changes

Read every comment on the PR before touching the code. Some comments may be related, and addressing them in the wrong order can create conflicts or make earlier replies misleading.

### 2. Assess each comment

For each comment, decide:
- **Implement the change** — clear request, agreed upon
- **Ask a clarifying question** — ambiguous, don't guess; reply on the comment thread before acting
- **Push back with reasoning** — if you disagree, explain why before implementing; don't silently implement something you think is wrong

### 3. Make focused commits per change

Address comments in focused, separate commits where possible. This makes it easy for the developer to see exactly what changed in response to their feedback.

```bash
git commit -m "Address PR feedback: extract validation into separate method (#42)"
```

Reference the issue or PR number in the commit message where relevant.

### 4. Push after every commit

```bash
git push
```

The developer sees your responses via the commit history on the PR. Push after each commit — do not batch everything and push once at the end.

### 5. Reply to each comment

After pushing the relevant commit, reply to each comment on GitHub explaining:
- What you changed and why
- If you pushed back, your reasoning
- If clarification was needed and you're waiting, say so explicitly

Do not leave comments unacknowledged.

### 6. Post a summary comment when done

Once all comments have been addressed and commits pushed, post a single PR comment summarising what was changed and flagging anything that still needs a decision or that you are unsure about. The developer reviews via GitHub — do not rely on a chat reply to communicate this.

### 7. Do not re-request review or mark conversations resolved

Leave that to the developer. They will resolve conversations and re-review when ready.

---

## Summary

```
Read ALL comments first
  ↓
For each comment: implement / clarify / push back
  ↓
Focused commit per change → push immediately
  ↓
Reply to each comment on GitHub explaining the change
  ↓
Await re-review
```
