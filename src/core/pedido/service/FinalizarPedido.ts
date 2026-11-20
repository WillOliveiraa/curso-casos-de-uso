import CasoDeUso from "../../shared/CasoDeUso"
import RepositorioPedido from "../provider/RepositorioPedido"
import Conversor from "../../shared/Conversor"
import Pedido from "../model/Pedido"

export default class FinalizarPedido implements CasoDeUso<any, void> {
    constructor(
        private readonly repo: RepositorioPedido,
        private readonly conversorEntrada: Conversor<any, Pedido>,
    ) {}

    async executar(entrada: any): Promise<void> {
        const pedido = this.conversorEntrada.converter(entrada)
        const pedidoFinalizado = pedido.finalizar()
        await this.repo.salvar(pedidoFinalizado)
    }
}
