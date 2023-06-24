export default [

  {
    url: '/mock/csr/index',
    method: 'post',
    response: {
      error: '',
      status: 1,
      total: 200,
      data: [
        { csr_id: 1, csr_name: '周老总', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 2, csr_name: '1', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 3, csr_name: '2', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 4, csr_name: '3', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 5, csr_name: '4', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 6, csr_name: '5', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 7, csr_name: '6', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 8, csr_name: '7', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 9, csr_name: '8', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 10, csr_name: '周老总', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 11, csr_name: '周老总', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },
        { csr_id: 12, csr_name: '周老总', inquiry_pro: 'zw-12,避雷器,绝缘子', phone: '18006877901', doc_no: 'EX15645665655', doc_from: '微信', doc_mark: '单据说明', create_time: '2016-06-11 15:12:12', amount: '1566' },

      ],
    },
  },
  {
    url: '/mock/csr/pageInfo',
    method: 'get',
    response: {
      error: '',
      status: 1,
      total: 200,
      data: {
        doc_from: [
          { doc_from_id: 1, name: '电话' },
          { doc_from_id: 2, name: '淘宝' },
          { doc_from_id: 3, name: '微信' },
        ],

      },
    },
  },
  {
    url: '/mock/csr/orderPro',
    method: 'get',
    response: {
      error: '',
      status: 1,
      total: 200,
      data: {
        tableData: [
          { pro_id: 1, name: '真空断路器', tye: 'zw-12', quantity: 1, order_time: '2022-22-12 15:12:12', amount: 12121 },
          { pro_id: 2, name: '真空断路器', tye: 'zw-12', quantity: 1, order_time: '2022-22-12 15:12:12', amount: 12121 },
          { pro_id: 3, name: '真空断路器', tye: 'zw-12', quantity: 1, order_time: '2022-22-12 15:12:12', amount: 12121 },
          { pro_id: 4, name: '真空断路器', tye: 'zw-12', quantity: 1, order_time: '2022-22-12 15:12:12', amount: 12121 },
          { pro_id: 5, name: '真空断路器', tye: 'zw-12', quantity: 1, order_time: '2022-22-12 15:12:12', amount: 12121 },
          { pro_id: 6, name: '真空断路器', tye: 'zw-12', quantity: 1, order_time: '2022-22-12 15:12:12', amount: 12121 },
        ],
        activities: [
          { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: 1, order_pro: '避雷器,zw21', mark: '电话回访', order_no: 'Ex112313123123' },
          { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
          { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
          { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
          { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
          { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
          { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
          { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        ],
      },

    },
  },
  // 客户跟踪记录
  {
    url: '/mock/csr/track',
    method: 'get',
    response: {
      error: '',
      status: 1,
      total: 200,
      data: [
        {
          order_time: '2022-12-11 11:11:11',
          create_time: '2022-12-12 12:12:12',
          order_id: 1,
          order_pro: '避雷器,zw21',
          mark: '电话回访',
          order_no: 'Ex112313123123',
          contract: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg',
        },
        {
          order_time: '2022-12-11 11:11:11',
          create_time: '2022-12-12 12:12:12',
          order_id: undefined,
          order_pro: '避雷器,zw21',
          mark: '电话回访',
          track_prove: ['https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg', 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg', 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'],
        },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
        { order_time: '2022-12-11 11:11:11', create_time: '2022-12-12 12:12:12', order_id: undefined, order_pro: '避雷器,zw21', mark: '电话回访' },
      ],

    },
  },
  // 查询客户
  {
    url: '/mock/csr/find',
    method: 'get',
    response: {
      error: '',
      status: 1,
      total: 200,
      data: [
        {
          csr_name: '吴敬醒',
          create_time: '2022-12-12 12:12:12',
          code: 'wjx',
          address: '浙江省乐清市',
          phone: '18006877901',
        },
        {
          csr_name: '周建杰',
          create_time: '2022-12-12 12:12:12',
          code: 'zjj',
          address: '浙江省乐清市2',
          phone: '17758103995',
        },
        {
          csr_name: '刘长青',
          create_time: '2022-12-12 12:12:12',
          code: 'lcq',
          address: '浙江省乐清市3',
          phone: '17758103996',
        },

      ],

    },
  },
]
