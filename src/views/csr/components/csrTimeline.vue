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
    <el-timeline-item v-for="item, index in props.trackData as any[]" :key="index"
                      :timestamp="`创建时间:${item?.create_time},下次回访:${item?.next_follow_time}`"
                      :color="item?.tfrom === 'deal' ? '#ff604a' : '#65c2ff'" style="position: relative;;margin-left: 15px;"
    >
      {{ item?.mark }}
      <span v-if="item.tfrom === 'deal'" style="font-size: 18px;">
        来访已成交,成交金额：{{ item?.amt }}
      </span>

      <span v-if="item.tfrom === 'enquiry'" style="font-size: 18px;">
        沟通/回访,询盘金额：{{ item?.amt }}
      </span>

      <div style="padding: 5px;">
        来自:{{ item?.tfrom_from }}
        <span v-if="item?.doc_file">
          <a :href="`https://mr-crm.erpgj.com/runtime/storage/${item?.doc_file}`" target="_blank">合同附件</a>

        </span>

        <span v-if="item.tfrom === 'enquiry'" style="font-size: 10px;color: #979797;padding: 5px;">
          {{ item?.enquiry_mark }}
        </span>
        <span v-if="item.tfrom === 'deal'" style="font-size: 10px;color: #979797;padding: 5px;">
          {{ item?.deal_mark }}
        </span>
      </div>

      <div style="font-size: 10px;color: #5f5f5f;padding: 5px ;    margin-right: 40px;border-top: 1px dashed #bdbdbd;">
        产品: {{ item?.deal_pro_info }}
      </div>
    </el-timeline-item>
  </el-timeline>
</template>
