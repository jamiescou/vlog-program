<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 管理员列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box" v-if="adminInfo === 'admin'">
                <el-button type="primary" @click="handleAdd">添加管理员</el-button>
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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="usename" label="用户名"></el-table-column>
                <el-table-column prop="usename" label="姓名"></el-table-column>
                <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column> -->
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
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="editStatusText" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                 <el-form-item label="密码">
                    <el-input type="password" v-model="form.passWord"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import md5 from 'MD5'
import { api } from '../../api/index';
export default {
    name: 'ManageTable',
    data() {
        return {
            editStatusText: '修改管理员',
            adminInfo: '',
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {
                passWord: '',
                userName: '',
                id: ''
            },
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getSysManagerList();
        this.adminInfo = localStorage.getItem('userName')
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getSysManagerList() {
            let params = {
                    data:{
                    userName: ""
                }
            }
            api.getSysManagerList(params).then(res => {
                if (res.code === 200) {
                    this.tableData = res.data

                }
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
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
                    api.deleteManager(postData).then(res => {
                        if (res.code === 200) {
                            this.$message.success('删除成功');
                            this.getSysManagerList();
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleAdd(){
            this.editStatusText = '添加管理员';
            this.flag = 'add'
            this.form = {}
            this.editVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.flag = 'edit'
            this.form.userName = row.usename
            this.form.id = row.id;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.form.passWord = md5(this.form.passWord)
            delete this.form.password
            delete this.form.usename
            delete this.form.isDelete
            let params = {
                data: this.form,
                flag: this.flag
            }
            api.saveManagerInfo(params).then(res => {
                if (res.code === 200) {
                    this.getSysManagerList();
                    this.editVisible = false;
                    this.$message.success('保存成功');
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
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
