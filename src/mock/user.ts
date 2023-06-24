export default [
  {
    url: '/mock/user/login',
    method: 'post',
    response: ({ body }: any) => {
      return {
        error: '',
        status: 1,
        data: {
          account: body.account,
          token: `${body.account}_@string`,
          failure_time: Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60,
        },
      }
    },
  },
  {
    url: '/mock/user/permission',
    method: 'get',
    response: ({ headers }: any) => {
      let permissions: string[] = []
      if (headers.token.indexOf('admin') === 0) {
        permissions = [
          'permission.browse',
          'permission.create',
          'permission.edit',
          'permission.remove',
        ]
      }
      else if (headers.token.indexOf('test') === 0) {
        permissions = [
          'permission.browse',
        ]
      }
      return {
        error: '',
        status: 1,
        data: {
          permissions,
        },
      }
    },
  },
  {
    url: '/mock/user/password/edit',
    method: 'post',
    response: {
      error: '',
      status: 1,
      data: {
        isSuccess: true,
      },
    },
  },
  // 用户通知列表
  {
    url: '/mock/user/notice/index',
    method: 'get',
    response: {
      error: '',
      status: 1,
      data: [
        { notice_id: 1, title: '待办事项', href: '' },
        { notice_id: 2, title: '待办事项', href: '' },
        { notice_id: 3, title: '待办事项', href: '' },
        { notice_id: 4, title: '待办事项', href: '' },
      ],
    },
  },
  // 用户图表数据
  {
    url: '/mock/user/chart/index',
    method: 'get',
    response: {
      error: '',
      status: 1,
      data: {
        category: ['周xx', '刘xx', '啧啧啧', '多大的'],
        data: [
          [320, 332, 301, 334, 390],
        ],
      },
    },
  },
  // 员工以及账户权限
  {
    url: '/mock/user/staff/index',
    method: 'get',
    response: {
      error: '',
      status: 1,
      data: {
        filterheader: [],
        tableDataTotal: 100,
        tableData: [
          { user_id: 1, gender: 0, reception: 0, ip: '192.168.1.1', username: 'wjxdyx', nickname: '吴敬醒', phone: '18006877901', create_time: '2012-05-15 11:11:11', deviceUid: 'xxx1123123' },
          { user_id: 2, gender: 1, reception: 0, ip: '192.168.1.2', username: '', nickname: '吴敬醒', phone: '18006877901', create_time: '2012-05-15 11:11:11', deviceUid: 'xxx1123123' },
          { user_id: 3, gender: 2, reception: 0, ip: '192.168.1.3', username: 'lccc', nickname: '吴敬醒', phone: '18006877901', create_time: '2012-05-15 11:11:11', deviceUid: 'xxx1123123' },
        ],
      },
    },
  },
]
