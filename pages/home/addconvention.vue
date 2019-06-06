<template>
    <div class="channel">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="*包编号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属渠道">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option v-for="item in form.regionone" :label="item" :value="item" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option v-for="item in form.regionone" :label="item" :value="item" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*落地页地址">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*包下载地址">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="*扣量状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="否"></el-radio>
            <el-radio label="是"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="扣量基数">
            <el-input placeholder="请输入内容" v-model="form.region">
                <template slot="append">单</template>
            </el-input>
        </el-form-item>
        <el-form-item label="扣量比列">
            <el-input placeholder="请输入内容" v-model="form.region">
                <template slot="append">:1</template>
            </el-input>
        </el-form-item>
        <el-form-item label="安装扣量基数">
            <el-input placeholder="请输入内容" v-model="form.region">
                <template slot="append">个</template>
            </el-input>
        </el-form-item>
        <el-form-item label="安装扣量保留">
            <el-input placeholder="请输入内容" v-model="form.region">
                <template slot="append">%</template>
            </el-input>
        </el-form-item>
        <el-form-item label="*渠道支持">
          <el-radio-group v-model="form.resource">
            <el-radio label="全局"></el-radio>
            <el-radio label="专用"></el-radio>
            <el-radio label="全局专用混合"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="一级渠道结算比列">
            <el-input placeholder="请输入内容" v-model="form.region">
                <template slot="append">%</template>
            </el-input>
        </el-form-item>
        <el-form-item label="二级渠道结算比列">
            <el-input placeholder="请输入内容" v-model="form.region">
                <template slot="append">%</template>
            </el-input>
        </el-form-item>
        <el-form-item label="*状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="活动"></el-radio>
            <el-radio label="闲置"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
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
            txtone:"渠道管理",
            txtTwo:"添加包",
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
