import Vue from 'vue'
import App from './App'
import store from './store'
import uView from "uview-ui"
import {myHttp} from './common/api.js'
Vue.use(uView)
Vue.prototype.$myHttp = myHttp
Vue.config.productionTip = false

Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
