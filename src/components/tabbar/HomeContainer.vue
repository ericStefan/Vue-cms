<template>
  <div>
    <!-- 轮播图区域 -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <!-- 九宫格到六宫格菜单 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newslist">
          <img src="../../images/news.png" alt="" />
          <div class="mui-media-body">新闻咨询</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/photolist">
          <img src="../../images/picshare.png" alt="" />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/goodslist">
          <img src="../../images/purchase.png" alt="" />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/feedback.png" alt="" />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/video.png" alt="" />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/contact.png" alt="" />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from '../subcomponents/swiper.vue'
export default {
  data() {
    return {
      lunbotuList: [], //保存轮播图的数组
    };
  },

  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getlunbo").then((result) => {
        // console.log(result.body);
        if (result.body.status === 0) {
          this.lunbotuList = result.body.message;
          //  Toast('加载轮播图成功')
        } else {
          Toast("加载轮播图失败!");
        }
      });
    },
  },

  components:{
    swiper
  }
};
</script>

<style lang="scss" scoped>


.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body {
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>