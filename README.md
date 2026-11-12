<div align="center">

# Hydra Digital Shop

**Loja digital de jogos com API .NET e interface React**

[![.NET](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

</div>

## Visão geral

Projeto full-stack organizado em três partes: servidor ASP.NET Core, interface React/TypeScript e AppHost para orquestração com Aspire.

| Parte | Tecnologias | Diretório |
| --- | --- | --- |
| Servidor | C#, ASP.NET Core 10, Entity Framework Core | `Hydra Digital Shop.Server/` |
| Interface | React 19, TypeScript, Vite | `frontend/` |
| Orquestração | .NET Aspire | `Hydra Digital Shop.AppHost/` |

O servidor usa SQL Server LocalDB por padrão. O projeto também documenta os endpoints `GET /api/games` e `POST /api/checkout`.

## Requisitos

- .NET 10 SDK
- Node.js `^20.19.0` ou `>=22.12.0`
- SQL Server LocalDB para a configuração local padrão
- Visual Studio com suporte a .NET Aspire, opcional

## Executar com Aspire

Na raiz do repositório, restaure as dependências e inicie o AppHost:

```bash
dotnet restore "Hydra Digital Shop.slnx"
dotnet run --project "Hydra Digital Shop.AppHost/Hydra Digital Shop.AppHost.csproj"
```

Também é possível abrir `Hydra Digital Shop.slnx` no Visual Studio e iniciar o projeto `Hydra Digital Shop.AppHost`. O Aspire coordena o servidor e o frontend.

## Executar os projetos separadamente

Servidor:

```bash
dotnet run --project "Hydra Digital Shop.Server/Hydra Digital Shop.Server.csproj"
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Ao executar o frontend fora do Aspire, configure `VITE_API_URL` para apontar para a URL do servidor. O código usa `http://localhost:5000` como alternativa quando a variável não está definida.

## Estrutura

```text
Hydra-Digital-Shop/
├── Hydra Digital Shop.AppHost/
├── Hydra Digital Shop.Server/
├── frontend/
└── Hydra Digital Shop.slnx
```

## Observações

- O banco local é criado pelo servidor na primeira execução usando `EnsureCreated()`.
- O AppHost inclui serviços de cache e recursos de desenvolvimento; consulte os arquivos do projeto para a configuração vigente.
- Este README descreve a execução local. Antes de qualquer uso em produção, revise persistência, configuração e segurança.

## Licença

Consulte [LICENSE.txt](LICENSE.txt).
