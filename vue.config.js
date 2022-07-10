const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    proxy:{
      '/apiss':{
        target:'https://demo.crudapi.cn/api/business',
        pathRewrite:{'^/apiss':''}
      }
    }
  }
})

