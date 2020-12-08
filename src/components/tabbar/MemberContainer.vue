<template>
  <div class="MemberContainer">
    <div class="mui-card my-top">
      <div class="mui-card-header">
        <div class="head-img">
          <img src="../../images/Head.jpg" alt="" />
          <!-- <el-avatar icon="el-icon-user-solid"></el-avatar> -->
        </div>

        <div>
          <span class="id">黑店的小颠</span>
          <br />
          <span class="edition">查看或编辑个人主页</span>
        </div>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          这个区域用来展示个人中心登录及会员
        </div>
      </div>
    </div>

    <div class="mui-card my-medium">
      <div class="mui-card-header">功能区</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">我的订单</div>
        <div class="mui-card-content-inner">待发货</div>
        <div class="mui-card-content-inner">待收货</div>
      </div>
      <div class="mui-card-footer">页脚</div>
    </div>

    <div class="mui-card my-bottom">
      <div class="mui-card-header">关于应用</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">联系我们</div>
      </div>
    </div>

    <mt-button type="danger" size="large">退出登录</mt-button>
  </div>
</template>

<script>

export default {};
</script>
<style lang="scss" scoped>
.MemberContainer {
  .my-top {
    .mui-card-header {
      height: 120px;
      display: flex;
      justify-content: flex-start;
      .head-img {
        img {
          height: 70px;
          width: 70px;
          border-radius: 50%;
        }
      }

      .id {
        font-size: 23px;
        font-weight: bold;
      }
      .edition {
        font-size: 15px;
        font-weight: lighter;
      }
    }
  }
}
</style>