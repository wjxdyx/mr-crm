<script lang="ts" setup name="Csr">
import { ElMessage } from 'element-plus'
import CsrTimeLine from './components/csrTimeline.vue'
import apiCsr from '@/api/modules/csr'

// 页面信息
const pageInfo = ref<pageType>({
  doc_from: {
    option: [
      { doc_from_id: 1, name: '电话' },
      { doc_from_id: 2, name: '淘宝' },
      { doc_from_id: 3, name: '微信' },
    ],
  },
})

// 页面信息
const saveForm = ref<csrSave>({
  crm_csr_id: undefined,
  name: '',
  from: '',
  code: '',
  phone: '',
  mark: '',
  ws_step: undefined,
  amt: undefined,
  pro: [],
  contract: [],
})

const activeName = ref('first')
const csrActivities = ref<csrTimeLine[]>([])

async function csrTrack() {
  if (saveForm.value.crm_csr_id) {
    const { data } = (await apiCsr.csrTrack(saveForm.value.crm_csr_id))

    csrActivities.value = data
  }
}
// 搜索客户下拉

function querySearchAsync(fieldName: string, queryString: string, cb: (arg: any) => void) {
  apiCsr.csrSearch({ [fieldName]: queryString }).then((r) => {
    cb(r.data)
  })
}

function handleSelect(item: Record<string, any>) {
  saveForm.value.code = item.code
  saveForm.value.phone = item.phone
  saveForm.value.name = item.name
  saveForm.value.crm_csr_id = item.crm_csr_id
  csrTrack()
}
const saveBtnState = ref(false)

async function clickSave() {
  try {
    saveBtnState.value = true
    console.log(saveForm.value)
    const formData = new FormData()
    formData.append('from', saveForm.value.from)
    formData.append('name', saveForm.value.name)
    formData.append('phone', saveForm.value.phone)
    if (saveForm.value.ws_step !== undefined) {
      formData.append('step', saveForm.value.ws_step as string)
    }
    formData.append('mark', saveForm.value.mark as string)
    if (saveForm.value.amt) {
      formData.append('amt', saveForm.value.amt.toString())
    }

    await apiCsr.saveEnquiry(formData)

    ElMessage({
      message: '添加成功',
    })
  }
  catch (error: any) {
    ElMessage({
      message: error.msg,
      type: 'warning',
    })
  }
  saveBtnState.value = false
}

onMounted(() => {

})
</script>

<template>
  <div class="layout-grid">
    <page-main class="filter-header">
      <template #title>
        <span>保存销售线索 </span>
        <el-input v-model="saveForm.ws_step" placeholder="回访时间不填默认15天" style="margin-left: auto;
    display: inline-block;
    width: 200px;"
        />
        <el-button type="primary" :loading="saveBtnState" @click="clickSave">
          保存
        </el-button>
      </template>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="客户信息" name="first">
          <div style="display: flex;flex-direction: row;">
            <div>
              <el-form :inline="false" class="csr-form" label-width="80px" label-position="left">
                <el-form-item label="客户名称">
                  <el-autocomplete v-model="saveForm.name" value-key="name"
                                   :fetch-suggestions="(e: string, cb) => querySearchAsync('name', e, cb)" placeholder="客户名"
                                   @select="handleSelect"
                  >
                    <template #default="{ item }">
                      <span class="value">
                        {{ item.name }}[{{ item.code }}]
                      </span>
                      <span class="item-phone">{{ item.phone }}</span>
                    </template>
                  </el-autocomplete>
                </el-form-item>

                <el-form-item label="手机号码">
                  <el-input v-model="saveForm.phone" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="业务类型">
                  <el-select v-model="saveForm.from" class="" style="width: 100%;" placeholder="业务类型">
                    <el-option v-for="item, index in pageInfo?.doc_from.option" :key="index" :label="item.name"
                               :value="item.name"
                    />
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="收货地址" style="grid-column-start: span 2;">
                  <el-input v-model="saveForm.address" placeholder="Please input" />
                </el-form-item> -->
                <el-form-item label="询价总额" style="grid-column-start: span 3;">
                  <el-input v-model="saveForm.amt" placeholder="金额" />
                </el-form-item>
                <el-form-item label="备注说明" style="grid-column-start: span 3;">
                  <el-input v-model="saveForm.mark" placeholder="请按客户实际询盘明细录入！" type="textarea" />
                </el-form-item>
              </el-form>
            </div>
            <!-- 客户跟踪 -->
            <div style="width: 400px;margin-left: auto;max-height: 400px;overflow: auto;">
              <CsrTimeLine :track-data="csrActivities" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </page-main>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item) {
  align-items: center;
}

// ------------自动补全下拉框----------//
.item-phone {
  color: #999;
  font-size: 12px;
}

// ------------header tool----------//
.filter-header {
  :deep(.title-container) {
    display: flex;
    justify-content: space-between;
    width: calc(100% + 40px);
    align-items: center;
    padding: 7px 20px;
    margin-left: -20px;
    margin-top: -20px;
    margin-bottom: 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
    transition: var(--el-transition-border);
  }

  .title-container {
    :deep(.el-input__wrapper, .el-input__wrapper:hover) {
      box-shadow: unset !important;
      border-bottom: 1px solid;
      border-radius: 0;

      input,
      .el-input__suffix {
        padding-top: 3px;
      }
    }

    :deep(.el-input.is-focus) {
      .el-input__wrapper {
        box-shadow: unset !important;
      }
    }
  }
}

// ------------table----------//
:deep(.el-table__body) {
  .el-table__cell {
    padding: 0 !important;
  }

  .el-input__wrapper {
    padding: 0;
    box-shadow: unset;
    background-color: unset;
  }
}

.td.el-table__cel .csr-form {
  display: grid;
  align-items: center;
  padding-top: 30px;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
}

.csr-form {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
}

:deep(.el-form-item__content) {
  height: 40px;
}

// .csr-form>div+.csr-form>div {
//   margin-right: 10px;
// }
</style>
