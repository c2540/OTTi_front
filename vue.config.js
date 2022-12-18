const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/css/_variables.scss";
          @import "@/assets/css/_mixin.scss";
        `
      }
    }
  },
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },

  devServer : {
    proxy : {

      '/TEST201' : {
        target : 'http://127.0.0.1:8080/',
        changeOringin : true,
        logLevel : 'debug'
      },
    },
    port : 8081
  },

  publicPath:'/TEST201/vue/',
  outputDir : 'C:/Users/user/Documents/GitHub/spring/src/main/resources/static/vue'
})