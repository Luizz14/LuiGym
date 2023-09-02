import { Center, Heading, Image, Text, VStack, ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import LogoSvg from '@assets/logo.svg'
import backGroundImg from '@assets/background.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

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
          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Input placeholder='Senha' secureTextEntry />

          <Button title='Acessar' />

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
