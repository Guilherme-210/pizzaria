# 🍕 Pizzaria

Sistema de gerenciamento de pizzaria desenvolvido como um **monorepo**, contendo uma aplicação frontend em **Next.js** e uma API backend em **Node.js**.

## Estrutura do Projeto

```text
pizzaria/
├── backend/     # API Node.js
├── frontend/    # Aplicação Next.js
├── package.json
├── yarn.lock
└── README.md
```

## Tecnologias

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Zod

## Pré-requisitos

* Node.js 22+
* Yarn

## Instalação

Na raiz do projeto execute:

```bash
yarn install
```

## Executando o Projeto

### Frontend

```bash
yarn workspace frontend dev
```
ou
```bash
yarn dev:frontend
```

### Backend

```bash
yarn workspace backend dev
```
ou
```bash
yarn dev:backend
```

## Instalação de Dependências
Para instalar dependências específicas em cada workspace, utilize:

### Frontend

```bash
yarn workspace frontend add <package-name>
```
ou
```bash
yarn i:frontend add <package-name>
```

### Backend

```bash
yarn workspace backend add <package-name>
```
ou
```bash
yarn i:backend add <package-name>
```

## Variáveis de Ambiente

Cada aplicação possui seu próprio arquivo de configuração:

```text
backend/.env
frontend/.env
```

Utilize os arquivos `.env.example` como referência.

## Objetivo do Projeto

Desenvolver uma plataforma completa para gerenciamento de pizzaria, incluindo:

* Cadastro de usuários
* Autenticação
* Cadastro de categorias
* Cadastro de produtos
* Controle de pedidos
* Painel administrativo
* Interface para clientes

## Autor

Projeto desenvolvido para fins de estudo e prática de desenvolvimento Full Stack.
# pizzaria
