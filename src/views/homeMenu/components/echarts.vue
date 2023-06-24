<script lang="ts" setup name="Home">
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import {
  // eslint-disable-next-line sort-imports
  TitleComponent, TooltipComponent, ToolboxComponent, GridComponent, DataZoomComponent, DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import apiHome from '@/api/modules/home'

const create_time = ref<[Date, Date]>([
  new Date(),
  new Date(),
])

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer, LegendComponent, DataZoomComponent,
])
const app = {
  configParameters: {},
  config: {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: () => {

    },
  },
  option: {},
}
// 图标筛选标签
const labelFilter = ref(['销售', '接待'])
// const labelFilter = ref(['销售', '接待', '接待'])
const labelOption = {
  show: true,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {},
  },
}
// 图表x轴的 柱名
const echartCategory = ref([])

// 图标数据
const echartData = ref([
  {
    name: '销售',
    type: 'bar',
    barGap: 0,
    label: labelOption,
    emphasis: {
      focus: 'series',
    },
    data: [320, 332, 301, 334, 390], // 每个人的值
  },
  {
    name: '接待',
    type: 'bar',
    label: labelOption,
    emphasis: {
      focus: 'series',
    },
    data: [220, 182, 191, 234, 290],
  },

])

watch(() => create_time.value, (newVal) => {
  userChart(newVal[0], newVal[1])
})
// echarts标准格式
function echartInit() {
  const chartDom = document.getElementById('main') as HTMLElement
  const myChart = echarts.init(chartDom)
  myChart.on('click', (params) => {
    console.log(params)
  })
  let option = {}

  app.configParameters = {
    rotate: {
      min: -90,
      max: 90,
    },

  }
  app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange() {
      const labelOption = {
        rotate: app.config.rotate,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        position: app.config.position,
        distance: app.config.distance,
      }
      myChart.setOption({
        series: [
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
        ],
      })
    },
  }

  option = {
    dataZoom: [
      {
        // 设置滚动条的隐藏与显示
        show: true,
        // 设置滚动条类型
        type: 'slider',
        // 设置背景颜色
        backgroundColor: 'rgb(19, 63, 100)',
        // 设置选中范围的填充颜色
        fillerColor: 'rgb(16, 171, 198)',
        // 设置边框颜色
        borderColor: 'rgb(19, 63, 100)',
        // 是否显示detail，即拖拽时候显示详细数值信息
        showDetail: false,
        // 数据窗口范围的起始数值
        startValue: 0,
        // 数据窗口范围的结束数值（一页显示多少条数据）
        endValue: 5,
        // empty：当前数据窗口外的数据，被设置为空。
        // 即不会影响其他轴的数据范围
        filterMode: 'empty',
        // 设置滚动条宽度，相对于盒子宽度
        width: '50%',
        // 设置滚动条高度
        height: 8,
        // 设置滚动条显示位置
        left: 'center',
        // 是否锁定选择区域（或叫做数据窗口）的大小
        zoomLoxk: true,
        // 控制手柄的尺寸
        handleSize: 0,
        // dataZoom-slider组件离容器下侧的距离
        bottom: 15,
      },
      {
        // 没有下面这块的话，只能拖动滚动条，
        // 鼠标滚轮在区域内不能控制外部滚动条
        type: 'inside',
        // 滚轮是否触发缩放
        zoomOnMouseWheel: false,
        // 鼠标滚轮触发滚动
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: labelFilter.value,
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: echartCategory.value,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: echartData.value,
  }

  option && myChart.setOption(option)
}
// 图表接口数据
async function userChart(startTime: Date, endTime: Date) {
  const star_time = Date.parse(startTime.toString()) / 1000

  const end_time = Date.parse(endTime.toString()) / 1000

  // const { data } = await apiUser.userChart({ startTime: star_time, endTime: end_time })
  const { data: data2, chatUser: chatUser2 } = await apiHome.chat1({ startTime: star_time, endTime: end_time })

  // echartCategory.value = data.category
  // echartData.value[0].data = data.sales
  // echartData.value[1].data = data.enquiry

  echartCategory.value = chatUser2
  echartData.value[0].data = data2.sales
  echartData.value[1].data = data2.enquiry
  await echartInit()
}
onMounted(async () => {
  userChart(create_time.value[0], create_time.value[1])
})

// const dataBreak = ref('2023-04-18 17:15:11')
</script>

<template>
  <div>
    <el-date-picker v-model="create_time" type="daterange" range-separator="-" style="margin-left: 20px;"
                    start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD"
    />
    <div id="main" style="width: 100%; height: 450px;" />
  </div>
</template>
