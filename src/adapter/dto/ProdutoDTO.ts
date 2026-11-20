import { ProdutoProps } from "../../core/produto/model/Produto";

// DTO: Data Transfer Object
// DRY: Don't Repeat Yourself
export default interface ProdutoDTO extends ProdutoProps {
    precoFormatado?: string
}