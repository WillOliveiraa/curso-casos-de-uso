import Pedido from "../model/Pedido"

export default interface RepositorioPedido {
    salvar(pedido: Pedido): Promise<void>
}
