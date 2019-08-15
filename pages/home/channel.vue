<template>
    <div class="channel">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" >
            <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="*管理系统标题">
                  <el-input v-model="form.mainTitle"></el-input>
                </el-form-item>
                <el-form-item label="*管理系统域名">
                  <el-input v-model="form.mainDomain"></el-input>
                </el-form-item>
                <el-form-item label="*渠道系统标题">
                  <el-input v-model="form.channelTitle"></el-input>
                </el-form-item>
                <el-form-item label="*渠道系统域名">
                  <el-input v-model="form.channelDomain"></el-input>
                </el-form-item>
                <el-form-item label="*系统操作密码">
                  <el-input v-model="form.sysPass"></el-input>
                </el-form-item>
                <el-form-item label="*反向代理服务器IP">
                  <el-input v-model="form.nginxIp"></el-input>
                </el-form-item>
                <el-form-item label="*SOCKET通讯网关">
                  <el-input v-model="form.socketGateway"></el-input>
                </el-form-item>
                <el-form-item label="*SOCKET通讯端口">
                  <el-input v-model="form.socketPort"></el-input>
                </el-form-item>
                <el-form-item label="*订单预支付开启状态">
                  <el-radio-group v-model="form.orderAdvanceStatus">
                    <el-radio label="开启"></el-radio>
                    <el-radio label="关闭"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="订单预支付">
                  <el-input type="textarea" v-model="form.orderAdvance"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" size="mini" plain>立即创建</el-button>
                  <el-button size="mini"> 取 消 </el-button>
                </el-form-item>
              </el-form>
        </el-col>
      </el-row>      
      <!--  -->
    </div>
</template>
<script>
import Breadcrumb from '../../components/Breadcrumb'; 
import storage from '~~/plugins/storage';
import Axios from 'axios';
export default {
    // 页面切换动画
    transition:"transleft",
    components:{
      Breadcrumb
    },
    data(){
        return{
            txtone:"常规设置",
            txtTwo:"",
            form: {
              // name: '',
              // region: '',
              // regionone:["1","2","3"],
              // date1: '',
              // date2: '',
              // delivery: false,
              // type: [],
              // resource: '',
              // desc: ''
            }
        }
    },
    methods:{
      onSubmit() {
        console.log(this.form);
        let url = window.g.channel;
        let _param = new URLSearchParams();
        _param.append("channelDomain",this.form.channelDomain);
        _param.append("channelTitle",this.form.channelTitle);
        _param.append("mainDomain",this.form.mainDomain);
        _param.append("id",this.form.id);
        _param.append("mainTitle",this.form.mainTitle);
        _param.append("nginxIp",this.form.nginxIp);
        _param.append("orderAdvance",this.form.orderAdvance);
        let orderAdvanceStatus = 1;
        if(this.form.orderAdvanceStatus=='开启'){
          orderAdvanceStatus = 0;
        }
        _param.append("orderAdvanceStatus",orderAdvanceStatus);
        _param.append("passSalt",this.form.passSalt);
        _param.append("socketGateway",this.form.socketGateway);
        _param.append("socketPort",this.form.socketPort);
        _param.append("sysPass",this.form.sysPass);
        Axios.post(url,_param).then(function(value){
          console.log(value);
        }).catch(function(res){});
      },
      getData:function(){
        let _this = this;
        let url = window.g.channel;
        Axios.get(url).then(function(value){
          // console.log(value);
          _this.form = value.data.data;
          console.log(_this.form);
        }).catch(function(res){
          console.log(res);
        });
      },
    },
    mounted(){
      this.txtTwo = storage.get("linktxt");
      this.getData();
    }
}

</script>

<style lang="stylus" scoped>
  .channel
    background #ffffff
    padding 1%
    min-height 800px
  .channel .el-form
    margin 2% 4%
    // width 50%
    text-align left   
</style>
