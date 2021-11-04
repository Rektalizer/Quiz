import {Injectable} from '@angular/core';
import {AnswerClass} from "../lib/answer.class";
import {QuestionClass} from "../lib/question.class";
import {ResultClass} from "../lib/result.class";
import {QuizClass} from "../lib/quiz.class";
import {QuizRepresentationInterface} from "./quiz-representation.interface";
import {QuizDataService} from "../data/quiz-data-service/quiz-data.service";
import {QuizStateService} from "../data/quiz-state-service/quiz-state-service";


@Injectable({
  providedIn: 'root'
})


export class QuizService {


  constructor(private quizDataService: QuizDataService, public quizStateService: QuizStateService) {
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
      questions: [{questionText: '', answers: [{answerText: '', worth: 0}]}],
      results: [{resultText: '', worth: 0}]
    }, {
      variantId: '',
      currentQuestionIndex: -1,
      score: 0
    })

  private isReloaded: boolean = false;


  private getAnswerTexts(): string[] {
    let answerArray: string[] = [];
    let answers = this.quiz.getAnswers();
    for (let j = 0; j < answers.length; j++) {
      answerArray.push('Ответ № ' + (j + 1) + ': ' + answers[j].answerText)
    }
    return answerArray;
  }

  public getQuizRepresentation(): QuizRepresentationInterface {

    if (!this.isReloaded) {
      let askToContinue = confirm('Do you want to continue from the last session?')

      if (askToContinue) {
        let loadedQuizState = this.quizStateService.getSavedState()
        let currentQuizData = this.quizDataService.getQuizData(loadedQuizState.variantId)
        // console.log('Loaded quiz state')
        // console.log(loadedQuizState)
        // console.log('Loaded quiz data')
        // console.log(currentQuizData)
        this.isReloaded = true;
        this.quiz.setQuizProgressState(loadedQuizState);
        this.quiz.setQuizData(currentQuizData)
        this.quiz.currentQuizProgressState.currentQuestionIndex = this.quiz.currentQuizProgressState.currentQuestionIndex -1; //костыль
        // console.log('Quiz data loaded into current instance')
        // console.log(this.quiz);
        // console.log('Quiz status loaded into current instance')
        // console.log(this.quiz.currentQuizProgressState)
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
      } else
        this.isReloaded = true;
      // console.log('Quiz representation without loaded state')
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
    } else
      this.isReloaded = true;
    // console.log('Normal quiz representation')
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
        let currentQuizStateNext = this.quiz.getQuizProgressState();
        this.quizStateService.saveState(currentQuizStateNext)
        callback();
        break;
      case "Reset":
        this.quiz.reset()
        let currentQuizStateReset = this.quiz.getQuizProgressState();
        this.quizStateService.saveState(currentQuizStateReset)
        callback();
        break;
      case "Select":
        let currentQuizData = this.quizDataService.getQuizData(payload.selectedVariantIndex)
        this.quiz.setQuizData(currentQuizData)
        this.quiz.selectedVariant = payload.selectedVariantIndex;
        let currentQuizStateSelect = this.quiz.getQuizProgressState();
        this.quizStateService.saveState(currentQuizStateSelect)
        callback();
        break;
    }
  }
}



