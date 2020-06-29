const config = require('../config')
const Koa = require('koa');
const app = new Koa();
const resolve = require('path').resolve;
const cors = require('koa-cors');
const koaBody = require('koa-body');
const server = require('koa-static');
// const bodyParser = require('koa-bodyparser');
app.use(server(
  require('path').join(__dirname , './public')
)) // 设置静态文件

app.use(cors({
      origin: 'http://localhost:3000',
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST'],
      allowHeaders: ['Content-Type', 'token', 'Accept'],
  })
); // 设置跨域
// app.use(bodyParser());
// app.use(koaBody({
//   multipart:true,
//   formidable:{
//       // uploadDir:require('path').join(__dirname,'public/upload/'), // 设置文件上传目录
//       maxFieldsSize:10*1024*1024,
//       keepExtensions: true,    // 保持文件的后缀
//     }
//   })
// )
app.use(koaBody({
  multipart:true, // 支持文件上传
  // encoding:'gzip',
  // patchKoa: true,
  // jsonLimit: 50 * 1024 * 1024,
  // formLimit: 50 * 1024 * 1024,
  // json: true,
  // strict: false,
  formidable:{
    // uploadDir:require('path').join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 50 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}));

const Route = require('./middleware/route');
const apiPath = resolve(__dirname, './controllers/*/*.js');
const Router = new Route(app, apiPath)
Router.init()
app.listen(config.port);
console.log('listen in localhost:' + config.port)