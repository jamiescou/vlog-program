<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">VLOG信息后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="userName">
                    <el-input v-model="param.userName" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.pwd"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { api } from '../../api/index';
import md5 from 'MD5'

export default {
    data: function() {
        return {
            param: {
                userName: '',
                pwd: '',
            },
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    let loginData = {
                        data: {
                            userName: this.param.userName,
                            passWord: md5(this.param.pwd)
                        },
                        type: "post"
                    }
                    api.login(loginData).then(res => {
                        if (res.code === 200) {
                            this.$message.success('登录成功');
                            localStorage.setItem('token', res.token)
                            localStorage.setItem('userName', res.userInfo.usename)
                            setTimeout(() => {this.$router.replace('/dashboard')}, 1000)
                        } else {
                            this.$message.error(res.msg);
                        }
                        console.log('res===>', res)
                    })
                } else {
                    this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>