export interface IContrato {
    id?: number;
    nroContrato?: string;
    cliente: { id: number, name: string };
    dtEmiss: string;
    dtSaida: string;
    origem: { id: number, name: string };
    destino: { id: number, name: string };
    placa: string;
    pesoT: number;
    valorUnit: number;
    valorTotal: number;
    valorPago?: number;
    statusViagem: { id: number,  name: string }
    statusContrato: { id: number,  name: string }
}