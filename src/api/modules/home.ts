import api from '../index'

export default {
  // 获取个人首页
  myHome: () => api.get('crm/index/index'),
  chat1: (data: {
    startTime: number
    endTime: number
  }) => api.get(`crm/index/chat1?query_time[0]=${data.startTime}&query_time[1]=${data.endTime}`),

}
