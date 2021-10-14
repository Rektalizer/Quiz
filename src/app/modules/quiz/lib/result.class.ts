export class ResultClass {
  constructor(resultText: string, worth: number) {
    this.resultText = resultText;
    this.worth = worth;
  }

  resultText: string;
  worth: number;

  public check(worth: number): boolean {
    return this.worth <= worth;
  }
}
