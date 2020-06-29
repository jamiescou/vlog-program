const config = require('../../../config')
const queryModule = require('../../module/queryModule')
const router = require('koa-router')({prefix: config.preFix})
const checkToken = require('../../middleware/checkAuth'); // 需要鉴权就加在路由里面

// router.get('/', ctx => {
//   ctx.body = '这是服务器首页';
// })

// 删除数据
// router.get('/deleteTag', checkToken, async ctx => {
//   let id = ctx.query.id;
//   let result = await queryModule.deteleTag(id)
//   if (result.affectedRows === 0) {
//     return  ctx.body = {
//               code: 500,
//               msg: "无此数据"
//             };
//   }
//   ctx.body = {
//     code: 200,
//     msg: "删除成功"
//   };
// })
// 删除全部数据
// router.get('/deleteAllTag',checkToken, async ctx => {
//   let result = await queryModule.deteleAllTag()
//   if (result.affectedRows === 0) {
//     return  ctx.body = {
//               code: 500,
//               msg: "无此数据"
//             };
//   }
//   ctx.body = {
//     code: 200,
//     msg: "所有数据删除成功"
//   };
// })
// 插入单条数据
// router.post('/addTag',checkToken, async ctx => {
//  console.log('addTagaddTagaddTagaddTagaddTag', ctx.request.body)
//   let {title, description, link, startTime, endTime,activityStatus,tagName,tagImg,userId} = ctx.request.body
//   let result = await queryModule.insertTag([title, description, link, startTime, endTime,activityStatus,tagName,tagImg,userId])
//   console.log('result', result)
//   ctx.body = {
//     code: 200,
//     msg: `插入成功!`
//   }
// })
// 修改数据

// router.post('/updateTag',checkToken, async ctx => {
//   let {title, description, link, startTime, endTime,activityStatus,tagName,tagImg,userId, id} = ctx.request.body
//   let result = await queryModule.updateTag([title, description, link, startTime, endTime,activityStatus,tagName,tagImg,userId,id])
//   console.log('result', result)
//   ctx.body = {
//     code: 200,
//     msg: `修改成功`
//   };
// })
// 查找数据
router.get('/getTag', async ctx => {
  let id = ctx.query.id;
  let result = await queryModule.findTag(id)
  ctx.body = {
    code: 200,
    data: result[0] || null,
    msg: '操作成功'
  }
})
// 查找所有数据
router.get('/getAllTag', async ctx => {
  let type = ctx.query.type; // 区分今天，明天  1，2
  let search = ctx.query.search; // 搜索
  let result = await queryModule.findAllTag({type, search})
  ctx.body = {
    code: 200,
    data: result || [],
    msg: '操作成功'
  }
})
module.exports = router
