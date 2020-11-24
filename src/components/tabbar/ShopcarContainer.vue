<template>
  <div>
    <div class="shopcar-containter">
      <div class="goods-list">
        <!-- 商品列表项区域 -->
        <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
          <div class="mui-card-content">
            <div class="mui-card-content-inner">

              <mt-switch 
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
              <img :src="item.thumb_path" alt="" />
              <div class="info">
                <h1>
                  {{ item.title }}
                </h1>
                <p>
                  <span class="price">￥{{ item.sell_price }}</span>
                  <numbox
                    :initcount="$store.getters.getGoodsCount[item.id]"
                    :goodsid="item.id"
                  ></numbox>
                  <!-- 问题：如何重购物车中获取商品的数量呢 -->
                  <!-- 先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的Id，
                  作为对象的属性名，count值作为对象的属性值，这样，当把所有商品循环一边，就会得
                  到一个对象:{88:2,89:1,90:4}  -->

                  <!-- 使用索引删除购物车中的一项商品 -->
                  <!-- 索引i是用来删除goodslist中的数据，item.id用来删除store中的数据-->
                  <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
            </div>
            <mt-button type="danger">去付款</mt-button>
          </div>
        </div>
      </div>

          <p>{{$store.getters.getGoodsSelected}}</p>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodslist: [], //购物车中所有商品的数据
    };
  },

  created() {
    this.getGoodsList();
  },

  methods: {
    getGoodsList() {
      // 获取购物车商品列表
      // 获取到store中所有商品id，然后拼接出一个用逗号分隔的字符串
      var idArr = [];
      this.$store.state.car.forEach((item) => idArr.push(item.id));
      if (idArr.length <= 0) {
        // 如果传递的ID数组为空，直接返回，不请求接口数据，否则会报错
        return;
      }
      // 获取购物车商品列表
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then((result) => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },

    remove(id, index) {
      // 点击删除，把商品从store中根据传递的Id删除，同时，把当前组件中的goodslist中对应要删除的哪个商品，使用index来删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },

    selectedChanged(id,val){
        // 每当点击开关，把最新的开关状态同步到store中
        console.log(id +"---" + val);
        this.$store.commit('updateGoodsSelected',{id,selected:val});
    }
  },

  components: {
    numbox,
  },
};
</script>

<style lang="scss" scoped>
.shopcar-containter {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
      .mui-card-content-inner{
          display: flex;
          align-items: center;
      }
    img {
      width: 60px;
      height: 60px;
    }
  }
  h1 {
    font-size: 13px;
  }
  .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    .price {
      color: red;
      font-weight: bold;
    }
  }

  .jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red{
      font-size: 16px;
      font-weight: bold;
      color: red;
    }
  }
}
</style>