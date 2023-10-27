import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Heading, Icon, Text, VStack } from 'native-base'

import { UserPhoto } from './UserPhoto'
import DefaultImageUser from '@assets/userPhotoDefault.png'

import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'

export function HomeHeader() {
  const { user, userSignOut } = useAuth()

  return (
    <HStack bg={'gray.600'} pt={16} pb={5} px={8} alignItems={'center'}>
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : DefaultImageUser
        }
        size={16}
        alt='Imagem de perfil'
        mr={4}
      />

      <VStack flex={1}>
        <Text color={'gray.100'} fontSize={'md'}>
          Olá,
        </Text>

        <Heading fontFamily={'heading'} color={'gray.100'} fontSize={'lg'}>
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={userSignOut}>
        <Icon as={MaterialIcons} name='logout' size={7} color={'gray.200'} />
      </TouchableOpacity>
    </HStack>
  )
}
