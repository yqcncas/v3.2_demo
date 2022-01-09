<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="$t('excel.roleDialogTitle')"
    width="30%"
    @close="onClose"
  >
    <el-tree
      ref="treeRef"
      :props="treeProps"
      show-checkbox
      check-strictly
      default-expand-all
      :data="allPermission"
      node-key="id"
      :default-checked-keys="defaultCheckKeys"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">{{ $t('universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'
import { rolePermission, distributePermission } from '@/api/role'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const treeRef = ref(null)
const treeProps = ref({
  children: 'children',
  label: 'permissionName'
})
const defaultCheckKeys = ref([])
const emits = defineEmits(['update:modelValue'])

const onClose = () => {
  defaultCheckKeys.value = []
  emits('update:modelValue', false)
}
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('role.updateRoleSuccess'))
  onClose()
}
const getRolePermission = async () => {
  defaultCheckKeys.value = await rolePermission(props.roleId)
}
watch(
  () => props.roleId,
  (val) => {
    if (val) {
      getPermissionList()
      getRolePermission()
    }
  }
)

// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}

watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
