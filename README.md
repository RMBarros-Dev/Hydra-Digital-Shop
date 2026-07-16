# Hydra Digital Shop

Guia rápido para rodar localmente o projeto Hydra Digital Shop (Backend .NET + Frontend React)

Pré-requisitos
- .NET 8/10 SDK (conforme alvo do projeto)
- Visual Studio 2026 (recomendado) ou dotnet CLI
- Node.js 20+ (para o frontend)
- SQL Server LocalDB (instalado com Visual Studio) — usado por padrão

Passos rápidos (Visual Studio / Aspire)

1. Abrir a solução
- Abra `Hydra Digital Shop.slnx` no Visual Studio Community 2026.

2. Restaurar dependências
- No Visual Studio: restaurar via Solution Restore.
- Ou via linha de comando:
  - dotnet restore
  - cd frontend && npm install

3. Variáveis e ambiente
- O Aspire AppHost injeta automaticamente a URL da API no ambiente do frontend durante a orquestração.
- Se executar o frontend manualmente, o frontend tentará usar `import.meta.env.VITE_API_URL` ou `http://localhost:5000`.
- O frontend contém `.npmrc` com `legacy-peer-deps=true` para evitar conflitos de peerDependencies durante o npm install.

4. Executar em Visual Studio (modo recomendado)
- Defina o projeto `Hydra Digital Shop.AppHost` como Startup Project.
- Pressione F5 (ou "Start Debugging"). O AppHost irá orquestrar o backend e o frontend (Vite) conforme configuração Aspire.

5. Executar manualmente (alternativa)
- Backend:
  - cd "Hydra Digital Shop.Server"
  - dotnet run
  - A API estará disponível em: http://localhost:5000 (ou porta configurada)
- Frontend (opcional):
  - cd frontend
  - npm run dev

Endpoints úteis
- GET /api/games — lista de jogos (persistidos via seed no LocalDB)
- POST /api/checkout — processa o carrinho e gera chaves de ativação

Observações
- O banco é criado automaticamente na primeira execução via EnsureCreated(). Para produção, use migrations EF Core.
- O AppHost foi ajustado para usar cache em memória (DistributedMemoryCache) em vez de Redis/Docker.
- Caso queira atualizar o Aspire CLI: execute `irm https://aspire.dev/install.ps1 | iex` no PowerShell, depois `aspire update --self`.

Suporte e próximos passos
- Para melhorar a segurança e a robustez do projeto, recomenda-se:
  - Revisar e corrigir vulnerabilidades npm (npm audit)
  - Mover seeds para migrações se necessário
  - Substituir imagens de placeholder por CDN otimizadas

Divirta-se com a Hydra Digital Shop! 🚀
