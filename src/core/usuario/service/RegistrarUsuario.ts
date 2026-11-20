import CasoDeUso from "../../shared/CasoDeUso"
import SenhaForte from "../../shared/SenhaForte"
import Usuario from "../model/Usuario"
import ProvedorCriptografia from "../provider/ProvedorCriptografia"
import RepositorioUsuario from "../provider/RepositorioUsuario"

type Entrada = {
    nome: string
    email: string
    senha: string
}

export default class RegistrarUsuario implements CasoDeUso<Entrada, void> {
    constructor(
        private repo: RepositorioUsuario,
        private provedorCripto: ProvedorCriptografia
    ) {}

    async executar(entrada: Entrada): Promise<void> {
        const senha = new SenhaForte(entrada.senha)

        const usuario = new Usuario({
            nome: entrada.nome,
            email: entrada.email,
            senha: this.provedorCripto.criptografar(senha.valor),
        })

        await this.repo.salvar(usuario)
    }
}
