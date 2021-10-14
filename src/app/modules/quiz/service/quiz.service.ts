import {Injectable} from '@angular/core';
import {AnswerClass} from "../lib/answer.class";
import {QuestionClass} from "../lib/question.class";
import {ResultClass} from "../lib/result.class";
import {QuizClass} from "../lib/quiz.class";
import {QuizRepresentationInterface} from "./quiz-representation.interface";
import {Subject} from "rxjs";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";

@Injectable({
  providedIn: 'root'
})


export class QuizService {


  constructor() {
  }


  private quiz = new QuizClass(
    [
      new QuestionClass("50 + 50",
        [
          new AnswerClass("0", 0),
          new AnswerClass("40", 0),
          new AnswerClass("80", 0),
          new AnswerClass("100", 100)
        ]),
      new QuestionClass("Which animal says meow?",
        [
          new AnswerClass("cat", 100),
          new AnswerClass("dog", 0),
          new AnswerClass("duck", 0),
          new AnswerClass("human", 50)
        ]),
    ]
    , [
    new ResultClass("Very bad", 0),
    new ResultClass("Below average", 30),
    new ResultClass("Average", 50),
    new ResultClass("Very good", 70),
    new ResultClass("Perfect", 100)
  ])

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
      isFinished: this.quiz.isFinished(),
      questionText: this.quiz.getQuestionText(),
      answerTexts: this.getAnswerTexts(),
      currentQuestionNumber: this.quiz.getCurrentQuestionNumber(),
      totalQuestionsCount: this.quiz.getQuestionsCount(),
      score: this.quiz.getScore(),
      resultText: this.quiz.getResult()
    };
    }


  public handleAction(actionType: 'Next' | 'Reset', payload: any, callback: (error?: any, result?: any) => void): void {
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
    }
  }
}



