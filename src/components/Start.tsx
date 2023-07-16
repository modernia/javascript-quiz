import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'

export default function Start () {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions()
  }

  return (
    <Button onClick={handleClick} variant="contained">
      Empezar!
    </Button>
  )
}
