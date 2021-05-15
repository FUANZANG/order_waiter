import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$apiPath='http://lishuo-api.liyangweb.com'
const app = new Vue({
    ...App
})
app.$mount()
