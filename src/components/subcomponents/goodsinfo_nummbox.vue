<template>
<!-- 我们不知道什么时候拿到max值,使用watch进行属性监听，监听父组件传递过来的max值，max的n次出发的最后一次就是合法的max值 -->
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change = "countChnaged" ref="numbox" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        // 初始化数字选择框组件
        mui(".mui-numbox").numbox()
    },

    methods:{
      countChnaged(){
        // 每当文本框的数据被修改的时候，立即吧最新的数据通过事件调用，传递给父组件
        // console.log(this.$refs.numbox.value)
        this.$emit('getcount', parseInt(this.$refs.numbox.value))
      }
    },

  // GoodsInfo组件中的goodsinfo.stock_quantity是通过异步操作获取到的
    props:["max"],

    watch:{
      'max':function(newVal,oldVal){
        // 使用js api设置numbox的最大值
        mui(".mui-numbox")
        .numbox()
        .setOption("max",newVal)
      }
    }

}
</script>

<style lang="scss" scoped>
    
</style>