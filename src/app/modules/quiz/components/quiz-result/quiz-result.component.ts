import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  @Input() isFinished: boolean = false;
  @Input() score:number = 0;
  @Input() resultText:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
