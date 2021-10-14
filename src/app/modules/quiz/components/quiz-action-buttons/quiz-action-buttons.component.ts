import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-quiz-action-buttons',
  templateUrl: './quiz-action-buttons.component.html',
  styleUrls: ['./quiz-action-buttons.component.scss']
})
export class QuizActionButtonsComponent implements OnInit {

  @Input() isFinished: boolean = false;
  @Input() currentQuestionIndex:number = 0;


  @Output() resetQuiz: EventEmitter<any> = new EventEmitter();
  @Output() nextQuestion: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onNext() {
    this.nextQuestion.emit(this.currentQuestionIndex);
  }

  onReset() {
    this.resetQuiz.emit(this.isFinished)
  }

}
