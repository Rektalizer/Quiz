import {Injectable} from '@angular/core';
import {QuizClass} from "../lib/quiz.class";
import {QuizRepresentationInterface} from "./quiz-representation.interface";
import {QuizDataService} from "../data/quiz-data-service/quiz-data.service";
import {QuizStateService} from "../data/quiz-state-service/quiz-state-service";
import {QuizProgressStateInterface} from "../models/quiz-progress-state.interface";
import {QuizDataInterface} from "../models/quiz-data.interface";


@Injectable({
  providedIn: 'root'
})


export class QuizService {


  constructor(private quizDataService: QuizDataService, public quizStateService: QuizStateService) {
  }

  private quiz?: QuizClass = undefined;

  private startQuiz(data: QuizDataInterface, state?: QuizProgressStateInterface): void {
    if (this.quiz !== undefined) {
      this.finishQuiz();
      this.quiz = new QuizClass(data, state)
      this.quiz.quizStarted = true;
    } else {
      this.quiz = new QuizClass(data, state)
    }
  }

  private finishQuiz(): void {
    delete this.quiz;
  }

  private isServiceInitialized: boolean = false;

  private checkSavedStateExists(): boolean {
    if (this.quizStateService.getSavedState() !== undefined) {
      return this.quizStateService.getSavedState().variantId !== undefined;
    } else return false;
  }


  private prepareQuizRepresentation(): QuizRepresentationInterface {
    if (this.quiz === undefined) {
      console.log("There is no quiz presented, initializing only select functionality")
      return {
        isStarted: false,
        isFinished: false,
        questionText: '',
        answerTexts: [''],
        currentQuestionNumber: 0,
        totalQuestionsCount: 0,
        score: 0,
        resultText: '',
        quizCurrentVariantName: '',
        quizVariantsNames: this.quizDataService.getQuizVariantsNames()
      };
    } else {
      console.log("Normal quiz presentation sent")
      return {
        isStarted: this.quiz.isStarted(),
        isFinished: this.quiz.isFinished(),
        questionText: this.quiz.getQuestionText(),
        answerTexts: this.quiz.getAnswerTexts(),
        currentQuestionNumber: this.quiz.getCurrentQuestionNumber(),
        totalQuestionsCount: this.quiz.getQuestionsCount(),
        score: this.quiz.getScore(),
        resultText: this.quiz.getResult(),
        quizCurrentVariantName: this.quiz.getCurrentVariant(),
        quizVariantsNames: this.quizDataService.getQuizVariantsNames()
      };
    }
  }


  public getQuizRepresentation(): QuizRepresentationInterface {
    if (this.quiz === undefined) {
      console.log("There is no quiz presented, sending variants")
      return this.prepareQuizRepresentation()
    } else {
      if (!this.isServiceInitialized) {
        this.isServiceInitialized = true;
        if (this.checkSavedStateExists()) {
          let askToContinue = confirm('Do you want to continue from the last session?')
          if (askToContinue) {
            let loadedQuizState = this.quizStateService.getSavedState()
            let currentQuizData = this.quizDataService.getQuizData(loadedQuizState.variantId)
            // console.log('Loaded quiz state')
            // console.log(loadedQuizState)
            // console.log('Loaded quiz data')
            // console.log(currentQuizData)
            this.startQuiz(currentQuizData, loadedQuizState);
            // console.log('Quiz data loaded into current instance')
            // console.log(this.quiz);
            // console.log('Quiz status loaded into current instance')
            // console.log(this.quiz.currentQuizProgressState)
            return this.prepareQuizRepresentation()
          }
          console.log('Quiz representation without loaded state')
          return this.prepareQuizRepresentation()
        }
        console.log('Normal quiz representation')
        return this.prepareQuizRepresentation()
      }
      console.log('Quiz representation for first launch(No state found)')
      return this.prepareQuizRepresentation()
    }
  }


  public handleAction(actionType: 'Next' | 'Reset' | 'Select', payload: any, callback: (error?: any, result?: any) => void): void {
    if (this.quiz === undefined) {
      console.log("There is no quiz presented")
      let currentQuizData = this.quizDataService.getQuizData(payload.selectedVariantIndex)
      this.startQuiz(currentQuizData)
      switch (actionType) {
        case "Select":
          let currentQuizData = this.quizDataService.getQuizData(payload.selectedVariantIndex)
          this.startQuiz(currentQuizData)
          callback();
          break;
      }
    } else {
      switch (actionType) {
        case "Next":
          this.quiz.answer(payload.selectedAnswerIndex);
          this.quiz.evaluate();
          this.quiz.next();
          let currentQuizStateNext = this.quiz.getQuizProgressState();
          this.quizStateService.saveState(currentQuizStateNext);
          callback();
          break;
        case "Reset":
          let currentQuizStateReset = this.quiz.getQuizProgressState();
          this.quizStateService.saveState(currentQuizStateReset);
          this.finishQuiz();
          callback();
          break;
        case "Select":
          let currentQuizData = this.quizDataService.getQuizData(payload.selectedVariantIndex)
          this.startQuiz(currentQuizData)
          this.quiz.variant_id = payload.selectedVariantIndex;
          let currentQuizStateSelect = this.quiz.getQuizProgressState();
          this.quizStateService.saveState(currentQuizStateSelect);
          callback();
          break;
      }
    }
  }
    }




