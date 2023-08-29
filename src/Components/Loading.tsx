import { Spinner, Center } from 'native-base'

export function Loading() {
  return (
    <Center bg='gray.700'>
      <Spinner color='green.500' />
    </Center>
  )
}
