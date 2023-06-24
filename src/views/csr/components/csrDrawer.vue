<script lang="ts" setup name="CsrDrawer">
import CsrTimeLine from './csrTimeline.vue'
import apiCsr from '@/api/modules/csr'

const props = defineProps({
  rowData: {
    type: Object,
    required: true,

  },
  visible: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void
}>()
const drawerTabsSwitch = ref<string>('second')
const drawerVisible = ref(props.visible)
const csrData = ref({
  name: '',
  phone: '',
  deal_amt: '',
  enquiry_amt: '',
})
watch(() => props.rowData.crm_csr_id, (newVal) => {
  console.log(newVal)

  pageCsrOrderTable(1)
})
watch(() => props.visible, (newVal) => {
  drawerVisible.value = newVal
})
watch(() => drawerVisible.value, (newVal) => {
  emit('update:visible', newVal)
})
const csrActivities = ref([])
const csrOrderTable = ref([])
const csrOrderTablePage = ref<{ index: number; limit: number; total?: number }>({
  index: 1, limit: 30, total: 100,

})
async function pageCsrOrderTable(e: number) {
  csrOrderTablePage.value.index = e

  const resr = (await apiCsr.csrOrderPro({ crm_csr_id: props.rowData.crm_csr_id, ...csrOrderTablePage.value }))

  csrData.value = resr.csr
  csrOrderTablePage.value.total = resr.total
  csrOrderTable.value = resr.data
  csrActivities.value = resr.track
}
onMounted(() => {
})
// const dataBreak = ref('2023-04-18 17:15:11')
</script>

<template>
  <el-drawer v-model="drawerVisible" :modal="true" class="csr-drawer" size="50%">
    <template #header="{ titleId, titleClass }">
      <div>
        <div :id="titleId" style="font-weight: bold;" :class="titleClass">
          {{ csrData?.name }}
          [{{ csrData?.phone }}]
        </div>
        <div class="drawer-csr-panel">
          <div>订货总额：{{ csrData?.deal_amt }} </div>
          <div>询盘总额：{{ csrData?.enquiry_amt }}</div>
        </div>
      </div>
    </template>

    <el-tabs v-model="drawerTabsSwitch" class="demo-tabs" type="border-card">
      <el-tab-pane label="订货记录" name="first">
        <el-table :data="csrOrderTable" style="width: 100%;" show-overflow-tooltip="true">
          <el-table-column type="index" width="60" label="序号" />

          <el-table-column prop="from" label="业务类型" width="120" />
          <el-table-column prop="amt" label="金额" width="120">
            <template #default="scope">
              <span style="color: red;">

                {{ scope.row.amt }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="180" />
          <el-table-column prop="mark" label="备注" />
        </el-table>
        <el-pagination small background layout="prev, pager, next" :total="csrOrderTablePage?.total"
                       style="margin-top: 10px;" @current-change="pageCsrOrderTable"
        />
      </el-tab-pane>
      <el-tab-pane label="跟踪记录" name="second" style="padding-top: 20px;">
        <CsrTimeLine :track-data="csrActivities" />
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>
