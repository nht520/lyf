<template>
    <div class="channel">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" >
         <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="服务商">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option v-for="item in form.regionone" key="index" :label="item" :value="item" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="*通道名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="*支付类型">
              <el-radio-group v-model="form.resource">
                <el-radio label="支付宝"></el-radio>
                <el-radio label="微信"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否APP">
              <el-radio-group v-model="form.resource">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="通道模式">
              <el-radio-group v-model="form.resource">
                <el-radio label="WAP"></el-radio>
                <el-radio label="SCAN"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="*产品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="通道费率">
                <el-input placeholder="请输入内容" v-model="form.region">
                    <template slot="append">单</template>
                </el-input>
            </el-form-item>
            <el-form-item label="*网关地址">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="*同步通知地址">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="*异步通知地址">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="单笔限额模式">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option v-for="item in form.regionone" key="index" :label="item" :value="item" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单笔最小金额">
                <el-input placeholder="请输入内容" v-model="form.region">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="单笔最大金额">
                <el-input placeholder="请输入内容" v-model="form.region">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="*限量状态">
              <el-radio-group v-model="form.resource">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="通道闲置时间">
              <el-radio-group v-model="form.resource">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="通道支持属性">
              <el-radio-group v-model="form.resource">
                <el-radio label="全局支持"></el-radio>
                <el-radio label="专用支持"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="*优先级">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="访问上游">
              <el-radio-group v-model="form.resource">
                <el-radio label="间接"></el-radio>
                <el-radio label="直接"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="扫码支持">
              <el-radio-group v-model="form.resource">
                <el-radio label="未配置"></el-radio>
                <el-radio label="客户端"></el-radio>
                <el-radio label="游览器"></el-radio>   
                <el-radio label="客户端和游览器"></el-radio>        
              </el-radio-group>
            </el-form-item>
            <el-form-item label="*权重">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form.resource">
                <el-radio label="开启"></el-radio>
                <el-radio label="关闭"></el-radio>
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
        </el-col>
      </el-row>
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
    text-align left   
</style>
