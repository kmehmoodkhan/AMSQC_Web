#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["AMSQC_Web.csproj", "AMSQC_Web/"]
RUN dotnet restore AMSQC_Web/AMSQC_Web.csproj

COPY . .
WORKDIR /src

RUN apt-get update -y && apt-get install -y gnupg2 && curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get update -y && apt-get install -y nodejs
COPY ["ClientApp/package.json", "AMSQC_Web/ClientApp/"]

RUN npm install -g npm

RUN cd AMSQC_Web/ClientApp \
    && npm install --silent

RUN dotnet build "AMSQC_Web.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "AMSQC_Web.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "AMSQC_Web1.dll"]