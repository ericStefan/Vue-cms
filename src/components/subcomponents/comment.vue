<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr/>
    <textarea
      placeholder="请输入要评论的内容(最多120字)"
      maxlength="120"
    ></textarea>

    <mt-button type="primary" size="large">发表评论</mt-button>

    <div class="cmt-list">
        <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
            <div class="cmt-title">
                第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;时间发表：{{item.add_tiem|dateFormat}}
            </div>
            <div class="cmt-body">
                <!-- 使用?表达式解决当用户无输入或者错误输入的问题 -->
                {{item.content === 'undefined' ? '此用户很懒，啥也没说':item.content}}
            </div>
        </div>
    </div>

    <mt-button type="danger" size="large" plain>加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            pageIndex:1, //默认展示第一页数据
            comments:[]
        }
    },

    created(){
        this.getComments()
    },

    methods:{
        getComments(){
            this.$http.get('api/getcomments/'+ this.id + "?pageindex=" + this.pageIndex).then(result=>{
                if(result.body.status === 0){
                    this.comments = result.body.message
                }else{
                    Toast("获取评论失败！")
                }
            })
        }
    },
    props:["id"]
};
</script>

<style lang="scss" scoped>

    .cmt-container{
        h3{
            font-size: 18px;
        }

        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    line-height: 30px;
                    background-color: #ccc;
                }   
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                } 
            }
        }
    }
</style>