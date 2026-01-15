# OMNI Technical Challenge

API REST para simular um sistema simples de transações monetárias entre usuários.

## Quick Start

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+ (ou Docker)

### Opção 1: Com Docker (Recomendado)

```bash
# Subir PostgreSQL + Aplicação
docker-compose up --build

# A aplicação estará disponível em http://localhost:3000
# Swagger em http://localhost:3000/swagger
```

### Opção 2: Local com PostgreSQL

#### 1. Configurar PostgreSQL

```bash
# Criar banco de dados
psql -U postgres -c "CREATE DATABASE omni_challenge;"
```

Ou via Docker apenas o PostgreSQL:

```bash
docker run -d \
  --name omni-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=omni_challenge \
  -p 5432:5432 \
  postgres:16-alpine
```

#### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=omni_challenge
PORT=3000
```

#### 3. Instalar dependências e rodar

```bash
npm install
npm run start:dev
```

## Endpoints

| Método | Rota | Descrição | Status |
|--------|------|-----------|--------|
| POST | `/users/signup` | Cadastro de usuário | 201 |
| POST | `/users/signin` | Login de usuário | 200 |
| GET | `/users` | Listar todos usuários | 200 |
| POST | `/transfer` | Transferência entre usuários | 204 |

### Exemplos de Requisições

#### Cadastrar usuário

```bash
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "joao", "password": "senha123", "birthdate": "1990-01-15"}'
```

#### Login

```bash
curl -X POST http://localhost:3000/users/signin \
  -H "Content-Type: application/json" \
  -d '{"username": "joao", "password": "senha123"}'
```

#### Listar usuários

```bash
curl http://localhost:3000/users
```

#### Transferir

```bash
curl -X POST http://localhost:3000/transfer \
  -H "Content-Type: application/json" \
  -d '{"fromId": "uuid-remetente", "toId": "uuid-destinatario", "amount": 100}'
```

## Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

## Arquitetura

```
src/
├── domain/           # Entidades e interfaces
├── infrastructure/   # TypeORM, Config
├── application/      # Use Cases
├── presentation/     # Controllers, DTOs
├── modules/          # Módulos NestJS
└── shared/           # Constantes, Utils, Filters
```

## Tecnologias

- **NestJS** - Framework
- **TypeORM** - ORM
- **PostgreSQL** - Banco de dados
- **Docker** - Containerização
- **Jest** - Testes
- **Swagger** - Documentação API