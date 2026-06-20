# Stage 1: Build .NET app
FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /source

# Copy solution and project files
COPY SolutionName.slnx .
COPY SolutionName.WebApi/*.csproj ./SolutionName.WebApi/
COPY SolutionName.Abstractions/*.csproj ./SolutionName.Abstractions/
COPY SolutionName.DataModels/*.csproj ./SolutionName.DataModels/
COPY SolutionName.DomainModels/*.csproj ./SolutionName.DomainModels/
COPY SolutionName.Services/*.csproj ./SolutionName.Services/
COPY SolutionName.EntityModels/*.csproj ./SolutionName.EntityModels/ 
COPY SolutionName.Database/*.csproj ./SolutionName.Database/
# Restore dependencies
RUN dotnet restore

# Copy all source files
COPY . .

# Build and publish
RUN dotnet publish SolutionName.WebApi/SolutionName.WebApi.csproj -c Release -o /app/publish

# Stage 2: Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine
WORKDIR /app
COPY --from=build /app/publish .

# Expose port (default ASP.NET Core port is 8080 in .NET 8+)
EXPOSE 8080

ENTRYPOINT ["dotnet", "SolutionName.WebApi.dll"]
