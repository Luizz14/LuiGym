import { useCallback, useEffect, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base'

import { Group } from '@components/Group'
import { Loading } from '@components/Loading'
import { HomeHeader } from '@components/HomeHeader'
import { ExerciseCard } from '@components/ExerciseCard'

import { api } from '@services/api'
import { ExerciseDTO } from '@dtos/ExerciseDTO'

import { AppError } from '@utils/AppError'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

export function Home() {
  const [isLoading, setIsloading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])
  const [exercise, setExercise] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço')

  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  async function fetchGroups() {
    try {
      setIsloading(true)

      const response = await api.get('/groups')
      setGroups(response.data)
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
      setIsloading(false)
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsloading(true)

      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possivel carregar os exercícios.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsloading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup()
    }, [groupSelected])
  )

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

      {isLoading ? (
        <Loading />
      ) : (
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
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  )
}
