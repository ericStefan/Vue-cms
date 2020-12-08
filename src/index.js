import Vue from 'vue';
// 导入vuex
import Vuex from 'vuex';
Vue.use(Vuex);

// 每次刚进入网站，肯定会调用main.js在刚调用的时候，先从本地存储中把购物车数据读取出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]');
// 为Vuex创建一个Stroe()实例，得到一个数据仓储对象
var store = new Vuex.Store({
    state: {
        // 可以吧state理解成组件中的data，专门用用来储存数据的
        car: car //将购物车中商品的数据用一个数组存储起来，形式为{id:商品id,count:要购买的数量, price:商品的单价, selected:被选中状态}
    },

    mutations: {
        addToCar(state, goodsinfo) {
            // 点击加入购物车，把商品信息保存到store中的car上
            // 1.购物车之间就已经有这个对应的商品了，就只需要更新数量
            // 2.如果没有则直接吧商品数据push到car中

            // 加载在购物车中没有找到对应商品
            var flag = false
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            // 如果循环完毕得到flag还是false，则把商品数据直接push到购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }

            // 当更新car之后，把car数组存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car));
        },

        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            // 分析：
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            })

            // 当修改商品的数量，把最新的购物车数据，保存到本地
            localStorage.setItem('car', JSON.stringify(state.car));
        },

        removeFromCar(state, id) {
            // 根据Id，从store中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id === id) {
                    state.car.splice(i, 1);
                    return true;
                }
            })

            // 将删除完毕的最新的购物车数据保存到本地
            localStorage.setItem('car', JSON.stringify(state.car));

        },

        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })

            // 将更新了最新开关状态的购物车数据保存到本地
            localStorage.setItem('car', JSON.stringify(state.car));
        },
    },

    getters: {
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },

        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o;
        },

        getGoodsSelected(state) {
            // 存储购物车勾选状态数据
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })

            return o;
        },

        getGoodsCountAndAmount(state){
            // 存储结算页面勾选数量和勾选总价数据
            var o = {
                count:0,  //勾选对象
                amount:0, //勾选总价 
            }

            state.car.forEach(item=>{
                if(item.selected){
                    o.count += item.count;
                    o.amount +=item.price * item.count;
                }
            })
            return o;
        }
    }
})
// 导入router.js模块
import router from './router.js'
// 将router.js导入的VueRouter注册到vue上去
Vue.use(VueRouter)

// 导入图片预览插件vue-preview
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

// 导入时间插件moment.js
import moment from 'moment'
// 定义全局的过滤器,对时间进行格式化
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
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
// import {Header,Swipe, SwipeItem, Button,Toast,Lazyload} from 'mint-ui';
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.component(Toast.name, Toast);
// Vue.use(Lazyload);//导入mint-ui的懒加载模块
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// import  *as mui from "./lib/mui/js/mui.min.js";
// mui('.mui-scroll-wrapper').scroll({
//     deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
//     scrollY: true, //是否竖向滚动
//     startY: 0, //初始化时滚动至y
// });

// 导入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'


// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import app from './App.vue';
import VueRouter from 'vue-router';


var vm = new Vue({
    el: '#app',
    data: {
        msg: '123'
    },
    methods: {},
    router,
    render: c => c(app),
    store: store, //将vuex创建的store挂载到VM实例上，可简写为store
});


