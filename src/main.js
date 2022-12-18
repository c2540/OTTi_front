import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import routes from './routes/index.js'
import * as PIXI from 'pixi.js'
import stores from './stores/index.js'
import VueSplide from '@splidejs/vue-splide';
//npm install @splidejs/vue-splide

//npm install sass-loader sass webpack --save-dev
//22-11-11 오전 sass-loader 재설치함 scss오류 발생시 위의 npm사용 

loadFonts()

const app = createApp(App);
  app.use(routes)
  app.use(vuetify)
  app.use(stores)
  app.use(PIXI)
  app.use( VueSplide )
  app.mount('#app')
  app.config.globalProperties.foo = '/TEST201';