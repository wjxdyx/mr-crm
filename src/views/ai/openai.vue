<script lang="ts" setup name="Csr">
const eventData = ref('')
const docSearch = ref('')

function startEventStream() {
  eventData.value = ''
  // const eventSource = new EventSource('https://chat.openai.com/backend-api/conversation')
  const eventSource = new EventSource(`http://openai.globalsight.cn/senda.php?msg=${docSearch.value}`)
  // const eventSource = new EventSource('http://openai.globalsight.cn/test.php')
  // const eventSource = new EventSource('https://openai.globalsight.cn/public/index.php/crm/OpenAi/eventSource')

  // 监听消息事件
  eventSource.onmessage = (event) => {
    /* stylelint-disable-next-line CssSyntaxError */
    console.log(event)

    const data = JSON.parse(event.data)
    const contentString = data.choices.map((choice: Choice) => choice.delta.content).join(' ')
    eventData.value += contentString

    // 可以在这里对接收到的实时数据进行处理
  }

  // 监听错误事件
  eventSource.onerror = function (error) {
    console.error(error) // 处理错误
    eventSource.close()
  }
}
onMounted(() => {
  // startEventStream()
})
onUnmounted(() => {
  // 在组件卸载时关闭事件流
  // 可选，根据实际需要进行处理
})
// const dataBreak = ref('2023-04-18 17:15:11')
</script>

<template>
  <div style="padding: 30px;">
    <span>暂无权限</span>
    <el-input v-model="docSearch" round type="textarea" class="inline-input w-50 search" placeholder="搜索" />
    <!-- <el-button type="primary" @click="startEventStream">
      发送
      <template #suffix>
        <el-icon class="el-input__icon">
          <Search />
        </el-icon>
      </template>
    </el-button> -->

    <pre>{{ eventData }}</pre>
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
