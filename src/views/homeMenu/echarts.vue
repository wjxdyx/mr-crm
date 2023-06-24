<script lang="ts" setup name="Home">
import * as echarts from 'echarts'

interface map {
  [key: string]: string
}
// echarts标准格式
function echartInit() {
  const app: any = {}

  const chartDom = document.getElementById('main') as HTMLElement
  const myChart = echarts.init(chartDom)
  let option

  const posList = [
    'left',
    'right',
    'top',
    'bottom',
    'inside',
    'insideTop',
    'insideLeft',
    'insideRight',
    'insideBottom',
    'insideTopLeft',
    'insideTopRight',
    'insideBottomLeft',
    'insideBottomRight',
  ]
  app.configParameters = {
    rotate: {
      min: -90,
      max: 90,
    },
    align: {
      options: {
        left: 'left',
        center: 'center',
        right: 'right',
      },
    },
    verticalAlign: {
      options: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom',
      },
    },
    position: {
      options: posList.reduce((map: map, pos: string) => {
        map[pos] = pos
        return map
      }, {}),
    },
    distance: {
      min: 0,
      max: 100,
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
  // eslint-disable-next-line prefer-const
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
        bottom: 3,
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
      data: ['销售', '当天接待', '当周接待', '当月接待'],
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
        data: ['周xx', '刘xx', '啧啧啧', '多大的', '吴xx', '周xx', '刘xx', '啧啧啧', '多大的', '吴xx', '周xx', '刘xx', '啧啧啧', '多大的', '吴xx'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '销售',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: [320, 332, 301, 334, 390],
      },
      {
        name: '当天接待',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290],
      },
      {
        name: '当周接待',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: [150, 232, 201, 154, 190],
      },
      {
        name: '当月接待',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series',
        },
        data: [98, 77, 101, 99, 40],
      },
    ],
  }

  option && myChart.setOption(option)
}

onMounted(() => {
  echartInit()
})

// const dataBreak = ref('2023-04-18 17:15:11')
</script>

<template>
  <div>
    <div id="main" style="width: 100%; height: 450px;" />
  </div>
</template>
