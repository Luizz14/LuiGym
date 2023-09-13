import { useState } from 'react'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'

import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { ExerciseCard } from '@components/ExerciseCard'

export function Home() {
  const [groups, setGroups] = useState(['Triceps', 'Biceps', 'Perna', 'Ombro'])
  const [groupSelected, setGroupSelected] = useState('')

  return (
    <VStack>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={8}
        maxH={12}
      />

      <VStack px={8}>
        <HStack justifyContent={'space-between'} mb={5}>
          <Heading color={'gray.200'} fontSize={'md'}>
            Exercícios
          </Heading>

          <Text color={'gray.200'} fontSize={'sm'}>
            4
          </Text>

          <ExerciseCard />
        </HStack>
      </VStack>
    </VStack>
  )
}
