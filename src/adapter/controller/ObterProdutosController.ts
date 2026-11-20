import RepositorioProduto from "../../core/produto/provider/RepositorioProduto"
import ObterProdutos from "../../core/produto/service/ObterProdutos"
import Conversor from "../../core/shared/Conversor"
import ProdutoDTO from "../dto/ProdutoDTO"
import Produto from "../../core/produto/model/Produto"

export default class ObterProdutosController {
    constructor(private readonly repo: RepositorioProduto) {}

    async executar(): Promise<ProdutoDTO[]> {
        const conversorSaida: Conversor<Produto, ProdutoDTO> = {
            converter(produto: Produto): ProdutoDTO {
                return {
                    id: produto.id.valor,
                    nome: produto.nome.completo,
                    preco: produto.preco.valor,
                    precoFormatado: produto.preco.formatado(),
                }
            },
        }
        const casoDeUso = new ObterProdutos(this.repo, conversorSaida)
        return casoDeUso.executar()
    }
}
