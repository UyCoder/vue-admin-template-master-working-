import request from '@/utils/request'

export default {
  // list method
  getHospSetList(current, limit, searchObj){
    return request({
      url: `/admin/hosp/hospitalSet/findPage/${current}/${limit}`,
      method: 'post',
      data: searchObj // json format
    })
  },
  // delete hospital set method
  deleteHospSet(id){
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete'
    })
  },
  // batch delete
  batchRemoveHospSet(idList){
    return request({
      url: `/admin/hosp/hospitalSet/batchRemoveHospitalSet`,
      method: 'delete',
      data: idList
  })
},
// lock and unlock
lockHospSet(id, status){
  return request({
    url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
    method: 'put'
})
},
// add hospset
saveHospSet(hospitalSet){
  return request({
    url: `/admin/hosp/hospitalSet/saveHospitalSet`,
    method: 'post',
    data: hospitalSet
}) 
},
// id search hospset
getHospSet(id){
  return request({
    url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
    method: 'get'
}) 
},
// update hospset
updateHospSet(hospitalSet){
  return request({
    url: `/admin/hosp/hospitalSet/updateHospitalSet`,
    method: 'post',
    data: hospitalSet
}) 
}
}
