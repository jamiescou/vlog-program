const fs = require('fs')
const path = require('path')
const config = require('../../../config')
const loginModule = require('../../module/loginModule')
const router = require('koa-router')({prefix: config.preFix})
const createToken = require('../../middleware/createToken');
const checkToken = require('../../middleware/checkAuth');
router.post('/uploadfile', async (ctx, next) => {
  // 上传单个文件
  console.log(ctx.request.files.file.size);
  console.log('filefilefilefilefile', ctx.request.files.file.type)
  const file = ctx.request.files.file; // 获取上传文件
  const size = (file.size / 1024 / 1024).toFixed(1)  + 'M'
  const type = ctx.request.files.file.type
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, '../../../public/upload') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = {
    code: 200,
    size,
    type,
    fileUrl: `https://oss.chenmychou.cn/public/upload/${file.name}`,
    msg: "上传成功"
  };
});

module.exports = router
