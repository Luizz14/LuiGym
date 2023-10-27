import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Controller, useForm } from 'react-hook-form'
import DefaultImageUser from '@assets/userPhotoDefault.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto'
import { ScreenHeader } from '@components/ScreenHeader'

import { api } from '@services/api'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

const PHOTO_SIZE = 33

type HookFormProps = {
  name: string
  email: string
  old_password: string
  password?: string | null | undefined
  confirm_password?: string | null | undefined
}

const ProfileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required(''),
  old_password: yup.string().required('Informe a senha antiga.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema.nullable().required('Informe a confirmação da senha.'),
    }),
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  const toast = useToast()
  const { user, userUpdatedProfile } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HookFormProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(ProfileSchema),
  })

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

      const photoChosed = photoSelected.assets[0]

      if (photoChosed) {
        const photoInfo = await FileSystem.getInfoAsync(photoChosed.uri)

        if (photoChosed.fileSize && photoChosed.fileSize / 1024 / 1024 > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        const fileExtension = photoChosed.uri.split('.').pop()

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoChosed.uri,
          type: `${photoChosed.type}/${fileExtension}`,
        } as any

        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)

        const userUpdatedResponse = await api.patch(
          '/users/avatar',
          userPhotoUploadForm,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )

        const userUpdated = user
        userUpdated.avatar = userUpdatedResponse.data.avatar

        userUpdatedProfile(userUpdated)

        toast.show({
          title: 'Foto alterada com sucesso!',
          placement: 'top',
          bgColor: 'blue.500',
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: HookFormProps) {
    try {
      setIsUpdating(true)
      await api.put('/users', data)

      const userUpdated = user
      userUpdated.name = data.name

      await userUpdatedProfile(userUpdated)

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar os dados. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsUpdating(false)
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
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : DefaultImageUser
              }
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

          <Controller
            control={control}
            name='name'
            render={({ field: { value, onChange } }) => (
              <Input
                bg={'gray.600'}
                placeholder='Nome'
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='email'
            render={({ field: { value } }) => (
              <Input
                bg={'gray.600'}
                placeholder='E-mail'
                isDisabled
                value={value}
              />
            )}
          />

          <Heading
            color={'gray.200'}
            fontSize={'md'}
            mb={2}
            alignSelf={'flex-start'}
            mt={12}
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name='old_password'
            render={({ field: { onChange } }) => (
              <Input
                bg={'gray.600'}
                placeholder='Senha antiga'
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange } }) => (
              <Input
                bg={'gray.600'}
                placeholder='Nova senha'
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='confirm_password'
            render={({ field: { onChange } }) => (
              <Input
                bg={'gray.600'}
                placeholder='Confirmar nova senha'
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title='Atualizar'
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
