# Curso de Casos de Uso

Projeto didático em TypeScript desenvolvido durante um curso de **Casos de Uso**. É uma aplicação de terminal que simula um fluxo de compras. O usuário pode se registrar, fazer login, cadastrar e listar produtos, adicionar itens ao carrinho e finalizar o pedido. Os dados são mantidos em memória durante a execução.

## Clean Architecture

| Camada | Responsabilidade |
| --- | --- |
| [`src/core/`](src/core/) | Entidades e objetos de valor em `model/` e `shared/`, casos de uso em `service/` e contratos de persistência e hash de senha em `provider/`. O código é organizado pelos conceitos de usuário, produto e pedido. |
| [`src/adapter/`](src/adapter/) | Controllers, conversores e DTOs que adaptam os dados usados pela interface ao formato esperado pelos casos de uso. |
| [`src/external/`](src/external/) | Menu e interação com o terminal, repositórios em memória e implementação de hash de senha com bcrypt. |

As dependências de código apontam para o núcleo. Por exemplo, `FinalizarPedido` recebe a interface `RepositorioPedido` definida no próprio núcleo. A camada externa fornece a implementação em memória, e o caso de uso delega a transição de estado à entidade antes de salvar o pedido. Os controllers adaptam os fluxos de listagem de produtos, adição de itens e finalização. Alguns fluxos do terminal, como login e cadastro, instanciam seus casos de uso diretamente.

## DDD e padrões de projeto

- **Modelo de domínio com comportamento** — `Usuario`, `Produto`, `Pedido` e `ItemPedido` são entidades comparadas pelo identificador. `Pedido` controla a coleção de itens, soma quantidades quando o mesmo produto é adicionado, calcula o total e restringe alterações a pedidos abertos. `PedidoStatus` encapsula as regras de transição, como impedir a finalização de um pedido cancelado. [Modelo de pedido](src/core/pedido/model/)
- **Objetos de valor** — `Email`, `Quantidade`, `Preco` e `SenhaForte` encapsulam conceitos e validações do domínio. Por exemplo, `Email` valida o endereço, e `Preco` oferece formatação monetária. [Tipos compartilhados](src/core/shared/)
- **Use Case** — cada operação da aplicação implementa o contrato `CasoDeUso<Entrada, Saida>` com um método `executar`. `AdicionarItemPedido` verifica se o pedido pertence ao cliente e delega à entidade a inclusão do item. [Caso de uso de adição de item](src/core/pedido/service/AdicionarItemPedido.ts)
- **Repository e inversão de dependência** — interfaces de repositório definem como a aplicação consulta e salva usuários, produtos e pedidos. Os casos de uso recebem os repositórios e o provedor de hash de senha por injeção via construtor, o que permite trocar as implementações externas sem alterar as regras da aplicação. [Repositórios em memória](src/external/db/)
- **Adapter, DTO e conversão** — `AdicionarItemPedidoController` converte os dados do carrinho em objetos do domínio e devolve um `PedidoDTO` com valores formatados para a interface. O contrato `Conversor` permite que o caso de uso use essas conversões sem importar os DTOs do adaptador. [Controller de adição de item](src/adapter/controller/AdicionarItemPedidoController.ts)

## Como executar

Com Node.js e npm instalados, execute na raiz deste projeto:

```bash
npm ci
npm start
```

O script de inicialização usa `npx ts-node` para abrir o menu interativo no terminal.
