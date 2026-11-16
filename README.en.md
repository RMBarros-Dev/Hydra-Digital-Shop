<p align="right"><strong>Language:</strong> <a href="README.md">Português (Brasil)</a> · <a href="README.en.md">English</a></p>

<p align="center"><img src="assets/brand/banner.svg" alt="Hydra Digital Shop banner" width="100%" /></p>
<p align="center"><img src="assets/brand/logo.svg" alt="Hydra logo" width="76" /></p>
<h1 align="center">Hydra Digital Shop</h1>
<p align="center"><strong>Full-Stack digital storefront study using ASP.NET Core, React and .NET Aspire.</strong></p>
<p align="center">
  <img src="https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white" alt=".NET 10" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <a href="https://github.com/RMBarros-Dev/Hydra-Digital-Shop/actions/workflows/ci.yml"><img src="https://github.com/RMBarros-Dev/Hydra-Digital-Shop/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI status" /></a>
  <a href="https://github.com/RMBarros-Dev/Hydra-Digital-Shop/actions/workflows/codeql.yml"><img src="https://github.com/RMBarros-Dev/Hydra-Digital-Shop/actions/workflows/codeql.yml/badge.svg?branch=main" alt="CodeQL status" /></a>
</p>

## Contents

- [01 · Overview](#01--overview)
- [02 · Context and Purpose](#02--context-and-purpose)
- [03 · Functional Scope](#03--functional-scope)
- [04 · Features and API Surface](#04--features-and-api-surface)
- [05 · Architecture](#05--architecture)
- [06 · Technology Stack](#06--technology-stack)
- [07 · Requirements](#07--requirements)
- [08 · Integrated Startup with Aspire](#08--integrated-startup-with-aspire)
- [09 · Start the Backend Separately](#09--start-the-backend-separately)
- [10 · Start the Frontend Separately](#10--start-the-frontend-separately)
- [11 · Repository Structure](#11--repository-structure)
- [12 · Configuration and Data](#12--configuration-and-data)
- [13 · Security](#13--security)
- [14 · Quality and Validation](#14--quality-and-validation)
- [15 · Known Limitations](#15--known-limitations)
- [16 · Development Methodology](#16--development-methodology)
- [17 · Documentation and Engineering Principles](#17--documentation-and-engineering-principles)
- [18 · License and Attribution](#18--license-and-attribution)

## 01 · Overview

Hydra Digital Shop is a Full-Stack learning project exploring integration between an ASP.NET Core API and a React/TypeScript Web interface. .NET Aspire coordinates local development components.

## 02 · Context and Purpose

The project models a digital game storefront to practice frontend/backend integration, service organization, relational persistence and local orchestration. It is an educational software project, not a commercial payment platform.

## 03 · Functional Scope

The repository documents a game catalogue, storefront pages, game details, a library view, cart interactions and a demonstrative checkout endpoint. Actual behavior should be checked against the current source code.

## 04 · Features and API Surface

- `GET /api/games` — retrieve the game catalogue.
- `POST /api/checkout` — demonstrative checkout endpoint.
- Storefront, library and game-detail interface pages.
- Game cards and cart drawer components.
- Cart state managed through React context.
- Local component coordination through .NET Aspire AppHost.

The checkout rejects unknown catalogue IDs and rounds monetary values to two decimal places. It does not integrate with a payment provider or move real money.

## 05 · Architecture

```mermaid
flowchart LR
  Browser[Browser] --> React[React 19 / TypeScript]
  React --> API[ASP.NET Core API]
  API --> EF[Entity Framework Core]
  EF --> DB[(SQL Server LocalDB)]
  Host[.NET Aspire AppHost] -. coordinates .-> React
  Host -. coordinates .-> API
```

The frontend and backend can be started independently or through the AppHost, depending on the development workflow.

## 06 · Technology Stack

| Layer | Technology |
|---|---|
| Backend | C#, .NET 10, ASP.NET Core |
| Persistence | Entity Framework Core, SQL Server LocalDB |
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS |
| Local orchestration | .NET Aspire |

## 07 · Requirements

- .NET 10 SDK.
- Node.js `^20.19.0` or `>=22.12.0`.
- npm.
- SQL Server LocalDB for the default local configuration.
- Visual Studio with .NET Aspire support is optional.

## 08 · Integrated Startup with Aspire

From the repository root:

```bash
dotnet restore "Hydra Digital Shop.slnx"
dotnet run --project "Hydra Digital Shop.AppHost/Hydra Digital Shop.AppHost.csproj"
```

Use AppHost logs to identify the local addresses assigned to each component.

## 09 · Start the Backend Separately

```bash
dotnet run --project "Hydra Digital Shop.Server/Hydra Digital Shop.Server.csproj"
```

The server exposes the documented API routes. Confirm the actual listening address in the application output.

## 10 · Start the Frontend Separately

```bash
cd frontend
npm install
npm run dev
```

When running outside Aspire, set `VITE_API_URL` to the API base URL. The current frontend code uses `http://localhost:5000` as a fallback when the variable is not defined.

## 11 · Repository Structure

```text
Hydra-Digital-Shop/
├── Hydra Digital Shop.AppHost/
│   ├── AppHost.cs
│   └── Hydra Digital Shop.AppHost.csproj
├── Hydra Digital Shop.Server/
│   ├── Data/
│   ├── Program.cs
│   └── Hydra Digital Shop.Server.csproj
├── frontend/
│   ├── src/components/
│   ├── src/context/
│   ├── src/data/
│   ├── src/pages/
│   ├── package.json
│   └── vite.config.ts
├── assets/brand/
├── CHANGELOG.md
└── Hydra Digital Shop.slnx
```

## 12 · Configuration and Data

Use environment variables for environment-specific configuration. The default server configuration uses SQL Server LocalDB. Initial database creation is documented through `EnsureCreated()`; evaluate migrations and a durable persistence strategy before any production use.

Never commit passwords, tokens or private connection strings.

## 13 · Security

Before exposing the application publicly, review CORS, authentication, authorization, input validation, session handling and checkout security. A development configuration is not a production security baseline.

## 14 · Quality and Validation

Use the repository's CI and CodeQL workflows as automated checks. Run backend build/tests and frontend install, lint and build commands according to the current project scripts. A passing workflow is evidence for the checks it actually runs, not proof of complete security or defect absence.

## 15 · Known Limitations

- The documented default persistence is local SQL Server LocalDB.
- The checkout endpoint is demonstrative and is not a payment-gateway integration.
- Authentication, authorization, idempotency, real payment processing and production inventory workflows remain outside the documented scope.
- Production readiness requires additional architecture, security, operational and data-persistence validation.

## 16 · Development Methodology

The solution separates frontend, server and orchestration components. Prefer small, reviewable changes; validate HTTP contracts; review persistence behavior; and run the appropriate backend and frontend checks after changes.

## 17 · Documentation and Engineering Principles

- [Visual identity guide](docs/brand/README.md).
- [Banner](assets/brand/banner.svg) and [logo](assets/brand/logo.svg).
- [Project structure](docs/project-structure.md).
- [Changelog](CHANGELOG.md).

Relevant principles include separation of responsibilities, environment-based configuration, clear API contracts, data validation, credential protection and dependency review. Documentation of a principle does not mean every control is implemented or audited.

## 18 · License and Attribution

See [LICENSE.txt](LICENSE.txt) for the repository license and applicable terms.
