import request from '../utils/request';
export const api = {
    login: (params) => {
        return request({
            url: '/sys/login',
            method: params.type || 'post',
            data: params.data
        })
    },
   
    insertResult: (params) => {
        return request({
            url: '/sys/addTag',
            method: params.type || 'post',
            data: params.data
        })
    },
    editResult: (params) => {
        return request({
            url: '/sys/updateTag',
            method: params.type || 'post',
            data: params.data
        })
    },
    exportResult: (params) => {
        return request({
            url: '/sys/examineResult/export',
            method: params.type || 'post',
            timeout: 120000,
            responseType: 'blob',
            data: params.data
        })
    },
    uploadfile: (params) => {
        return request({
            url: '/sys/uploadfile',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: params.type || 'post',
            data: params.file
        })
    },
    listResult: (params) => {
        return request({
            url: '/sys/findAllTag?type=' + params.data.type + '&&search=' + params.data.search,
            method: params.type || 'get',
            data: {}
        })
    },
    deleteTag: (params) => {
        return request({
            url: '/sys/deleteTag?id=' + params.data.id,
            method: params.type || 'get',
            data: {}
        })
    },
    getDetailInfo: (params) => {
        return request({
            url: '/sys/findTag?id=' + params.data.id,
            method: params.type || 'get',
            data: {}
        })
    },
    getSysManagerList: (params) => {
        return request({
            url: '/sys/getAdminList',
            method: params.type || 'get',
            data: params.data
        })
    },
    deleteManager: (params) => {
        return request({
            url: '/sys/deleteAdmin?id=' + params.data.id,
            method: params.type || 'get',
            data: {}
        })
    },
    saveManagerInfo: (params) => {
        let url = '/sys/updateAdmin'
        if (params.flag == 'add') {
            url = '/sys/addAdmin'
        }
        return request({
            url,
            method: params.type || 'post',
            data: params.data
        })
    },
    changePwd: (params) => {
        return request({
            url: '/sys/login/changePwd',
            method: params.type || 'post',
            data: params.data
        })
    },
    getSysSchoolList: (params) => {
        return request({
            url: '/sys/school/list',
            method: params.type || 'post',
            data: params.data
        })
    },
    saveSchoolInfo: (params) => {
        return request({
            url: '/sys/school/save',
            method: params.type || 'post',
            data: params.data
        })
    },
    deleteSchool: (params) => {
        return request({
            url: '/sys/school/delete?id=' + params.data.id,
            method: params.type || 'post',
            data: {}
        })
    },
    getStorageData: (type) => {
        return new Promise((resolve, reject) => {
            let data = localStorage.getItem(type);
            if (data) {
                resolve(data)
            } else {
                reject('获取本地存储数据失败')
            }
        })
    }
}
