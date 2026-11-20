import Produto from "../../core/produto/model/Produto"
import RepositorioProduto from "../../core/produto/provider/RepositorioProduto"

export default class RepositorioProdutoMem implements RepositorioProduto {
    static readonly instance = new RepositorioProdutoMem()

    private constructor(private produtos: Produto[] = []) {}

    async obterPorId(id: string): Promise<Produto | null> {
        return this.produtos.find((u) => u.id.valor === id) ?? null
    }

    async obterTodos(): Promise<Produto[]> {
        return this.produtos
    }

    async salvar(produto: Produto): Promise<void> {
        this.produtos.push(produto)
    }
}
