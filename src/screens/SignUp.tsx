import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { Center, Heading, Image, Text, VStack, ScrollView } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import backGroundImg from '@assets/background.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

type HookFormProps = {
  name: string
  email: string
  password: string
  confirm_password: string
}

export function SignUp() {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm<HookFormProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp(data: any) {
    console.log(data)
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
            render={({ field: { onChange, value } }) => (
              <Input placeholder='Nome' onChangeText={onChange} value={value} />
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
              />
            )}
          />

          <Button
            title='Criar e acessar'
            onPress={handleSubmit(handleSignUp)}
          />

          <Button
            title='Voltar para o login'
            variant={'outline'}
            mt={14}
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
