<template>
  <div class="app-container">
    <h1>这是App的组件</h1>
    <!-- 顶部header区域 -->
    <mt-header fixed title="Vue电商项目"></mt-header>
    <!-- 中间路由区域 -->

    <!-- 底部Tabbar区域  使用MUI提供的tabbar-->
    		<nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">消息</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">通讯录</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</a>
		</nav>
  </div>
</template>

<script>
</script>

<style scoped>
  .app-container{
    padding:40px;
}
</style>