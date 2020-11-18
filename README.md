# 这是一个基于Vue2.x的商城app项目

## .gitignore文件是git忽略文件，在git上传代码的时候会忽略这些文件
## LICENSE文件是开源许可文件
## 使用vscode下面git命令行上传项目到github


## 改造tabbar为router-link
## 点击tabbar中的路由链接，展示对应的路由组件
## 点击tabbar中的路由链接，展示对应的路由组件

## 制作购物车小图标相对复杂：
把拓展图标css样式拷贝到项目中，再拷贝拓展字体tff文件  
为购物车小图标添加＇mui-icon　mui-icon-extra mui-icon-extra-cart＇样式类

## 改造 新闻咨询 路由链接 

## 新闻资讯 页面 制作
1.绘制界面， 使用MUI中的media-list.html  
2.使用vue-resource获取数据  
3.渲染真实数据  

## 实现 新闻资讯列表 吧、点击跳转到新闻详情
1.把列表中的每一项改造为router-link，同时，在跳转的时候应该提供唯一的ID标识符  
2.创建新闻详情的组件页面 NewsInfo.vue  
3.在路由模块中，将新闻详情的路由地址和组件页面对应起来  

## 实现新闻详情的页面布局和数据渲染
1.把列表中的每一项改造为router-link,同时，在跳转的时候提供唯一的id标识符  
2.创建新闻详情的组件页面NewsInfo.vue  
3.在路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局 和数据渲染

## 单独封装一个comment.vue评论子组件
1.先创建一个单独的comment.vue组件模板  
2.在需要使用comment组件的页面中，先手动导入comment组件  
 +`import comment from './comment.vue'`  
3.在父组件中使用`components`属性，将刚才导入comment组件，注册为自己的子组件  
4.将注册子组件时候的，注册名称，以标签形式，在页面中引用即可  

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1.为加载更多按钮绑定点击事件，请求下一页数据  
2.点击加载更多，让pageIndex++，然后重新调用this.getComments()方法重新获取最新一页的数据  
3.为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候每当获取到新数据应该让老数据调用数组的concat方法，拼接上新数组。

## 发表评论
1.把文本框做双向数据绑定  
2.为发表按钮绑定一个事件  
3.校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空  
4.通过vue-resource发送一个请求，把评论内容提交给服务器  
5.当发表ok后，重新刷新列表，以查看最新的评论  
 +如果调用getComments方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到  
 +换一种思路：当评论成功后，在客户端，手动拼接出来一个最新的评论对象，然后调用数组的unshift方法，把最新的评论，追加到data中comments的开头；这样，就能完美实现刷新评论列表的需求。

 ## 改造图片分析 按钮为 路由链接并显示对应的组件页面

 ## 绘制图片列表组件的页面结构美化样式
 1.顶部滑动滚动条  
 2.制作底部的图片列表  

 ### 制作顶部活动条的坑：
 1.使用MUI中的tab-top-webview-main.html  
 2.需要吧slider区域的mui-fullscreen类去掉  
 3.滑动条无法正常出发滑动，通过检查官方文档，发现这是JS组件，需要初始化一下：  
  +导入mui.js
  +调用官方提供的方式去初始化：
  ```
    mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  ```
4.我们在初始化滑动条的时候导入了mui.js，但是控制台报错：`Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
 +mui.js中用到了'caller','callee',and 'arguments',但是webpack打包好的bundle.js中默认是启用严格模式的，所以这两者是冲突的;
 +解决方案：1.把mui.js中的非严格模式的代码改掉;这不现实; 2.把webpack打包时候的严格模式禁用掉:  
  在babelrc文件中添加(忽略mui的js文件，ps:禁用'strict'模式失效)：  
  ```
  "ignore": [
"./src/lib/mui/js/*.js"  // 建了lib文件夹，存放mui相关文件
]
  ```
5.点击滑动报警告:  
`Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080`
+解决方案:  
```* {
touch-action: pan-y;
}```
禁用chrome浏览器用来提高页面流畅度的touch-action  

6.底部tab栏切换报错:  
`Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080`  
报错原因：chrome禁用了preventDefault()默认方法,在App.vue的样式中添加`* { touch-action: none; }`即可解决

7.禁用严格模式插件transform-remove-strict-mode失效的情况下，删除.babelrc中的@babel/plugin-transform-runtime插件配置即可解决(具体原因未知。)  
8.获取所有分类并渲染分类列表;
 
### 制作图片列表区域
1.图片根据列表需要使用懒加载技术，我们可以使用Mint-UI提供的现成的组件'lay-load'  
2.根据'根据lazy-load'的使用文档，尝试使用  
3.渲染图片列表数据  

## 实现了点击图片跳转到图片详情页面
1.在改造li成route-link的时候，需要使用tag属性指定要渲染为哪种元素  

## 实现详情页面的布局和美化同时获取数据渲染页面
1.导入vue-preview插件实现缩略图展示功能
2.问题1：vue-preview新版本功能更新，需要给mscr用src赋值
3.在组件的scoped样式中添加样式无法作用到渲染出来的元素(未解决！)

## 绘制商品列表页面基本结构并美化

## 尝试在手机上进行项目的预览和测试
1.保证自己手机正常运行;
2.保证手机和pc处于同一个wifi环境中，也就是手机可以访问到电脑的IP
3.打开自己的项目中package.json文件，在dev脚本中，添加一个--host指令，吧当前电脑的WIFI ip地址设置为--host的指令值
 +如何查看自己电脑所处wifi的IP呢，在cmd终端中运行'ipconfig',查看无线网络ip地址