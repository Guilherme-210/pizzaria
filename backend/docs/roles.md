```ts
export const userRoles = [
  'CUSTOMER',
  'ATTENDANT',
  'KITCHEN',
  'MANAGER',
  'ADMIN',
  'SUPER_ADMIN',
] as const;
```

## Middlewares

| Middleware        | Description                                             |
| ----------------- | ------------------------------------------------------- |
| isAuthenticated   | Exige token JWT no header Authorization                 |
| isAdmin           | Permite somente usuarios com role ADMIN ou SUPER_ADMIN  |

## Public

| Method | Route              | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | /api               | Verificar status da API      |
| POST   | /api/users         | Criar usuario                |
| POST   | /api/user/session  | Autenticar usuario           |
| POST   | /api/users/session | Autenticar usuario           |

## Authenticated

| Method | Route         | Description                      |
| ------ | ------------- | -------------------------------- |
| GET    | /api/users    | Listar usuarios autenticado      |
| GET    | /api/me       | Buscar dados do usuario logado   |
| PUT    | /api/user     | Atualizar dados do usuario       |
| PATCH  | /api/user     | Atualizar dados do usuario       |
| DELETE | /api/user     | Remover usuario logado           |
| POST   | /api/category | Criar categoria                  |

## Admin

| Method | Route | Description |
| ------ | ----- | ----------- |

> O middleware `isAdmin` existe no backend, mas ainda nao esta aplicado nas rotas atuais.
