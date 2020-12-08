<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_item | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>
        <!--这里放置真实显示的DOM内容-->
        <hr />
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件区域 -->
        <comment-box :id="this.id"></comment-box>

  </div>
</template>

<script>
// 1.导入评论子组件
import comment from "../subcomponents/comment.vue";
// 导入mui
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      id: this.$route.params.id, //将URL地址中传递过来的ID值，挂载到data上，方便以后调用
      newsinfo: {}, //新闻对象
    };
  },

  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },

  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then((result) => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取新闻失败！");
        }
      });
    },
  },
  components: {
    //用来注册子组件的节点
    "comment-box": comment,
  },
};
</script>


<style lang="scss" >
// 删除scoped可以解决新闻正文中图片显示不全的问题
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>