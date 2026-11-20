import ProvedorCriptografia from "../../core/usuario/provider/ProvedorCriptografia"
import bcrypt from "bcrypt"

export default class CriptografiaPadrao implements ProvedorCriptografia {
    criptografar(senha: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    comparar(senha: string, hash: string): boolean {
        return bcrypt.compareSync(senha, hash)
    }
}
