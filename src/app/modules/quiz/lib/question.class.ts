import {AnswerClass} from "./answer.class";

export class QuestionClass {
  constructor(questionText: string, answers: AnswerClass[]) {
    this.questionText = questionText;
    this.answers = answers;
  }

  questionText: string;
  answers: AnswerClass[];

  public answer(selected: any): number {
    return this.answers[selected]?.worth;
  }


}
