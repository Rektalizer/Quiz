import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-quiz-qestion',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit {

  @Input() questionText: string = ''
  @Input() answerTexts: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

}

