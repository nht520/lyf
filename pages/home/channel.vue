<template>
    <div class="channel">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="*管理系统标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*管理系统域名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*渠道系统标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*渠道系统域名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*系统操作密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*反向代理服务器IP">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*SOCKET通讯网关">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*SOCKET通讯端口">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="8">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="8">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option v-for="item in form.regionone" :label="item" :value="item" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*订单预支付开启状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="订单预支付">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <!--  -->
      
      <!--  -->
    </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb'; 
import storage from '~~/plugins/storage';
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
              name: '',
              region: '',
              regionone:["1","2","3"],
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            }
        }
    },
    methods:{
      onSubmit() {
        console.log(this.form);
      }
    },
    mounted(){
      this.txtTwo = storage.get("linktxt")
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
    width 50%
    text-align left   
</style>
