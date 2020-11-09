import Vue from 'vue';

// 导入router.js模块
import router from './router.js'
// 将router.js导入的VueRouter注册到vue上去
Vue.use(VueRouter)

// 导入时间插件
import moment from 'moment'
// 定义全局的过滤器,对时间进行格式化
Vue.filter('dateFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})
// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';

// 按需导入mint-ui的组件
import {Header,Swipe, SwipeItem, Button } from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

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
