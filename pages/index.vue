<template>
  <div class="hello">
  <!--  -->
   <div class="content">
     <v-form v-model="valid">
       <v-container>
         <h2>后台登录</h2><br/>
         <v-flex xs12>
           <v-text-field
             type="username"
             v-model="username"
             :rules="nameRules"
             :counter="12"
             label="请输入账号"
             required
           ></v-text-field>
         </v-flex>
         <v-flex xs12>
           <v-text-field
             type="password"
             v-model="password"
             :rules="passwordRules"
             :counter="10"
             label="请输入密码"
             required
             @keyup.enter="submit"
           ></v-text-field>
         </v-flex>
         <v-flex xs12>
           <v-btn class="button" color="info" @click="goLogin" >登 陆</v-btn>
         </v-flex>
       </v-container>
     </v-form>
   </div>
  </div>
</template>
<script>
  import Axios from "axios";
  import storage from '~~/plugins/storage';
  export default {
    // 页面切换动画
    transition:"transleft",
      // 加载动画
    asyncData() {
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve({})
        },400)
      })
    },
    name: 'Login',
    components: {
        
    },
    data () {
      return {
        valid: false,
        username:"",
        password:"",
        nameRules: [
          v => !!v || '用户名不能为空',
          v => v.length <= 12 || '用户名不能大于6个字符'
        ],
        passwordRules: [
          v => !!v || '密码不能为空',
          v => v.length <= 10 || '密码在10个字符以内'
        ],
      }
    },
    methods:{
      goLogin(){
        const _this = this;
        if (_this.username === "" || _this.username===null){
          this.$message('用户名不能为空');
        } else if( _this.password === "" || _this.password===null) {
          this.$message('请输入密码');
        } else if( _this.password.length<6 ){
          this.$message('密码在6-12位英文数字之间');
        } else {
          //把用户名  密码统一存在_param里面  把_param提交到后台
          const _param = new URLSearchParams();
                _param.append("username",_this.username);
                _param.append("pwd",_this.password);
          const Api = window.g.login;
          Axios.post(Api,_param).then((res)=>{
            console.log(res); 
            if (res.status === 200){
                const code = res.data.code;
                if ( code === 200){
                  //将数据存在store
                  // _this.$store.commit('login',res.data.data);
                  //获取store里面的数据
                  // _this.list=this.$store.state.user;
                  // _this.$store.dispatch('toggleFollowPerson',{userId:this.user.userid})
                  //将数据存在storage
                  storage.set("user",res.data.data);
                  _this.$router.push({path:'/home/home'});
                } else if( code === "0"){
                  this.$message(res.data.msg);
                }else if ( code === "2") {
                  this.$message(res.data.msg);
                }else {
                  this.$message(res.data.msg);
                }
            } else{
              this.$message(res.data.msg);
            }
          },(err)=>{
            console.log(err)
          })
        }
      },
      submit() {
        //判断是否按下了回车
        this.goLogin();
      },
      //判断用户是否登录
      usermif(){
        const username = storage.get("user");
        if(username=== "" || username === undefined || username === null){
           this.$router.push({path:'/'})
        }else{
           this.$router.push({path:'/home/home'})
        }
      }
    },
    mounted(){
      this.usermif()
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .hello
    background #1f2d3d
    position absolute
    height 100%
    width 100%
  .content
    width 500px
    height 350px
    padding 3%
    border-radius 5px
    background-color #FFFFFF
    box-shadow 10px 20px 30px #ffffff24
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    & h2
      text-align center
      color #292929
      font-weight bold
      font-size 18px
  .button
   background-color #292929 !important
   margin 0px
   width 100%
   margin-top 9%
   height 45px
  .content .v-form
   width 100%
</style>

 