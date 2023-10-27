import { Pressable, IPressableProps, Text, HStack, Center } from 'native-base'
import { Loading } from './Loading'

type Props = IPressableProps & {
  title: string
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}

export function Button({
  title,
  variant = 'solid',
  isLoading = false,
  ...rest
}: Props) {
  return (
    <Pressable
      w={'full'}
      pb={isLoading ? 0 : 2}
      mt={isLoading ? 2 : 0}
      bg={variant === 'outline' ? 'transparent' : 'blue.700'}
      justifyContent={'center'}
      alignItems={'center'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor={'blue.500'}
      rounded={'2xl'}
      _pressed={{
        mt: 2,
        pb: 0,
      }}
      isDisabled={isLoading}
      {...rest}
    >
      <Center
        w={'full'}
        h={14}
        p={2}
        bg={variant === 'outline' ? 'transparent' : 'blue.500'}
        borderWidth={variant === 'outline' ? 1 : 0}
        borderColor={'blue.500'}
        rounded={'2xl'}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Text
            color={variant === 'outline' ? 'blue.500' : 'white'}
            fontFamily={'heading'}
            fontSize={'sm'}
          >
            {title}
          </Text>
        )}
      </Center>
    </Pressable>
  )
}
