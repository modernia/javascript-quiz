import { Button, Stack } from '@mui/material'
import useQuestionData from '../hooks/useQuestionData'
import { useQuestionsStore } from '../store/questions'

export default function Footer () {
  const { correct, incorrect, unanswered } = useQuestionData()
  const reset = useQuestionsStore(state => state.reset)

  return (
    <footer style={{ marginTop: '20px' }}>
      <Stack direction='column' spacing={2}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❔ ${unanswered} sin responser`}</strong>
      <Button onClick={reset}>
        Reiniciar
      </Button>
      </Stack>
    </footer>
  )
}
