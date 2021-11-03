import {Injectable} from '@angular/core';
import {AnswerClass} from "../lib/answer.class";
import {QuestionClass} from "../lib/question.class";
import {ResultClass} from "../lib/result.class";
import {QuizClass} from "../lib/quiz.class";
import {QuizRepresentationInterface} from "./quiz-representation.interface";
import {Subject} from "rxjs";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {QuizDataService} from "../data/quiz-data.service";


@Injectable({
  providedIn: 'root'
})


export class QuizService {


  constructor(private quizDataService: QuizDataService) {
  }

  private quiz = new QuizClass(
    [
      new QuestionClass("",
        [
          new AnswerClass("", 0),
        ]),
    ]
    , [
      new ResultClass("", 0),
    ], {
      variant_id: '',
      variantName: '',
      questions: [{questionText: '', answers: [{answerText: '', worth: 0 }]}],
      results: [{resultText: '', worth: 0}]
    })


  private getAnswerTexts(): string[] {
    let answerArray: string[] = [];
    let answers = this.quiz.getAnswers();
    for (let j = 0; j < answers.length; j++) {
      answerArray.push('Ответ № '+ (j+1) +': '+ answers[j].answerText)
    }
    return answerArray;
  }


  public getQuizRepresentation(): QuizRepresentationInterface {
    return {
      isStarted: this.quiz.isStarted(),
      isFinished: this.quiz.isFinished(),
      questionText: this.quiz.getQuestionText(),
      answerTexts: this.getAnswerTexts(),
      currentQuestionNumber: this.quiz.getCurrentQuestionNumber(),
      totalQuestionsCount: this.quiz.getQuestionsCount(),
      score: this.quiz.getScore(),
      resultText: this.quiz.getResult(),
      quizCurrentVariantName: this.quiz.getCurrentVariant(),
      quizVariantsNames: this.quizDataService.getQuizVariantsNames()
    };
    }


  public handleAction(actionType: 'Next' | 'Reset' | 'Select', payload: any, callback: (error?: any, result?: any) => void): void {
    switch (actionType) {
      case "Next":
        this.quiz.answer(payload.selectedAnswerIndex)
        this.quiz.evaluate()
        this.quiz.next();
        callback();
        break;
      case "Reset":
        this.quiz.reset()
        callback();
        break;
      case "Select":
      let quiz = new QuizClass(
        [
          new QuestionClass("",
            [
              new AnswerClass("", 0),
            ]),
        ]
        , [
          new ResultClass("", 0),
        ], {
          variant_id: '',
          variantName: '',
          questions: [{questionText: '', answers: [{answerText: '', worth: 0 }]}],
          results: [{resultText: '', worth: 0}]
        })
        let currentQuizData = this.quizDataService.getQuizData(payload.selectedVariantIndex)
        this.quiz.setQuizData(currentQuizData)
        callback();
        break;
    }
  }
}



