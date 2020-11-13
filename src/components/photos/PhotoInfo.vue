<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间:{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr />
    <!-- 缩略图区域 -->
    <div class="thumbs">
        <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>
    

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 导入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到的图片ID
      photoinfo: {}, //图片详情
      list: [], //缩略图数组
    //  
    //  slide1: [
    //     {
    //       src:
    //         "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
    //       msrc:
    //         "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg",
    //       alt: "picture1",
    //       title: "Image Caption 1",
    //       w: 600,
    //       h: 400,
    //     },
    //   ],
    };
  },

  created() {
    this.getPhotoInfo();
    this.gettHumbs();
  },

  methods: {
    getPhotoInfo() {
      // 获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then((result) => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        } else {
          Toast("获取图片详情失败！");
        }
      });
    },

    gettHumbs() {
      this.$http.get("api/getthumimages/" + this.id).then((result) => {
        if (result.body.status === 0) {
          result.body.message.forEach((item) => {
            item.w = 600;
            item.h = 400;
            // vue-preview更新后添加了msrc属性，将src赋值给msrc即可
            item.msrc = item.src;
          });
          this.list = result.body.message;
        } else {
          Toast("获取缩略图失败！");
        }
      });
    },

    handleClose () {
        console.log('close event')
      }
  },

  components: {
    // 注册评论子组件
    "cmt-box": comment,
  },
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #0e7fd4;
    font-size: 15px;
    text-align: center;
    margin: 15px;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
.thumbs {
  >>> .my-gallery{   //deep深层作用选择器
        display: flex;
        flex-wrap:wrap;//默认换行
        figure{
            width: 30%;
            margin: 5px;
            img{
                width: 100%;
                box-shadow: 0 0 8px #999;
                border-radius: 5px;
        }
    }
}
}
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>
