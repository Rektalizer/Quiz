class Quiz {
  questions:string[];
  results: string[];
  counter: number;
  result: number;
  score: number;

  constructor(questions: string[], results: string[]) // тело опросника состоит из данных о тип теста, массивов вопросов и оценок и методов перехода к следующему вопросу, окончанию опроса, и подсчёта очков
  {
    //this.testType = testType; // тип теста
    this.questions = questions; // массив вопросов
    this.results = results; // массив оценок
    this.counter = 0; // номер вопроса
    this.result = 0; // номер результата (например, 0-20 баллов - результат номер 0 (плохо), 21-40 баллов результат номер 1 (удовлетворительно))
    this.score = 0; // кол-во баллов
  }

  answer(selected: any): void {
    let worth = this.questions[this.counter].answer(selected);
    this.score += worth || 0;
  }

  next() {
    this.counter++;

    if (this.counter >= this.questions.length) {
      this.evaluate()
    }

  }

  evaluate() {
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].check(this.score)) {
        this.result = i;
      }
    }
  }
}
