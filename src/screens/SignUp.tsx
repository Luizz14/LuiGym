import { useForm, Controller } from 'react-hook-form'
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

import { api } from '@services/api'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { AppError } from '@utils/AppError'
import { useAuth } from '@hooks/useAuth'

type HookFormProps = {
  name: string
  email: string
  password: string
  confirm_password: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome!'),
  email: yup
    .string()
    .required('Informe o email!')
    .email('Insira um endereço de email válido!'),
  password: yup
    .string()
    .required('Insira uma senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  confirm_password: yup
    .string()
    .required('Confirme a sua senha!')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere!'),
})

export function SignUp() {
  const toast = useToast()
  const navigation = useNavigation()
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HookFormProps>({
    resolver: yupResolver(signUpSchema),
  })

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: HookFormProps) {
    try {
      await api.post('/users', { name, email, password })
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possivel realizar o cadastro. Tente novamente mais tarde!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name='name'
            rules={{
              required: 'Informe o nome!',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='confirm_password'
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Confirmar senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType='send'
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <VStack w={'full'} space={4}>
            <Button
              title='Criar e acessar'
              onPress={handleSubmit(handleSignUp)}
            />

            <Button
              title='Voltar para o login'
              variant={'outline'}
              onPress={handleGoBack}
            />
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  )
}
