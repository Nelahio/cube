FROM mcr.microsoft.com/dotnet/sdk:7.0 as build
WORKDIR /app
EXPOSE 80

COPY cube.sln cube.sln
COPY src/EnchereService/EnchereService.csproj src/EnchereService/EnchereService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/AuthentificationService/AuthentificationService.csproj src/AuthentificationService/AuthentificationService.csproj
COPY src/OffreService/OffreService.csproj src/OffreService/OffreService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj

RUN dotnet restore cube.sln

COPY src/OffreService src/OffreService
COPY src/Contracts src/Contracts
WORKDIR /app/src/OffreService
RUN dotnet publish -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT [ "dotnet", "OffreService.dll" ]