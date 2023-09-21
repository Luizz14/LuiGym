import { UserPhoto } from './UserPhoto'
import { HStack, Heading, Icon, Text, VStack } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export function HomeHeader() {
  return (
    <HStack bg={'gray.600'} pt={16} pb={5} px={8} alignItems={'center'}>
      <UserPhoto
        source={{ uri: 'https://github.com/Luizz14.png' }}
        size={16}
        alt='Imagem de perfil'
        mr={4}
      />

      <VStack flex={1}>
        <Text color={'gray.100'} fontSize={'md'}>
          Olá,
        </Text>

        <Heading color={'gray.100'} fontSize={'md'}>
          Gustavo
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name='logout' size={7} color={'gray.200'} />
      </TouchableOpacity>
    </HStack>
  )
}
