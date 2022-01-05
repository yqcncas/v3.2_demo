import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from './constant'
/**
 * 获取时间戳
 */
export function getTimeStap () {
  return localStorage.getItem(TIME_STAMP)
}

/**
 * 设置时间戳
 */
 export function setTimeStap () {
  return localStorage.setItem(TIME_STAMP, Date.now())
}

/**
 * 是否超时
 */
export function isCheckTimeout () {
  const currentTime = Date.now()
  const timeStamp = getTimeStap()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
