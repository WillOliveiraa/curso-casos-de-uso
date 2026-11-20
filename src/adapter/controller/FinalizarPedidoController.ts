import Conversor from "../../core/shared/Conversor"
import FinalizarPedido from "../../core/pedido/service/FinalizarPedido"
import Pedido from "../../core/pedido/model/Pedido"
import PedidoDTO from "../dto/PedidoDTO"
import RepositorioPedido from "../../core/pedido/provider/RepositorioPedido"

export default class FinalizarPedidoController {
    constructor(private readonly repo: RepositorioPedido) {}

    async executar(pedido: PedidoDTO): Promise<void> {
        const conversorEntrada: Conversor<PedidoDTO, Pedido> = {
            converter(pedido: PedidoDTO) {
                return new Pedido(pedido)
            },
        }

        const casoDeUso = new FinalizarPedido(this.repo, conversorEntrada)
        return casoDeUso.executar(pedido)
    }
}
