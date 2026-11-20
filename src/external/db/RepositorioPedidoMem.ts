import Pedido from "../../core/pedido/model/Pedido"
import RepositorioPedido from "../../core/pedido/provider/RepositorioPedido"

export default class RepositorioPedidoMem implements RepositorioPedido {
    static readonly instance = new RepositorioPedidoMem()

    private constructor(private pedidos: Pedido[] = []) {}

    async salvar(pedido: Pedido): Promise<void> {
        this.pedidos.push(pedido)
    }
}
