export interface IPostoDB {
    id: number;
    nome: string;
    cnpj: string;
    cidade_id: number;
    cep?: string;
    dh_inc: string;
}

export default class Posto {
    constructor(
        public nome: string,
        public cnpj: string,
        public cidade_id: number,
        public cep: string = ""
    ) {}

    static fromDBArray(arr: IPostoDB[]): Posto[] {
        return arr.map(p => new Posto(
            p.nome,
            p.cnpj,
            p.cidade_id,
            p.cep ?? ""
        ));
    }
}
