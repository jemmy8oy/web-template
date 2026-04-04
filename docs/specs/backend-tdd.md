# Backend TDD & SRP Guide

This document covers the testing strategy and Single Responsibility Principle enforcement for the backend. These rules exist to keep code readable, navigable, and testable — and to make AI-assisted development predictable and safe.

## Single Responsibility Principle (SRP)

Every method should do exactly one thing. If you find yourself writing a method that fetches data *and* processes it *and* sends a notification, that is three methods.

### The Orchestrator Pattern

Complex business workflows are expressed as **orchestrator methods** — high-level methods that read like a plain-English description of the business process, delegating each step to a single-responsibility service.

```csharp
public async Task ProcessMonthlyReportAsync(Guid organisationId)
{
    var data        = await _dataService.FetchReportDataAsync(organisationId);
    var recipients  = await _contactsService.GetReportRecipientsAsync(organisationId);
    var report      = _reportGenerator.GenerateReport(data);
    var email       = _emailBuilder.BuildReportEmail(report, recipients);
    await _emailService.SendAsync(email);
}
```

Notice:
- The method name describes the business intent
- Each line is a single, named responsibility
- The method is self-documenting — no comments needed
- Every dependency is injected and named by what it does

This is the target for any method that coordinates more than one concern. The orchestrator itself contains no business logic — it only orchestrates.

### What counts as "one thing"?

A method does one thing if you can describe it with a single verb phrase that doesn't contain "and":

| Too broad | Single responsibility |
|---|---|
| `FetchAndProcessOrders` | `FetchOrders`, `ProcessOrder` |
| `ValidateAndSaveUser` | `ValidateUser`, `SaveUser` |
| `GenerateAndSendReport` | `GenerateReport`, `SendReport` |

### Service Naming & Grouping

Services are named by their single responsibility and grouped in the folder structure by domain area:

```
Services/
├── Reporting/
│   ├── ReportDataService.cs
│   ├── ReportGenerator.cs
│   └── ReportEmailBuilder.cs
├── Notifications/
│   ├── EmailService.cs
│   └── SmsService.cs
└── Users/
    ├── UserFetchService.cs
    └── UserValidationService.cs
```

Good service names make navigation trivial — you always know where to look.

---

## Top-Down TDD

Testing follows the same top-down direction as implementation. Start at the highest level of abstraction and work inward.

### The Flow

```
1. Write integration test scenarios (Phase 5 of SDD — what to test, not how)
2. Write unit test for the orchestrator (mock all dependencies)
3. Implement the orchestrator (tests pass immediately — mocks return expected data)
4. Move to the next level: write unit tests for each called service
5. Implement each service (tests pass)
6. Continue down to the leaves (repositories, utilities)
7. Implement integration tests (now the full dependency tree is known)
```

### Why top-down?

- You define the contract at each level before worrying about implementation
- Unit tests at the orchestrator level pass immediately since dependencies are mocked — you get fast feedback even before the dependency tree exists
- Each level is testable in isolation regardless of what's below it
- The final integration tests verify the full workflow and serve as regression guards

### Unit Test Structure (xUnit + Moq)

```csharp
public class MonthlyReportOrchestratorTests
{
    private readonly Mock<IReportDataService> _dataService = new();
    private readonly Mock<IContactsService> _contactsService = new();
    private readonly Mock<IReportGenerator> _reportGenerator = new();
    private readonly Mock<IEmailBuilder> _emailBuilder = new();
    private readonly Mock<IEmailService> _emailService = new();

    private MonthlyReportOrchestrator CreateSut() => new(
        _dataService.Object,
        _contactsService.Object,
        _reportGenerator.Object,
        _emailBuilder.Object,
        _emailService.Object
    );

    [Fact]
    public async Task ProcessMonthlyReport_SendsEmailToAllRecipients()
    {
        // Arrange
        var orgId = Guid.NewGuid();
        var data = new ReportData();
        var recipients = new List<Recipient> { new("a@b.com") };
        var report = new Report();
        var email = new Email();

        _dataService.Setup(x => x.FetchReportDataAsync(orgId)).ReturnsAsync(data);
        _contactsService.Setup(x => x.GetReportRecipientsAsync(orgId)).ReturnsAsync(recipients);
        _reportGenerator.Setup(x => x.GenerateReport(data)).Returns(report);
        _emailBuilder.Setup(x => x.BuildReportEmail(report, recipients)).Returns(email);

        // Act
        await CreateSut().ProcessMonthlyReportAsync(orgId);

        // Assert
        _emailService.Verify(x => x.SendAsync(email), Times.Once);
    }
}
```

Key conventions:
- One test class per service
- `CreateSut()` factory method keeps construction in one place
- Each test verifies one behaviour
- Mock names match the injected interface names

---

## Integration Tests

### Define scenarios first (Phase 5), implement last (end of Phase 6)

Integration test **scenarios** are defined during architecture design — they capture what end-to-end workflows must succeed. The actual test implementation is deferred until the full dependency tree is built, because only then do you know what infrastructure to set up and what (if anything) to stub at the boundary.

**Scenario definition (Phase 5):**
```
Scenario: Monthly report is processed for an active organisation
  Given an organisation with subscribers
  When ProcessMonthlyReportAsync is called
  Then the report is persisted
  And an email is sent to all subscribers
```

**Test implementation (end of Phase 6):**
```csharp
[Fact]
public async Task ProcessMonthlyReport_PersistsReportAndSendsEmail()
{
    // Uses a real DbContext (test database) and stubs only external email gateway
}
```

### What integration tests cover

- The full call chain from orchestrator to database
- EF Core migrations applied correctly
- Cross-service coordination (data created by one service is consumed correctly by another)
- Regression: once passing, these tests protect against breaking changes

### What integration tests do not cover

- Individual service logic (that's unit tests)
- UI behaviour (that's E2E)
- External APIs (stub at the gateway boundary)

---

## Frontend Testing (Vitest + React Testing Library)

Frontend unit tests follow the same spec-first philosophy:

- Write tests before implementing the component
- Tests describe component behaviour from a user's perspective, not implementation details
- A test is an executable spec step — it is more precise than prose

```tsx
// Navbar.test.tsx
describe('Navbar', () => {
  it('shows the active indicator on the current route', () => {
    render(<Navbar />, { wrapper: RouterWrapper('/boards') });
    expect(screen.getByText('Boards').closest('a')).toHaveClass('active');
  });
});
```

Use Vitest (not Jest) — it is native to Vite and requires no additional configuration.
