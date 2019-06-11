<template>
    <div class="channel">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="*服务商名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*服务商标识">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*接入凭证模版">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*权重">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" plain>保存</el-button>
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
            txtone:"通道类型",
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
