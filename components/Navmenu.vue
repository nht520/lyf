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
            <nuxt-link to="/home/home" tag="li">
              <v-icon>home</v-icon>
              <span>首页</span>
            </nuxt-link>
          </el-menu-item>
          <el-submenu v-for="item in list" :key="item.id" :index="item.id">
            <template slot="title">
              <v-icon>{{item.icon}}</v-icon>
              <span>{{item.title}}</span>
            </template>
            <el-submenu v-for="v in item.twolist" :key="v.id" :index="v.id">
              <template slot="title">
                <v-icon>{{v.icon}}</v-icon>
                <span>{{v.title}}</span>
              </template>
              <el-menu-item-group v-for="t in v.threelist" :key="t.id">
                <el-menu-item index="2-1" @click="linkrmb(t)">
                  <nuxt-link
                    :to="t.path"
                    tag="li"
                  >{{t.title}}
                  </nuxt-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import storage from '~/plugins/storage.js';

  export default {
    data() {
      return {
        list: [
          {
            id: "m",
            icon: "date_range",
            title: "漫画管理",
            twolist: [
              {
                id: "m1",
                icon: "supervisor_account",
                title: "渠道管理",
                threelist: [
                  {
                    id:"m1-0",
                    icon: "back",
                    title: "渠道管理",
                    path: "/home/ditch"
                  },
                  {
                    id: "m1-1",
                    icon: "backqww",
                    title: "包管理",
                    path: "/home/convention"
                  },
                ]
              },
              {
                id: "m2",
                icon: "dns",
                title: "通道管理",
                threelist: [
                  {
                    id: "m2-0",
                    icon: "backqww",
                    title: "通道接口",
                    path: "/home/chanlinterface"
                  },
                ]
              },
              {
                id: "m3",
                icon: "assessment",
                title: "漫画订单统计",
                threelist: [
                  {
                    id: "m3-0",
                    icon: "back",
                    title: "成功订单",
                    path: "/home/successOrder"
                  },
                  {
                    id:"m3-1",
                    icon: "back",
                    title: "未支付订单",
                    path: "/home/noPayOrder"
                  },

                ]
              },
              {
                id: "m4",
                icon: "el-icon-s-opportunity",
                title: "漫画资源",
                threelist: [
                  {
                    id: "m4-0",
                    icon: "back",
                    title: "漫画资源",
                    path: "/home/cartoonResource"
                  },
                ]
              },
              {
                id: "m5",
                icon: "el-icon-s-finance",
                title: "会员管理",
                threelist: [
                  {
                    id: "m5-0",
                    icon: "back",
                    title: "会员管理",
                    path: "/home/memberList"
                  },
                ]
              },
              {
                id: "m6",
                icon: "shopping_basket",
                title: "漫画结算管理",
                threelist: [
                  {
                    id: "m6-0",
                    icon: "backqww",
                    title: "渠道结算",
                    path: "/home/channelSettlement"
                  },
                ]
              },
              {
                id: "m7",
                icon: "el-icon-s-tools",
                title: "漫画设置",
                threelist: [
                  {
                    id: "m7-0",
                    icon: "backqww",
                    title: "支付设置",
                    path: "/home/paySetting"
                  },
                  {
                    id: "m7-1",
                    icon: "backqww",
                    title: "资源cdn设置",
                    path: "/home/cdnsetting"
                  },
                  {
                    id: "m7-2",
                    icon: "backqww",
                    title: "支付模式App",
                    path: "/home/payModelApp"
                  },
                  {
                    id:"m7-3",
                    icon: "backqww",
                    title: "支付模式H5",
                    path: "/home/payModelH5"
                  },
                ]
              },
              {
                id: "m8",
                icon: "assessment",
                title: "漫画统计",
                threelist: [
                  {
                    id: "m8-0",
                    icon: "back",
                    title: "每日统计",
                    path: "/home/simplehistorystatistics"
                  },
                  {
                    id: "m8-1",
                    icon: "back",
                    title: "上游统计",
                    path: "/home/daywaystatics"
                  },
                  {
                    id: "m8-2",
                    icon: "back",
                    title: "会员情况分析",
                    path: "/home/memberSituation"
                  },
                  {
                    id: "m8-3",
                    icon: "back",
                    title: "注册用户留存分析",
                    path: "/home/registerMemberRetain"
                  },
                  {
                    id: "m8-4",
                    icon: "back",
                    title: "每日时段统计",
                    path: "/home/dayTimeInterval"
                  },
                  {
                    id: "m8-5",
                    icon: "back",
                    title: "汇总统计",
                    path: "/home/summaryStatistics"
                  },
                ]
              },
              {
                id:"m9",
                icon: "date_range",
                title: "日志管理",
                threelist: [
                  {
                    id: "m9-0",
                    icon: "back",
                    title: "通道日志",
                    path: "/home/Channellogport"
                  },
                ]
              },
            ]
          },
          {
            id: "s",
            icon: "date_range",
            title: "视频管理",
            twolist: [
              {
                id: "s0",
                icon: "supervisor_account",
                title: "渠道管理",
                threelist: [
                  {
                    id: "s0-0",
                    icon: "back",
                    title: "渠道管理",
                    path: "/video/ditch"
                  },
                  {
                    id: "s0-1",
                    icon: "backqww",
                    title: "包管理",
                    path: "/video/convention"
                  },
                ]
              },
              {
                id: "s1",
                icon: "supervisor_account",
                title: "通道管理",
                threelist: [
                  {
                    id: "s1-0",
                    icon: "back",
                    title: "通道管理",
                    path: "/video/chanlinterface"
                  },
                ]
              },
              {
                id: "s2",
                icon: "assessment",
                title: "视频订单统计",
                threelist: [
                  {
                    id: "s2-0",
                    icon: "back",
                    title: "成功订单",
                    path: "/video/successOrder"
                  },
                  {
                    id:"s2-1",
                    icon: "back",
                    title: "未支付订单",
                    path: "/video/noPayOrder"
                  },

                ]
              },
              {
                id: "s3",
                icon: "shopping_basket",
                title: "视频结算管理",
                threelist: [
                  {
                    id: "s3-0",
                    icon: "backqww",
                    title: "渠道结算",
                    path: "/video/channelSettlement"
                  },
                ]
              },
              {
                id: "s4",
                icon: "assessment",
                title: "视频统计",
                threelist: [
                  {
                    id: "s4-0",
                    icon: "back",
                    title: "每日统计",
                    path: "/video/simplehistorystatistics"
                  },
                  {
                    id: "s4-1",
                    icon: "back",
                    title: "上游统计",
                    path: "/video/daywaystatics"
                  },
                  // {
                  //   id: "s4-4",
                  //   icon: "back",
                  //   title: "每日时段统计",
                  //   path: "/home/dayTimeInterval"
                  // },
                  {
                    id: "s4-5",
                    icon: "back",
                    title: "汇总统计",
                    path: "/video/summaryStatistics"
                  },
                ]
              },
            ]
          },
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
      linkrmb(v) {
        storage.set("linktxt", v.title);
      }
    }
  }
</script>

<style lang="stylus">
  .el-menu-item.is-active
    color #303133

  .nuxt-link-active
    color #409eff

  .el-menu
    border-right 0px

  .v-toolbar
    box-shadow 0 2px 4px -1px rgba(199, 203, 255, 0.2), 0 4px 5px 0 rgba(221, 228, 255, 0.14), 0 1px 10px 0 rgba(206, 207, 255, 0.12)

  .v-btn .v-btn__content .v-icon
    color #409EFF !important

  .theme--light.v-icon
    font-size: 1.2rem;

  .hidden-sm-and-down
    color #303133

  .hidden-sm
    color #409EFF

  .v-content
    background #f5f1fc

  .theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border
    background-color: rgba(254, 254, 254, 0.12)
    box-shadow 0 2px 4px -1px rgba(199, 203, 255, 0.2), 0 4px 5px 0 rgba(221, 228, 255, 0.14), 0 1px 10px 0 rgba(206, 207, 255, 0.12);
    -webkit-box-shadow 0 2px 4px -1px rgba(199, 203, 255, 0.2), 0 4px 5px 0 rgba(221, 228, 255, 0.14), 0 1px 10px 0 rgba(206, 207, 255, 0.12);
</style>

