import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import { Pagination } from 'bootstrap-vue/es/components'
Vue.use(Pagination)

Vue.use(Vuelidate)
Vue.use(VueAxios, Axios);
library.add(faCoffee);
Vue.component('font-awesome-icon', FontAwesomeIcon);
window.$ = window.jQuery = require('jquery');
Vue.use({
    install: function (Vue) {
        Vue.prototype.$jQuery = require('jquery'); // you'll have this.$jQuery anywhere in your vue project
    }
});
Vue.config.productionTip = false;
const token = localStorage.getItem('token')
if (token) {
    Axios.defaults.headers.common['Authorization'] = token
}
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
$(function () {
});