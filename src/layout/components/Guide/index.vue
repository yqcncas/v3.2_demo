<template>
  <div @click.prevent.stop="onClick" id="guide-start">
    <el-tooltip :content="$t('navBar.guide')">
      <svg-icon icon="guide" />
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import steps from './step.js'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false, // 禁止点击蒙版关闭
    doneBtnText: '完成', // 完成按钮标题
    stageBackground: '#fff', // 引导对话的背景色
    closeBtnText: i18n.t('guide.close'), // 关闭按钮标题
    nextBtnText: i18n.t('guide.next'), // 下一步按钮标题
    prevBtnText: i18n.t('guide.prev') // 上一步按钮标题
  })
})
const onClick = () => {
  // setTimeout(() => {
  driver.defineSteps(steps(i18n)) // 指定数据
  driver.start() // 启动
  // }, 1000)
}
</script>

<style lang="scss" scoped></style>
