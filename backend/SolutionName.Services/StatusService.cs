using SolutionName.Abstractions.DataModels;
using SolutionName.Abstractions.DomainModels;
using SolutionName.Abstractions.Services;
using SolutionName.DomainModels.Models;

namespace SolutionName.Services;

public class StatusService : IStatusService
{
    public Task<IDomainStatus> GetSystemStatusAsync()
    {
        IDomainStatus model = new DomainStatus
        {
            Version = "1.1.0-alpha",
            LastUpdated = DateTime.UtcNow
        };
        
        return Task.FromResult(model);
    }
}
