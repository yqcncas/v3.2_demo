<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="$t('excel.title')"
    width="30%"
    @close="handleClose"
  >
    <el-input
      :placeholder="$t('excel.placeholder')"
      v-model="excelName"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ $t('excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18.js'
import { getUserManageAllList } from '@/api/user-manage.js'
import { USER_RELATIONS } from './ExportConfig.js'
import dayjs from 'dayjs'
const i18n = useI18n()
defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
    required: true
  }
})
const loading = ref(false)
let defaultExcelName = i18n.t('excel.defaultName')
const excelName = ref(defaultExcelName)
watchSwitchLang(() => {
  defaultExcelName = i18n.t('excel.defaultName')
  excelName.value = defaultExcelName
})

const emits = defineEmits(['update:dialogVisible'])

const handleClose = () => {
  emits('update:modelValue', false)
}
const onConfirm = async () => {
  loading.value = true
  const res = (await getUserManageAllList()).list
  const excel = await import('@/utils/Export2Excel.js')
  const data = formatJson(USER_RELATIONS, res)
  excel.export_json_to_excel({
    // 表头
    header: Object.keys(USER_RELATIONS), // ['姓名', '联系方式', '角色', '开通时间']
    // 数据
    data,
    // 文件名
    filename: excelName.value || defaultExcelName
  })
  handleClose()
}

// 数据得变成二维数组 插件才认识 [[yy, 1, 2], [ccc, 3, 4]]
const formatJson = (diffObj, row) => {
  // USER_RELATIONS
  return row.map((item) => { // 一维数组
    return Object.keys(diffObj).map((key) => { // 二维数组
      if (diffObj[key] === 'role') { // 因为是数组 要转换成字符串
        const roles = item[diffObj[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      if (diffObj[key] === 'openTime') { // 时间处理
        return dayjs(parseInt(item[diffObj[key]])).format('YYYY-MM-DD')
      }
      return item[diffObj[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
