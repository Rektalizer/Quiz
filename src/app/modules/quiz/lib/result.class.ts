class Result {
  constructor(resultText: string, worth: number) {
    this.resultText = resultText;
    this.worth = worth;
  }

  resultText: string;
  worth: number;

  check(worth: number): boolean {
    return this.worth <= worth;
  }
}
