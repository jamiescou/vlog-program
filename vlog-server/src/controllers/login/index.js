const config = require('../../../config')
const loginModule = require('../../module/loginModule')
const router = require('koa-router')({prefix: config.preFix})
const createToken = require('../../middleware/createToken');
const checkToken = require('../../middleware/checkAuth');
router.post('/login', async ctx => {
  let user = {
    userName: ctx.request.body.userName,
    passWord: ctx.request.body.passWord
  }
  console.log('loginloginloginlogin==>>', user)
  await loginModule.findUser(user.userName).then((res) => {
    if (!res.length) {
      ctx.body = {
        code: 500,
        msg: '用户不存在!',
      }
      console.log('用户未注册')
    } else {
      if (res[0].password === user.passWord) {
        let token = createToken(res[0])
        let {id, usename, headImg} = res[0]
        ctx.body = {
          code: 200,
          msg: '登录成功!',
          userInfo: {
            id, usename, headImg
          },
          token
        }
        console.log('密码校验正确, 允许登录')
      } else {
        ctx.body = {
          code: 500,
          msg: '用户名或者密码错误!',
        }
        console.log('用户名或者密码错误')
      }
    }
  }).catch((err) => {
    ctx.body = {
      code: 500,
      msg: err,
    }
  })
})
// 查找所有管理用户数据
router.get('/getAdminList',checkToken, async ctx => {
  let result = await loginModule.findAllUser()
  let list = []
  result.forEach(item => {
    var obj = {}
    obj.id = item.id
    obj.usename = item.usename
    obj.headImg = item.headImg
    list.push(obj)
  })
  ctx.body = {
    code: 200,
    data: list,
    msg: '操作成功'
  }
})
router.get('/deleteAdmin', checkToken, async ctx => {
  let id = ctx.query.id;
  if (id == 1) {
    return  ctx.body = {
      code: 500,
      msg: "超级管理员不可删除"
    };
  }
  let result = await loginModule.deteleAdmin(id)
  if (result.affectedRows === 0) {
    return  ctx.body = {
              code: 200,
              msg: "无此数据"
            };
  }
  ctx.body = {
    code: 200,
    msg: "删除成功"
  };
})
// 新增管理员
router.post('/addAdmin',checkToken, async ctx => {
 let {userName, passWord} = ctx.request.body
//  console.log('addTagaddTagaddTagaddTagaddTag', ctx.request.body)
  if(!userName || !passWord) {
    return ctx.body = {
      code: 500,
      data: null,
      msg: '用户名和密码不能为空'
    }
  }
  let checkUserName = await loginModule.findUser(userName)
  if (checkUserName.length > 0) {
    return ctx.body = {
      code: 500,
      data: null,
      msg: '用户名重复'
    }
  }
  let result = await loginModule.insertAdmin([userName, passWord])
  ctx.body = {
    code: 200,
    data: null,
    msg: '添加成功'
  }
})
// 修改管理员
router.post('/updateAdmin',checkToken, async ctx => {
  let {userName, passWord, id} = ctx.request.body
  if(!userName || !passWord) {
    return ctx.body = {
      code: 500,
      data: null,
      msg: '用户名和密码不能为空'
    }
  }
  if(userName !== 'admin') {
    return ctx.body = {
      code: 500,
      data: null,
      msg: '超级管理员不可修改用户名'
    }
  }
   let result = await loginModule.updateAdmin([userName, passWord, id])
   ctx.body = {
     code: 200,
     data: null,
     msg: '修改成功'
   }
 })
module.exports = router
