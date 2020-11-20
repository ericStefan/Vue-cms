<template>
  <div class="app-container">
    <!-- 顶部header区域 -->
    <mt-header fixed title="Vue电商项目"></mt-header>

    <!-- 中间路由区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部Tabbar区域  使用MUI提供的tabbar-->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-my" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <!-- 将store中的getters里的加入购物车商品数量绑定到小图标上 -->
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
</script>

<style scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  /* 取消动画导致元素溢出屏幕造成的滚动条 */
  overflow-x: hidden;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

* {
  touch-action: none;
}
/* 修改类名解决tabbar无法切换的问题修改.mui-tab-item为.mui-tab-item-my */
.mui-bar-tab .mui-tab-item-my.mui-active {
    color: #007aff;
}
.mui-tab-item-my {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-my .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-my .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>