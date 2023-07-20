import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { type Question as QuestionType } from '../../types.d'
import { useQuestionsStore } from '../store/questions'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Footer from './Footer'
const getBackgroundColor = (info: QuestionType, index: string) => {
  const { selectedAnswer, answer } = info
  // usuario no ha seleccionado nada todavía
  if (selectedAnswer == null) return 'transparent'
  // si ya selecciono pero la solución es incorrecta
  if (index !== answer && index !== selectedAnswer) return 'transparent'
  // si esta es la solución correcta
  if (index === answer) return 'green'
  // si esta es la selección del usuario pero no es correcta
  if (index === selectedAnswer) return 'red'
  // si no es ninguna de las anteriores
  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const handleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', padding: '10px' }}>
      <Typography variant='h5' >
        {info.text}
      </Typography>
      {
        info.code && (
          <SyntaxHighlighter language='javascript' style={darcula}>
          {info.code}
        </SyntaxHighlighter>
        )
      }
      <List sx={{ bgcolor: '#333' }} disablePadding>
      {info.options.map((answer, index) => (
        <ListItem key={index} disablePadding divider>
          <ListItemButton
            disabled={info.selectedAnswer != null}
            sx={{ backgroundColor: getBackgroundColor(info, answer) }}
            onClick={handleClick(index)}
          >
            <ListItemText primary={answer} />
          </ListItemButton>
        </ListItem>
      ))}
      </List>
    </Card>
  )
}

export default function Game () {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goToNextQuestion = useQuestionsStore(state => state.goToNextQuestion)
  const goToPreviousQuestion = useQuestionsStore(state => state.goToPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction='row' gap='2' alignItems='center' justifyContent='center'>
        <IconButton onClick={goToPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        <Typography variant='subtitle1' component='h2'>
          {` ${currentQuestion + 1} / ${questions.length}`}
        </Typography>

        <IconButton onClick={goToNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>

      </Stack>

      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
