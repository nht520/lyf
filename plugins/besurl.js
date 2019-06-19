// const api = "http://wx.bomao.xyz:8181/distributor";
const api = "http://192.168.3.45:9999";
window.g = {
    AXIOS_TIMEOUT: 10000,
    login:api+"/login",
    // 前端配置
    webConfig:api+"/webConfig",
    // 渠道管理
    merchant:api+'/merchant',
    merchantdelete:api+'/merchant/delete',

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