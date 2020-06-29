const jwt = require('jsonwebtoken');

// 检测是否是有token
module.exports = async ( ctx, next ) => {
    const token = ctx.get('token') || '';
    if (token) {
        try {
          let tokenContent = await jwt.verify(token, 'vlog');     //如果token过期或验证失败，将抛出错误
          console.log(tokenContent)
          ctx.userInfo = tokenContent || {} 
        } catch (err) {
          ctx.body = {
            code: 0,
            msg: err,
          }
        }
    }
    await next();
}