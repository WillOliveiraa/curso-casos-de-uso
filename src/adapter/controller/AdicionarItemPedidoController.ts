import AdicionarItemPedido from "../../core/pedido/service/AdicionarItemPedido"
import Conversor from "../../core/shared/Conversor"
import ItemPedido from "../../core/pedido/model/ItemPedido"
import Pedido from "../../core/pedido/model/Pedido"
import PedidoDTO from "../dto/PedidoDTO"
import Produto from "../../core/produto/model/Produto"
import ProdutoDTO from "../dto/ProdutoDTO"
import Quantidade from "../../core/shared/Quantidade"
import Usuario from "../../core/usuario/model/Usuario"
import UsuarioDTO from "../dto/UsuarioDTO"

type Entrada = {
    pedido: PedidoDTO | null
    produto: ProdutoDTO
    quantidade: number
    cliente: UsuarioDTO
}

export default class AdicionarItemPedidoController {
    async executar(entrada: Entrada): Promise<PedidoDTO> {
        const conversorEntrada: Conversor<Entrada, any> = {
            converter(entrada: Entrada) {
                return {
                    pedido: entrada.pedido
                        ? new Pedido(entrada.pedido)
                        : undefined,
                    cliente: new Usuario(entrada.cliente),
                    item: ItemPedido.novo(
                        new Produto(entrada.produto),
                        new Quantidade(entrada.quantidade)
                    ),
                }
            },
        }

        const conversorSaida: Conversor<Pedido, PedidoDTO> = {
            converter(pedido: Pedido) {
                return {
                    ...pedido.props,
                    valorTotalFormatado: pedido.valorTotal.formatado(),
                    itens: pedido.itens.map((item) => ({
                        ...item.props,
                        valorFormatado: item.valor.formatado(),
                    })),
                } as PedidoDTO
            },
        }

        const casoDeUso = new AdicionarItemPedido(
            conversorEntrada,
            conversorSaida
        )

        return casoDeUso.executar(entrada)
    }
}
