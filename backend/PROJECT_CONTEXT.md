# Contexto técnico do backend

Este documento descreve o estado atual do diretório `backend/`: arquitetura, organização, dependências, banco de dados, autenticação, autorização, validações, middlewares, regras de negócio e endpoints implementados.

## 1. Visão geral

O backend é uma API REST para uma pizzaria, construída com Node.js, Express e TypeScript. O acesso ao PostgreSQL é feito com Prisma ORM e o adapter `pg`. A API implementa atualmente os módulos de usuários/autenticação e categorias. As entidades de produtos, pedidos e itens já estão modeladas no banco, mas ainda não possuem rotas, controllers ou services.

Características principais:

- API HTTP REST com respostas em JSON;
- TypeScript em modo estrito;
- PostgreSQL como banco de dados;
- Prisma ORM com IDs UUID;
- autenticação stateless por JWT;
- senhas protegidas com bcrypt;
- autorização baseada em papéis (RBAC);
- validação de `body`, `params` e `query` com Zod;
- tratamento centralizado de erros da aplicação.

## 2. Arquitetura

O projeto usa uma arquitetura em camadas, organizada por responsabilidade:

```text
Requisição HTTP
    ↓
Router
    ↓
Middlewares de autenticação, autorização e validação
    ↓
Controller
    ↓
Service
    ↓
Prisma Client
    ↓
PostgreSQL
    ↓
Service → Controller → Resposta JSON
```

Responsabilidades:

- **Router:** define método e caminho do endpoint e compõe os middlewares.
- **Middleware:** executa tarefas transversais antes ou depois do controller, como autenticar, autorizar, validar dados e tratar erros.
- **Controller:** extrai os dados da requisição, instancia e chama o service, define o status HTTP e envia a resposta.
- **Service:** concentra regras de negócio, consultas e alterações no banco e lança `AppError` quando uma operação não pode ser concluída.
- **Prisma Client:** traduz as operações do service para o PostgreSQL.
- **Error middleware:** converte erros conhecidos em respostas HTTP e oculta erros internos inesperados.

Não há uma camada separada de repository: os services usam o Prisma Client diretamente.

## 3. Tecnologias e versões

As versões abaixo são as faixas declaradas em `package.json`. Como não há lockfile dentro de `backend/`, a versão efetivamente instalada pode variar dentro da faixa permitida por `^`.

### Dependências de execução

| Biblioteca | Versão declarada | Uso |
| --- | ---: | --- |
| `express` | `^5.2.1` | Servidor HTTP e roteamento |
| `cors` | `^2.8.6` | Liberação de requisições cross-origin |
| `dotenv` | `^17.4.2` | Carregamento de variáveis de ambiente |
| `zod` | `^4.3.6` | Validação dos dados das requisições |
| `jsonwebtoken` | `^9.0.3` | Criação e verificação de JWT |
| `bcryptjs` | `^3.0.3` | Hash e comparação de senhas |
| `@prisma/client` | `^7.8.0` | Cliente ORM gerado |
| `@prisma/adapter-pg` | `^7.8.0` | Adapter PostgreSQL do Prisma |
| `pg` | `^8.22.0` | Driver PostgreSQL |
| `cloudinary` | `^2.9.0` | Dependência instalada, ainda sem uso no código atual |
| `multer` | `^2.0.2` | Dependência instalada, ainda sem uso no código atual |
| `typescript` | `^6.0.3` | Compilação e tipagem |
| `tsx` | `^4.21.0` | Execução de TypeScript em desenvolvimento |
| `tsc-alias` | `^1.8.17` | Conversão dos aliases após a compilação |
| `tsconfig-paths` | `^4.2.0` | Resolução de aliases no JavaScript compilado |
| `prisma` | `^7.8.0` | CLI e geração do Prisma Client |

### Dependências de desenvolvimento e tipos

| Biblioteca | Versão declarada |
| --- | ---: |
| `nodemon` | `^3.1.11` |
| `prisma` | `^7.8.0` |
| `@types/bcryptjs` | `^3.0.0` |
| `@types/cors` | `^2.8.19` |
| `@types/express` | `^5.0.6` |
| `@types/jsonwebtoken` | `^9.0.10` |
| `@types/multer` | `^2.0.0` |
| `@types/node` | `^25.2.3` |
| `@types/pg` | `^8.20.0` |

Observação: alguns pacotes de tipos e o próprio `prisma` aparecem simultaneamente em `dependencies` e `devDependencies`.

## 4. Configuração TypeScript

- alvo de compilação: `ES2020`;
- módulos: `CommonJS`;
- código-fonte: `src/`;
- saída compilada: `dist/`;
- source maps habilitados;
- comentários removidos na compilação;
- `strict` e verificações adicionais habilitadas;
- testes `*.spec.ts` e `*.test.ts` excluídos da compilação;
- alias principal: `@/*` → `src/*`.

Outros aliases incluem `@controllers`, `@routes`, `@schemas`, `@services`, `@lib`, `@shared`, `@errors` e `@middlewares`.

> Atenção: o `tsconfig.json` atual possui a propriedade vazia `"": "node"`, acompanhada do comentário de resolução de módulos. Ela aparenta ser um erro de digitação de `"moduleResolution": "node"` e deve ser revisada caso o build apresente erro de configuração.

## 5. Organização das pastas

```text
backend/
├── docs/
│   └── roles.md
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── schema.prisma.bak
├── src/
│   ├── controllers/
│   │   ├── category-controllers/
│   │   └── users-controllers/
│   ├── generated/
│   │   └── prisma/                 # gerado pelo Prisma; pode estar ignorado pelo Git
│   ├── lib/
│   │   └── prisma.ts
│   ├── routes/
│   │   ├── category.routes.ts
│   │   └── users.routes.ts
│   ├── schemas/
│   │   ├── category.schemas.ts
│   │   └── user.schemas.ts
│   ├── services/
│   │   ├── category-services/
│   │   └── users-services/
│   ├── shared/
│   │   ├── errors/
│   │   ├── middlewares/
│   │   └── types/express/
│   ├── routes.ts
│   └── server.ts
├── .env.example
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

Convenções atuais:

- um controller e um service por operação;
- nomes dos módulos separados por domínio (`users` e `category`);
- arquivos de rotas agrupam e instanciam os controllers;
- recursos compartilhados ficam em `src/shared`;
- o Prisma Client é centralizado em `src/lib/prisma.ts`.

## 6. Inicialização da aplicação

O arquivo `src/server.ts`:

1. carrega as variáveis com `dotenv/config`;
2. cria a aplicação Express;
3. habilita `express.json()`;
4. habilita CORS sem restrição explícita de origem;
5. registra o router principal;
6. registra o middleware global de erros por último;
7. inicia o servidor em `PORT` ou, na ausência dela, na porta `3333`.

Todas as rotas da aplicação usam o prefixo `/api`.

## 7. Variáveis de ambiente

| Variável | Obrigatória | Finalidade |
| --- | --- | --- |
| `PORT` | Não | Porta HTTP; padrão `3333` |
| `DATABASE_URL` | Sim | Connection string do PostgreSQL usada pelo Prisma e pelo adapter `pg` |
| `JWT_SECRET` | Sim | Segredo para assinar e verificar tokens JWT |

Exemplo:

```env
PORT=3333
DATABASE_URL="postgresql://usuario:senha@localhost:5433/pizzaria?schema=public"
JWT_SECRET="substitua_por_um_segredo_forte"
```

## 8. Banco de dados

### Configuração do Prisma

- provider: `postgresql`;
- schema: `prisma/schema.prisma`;
- migrações: `prisma/migrations`;
- Prisma Client gerado em `src/generated/prisma`;
- conexão recebida de `DATABASE_URL`;
- adapter usado em runtime: `PrismaPg`.

### Relacionamentos

```text
Category 1 ─────── N Product
Product  1 ─────── N Item
Order    1 ─────── N Item
```

`Item` funciona como entidade de associação entre um pedido e um produto, incluindo a quantidade.

### Enum `Role`

| Papel | Interpretação de uso |
| --- | --- |
| `CUSTOMER` | Cliente; papel padrão de novos usuários |
| `ATTENDANT` | Atendente |
| `KITCHEN` | Cozinha |
| `MANAGER` | Gerente |
| `ADMIN` | Administrador |
| `SUPER_ADMIN` | Superadministrador |

### Modelo `User` → tabela `users`

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | `String` | PK, UUID automático |
| `name` | `String` | Obrigatório |
| `email` | `String` | Obrigatório e único |
| `password` | `String` | Obrigatório; armazenado como hash bcrypt |
| `role` | `Role` | Padrão `CUSTOMER` |
| `createdAt` | `DateTime` | Preenchido com `now()` |
| `updatedAt` | `DateTime` | Atualizado automaticamente |

### Modelo `Category` → tabela `categories`

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | `String` | PK, UUID automático |
| `name` | `String` | Obrigatório; unicidade é garantida pela regra do service, não por índice no banco |
| `createdAt` | `DateTime` | Preenchido com `now()` |
| `updatedAt` | `DateTime` | Atualizado automaticamente |
| `products` | `Product[]` | Relação 1:N |

### Modelo `Product` → tabela `products`

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | `String` | PK, UUID automático |
| `name` | `String` | Obrigatório |
| `price` | `Int` | Preço armazenado em centavos |
| `description` | `String` | Obrigatório |
| `banner` | `String` | Obrigatório |
| `disabled` | `Boolean` | Padrão `false` |
| `category_id` | `String` | FK para `categories.id` |
| `items` | `Item[]` | Relação 1:N |
| `createdAt` | `DateTime` | Preenchido com `now()` |
| `updatedAt` | `DateTime` | Atualizado automaticamente |

Ao excluir uma categoria, seus produtos são excluídos em cascata.

### Modelo `Order` → tabela `orders`

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | `String` | PK, UUID automático |
| `table` | `Int` | Número da mesa |
| `status` | `Boolean` | Padrão `false`; `false` = pendente, `true` = pronto |
| `draft` | `Boolean` | Padrão `true`; indica pedido ainda em rascunho |
| `name` | `String?` | Nome opcional |
| `items` | `Item[]` | Relação 1:N |
| `createdAt` | `DateTime` | Preenchido com `now()` |
| `updatedAt` | `DateTime` | Atualizado automaticamente |

### Modelo `Item` → tabela `items`

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | `String` | PK, UUID automático |
| `amount` | `Int` | Quantidade |
| `order_id` | `String` | FK para `orders.id` |
| `product_id` | `String` | FK para `products.id` |
| `createdAt` | `DateTime` | Preenchido com `now()` |
| `updatedAt` | `DateTime` | Atualizado automaticamente |

Ao excluir um pedido ou produto, os itens relacionados são excluídos em cascata.

## 9. Autenticação e autorização

### Autenticação JWT

O login cria um token com:

- payload: `name`, `email` e `role`;
- `subject` (`sub`): ID UUID do usuário;
- validade: `1d`;
- assinatura: `JWT_SECRET`.

Rotas protegidas esperam o header:

```http
Authorization: Bearer <token>
```

O middleware `isAuthenticated` verifica o token e salva o `sub` em `req.userId`. A interface `Express.Request` foi estendida em `src/shared/types/express/index.ts` para aceitar esse campo.

### Autorização por papéis

`authorizeRoles(...allowedRoles)` deve ser executado depois de `isAuthenticated`. Ele:

1. lê `req.userId`;
2. consulta o usuário no banco;
3. compara o papel atual do usuário com a lista permitida;
4. retorna `401` quando não há usuário autenticado;
5. retorna `403` quando o usuário não existe ou não possui permissão.

Permissões aplicadas atualmente:

| Operação | Papéis permitidos |
| --- | --- |
| Listar usuários | `ADMIN`, `SUPER_ADMIN` |
| Excluir a própria conta | `ADMIN`, `SUPER_ADMIN` |
| Criar categoria | `KITCHEN`, `MANAGER`, `ADMIN`, `SUPER_ADMIN` |
| Atualizar categoria | `KITCHEN`, `MANAGER`, `ADMIN`, `SUPER_ADMIN` |
| Excluir categoria | `ADMIN`, `SUPER_ADMIN` |
| Listar/consultar categorias | Qualquer usuário autenticado |
| Consultar/atualizar o próprio perfil | Qualquer usuário autenticado |

## 10. Validação com Zod

O middleware `validateSchema` recebe um schema e valida um objeto com:

```ts
{
  body: req.body,
  query: req.query,
  params: req.params
}
```

Em caso de falha, responde `400`:

```json
{
  "error": "Dados de entrada inválidos",
  "details": [
    {
      "campo": "email",
      "mensagem": "O e-mail é inválido"
    }
  ]
}
```

### Schemas de usuário

#### `createUserSchema`

- `body.name`: string obrigatória, mínimo de 1 caractere;
- `body.email`: string obrigatória em formato de e-mail;
- `body.password`: string obrigatória, mínimo de 6 caracteres;
- `body.confirmPassword`: string obrigatória, mínimo de 6 caracteres;
- `password` e `confirmPassword` devem ser iguais.

#### `authUserSchema`

- `body.email`: e-mail obrigatório e válido;
- `body.password`: string obrigatória, mínimo de 6 caracteres.

#### `updateUserSchema`

- aceita `name`, `email`, `password` e `confirmPassword`;
- todos os campos são opcionais individualmente;
- exige pelo menos um campo;
- `name`, quando enviado, deve ter ao menos 1 caractere;
- `email`, quando enviado, deve ser válido;
- senha e confirmação, quando enviadas, devem ter ao menos 6 caracteres;
- ao enviar `password`, `confirmPassword` se torna obrigatório;
- as duas senhas devem coincidir.

### Schemas de categoria

#### `createCategorySchema`

- `body.name`: string obrigatória;
- remove espaços nas extremidades com `trim()`;
- mínimo de 2 caracteres.

#### `categoryIdSchema`

- `params.id`: UUID obrigatório e válido.

#### `updateCategorySchema`

- `params.id`: UUID obrigatório e válido;
- `body.name`: string obrigatória, com `trim()` e mínimo de 2 caracteres.

## 11. Middlewares

| Middleware | Função |
| --- | --- |
| `express.json()` | Converte corpos JSON para `req.body` |
| `cors()` | Habilita CORS; configuração atual aceita as opções padrão |
| `isAuthenticated` | Valida JWT e preenche `req.userId` |
| `authorizeRoles` | Autoriza o usuário conforme seu papel persistido no banco |
| `validateSchema` | Valida `body`, `query` e `params` com Zod |
| `errorMiddleware` | Converte `AppError` em resposta HTTP e trata falhas inesperadas |

## 12. Tratamento de erros

`AppError` representa erros conhecidos e recebe:

- `message`: mensagem pública;
- `statusCode`: status HTTP, com padrão `400`.

Status previstos no enum `HttpStatus`:

- `400 Bad Request`;
- `401 Unauthorized`;
- `403 Forbidden`;
- `404 Not Found`;
- `409 Conflict`;
- `500 Internal Server Error`.

O `errorMiddleware` responde erros conhecidos assim:

```json
{
  "error": "Mensagem do erro"
}
```

Erros desconhecidos retornam:

```json
{
  "error": "Internal server error"
}
```

> Exceção atual: `AuthUserController` não encaminha erros ao middleware global. Ele captura qualquer erro e sempre responde `400`, mesmo quando o service lança `401` ou `404`.

## 13. Endpoints

URL-base padrão local:

```text
http://localhost:3333/api
```

### Resumo

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| `GET` | `/api` | Público | Verifica a disponibilidade da API |
| `POST` | `/api/users` | Público | Cria um usuário |
| `POST` | `/api/user/session` | Público | Autentica um usuário |
| `POST` | `/api/users/session` | Público | Alias de autenticação |
| `GET` | `/api/users` | Admin | Lista usuários |
| `GET` | `/api/me` | Autenticado | Retorna o usuário autenticado |
| `PUT` | `/api/user` | Autenticado | Atualiza o usuário autenticado |
| `PATCH` | `/api/user` | Autenticado | Alias de atualização do usuário |
| `DELETE` | `/api/user` | Admin | Exclui a própria conta autenticada |
| `POST` | `/api/category` | Gestão de categoria | Cria uma categoria |
| `GET` | `/api/categories` | Autenticado | Lista categorias |
| `GET` | `/api/category/:id` | Autenticado | Consulta categoria e produtos |
| `PUT` | `/api/category/:id` | Gestão de categoria | Atualiza uma categoria |
| `PATCH` | `/api/category/:id` | Gestão de categoria | Alias de atualização de categoria |
| `DELETE` | `/api/category/:id` | Admin | Exclui uma categoria |

### `GET /api`

Resposta `200`:

```json
{
  "message": "Bem-vindo à API da pizzaria!"
}
```

### `POST /api/users`

Cria um usuário com papel padrão `CUSTOMER`.

Body:

```json
{
  "name": "Maria",
  "email": "maria@example.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

Regras:

- o e-mail deve ser único;
- a senha é armazenada com bcrypt, usando custo `10`;
- a senha nunca é retornada.

Resposta `201`:

```json
{
  "message": "Usuário criado",
  "user": {
    "name": "Maria",
    "email": "maria@example.com",
    "role": "CUSTOMER",
    "createdAt": "..."
  }
}
```

Erros principais: `400` para dados inválidos e `409` para usuário já existente.

### `POST /api/user/session`

### `POST /api/users/session`

Os dois caminhos executam a mesma autenticação.

Body:

```json
{
  "email": "maria@example.com",
  "password": "123456"
}
```

Resposta `200`:

```json
{
  "name": "Maria",
  "email": "maria@example.com",
  "role": "CUSTOMER",
  "token": "<jwt>"
}
```

No estado atual, usuário inexistente ou senha incorreta são convertidos pelo controller em resposta `400`.

### `GET /api/users`

Acesso: JWT + papel `ADMIN` ou `SUPER_ADMIN`.

Resposta `200`: array com `name`, `email`, `role`, `createdAt` e `updatedAt`. ID e senha não são retornados.

### `GET /api/me`

Acesso: qualquer usuário autenticado.

Retorna `200` com `name`, `email`, `role`, `createdAt` e `updatedAt` do usuário identificado pelo JWT.

### `PUT /api/user`

### `PATCH /api/user`

Acesso: qualquer usuário autenticado. Ambos os métodos executam a mesma atualização parcial.

Body, com pelo menos um campo:

```json
{
  "name": "Novo nome",
  "email": "novo@example.com",
  "password": "novaSenha",
  "confirmPassword": "novaSenha"
}
```

Regras:

- o e-mail não pode pertencer a outro usuário;
- uma nova senha recebe novo hash bcrypt;
- `confirmPassword` é validado, mas não é enviado ao service nem persistido.

Resposta `200`:

```json
{
  "message": "Usuário atualizado",
  "user": {
    "name": "Novo nome",
    "email": "novo@example.com",
    "role": "CUSTOMER",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### `DELETE /api/user`

Acesso: JWT + papel `ADMIN` ou `SUPER_ADMIN`.

Exclui o próprio usuário identificado pelo token; não recebe ID de outro usuário.

Resposta `200`:

```json
{
  "message": "Usuário removido com sucesso"
}
```

### `POST /api/category`

Acesso: JWT + `KITCHEN`, `MANAGER`, `ADMIN` ou `SUPER_ADMIN`.

Body:

```json
{
  "name": "Pizzas tradicionais"
}
```

Regras:

- nome com no mínimo 2 caracteres;
- não permite outro nome igual ignorando maiúsculas/minúsculas.

Resposta `201`: categoria com `id`, `name`, `createdAt` e `updatedAt`.

### `GET /api/categories`

Acesso: qualquer usuário autenticado.

Resposta `200`: array de categorias com `id`, `name`, `createdAt` e `updatedAt`, ordenado por nome em ordem crescente.

### `GET /api/category/:id`

Acesso: qualquer usuário autenticado.

Regras:

- `id` deve ser UUID;
- categoria inexistente retorna `404`.

Resposta `200`: categoria e seus produtos. Cada produto contém `id`, `name`, `price`, `description`, `banner`, `disabled`, datas e uma projeção da própria categoria (`id` e `name`).

### `PUT /api/category/:id`

### `PATCH /api/category/:id`

Acesso: JWT + `KITCHEN`, `MANAGER`, `ADMIN` ou `SUPER_ADMIN`. Ambos exigem o nome e executam a mesma operação.

Body:

```json
{
  "name": "Novo nome"
}
```

Regras:

- `id` deve ser UUID;
- a categoria deve existir;
- não pode haver outra categoria com o mesmo nome, ignorando maiúsculas/minúsculas.

Resposta `200`:

```json
{
  "message": "Categoria atualizada com sucesso",
  "category": {
    "id": "...",
    "name": "Novo nome",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### `DELETE /api/category/:id`

Acesso: JWT + `ADMIN` ou `SUPER_ADMIN`.

Regras:

- `id` deve ser UUID;
- categoria inexistente retorna `404`;
- produtos associados são removidos por cascata e, por consequência, seus itens também são removidos por cascata.

Resposta `200`:

```json
{
  "message": "Categoria removida com sucesso"
}
```

## 14. Scripts

| Comando | Ação |
| --- | --- |
| `yarn dev` | Executa `nodemon` + `tsx` sobre `src/server.ts` |
| `yarn build` | Gera o Prisma Client, compila TypeScript e corrige aliases |
| `yarn start` | Executa `dist/server.js` com suporte a aliases |
| `yarn db:generate` | Gera o Prisma Client |
| `yarn db:push` | Sincroniza o schema diretamente com o banco |
| `yarn db:migrate` | Cria/aplica migrações em desenvolvimento |
| `yarn db:deploy` | Aplica migrações existentes no ambiente |
| `yarn db:studio` | Abre o Prisma Studio |

## 15. Estado atual e pontos de atenção

- Produtos, pedidos e itens existem no schema, mas ainda não possuem API implementada.
- `cloudinary` e `multer` estão instalados, mas ainda não são utilizados.
- Não foram encontrados testes automatizados no backend.
- Não há paginação na listagem de usuários ou categorias.
- A unicidade do nome de categoria é verificada no service, mas não possui constraint única no PostgreSQL; requisições concorrentes ainda podem criar duplicatas.
- CORS usa a configuração padrão e não restringe origens explicitamente.
- O login trata todos os erros como `400`, ignorando os status `401` e `404` dos `AppError` lançados pelo service.
- `PUT /api/user` funciona como atualização parcial, assim como `PATCH`.
- `PUT` e `PATCH` de categoria exigem `name` e têm comportamento idêntico.
- A exclusão de usuário só permite ao admin excluir a própria conta autenticada; não existe endpoint com ID para administrar outra conta.
- O arquivo `docs/roles.md` está desatualizado em relação às rotas e middlewares atuais; este documento reflete diretamente o código-fonte.
- Há dependências e tipos duplicados entre `dependencies` e `devDependencies`.
- O nome do arquivo `valedate.schemas.ts` e o nome `isAutentecated.middleware.ts` contêm erros ortográficos, embora os imports atuais apontem para esses nomes e funcionem assim.

