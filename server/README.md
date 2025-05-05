# 🔗 Brev.ly - API

API do Brev.ly, responsável pelo encurtamento de URLs, gerenciamento e exportação de links. Desenvolvida em Node.js com TypeScript e Fastify.

## 🚀 Funcionalidades e Regras

- [x]  Deve ser possível criar um link
    - [x]  Não deve ser possível criar um link com URL encurtada mal formatada
    - [x]  Não deve ser possível criar um link com URL encurtada já existente
- [x]  Deve ser possível deletar um link
- [x]  Deve ser possível obter a URL original por meio de uma URL encurtada
- [x]  Deve ser possível listar todas as URL's cadastradas
- [x]  Deve ser possível incrementar a quantidade de acessos de um link
- [x]  Deve ser possível exportar os links criados em um CSV
    - [x]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
    - [x]  Deve ser gerado um nome aleatório e único para o arquivo
    - [x]  Deve ser possível realizar a listagem de forma performática
    - [x]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

## 🛠️ Tecnologias

- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Docker
- Drizzle ORM

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL como banco de dados, configurado via Docker, e Drizzle ORM para interação com o banco de dados.

### Configuração do PostgreSQL com Docker

1. Certifique-se de ter o Docker instalado em sua máquina
2. Execute o seguinte comando para iniciar o PostgreSQL:

```bash
docker-compose up -d
```

Isso irá iniciar um container PostgreSQL na porta 5432.

## 🚀 Como executar

1. Clone o repositório
2. Instale as dependências com `pnpm install`
3. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente
4. Inicie o banco de dados PostgreSQL com `docker-compose up -d`
5. Execute as migrações com `pnpm db:migrate`
6. Inicie o servidor com `pnpm dev`
7. Acesse a documentação da API em `http://localhost:3333/docs`

## 🧪 Testes

Para rodar os testes automatizados:

```bash
pnpm test
```