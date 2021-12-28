import {DataCRUDControllerInterface} from "../../data/CRUD-controller/data-CRUD-controller.interface";
import {Injectable} from "@angular/core";
import {CreateDTO} from "../../data/CRUD-controller/createDTO";
import {ReadDTO} from "../../data/CRUD-controller/readDTO";

@Injectable({
  providedIn: 'root'
})

export class LocalStorageControllerService implements DataCRUDControllerInterface {

  constructor() {
  }

  private quizStorage = window.localStorage;

  public create(data: CreateDTO): any {
    this.quizStorage.setItem('quiz-state', JSON.stringify(data.payload))
  }

  // public read(): ReadDTO[] {
  //
  // }

  public readById(id?:string): ReadDTO | undefined {
    return JSON.parse(this.quizStorage.getItem('quiz-state') || "{}");
  }

  // public update(id: string, data: UpdateDTO): ReadDTO {
  //
  // }

  public delete(id: string): void {
    this.quizStorage.removeItem('quiz-state')
  }

}
