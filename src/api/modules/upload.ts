import api from '../index'

export default {

  upload: (data: any) => api.post('resources/index/up', data),

}
