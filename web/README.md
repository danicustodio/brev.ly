# 🔗 Brev.ly - Front-end

Frontend do Brev.ly, uma aplicação SPA desenvolvida em React e Vite para encurtamento e gerenciamento de URLs.

## 🚀 Funcionalidades e Regras

- [x]  Deve ser possível criar um link
    - [x]  Não deve ser possível criar um link com encurtamento mal formatado
    - [x]  Não deve ser possível criar um link com encurtamento já existente
- [x]  Deve ser possível deletar um link
- [x]  Deve ser possível obter a URL original por meio do encurtamento
- [x]  Deve ser possível listar todas as URL’s cadastradas
- [x]  Deve ser possível incrementar a quantidade de acessos de um link
- [x]  Deve ser possível baixar um CSV com o relatório dos links criados

Regras específicas para o front-end:

- [x]  É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`
- [x]  Foco na boa experiência do usuário (`empty state`, ícones de carregamento, bloqueio de ações conforme o estado da aplicação)
- [x]  Responsividade: a aplicação deve funcionar bem em desktops e celulares

## 🛠️ Tecnologias

- React
- Vite
- TypeScript

## 🚀 Como executar

1. Copie o arquivo de variáveis de ambiente de exemplo e configure conforme necessário:

```bash
cp .env.example .env
```

2. Instale as dependências:

```bash
pnpm install
```

3. Inicie a aplicação em modo desenvolvimento:

```bash
pnpm dev
```

Acesse em [http://localhost:5173](http://localhost:5173)
