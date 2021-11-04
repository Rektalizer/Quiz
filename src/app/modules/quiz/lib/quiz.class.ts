import {QuestionClass} from "./question.class";
import {ResultClass} from "./result.class";
import {AnswerClass} from "./answer.class";
import {QuizDataInterface} from "../models/quiz-data.interface";
import {QuizProgressStateInterface} from "../models/quiz-progress-state.interface";



export class QuizClass {
  currentQuizProgressState: QuizProgressStateInterface
  currentQuizData: QuizDataInterface
  questions: QuestionClass[];
  results: ResultClass[];
  result: number = 0;
  selectedVariant: number = 0;

  constructor(questions: QuestionClass[], results: ResultClass[], currentQuizData: QuizDataInterface, currentQuizProgressState: QuizProgressStateInterface) // тело опросника состоит из данных о тип теста, массивов вопросов и оценок и методов перехода к следующему вопросу, окончанию опроса, и подсчёта очков
  {
    //this.testType = testType; // тип теста
    this.currentQuizProgressState = currentQuizProgressState;
    this.currentQuizData = currentQuizData;
    this.questions = questions;
    this.results = results;
    this.reset();
  }

  private quizStarted: boolean = false;

  public getCurrentVariant(): string {
    return this.currentQuizData.variantName;
  }

  public setQuizData(quizData: QuizDataInterface) : void {
    this.currentQuizData = quizData
    // console.log('Current quiz data')
    // console.log(this.currentQuizData)
    this.questions = this.currentQuizData.questions.map((value => new QuestionClass(
      value.questionText,
      value.answers.map(value1 => new AnswerClass(
        value1.answerText, value1.worth
      )
    ))))
    this.results = this.currentQuizData.results.map(value => new ResultClass(value.resultText, value.worth))
    this.currentQuizProgressState.currentQuestionIndex++  //костыль
    this.quizStarted = true;
    // console.log('Current quiz state');
    // console.log(this.currentQuizProgressState);
  }

  public getQuizProgressState(): QuizProgressStateInterface {
    return this.currentQuizProgressState = {
      variantId: this.currentQuizData.variant_id,
      currentQuestionIndex: this.currentQuizProgressState.currentQuestionIndex,
      score: this.currentQuizProgressState.score
    }
  }

  public setQuizProgressState(state: QuizProgressStateInterface): void {
    this.currentQuizProgressState = state;
  }


  public isStarted() : boolean {
    return this.quizStarted;
  }

  public isFinished(): boolean {
    return this.currentQuizProgressState.currentQuestionIndex >= this.questions.length;
  }

  public getQuestionsCount():number {
    return this.questions.length;
  }

  public getCurrentQuestionNumber():number {
    return this.currentQuizProgressState.currentQuestionIndex+1;
  }

  private getCurrentQuestion(): QuestionClass | undefined {
    return this.questions[this.currentQuizProgressState.currentQuestionIndex]
  }

  public reset():void {
    this.quizStarted = false;
    this.currentQuizProgressState.currentQuestionIndex = -1; //костыль
    this.result = 0;
    this.currentQuizProgressState.score = 0;
  }

  public getAnswers():AnswerClass[] {
    return this.getCurrentQuestion()?.answers || [];
  }

  public answer(selectedIndex: number): void {
    let worth = this.getCurrentQuestion()?.answer(selectedIndex) || 0;
    this.currentQuizProgressState.score += worth || 0;
  }

  public getScore(): number {
    return this.currentQuizProgressState.score;
  }

  public getResult(): string {
    return this.results[this.result].resultText;
  }

  public getQuestionText(): string {
    return this.getCurrentQuestion()?.questionText || '';
  }

  public next(): void {
    this.currentQuizProgressState.currentQuestionIndex++;
    if (this.currentQuizProgressState.currentQuestionIndex >= this.questions.length) {
      this.evaluate()
    }

  }

  public evaluate() : void {
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].check(this.currentQuizProgressState.score)) {
        this.result = i;
      }
    }
  }
}
