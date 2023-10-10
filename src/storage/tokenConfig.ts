import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE } from './storageConfig'

export async function storageTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
}

export async function storageTokenGet() {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
  return storage
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
