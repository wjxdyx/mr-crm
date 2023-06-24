<script lang="ts" setup name="User">
import { Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import apiUser from '@/api/modules/user'
import useUserStore from '@/store/modules/user'

const search = ref({
  name: '',
  phone: '',
})
const staffTableData = ref([])
const page = ref({
  index: 1,
  limit: 30,
  total: 0,
})

async function getAllUser() {
  const { data, total } = await apiUser.getAllUser(page.value.index, page.value.limit)
  staffTableData.value = data
  page.value.total = total
}
// eslint-disable-next-line unused-imports/no-unused-vars
async function pageChange(e: number) {
  page.value.index = e
  await getAllUser()
}
const saveMainData = ref({
  nickname: '',
  username: '',
  password: '',
  phone: '',
  auth_group: 'staff',
})
const saveMainVisible = ref(false)
async function create() {
  saveMainVisible.value = true
}
async function confirm() {
  saveMainVisible.value = true
  const res = await apiUser.createUser(saveMainData.value)
  if (res.code === 100) {
    saveMainVisible.value = true
    ElMessage({
      type: 'success',
      message: res.msg,
    })
  }
  else {
    ElMessage({
      type: 'warning',
      message: res.msg,
    })
  }
}
async function delRow(user: any, index: any) {
  const res = await apiUser.delUser(user.sys_user_id)
  staffTableData.value.splice(index, 1)
  if (res.code === 400) {
    ElMessage({
      type: 'warning',
      message: res.msg,
    })
  }
  else {
    ElMessage({
      type: 'success',
      message: res.msg,
    })
  }
}
const auth_group = ref('xxxx')
auth_group.value = useUserStore().auth_group
onMounted(() => {
  getAllUser()
})
</script>

<template>
  <div class="layout-grid">
    <page-main class="filter-header" title="员工信息">
      <el-form :inline="true" class="query-tobar">
        <el-form-item label="名称">
          <el-input v-model="search.name" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="search.phone" placeholder="Please input" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="getAllUser()">
            查询
          </el-button>

          <el-button v-if="auth_group === 'admin'" type="success" @click="create()">
            新增
          </el-button>
        </el-form-item>
      </el-form>
    </page-main>
    <!-- 面板内容区 -->
    <div style="padding: 0 20px;">
      <el-table border height="400px" scrollbar-always-on stripe highlight-current-row :data="staffTableData"
                table-layout="auto" class="table-header-filter"
      >
        <el-table-column fixed type="index" label="序" width="50" />
        <el-table-column fixed prop="username" label="登陆账户" width="160">
          <template #default="scope">
            <el-link type="primary" :underline="false">
              {{ scope.row.username }}
            </el-link>
          </template>
        </el-table-column>

        <el-table-column fixed prop="nickname" label="昵称" width="100">
          <template #default="scope">
            <el-icon size="22px">
              <svg-icon v-if="scope.row.gender === 1" name="ep:female" class="translate-center" />
              <svg-icon v-if="scope.row.gender === 2" name="ep:male" class="translate-center" />
              <svg-icon v-if="scope.row.gender === 0" name="ep:user-filled" class="translate-center" />
            </el-icon>
            <el-link type="primary" :underline="false">
              {{ scope.row.nickname }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="登录IP">
          <template #default="scope">
            <el-link type="primary" :underline="false">
              {{ scope.row.ip }}
            </el-link>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="reception" label="接待数" width="160" /> -->
        <el-table-column v-if="useUserStore().auth_group !== 'staff'" label="操作">
          <template #default="scope">
            <el-button type="primary" :icon="Delete" link style="position: relative;left: -5px;"
                       @click="delRow(scope.row, scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="上次登录时间" width="160" />

        <el-table-column fixed prop="deviceUid" label="设备指纹" width="120" />

        <el-table-column prop="auth_group" label="用户组" width="180">
          <template #default="scope">
            <span v-if="scope.row.auth_group === 'staff'">员工</span>
            <span v-if="scope.row.auth_group === 'director'">主管</span>
            <span v-if="scope.row.auth_group === 'admin'">超级管理</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="180" />
        <el-table-column prop="create_time" label="更新时间" width="180" />
      </el-table>

      <el-dialog v-model="saveMainVisible" title="新增" width="30%">
        <el-form :model="saveMainData" style="display: grid;grid-template-columns: 1fr 1fr;column-gap: 20px;">
          <el-form-item label="昵称">
            <el-input v-model="saveMainData.nickname" autocomplete="off" />
          </el-form-item>
          <el-form-item label="账户">
            <el-input v-model="saveMainData.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="saveMainData.password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="saveMainData.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="用户组" style="grid-column-start: span 2;">
            <el-radio-group v-model="saveMainData.auth_group" size="large">
              <el-radio-button label="staff">
                员工
              </el-radio-button>
              <el-radio-button label="director">
                主管
              </el-radio-button>
              <el-radio-button label="admin">
                超级管理
              </el-radio-button>
            </el-radio-group>
          </el-form-item>

          <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
                                                                                                                    <el-select v-model="form.region" placeholder="Please select a zone">
                                                                                                                      <el-option label="Zone No.1" value="shanghai" />
                                                                                                                      <el-option label="Zone No.2" value="beijing" />
                                                                                                                    </el-select>
                                                                                                                  </el-form-item> -->
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="saveMainVisible = false">取消</el-button>
            <el-button type="primary" @click="confirm">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.table-header-filter) {
  .translate-center {
    margin-right: 8px;
    font-size: 18px;
  }

  tbody .cell {
    display: flex;
    align-content: center;
    align-items: center;
  }
}

/* stylelint-disable-next-line scss/double-slash-comment-whitespace-inside */
//------抽屉样式-----//
:deep(.el-tabs__content) {
  padding: 5px;
}

:deep(.el-tabs--border-card) {
  border: 0 !important;

  .el-tabs__header,
  .el-tabs__item {
    border: 0 !important;
  }
}

:deep(.csr-drawer) {
  top: unset;
  height: calc(100% - var(--g-header-height));

  .el-drawer__body {
    padding: 0 !important;
  }

  .el-drawer__header {
    background-color: #414141;
    padding: 0;
  }

  .el-drawer__title {
    background-color: #414141;
    padding: 10px;
  }

  .el-drawer__close-btn {
    position: absolute;
    right: 0;
    top: 10px;
  }

  .drawer-csr-panel {
    border-top: 1px solid #eee;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 14px;
    justify-items: start;
    align-items: center;
    padding: 10px;
  }
}

:deep(.el-drawer__header) {
  background-color: #414141;
  color: white;
  margin: 0;
  padding: 10px;
}

.query-tobar {
  display: flex;
  align-items: center;
  padding-top: 30px;
}

.layout-grid {
  display: flex;
  flex-direction: column;
  height: 100%;
}

:deep(tbody) {
  .cell {
    padding: 0 10px;
  }
}

/* stylelint-disable-next-line scss/double-slash-comment-whitespace-inside */
//-----------//
.filter-header {
  :deep(.title-container) {
    display: flex;
    justify-content: space-between;
    width: calc(100% + 40px);
    padding: 14px 20px;
    margin-left: -20px;
    margin-top: -20px;
    margin-bottom: 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
    transition: var(--el-transition-border);
  }
}

:deep(thead) {
  .el-table__cell {
    background-color: #efefef;
    font-size: 14px;
  }
}

:deep(.csr-table) {
  .el-table__cell:first-child {
    border-top-left-radius: 10px;
  }

  .el-table__cell:last-child {
    border-top-right-radius: 10px;
  }
}

.filter-table {
  margin-top: 0;
  padding: 5px;
}
</style>
