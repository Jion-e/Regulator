import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import routes from './routes'
import filters from './filters'

// import './assets/css/reset.less'
// import './assets/css/style.less'
import './assets/css/myStyle.less'
import './assets/css/style.less'
import './assets/css/FontAwesome/font-awesome.css'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

//过滤器注册
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
Vue.use(VueRouter)
Vue.use(MintUI)

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
