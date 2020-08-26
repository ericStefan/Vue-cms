import Vue from 'vue';

// 导入router.js模块
import router from './router.js'
// 将router.js导入的VueRouter注册到vue上去
Vue.use(VueRouter)

// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 按需导入mint-ui的组件
import {Header,Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import app from './App.vue';
import VueRouter from 'vue-router';
var vm = new Vue({
    el: '#app',
    data: {
        msg:'123'
    },
    methods: {},
    router,
    render:c=>c(app)
});
