namespace SolutionName.Abstractions.DomainModels;

using SolutionName.Abstractions.DataModels;

public interface IDomainStatus : IStatus
{
    string GetFriendlyStatus();
}
