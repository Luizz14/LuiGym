import { Spinner, Center } from 'native-base'

export function Loading() {
  return (
    <Center bg='transparent' flex={1}>
      <Spinner color='blue.700' />
    </Center>
  )
}
