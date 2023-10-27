import { HistoryDTO } from '@dtos/HistoryDTO'
import { HStack, Heading, Text, VStack } from 'native-base'

type Props = {
  data: HistoryDTO
}

export function HistoryCard({ data }: Props) {
  return (
    <HStack w={'full'} pb={2} mb={3} bg={'gray.900'} rounded={'md'}>
      <HStack
        w={'full'}
        p={3}
        px={4}
        bg={'gray.600'}
        alignItems={'center'}
        justifyContent={'space-between'}
        rounded={'md'}
      >
        <VStack mr={4} flex={1}>
          <Heading
            color={'white'}
            fontSize={'sm'}
            fontWeight={'bold'}
            textTransform={'capitalize'}
          >
            {data.group}
          </Heading>

          <Text color={'gray.200'} fontSize={'lg'} numberOfLines={1}>
            {data.name}
          </Text>
        </VStack>

        <Text color={'gray.300'} fontSize={'md'}>
          {data.hour}
        </Text>
      </HStack>
    </HStack>
  )
}
