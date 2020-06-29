module.exports = {
    // publicPath: '',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/sys':{
                target:'http://api.xxx.com',
                changeOrigin:true,
                pathRewrite:{
                    // '/api':''
                }
            }
        }
    }
}