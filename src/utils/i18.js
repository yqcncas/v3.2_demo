import { watch } from 'vue'
import store from '@/store'
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.lang,
    () => {
      cbs.forEach(cb => cb(store.getters.lang))
    }
  )
}
