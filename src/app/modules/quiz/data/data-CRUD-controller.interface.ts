import {ReadDTO} from './readDTO'
import {CreateDTO} from "./createDTO";
import {UpdateDTO} from "./updateDTO";

export interface DataCRUDControllerInterface {
  create?(data:CreateDTO): any,
  read?(query:any): ReadDTO[],
  readById?(variant_id: string): ReadDTO | undefined,
  update?(variant_id:string, data:UpdateDTO): ReadDTO,
  delete?(id:string): void
}
