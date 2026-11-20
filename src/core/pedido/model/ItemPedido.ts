import Entidade, { EntidadeProps } from "../../shared/Entidade"
import Produto, { ProdutoProps } from "../../produto/model/Produto"
import Quantidade from "../../shared/Quantidade"
import Preco from "../../shared/Preco"

export interface ItemPedidoProps extends EntidadeProps {
    quantidade?: number
    valor?: number
    produto?: ProdutoProps
}

export default class ItemPedido extends Entidade<ItemPedido, ItemPedidoProps> {
    readonly quantidade: Quantidade
    readonly valor: Preco
    readonly produto: Produto

    constructor(props: ItemPedidoProps) {
        super(props)
        this.quantidade = new Quantidade(props.quantidade!)
        this.valor = new Preco(props.valor!)
        this.produto = new Produto(props.produto!)
    }

    static novo(
        produto: Produto,
        quantidade: Quantidade = new Quantidade()
    ): ItemPedido {
        return new ItemPedido({
            produto: produto.props,
            quantidade: quantidade.valor,
            valor: produto.preco.valor,
        })
    }

    get valorTotal(): Preco {
        return new Preco(this.valor.valor * this.quantidade.valor)
    }

    adicionarQuantidade(quantidade: Quantidade): ItemPedido {
        return this.clone({
            quantidade: this.quantidade.somar(quantidade).valor,
        })
    }

    removerQuantidade(quantidade: Quantidade): ItemPedido {
        return this.clone({
            quantidade: this.quantidade.subtrair(quantidade).valor,
        })
    }
}
