/* eslint-disable antfu/top-level-function */
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'
export const isWorker = typeof WorkerGlobalScope !== 'undefined' && globalThis instanceof WorkerGlobalScope
export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
export const notNullish = <T = any>(val?: T | null | undefined): val is T => val != null
export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition)
    console.warn(...infos)
}
const toString = Object.prototype.toString
export const isObject = (val: any): val is object =>
  toString.call(val) === '[object Object]'
export const now = () => Date.now()
export const timestamp = () => +Date.now()
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
export const noop = () => {}
export const rand = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const hasOwn = <T extends object, K extends keyof T>(val: T, key: K): key is K => Object.prototype.hasOwnProperty.call(val, key)

export const isIOS = /* #__PURE__ */ getIsIOS()

function getIsIOS() {
  return isClient && window?.navigator?.userAgent && (
    (/iP(?:ad|hone|od)/.test(window.navigator.userAgent))
    // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
    // https://github.com/vue-toolskit/vue-toolskit/issues/3577
    || (window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent))
  )
}
/**
 * 检查当前运行环境是否为Mac OS。
 *
 * 这个函数通过检查navigator.userAgent字符串来判断当前运行环境。
 * 如果userAgent字符串中包含"macintosh"或"mac os x"（不区分大小写），则认为当前环境是Mac OS。
 *
 * @returns {boolean} 如果当前环境是Mac OS，返回true，否则返回false。
 */
export function isMacOs(): boolean {
  const macRegex = /macintosh|mac os x/i;
  return macRegex.test(navigator.userAgent);
}