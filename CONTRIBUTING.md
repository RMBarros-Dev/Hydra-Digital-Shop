# Como contribuo com o Hydra Digital Shop

Mantenho este projeto como uma aplicação de estudo full-stack, com backend .NET, frontend React/TypeScript e orquestração Aspire.

## Ambiente local

- .NET 10 SDK.
- Node.js 22.
- npm.

## Verificações antes de enviar alterações

```bash
dotnet restore "Hydra Digital Shop.slnx"
dotnet build "Hydra Digital Shop.slnx" --configuration Release
cd frontend
npm ci
npm run lint
npm run build
```

Também executo os testes do projeto quando altero regras de checkout:

```bash
dotnet test "Hydra Digital Shop.Server.Tests/Hydra Digital Shop.Server.Tests.csproj" --configuration Release
```

## Diretrizes

- Não versiono segredos, credenciais ou arquivos de ambiente locais.
- Mantenho mudanças de frontend e backend compatíveis com os contratos existentes.
- Incluo testes para novas regras de cálculo e validação.
- Descrevo limitações do checkout e não apresento a simulação como pagamento real.
