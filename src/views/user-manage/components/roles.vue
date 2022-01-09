<template>
  <el-dialog
    :title="$t('excel.roleDialogTitle')"
    :model-value="modelValuexxx"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRolesList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { roleList } from '@/api/role.js'
import { userRoles, updateRole } from '@/api/user-manage.js'
import { watchSwitchLang } from '@/utils/i18'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const props = defineProps({
  modelValuexxx: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const userRoleTitleList = ref([])

watch(
  () => props.userId,
  async (val) => {
    const list = await userRoles(val)
    userRoleTitleList.value = list.role.map((item) => item.title)
  },
  { deep: true, immediate: true }
)
const emits = defineEmits(['update:modelValue', 'updateRole'])

const closed = () => {
  emits('update:modelValue', false)
}
const onConfirm = async () => {
  const rolesList = userRoleTitleList.value.map((item) => {
    return allRolesList.value.find((role) => role.title === item)
  })
  await updateRole(props.userId, rolesList)
  ElMessage.success(i18n.t('role.updateRoleSuccess'))
  closed()
  emits('updateRole')
}

const allRolesList = ref([])
const getListData = async () => {
  allRolesList.value = await roleList()
  console.log(allRolesList.value)
}
getListData()
watchSwitchLang(getListData)

// const getUserData = async (id) => {
//   userRoleTitleList.value = await userRoles(id)
// }
</script>

<style lang="scss" scoped></style>
