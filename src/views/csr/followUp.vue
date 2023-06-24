<script lang="ts" setup name="FollowUp">
import CsrDrawer from './components/csrDrawer.vue'
import apiCsr from '@/api/modules/csr'

const csrTableData = ref([])
const csrTablePage = ref<{ index: number; limit: number; total?: number }>({
  index: 1, limit: 30, total: 100,

})
// 页面信息
const pageInfo = ref<pageInfoType>({
  doc_from: {
    option: [
      { doc_from_id: 1, name: '电话' },
      { doc_from_id: 2, name: '淘宝' },
      { doc_from_id: 3, name: '微信' },
    ],
  },
  queryForm: {

    name: undefined,
    create_time: undefined,
  },
  csrView: {
    drawer: false,
    rowData: {
      crm_csr_id: undefined,
    },
  },

})

async function clickQuerySearch(pageIndex: number) {
  csrTablePage.value.index = pageIndex

  const res = (await apiCsr.myFollowCsr({ ...pageInfo.value.queryForm, ...csrTablePage.value }))
  csrTableData.value = res.data
  csrTablePage.value.total = res.total
}

async function clickCsrTableRow(e: { csr_name: string; phone: string; crm_csr_id: number }) {
  pageInfo.value.csrView.drawer = true
  pageInfo.value.csrView.rowData = e
}

onMounted(() => {
  clickQuerySearch(1)
})
// const dataBreak = ref('2023-04-18 17:15:11')
</script>

<template>
  <div class="layout-grid">
    <page-main title="待办" class="filter-header">
      <el-form :inline="true" class="query-tobar">
        <el-form-item label="名称">
          <el-input v-model="pageInfo.queryForm.name" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="pageInfo.queryForm.phone" placeholder="Please input" />
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="clickQuerySearch(1)">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </page-main>
    <page-main style="flex: auto;overflow: hidden;" class="filter-table">
      <div style="height: auto;">
        <el-table class="csr-table" :data="csrTableData" style="width: 100%;height: 580px;" show-overflow-tooltip="true"
                  @row-click="clickCsrTableRow"
        >
          <el-table-column type="index" width="60" label="序号" />

          <el-table-column prop="csr_name" label="客户名称" width="120">
            <template #default="scope">
              <span style="color: red;">

                {{ scope.row.csr_name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="csr_phone" label="手机号码" width="120" />
          <el-table-column prop="csr_deal_amt" label="历史成交总额" />
          <el-table-column prop="csr_enquiry_amt" label="历史询盘总额" />
          <el-table-column prop="next_follow_time" label="下次回访时间" />
          <el-table-column prop="followed_time" label="上次回访时间" />
          <el-table-column prop="mark" label="说明" show-overflow-tooltip />

          <el-table-column prop="create_time" label="创建时间" width="180" />
        </el-table>
        <!-- {{ csrTablePage }} -->
        <el-pagination small background layout="prev, pager, next" :page-size="csrTablePage.limit"
                       :total="csrTablePage.total" style="margin-top: 10px;" @current-change="clickQuerySearch"
        />
      </div>
    </page-main>
    <CsrDrawer v-model:visible="pageInfo.csrView.drawer" :row-data="pageInfo.csrView.rowData" />
  </div>
</template>

<style lang="scss" scoped>
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
