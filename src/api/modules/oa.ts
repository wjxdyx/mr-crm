import api from '../index'

export default {

  // myCsr: (data: csrQueryFormType) => api.get(`crm/csr/dealCsr?&index=${data.index}&limit=${data.limit}`, {
  //   baseURL: 'http://mr-crm.erpgj.com/public/index.php/',
  // }),
  review: <T>(index: T, limit: T) => api.get(`crm/oa/reviewList?index=${index}&limit=${limit}`),
  allow: <T>(crm_csr_track_id: T, state: T) => api.get(`crm/oa/allowState?crm_csr_track_id=${crm_csr_track_id}&state=${state}`),

}
