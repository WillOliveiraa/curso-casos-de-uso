import ObterProdutosController from "../../../adapter/controller/ObterProdutosController"
import RepositorioProdutoMem from "../../db/RepositorioProdutoMem"
import adicionarItemNoCarrinho from "../pedido/adicionarItemNoCarrinho"
import Terminal from "../util/Terminal"

export default async function listarProdutos() {
    try {
        const repositorio = RepositorioProdutoMem.instance
        const ctrl = new ObterProdutosController(repositorio)
        const produtos = await ctrl.executar()
        if (produtos.length) {
            const [indice] = await Terminal.menu("Lista de Produtos", [
                ...produtos.map(
                    (produto) => `${produto.nome!} - ${produto.precoFormatado}`
                ),
                "Voltar",
            ])
            const produto = produtos[indice]
            if (!produto) return
            await adicionarItemNoCarrinho(produtos[indice])
        }
    } catch (e: any) {
        Terminal.erro(e.message)
    }
}
