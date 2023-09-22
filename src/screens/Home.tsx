import { useState } from 'react'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'

import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { ExerciseCard } from '@components/ExerciseCard'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

export function Home() {
  const [groups, setGroups] = useState(['Triceps', 'Biceps', 'Perna', 'Ombro'])
  const [exercise, setExercise] = useState([
    'Remada',
    'Supino reto',
    'Supino inclinado',
  ])
  const [groupSelected, setGroupSelected] = useState('Triceps')

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  return (
    <VStack>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={8}
        maxH={12}
        minH={10}
      />

      <VStack px={8}>
        <HStack justifyContent={'space-between'} mb={5}>
          <Heading color={'gray.200'} fontSize={'md'}>
            Exercícios
          </Heading>

          <Text color={'gray.200'} fontSize={'sm'}>
            {exercise.length}
          </Text>
        </HStack>

        <FlatList
          data={exercise}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}
