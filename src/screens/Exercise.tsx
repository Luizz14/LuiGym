import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionSvg from '@assets/repetitions.svg'

import { Button } from '@components/Button'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [sendingRegister, setSendingRegister] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const route = useRoute()
  const toast = useToast()

  const { exerciseId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.navigate('home')
  }

  async function fetchExerciseDetails() {
    try {
      setIsloading(true)

      const response = await api.get(`/exercises/${exerciseId}`)
      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possivel carregar os detalhes do exercício.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsloading(false)
    }
  }

  async function handleExerciseDetails() {
    try {
      setSendingRegister(true)

      await api.post('/history', { exercise_id: exerciseId })

      toast.show({
        title: 'Exerício concluído!',
        placement: 'top',
        bgColor: 'blue.500',
      })

      navigation.navigate('home')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possivel carregar os detalhes do exercício.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setSendingRegister(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px={8} bg={'gray.600'} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name='arrow-left' color={'blue.500'} size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent={'space-between'}
          mt={4}
          mb={8}
          alignItems={'center'}
        >
          <Heading color={'gray.100'} fontSize={'lg'} flexShrink={1}>
            {exercise.name}
          </Heading>

          <HStack alignItems={'center'}>
            <BodySvg />
            <Text color={'gray.200'} ml={1} textTransform={'capitalize'}>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        {isLoading ? (
          <Loading />
        ) : (
          <VStack p={8}>
            <Box rounded={'lg'} mb={3} overflow={'hidden'}>
              <Image
                w={'full'}
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt='Nome do exercicio'
                resizeMode='cover'
                rounded={'lg'}
              />
            </Box>

            <Box p={1} pb={2} bg={'gray.800'} borderRadius={'lg'}>
              <Box bg={'gray.600'} rounded={'lg'} pb={4} px={4}>
                <HStack
                  alignItems={'center'}
                  justifyContent={'space-around'}
                  mb={6}
                  mt={5}
                >
                  <HStack>
                    <SeriesSvg />
                    <Text color={'gray.200'} ml={2}>
                      {exercise.series} séries
                    </Text>
                  </HStack>

                  <HStack>
                    <RepetitionSvg />
                    <Text color={'gray.200'} ml={2}>
                      {exercise.repetitions} repetições
                    </Text>
                  </HStack>
                </HStack>

                <Button
                  title='Marcar como realizado'
                  onPress={handleExerciseDetails}
                  isLoading={sendingRegister}
                />
              </Box>
            </Box>
          </VStack>
        )}
      </ScrollView>
    </VStack>
  )
}
