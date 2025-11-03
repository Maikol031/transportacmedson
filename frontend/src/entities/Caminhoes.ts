import { R } from "@/validation/rules";
import { Sanitizer } from '@/utils/Sanitizer'
import type { ICaminhoes } from "@/interfaces/ICaminhoes";
import CrudFactory from "./crudFactory/CrudFactory";

export default class Caminhoes extends CrudFactory implements ICaminhoes {
    id?: number;
    placa!: string;
    modelo!: string;
    dataVencTacografo!: string;
    kilometragem!: string;
    numeroAet!: string;
    emissaoAet!: string;
    validadeAet!: string;
    situacaoAet!: string;

    readonly rules = {
        placa: { required: R.required(), min: R.min(4) },
        modelo: { required: R.required() },
        dataVencTacografo: { required: R.required() },
        kilometragem: { required: R.required() },
        numeroAet: { required: R.required() },
        emissaoAet: { required: R.required() },
        validadeAet: { required: R.required() },
        situacaoAet: { required: R.required() },
    }

    constructor(init?: Partial<ICaminhoes>) {
        super("/api/cadastro/caminhoes")
        Object.assign(this, init);
    }

    clear(preserveId: boolean = false) {
        const id = this.id
        Object.assign(this, new Caminhoes())
        if (preserveId) this.id = id
    }

    toJSON(): ICaminhoes {
        return Sanitizer.sanitizeObject({
            id: this.id,
            placa: this.placa,
            modelo: this.modelo,
            dataVencTacografo: this.dataVencTacografo,
            kilometragem: this.kilometragem,
            numeroAet: this.numeroAet,
            emissaoAet: this.emissaoAet,
            validadeAet: this.validadeAet,
            situacaoAet: this.situacaoAet,
        })
    }

}