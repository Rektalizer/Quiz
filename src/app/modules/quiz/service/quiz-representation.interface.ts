export interface QuizRepresentationInterface {
  isStarted: boolean,
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
