import { Request, Response } from "express";
import CaminhaoService from "./CaminhaoService";
import Caminhao, { ICaminhaoDB } from "../../db/models/Caminhao";

// export default class CaminhaoController {
//     constructor(private readonly service: CaminhaoService){
//     }

//     async get(req: Request, res: Response){

//         try {

//             const result: { data: ICaminhaoDB[], total: number } = await this.service.get(req.query)

//             const resultFormatt = Caminhao.fromDBArray(result.data)

//             res.status(200).json({result: resultFormatt, total: result.total})

//         } catch (error) { 
//             console.log(error)
//         }


//     }

//     async update(req: Request, res: Response) {
        
//     }
//     async create(req: Request, res: Response) {

//     }

//     async delete(req: Request, res: Response) {

//     }
    
// }

export default class CaminhaoController {
  constructor(private readonly service: CaminhaoService) {}

  async get(req: Request, res: Response) {
    
    try {
      const result: { data: ICaminhaoDB[], total: number }  = await this.service.get(req.query);
      const resultFormatt = Caminhao.fromDBArray(result.data);
      res.status(200).json({ result: resultFormatt, total: result.total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar caminhões" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const created = await this.service.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar caminhão" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await this.service.update(req.params.id, req.body);
      res.status(204).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar caminhão" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar caminhão" });
    }
  }
}