import Produto from "../../../core/produto/model/Produto"
import CadastrarProduto from "../../../core/produto/service/CadastrarProduto"
import RepositorioProdutoMem from "../../db/RepositorioProdutoMem"
import Terminal from "../util/Terminal"

export default async function cadastrarProduto() {
    Terminal.titulo("Cadastro de Produto")

    const nome = await Terminal.campoRequerido("Nome")
    const preco = await Terminal.campoRequerido("Preço")

    try {
        const repositorio = RepositorioProdutoMem.instance
        const casoDeUso = new CadastrarProduto(repositorio)
        await casoDeUso.executar(new Produto({ nome, preco: Number(preco) }))

        Terminal.sucesso(`Produto registrado com sucesso!`)
    } catch (e: any) {
        Terminal.erro(e.message)
    } finally {
        await Terminal.esperarEnter()
    }
}
