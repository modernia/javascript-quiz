import { useQuestionsStore } from '../store/questions'

export default function useQuestionData () {
  const questions = useQuestionsStore(state => state.questions)
  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    if (question.selectedAnswer == null) {
      unanswered++
    } else if (question.selectedAnswer === question.answer) {
      correct++
    } else {
      incorrect++
    }
  })

  return { correct, incorrect, unanswered }
}
