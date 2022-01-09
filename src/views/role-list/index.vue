<template>
  <el-table :data="allRoles" stripe border style="width: 100%">
    <el-table-column type="index" width="50" />
    <el-table-column :label="$t('role.name')" prop="title"> </el-table-column>
    <el-table-column :label="$t('role.desc')" prop="describe">
    </el-table-column>
    <el-table-column
      :label="$t('role.action')"
      prop="action"
      width="260"
      #default="{ row }"
    >
      <el-button
        type="primary"
        size="mini"
        @click="onDistributePermissionClick(row)"
        v-permission="['distributePermission']"
      >
        {{ $t('role.assignPermissions') }}
      </el-button>
    </el-table-column>
  </el-table>
  <roles-tree v-model="dialogVisible" :roleId="roleId" />
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18.js'
import RolesTree from './components/rolesTree.vue'
const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)
const dialogVisible = ref(false)
const roleId = ref('')
const onDistributePermissionClick = (row) => {
  roleId.value = row.id
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped></style>
