import api from '../index'

export default {

  // myCsr: (data: csrQueryFormType) => api.get(`crm/csr/dealCsr?&index=${data.index}&limit=${data.limit}`, {
  //   baseURL: 'http://mr-crm.erpgj.com/public/index.php/',
  // }),
  myCsr: (data: csrQueryFormType) => api.post('crm/csr/dealCsr', data),
  myEnquiryCsr: (data: csrQueryFormType) => api.post('crm/csr/enquiry', data),
  myFollowCsr: (data: csrQueryFormType) => api.post('crm/csr/followUp', data),
  openCsr: (data: csrQueryFormType) => api.post('crm/csr/openCsr', data),
  // 待回访当天的通知提醒
  waitTrackCsr: (data: csrQueryFormType) => api.post('crm/csr/dayFollow', data),
  // myFollowCsr: (data: csrQueryFormType) => api.post('crm/csr/follow', data, {
  //   baseURL: 'http://mr-crm.erpgj.com/public/index.php/',
  // }),
  csrSearchInfo: () => api.get('csr/pageInfo', {
    baseURL: '/mock/',
  }),
  // 客户购买产品详细记录以及跟踪记录
  csrOrderPro: (data: { index?: number; limit?: number; crm_csr_id: number }) => {
    return api.get(`crm/csr/dealOrder?crm_csr_id=${data.crm_csr_id}&index=${data.index}&limit=${data.limit}`)
  },
  // 查询客户的跟踪记录

  csrTrack: (crm_csr_id: number) => {
    return api.get(`crm/csr/track?crm_csr_id=${crm_csr_id}`)
  },
  // 查询客户的跟踪记录

  csrSearch: (data: { name?: string; code?: string; phone?: string }) => api.post('crm/csr/index', data),
  saveEnquiry: (data: object) => api.post('crm/csr/saveEnquiry', data),
  /**
   * @description: 新增编辑成交客户
   * @param {object} data
   * @return {*}
   */
  saveDeal: (data: object) => api.post('crm/csr/saveDeal', data),

}
