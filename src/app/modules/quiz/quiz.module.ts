import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuizComponent} from './container/quiz.component';
import {QuizQuestionComponent} from './components/quiz-question/quiz-question.component';
import {QuizActionButtonsComponent} from './components/quiz-action-buttons/quiz-action-buttons.component';
import {QuizStatusComponent} from './components/quiz-status/quiz-status.component';
import {QuizResultComponent} from './components/quiz-result/quiz-result.component';
import {QuizService} from "./service/quiz.service";
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import { QuizSelectorComponent } from './components/quiz-selector/quiz-selector.component';
import {MatSelectModule} from "@angular/material/select";

//containers

// TODO: когда опрос закончен можно перезапустить
// TODO: если не выбьран вариант, не пускать дальше

//components


@NgModule({
  declarations: [
    QuizComponent,
    QuizQuestionComponent,
    QuizActionButtonsComponent,
    QuizStatusComponent,
    QuizResultComponent,
    QuizSelectorComponent
  ],
  exports: [
    QuizComponent
  ],
    imports: [
        SharedModule,
        CommonModule,
        MatButtonModule,
        MatSelectModule
    ],
  providers: [
    QuizService
  ]
})
export class QuizModule {
}
