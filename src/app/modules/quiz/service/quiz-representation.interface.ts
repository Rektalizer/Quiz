export interface QuizRepresentationInterface {
  isFinished: boolean,
  questionText: string,
  answerTexts: string[],
  currentQuestionNumber: number,
  totalQuestionsCount: number,
  score: number,
  resultText: string
  quizCurrentVariantName: string,
  quizVariantsNames: string[]
}
