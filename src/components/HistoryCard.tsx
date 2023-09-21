import { HStack, Heading, Text, VStack } from 'native-base'

type Props = {
  group?: string
  exercise?: string
  hour?: string
}

export function HistoryCard({ group, exercise, hour }: Props) {
  return (
    <HStack
      w={'full'}
      py={4}
      mb={3}
      bg={'gray.600'}
      rounded={'md'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <VStack mr={4}>
        <Heading color={'white'} fontSize={'md'} textTransform={'capitalize'}>
          {group}
        </Heading>

        <Text color={'gray.100'} fontSize={'lg'} numberOfLines={1}>
          {exercise}
        </Text>
      </VStack>

      <Text color={'gray.300'} fontSize={'md'}>
        {hour}
      </Text>
    </HStack>
  )
}
