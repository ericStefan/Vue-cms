import Vue from 'vue';

// 按需导入mint-ui的组件
import {Header} from 'mint-ui';
Vue.component(Header.name,Header);

// 导入MUI的样式
import './lib/mui/css/mui.min.css'
import app from './App.vue';
var vm = new Vue({
    el: '#app',
    data: {
        msg:'123'
    },
    methods: {},
    router:{},
    render:c=>c(app)
});
