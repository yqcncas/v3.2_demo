import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间
import 'dayjs/locale/zh-cn' // 引入中文
dayjs.extend(relativeTime)

const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

const relativeTimeMethods = (val) => {
  console.log(val)
 if (!isNaN(val)) {
   val = parseInt(val)
 }
//  return val
  dayjs.locale(localStorage.getItem('lang') === 'zh' ? 'zh-cn' : 'en') // 引入中文
 return dayjs().to(dayjs(val))
}

export default app => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTimeMethods
  }
}
