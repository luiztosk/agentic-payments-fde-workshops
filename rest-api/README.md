# Expense Tracker

Projeto de referência para o workshop de 1 hora sobre APIs REST com TypeScript.
Uma API REST (Express + Zod + dados em memória) e um frontend mínimo (React + Vite) para
controle de despesas.

## Pré-requisitos

- Node.js (18+)
- npm

## Executar a API

```bash
cd api
npm install
npm run dev
```

A API sobe em `http://localhost:3000`.

Para rodar os testes:

```bash
npm test
```

## Executar o frontend

Em outro terminal:

```bash
cd web
npm install
npm run dev
```

O frontend sobe em `http://localhost:5173`.

## URLs

- API: http://localhost:3000
- Frontend: http://localhost:5173

## Endpoints

| Método | Rota            | Descrição                     |
|--------|-----------------|--------------------------------|
| GET    | `/health`       | Verifica se a API está no ar   |
| GET    | `/expenses`     | Lista todas as despesas        |
| GET    | `/expenses/:id` | Busca uma despesa pelo id      |
| POST   | `/expenses`     | Cria uma nova despesa          |

### Criar despesa (`POST /expenses`)

```json
{
  "description": "Lunch",
  "amount": 35,
  "category": "food"
}
```

- `description`: string não vazia
- `amount`: número maior que zero
- `category`: string não vazia

## Estrutura do projeto

```
expense-tracker/
├── api/
│   ├── src/
│   │   ├── app.ts               # Express app, middlewares e rotas
│   │   ├── server.ts            # Inicia o servidor (listen)
│   │   ├── routes/
│   │   │   └── expense.routes.ts
│   │   ├── schemas/
│   │   │   └── expense.schema.ts
│   │   └── data/
│   │       └── expenses.ts      # Armazenamento em memória
│   ├── tests/
│   │   └── expenses.test.ts
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── web/
│   ├── src/
│   │   ├── App.tsx              # Formulário + lista de despesas
│   │   ├── types.ts
│   │   └── main.tsx
│   └── package.json
│
└── README.md
```

## Notas

- Os dados ficam apenas em memória: ao reiniciar a API, as despesas voltam ao estado inicial.
- As variáveis de ambiente são carregadas com [dotenvx](https://dotenvx.com) (`@dotenvx/dotenvx`).
- O CORS aceita apenas a origem definida em `CORS_ORIGIN` (`.env`), que por padrão é `http://localhost:5173`.

## Exemplos de requests (curl)

Com a API rodando em `http://localhost:3000`:

```bash
# Health check
curl -i http://localhost:3000/health

# Listar todas as despesas
curl -i http://localhost:3000/expenses

# Buscar uma despesa pelo id
curl -i http://localhost:3000/expenses/<id>

# Criar uma despesa
curl -i -X POST http://localhost:3000/expenses \
  -H "Content-Type: application/json" \
  -d '{"description": "Lunch", "amount": 35, "category": "food"}'

# Payload inválido (400)
curl -i -X POST http://localhost:3000/expenses \
  -H "Content-Type: application/json" \
  -d '{"description": "", "amount": -10, "category": ""}'

# Id inexistente (404)
curl -i http://localhost:3000/expenses/00000000-0000-0000-0000-000000000000
```
