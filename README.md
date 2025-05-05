# 🔗 Brev.ly - Encurtador de URL

Brev.ly é uma aplicação FullStack para encurtar URLs de forma simples e eficiente, desenvolvida como desafio técnico da Pós-graduação Tech Developer 360 na Faculdade de Tecnologia Rocketseat.

## ✨ Funcionalidades

- Criar links encurtados personalizados
- Listar todos os links cadastrados
- Remover links encurtados
- Gerar relatórios com estatísticas de acessos
- Redirecionar automaticamente os links encurtados para suas URLs originais

O projeto envolve tanto o frontend quanto o backend, com foco em boas práticas de desenvolvimento e organização de código.

## 🗂️ Estrutura do Projeto

- `server/` - Backend (API REST, banco de dados, regras de negócio)
- `web/` - Frontend (SPA em React)

## 🚀 Como começar

### Executando tudo com Docker Compose

Você pode rodar toda a aplicação (backend, frontend e banco de dados) usando o arquivo `docker-compose.yml` na raiz do projeto.

> [!IMPORTANT]
> As variáveis devem ser definidas diretamente no arquivo `docker-compose.yml`. Não é necessário criar arquivos `.env` nos diretórios `server/` ou `web/` para rodar via Docker Compose.

Para iniciar, basta rodar:

```bash
docker-compose up -d
```

- O backend estará disponível em [http://localhost:3333](http://localhost:3333)
- O frontend estará disponível em [http://localhost:4173](http://localhost:5173)
- A documentação da API estará em [http://localhost:3333/docs](http://localhost:3333/docs)

### Pré-requisitos (para rodar manualmente)

- Node.js (v18+)
- pnpm
- Docker (para o banco de dados PostgreSQL)

### Backend

```bash
cd server
pnpm install
cp .env.example .env # configure as variáveis de ambiente
docker-compose up -d # inicia o banco de dados PostgreSQL
pnpm db:migrate      # executa as migrações
pnpm dev             # inicia o servidor em modo desenvolvimento
```

Acesse a documentação da API em [http://localhost:3333/docs](http://localhost:3333/docs)

### Frontend

```bash
cd web
pnpm install
cp .env.example .env # configure as variáveis de ambiente
pnpm dev
```

Acesse a aplicação em [http://localhost:5173](http://localhost:5173)

## 🛠️ Tecnologias

- Node.js, TypeScript, Fastify, PostgreSQL, Docker, Drizzle ORM (backend)
- React, Vite, TypeScript (frontend)
