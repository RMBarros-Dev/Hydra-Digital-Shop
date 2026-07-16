# Changelog

Versão: local-development
Data: (work in progress)

Resumo das alterações realizadas neste branch / workspace

1) Back-end (.NET) — Hydra Digital Shop.Server
- Adicionado AppDbContext (Hydra Digital Shop.Server/Data/AppDbContext.cs) com suporte EF Core para SQL Server LocalDB.
  - Entidades: Game e Order (com tipos e configuração de colunas decimais para preço).
  - Seed de dados na inicialização: inseridos 6 jogos (Elden Ring, Red Dead Redemption 2, FIFA Ultimate 24, Forza Horizon 5, Civilization VI, Microsoft Flight Simulator) para garantir que o banco nunca inicie vazio.
- Atualizado Program.cs para:
  - Registrar AppDbContext com ConnectionString em appsettings.json (LocalDB: HydraDigitalShopDb).
  - Garantir criação automática do banco via EnsureCreated() na inicialização (sem necessidade de migrations manuais para desenvolvimento rápido).
  - Expor endpoints Minimal API:
	- GET /api/games  — lista os jogos persistidos
	- POST /api/checkout — processa compra, gera chaves de ativação e persiste um Order
  - Configurado CORS para permitir chamada do frontend (Vite) em desenvolvimento.

2) Orquestração (Aspire) — Hydra Digital Shop.AppHost
- Removida dependência de Redis/Docker na orquestração (não é mais criado container Redis).
- Mantido AddViteApp para frontend e ajustado AppHost para não aguardar o cache remoto.

3) Cache / Infra
- Substituído uso de Redis por cache em memória distribuída do .NET no servidor:
  - builder.Services.AddDistributedMemoryCache();
  - builder.Services.AddOutputCache();
  Isso elimina necessidade de Docker/Redis para desenvolvimento local.

4) Front-end (React + Vite + TypeScript + Tailwind)
- Estrutura criada/atualizada em /frontend com suporte completo:
  - Páginas: Storefront, GameDetails, Library, CartPage
  - Componentes: GameCard, CartDrawer, SkeletonCard
  - Context: CartContext (persistência via localStorage, add/remove/checkout)
  - Mock de dados: src/data/mockGames.ts (6 jogos) e fallback do frontend para o mock caso a API esteja indisponível
  - Integração com API: tentativa de fetch para import.meta.env.VITE_API_URL || http://localhost:5000
- Visual: "Extreme makeover" com tema Cyber/Neon Dark, glassmorphism, cards 3D, efeitos neon, skeletons de carregamento.
- Tailwind configurado (tailwind.config.cjs), plugin @tailwindcss/typography instalado.
- Arquivo .npmrc adicionado em /frontend com legacy-peer-deps=true para facilitar install com dependências peers conflitantes.

5) Ferramentas e automações
- Aspire CLI instalado/atualizado localmente (foi executado install.ps1 e aspire update --self).
- npm install executado em /frontend (com --legacy-peer-deps), auditoria listou 9 vulnerabilidades (5 moderate, 4 high) — recomenda-se revisar e aplicar npm audit fix quando apropriado.

Notas finais
- O banco usa LocalDB (Server=(localdb)\\MSSQLLocalDB). Se preferir SQL Server full, atualize a connection string em Hydra Digital Shop.Server/appsettings.json.
- A inicialização do backend cria o banco automaticamente via EnsureCreated(); para produção recomenda-se usar migrations EF Core.
