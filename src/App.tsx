import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import Game from './components/Game'
import Start from './components/Start'
import { useQuestionsStore } from './store/questions'
import { JavaScript } from './components/Icons'

function App () {
  const questions = useQuestionsStore(state => state.questions)
  // console.log(questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack alignItems='center' gap={1} justifyContent='center'>
          <JavaScript width='100px' height='120px' />
          <Typography variant='h2' component='h1'>
            JavaScript Quizz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
