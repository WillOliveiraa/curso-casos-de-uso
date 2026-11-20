import ObterUsuarios from "../../../core/usuario/service/ObterUsuarios"
import RepositorioUsuarioMem from "../../db/RepositorioUsuarioMem"
import Terminal from "../util/Terminal"

export default async function listarUsuarios() {
    Terminal.titulo("Listar Usuários")

    try {
        const repositorio = RepositorioUsuarioMem.instance
        const casoDeUso = new ObterUsuarios(repositorio)

        const usuarios = await casoDeUso.executar()
        Terminal.tabela(usuarios.map((u) => ({
            id: u.id.valor,
            nome: u.nome.completo,
            email: u.email.valor,
        })))
    } catch (e: any) {
        Terminal.erro(e.message)
    } finally {
        await Terminal.esperarEnter()
    }
}
