import { AsyncStorage } from 'react-native'
import moment from 'moment'

const setCache = async (data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data))
}

const removeCache = async key => {
  await AsyncStorage.removeItem(key)
}

const getCache = async key => {
  const val = await AsyncStorage.getItem(key)
  return JSON.parse(val)
}

const setCacheNotJson = async (key, data) => {
  await AsyncStorage.setItem(key, `${data}`)
}

const getCacheNotJson = async key => {
  const val = await AsyncStorage.getItem(key)
  return val
}

export { setCache, getCache, removeCache }
