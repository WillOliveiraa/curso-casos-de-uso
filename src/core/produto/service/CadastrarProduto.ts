import CasoDeUso from "../../shared/CasoDeUso"
import Produto from "../model/Produto"
import RepositorioProduto from "../provider/RepositorioProduto"

export default class CadastrarProduto implements CasoDeUso<Produto, void> {
    constructor(private readonly repo: RepositorioProduto) {}

    async executar(produto: Produto): Promise<void> {
        await this.repo.salvar(produto)
    }
}
