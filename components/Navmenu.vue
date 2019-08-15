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
                // {
                //     id:0,
                //     icon:"settings",
                //     title:"常规设置",
                //     twolist:[
                //         {
                //             id:0,
                //             icon:"back",
                //             title:"系统设置",
                //             path:"/home/channel"
                //         },
                //         {
                //             id:1,
                //             icon:"backqww",
                //             title:"PSA配置",
                //             path:"/home/psadeploy"
                //         },
                //         {
                //             id:2,
                //             icon:"backqww",
                //             title:"前端配置",
                //             path:"/home/leading"
                //         }
                //     ]
                // },
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
                },
                {
                    id:2,
                    icon:"dns",
                    title:"通道管理",
                    twolist:[
                        // {
                        //     id:0,
                        //     icon:"back",
                        //     title:"通道类型",
                        //     path:"/home/chanlintype"
                        // },
                        {
                            id:0,
                            icon:"backqww",
                            title:"通道接口",
                            path:"/home/chanlinterface"
                        },
                    ]
                },
              {
                id:3,
                icon:"assessment",
                title:"订单统计",
                twolist:[
                  {
                    id:0,
                    icon:"back",
                    title:"成功订单",
                    path:"/home/successOrder"
                  },
                  {
                    id:1,
                    icon:"back",
                    title:"未支付订单",
                    path:"/home/noPayOrder"
                  },

                ]
              },
              {
                id:4,
                icon:"assessment",
                title:"漫画资源",
                twolist:[
                  {
                    id:0,
                    icon:"back",
                    title:"漫画资源",
                    path:"/home/cartoonResource"
                  },
                ]
              },
              {
                id:5,
                icon:"assessment",
                title:"会员管理",
                twolist:[
                  {
                    id:0,
                    icon:"back",
                    title:"会员管理",
                    path:"/home/memberList"
                  },
                ]
              },
              {
                id:6,
                icon:"shopping_basket",
                title:"结算管理",
                twolist:[
                  {
                    id:1,
                    icon:"backqww",
                    title:"渠道结算",
                    path:"/home/channelSettlement"
                  },
                ]
              },
              {
                id:7,
                icon:"shopping_basket",
                title:"设置",
                twolist:[
                  {
                    id:1,
                    icon:"backqww",
                    title:"支付设置",
                    path:"/home/paySetting"
                  },
                ]
              },
              {
                id:8,
                icon:"assessment",
                title:"漫画统计",
                twolist:[
                  {
                    id:0,
                    icon:"back",
                    title:"每日统计",
                    path:"/home/simplehistorystatistics"
                  },
                  {
                    id:1,
                    icon:"back",
                    title:"会员情况分析",
                    path:"/home/memberSituation"
                  },
                  {
                    id:2,
                    icon:"back",
                    title:"注册用户留存分析",
                    path:"/home/registerMemberRetain"
                  },
                  {
                    id:3,
                    icon:"back",
                    title:"每日时段统计",
                    path:"/home/dayTimeInterval"
                  },
                  {
                    id:4,
                    icon:"back",
                    title:"汇总统计",
                    path:"/home/summaryStatistics"
                  },
                ]
              },

                // {
                //     id:7,
                //     icon:"date_range",
                //     title:"日志管理",
                //     twolist:[
                //         {
                //             id:0,
                //             icon:"back",
                //             title:"通道日志[接口]",
                //             path:"/home/Channellogport"
                //         },
                //         {
                //             id:1,
                //             icon:"backqww",
                //             title:"通讯日志[渠道]",
                //             path:"/home/Channellogditch"
                //         },
                //         {
                //             id:2,
                //             icon:"backqww",
                //             title:"登录日志[用户]",
                //             path:"/home/Logontologuser"
                //         },
                //         {
                //             id:3,
                //             icon:"backqww",
                //             title:"登录日志[管理员]",
                //             path:"/home/Logontologadmin"
                //         },
                //         {
                //             id:4,
                //             icon:"backqww",
                //             title:"操作日志[用户]",
                //             path:"/home/operationloguser"
                //         },
                //         {
                //             id:5,
                //             icon:"backqww",
                //             title:"操作日志[管理员]",
                //             path:"/home/operationlogadmin"
                //         },
                //         {
                //             id:6,
                //             icon:"backqww",
                //             title:"操作日志[系统]",
                //             path:"/home/errorlogsystem"
                //         },
                //     ]
                // },
                // {
                //     id:8,
                //     icon:"bubble_chart",
                //     title:"系统管理",
                //     twolist:[
                //         {
                //             id:0,
                //             icon:"back",
                //             title:"系统菜单",
                //             path:"/home/systemmenu"
                //         },
                //         {
                //             id:1,
                //             icon:"backqww",
                //             title:"操作菜单",
                //             path:"/home/"
                //         },
                //         {
                //             id:2,
                //             icon:"backqww",
                //             title:"用户管理",
                //             path:"/home/usermanage"
                //         },
                //         {
                //             id:3,
                //             icon:"backqww",
                //             title:"角色管理",
                //             path:"/home/roleadmin"
                //         },
                //         {
                //             id:4,
                //             icon:"backqww",
                //             title:"部门管理",
                //             path:"/home/sectionmanage"
                //         },
                //     ]
                // },
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

