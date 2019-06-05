<template>
    <div class="leading">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="*扣量开关">
          <el-switch
            v-model="form.value"
            active-color="#13ce66"
            inactive-color="#dddddd">
          </el-switch>
        </el-form-item>
        <el-form-item label="*扣量基数">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*扣量比列">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*金额区间">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*图片域名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*媒体域名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*限制转移包（APP）">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*闲置转移包（h5）">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*落地页模版">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*APK下载模版">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*H5网页模版">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*包升级开关">
          <el-switch
            v-model="form.value"
            active-color="#13ce66"
            inactive-color="#dddddd">
          </el-switch>
        </el-form-item>
        <el-form-item label="*升级包签名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
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
              value:false,
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
  .leading
    background #ffffff
    padding 1%
    min-height 800px
  .leading .el-form
    margin 2% 4%
    width 50%
    text-align left  
</style>
