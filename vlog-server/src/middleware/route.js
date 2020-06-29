const Router = require('koa-router')
const glob = require('glob')
class Route {
    constructor(app, apiPath, preFix) {
        this.app = app
        this.router = new Router()
        this.routePath = apiPath
    }

    init() {
        let files = glob.sync(this.routePath);
        console.log('files-->>', files)
        files.forEach((pathUrl) => {
            console.log('pathUrl-->>', pathUrl)
            let pubRouter = require(pathUrl)
            this.app.use(pubRouter.routes(), pubRouter.allowedMethods())
        });
    }
}
module.exports = Route