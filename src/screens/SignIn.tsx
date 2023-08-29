import { Image, VStack } from 'native-base'

import backGroundImg from '@assets/background.png'

export function SignIn() {
  return (
    <VStack flex={1} bg='gray.700'>
      <Image
        source={backGroundImg}
        resizeMode='contain'
        alt='Pessoas teinando'
        position='absolute'
      />
    </VStack>
  )
}
