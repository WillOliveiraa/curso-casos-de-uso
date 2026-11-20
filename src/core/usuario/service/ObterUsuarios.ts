import CasoDeUso from "../../shared/CasoDeUso"
import Usuario from "../model/Usuario"
import RepositorioUsuario from "../provider/RepositorioUsuario"

export default class ObterUsuarios implements CasoDeUso<void, Usuario[]> {
    constructor(private repo: RepositorioUsuario) {}

    async executar(): Promise<Usuario[]> {
        const usuarios = await this.repo.obterTodos()
        return usuarios.map((u) => u.semSenha())
    }
}
