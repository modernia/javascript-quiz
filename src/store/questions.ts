import { create } from 'zustand'
import { type Question } from '../../types.d'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit?: number) => Promise<void>
  selectAnswer: (questionId: number, awnserIndex: number) => void
  goToNextQuestion: () => void
  goToPreviousQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async (limit?: number) => {
    const response = await fetch('http://localhost:5173/data2.json')
    const data = await response.json()
    const questions = data.questions.sort(() => Math.random() - 0.5).slice(0, limit ?? 10)
    set({ questions })
  },
  selectAnswer: (questionId, awnserIndex) => {
    // obtener todas la preguntas
    const questions = structuredClone(get().questions)
    // obtener el indice de la pregunta actual
    const currentQuestionIndex = questions.findIndex((question: Question) => question.id === questionId)
    // obtener la pregunta actual
    const currentQuestion = questions[currentQuestionIndex]
    // obtener la respuesta seleccionada
    const selectedAnswer = currentQuestion.options[awnserIndex]
    // obtener la respuesta correcta
    const correctAnswer = currentQuestion.answer
    // comparar la respuesta seleccionada con la correcta
    const isCorrect = selectedAnswer === correctAnswer

    // actualizar la pregunta actual
    questions[currentQuestionIndex] = {
      ...currentQuestion,
      selectedAnswer,
      isCorrect
    }

    // actualizar el estado
    console.log(questions[currentQuestionIndex])
    set({ questions })
  },
  goToNextQuestion: () => {
    const { questions, currentQuestion } = get()
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion })
    }
  },
  goToPreviousQuestion: () => {
    const { currentQuestion } = get()
    const previousQuestion = currentQuestion - 1
    if (previousQuestion >= 0) {
      set({ currentQuestion: previousQuestion })
    }
  },
  reset: () => {
    set({ currentQuestion: 0, questions: [] })
  }
}))
