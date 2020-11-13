import Vue from 'vue';

// 导入图片预览插件vue-preview
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

// 导入router.js模块
import router from './router.js'
// 将router.js导入的VueRouter注册到vue上去
Vue.use(VueRouter)

// 导入时间插件moment.js
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
// 全局设置post时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.optionemulateJSON = true;

// 按需导入mint-ui的组件
import {Header,Swipe, SwipeItem, Button, Lazyload} from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);//导入mint-ui的懒加载模块

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
