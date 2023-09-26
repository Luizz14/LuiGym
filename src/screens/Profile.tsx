import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'
import { ScreenHeader } from '@components/ScreenHeader'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/luizz14.png')

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      const photoSelectedUri = photoSelected.assets[0].uri

      if (photoSelectedUri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelectedUri)

        setUserPhoto(photoSelectedUri)
        /* if (photoInfo.size && (photoInfo.size)) {
          return toast.show({
            title: 'Essa img eh mt grande',
            placement: 'top',
            bgColor: 'red.500'
          })

        } */
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />

      <ScrollView contentContainerStyle={{ paddingBottom: 26 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={'full'}
              startColor={'gray.500'}
              endColor={'gray.400'}
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt={'Foto de perfil'}
              size={33}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color={'blue.500'}
              fontWeight={'bold'}
              fontSize={'md'}
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input bg={'gray.600'} placeholder='Nome' />

          <Input bg={'gray.600'} placeholder='E-mail' isDisabled />

          <Heading
            color={'gray.200'}
            fontSize={'md'}
            mb={2}
            alignSelf={'flex-start'}
            mt={12}
          >
            Alterar senha
          </Heading>

          <Input bg={'gray.600'} placeholder='Senha antiga' secureTextEntry />
          <Input bg={'gray.600'} placeholder='Nova senha' secureTextEntry />

          <Button title='Atualizar' />
        </Center>
      </ScrollView>
    </VStack>
  )
}
