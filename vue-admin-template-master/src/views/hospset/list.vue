<template>
    <div class="app-container" >
        Hosital Set list
        <br>
        <br>
        <!-- banner列表 -->
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-input  v-model="searchObj.hosname" placeholder="Hospital Name"/>
        </el-form-item>
        <el-form-item>
            <el-input v-model="searchObj.hoscode" placeholder="Hospital Code"/>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()">Search</el-button>
        </el-form>


        <!-- 工具条 -->
    <div>
        <el-button type="danger" size="mini" @click="removeRows()">Batch Delete</el-button>
    </div>


    <el-table 
        :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" width="50" label="No."/>
        <el-table-column prop="hosname" label="Hospital Name"/>
        <el-table-column prop="hoscode" label="Hospital Code"/>
        <el-table-column prop="apiUrl" label="API URL" width="200"/>
        <el-table-column prop="contactsName" label="Contact Name"/>
        <el-table-column prop="contactsPhone" label="Contact Phone"/>

        <el-table-column label="Scope" width="80">
            <template slot-scope="scope">
                {{ scope.row.status === 1 ? 'Available' : 'Not Available' }}
            </template>
        </el-table-column>

        <el-table-column label="Action" width="280" align="center">
            <template slot-scope="scope">
                <el-button type="danger" size="mini" 
                    icon="el-icon-delete" @click="removeDataById(scope.row.id)">Delete</el-button>
            
                <el-button v-if="scope.row.status==1" type="primary" size="mini" 
                    icon="el-icon-delete" @click="lockHospSet(scope.row.id,0)">Lock</el-button>

                <el-button v-if="scope.row.status==0" type="danger" size="mini" 
                    icon="el-icon-delete" @click="lockHospSet(scope.row.id,1)">Unlock</el-button>
            
                <router-link :to="'/hospSet/edit/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
                </router-link>

            </template>
        </el-table-column>


    </el-table>
<!-- paging -->
        <el-pagination 
        :current-page="current"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getList" />

    </div>
</template>
<script>
// import js file that contains api url
import hospset from '@/api/hospset'

export default{
    // create method and default values
   data() {
      return {
         current:1, //current Page
         limit:3, //
         searchObj:{}, //
         list:[], //
         total:0,
         multipleSelection:[] //
        }
    },
    created(){ // before page rendering
    // generaly get data from methods 
      this.getList()
    },
    methods:{ // create method, 
    // lock and unlock
    lockHospSet(id,status){
        hospset.lockHospSet(id,status)
        .then(response=>{
            //refresh
            this.getList()
        })
    },

    // get id of the selection item
        handleSelectionChange(selection){
            this.multipleSelection = selection
    },
    // batch delete
        removeRows(){     
            this.$confirm('This operation will permanently delete the hospital sets information, do you want to continue?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
         }).then(() => { 
                var idList = []

                // all id's get from selection push into idList 
                for(var i=0; i<this.multipleSelection.length;i++){
                    var obj = this.multipleSelection[i]
                    var id = obj.id
                    idList.push(id)
                }
                console.log(idList)
            hospset.batchRemoveHospSet(idList)
                .then(response => {
                    this.$message({
                    type: 'success',
                    message: 'Deleted!'
                    })
                    this.getList(1)
                })
        })

        },
    // hospital set list
        getList(page=1) { 
            this.current = page
            hospset.getHospSetList(this.current,this.limit,this.searchObj)
                .then(response => { 
               //list
               this.list = response.data.records
               //total 
               this.total = response.data.total
            }).catch(error => {//if failed
                console.log(error)
            })
        },
        //delete Hostpital delete
        removeDataById(id) {
        this.$confirm('This operation will permanently delete the hospital set information, do you want to continue?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
        }).then(() => { //
            //use api
            hospset.deleteHospSet(id)
                .then(response => {
                    //message
                    this.$message({
                    type: 'success',
                    message: 'Deleted!'
                    })
                    //refresh page
                    this.getList(1)
                })
        })
    }

}
}
</script>