import {QuestionClass} from "./question.class";
import {ResultClass} from "./result.class";
import {AnswerClass} from "./answer.class";

export class QuizClass {
  questions: QuestionClass[];
  results: ResultClass[];
  counter: number = 0;
  result: number = 0;
  score: number = 0;

  constructor(questions: QuestionClass[], results: ResultClass[]) // тело опросника состоит из данных о тип теста, массивов вопросов и оценок и методов перехода к следующему вопросу, окончанию опроса, и подсчёта очков
  {
    //this.testType = testType; // тип теста
    this.questions = questions;// массив вопросов
    this.results = results; // массив оценок
    this.reset();
  }


  public isFinished(): boolean {
    return this.counter >= this.questions.length;
  }

  public getQuestionsCount():number {
    return this.questions.length;
  }

  public getCurrentQuestionNumber():number {
    return this.counter+1;
  }

  private getCurrentQuestion(): QuestionClass | undefined {
    return this.questions[this.counter]
  }

  public reset():void {
    this.counter = 0;
    this.result = 0;
    this.score = 0;
  }

  public getAnswers():AnswerClass[] {
    return this.getCurrentQuestion()?.answers || [];
  }

  public answer(selectedIndex: number): void {
    let worth= this.getCurrentQuestion()?.answer(selectedIndex) || 0;
    this.score += worth || 0;
  }

  public getScore(): number {
    return this.score;
  }

  public getResult(): string {
    return this.results[this.result].resultText;
  }

  public getQuestionText(): string {
    return this.getCurrentQuestion()?.questionText || '';
  }

  public next(): void {
    this.counter++;
    if (this.counter >= this.questions.length) {
      this.evaluate()
    }

  }

  public evaluate() : void {
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].check(this.score)) {
        this.result = i;
      }
    }
  }
}
