export default [

  {
    url: '/mock/home/index',
    method: 'get',
    response: {
      error: '',
      status: 1,
      data: {
        keyinfo: {
          breakTime: '2023-04-19 15:15:11',
          data: [
            { name: '今日交易额（元）', val: 24656.01, YOY: 33.3 },
            { name: '今日订单数（笔）', val: 76, YOY: 33.3 },
            { name: '今日跟踪数', val: 100, YOY: 33.3 },
            { name: '今日询价回访', val: 10, YOY: 33.3 },
            { name: '今日成交回访', val: 6, YOY: 33.3 },
          ],
        },
        pending: [
          { title: '浙江张客户，已经超过2天，待回访', lastMark: '出差等回来订' },
          { title: '浙江张客户，已经超过2天，待回访', lastMark: '出差等回来订' },
          { title: '浙江张客户，已经超过2天，待回访', lastMark: '出差等回来订' },
          { title: '浙江张客户，已经超过2天，待回访', lastMark: '出差等回来订' },
          { title: '浙江张客户，已经超过2天，待回访', lastMark: '出差等回来订' },
        ],
        ranking: [
          { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', name: '周老总', tracking: 12, phone: '15006789872' },
          { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', name: '周老总', tracking: 12, phone: '15006789872' },
          { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', name: '周老总', tracking: 12, phone: '15006789872' },
          { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', name: '周老总', tracking: 12, phone: '15006789872' },
          { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', name: '周老总', tracking: 12, phone: '15006789872' },
        ],
      },
    },
  },
]
