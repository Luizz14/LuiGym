import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
  Center,
  Heading,
  SectionList,
  Text,
  VStack,
  useToast,
} from 'native-base'

import { AppError } from '@utils/AppError'
import { api } from '@services/api'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'

import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<HistoryByDayDTO[]>([])

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)

      const response = await api.get('/history')
      setExercise(response.data)
      console.log(exercise)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possivel carregar os grupos musculares.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [])
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico de exercício' />

      <SectionList
        sections={exercise}
        renderSectionHeader={({ section }) => (
          <Heading color={'gray.200'} fontSize={'md'} mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        renderItem={({ item }) => <HistoryCard data={item} />}
        contentContainerStyle={
          exercise.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color={'gray.100'} textAlign={'center'}>
            Não há exercícios registrados ainda. {'\n'}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        px={8}
      />
    </VStack>
  )
}
