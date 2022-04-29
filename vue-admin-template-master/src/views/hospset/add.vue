<template>
    <div class="app-container">
        Hosital Set Add

      <el-form label-width="120px">
         <el-form-item label="Hospital Name">
            <el-input v-model="hospitalSet.hosname"/>

         </el-form-item>
         <el-form-item label="Hospital Code">
            <el-input v-model="hospitalSet.hoscode"/>

         </el-form-item>
         <el-form-item label="Api Url">
            <el-input v-model="hospitalSet.apiUrl"/>

         </el-form-item>
         <el-form-item label="Contact's Name">
            <el-input v-model="hospitalSet.contactsName"/>

         </el-form-item>
         <el-form-item label="Phone No.">
            <el-input v-model="hospitalSet.contactsPhone"/>

         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="saveOrUpdate">Save</el-button>
         
         </el-form-item>
      </el-form>
   </div>
</template>
<script>

import hospset from '@/api/hospset'
export default {
   data() {
      return {
         hospitalSet:{} 
      }
   },
   created() {// before page open
      // get id
      // get hospotal info by id
      if(this.$route.params && this.$route.params.id){
         const id = this.$route.params.id
         this.getHospSet(id)
      }
   },
   methods: {
      // find by id
      getHospSet(id){
         hospset.getHospSet(id)
         .then(response => {
            this.hospitalSet = response.data
         })
      },
      //add
      saveOrUpdate() {
         hospset.saveHospSet(this.hospitalSet)
            .then(response => {
               //popup
               this.$message({
                  type: 'success',
                  message: 'Saved successfully!'
               })
               //跳转列表页面，使用路由跳转方式实现
               this.$router.push({path:'/hospSet/list'})
            })
      }
   }
}
</script>
