import {QuestionClass} from "./question.class";
import {ResultClass} from "./result.class";
import {AnswerClass} from "./answer.class";
import {QuizDataInterface} from "../models/quiz-data.interface";
import {QuizProgressStateInterface} from "../models/quiz-progress-state.interface";


export class QuizClass {
  currentQuizProgressState: QuizProgressStateInterface
  currentQuizData: QuizDataInterface
  variant_id: string;
  variantName: string;
  questions: QuestionClass[];
  results: ResultClass[];
  resultIndex: number = 0;

  constructor(currentQuizData: QuizDataInterface, currentQuizProgressState?: QuizProgressStateInterface) // тело опросника состоит из данных о тип теста, массивов вопросов и оценок и методов перехода к следующему вопросу, окончанию опроса, и подсчёта очков
  {
    //this.testType = testType; // тип теста
    this.variantName = currentQuizData.variantName
    this.variant_id = currentQuizData.variant_id
    this.questions = currentQuizData.questions.map((value => new QuestionClass(
      value.questionText,
      value.answers.map(value1 => new AnswerClass(
          value1.answerText, value1.worth
        )
      ))))
    this.results = currentQuizData.results.map(value => new ResultClass(value.resultText, value.worth))

    this.currentQuizProgressState = currentQuizProgressState || {
      variantId: currentQuizData.variant_id,
      currentQuestionIndex: 0,
      score: 0
    };

    this.currentQuizData = currentQuizData;
  }

  public quizStarted: boolean = false;

  public getCurrentVariant(): string {
    return this.currentQuizData.variantName;
  }


  public getQuizProgressState(): QuizProgressStateInterface {
    return this.currentQuizProgressState = {
      variantId: this.currentQuizData.variant_id,
      currentQuestionIndex: this.currentQuizProgressState.currentQuestionIndex,
      score: this.currentQuizProgressState.score
    }
  }

  public getAnswerTexts(): string[]{
      let answerArray: string[] = [];
      let answers = this.getAnswers();
      for (let j = 0; j < answers.length; j++) {
        answerArray.push('Ответ № ' + (j + 1) + ': ' + answers[j].answerText)
      }
      return answerArray;
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


  private getAnswers():AnswerClass[] {
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
    return this.results[this.resultIndex].resultText;
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
        this.resultIndex = i;
      }
    }
  }
}
