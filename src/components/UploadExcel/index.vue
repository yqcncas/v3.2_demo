<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">{{
        $t('uploadExcel.upload')
      }}</el-button>
      <input
        type="file"
        ref="excelUploadInputRef"
        class="excel-upload-input"
        accept=".xlsx,.xls"
        @change="handleChange"
      />
    </div>
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon><upload-filled /></el-icon>
      <span>{{ $t('uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 上传前的回调
  beforeUpload: {
    type: Function
  },
  // 上传成功后的回调
  onSuccess: {
    type: Function
  }
})
const excelUploadInputRef = ref(null)

const loading = ref(false)
const handleUpload = () => {
  excelUploadInputRef.value.click()
}
// input change事件
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return ''
  uploadFile(rawFile)
}

const uploadFile = (rawFile) => {
  // 先把input内容置空
  excelUploadInputRef.value.value = null
  // 执行读取文件步骤
  readerData(rawFile)
}

const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 读取操作完成时触发
    reader.onload = (e) => {
      // 获取到解析的数据
      const data = e.target.result
      // 利用xlsx对数据进行解析
      const workBook = XLSX.read(data, { type: 'array' })
      // 获取第一张表格的名称
      const firstSheetName = workBook.SheetNames[0]
      // 根据名称读取第一张表的数据
      const workSheet = workBook.Sheets[firstSheetName]
      // 解析数据表头
      const header = getHeaderRow(workSheet)
      // 解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 传入解析后的数据
      generateData({ header, results })
      // 处理loading
      loading.value = false
      // 成功回调
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}
// 根据导入内容生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

// 拖拽上传
const handleDrop = (e) => {
  if (loading.value) return
  // 获取文件
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('请上传文件')
  }
  const rawFile = files[0]
  // 判断是否是excel
  if (!isExcel(rawFile)) {
    return ElMessage.error('文件必须是excel')
  }
  uploadFile(rawFile)
}
// 悬停
const handleDragover = (e) => {
  // 固定操作
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .el-icon {
    width: 100%;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
