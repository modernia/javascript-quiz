export interface Question {
  id: number
  text: string
  code: string
  options: string[]
  answer: string
  selectedAnswer?: string | null
  isCorrect?: boolean | null
}
