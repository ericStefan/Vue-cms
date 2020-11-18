<template>
  <div>
    <!-- MUI的顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <!-- vue中绑定类，类名用字符串数组存储 -->
          <a
            :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            @tap="getPhotoListByCateId(item.id)"
            >{{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <!-- 图片列表加载区域 -->
    <ul class="photo-list ">
      <!-- li元素被替换成了router-link，为了保证css的正常渲染，使用tag标签，指定router-link渲染为li -->
      <router-link
        v-for="item in list"
        :key="item.id"
        :to="'/home/photoinfo/' + item.id"
        tag="li"
      >
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 1.导入mui.min.js文件
// 使用* as mui的方式引入mui可以避免mui未定义而产生的打包的时候的报错：
// "export 'default' (imported as 'mui') was not found in '../../lib/mui/js/mui.min.js'
import  mui from "../../lib/mui/js/mui.min.js";
// 解决导航失效报错的问题
// mui("body").on("click", "a", function () {
//   document.location.href = this.href;
// });

export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [], //图片列表的数组
    };
  },

  created() {
    this.getAllCategory();
    // 默认进入页面就主动请求所有列表的图片数据
    this.getPhotoListByCateId(0);
  },

  mounted() {
    // 2.初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      indicators: false, //是否显示滚动条
      bounce: true //是否启用回弹
    });
  },
  methods: {
    getAllCategory() {
      // 获取所有图片分类
      this.$http.get("api/getimgcategory").then((result) => {
        if (result.body.status === 0) {
          // 手动拼接一个最完整的图片数据列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        } else {
          Toast("获取图片分类列表失败！");
        }
      });
    },
    getPhotoListByCateId(cateId) {
      this.$http.get("api/getimages/" + cateId).then((result) => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        } else {
          Toast("获取图片失败！");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  // 添加touch-action:pan-y可解决滑动式产生的警告
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
    }
    .info-title {
      font-size: 14px;
      color: rgb(173, 166, 166);
    }
    .info-body {
      font-size: 13px;
    }
  }
}
</style>