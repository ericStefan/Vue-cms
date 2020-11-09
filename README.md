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
