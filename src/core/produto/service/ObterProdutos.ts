import CasoDeUso from "../../shared/CasoDeUso"
import Conversor from "../../shared/Conversor"
import Produto from "../model/Produto"
import RepositorioProduto from "../provider/RepositorioProduto"

export default class ObterProdutos implements CasoDeUso<void, any[]> {
    constructor(
        private readonly repo: RepositorioProduto,
        private readonly conversorSaida: Conversor<Produto, any>
    ) {}

    async executar(): Promise<any[]> {
        const produtos = await this.repo.obterTodos()
        return produtos.map((produto) => this.conversorSaida.converter(produto))
    }
}
