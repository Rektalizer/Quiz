import {variants} from "./quizdb";
import {ReadDTO} from '../../data/CRUD-controller/readDTO'
import {DataCRUDControllerInterface} from "../../data/CRUD-controller/data-CRUD-controller.interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class MockDatabaseService implements DataCRUDControllerInterface {

  constructor() {
  }

  private data = variants;

  private transformReadDTO = (array: any[]) => {
    return array.map(value => {
      return {
        _id: value.variant_id,
        payload: value
      }
    })
  }

  public read(): ReadDTO[] {
    return this.transformReadDTO(this.data)
  }

  public readById(variant_id: string): ReadDTO | undefined {
    let filteredData = this.data.filter((variants) => variants.variant_id === variant_id);
      return {
        _id: filteredData[0].variant_id,
        payload: filteredData[0]
      }
    }



}
