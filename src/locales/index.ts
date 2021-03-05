import { createI18n, I18nOptions } from 'vue-i18n'
import vi from './vi'
import en from './en'

export default createI18n(<I18nOptions>{
  locale: 'vi',
  fallbackLocale: 'vi',
  messages: {
    vi,
    en,
  },
})
