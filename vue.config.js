const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,//关闭语法检查
  //开启代理服务器
  devServer: {
    //proxy: 'http://localhost:4000'
  },
  css: {
    loaderOptions: {//配置css预处理器
      scss: {
        additionalData: `@import "./src/assets/scss/_variable.scss";`//引入scss文件
      }
    }
  }
});
