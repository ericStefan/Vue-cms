<template>
  <div class="SearchContainer">
    <!-- <label>
      <el-input v-model="keywords" placeholder="请输入关键词"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" round
        @click="search(keywords)">搜索</el-button>
    </label> -->
    <span>
      <el-input
        size="meiduim"
        v-model="keywords"
        class="el-input"
        @keyup.enter.native="search(keywords)"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="medium"
        round
        @click="search(keywords)"
        class="el-button"
        >搜索</el-button
      >
    </span>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="ctime" label="时间">{{
        newlist.ctime | dateFormat
      }}</el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: "",
      name: "",
      ctime: "",
      keywords: "",
      newlist: [],
      list: [
        // { id: 1, name: '兰博基尼', ctime: new Date() },
        // { id: 2, name: '保时捷', ctime: new Date() }
        // {id:'',name:'', ctime:''}
      ],

      msg: "",
    };
  },

  methods: {
    add() {},

    del(id) {
      // 删除对应商品
      this.$http.get("api/delproduct/" + id).then((result) => {
        if (result.body.status === 0) {
          // 成功了
          this.getAllList();
        } else {
          // 失败了
          Toast("删除数据失败");
        }
      });
    },

    search(keywords) {
      // 根据关键字模糊搜索
      this.list = this.list.filter((item) => {
        // Es6中新方法 string.protype.include('要包含的字符串')，来表达字符串包含另一个字符串
        if (item.name.includes(keywords)) {
          return item;
        }
      });
    },

    getAllList() {
      // 获取所有品牌列表
      this.$http.get("api/getprodlist").then((result) => {
        var result = result.body;
        if (result.status === 0) {
          // 返回status ===0 表示获取数据成功
          this.list = result.message;
        } else {
          Toast("获取列表数据失败");
        }
      });
    },
  },

  created() {
    // 当vm实例的data和methods初始化完毕后，vm实例会自动执行created
    this.getAllList();
  },

  watch: {
    keywords: function (newVal, oldVal) {
      //监听搜索框，当为空时重新加载列表
      if (newVal === "") {
        this.getAllList();
      }
    },
  },

  directives: {
    focus: function (el, binding) {
      el.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.SearchContainer {
    padding: 10px;
    margin:auto;
    vertical-align:middle;
    .el-input{
      width: 260px;
    }
}
</style>