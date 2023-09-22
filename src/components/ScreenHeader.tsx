import { Center, Heading } from 'native-base'

type Props = {
  title: string
}

export function ScreenHeader({ title }: Props) {
  return (
    <Center pb={6} pt={16} bg={'gray.600'}>
      <Heading color={'gray.100'} fontSize={'xl'}>
        {title}
      </Heading>
    </Center>
  )
}
