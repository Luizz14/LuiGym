import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import {
  Center,
  Heading,
  Image,
  Text,
  VStack,
  ScrollView,
  useToast,
} from 'native-base'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import LogoSvg from '@assets/logo.svg'
import backGroundImg from '@assets/background.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useState } from 'react'

type HookFormProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup
    .string()
    .required('Informe o email!')
    .email('Insira um endereço de email válido!'),
  password: yup
    .string()
    .required('Insira uma senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn } = useAuth()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HookFormProps>({
    resolver: yupResolver(signInSchema),
  })

  async function handleSignIn({ email, password }: HookFormProps) {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possivel entrar. Tente novamente mais tarde!'

      toast.show({ title: title, placement: 'top', bgColor: 'red.500' })
    }
  }

  function handleGoToCreateAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg='gray.700' px={10} pb={16}>
        <Image
          source={backGroundImg}
          defaultSource={backGroundImg}
          resizeMode='contain'
          alt='Pessoas teinando'
          position='absolute'
        />

        <Center my={24}>
          <LogoSvg />
          <Text color={'gray.100'} fontSize={'sm'}>
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            color={'gray.100'}
            fontSize={'xl'}
            fontFamily={'heading'}
            mb={6}
          >
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name='email'
            render={({ field: { onChange } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange } }) => (
              <Input
                placeholder='Senha'
                autoCapitalize='none'
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Button
            title='Acessar'
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />

          <Center mt={24} w={'full'}>
            <Text color={'gray.100'} fontSize={'sm'} mb={3} fontFamily={'body'}>
              Ainda não tem acesso?
            </Text>

            <Button
              title='Criar conta'
              variant={'outline'}
              onPress={handleGoToCreateAccount}
            />
          </Center>
        </Center>
      </VStack>
    </ScrollView>
  )
}
