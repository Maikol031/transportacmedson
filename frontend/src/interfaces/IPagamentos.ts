export interface IPagamentos {
    id?: number
    tipoDespesa: string
    valor: number
    placa?: string
    posto?: string
    dtPagamento: string
    observacao?: string
}