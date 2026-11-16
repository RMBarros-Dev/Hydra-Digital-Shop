# ADR-0001 — Separar frontend React, backend ASP.NET Core e orquestração Aspire

- **Status:** Registrado (arquitetura atual, documentada retrospectivamente)
- **Data do registro:** 2026-11-15

## Contexto

O repositório contém uma interface React/Vite, um backend ASP.NET Core e um AppHost .NET Aspire. O backend acessa dados por Entity Framework Core e SQL Server.

## Decisão atual

Mantenho frontend, backend e orquestração como componentes separados. Utilizo o AppHost para iniciar e conectar o servidor e o frontend durante o desenvolvimento.

## Consequências

- Posso desenvolver e validar a interface separadamente do backend.
- O contrato HTTP entre frontend e backend precisa permanecer consistente.
- As configurações de conexão e CORS precisam ser geridas por ambiente.
- O cache atual é em memória; não devo documentar Redis como recurso ativo.
- O fluxo de checkout atual não comprova processamento de pagamentos.

## Nota histórica

Este ADR registra a arquitetura encontrada no código. Não afirmo que ele seja o registro original da decisão de projeto.
