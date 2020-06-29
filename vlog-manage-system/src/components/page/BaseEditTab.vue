<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 信息管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>vlog信息修改</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box1">
                <el-form ref="form" :model="form" label-width="120px">
                    <div class="header_line">基础信息录入</div>
                    <el-divider></el-divider>
                    <div>
                        <el-form-item label="条目标题：" style="display: inline-block;width:50%">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                        <el-form-item label="信息名称：" style="display: inline-block;width:50%">
                            <el-input v-model="form.tagName"></el-input>
                        </el-form-item>
                        
                         <el-form-item label="条目详情：" style="display: inline-block;width:50%">
                            <el-input type="textarea" rows="10" v-model="form.description"></el-input>
                        </el-form-item>
                        <el-form-item label="信息图片：" style="display: inline-block;width:100%">
                            <div class="crop-demo">
                                <img :src="cropImg" class="pre-img" style="width: 150px;height: 150px">
                                <div class="crop-demo-btn">选择图片
                                    <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                                </div>
                            </div>  
                            <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                                <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="cancelCrop">取 消</el-button>
                                    <el-button type="primary" @click="confirmCrop">确 定</el-button>
                                </span>
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="视频文件：" style="display: inline-block;width:100%">
                            <el-upload
                                class="upload-demo"
                                drag
                                :on-success="uploadFileSuccess"
                                action="/sys/uploadfile"
                                multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                        </el-form-item>
                       <el-form-item label="分类类型：" style="display: inline-block;width:50%">
                            <el-select class="mr10" v-model="form.type"  @change="chooseSchool" placeholder="请选择信息类型">
                            <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="外部链接：" style="display: inline-block;width:50%">
                            <el-input v-model="form.link"></el-input>
                        </el-form-item>
                        <el-form-item label="开始时间：" style="display: inline-block;width:50%">
                            <el-date-picker
                                v-model="form.startTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间"
                                align="right"
                                :picker-options="pickerOptions">
                                </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间：" style="display: inline-block;width:50%">
                            <el-date-picker
                                value-format="yyyy-MM-dd HH:mm:ss"
                                v-model="form.endTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                align="right"
                                :picker-options="pickerOptions">
                                </el-date-picker>
                        </el-form-item>
                        <el-form-item label="发布时间：" style="display: inline-block;width:50%">
                            <el-date-picker
                                v-model="form.hours"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetime"
                                placeholder="选择日期时间"
                                align="right"
                                :picker-options="pickerOptions">
                                </el-date-picker>
                        </el-form-item>
                        <el-form-item label="当前状态：" style="display: inline-block;width:50%">
                            <el-input v-model="form.activityStatus"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from '../../api/index';
import VueCropper  from 'vue-cropperjs';
export default {
    name: 'baseform',
    components: {
            VueCropper
        },
    data() {
        return {
            defaultSrc: require('../../assets/img/img.jpg'),
            fileList: [],
            imgSrc: '',
            cropImg: '',
            dialogVisible: false,
            typeList: [{
                value: '昨天',
                id: 1
            },
            {
                value: '今天',
                id: 2
            }
            ],
            optionProps: {
                value: 'text',
                label: 'text',
                children: 'children',
            },
            form: {
                title: '',
                description: '',
                link: '',
                startTime: '',
                endTime: '',
                activityStatus: '',
                tagName: '',
                tagImg: '',
                userId: 1,
                type: ''
            },
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
        };
    },
   
    created(){
        if (this.$route.query && this.$route.query.id) {
            this.getDetailInfo(this.$route.query.id)
        }
        console.log('router====>>', this.$route.path, this.$route.query.id)
    },
    methods: {
        uploadFileSuccess(response, file, fileList){
            console.log('responseresponseresponse===>>', response)
            if (response.code === 200) {
                this.form.videoUrl = response.fileUrl
            }
        },
        dataURLtoFile(dataurl, filename) {//将base64转换为文件
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        },
        setImage(e){
                const file = e.target.files[0];
                console.log('file',file)
                this.fileName = file.name
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
                console.log('this.cropImg', this.cropImg)
            },
            confirmCrop(){
                let cropImgFile = this.dataURLtoFile(this.cropImg, Date.now() + '.' + this.fileName.split('.')[1])
                this.dialogVisible = false;
                var formdata = new FormData();
                formdata.append("file",cropImgFile);
                api.uploadfile({file: formdata}).then(res => {
                    console.log('res===>>>', res)
                    if (res.code === 200){
                        this.form.tagImg = res.fileUrl
                        this.cropImg = res.fileUrl
                    }
                })
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            },
        getDetailInfo(id){
            let params = {
                data: {
                    id
                }
            }
            api.getDetailInfo(params).then(res => {
                console.log(res);
                if (res.code === 200) {
                    this.form = res.data[0];
                    this.cropImg = res.data[0].tagImg
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        handleClick(tab, event) {
            this.form.examineResult.result = tab.label
            console.log(tab, event);
        },
        chooseArea(e) {
            console.log('area========', e)
            this.county = e[0]
            this.town = e[1]
            this.form.schoolName = ''
            this.getSchoolInfo()
        },
        chooseSchool(e) {
            this.form.schoolId = e
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
        onSubmit() {
            console.log('this.form====>>', this.form)
            let postData = {
                data: this.form
            }
            api.editResult(postData).then(res => {
                console.log('res========', res)
                if (res.code === 200) {
                    this.$message.success('提交成功！');
                    setTimeout(() => {this.$router.replace('/health-tab')}, 1000)
                } else {
                    this.$message.error(res.msg);
                }
            })
        }
    }
};
</script>
<style lang="scss" scoped>
    .header_line{
        font-size: 18px;
        font-weight: bold;
    }
    .two_input{
        .el-form-item__content{
            .el-input{
                width: 40%;
            }
            >span{
                color: #888;
                margin: 0 20px;
            }
        }
    }
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
    
</style>