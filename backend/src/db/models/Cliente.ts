export interface IClienteDB {
    id: number;
    nome: string;
    razao_social: string;
    documento: string;
    email?: string;
    celular?: string;
    dh_inc: string;
}

export default class Cliente {
    constructor(
        public nome: string,
        public razao_social: string,
        public documento: string,
        public email: string = "",
        public celular: string = ""
    ) {}

    static fromDBArray(arr: IClienteDB[]): Cliente[] {
        return arr.map(c => new Cliente(
            c.nome,
            c.razao_social,
            c.documento,
            c.email ?? "",
            c.celular ?? ""
        ));
    }
}
