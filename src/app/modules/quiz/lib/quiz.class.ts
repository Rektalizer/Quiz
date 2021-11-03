import {QuestionClass} from "./question.class";
import {ResultClass} from "./result.class";
import {AnswerClass} from "./answer.class";
import {QuizDataInterface} from "../models/quiz-data.interface";
import {variants} from "../mock-database/quizdb";


export class QuizClass {
  currentQuizData: QuizDataInterface
  questions: QuestionClass[];
  results: ResultClass[];
  counter: number = -1;
  result: number = 0;
  score: number = 0;

  constructor(questions: QuestionClass[], results: ResultClass[], currentQuizData: QuizDataInterface) // тело опросника состоит из данных о тип теста, массивов вопросов и оценок и методов перехода к следующему вопросу, окончанию опроса, и подсчёта очков
  {
    //this.testType = testType; // тип теста
    this.currentQuizData = currentQuizData;
    this.questions = questions;
    this.results = results;
    this.reset();
  }

  public getCurrentVariant(): string {
    return this.currentQuizData.variantName;
  }

  public setQuizData(quizData: QuizDataInterface) : void {
    this.currentQuizData = quizData
    console.log(this.currentQuizData)
    console.log(this.currentQuizData.questions)
    this.questions = this.currentQuizData.questions.map((value => new QuestionClass(
      value.questionText,
      value.answers.map(value1 => new AnswerClass(
        value1.answerText, value1.worth
      )
    ))))
    this.results = this.currentQuizData.results.map(value => new ResultClass(value.resultText, value.worth))
    this.counter++
  }

  public isStarted() : boolean {
    return this.counter != -1;
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
    this.counter = -1;
    this.result = 0;
    this.score = 0;
  }

  public getAnswers():AnswerClass[] {
    return this.getCurrentQuestion()?.answers || [];
  }

  public answer(selectedIndex: number): void {
    let worth = this.getCurrentQuestion()?.answer(selectedIndex) || 0;
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
