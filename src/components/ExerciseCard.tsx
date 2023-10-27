import {
  Center,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  Pressable,
  IPressableProps,
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { api } from '@services/api'

type Props = IPressableProps & {
  data: ExerciseDTO
}

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <Pressable
      mb={3}
      pb={2}
      bg={'gray.600'}
      rounded={'lg'}
      _pressed={{
        pb: 0,
        mt: 2,
      }}
      {...rest}
    >
      <HStack bg={'gray.500'} alignItems={'center'} p={2} pr={4} rounded={'lg'}>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt='Atividade'
          w={16}
          h={16}
          rounded={'md'}
          mr={4}
          resizeMode='cover'
        />
        <VStack flex={1}>
          <Heading fontSize={'lg'} color={'white'}>
            {data.name}
          </Heading>

          <Text fontSize={'sm'} color={'gray.200'} mt={2} numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={MaterialIcons} name='arrow-forward-ios' color={'gray.300'} />
      </HStack>
    </Pressable>
  )
}
