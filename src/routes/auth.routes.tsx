import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'
import { Header } from 'react-native/Libraries/NewAppScreen'

type AuthRoutes = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='signIn'
        component={SignIn}
        options={{ animation: 'slide_from_right' }}
      />
      <Screen
        name='signUp'
        component={SignUp}
        options={{ animation: 'slide_from_right' }}
      />
    </Navigator>
  )
}
