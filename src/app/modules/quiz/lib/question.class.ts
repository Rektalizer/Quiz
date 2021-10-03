export class Question {
  constructor(questionText: string, answers: string[]) {
    this.questionText = questionText;
    this.answers = answers;
  }

  questionText: string;
  answers: string[];

  answer(selected: any): number {
    return this.answers[selected]?.worth;
  }
}
