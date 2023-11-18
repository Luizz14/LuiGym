import { IPressableProps, Text, Pressable, Box } from 'native-base'

type Props = IPressableProps & {
  name: string
  isActive?: boolean
}

export function Group({ name, isActive = false, ...rest }: Props) {
  return (
    <Pressable
      mr={3}
      paddingBottom={1.5}
      bg={'gray.600'}
      rounded={'md'}
      justifyContent={'center'}
      alignItems={'center'}
      overflow={'hidden'}
      isPressed={isActive}
      color={'blue.500'}
      _pressed={{
        marginTop: 1.5,
        paddingBottom: 0,
      }}
      {...rest}
    >
      <Box
        h={'full'}
        p={2}
        rounded={'md'}
        justifyContent={'center'}
        alignItems={'center'}
        bg={'gray.500'}
        color={'blue.500'}
      >
        <Text
          color={isActive ? 'blue.500' : 'gray.200'}
          textTransform={'uppercase'}
          fontSize={'xs'}
          fontFamily={'heading'}
        >
          {name}
        </Text>
      </Box>
    </Pressable>
  )
}
