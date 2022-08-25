import request from '@/utils/request'

export default {
  // hospital list method
  getHospList(page, limit, searchObj){
    return request({
      url: `/admin/hosp/hospital/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  // search child data by dictCode
  findByDictCode(dictCode){
    return request({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'get'
    })
  },
  //find child data by id
  findChildId(id){
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  }

}
