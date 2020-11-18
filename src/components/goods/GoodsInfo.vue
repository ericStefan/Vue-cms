<template>
  <div class="goodsinfo-container">
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 此处:isfull是给组件传递isfull的值 -->
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price"
              >￥{{goodsinfo.sell_price}}</span
            >
            <!-- 添加购买数量 -->
            <p>购买数量：<numbox></numbox></p>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small">加入购物车</mt-button>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p>商品货号：{{goodsinfo.goods_no}}</p>
            <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
            <p>上架时间：{{goodsinfo.add_time |dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-header">
          <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>

  <!-- 分析：商品评论图比例不对存在的原因 -->
  <!-- 1.首页中图片都是使用100%的宽高 -->
  <!-- 2.商品详情页面中，轮播图图片使用宽高100%会造成图片比例不对 -->
  <!-- 3.商品详情页面中，轮播图高度为100%，宽度为自适应较合理 -->
  <!-- 4.首页和商品详情页面两个轮播图只有宽度有分歧，只需要定义属性，让使用轮播图的调用者指定宽度 -->
</template>

<script>
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_nummbox.vue";
export default {
  components: {
    swiper,
    numbox,
  },
  data() {
    return {
      id: this.$route.params.id, // 将路由参数对象的id挂载到data上
      lunbotu: [],   // 这是轮播图的数据
      goodsinfo:{}, //获取到的商品的信息
    };
  },

  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },

  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then((result) => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中只认识item.img,不认识item.src
          result.body.message.forEach((item) => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        } else {
          console.log("获取轮播图失败！");
        }
      });
    },

    getGoodsInfo(){
        this.$http.get("api/goods/getinfo/" + this.id).then(result=>{
            if(result.body.status === 0){
                this.goodsinfo = result.body.message[0];
            }
        })
    },

    goDesc(id){
        // 点击使用编程式导航，跳转到图文介绍页面
        this.$router.push({name:"goodsdesc",params:{id}});
    },

    goComment(id){
        // 点击跳转到评论页面
        this.$router.push({name:"goodscomment",params:{id}})
    }
  },
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-header{
      display: block;
      button{
          margin: 15px 0;
      }
  }
}
</style>