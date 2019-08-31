<template>
  <div>
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        :clipped="$vuetify.breakpoint.lgAndUp"
        fixed
        app
      >
        <!-- 左侧导航 -->
        <Navmenu></Navmenu>
      </v-navigation-drawer>
      <!-- 头部 -->
      <v-toolbar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        color="white darken-3"
        dark
        app
        fixed
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
          <v-btn icon  @click.stop="drawer = !drawer">
            <v-icon>apps</v-icon>
          </v-btn>
          <span class="hidden-sm-and-down">撸妞</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="userClick()">
          <v-icon>supervised_user_circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- 内容 -->
      <v-content>
        <v-container class="blcontent" fluid >
          <nuxt-child></nuxt-child>
        </v-container>
      </v-content>
    </v-app>
    <!-- 退出 -->
    <Usermenu ref="menus"></Usermenu>
  </div>
</template>

<script>
  import Navmenu from '../components/Navmenu';
  import Usermenu from '../components/Usermenu';
  import storage from '../plugins/storage';
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
    components:{
      Navmenu,Usermenu
    },
    data: () => ({
      drawer: null,
    }),
    props: {
      source: String
    },
    methods:{
      userClick(){
        this.$refs.menus.tishi();
      },
      usermif(){
        const username = storage.get("user");
        if(username=== "" || username === undefined || username === null){
          this.$router.push({path:'/'})
        }
      }
    },
    mounted(){
      this.usermif();
    }

  }
</script>
<style lang="stylus" scoped>
  .v-toolbar
    box-shadow 0 2px 4px -1px rgba(199, 203, 255, 0.2), 0 4px 5px 0 rgba(221, 228, 255, 0.14), 0 1px 10px 0 rgba(206, 207, 255, 0.12)
  .v-btn .v-btn__content .v-icon
    color  #409EFF !important
  .hidden-sm-and-down
    color #303133
  .hidden-sm
    color #409EFF
  .v-content
    background #f5f1fc
</style>


