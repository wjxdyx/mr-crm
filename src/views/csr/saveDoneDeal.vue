/* stylelint-disable stylistic/selector-combinator-space-before */
<script lang="ts" setup name="Csr">
import { CirclePlus, Delete, UploadFilled } from '@element-plus/icons-vue'
import type { UploadFile, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus'
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
  amt: undefined,
  pro: [],
  contract: [],
})
saveForm.value.pro = [
  { name: '', typ: '', num: 1, amt: 1, mark: '' },
]

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
// 产品表
function addProRow() {
  saveForm.value.pro?.push({ name: '', typ: '', num: 1, amt: 1, mark: '' })
}
function delProRow(e: number) {
  saveForm.value.pro?.splice(e, 1)
}
// 合同文件上传存放数据
const docFileForm = ref<UploadRawFile>()
// 合同文件上传操作
function docFileChange(file: UploadFile) {
  if (file.raw) {
    docFileForm.value = file.raw
  }
}
// 删除合同文件
const handleDocRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  docFileForm.value = undefined
}
// 聊天记录
const uploadRef = ref<UploadUserFile>()
const upFileDialog = ref({
  msgPreview: '',
  visible: false,
})
// 聊天记录上传存放数据
const fileForm = ref<UploadFile[]>([])
// 文件change操作

const fileChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  // fileForm.value = fileForm.value.slice(-3)
  console.log(uploadFile, uploadFiles)
}

// 删除文件
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  upFileDialog.value.msgPreview = uploadFile.url!
  upFileDialog.value.visible = true
}
// 删除文件确认
function beforeRemove() {
  return true
  // return this.$confirm(`确定取消上传:  ${file.name}`)
}
const saveBtnState = ref(false)

async function clickSave() {
  try {
    saveBtnState.value = true
    const formData = new FormData()
    // 确认上传

    formData.append('from', saveForm.value.from)
    formData.append('name', saveForm.value.name)
    formData.append('phone', saveForm.value.phone)
    formData.append('mark', saveForm.value.mark as string)
    if (saveForm.value.amt) {
      formData.append('amt', saveForm.value.amt.toString())
    }
    saveForm.value.pro?.forEach((ele: formProItem, index: number) => {
      formData.append(`pro[${index}][name]`, ele.name)
      formData.append(`pro[${index}][typ]`, ele.typ)
      formData.append(`pro[${index}][num]`, ele.num.toString())
      formData.append(`pro[${index}][amt]`, ele.amt.toString())
      formData.append(`pro[${index}][mark]`, ele.mark)
    })
    fileForm.value.forEach((ele: UploadFile, index: number) => {
      console.log(ele)

      formData.append(`msg_log[${index}]`, ele.raw as UploadRawFile)
    })
    if (docFileForm.value) {
      formData.append('doc_file', docFileForm.value)
      console.log(docFileForm.value)
    }
    // console.log(formData.get('doc_file'))
    console.log(formData)
    await apiCsr.saveDeal(formData)

    ElMessage({
      message: '添加成功',
    })
  }
  catch (error: any) {
    console.log(error, 'error')

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
    <page-main class="filter-header" style="height: 100%;">
      <template #title>
        <span>保存成交客户 </span>
        <el-button type="primary" :loading="saveBtnState" @click="clickSave">
          保存
        </el-button>
      </template>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="销售线索" name="first" style="height: 100%;">
          <div style="display: flex;flex-direction: row;height: 100%;">
            <div style="padding-bottom: 20px;">
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
                <el-form-item label="备注说明" style="grid-column-start: span 3;">
                  <el-input v-model="saveForm.mark" placeholder="请按客户实际询盘明细录入！" type="textarea" />
                </el-form-item>
                <el-form-item label="聊天记录" style="grid-column-start: span 3;height: 140px;">
                  <el-upload ref="uploadRef" v-model:file-list="fileForm" multiple :auto-upload="false"
                             :on-change="fileChange" action="" list-type="picture-card" :on-remove="handleRemove"
                             :on-preview="handlePictureCardPreview" :before-remove="beforeRemove" :limit="3"
                  >
                    <el-icon />
                  </el-upload>

                  <el-dialog v-model="upFileDialog.visible">
                    <img w-full style="width: 100%;" :src="upFileDialog.msgPreview" alt="Preview Image">
                  </el-dialog>
                </el-form-item>
                <el-form-item label="产品" style="grid-column-start: span 3;height: 100%;">
                  <div>
                    <el-table :data="saveForm.pro" border style="width: 100%;">
                      <el-table-column prop="name" label="产品名称" width="140">
                        <template #default="scope">
                          <div style="display: flex; align-items: center;justify-content: flex-start;">
                            <el-button type="primary" :icon="CirclePlus" link style="position: relative;left: -5px;"
                                       @click="addProRow"
                            />
                            <el-input v-model="scope.row.name" placeholder="Please input" />
                            <el-button type="danger" :icon="Delete" link style="position: relative;left: 5px;"
                                       @click="delProRow(scope.$index)"
                            />
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="typ" label="型号" width="100">
                        <template #default="scope">
                          <div style="display: flex; align-items: center;">
                            <el-input v-model="scope.row.typ" placeholder="Please input" />
                          </div>
                        </template>
                      </el-table-column>

                      <el-table-column prop="num" label="数量" width="80">
                        <template #default="scope">
                          <div style="display: flex; align-items: center;">
                            <el-input v-model="scope.row.num" placeholder="Please input" />
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="amt" label="单价" width="80">
                        <template #default="scope">
                          <div style="display: flex; align-items: center;">
                            <el-input v-model="scope.row.amt" placeholder="Please input" />
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="mark" label="备注">
                        <template #default="scope">
                          <div style="display: flex; align-items: center;">
                            <el-input v-model="scope.row.mark" placeholder="Please input" />
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <!-- 客户跟踪 -->
            <div style="width: 400px;margin-left: auto;max-height: 400px;overflow: auto;">
              <div style="height: 100%;">
                <CsrTimeLine :track-data="csrActivities" />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="合同附件" name="second">
          <el-upload class="upload-demo" drag action="" :on-remove="handleDocRemove" :auto-upload="false"
                     :on-change="docFileChange"
          >
            <el-icon class="el-icon--upload">
              <UploadFilled />
            </el-icon>
            <div class="el-upload__text">
              拖拽文件到此处<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png 格式
              </div>
            </template>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
    </page-main>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__content) {
  flex: 1;
}

:deep(.el-tabs) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.layout-grid {
  height: 100%;
  padding: 20px;
}

// ------------自动补全下拉框----------//
.item-phone {
  color: #999;
  font-size: 12px;
}

// ------------header tool----------//
.filter-header {
  height: 100%;
  display: flex;
  flex-direction: column;

  :deep(.title-container) {
    display: flex;
    justify-content: space-between;
    width: calc(100% + 40px);
    align-items: center;
    padding: 7px 20px;
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

/* stylelint-disable-next-line stylistic/selector-combinator-space-after */
// .csr-form>div+.csr-form>div {
//   margin-right: 10px;
// }
</style>
