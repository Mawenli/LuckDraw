var path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    },
    lintOnSave: false,
    devServer: {
        port: 8080,
        host: 'localhost',
        https: false,
        open: true,
        proxy: {
            // 开发环境
            '/api/cc': {
                target: 'http://d1.lp.qdsay.com',
                changeOrigin: true
            },
            '/mockjsdata/17/api': {
                target: 'http://rap.dahai.com',
                changeOrigin: true
            }
        }
    },
   
}