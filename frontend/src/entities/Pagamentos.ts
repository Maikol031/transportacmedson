import { type IPagamentos } from "@/interfaces/IPagamentos";
import CrudFactory from "./crudFactory/CrudFactory";
import { Sanitizer } from "@/utils/Sanitizer";
import { R } from "@/validation/rules";

export default class Pagamentos extends CrudFactory implements IPagamentos {

    id?: number
    tipoDespesa!: string;
    valor!: number;
    placa?: string;
    posto?: string;
    dtPagamento!: string;
    observacao?: string;

    readonly rules = {
        tipoDespesa: { required: R.required() },
        valor: { required: R.required() },
        dtPagamento: { required: R.required() },
    };

    constructor(init?: Partial<IPagamentos>) {
        super("api/pagamentos");
        Object.assign(this, init);
    }

    clear(preserveId: boolean = false) {
        const id = this.id;
        Object.assign(this, new Pagamentos());
        if (preserveId) this.id = id;
    }

    toJSON(): IPagamentos {
        return Sanitizer.sanitizeObject({
            id: this.id,
            tipoDespesa: this.tipoDespesa,
            valor: this.valor,
            placa: this.placa,
            posto: this.posto,
            dtPagamento: this.dtPagamento,
            observacao: this.observacao,
        });
    }




}