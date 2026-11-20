import RegistrarUsuario from "../../../core/usuario/service/RegistrarUsuario"
import CriptografiaPadrao from "../../auth/CriptografiaPadrao"
import RepositorioUsuarioMem from "../../db/RepositorioUsuarioMem"
import Terminal from "../util/Terminal"

export default async function registrarUsuario() {
    Terminal.titulo("Registrar Usuário")

    const nome = await Terminal.campoRequerido("Nome", {
        default: "Fulano de Tal",
    })
    const email = await Terminal.campoRequerido("Email", {
        default: "fulano@formacao.dev",
    })
    const senha = await Terminal.campoRequerido("Senha", {
        echo: false,
        default: "!Senha123",
    })

    try {
        const repositorio = RepositorioUsuarioMem.instance
        const provedorCripto = new CriptografiaPadrao()
        const casoDeUso = new RegistrarUsuario(repositorio, provedorCripto)
        await casoDeUso.executar({ nome, email, senha })
        
        Terminal.sucesso(`Usuário registrado com sucesso!`)
    } catch (e: any) {
        Terminal.erro(e.message)
    } finally {
        await Terminal.esperarEnter()
    }
}
