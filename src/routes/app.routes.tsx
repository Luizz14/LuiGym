import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

import { useTheme } from 'native-base'

import HomeSvg from '@assets/home.svg'
import ProfileSvg from '@assets/profile.svg'
import HistorySvg from '@assets/history.svg'
import ExerciseSvg from '@assets/series.svg'

import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { History } from '@screens/History'
import { Exercise } from '@screens/Exercise'
import { Platform } from 'react-native'

type AppRoutes = {
  home: undefined
  history: undefined
  exercise: undefined
  profile: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()

  const SvgSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.blue[500],
        tabBarInactiveBackgroundColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS == 'android' ? 'auto' : 96,
          paddingBottom: sizes[7],
          paddingTop: sizes[7],
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
    >
      <Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={SvgSize} height={SvgSize} />
          ),
        }}
      />
      <Screen
        name='history'
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={SvgSize} height={SvgSize} />
          ),
        }}
      />
      <Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={SvgSize} height={SvgSize} />
          ),
        }}
      />
      <Screen
        name='exercise'
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
