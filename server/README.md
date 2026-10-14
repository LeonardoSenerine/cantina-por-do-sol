# Cantina Pôr do Sol — API

Base do backend em NestJS 12 (TypeScript, ESM). Recebe as reservas do site, guarda num banco e devolve o link do WhatsApp com a mensagem pronta.

```bash
cp .env.example .env   # e troque a ADMIN_API_KEY
npm install
npm run start:dev      # http://localhost:3000/api · documentação em /api/docs
npm test               # testes unitários
npm run test:e2e       # testes da API inteira, com banco em memória
npm run build && npm run start:prod
```

Precisa de Node 24 ou mais novo: o banco é o SQLite que já vem no Node (`node:sqlite`), sem servidor de banco e sem dependência nativa.

## Rotas

| Método | Rota | Quem usa |
| --- | --- | --- |
| GET | `/api/health` | monitoramento |
| GET | `/api/experiences` · `/api/experiences/:id` | site |
| POST | `/api/reservations` | site (limite de 5 por minuto por IP) |
| GET | `/api/reservations?from=&to=&experience=&status=` | a casa, com header `x-admin-key` |
| GET | `/api/reservations/:id` | a casa |
| PATCH | `/api/reservations/:id/status` | a casa: `pending`, `confirmed` ou `cancelled` |

A reserva segue as mesmas regras do painel do site: café colonial só aos domingos, pizza de quinta a sábado, só os horários da lista, nada no passado (no fuso de São Paulo) e até 120 dias à frente.

## Onde mexer

- `src/experiences/experiences.data.ts`: dias e horários de cada experiência. Precisa bater com `src/data/site.js` do site.
- `src/reservations/`: DTOs (validação), service (regras e mensagem do WhatsApp), repository (SQL) e controller.
- `src/database/migrations.ts`: estrutura do banco. Para mudar uma tabela, acrescente uma migração nova no fim. Elas rodam sozinhas quando a API sobe.
- `src/config/env.ts`: variáveis de ambiente, conferidas na subida.
- `src/setup.ts`: prefixo `/api`, CORS, validação e Swagger, usados pelo servidor e pelos testes.

## Próximos passos

- Ligar o painel de reserva do site ao `POST /api/reservations`, mantendo o WhatsApp como confirmação.
- Trocar a chave `x-admin-key` por login quando houver um painel para a casa.
- Para hospedar com mais de uma instância, trocar o SQLite por Postgres: só `src/database/` e o repository mudam.
