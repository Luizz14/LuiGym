import { ReactNode, createContext, useEffect, useState } from 'react'

import { api } from '@services/api'
import { UserDTO } from '@dtos/UserDTO'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/userConfig'
import {
  storageTokenGet,
  storageAuthTokenRemove,
  storageTokenSave,
} from '@storage/tokenConfig'

export type AuthContextDataProps = {
  user: UserDTO
  isLoadingUserData: boolean
  signIn: (email: string, password: string) => Promise<void>
  userUpdatedProfile: (userUpdated: UserDTO) => Promise<void>
  userSignOut: () => void
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(userData)
    } catch (error) {
      throw error
    }
  }

  async function storageUserAndTokenSave(
    userData: UserDTO,
    token: string,
    refresh_token: string
  ) {
    try {
      await storageUserSave(userData)
      await storageTokenSave({ token, refresh_token })
    } catch (error) {
      throw error
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      await userAndTokenUpdate(data.user, data.token)

      if (data.user && data.token && data.refresh_token) {
        storageUserAndTokenSave(data.user, data.token, data.refresh_token)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserData(true)

      const userLogged = await storageUserGet()
      const { token } = await storageTokenGet()

      if (userLogged && token) {
        await userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function userSignOut() {
    try {
      setIsLoadingUserData(true)

      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  async function userUpdatedProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated)
      await storageUserSave(userUpdated)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(userSignOut)

    return () => {
      subscribe()
    }
  }, [userSignOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingUserData,
        userSignOut,
        userUpdatedProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
