<template>
  <el-table
    :data="allPermission"
    style="width: 100%"
    row-key="id"
    border
    default-expand-all
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column
      prop="permissionName"
      :label="$t('permission.name')"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="permissionMark"
      :label="$t('permission.mark')"
      width="180"
    >
    </el-table-column>
    <el-table-column prop="permissionDesc" :label="$t('permission.desc')">
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission.js'
import { watchSwitchLang } from '@/utils/i18.js'

const allPermission = ref([])
const getPermission = async () => {
  allPermission.value = await permissionList()
  console.log(allPermission)
}
getPermission()
watchSwitchLang(getPermission)
</script>

<style lang="scss" scoped></style>
