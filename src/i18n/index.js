// 导入i18n
import { createI18n } from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'
import { watch } from 'vue'
import store from '@/store'
// 创建数据源
const message = {
  en: {
    ...enLocale
    // msg: {
    //   test: 'hello world'
    // }
  },
  zh: {
    ...zhLocale
    // msg: {
    //   test: '你好世界'
    // }
  }
}

// 创建语言环境变量
const getBrowserLanguage = () => {
  const languageMap = {
    zh: 'zh',
    en: 'en'
  }
  // 如果之前用户没有设置过语言 通过UA判断 自动带入浏览器语言
  const UAlang = navigator.language
  const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
  let localKey
  try {
    localKey = JSON.parse(localStorage.getItem('lang')) || langCode
  } catch (e) {
    localKey = localStorage.getItem('lang') || langCode
  }
  let localLang = languageMap[localKey] || localKey
  if (!localLang) {
    localLang = ((navigator.language || navigator.userLanguage) || 'zh').substr(0, 2)
    if (localLang !== 'zh') {
      localLang = 'en'
    }
  }
  window.localStorage.setItem('lang', localKey)
  return localLang
}

// 初始化i18n
const i18n = createI18n({
  // 因为是v3 使用的是composition API 要把legacy搞为false
  legacy: false,
  // 全局使用t函数
  globalInjection: true,
  locale: getBrowserLanguage() || 'zh', // 语言环境变量
  messages: message // 数据源
})

export default i18n

export function watchSwitchlang(...info) {
  watch(store.getters.lang, () => {
    info.forEach(cb => cb(store.getters.lang))
  }, { deep: true })
}
