```text
export const userRoles = [
    'CUSTOMER',
    'ATTENDANT',
    'KITCHEN',
    'MANAGER',
    'ADMIN',
    'SUPER_ADMIN',
] as const;
```

## CUSTOMER

| Route         | Description                       |
| ------------- | --------------------------------- |
| /cardapio     | Visualizar o cardápio             |
| /produto/:id  | Visualizar detalhes de um produto |
| /carrinho     | Visualizar o carrinho de compras  |
| /meus-pedidos | Visualizar meus pedidos           |
| /pedidos/:id  | Visualizar detalhes de um pedido  |
| /meus-dados   | Visualizar meus dados             |

## ATTENDANT

| Route                       | Description                                 |
| --------------------------- | ------------------------------------------- |
| /cozinha                    | Visualizar a cozinha                        |
| /cozinha/pedidos/:id        | Visualizar detalhes de um pedido na cozinha |
| /cozinha/pedidos/:id/status | Atualizar status de um pedido na cozinha    |
| /cozinha/finalizados        | Visualizar pedidos finalizados na cozinha   |

## KITCHEN

| Route                       | Description                                 |
| --------------------------- | ------------------------------------------- |
| /cozinha                    | Visualizar a cozinha                        |
| /cozinha/pedidos/:id        | Visualizar detalhes de um pedido na cozinha |
| /cozinha/pedidos/:id/status | Atualizar status de um pedido na cozinha    |
| /cozinha/finalizados        | Visualizar pedidos finalizados na cozinha   |

## MANAGER

| Route             | Description           |
| ----------------- | --------------------- |
| /admin/produtos   | Gerenciar produtos    |
| /admin/categorias | Gerenciar categorias  |
| /admin/mesas      | Gerenciar mesas       |
| /admin/relatorios | Visualizar relatórios |

## ADMIN

| Route                | Description                       |
| -------------------- | --------------------------------- |
| /admin/usuarios      | Gerenciar usuários                |
| /admin/usuarios/:id  | Visualizar detalhes de um usuário |
| /admin/configuracoes | Gerenciar configurações           |

## SUPER_ADMIN

| Route                 | Description                                |
| --------------------- | ------------------------------------------ |
| /super-admin          | Acesso total                               |
| /super-admin/promover | Pode promover/rebaixar ADMIN e SUPER_ADMIN |
