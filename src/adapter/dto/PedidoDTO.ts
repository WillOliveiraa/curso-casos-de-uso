import { PedidoProps } from "../../core/pedido/model/Pedido"
import ItemPedidoDTO from "./ItemPedidoDTO"

export default interface PedidoDTO extends PedidoProps {
    valorTotalFormatado: string
    itens: ItemPedidoDTO[]
}
