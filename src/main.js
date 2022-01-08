import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import SvgIcon from '@/icons'
import '@/router/permission.js'
import i18n from '@/i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ELIcons from '@element-plus/icons-vue'
import installFilter from '@/utils/filter.js'

const app = createApp(App)
for (const iconName in ELIcons) {
app.component(iconName, ELIcons[iconName])
}
installFilter(app)

SvgIcon(app)

app.use(store).use(router).use(ElementPlus, { locale: localStorage.getItem('lang') === '1' ? zhCn : '' }).use(i18n).mount('#app')
