import Produto from "../../core/produto/model/Produto"
import Conversor from "../../core/shared/Conversor"
import ProdutoDTO from "../dto/ProdutoDTO"

export default class ProdutoParaDTO implements Conversor<Produto, ProdutoDTO> {
    constructor(private temId: boolean = true) {}

    converter(produto: Produto): ProdutoDTO {
        const produtoDTO: ProdutoDTO = {
            nome: produto.nome.completo,
            precoFormatado: produto.preco.formatado(),
        }

        if (this.temId) produtoDTO.id = produto.id.valor
        return produtoDTO
    }
}
