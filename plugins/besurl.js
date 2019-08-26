// const api = "http://wx.bomao.xyz:8181/distributor";
const api = "http://47.75.163.229:9999";
// const api = "http://192.168.1.7:9999";
window.g = {
    AXIOS_TIMEOUT: 10000,
    login:api+"/login",
  channel:api+'/sysConfig',
    // 前端配置
    webConfig:api+"/webConfig",
    // 渠道管理
    merchant:api+'/merchant',
    merchantdelete:api+'/merchant/delete',
  //通道
  chanlinterface:api+'/way',
    // 包管理
    productPackage:api+'/productPackage',

   book:api+'/book',
   bookMember:api+'/member',
  payOrder:api+'/pay',
  bookReport:api+'/bookReport',
  paySetting:api+'/paySetting',
  cdnSetting:api+'/cdnSetting',
  payLog:api+'/payLog',
  dayway:api+'/dayWay',

  //最近3日流水
    latelyDayData:api+'/report/latelyFlowing',
//今日用户下单统计
  todayOrder:api+'/report/orderToday',
  //通道概述【日期】
   aislesummarize:api+'/report/payOverview',
  //通道概述【时段】
  aislesmtime:api+'/report/payTimerOverview',
  //流量概述【日期】
  flowsummarize:api+'/report/flowOverview',
  comicssimple:api+'/comicssimple/find',
  simplehistorystatistics:api+'/comicssimple',
  //产品概述【日期】
  productsummzrize:api+'/report/productOverview',
  //渠道概述【日期】
  channelsummzrize:api+'/report/channelOverview',
  //设备有效量
    iphonevalid:api+'/pay',
  //网页UV
    webUv:api+'/webUv',
    iphoneinstall:api+'/device',

  /**
   * 漫画渠道结算
   */
  bookChannelSettlement:api+'/bookChannelSettlement',
  //结算
  channelearnings:api+'/settlement',
  //补量
    mcMembers:api+'/distributor/mcMembers/findById',
    //我的库存
    getBoxNum:api+"/distributor/stock/getBoxNum",
    //订货订单
    stockLog:api+'/distributor/stockLog',
    //库存
    stock:api+'/distributor/stock',
    //  套餐
    meal:api+"/distributor/meal",
    mealDts:api+"/distributor/meal/findById?",

    //自己发货订单
    indent:api+"/distributor/order",
    update:api+"/distributor/order/update",
    //后台发货订单
    deliver:api+"/distributor/order/deliver",
    //分销订单
    subordinate:api+"/distributor/subordinate",
  //  经销商用户
    distname:api+"/distributor/member",
    //地址
    // 省
    getProvince:api+"/distributor/systemAddress/getProvince",
    //市province
    getCity:api+"/distributor/systemAddress/getCity",
    //区city
    getCounty:api+"/distributor/systemAddress/getCounty",
    //添加地址
    addressadd:api+"/distributor/address",
  //  查询地址邮费
    findCost:api+"/distributor/addressCost",
  //  修改地址邮费
    delupdate:api+"/distributor/addressCost/update",
  
  //  修改地址
    adsupdate:api+"/distributor/address/update",
    //查询所有会员
}
