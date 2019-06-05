<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-menu-item index="1">
                        <nuxt-link to="/home/home" tag="li" >
                            <v-icon>home</v-icon>
                            <span>首页</span>
                        </nuxt-link>
                    </el-menu-item>
                    <el-submenu v-for="item in list" :key="item.id" :index="String(item.id)" >
                        <template slot="title">
                            <v-icon>{{item.icon}}</v-icon>
                            <span>{{item.title}}</span>
                        </template>
                       <el-menu-item-group v-for="v in item.twolist" :key="v.id" >
                            <el-menu-item index="1-1" @click="linkrmb(v)">
                                 <nuxt-link 
                                 :to="v.path"
                                 tag="li" 
                                 >{{v.title}}</nuxt-link> 
                            </el-menu-item>
                       </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import storage from '~/plugins/storage.js';
export default {
    data(){
        return{
            list:[
                {
                    id:0,
                    icon:"settings",
                    title:"常规设置",
                    twolist:[
                        {
                            id:0,
                            icon:"back",
                            title:"系统设置",
                            path:"/home/channel"
                        },
                        {
                            id:1,
                            icon:"backqww",
                            title:"PSA配置",
                            path:"/home/convention"
                        },
                        {
                            id:2,
                            icon:"backqww",
                            title:"前端配置",
                            path:"/home/leading"
                        }
                    ]
                },
                {
                    id:1,
                    icon:"supervisor_account",
                    title:"渠道管理",
                    twolist:[
                        {
                            id:0,
                            icon:"back",
                            title:"渠道管理",
                            path:"/home/ditch"
                        },
                        {
                            id:1,
                            icon:"backqww",
                            title:"包管理",
                            path:"/home/convention"
                        },
                    ]
                }
            ]
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      linkrmb(v){
          storage.set("linktxt",v.title);
      }
    }
}
</script>

<style lang="stylus" >
.el-menu-item.is-active
 color #303133
.nuxt-link-active
 color #409eff
.el-menu
 border-right 0px 
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
.theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border
 background-color: rgba(254, 254, 254, 0.12)
 box-shadow 0 2px 4px -1px rgba(199,203,255,0.2), 0 4px 5px 0 rgba(221,228,255,0.14), 0 1px 10px 0 rgba(206,207,255,0.12);
 -webkit-box-shadow 0 2px 4px -1px rgba(199,203,255,0.2), 0 4px 5px 0 rgba(221,228,255,0.14), 0 1px 10px 0 rgba(206,207,255,0.12);
</style>

