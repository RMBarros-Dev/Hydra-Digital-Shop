# Organização do repositório — Hydra Digital Shop

A estrutura atual separa frontend, servidor e orquestração. Os diretórios com espaços no nome são mantidos porque fazem parte dos caminhos referenciados pela solução .NET.

| Caminho | Responsabilidade |
| --- | --- |
| `Hydra Digital Shop.AppHost/` | Inicialização e coordenação local dos componentes via .NET Aspire. |
| `Hydra Digital Shop.Server/` | API ASP.NET Core, modelos de API e contexto de dados. |
| `frontend/` | Interface React/TypeScript, páginas, componentes, contexto e dados de demonstração. |
| `assets/brand/` | Logotipo, banner e marca do projeto. |
| `Hydra Digital Shop.slnx` | Solução .NET. |
| `CHANGELOG.md` | Histórico de mudanças. |

## Convenções

- Não renomear diretórios de projetos .NET sem atualizar a solução e referências associadas.
- Manter dependências frontend em `frontend/package.json` e o lockfile sincronizado.
- Manter segredos e configurações específicas de ambiente fora do Git.
- Colocar documentação transversal em `docs/` e ativos visuais em `assets/brand/`.
