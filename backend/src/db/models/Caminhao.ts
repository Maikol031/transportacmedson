interface ICaminhao {
    id: number;
    placa: string;
    renavam: string;
    marca: string;
    modelo: string;
    licenciamento: number;
    aets: string;
    dh_inc: Date;
}

export interface ICaminhaoDB {
  id: number;
  placa: string;
  renavam: string;
  marca: string;
  modelo: string;
  licenciamento: number;
  aets: string;
  dh_inc: Date; // Alterado de DHINC para dhinc
}

export default class Caminhao implements ICaminhao {
  id: number
  placa: string
  renavam: string
  marca: string
  modelo: string
  licenciamento: number
  aets: string
  dh_inc: Date


  constructor(data: ICaminhaoDB) {
    this.id = data.id;
    this.placa = data.placa;
    this.renavam = data.renavam;
    this.marca = data.marca;
    this.modelo = data.modelo;
    this.licenciamento = data.licenciamento;
    this.aets = data.aets;
    this.dh_inc = new Date(data.dh_inc); // Alterado de DHINC para dhinc
  }

  static fromDBArray(dataArray: ICaminhaoDB[]): Caminhao[] {
    // ADICIONE ESTA LINHA PARA DEBUGAR
      console.log('Objeto recebido do banco:', dataArray[0]); 
      return dataArray.map(data => new Caminhao(data));
  }
  
}