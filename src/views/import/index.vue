<template>
  <upload-excel :onSuccess="onSuccess" />
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS } from '@/components/UploadExcel/utils.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { userBatchImport } from '@/api/user-manage'

const i18n = useI18n()
const router = useRouter()
const onSuccess = async (data) => {
  await userBatchImport(dealData(data.results))
  ElMessage.success({
    message: data.results.length + i18n.t('excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}
const dealData = (res) => {
  const arr = []
  res.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
