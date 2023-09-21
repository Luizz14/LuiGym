import { useState } from 'react'
import { Center, Heading, SectionList, Text, VStack } from 'native-base'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'

export function History() {
  const [exercise, setExercise] = useState([
    {
      title: '12.02.23',
      data: ['Costas', 'Remada'],
    },
    {
      title: '13.02.23',
      data: ['Costas', 'Remada'],
    },
  ])

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
        renderItem={({ item }) => <HistoryCard />}
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
