<script lang="ts" setup name="CsrDrawer">
const props = defineProps({
  trackData: {
    type: Array,
    required: true,
  },

})

// const dataBreak = ref('2023-04-18 17:15:11')
</script>

<template>
  <el-timeline>
    <el-timeline-item v-for="item, index in props.trackData as any[]" :key="index" :timestamp="item?.create_time"
                      :color="item?.tfrom === 'deal' ? '#ff604a' : '#65c2ff'"
    >
      {{ item?.mark }}
      <span v-if="item.tfrom === 'deal'">
        来访已成交,成交ID：{{ item?.tfrom_id }}
      </span>
      <span v-if="item.tfrom === 'enquiry'">
        询盘来源：{{ item?.tfrom_from }}
      </span>
      <div v-if="item.des" style="font-size: 10px;color: #979797;">
        {{ item?.des }}
      </div>
    </el-timeline-item>
  </el-timeline>
</template>
