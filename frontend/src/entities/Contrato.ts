import type { IContrato } from "@/interfaces/IContrato";
import CrudFactory from "./crudFactory/CrudFactory";
import { Sanitizer } from "@/utils/Sanitizer";
import { R } from "@/validation/rules";

export default class Contrato extends CrudFactory implements IContrato {

    id?: number | undefined;
    nroContrato?: string | undefined;
    cliente!: { id: number; name: string; };
    dtEmiss!: string;
    dtSaida!: string;
    origem!: { id: number; name: string; };
    destino!: { id: number; name: string; };
    placa!: string;
    pesoT!: number;
    valorUnit!: number;
    valorTotal!: number;
    valorReceb!: number;
    valorPago?: number | undefined;
    statusViagem!: { id: number; name: string; };
    statusContrato!: { id: number; name: string; };

    readonly rules = {
        cliente: { id: { required: R.required() } },
        dtEmiss: { required: R.required() },
        dtSaida: { required: R.required() },
        origem: { id: { required: R.required() } },
        destino: { id: { required: R.required() } },
        placa: { required: R.required() },
        pesoT: { required: R.required() },
        valorUnit: { required: R.required() },
        valorTotal: { required: R.required() },
        statusViagem: { id: { required: R.required() } },
        statusContrato: { id: { required: R.required() } },
    }


    constructor(init?: Partial<IContrato>) {
        super("api/contrato")
        Object.assign(this, { ...init, 
            cliente: init?.cliente?.id ? init.cliente.id : { id: null },
            origem: init?.origem?.id ? init.origem.id : { id: null },
            destino: init?.destino?.id ? init.destino.id : { id: null },
        });
    }

    clear(preserveId: boolean = false) {
        const id = this.id
        Object.assign(this, new Contrato())
        if (preserveId) this.id = id
    }


    toJSON() {
        return Sanitizer.sanitizeObject({
            id: this.id,
            nroContrato: this.nroContrato,
            clienteId: this.cliente?.id,
            origemId: this.origem?.id,
            destinoId: this.destino?.id,
            statusViagemId: this.statusViagem?.id,
            statusContratoId: this.statusContrato?.id,
            dtEmiss: this.dtEmiss,
            dtSaida: this.dtSaida,
            placa: this.placa,
            pesoT: this.pesoT,
            valorUnit: this.valorUnit,
            valorTotal: this.valorTotal,
            valorPago: this.valorPago
        });
    }
}