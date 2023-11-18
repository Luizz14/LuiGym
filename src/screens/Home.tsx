import { useCallback, useEffect, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Text,
  VStack,
  View,
  useDisclose,
  useToast,
} from 'native-base'

import { Group } from '@components/Group'
import { Loading } from '@components/Loading'
import { HomeHeader } from '@components/HomeHeader'
import { ExerciseCard } from '@components/ExerciseCard'

import firestore from '@react-native-firebase/firestore'

import { Actionsheet } from 'native-base'

import {
  addWorkoutByGroup,
  getGroups,
  getWorkoutsByIdGroup,
} from '@firebase/workout'
import { api } from '@services/api'
import { ExerciseDTO } from '@dtos/ExerciseDTO'

import { AppError } from '@utils/AppError'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { GroupDTO } from '@dtos/GroupDTO'
import { Button } from '@components/Button'
import { useModal } from '@contexts/ModalContext'

export function Home() {
  const [isLoading, setIsloading] = useState(true)
  const [groups, setGroups] = useState<GroupDTO[]>([])
  const [exercise, setExercise] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('bíceps e costas')

  const { isModalOpen, openModal, closeModal, modalContent } = useModal()

  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenModal() {
    openModal(
      <View>
        <Heading color={'black'}>FILHAD A PUTAAAAAHHHHHAHHA</Heading>
        <Button
          title='FECHA ESSA MERDA AI HAHAHAHAYYY'
          onPress={() => closeModal()}
        />
      </View>
    )
  }

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  // async function fetchGroups() {
  //   try {
  //     setIsloading(true)

  //     const response = await api.get('/groups')
  //     setGroups(response.data)
  //   } catch (error) {
  //     const isAppError = error instanceof AppError
  //     const title = isAppError
  //       ? error.message
  //       : 'Não foi possivel carregar os grupos musculares.'

  //     toast.show({
  //       title,
  //       placement: 'top',
  //       bgColor: 'red.500',
  //     })
  //   } finally {
  //     setIsloading(false)
  //   }
  // }

  // async function fetchExercisesByGroup() {
  //   try {
  //     setIsloading(true)

  //     const response = await api.get(`/exercises/bygroup/${groupSelected}`)
  //     setExercise(response.data)
  //   } catch (error) {
  //     const isAppError = error instanceof AppError
  //     const title = isAppError
  //       ? error.message
  //       : 'Não foi possivel carregar os exercícios.'

  //     toast.show({
  //       title,
  //       placement: 'top',
  //       bgColor: 'red.500',
  //     })
  //   } finally {
  //     setIsloading(false)
  //   }
  // }

  async function handleAddNewDocument() {
    try {
      const data: ExerciseDTO = {
        id: '3323',
        name: 'supino',
        repetitions: '12',
        series: 3,
      }
      // await addWorkoutByGroup(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleGetWorkoutsByGroup(group: GroupDTO) {
    try {
      setIsloading(true)
      setGroupSelected(group.name)

      const response = await getWorkoutsByIdGroup(group.id)
      setExercise(response)
    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }

  async function getAllGroups() {
    try {
      const response = await getGroups()
      setGroups(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllGroups()
  }, [])

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchExercisesByGroup()
  //   }, [groupSelected])
  // )

  return (
    <VStack>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Group
            name={item.name}
            isActive={
              groupSelected.toLocaleUpperCase() ===
              item.name.toLocaleUpperCase()
            }
            onPress={() => handleGetWorkoutsByGroup(item)}
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
      <Button title='Open Modal' onPress={handleOpenModal} />

      <Actionsheet isOpen={isModalOpen} onClose={closeModal} color={'gray.500'}>
        <Actionsheet.Content bgColor={'gray.400'}>
          {modalContent}
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  )
}
