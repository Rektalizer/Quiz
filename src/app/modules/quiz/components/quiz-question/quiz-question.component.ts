import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-quiz-qestion',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit {

  @Input() isFinished: boolean = false
  @Input() questionText: string = ''
  @Input() answerTexts: string[] = []

  @Output() answerSelect: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

    onChange(event: MatRadioChange): void {
    this.answerSelect.emit(+event.value)
  }
}

