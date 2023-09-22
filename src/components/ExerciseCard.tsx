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

type Props = IPressableProps & {}

export function ExerciseCard({ ...rest }: Props) {
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
            uri: 'https://blog.gsuplementos.com.br/wp-content/uploads/2021/04/iStock-1246046696.jpg',
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
            Supino inclinado
          </Heading>

          <Text fontSize={'sm'} color={'gray.200'} mt={2} numberOfLines={2}>
            3 séries x 10 repetições
          </Text>
        </VStack>

        <Icon as={MaterialIcons} name='arrow-forward-ios' color={'gray.300'} />
      </HStack>
    </Pressable>
  )
}
