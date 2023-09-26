import { Pressable, IPressableProps, Text, HStack, Center } from 'native-base'

type Props = IPressableProps & {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: Props) {
  return (
    <Pressable
      w={'full'}
      pb={2}
      bg={variant === 'outline' ? 'transparent' : 'blue.700'}
      justifyContent={'center'}
      alignItems={'center'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor={'blue.500'}
      rounded={'sm'}
      _pressed={{
        mt: 2,
        pb: 0,
      }}
      {...rest}
    >
      <Center
        w={'full'}
        h={14}
        bg={variant === 'outline' ? 'transparent' : 'blue.500'}
        p={2}
        rounded={'sm'}
      >
        <Text
          color={variant === 'outline' ? 'blue.500' : 'white'}
          fontFamily={'heading'}
          fontSize={'sm'}
        >
          {title}
        </Text>
      </Center>
    </Pressable>
  )
}
