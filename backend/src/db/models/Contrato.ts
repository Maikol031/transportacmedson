// src/db/models/Contrato.ts

export interface IContratoDB {
    id: number;
    nro_contrato?: string;
    cliente_id: number;
    origem_id: number;
    destino_id: number;
    caminhao_id: number;
    data_emissao: string;
    data_saida?: string;
    peso: number;
    vlr_unitario: string;
    vlr_total: string;
    vlr_pago: string;
    status_viagem: "em_andamento" | "finalizada";
    status_contrato: "pendente" | "pago";
    dh_inc: string;
}

export default class Contrato {
    constructor(
        public nro_contrato: string,
        public cliente_id: number,
        public origem_id: number,
        public destino_id: number,
        public caminhao_id: number,
        public data_emissao: string,
        public data_saida: string | null,
        public peso: number,
        public vlr_unitario: string,
        public vlr_total: string,
        public vlr_pago: string,
        public status_viagem: "em_andamento" | "finalizada",
        public status_contrato: "pendente" | "pago"
    ) {}

    static fromDBArray(arr: IContratoDB[]): Contrato[] {
        return arr.map(c => new Contrato(
            c.nro_contrato ?? null,
            c.cliente_id,
            c.origem_id,
            c.destino_id,
            c.caminhao_id,
            c.data_emissao,
            c.data_saida ?? null,
            c.peso,
            c.vlr_unitario,
            c.vlr_total,
            c.vlr_pago,
            c.status_viagem,
            c.status_contrato
        ));
    }
}
