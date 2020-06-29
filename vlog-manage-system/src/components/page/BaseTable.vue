<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 信息列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select class="mr10" v-model="query.type"  @change="chooseSchool" placeholder="请选择信息类型">
                    <el-option
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-input style="width: 30%" v-model="query.search" placeholder="请输入信息内容" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column align="center" prop="title" label="条目标题"></el-table-column>
                <el-table-column align="center" prop="tagName" label="信息名称"></el-table-column>
                <el-table-column align="center" prop="type" label="分类类型"></el-table-column>
                <!-- <el-table-column align="center" prop="tagImg" label="信息图片">
                </el-table-column> -->
                <el-table-column label="信息图片(查看大图)" prop="tagImg" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.tagImg"
                            :preview-src-list="[scope.row.tagImg]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="description" label="条目详细"></el-table-column>
                <el-table-column align="center" prop="link" label="外部链接"></el-table-column>
                <el-table-column align="center" prop="hours" label="发布时间"></el-table-column>
                <el-table-column align="center" prop="startTime" label="开始时间"></el-table-column>
                <el-table-column align="center" prop="endTime" label="结束时间"></el-table-column>
                <el-table-column align="center" prop="activityStatus" label="当前状态"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.page"
                    :page-size="query.pageSize"
                    :total="total"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '../../api/index';
import { Loading } from 'element-ui';
const role = localStorage.getItem('userName');
export default {
    name: 'basetable',
    data() {
        return {
            typeList: [{
                value: '全部',
                id: ''
            },{
                value: '昨天',
                id: 1
            },
            {
                value: '今天',
                id: 2
            }
            ],
            roleAdmin: '',
            schoolName: '',
            query: {
                type: '',
                search: ''
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            total: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
        api.getStorageData('userName').then(res => {
            console.log('res===========', res)
            this.roleAdmin = res
        })
    },
    methods: {
        // chooseArea(e) {
        //     console.log('area========', e)
        //     this.county = e[0]
        //     this.town = e[1]
        //     this.query.schoolId = ''
        //     this.getSchoolInfo()
        // },
        chooseSchool(e) {
            console.log('e==>', e)
            this.query.type = e
            this.query.search = null
            if (e === '') {
                this.query.search = ''
            }
            this.getData()
        },
        getSchoolInfo(){
            let {county, town} = this
            let postData = {
                data: {
                    town,
                    county
                }
            }
            api.getSchoolInfo(postData).then(res => {
                console.log('res==>>', res)
                if (res.code === '0') {
                    this.schoolList = res.data
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            let params = {
                data: this.query
            }
            api.listResult(params).then(res => {
                console.log(res);
                if (res.code === 200) {
                    this.tableData = res.data;
                    this.total = res.data.length;
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    let postData = {
                        data: {
                            id: row.id
                        }
                    }
                    api.deleteTag(postData).then(res => {
                        if (res.code === 200) {
                            this.$message.success('删除成功');
                            this.getData();
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                })
                .catch(() => {});
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'page', 1);
            this.getData();
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            console.log('row==>>', row)
            this.$router.push({path: '/health-edit', query: {id: row.id}})
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'page', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
