import LoginUsuario from "../../../core/usuario/service/LoginUsuario"
import CriptografiaPadrao from "../../auth/CriptografiaPadrao"
import RepositorioUsuarioMem from "../../db/RepositorioUsuarioMem"
import Sessao from "../util/Sessao"
import Terminal from "../util/Terminal"

export default async function loginUsuario() {
    Terminal.titulo("Login Usuário")

    const email = await Terminal.campoRequerido("Email", {
        default: "fulano@formacao.dev",
    })
    const senha = await Terminal.campoRequerido("Senha", {
        echo: true,
        default: "!Senha123",
    })

    try {
        const repositorio = RepositorioUsuarioMem.instance
        const provedorCripto = new CriptografiaPadrao()
        const casoDeUso = new LoginUsuario(repositorio, provedorCripto)
        
        const usuario = await casoDeUso.executar({ email, senha })
        Sessao.iniciar(usuario)

        Terminal.sucesso(`Usuário ${usuario.nome.completo} logado com sucesso!`)
    } catch (e: any) {
        Terminal.erro(e.message)
    } finally {
        await Terminal.esperarEnter()
    }
}
