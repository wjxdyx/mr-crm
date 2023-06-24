import api from '../index'

export default {

  docFilePath: (path?: string) => api.get(`resources/Index2/dir?path=${path}`),
  docNewFolder: (dirname?: string) => api.get(`resources/Index2/makeDir?dirname=${dirname}`),
  docSearch: (name?: string) => api.get(`resources/Index2/find?filename=${name}`),
  docDelete: (path?: string) => api.get(`resources/Index2/delete?path=${path}`),
  docUpload: (data: any) => api.post('/resources/index2/upload', data),
  docFileRename: (oldPath: string, newPath: string) =>
    api.get(`resources/Index2/rename?old=${oldPath}&new=${newPath}`),

}
