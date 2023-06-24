<script lang="ts" setup name="notDoneDeal">
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
      { doc_from_id: 0, name: '全部' },
      { doc_from_id: 1, name: '电话' },
      { doc_from_id: 2, name: '淘宝' },
      { doc_from_id: 3, name: '微信' },
    ],
  },
  queryForm: {
    from: '全部',
    name: '',
    query_time: undefined,
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
  const query = { ...pageInfo.value.queryForm, ...csrTablePage.value }
  if (query.from === '全部') {
    delete query.from
  }
  const res = (await apiCsr.myEnquiryCsr(query))
  csrTableData.value = res.data
  csrTablePage.value.total = res.total
}
interface TableItem {
  name: string
  age: number
}

async function handleSort({ column, order }: { column: any; prop: keyof TableItem; order: string }) {
  const orderkey = order === 'ascending' ? 'asc' : 'desc'
  csrTablePage.value.index = 1
  const query = { ...pageInfo.value.queryForm, ...csrTablePage.value }
  if (query.from === '全部') {
    delete query.from
  }
  const res = await (await apiCsr.myEnquiryCsr({ ...query, ...{ order: `${column.property}.${orderkey}` } }))
  csrTableData.value = res.data
  csrTablePage.value.total = res.total
}

async function clickCsrTableRow(e: { csr_name: string; phone: string; csr_id: number }) {
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
    <page-main title="客户信息查询" class="filter-header">
      <el-form :inline="true" class="query-tobar">
        <el-form-item label="">
          <el-select v-model="pageInfo.queryForm.from" class="" style="width: 100px;" placeholder="业务类型">
            <el-option v-for="item, index in (pageInfo.doc_from?.option as docFromType[])" :key="index" :label="item.name"
                       :value="item?.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="pageInfo.queryForm.name" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="pageInfo.queryForm.phone" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="日期查询">
          <el-date-picker v-model="pageInfo.queryForm.query_time" type="daterange" range-separator="-"
                          start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="x"
          />
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
                  @sort-change="handleSort" @row-click="clickCsrTableRow"
        >
          <el-table-column type="index" width="60" label="序号" />

          <el-table-column prop="name" label="客户名称" width="140">
            <template #default="scope">
              <span style="color: red;">

                {{ scope.row.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号码" width="120" />
          <el-table-column prop="last_enquiry_amt" sortable="custom" label="询价金额（元）" width="130" />
          <el-table-column prop="enquiry_amt" label="历史总询盘金额" show-overflow-tooltip />
          <el-table-column prop="deal_amt" label="历史总成交金额" show-overflow-tooltip />
          <el-table-column prop="markBread" label="未成交说明" show-overflow-tooltip width="200" />
          <el-table-column prop="username" label="负责人" width="140" />

          <el-table-column prop="create_time" label="创建时间" width="180" />
        </el-table>
        <!-- {{ csrTablePage.total }} -->
        <el-pagination small background layout="prev, pager, next" :page-size="csrTablePage.limit"
                       :total="csrTablePage.total" @current-change="clickQuerySearch"
        />
      </div>
    </page-main>
    <CsrDrawer v-model:visible="pageInfo.csrView.drawer" :row-data="pageInfo.csrView.rowData" />
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
