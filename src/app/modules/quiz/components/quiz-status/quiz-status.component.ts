import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-quiz-status',
  templateUrl: './quiz-status.component.html',
  styleUrls: ['./quiz-status.component.scss']
})
export class QuizStatusComponent implements OnInit {

  constructor() { }

  @Input() currentQuestionIndex:number = 0;
  @Input() totalQuestionsCount:number = 0;
  @Input() isFinished:boolean = false;
  @Input() isStarted:boolean = false;


  ngOnInit(): void {
  }
}
