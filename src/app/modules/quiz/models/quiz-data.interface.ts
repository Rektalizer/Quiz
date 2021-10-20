export interface QuizDataInterface {
  variant_id: string,
  variantName: string,
  questions: { questionText: string, answers: { answerText: string, worth: number }[]}[],
  results: { resultText: string, worth: number }[]
}
