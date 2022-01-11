import i18n from '@/i18n'
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18'
const t = i18n.global.t

// 默认的数据源
export const optionsMethods = () => [
  {
    label: t('article.ranking'),
    prop: 'ranking'
  },
  {
    label: t('article.title'),
    prop: 'title'
  },
  {
    label: t('article.author'),
    prop: 'author'
  },
  {
    label: t('article.publicDate'),
    prop: 'publicDate'
  },
  {
    label: t('article.desc'),
    prop: 'desc'
  },
  {
    label: t('article.action'),
    prop: 'action'
  }
]
export const options = ref(optionsMethods())

// checkBox数据源
export const checkBoxOptions = ref([])

const initCheckBoxCheck = () => {
  checkBoxOptions.value = options.value.map(item => item.label)
}
initCheckBoxCheck()
// 监听语言改变
watchSwitchLang(() => {
  options.value = optionsMethods()
  initCheckBoxCheck()
})

// 监听checkbox选择动态渲染表单 选中后的表单处理
export const tableColumns = ref([])
watch(checkBoxOptions, val => {
  tableColumns.value = []
  const selectData = options.value.filter(item => {
    return val.includes(item.label)
  })
  tableColumns.value.push(...selectData)
}, { deep: true, immediate: true })
