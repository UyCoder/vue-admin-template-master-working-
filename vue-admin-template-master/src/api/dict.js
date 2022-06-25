import request from '@/utils/request'

export default {
  // dict list method
  dictList(id){
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  }
}
