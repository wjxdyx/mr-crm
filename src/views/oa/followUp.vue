<script lang="ts" setup name="oaFollowUp">
import apiOa from '@/api/modules/oa'
import useUserStore from '@/store/modules/user'

// 页面信息
const tableData = ref([])
const paginate = ref({
  current: 1,
  limit: 30,
  total: 0,
})
async function clickQuerySearch() {
  const { data, total } = await apiOa.review(paginate.value.current, paginate.value.limit)
  console.log(data)

  tableData.value = data
  paginate.value.total = total
}

async function clickCsrTableRow(e: any) {
  console.log(e)
}
async function clickAllow(e: { crm_csr_track_id: any; state: number }, state: number) {
  const { data } = await apiOa.allow(e.crm_csr_track_id, state)
  e.state = state
}
const auth_group = ref('xxxx')
auth_group.value = useUserStore().auth_group
onMounted(() => {
  clickQuerySearch()
})
const timer = setInterval(() => {
  // 定时器的操作逻辑
  clickQuerySearch()
}, 5000)
onUnmounted(() => {
  clearTimeout(timer)
  console.log('Timer is destory!')
})
</script>

<template>
  <div class="layout-grid" style="padding-top: 10px;">
    <page-main v-if="auth_group === 'admin'" style="flex: auto;overflow: hidden;" class="filter-table">
      <div style="height: auto;">
        <el-table class="csr-table" :data="tableData" style="width: 100%;" show-overflow-tooltip="true"
                  @row-click="clickCsrTableRow"
        >
          <el-table-column type="index" label="序/ID" width="100">
            <template #default="scope">
              <span @click="clickCsrTableRow(scope)">

                {{ scope.$index + 1 }}/
                {{ scope.row.crm_csr_track_id }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="csr_name" label="客户名称" width="200">
            <template #default="scope">
              <span style="color: red;">

                {{ scope.row.csr_name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="tfrom" label="类型">
            <template #default="scope">
              <span>

                {{ scope.row.tfrom === 'deal' ? '成交' : '询盘' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="tfrom_from" label="来源" />
          <el-table-column prop="ws_index" label="第几次" />
          <el-table-column prop="ws_step" label="通知间隔">
            <template #default="scope">
              <span>

                {{ scope.row.ws_step / 24 / 60 / 60 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="next_follow_time" label="下次通知" width="160" />
          <el-table-column prop="state" label="状态" show-overflow-tooltip>
            <template #default="scope">
              <span v-show="scope.row.state === 1">通过</span>
              <span v-show="scope.row.state === -1">驳回</span>
              <span v-show="scope.row.state === 0">待审批</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="操作" width="180">
            <template #default="scope">
              <div>
                <el-button @click="clickAllow(scope.row, 1)">
                  允许
                </el-button>
                <el-button type="danger" @click="clickAllow(scope.row, -1)">
                  驳回
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :page-size="paginate.limit" small background layout="prev, pager, next" :total="paginate.total"
                       style="margin-top: 10px;" @current-change="clickQuerySearch"
        />
      </div>
    </page-main>
    <div v-else>
      暂无权限
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.query-tobar>div+.query-tobar>div {
  margin-right: 10px;
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
