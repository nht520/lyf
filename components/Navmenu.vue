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

<style lang="stylus" scoped>
.el-menu-item.is-active
 color #303133
.nuxt-link-active
 color #409eff
.el-menu
 border-right 0px 
.v-navigation-drawer__border
 background-color white !important
.v-navigation-drawer__border
 background-color #f00 !important
</style>

