import {QuizDataInterface} from "../models/quiz-data.interface";
import {MockDatabaseService} from "../mock-database/mock-database.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class QuizDataService {

  constructor(private mockDataBaseService: MockDatabaseService) {

  }

  getQuizVariantsNames(): string[] {
    let variantsNames = this.mockDataBaseService.read();
    return variantsNames.map(value => value._id);
  }

  getQuizData(quizVariantName:string):QuizDataInterface {
    let currentQuizData = this.mockDataBaseService.readById(quizVariantName);
    return currentQuizData?.payload
  }

 }

