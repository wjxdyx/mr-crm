import api from '../index'

export default {

  docFile: () => api.get('doc/index', {
    baseURL: '/mock/',
  }),

  docPid: (pid: number) => api.get(`/resources/Index/index?pid=${pid}`),
  docNewFolder: (dirname?: string) => api.get(`resources/Index/makeDir?dirname=${dirname}`),
  docSearch: (name?: string) => api.get(`resources/Index/find?filename=${name}`),
  docDelete: (path?: string) => api.get(`resources/Index/delete?path=${path}`),
  docFileRename: (oldPath: string, newPath: string) =>
    api.get(`resources/Index/rename?old=${oldPath}&new=${newPath}`),

}
