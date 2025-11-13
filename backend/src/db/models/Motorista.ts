export interface IMotoristaDB {
    id: number;
    nome: string;
    cpf: string;
    celular?: string;
    cnh: string;
    categoria_cnh?: string;
    validade_cnh: string;
    status: "S" | "N";
    dh_inc: string;
}

export default class Motorista {
    constructor(
        public nome: string,
        public cpf: string,
        public celular: string,
        public cnh: string,
        public categoria_cnh: string,
        public validade_cnh: string,
        public status: "S" | "N" = "S"
    ) {}

    // Converte registros do DB para o objeto Motorista
    static fromDBArray(arr: IMotoristaDB[]): Motorista[] {
        return arr.map(m => new Motorista(
            m.nome,
            m.cpf,
            m.celular ?? "",
            m.cnh,
            m.categoria_cnh ?? "",
            m.validade_cnh,
            m.status
        ));
    }
}
