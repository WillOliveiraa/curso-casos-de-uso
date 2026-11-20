import Usuario from "../../core/usuario/model/Usuario"
import RepositorioUsuario from "../../core/usuario/provider/RepositorioUsuario"

export default class RepositorioUsuarioMem implements RepositorioUsuario {
    static readonly instance = new RepositorioUsuarioMem()

    private constructor(private usuarios: Usuario[] = []) {}

    async obterPorEmail(email: string): Promise<Usuario | null> {
        return this.usuarios.find((u) => u.email.valor === email) ?? null
    }

    async obterTodos(): Promise<Usuario[]> {
        return this.usuarios
    }

    async salvar(usuario: Usuario): Promise<void> {
        this.usuarios.push(usuario)
    }
}
