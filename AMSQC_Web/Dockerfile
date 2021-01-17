#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

#RUN apt-get update -yq \
    #&& apt-get install curl gnupg -yq \
    #&& curl -sL https://deb.nodesource.com/setup_14.x | bash \
    #&& apt-get install nodejs -yq

RUN apt-get update && apt-get install -y \
curl
CMD /bin/bash

#RUN apt-get update; apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_14.x |  bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["AMSQC_Web/AMSQC_Web.csproj", "AMSQC_Web/"]
RUN dotnet restore "AMSQC_Web/AMSQC_Web.csproj"
COPY . .
WORKDIR "/src/AMSQC_Web"
RUN dotnet build "AMSQC_Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AMSQC_Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AMSQC_Web.dll"]