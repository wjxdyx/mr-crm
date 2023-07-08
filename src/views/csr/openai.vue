<script lang="ts" setup name="Csr">
import { Search } from '@element-plus/icons-vue'

const eventData = ref('')
const docSearch = ref('')

function startEventStream() {
  const data = JSON.stringify({
    action: 'variant',
    messages: [
      {
        id: 'aaa2bc97-951d-4cdc-b2a6-d75b5c237411',
        author: {
          role: 'user',
          metadata: {},
        },
        create_time: 1688241536.848711,
        content: {
          content_type: 'text',
          parts: ['你能给出一个 thinkphp casbin abac模型的代码例子么'],
        },
        status: 'finished_successfully',
        weight: 1,
        metadata: {
          timestamp_: 'absolute',
        },
        recipient: 'all',
      },
    ],
    conversation_id: '24b67eab-24bd-44f6-8b84-090ad3d0ed78',
    parent_message_id: 'fd08cb4e-d44c-4825-91bf-67bd2ed22e4f',
    model: 'gpt-3.5-turbo',
    timezone_offset_min: -480,
    variant_purpose: 'comparison_implicit',
    history_and_training_disabled: false,
    arkose_token: null,
  })
  eventData.value = ''
  // 发起POST请求
  fetch('https://chat.openai.com/backend-api/conversation', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
      'Cookie': '_ga_9YTZJE58M9=GS1.1.1678059706.1.0.1678059706.0.0.0; _ga=GA1.1.1974464468.1678059706; intercom-device-id-dgkjq2bp=4aae2cd7-e973-4d3f-bf60-9f60a53da92f; __Host-next-auth.csrf-token=00d738579c90cba910cea38a245bf7aa0580043182d3837d35ceb354b9010791%7C986c6cccfe9ecd742727b47fe75a3963beeeead3f0bbfedd1f2646da2309577d; __Secure-next-auth.callback-url=https%3A%2F%2Fchat.openai.com; _cfuvid=.YEIi.NrV4GBBAEhYOqQ0803KGoIodPN6V6hEgJ9tsY-1688219741114-0-604800000; _account=; cf_clearance=b58Frv_waTWuTnnhxkyZD8CgLKbo6pX0gZMQrGCHIHg-1688239852-0-1-9e0ac381.a7f81eb0.c90b9c61-250; intercom-session-dgkjq2bp=QTcxbTZLNlNvSHZpa1RickxPOXQrSmVYdGhhSk9PdWoyK0J6U1pwSWVIdmJ2TTk0UmdwOGRZdjQ2WHE2QjNYSy0tcXVsaVlTamNGdkhvVm9JNVpubi9Kdz09--08e659c8b1213ea4202bdb7a99f476e9a50f33a7; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..CykHBkybfJGHnsXh.bm3PvFYtvLUnVNq8BEIW5d2VTCaviT2eoaH-Kp95uXF3-o_gT3QNTvu4f4IclUqhplvW-NBObESEEP1ggfy22GS48GXi-srj8sceuKuA4487APCtT2Zooqg3y481xnWniXrcqiayz8gbTAKSj3WC5ox8XeFCSCdTOC9BGByxVrtWytzxbCjS1ODbIy2e__PmspAJrZpTQcP5TqcLxPIOzoJMoZzRNl4T4Gg4zvzjNw_zpZ_Oo8W2UA5LvpoN67x_mtimRxfguH9Mjz8hF5HKkqLftp149Gpvf-qxT1shZ2aeK9x-EKTVQl8ufiW_TnaeWc_kuLANvK30FQDZoviLRQXzaE3LI9D5OIJ0h4jAtC5vrdK4doxQy62c-NUcTFF2ISkc5BwKyO7WV10xh5l2UyS2pR97UJw2wYKcYZ-xqYhbaTX5v_on3PB0-xiKxG5_MciRBEV9CwW390bjhdZUBJXzP9jt5h7cJ8DI66bu9dZJJt4aJW_qWzodv3m93h2b4_pCWlcrZTarSI1aCcIXHjM3tVRkpDCPu3s4h_XOE649x2nwBBSuqIb4AHZCwfkSw_Zoe-v_AduMv6Zr-Bx2t6Ss8fzGOsza_G4Tjux3K4LRg29pp9r0BlyuX3z_7Nh3yvrwYaQFKdtb3TDyfUXKZ98WMgKfg2MrnfmZbZjt11n7yyTaWIKx8lixhNyo00uu4TTPdIM1K4Be-XZhm8XyH6Jj6fFho8M1BJjlzqIBkugj2oGIgAYdFAVBaOLsQAEU9ktZh2V-6A4UhH7_fQwMIP6uoJ_Dniv80AULL2lx0dUM1tEMghuaASJrj7lKBe7XURug2i7OykA_mrKTqHoW6WvALPTwtqXCQpRpsI1c6eBOVO-mFJUim_sEnNNxewZjzKrpZZKS8AYaCZMZ41sFzJ4eoJVQen_ZrpNG4G6KR3bTt1vAz-YRsJPc-Tg9aoYwzSdlleqlMv1hVhiva0u9e7vGmSLXwTOfsDbkOmr5du_wDDzWkiFyYV5yJhJqearO_VEJy_8rQ_IByO43T6JaOoShfzdCmlHcRcmN25ef2Yd5YKE6xv2Ethv8lEh3p6zFVXxx20BXm7F4OT1GXJBYS4yVurJ8K1m5CHNVkfjmJnr9_CNSEEWQIYPI7NRTR6fv1XSdM9PMCy_EsIiyMNoQBhaEo6MnrnxWfptqh_Je1WIyNwUBmorKeQ5X01fd9BlucV52jmHpDc57Q0PS2rDa8UHnxDCClluqkOu_0Z6y37toWUZ0SCuB7Zti1QcJvuhd5hRmg0LVrM2SUgQj8t7XiHdKkHQ-tc79mHC42KN2R_hTnHJte6YvFayeiRzLBX-Y4HnKj1dLIOdVRdVbz9cDNpowxzv0WVgCzECanKAq6Z1XlLgi6Vo-cVekFNlcbz8Bmhv4yIyeA2yPsr-7XG4bKj_w0QKJrzEW1bNOorv2ZdAM6ffv1_X74gLsWQP5GvtwGeBzQQqdKqwdSpoc7E2VVZDNnkLmRTd5cnqUdYjuk0l3_n8e18VxgJwR1eKw1QeulAmwKvslJdCkO3cgvZXScCqocLGYBu1MG4z02PGS3pnTCi6IEIVt5Eq8Yf4ll21LKEZrG7dS5YQuVC4re3frxLKSRR2W01qty5nQ-Od_ER1dNH00dT8xdVjaQ8_kw4l7-uMPhXq2V5RKEx4Vy-TGU8JAAwJPjs4l2HDs-_5vyxpYUGmZvqma34Rrpmv2gUWEqKiiQdslD5JXV-Y7iNUZ9o4BbDugv3NbFZUgP653AVGY_pKquQQopNdmbWnE1wD4Iqsew2PBYRlrAfpKbNgYDFzTX1Gvs7AVp-9ttjp1cv1oxIen7rPuH-2G2tFxQYCaAMxY134CneBzJ052D45gqHLwCLY4u_k5E6JL-Cvj5A8VuilRvLu4ZyZxIiARvTrUT0Ts-OwW9AG8o21R359kNhh5Qqt0g0ktsEXMs3Tc5oCblAD3fSfsEsAtlM7BvETV3ljwoXQ9dOqxIrd3brkzs4t7YeIGTam6mbAMnm0_Dig2ttFm4MfL4V8ZO-mUD90I_DDYS4rrhtVwmWBA38ATCnoX1jH9yY-9bGTy1K1kXa-dj5hnoPnsgoEUU1lBwJ1UgVREPYKS0QDxgQJqluIG0g4hZizl2WBCowE-NlxHkNRwPnU3hWtImpva2y04Ul52eWVGyOlLDFxR48QkUw62NvNqODD948US5lZASkqv1s_dm7LKpPSDUnVQB4OuyFq42DKlcaDbLs2MMgtNBKyTkDcdudu6MfhuE7_Hy_9byJAiXebJya8rTFTt8kqszFmdccUC6a_MJS5uSUsTVWMFNdD8XGzSoSQDpJsi4zcNP7qKNwzf132D1uocAiOZTVCunOMj7sySd-egImB7OEZyutuOeb3zlLwZ3oH7I3lqGP1nSawdWFsEXRTRK2SAFzpI4FeiKwHMloXcB7YYB-i6-SZ5lgUvvZ5O9Qvvk4ZYkD0Fvj-Gk5vHYrJNKk11-ySEFJ4h9Lus8ALLq9aAi4PiuJjFPVl70-CaM2mhKit6ESurRU99eA3X5Q.Jtj67d709HqNyOc5OSIFwg; __cf_bm=5HnS6HqOCwS6iqBvJqmvbaB4QHFGwlOIJgOWcBkcomw-1688264944-0-ASWmW05lmhx/dYle8idZkumLNb6fHeZM8SpRB1mFgRZK3ubjBkdJ9qgNk1/sg8qiHIYLQAifBy2B9iYuuMW6+xr3b1NoPCt2kKmNno3O/zCy; _dd_s=rum=0&expire=1688265988269',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJ3anhkeXguZ21haUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vYXV0aCI6eyJ1c2VyX2lkIjoidXNlci04ZFdvczlFYlFVc1Fob3g0bVY4ZE5TdUgifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE0MzU0NDcwMzAyNTE4MjY4NTE3IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4Nzg2NDk3MCwiZXhwIjoxNjg5MDc0NTcwLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9yZ2FuaXphdGlvbi53cml0ZSJ9.AR3GbtTGJL6_6oKADSZn19YoO91-tvP09kVkaLL78d_NctPgsSm2C1oCPKhAGjq-GrYkE7ABLrpDROW0rQ3_Ngb6bnErgERu94B1KKtbph-AROYl_RlqVfkCY24vb_XZe2-v7AOJ5xYiXuTvgIs5XB2u_4H1zmmZ-c8AnYuXnZYRc_UasIbstYZ7tTgeD03av-mHgrYfEVUecmnLrn9F5KxrSUWmDqjGcsNQm-N9bUJyGs0C1i5d_lGA_QA7T437Pzbd0lFaooQpxEiAp63or1MtNLeK02T0UonyY8xGczcVb8alOVt3tRcIAHa3E-no9sw5uTfbBCWmuEnXcNbs6w',
      'Referer': 'https://chat.openai.com/c/24b67eab-24bd-44f6-8b84-090ad3d0ed78',
      'Origin': 'https://chat.openai.com',
    },
  })
    .then((response) => {
      if (response.ok) {
        // POST请求成功
        // 创建EventSource对象，监听事件
        const eventSource = new EventSource('https://chat.openai.com/backend-api/conversation')

        eventSource.onopen = () => {
          console.log('连接已建立')
        }

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data)
          console.log('收到消息:', data)
          // 在这里处理收到的消息
        }

        eventSource.onerror = (error) => {
          console.error('发生错误:', error)
        }

        eventSource.onclose = () => {
          console.log('连接已关闭')
        }
      }
      else {
        // POST请求失败
        console.error('POST请求失败:', response.status, response.statusText)
      }
    })
    .catch((error) => {
      console.error('发生错误:', error)
    })
}

// function startEventStream() {
//   eventData.value = ''
//   const eventSource = new EventSource('https://chat.openai.com/backend-api/conversation')
//   // const eventSource = new EventSource(`http://openai.globalsight.cn/senda.php?msg=${docSearch.value}`)
//   // const eventSource = new EventSource('http://openai.globalsight.cn/test.php')
//   // const eventSource = new EventSource('https://openai.globalsight.cn/public/index.php/crm/OpenAi/eventSource')

//   // 监听消息事件
//   eventSource.onmessage = (event) => {
//     /* stylelint-disable-next-line CssSyntaxError */
//     console.log(event)

//     const data = JSON.parse(event.data)
//     const contentString = data.choices.map((choice: Choice) => choice.delta.content).join(' ')
//     eventData.value += contentString

//     // 可以在这里对接收到的实时数据进行处理
//   }

//   // 监听错误事件
//   eventSource.onerror = function (error) {
//     console.error(error) // 处理错误
//     eventSource.close()
//   }
// }
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
    <el-input v-model="docSearch" round type="textarea" class="inline-input w-50 search" placeholder="搜索" />
    <el-button type="primary" @click="startEventStream">
      发送
      <template #suffix>
        <el-icon class="el-input__icon">
          <Search />
        </el-icon>
      </template>
    </el-button>

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
