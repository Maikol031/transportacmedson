// src/db/models/Pagamento.ts

export interface IPagamentoDB {
    id: number;
    contrato_id: number;
    tipo: "abastecimento" | "avaria" | "transferência";
    valor: string;
    caminhao_id?: number;
    posto_id?: number;
    data_pagamento: string;
    dh_inc: string;
}

export default class Pagamento {
    constructor(
        public contrato_id: number,
        public tipo: "abastecimento" | "avaria" | "transferência",
        public valor: string,
        public data_pagamento: string,
        public caminhao_id?: number,
        public posto_id?: number
    ) {}

    static fromDBArray(arr: IPagamentoDB[]): Pagamento[] {
        return arr.map(p => new Pagamento(
            p.contrato_id,
            p.tipo,
            p.valor,
            p.data_pagamento,
            p.caminhao_id ?? undefined,
            p.posto_id ?? undefined
        ));
    }
}
