<template>
<div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
        <el-select
            v-model="searchObj.provinceCode"
            placeholder="Select Province"
                @change="provinceChanged">
            <el-option
                v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
        </el-select>
    </el-form-item>

    <el-form-item>
        <el-select
        v-model="searchObj.cityCode"
        placeholder="Select City"
        @change="cityChanged">
            <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
    </el-form-item>

    <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="Hospital Name"/>
    </el-form-item>

    <el-button type="primary" icon="el-icon-search" @click="fetchData()">Search</el-button>
    <el-button type="default" @click="resetData()">Clear</el-button>
    </el-form>

<!-- banner列表 -->
<el-table v-loading="listLoading" :data="list"
        border
      fit
      highlight-current-row>

    <el-table-column
    label="No."
    width="60"
    align="center">
        <template slot-scope="scope">
                {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
    </el-table-column>

    <el-table-column label="Hospital Logo">
        <template slot-scope="scope">
        <img :src="'data:image/jpeg;base64,'+scope.row.logoData" width="80">
        </template>
    </el-table-column>

    <el-table-column prop="hosname" label="Hospital Name"/>
    <el-table-column prop="param.hostypeString" label="Hospital Grade" width="90"/>
    <el-table-column prop="param.fullAddress" label="Full Adress"/>
    <el-table-column label="Scope" width="80">
        <template slot-scope="scope">
                {{ scope.row.status === 0 ? 'Offline' : 'Online' }}
        </template>
    </el-table-column>
    <el-table-column prop="createTime" label="Create Time"/>

    <el-table-column label="Action" width="230" align="center">
    </el-table-column>
</el-table>

    <!-- 分页组件 -->
    <el-pagination
        :current-page="page"
        :total="total"
        :page-size="limit"
        :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
        style="padding: 30px 0; text-align: center;"
        layout="sizes, prev, pager, next, jumper, ->, total, slot"
        @current-change="fetchData"
        @size-change="changeSize"
    />
</div>
</template>







<script>
import hospApi from '@/api/hosp'
export default {
    data() {
        return {
            listLoading: true, // 数据是否正在加载
            list: null, // banner列表
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
            searchObj: {}, // 查询表单对象
            provinceList: [],
            cityList: [],
            districtList: []
        }
    },

    // 生命周期函数：内存准备完毕，页面尚未渲染
    created() {
        console.log('list created......')
        this.fetchData()
        // hospApi.findByDictCode('Province')
        //     .then(response => {
        //         this.provinceList = response.data
        // })
        hospApi.findAllProvince()
    },

    methods: {
        // 加载banner列表数据
        fetchData(page = 1) {
            console.log('翻页。。。' + page)
            // 异步获取远程数据（ajax）
            this.page = page
            hospApi.getHospList(this.page, this.limit, this.searchObj)
            .then(
                response => {
                this.list = response.data.content
                this.total = response.data.totalElements

                // 数据加载并绑定成功
                this.listLoading = false
                })
        },

        findAllProvince(){
            hospApi.findByDictCode('Province')
                .then(response=>{
                    this.provinceList = response.data
                })
        },

        // 当页码发生改变的时候
        changeSize(size) {
            console.log(size)
            this.limit = size
            this.fetchData(1)
        },

        // 重置查询表单
        resetData() {
            console.log('重置查询表单')
            this.searchObj = {}
            this.fetchData()
        },
        provinceChanged() {
            this.cityList = []
            this.searchObj.cityCode = null
            this.districtList = []
            this.searchObj.districtCode = null
            hospApi.findChildId(this.searchObj.provinceCode)
                .then(response => {
                    this.cityList = response.data
                })
        }
    }
}
</script>
