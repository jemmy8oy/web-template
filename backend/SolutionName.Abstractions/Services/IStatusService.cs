using SolutionName.Abstractions.DataModels;
using SolutionName.Abstractions.DomainModels;

namespace SolutionName.Abstractions.Services;

public interface IStatusService
{
    Task<IDomainStatus> GetSystemStatusAsync();
}
