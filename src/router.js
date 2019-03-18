import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import login from './views/login'
import admin from './views/adminpage'
import dashboard from './views/dashboard'
import users from './views/users'
import add_user from './components/add_user'
import coupons from './views/coupons'
import add_coupon from './components/add_coupon'
import coupon_details from './views/coupon_details'
import settings from './views/settings'
import home_banner from './views/home_banner'
import add_home_banner from './components/add_home_banner'
import ads_banner from './views/ads_banner'
import add_ads_banner from './components/add_ads_banner'
import ads from './views/ads'
import add_ads from './components/add_ads'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/',
            name: 'admin',
            component: admin,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: dashboard
                }, {
                    path: '/users',
                    name: 'users',
                    component: users
                },
                {
                    path: '/add_user',
                    name: 'add_user',
                    component: add_user
                },
                {
                    path: '/coupons',
                    name: 'coupons',
                    component: coupons
                },
                {
                    path: '/add_coupon',
                    name: 'add_coupon',
                    component: add_coupon
                },
                {
                    path: '/coupon_details',
                    name: 'coupon_details',
                    component: coupon_details
                },
                {
                    path: '/setting',
                    name: 'settings',
                    component: settings
                },
                {
                    path: '/home_banner',
                    name: 'home_banner',
                    component: home_banner
                },
                {
                    path: '/add_home_banner',
                    name: 'add_home_banner',
                    component: add_home_banner
                },
                {
                    path: '/ads_banner',
                    name: 'ads_banner',
                    component: ads_banner
                },
                {
                    path: '/add_ads_banner',
                    name: 'add_ads_banner',
                    component: add_ads_banner
                },
                {
                    path: '/ads',
                    name: 'ads',
                    component: ads
                },
                {
                    path: '/add_ads',
                    name: 'add_ads',
                    component: add_ads
                },
            ]
        },
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return
        }
        next('/login')
    } else {
        next()
    }
})
export default router
