import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quiz-selector',
  templateUrl: './quiz-selector.component.html',
  styleUrls: ['./quiz-selector.component.scss']
})
export class QuizSelectorComponent implements OnInit {

  constructor() { }

  @Input() isStarted: boolean = false;
  @Input() quizVariantsName: string[] = []
  @Input() quizCurrentVariantName: string = ''

  @Output() quizStarted: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  onQuizSelected(){
    this.quizStarted.emit(this.quizCurrentVariantName);
  }

}
