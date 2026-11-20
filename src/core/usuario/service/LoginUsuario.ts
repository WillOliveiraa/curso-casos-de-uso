import CasoDeUso from "../../shared/CasoDeUso"
import Email from "../../shared/Email"
import Usuario from "../model/Usuario"
import ProvedorCriptografia from "../provider/ProvedorCriptografia"
import RepositorioUsuario from "../provider/RepositorioUsuario"

type Entrada = {
    email: string
    senha: string
}

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {
    constructor(
        private repo: RepositorioUsuario,
        private provedorCripto: ProvedorCriptografia
    ) {}

    async executar(entrada: Entrada): Promise<Usuario> {
        const email = new Email(entrada.email)

        const usuario = await this.repo.obterPorEmail(email.valor)
        if (!usuario) throw new Error("Usuário não encontrado")

        const mesmaSenha = this.provedorCripto.comparar(
            entrada.senha,
            usuario.senha!.hash
        )
        if (!mesmaSenha) throw new Error("Senha incorreta")

        return usuario.semSenha()
    }
}
