export type TipoPedidoStatus = "ABERTO" | "PAGO" | "CANCELADO" | "FINALIZADO"

export default class PedidoStatus {
    static readonly ABERTO = "ABERTO"
    static readonly PAGO = "PAGO"
    static readonly CANCELADO = "CANCELADO"
    static readonly FINALIZADO = "FINALIZADO"

    readonly value: TipoPedidoStatus
    
    constructor(value: TipoPedidoStatus) {
        this.value = value ?? PedidoStatus.ABERTO
    }

    get aberto(): boolean {
        return this.value === PedidoStatus.ABERTO
    }

    get pago(): boolean {
        return this.value === PedidoStatus.PAGO
    }

    get cancelado(): boolean {
        return this.value === PedidoStatus.CANCELADO
    }

    get finalizado(): boolean {
        return this.value === PedidoStatus.FINALIZADO
    }

    pagar(): PedidoStatus {
        if (this.value === PedidoStatus.CANCELADO) {
            throw new Error("Não é possível pagar um pedido cancelado")
        }
        if (this.value === PedidoStatus.FINALIZADO) {
            throw new Error("Não é possível pagar um pedido finalizado")
        }
        if (this.value === PedidoStatus.PAGO) return this
        return new PedidoStatus(PedidoStatus.PAGO)
    }

    cancelar(): PedidoStatus {
        if (this.value === PedidoStatus.FINALIZADO) {
            throw new Error("Não é possível cancelar um pedido finalizado")
        }
        if (this.value === PedidoStatus.CANCELADO) return this
        return new PedidoStatus(PedidoStatus.CANCELADO)
    }

    finalizar(): PedidoStatus {
        if (this.value === PedidoStatus.CANCELADO) {
            throw new Error("Não é possível finalizar um pedido cancelado")
        }
        if (this.value === PedidoStatus.FINALIZADO) return this
        return new PedidoStatus(PedidoStatus.FINALIZADO)
    }
}
