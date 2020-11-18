<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <!-- 使用v-for必须绑定:key -->
      <!-- 使用轮播图组件要为此组件传递lunbotuList -->
      <!-- 此时，lunbotuList应该是父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
          <!-- vue中类名=true表示接收该样式，=false表示不接收该样式 -->
          <!-- 此处isfull是由调用轮播图组件的父组件中设置并传入的 -->
        <img :src="item.img" :class="{ full: isfull }" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  // 父组件给子组件传值lunbotuList
  props: ["lunbotuList","isfull"],
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;
    //   注释调这一段是为了是宽度不够的图片能够展示白色背景
    // &:nth-child(1) {
    //   background-color: yellow;
    // }

    // &:nth-child(2) {
    //   background-color: green;
    // }

    // &:nth-child(3) {
    //   background-color: pink;
    // }

    img {
    //   width: 100%;
      height: 100%;
    }
  }

  .full {
    width: 100%;
  }
}
</style>