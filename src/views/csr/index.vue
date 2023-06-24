<script lang="ts" setup name="Csr">
import CsrDrawer from './components/csrDrawer.vue'

const csrTableData = ref([])

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
    from: '电话',
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

async function clickQuerySearch() {
  csrTableData.value = []
  // csrTableData.value = await (await apiCsr.myCsr(pageInfo.value?.queryForm)).data
}

async function clickCsrTableRow(e: { csr_name: string; phone: string; csr_id: number }) {
  pageInfo.value.csrView.drawer = true
  pageInfo.value.csrView.rowData = e
}

onMounted(() => {
  clickQuerySearch()
})
// const dataBreak = ref('2023-04-18 17:15:11')
</script>

<template>
  <div class="layout-grid">
    <page-main class="filter-header" title="公共资源">
      <el-form :inline="true" class="query-tobar">
        <el-form-item label="">
          <el-select v-model="pageInfo.queryForm.from" class="" style="width: 100px;" placeholder="业务类型">
            <el-option v-for="item, index in (pageInfo.doc_from?.option as docFromType[])" :key="index" :label="item.name"
                       :value="item.doc_from_id"
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
          <el-date-picker v-model="pageInfo.queryForm.create_time" type="daterange" range-separator="-"
                          start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="x"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="clickQuerySearch">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </page-main>
    <page-main style="flex: auto;overflow: hidden;" class="filter-table">
      <div style="height: auto;">
        <el-table class="csr-table" :data="csrTableData" style="width: 100%;" show-overflow-tooltip="true"
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
          <el-table-column prop="inquiry_pro" label="询价产品" show-overflow-tooltip />
          <el-table-column prop="phone" label="手机号码" width="120" />
          <el-table-column prop="doc_no" label="业务单据" width="140" />
          <el-table-column prop="doc_from" label="类型" width="80" />
          <el-table-column prop="doc_mark" label="说明" show-overflow-tooltip />
          <el-table-column prop="create_time" label="时间" width="180" />
          <el-table-column prop="amount" label="成交金额（元）" width="130" />
        </el-table>
        <el-pagination small background layout="prev, pager, next" :total="1000" style="margin-top: 10px;" />
      </div>
      {{ pageInfo.csrView.drawer }}
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

.query-tobar > div + .query-tobar > div {
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
