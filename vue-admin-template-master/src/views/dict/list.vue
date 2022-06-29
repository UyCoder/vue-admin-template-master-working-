<template>
    <div class="app-container">
        <div class="el-toolbar">
            <div class="el-toolbar-body" style="justify-content: flex-start;">
                <a href="http://localhost:8202/admin/cmn/dict/exportData" target="_blank">
                    <el-button type="text"><i class="fa fa-plus"/> Export</el-button>
                </a>
           </div>
    </div>




        <el-table
        :data="list"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="getChildrens"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label="Name" width="230" align="left">
            <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
            </template>
            </el-table-column>

            <el-table-column label="DictCode" width="220">
            <template slot-scope="{row}">
                    {{ row.dictCode }}
            </template>
            </el-table-column>
            <el-table-column label="value" width="230" align="left">
            <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
            </template>
            </el-table-column>
            <el-table-column label="createTime" align="center">
            <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
            </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import dict from '@/api/dict'
    export default {
        data(){
            return{
                list:[]
            }
        },
        created() {
            this.getDictList(1)

        },
        methods: {
            // export Dict data 
            exportData(){
                // export 
                window.location.href="http://localhost:8202/admin/cmn/dict/exportData"
            },


            getDictList(id){
                dict.dictList(id)
                    .then(response =>{
                        this.list = response.data
                    })
            },
            getChildrens(tree, treeNode, resolve){
                dict.dictList(tree.id).then(response=>{
                    resolve(response.data)
                })
            }

        }
    }


</script>

