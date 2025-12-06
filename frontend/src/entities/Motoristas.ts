import { R } from "@/validation/rules";
import { Sanitizer } from "@/utils/Sanitizer";
import type { IMotoristas } from "@/interfaces/IMotoristas";
import CrudFactory from "./crudFactory/CrudFactory";

export default class Motoristas extends CrudFactory implements IMotoristas {
    id?: number;
    nome!: string;
    cpf!: string;
    cnpj!: string;
    telefone!: string;
    cnh!: string;
    categoriaCnh!: string;
    validadeCnh!: string;
    tipoVinculo!: string;
    placaVeiculo!: string;
    status!: string;

    readonly rules = {
        nome: { required: R.required(), min: R.min(3) },
        cpf: { required: R.required(), cpf: R.cpf() },
        cnpj: { cnpj: R.cnpj() },
        telefone: { required: R.required() },
        cnh: { required: R.required() },
        categoriaCnh: { required: R.required() },
        validadeCnh: { required: R.required() },
        tipoVinculo: { required: R.required() },
        placaVeiculo: { required: R.required() },
        status: { required: R.required() },
    };

    constructor(init?: Partial<IMotoristas>) {
        super("api/motoristas");
        Object.assign(this, init);
    }

    clear(preserveId: boolean = false) {
        const id = this.id;
        Object.assign(this, new Motoristas());
        if (preserveId) this.id = id;
    }

    toJSON(): IMotoristas {
        return Sanitizer.sanitizeObject({
            id: this.id,
            nome: this.nome,
            cpf: this.cpf,
            cnpj: this.cnpj,
            telefone: this.telefone,
            cnh: this.cnh,
            categoriaCnh: this.categoriaCnh,
            validadeCnh: this.validadeCnh,
            tipoVinculo: this.tipoVinculo,
            placaVeiculo: this.placaVeiculo,
            status: this.status,
        });
    }
}
