<script lang="ts" setup name="Csr">
import { ArrowLeft, ArrowRight, Delete, Document, Folder, FolderAdd, Refresh, Search } from '@element-plus/icons-vue'
import { split } from 'lodash-es'
import { ElMessage } from 'element-plus'
import type { UploadFile } from 'element-plus'
import apiDoc from '@/api/modules/doc2'
import router from '@/router'
import useUserStore from '@/store/modules/user'

const docSearch = ref('')

const docFile = ref<docFileLink[]>([
  {
    name: '',
  },
])
const docFileActive = ref<docFileActive>({})

function clickActive(item: docFileLink) {
  if (typeof item.name === 'string') {
    docFileActive.value = {}
    docFileActive.value[item.name] = item
  }
}

const arrBread = ref<string[]>([])
const preBread = ref('')
const host = import.meta.env.VITE_APP_API_BASEURL
function handleFileNameChange(name: string, item: docFileLink) {
  if (typeof name === 'string') {
    const fileWebOldPath = `${arrBread.value.join('/')}/${item.oldName}`
    const fileWebNewPath = `${arrBread.value.join('/')}/${name}`

    apiDoc.docFileRename(fileWebOldPath, fileWebNewPath).then(() => {
      item.oldName = name
    })
  }
}
function fileHome(path: string) {
  apiDoc.docFilePath(path).then((r) => {
    docFile.value = r.data
    docFile.value.forEach((ele) => {
      ele.oldName = ele.name
    })
  })
}
// 搜索产品
function handleSearchClick() {
  if (docSearch.value === '' || docSearch.value === undefined) {
    ElMessage.error('搜索的产品名称不得为空')
    return
  }
  apiDoc.docSearch(docSearch.value).then((r) => {
    docFile.value = r.data
    docFile.value.forEach((ele) => {
      ele.oldName = ele.name
    })
  })
}
function clickRefresh() {
  const fileWebPath = `${arrBread.value.join('/')}`
  fileHome(fileWebPath)
}
/**
 * @description: 点击预览文件
 */
function clickPreview(item: docFileLink) {
  const fileWebPath = `${arrBread.value.join('/')}/${item.name}`
  const url = `${host}/resources/index2/download?path=${fileWebPath}`
  router.resolve({ path: url })
  window.open(url, '_blank')
}
/**
 * @description: 点击文件夹
 */
function clickFolder(item: docFileLink) {
  arrBread.value.push(item.name)
  const fileWebPath = arrBread.value.join('/')
  preBread.value = fileWebPath
  fileHome(fileWebPath)
}
/**
 * @description: 历史上一级文件夹
 */
function clickPreFolder() {
  arrBread.value = arrBread.value.splice(1, -1)
  const fileWebPath = arrBread.value.join('/')
  fileHome(fileWebPath)
}
/**
 * @description: 历史下一级文件夹
 */
function clickNewFolder() {
  arrBread.value = split(preBread.value, '/')
  fileHome(preBread.value)
}
/**
 * @description: 创建新的文件夹
 */
async function createNewFolder(dirName: string) {
  const fileWebPath = `${arrBread.value.join('/')}/${dirName}`
  await apiDoc.docNewFolder(fileWebPath)
  clickRefresh()
}

async function delFile(command: docFileLink) {
  const fileWebPath = `${command.breadcrumb?.join('/')}/${command.name}`

  await apiDoc.docDelete(fileWebPath)

  arrBread.value = split(preBread.value, '/')
  fileHome(preBread.value)
}
// 文件上传操作
async function fileChange(file: UploadFile) {
  if (file.raw) {
    const formData = new FormData()
    const fileWebPath = `${arrBread.value.join('/')}`
    formData.append('file', file.raw)
    formData.append('save_path', fileWebPath)
    formData.append('file_as', file.name)
    await apiDoc.docUpload(formData)
    fileHome(fileWebPath)
  }
}
// 删除文件

onMounted(() => {
  // 获取首页文件目录信息
  fileHome('')
})
</script>

<template>
  <div class="layout-grid">
    <div class="header">
      <el-button-group>
        <el-button type="primary" round :icon="FolderAdd" color="#afafaf" @click="createNewFolder('新建文件夹')">
          New Folder
        </el-button>
      </el-button-group>
      <el-input v-model="docSearch" round class="inline-input w-50 search" placeholder="搜索" @change="handleSearchClick">
        <template #suffix>
          <el-icon class="el-input__icon" @click="handleSearchClick">
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>
    <!-- 面包屑 -->
    <div class="bread">
      <el-icon class="el-icon" size="18px" @click="clickPreFolder">
        <ArrowLeft />
      </el-icon>
      <el-icon class="el-icon" size="18px" :style="{ color: arrBread.join('/') === preBread ? '#a3a3a3' : 'inherit' }"
               @click="clickNewFolder"
      >
        <ArrowRight />
      </el-icon>
      <el-icon class="el-icon" size="18px" loading @click="clickRefresh">
        <Refresh />
      </el-icon>

      <div>
        <el-breadcrumb :separator-icon="ArrowRight" style="padding-left: 10px;border-left: 1px solid #afabab;">
          <el-breadcrumb-item @click="fileHome('')">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item v-for="item, index in arrBread" :key="index">
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- 面板内容区 -->
    <div class="file-panel">
      <div class="doc-file">
        <el-upload class="upload-demo" drag action="" :auto-upload="false" :on-change="fileChange">
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            点击此处 <em>上传文件</em>
          </div>
          <template #tip>
            <!-- <div class="el-upload__tip">
                                                  jpg/png files with a size less than 500kb
                                                </div> -->
          </template>
        </el-upload>
        <div class="footer">
          上传文件
        </div>
      </div>
      <div v-for="item, index in docFile" :key="index" :class="{ active: docFileActive[item.name] }" class="doc-file"
           @click="clickActive(item)"
      >
        <div class="doc-file-image">
          <el-dropdown trigger="contextmenu" style="width: 100%;height: 100%;" @command="delFile">
            <div class="el-dropdown-link" style="width: 100%;">
              <el-image v-if="item.name"
                        :src="item.is_folder ? '#' : `${host}/resources/index2/download?path=${item.name}`"
                        @dblclick="clickPreview(item)"
              >
                <template #error>
                  <div v-if="item.is_folder" class="image-slot" @dblclick="clickFolder(item)">
                    <el-icon size="84px">
                      <Folder />
                    </el-icon>
                  </div>
                  <div v-else class="image-slot" @dblclick="clickPreview(item)">
                    <el-icon size="84px">
                      <Document />
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </div>
            <template #dropdown>
              <el-dropdown-menu v-if="useUserStore().auth_group === 'admin' || useUserStore().auth_group === 'director'">
                <el-dropdown-item :icon="Delete" :command="item">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="footer">
          <el-input v-if="useUserStore().auth_group === 'admin' || useUserStore().auth_group === 'director'"
                    v-model="item.name" style="height: 100%;" @change="e => handleFileNameChange(e, item)"
          />
          <span v-if="useUserStore().auth_group === 'staff'">{{ item.name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-grid {
  padding: 15px;
}

/* stylelint-disable-next-line scss/double-slash-comment-whitespace-inside */
//------文件预览-----//
.file-panel {
  padding: 10px 0;
  display: flex;
  gap: 15px;
  justify-items: center;
  align-items: center;
  flex-wrap: wrap;
}

:deep(.doc-file) {
  .doc-file-image {
    height: 100%;
  }

  .el-image {
    padding: 0 5px;
    width: 100%;
    height: 100%;
  }

  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: white;
    color: var(--el-text-color-secondary);
    font-size: 30px;

    .el-icon {
      font-size: 30px;
    }
  }

  border-radius: 10px;
  width: 200px;
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .el-input__wrapper {
    padding: 0;
    box-shadow: unset;
    background-color: unset;
  }

  .el-input__inner {
    color: white;
    text-align: center;
  }

  .footer {
    height: 40px;
    margin-top: auto;
    background-color: #686868;
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;
  }
}

.doc-file.active {
  border: 1px solid red;

  .image-slot {
    background-color: #f0f0f0;
  }
}

/* stylelint-disable-next-line scss/double-slash-comment-whitespace-inside */
//------面包屑-----//
.bread {
  padding: 8px;
  padding-left: 0;
  display: flex;
  align-items: center;
  border: 1px;
  border-style: solid;
  border-color: #c9c3c3;
  border-left: 0;
  border-right: 0;

  .el-icon {
    margin-right: 10px;
  }
}

/* stylelint-disable-next-line scss/double-slash-comment-whitespace-inside */
//------搜索产品-----//
:deep(.search) {
  margin-left: auto;
  padding-left: 10px;
  width: 400px;

  .el-input__wrapper {
    border-radius: 100px;
  }

  .el-input__suffix {
    border-left: 1px solid #eee;
  }
}

:deep(.header) {
  display: flex;
  padding-bottom: 10px;

  .el-button > span,
  .el-button svg {
    color: white;
  }
}
</style>
