import api from '../index'

export default {
  // 登录
  login: (data: {
    account: string
    password: string
  }) => api.post('admin/login/index', { username: data.account, password: data.password }),
  getAllUser: (index: number, limit: number) => api.get(`sys/admin/index?index=${index}&limit=${limit}`),
  delUser: (user_id: number) => api.get(`sys/admin/delete?sys_user_id=${user_id}`),
  createUser: (data: any) => api.post('sys/admin/create', data),

  // 获取权限
  permission: () => api.get('user/permission', {
    baseURL: '/mock/',
  }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newpassword: string
  }) => api.post('user/password/edit', data, {
    baseURL: '/mock/',
  }),

  // 用户通知
  userNotice: () => api.get('user/notice/index', {
    baseURL: '/mock/',
  }),
  // 用戶首页图表数据
  userChart: (data: {
    startTime: number
    endTime: number
  }) => api.get(`user/chart/index?start_time=${data.startTime}&endTime=${data.endTime}`, {
    baseURL: '/mock/',
  }),
  // 用戶数据以及权限
  userAuthData: (

    current: number,
    limit: number,
    name?: string,
    phone?: string,
  ) => {
    return api.get(`user/staff/index?name=${name}&phone=${phone}&index=${current}&limit=${limit}`, {
      baseURL: '/mock/',
    })
  },

}
