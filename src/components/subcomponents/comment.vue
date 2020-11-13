<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr/>
    <textarea
      placeholder="请输入要评论的内容(最多120字)"
      maxlength="120"
      v-model="msg"
    ></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
        <!-- 在使用Date().now生成的时间作为唯一标识符绑定:key时候，在后面加上随机数，可以解决因为时间精确度导致的key不唯一。 -->
        <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time + Math.random()">
            <div class="cmt-title">
                第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;时间发表：{{item.add_tiem|dateFormat}}
            </div>
            <div class="cmt-body">
                <!-- 使用?表达式解决当用户无输入或者错误输入的问题 -->
                {{item.content === 'undefined' ? '此用户很懒，啥也没说':item.content}}
            </div>
        </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            pageIndex:1, //默认展示第一页数据
            comments:[],
            msg:'', //输入评论的内容
        }
    },

    created(){
        this.getComments()
    },

    methods:{
        getComments(){//获取评论
            this.$http.get('api/getcomments/'+ this.id + "?pageindex=" + this.pageIndex).then(result=>{
                if(result.body.status === 0){
                    // this.comments = result.body.message
                    // 每当获取新评论数据的时候，应该在旧的评论后面实现拼接，而不是替换
                    this.comments = this.comments.concat(result.body.message)
                }else{
                    Toast("获取评论失败！")
                }
            })
        },

        getMore(){//获取更多评论
           this.pageIndex++;
           this.getComments();
        },

        postComment(){//发表评论
            // 检验是否为空内容
            if(this.msg.trim().length === 0){
                return Toast("评论内容不能为空！");
            }

            //参数1：请求的url地址
            //参数2：提交给服务器的数据对象{content：this.msg}
            //参数3：定义提交时候，表单中数据的格式{emulateJSON:true}
            this.$http.post("api/postcomment/"+ this.$route.params.id,{
                content:this.msg.trim()})
                .then(result=>{
                if(result.body.status === 0){
                    // 1.拼接一个评论对象
                    // trim()方法用于删除字符串的头尾空白符
                    var cmt = {
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        content:this.msg.trim()
                        };
                        this.comments.unshift(cmt);
                        this.msg = "";
                }else{
                    Toast("发表评论失败！")
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