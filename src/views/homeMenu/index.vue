<script lang="ts" setup name="Home">
import MyEcharts from './components/echarts.vue'
import apiHome from '@/api/modules/home'

const myHomeData = ref()
apiHome.myHome().then((r) => {
  myHomeData.value = r.data
  console.log(myHomeData.value)
})
onMounted(() => {

})

const dataBreak = ref('2023-04-18 17:15:11')
</script>

<template>
  <div class="layout-grid">
    <page-main class="header-topbar">
      <div>
        <span style="font-size: 24px;color: #383838;">关键指数</span>
        <span class="header-topbar-info">数据截止:{{ dataBreak }}</span>
      </div>
      <div class="header-topbar-content">
        <div v-for="item, index in myHomeData" :key="index" class="header-topbar-content-item">
          <div class="item-1">
            {{ item.name }}
          </div>
          <div class="item-2">
            {{ item.val }}
          </div>
          <div class="item-3">
            <!-- {{ item.YOY }} ↑ -->
          </div>
        </div>
      </div>
    </page-main>
    <div class="echarts-box">
      <MyEcharts />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.to-do-main {
  flex: 1;
  margin: 0 0 10px 20px;

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

.ranking-main {
  flex: 1;
  margin: 0 20px 10px;

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

.to-do-list {
  display: flex;
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
  align-items: center;
  color: #626262;

  .index {
    width: 50px;
  }

  .content {
    flex: 1;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
  }

  .lastMark {
    font-size: 14px;
  }
}

.layout-grid {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header-topbar-info {
  font-size: 12px;
  color: #b6b6b6;
  margin-left: 15px;
}

.header-topbar-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 30px 10px 10px;

  &-item {
    text-align: center;

    .item-1 {
      color: #313131;
      font-weight: 700;
    }

    .item-2 {
      color: red;
      font-weight: 700;
      font-size: 38px;
      padding: 10px 0;
    }

    .item-3 {
      color: #3ac649;
      font-size: 9px;
    }
  }

  &-item ~ &-item {
    border-left: 1px solid #b6b6b6;
  }
}
</style>
