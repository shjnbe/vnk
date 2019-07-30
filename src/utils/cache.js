import { AsyncStorage } from "react-native"

export const setCache = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data))
}

export const removeCache = async key => {
  await AsyncStorage.removeItem(key)
}

export const getCache = async key => {
  const val = await AsyncStorage.getItem(key)
  return JSON.parse(val)
}

export const setCacheNotJson = async (key, data) => {
  await AsyncStorage.setItem(key, `${data}`)
}

export const getCacheNotJson = async key => {
  const val = await AsyncStorage.getItem(key)
  return val
}

export default { setCache, getCache, removeCache, setCacheNotJson, getCacheNotJson }
