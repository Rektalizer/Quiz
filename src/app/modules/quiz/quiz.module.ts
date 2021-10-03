import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './container/quiz.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { QuizActionButtonsComponent } from './components/quiz-action-buttons/quiz-action-buttons.component';
import { QuizStatusComponent } from './components/quiz-status/quiz-status.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

//containers


//components


@NgModule({
  declarations: [
    QuizComponent,
    QuizQuestionComponent,
    QuizActionButtonsComponent,
    QuizStatusComponent,
    QuizResultComponent
  ],
  exports: [
    QuizComponent
  ],
  imports: [
    CommonModule
  ]
})
export class QuizModule { }
