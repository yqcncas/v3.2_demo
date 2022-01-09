<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="importExcel"
          v-permission="['importUser']"
          >{{ $t('excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onToExcelClick">{{
          $t('excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" label="#" />
        <el-table-column prop="username" :label="$t('excel.name')" />
        <el-table-column prop="mobile" :label="$t('excel.mobile')" />
        <el-table-column :label="$t('excel.avatar')">
          <template v-slot="{ row }">
            <el-image
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
              class="avatar"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.role')">
          <template v-slot="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.openTime')">
          <template v-slot="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.action')" fixed="right" width="300">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="onClickDetailInfo(row._id)"
              >{{ $t('excel.show') }}</el-button
            >
            <el-button
              type="info"
              size="mini"
              @click="onClickRoles(row)"
              v-permission="['distributeRole']"
              >{{ $t('excel.showRole') }}</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
              >{{ $t('excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="limit.page"
        :page-sizes="[2, 10, 15, 20]"
        :page-size="limit.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="limit.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <export-excel v-model="dialogVisible" />
    <RolesDialog
      v-if="roleDialogVisible"
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    />
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage.js'
import { watchSwitchLang } from '@/utils/i18'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ExportExcel from './components/ExportExcel'
import RolesDialog from './components/roles.vue'

const i18n = useI18n()
const tableData = ref([])
const limit = ref({
  total: 0,
  page: 1,
  size: 2
})
const dialogVisible = ref(false)
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onClickRoles = (row) => {
  console.log(row)
  roleDialogVisible.value = true
  selectUserId.value = row._id
}
const getListData = async () => {
  const res = await getUserManageList(limit.value)
  tableData.value = res.list
  limit.value = { ...limit.value, total: res.total }
}
getListData()
onActivated(() => {
  getListData()
})

watchSwitchLang(getListData)

const handleSizeChange = (size) => {
  limit.value.size = size
  getListData()
}
const handleCurrentChange = () => {
  getListData()
}
const router = useRouter()
const importExcel = () => {
  router.push('/user/import')
}
const onRemoveClick = (row) => {
  console.log(row)
  ElMessageBox.confirm(
    i18n.t('excel.dialogTitle1') + row.username + i18n.t('excel.dialogTitle2'),
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUser(row._id)
      ElMessage({
        type: 'success',
        message: i18n.t('excel.removeSuccess')
      })
      getListData()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
const onToExcelClick = () => {
  dialogVisible.value = !dialogVisible.value
}

const onClickDetailInfo = (id) => {
  router.push(`/user/info/${id}`)
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
