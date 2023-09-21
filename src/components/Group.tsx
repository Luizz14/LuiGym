import { IPressableProps, Text, Pressable, Box } from 'native-base'

type Props = IPressableProps & {
  name: string
  isActive?: boolean
}

export function Group({ name, isActive = false, ...rest }: Props) {
  return (
    <Pressable
      mr={3}
      maxWidth={24}
      paddingBottom={1.5}
      bg={'gray.600'}
      rounded={'md'}
      justifyContent={'center'}
      alignItems={'center'}
      overflow={'hidden'}
      isPressed={isActive}
      _pressed={{
        // borderColor: 'green.500',
        // borderWidth: 2,
        marginTop: 1.5,
        paddingBottom: 0,
      }}
      {...rest}
    >
      <Box
        w={24}
        h={10}
        rounded={'md'}
        justifyContent={'center'}
        alignItems={'center'}
        bg={'gray.500'}
      >
        <Text
          color={isActive ? 'green.500' : 'gray.200'}
          textTransform={'uppercase'}
          fontSize={'xs'}
          fontWeight={'bold'}
        >
          {name}
        </Text>
      </Box>
    </Pressable>
  )
}
