<template>
    <div class="channel">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="*包编号">
          <el-input v-model="form.packageNo"></el-input>
        </el-form-item>
        <el-form-item label="所属渠道">
          <el-select v-model="form.merchantNo" placeholder="请选择活动区域">
            <el-option v-for="(item,idx) in form.regionone" :key="idx" :label="item.spMerchantNickName" :value="idx" ></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="产品类型">-->
<!--          <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--            <el-option v-for="item in form.regionone" :key="item" :label="item" :value="item" ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="*落地页地址">
          <el-input v-model="form.pageUrl"></el-input>
        </el-form-item>
        <el-form-item label="*包下载地址">
          <el-input v-model="form.packageUrl"></el-input>
        </el-form-item>
        <el-form-item label="*扣量状态">
          <el-radio-group v-model="form.deductionStatus">
            <el-radio label="否" value="1"></el-radio>
            <el-radio label="是" value="0"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="扣量基数">
            <el-input placeholder="请输入内容" v-model="form.deductionBase">
                <template slot="append">单</template>
            </el-input>
        </el-form-item>
        <el-form-item label="扣量比列">
            <el-input placeholder="请输入内容" v-model="form.deductionRatio">
                <template slot="append">:1</template>
            </el-input>
        </el-form-item>
        <el-form-item label="安装扣量基数">
            <el-input placeholder="请输入内容" v-model="form.installDeduction">
                <template slot="append">个</template>
            </el-input>
        </el-form-item>
        <el-form-item label="安装扣量保留">
            <el-input placeholder="请输入内容" v-model="form.installRetain">
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
            <el-input placeholder="请输入内容" v-model="form.primaryChannel">
                <template slot="append">%</template>
            </el-input>
        </el-form-item>
        <el-form-item label="二级渠道结算比列">
            <el-input placeholder="请输入内容" v-model="form.twoChannel">
                <template slot="append">%</template>
            </el-input>
        </el-form-item>
        <el-form-item label="*状态">
          <el-radio-group v-model="form.packageStatus">
            <el-radio label="活动"></el-radio>
            <el-radio label="闲置"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.packageRemark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addconvention()" plain>添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
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
            txtone:"渠道管理",
            txtTwo:"添加包",
            form: {
              name: '',
              region: '',
              regionone:[],
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
      },
      addconvention(){
        const api = window.g.productPackage;
        // console.log(this.form);
        let _this = this;
        let _param = new URLSearchParams();
        let merchant = _this.form.regionone[_this.form.merchantNo];
        // console.log(merchant);
        let deductionStatus = _this.form.deductionStatus;
        if(deductionStatus=='是'){
          deductionStatus = 0;
        }else{
          deductionStatus=1;
        }
        let packageStatus = _this.form.packageStatus;
        if(packageStatus =='活动'){
          packageStatus = 0;
        }else{
          packageStatus =1;
        }
        console.log(packageStatus);
        _param.append("merchantNo",merchant.spMerchantNo);//渠道编号
        _param.append("packageNo",_this.form.packageNo);//包编号
        _param.append("merchantLoginName",merchant.spMerchantLoginName);//渠道账号
        _param.append("productType","");//产品类型
        _param.append("deductionStatus",deductionStatus);//扣量状态
        _param.append("deductionBase",_this.form.deductionBase);//扣量基数
        _param.append("deductionRatio",_this.form.deductionRatio);//扣量比例
        _param.append("primaryChannel",_this.form.primaryChannel);//一级渠道比例
        _param.append("twoChannel",_this.form.twoChannel);//二级渠道比例
        _param.append("pageUrl",_this.form.pageUrl);//落地页地址
        _param.append("packageUrl",_this.form.packageUrl);//包下载地址
        _param.append("installDeduction",_this.form.installDeduction);//安装扣量基数
        _param.append("installRetain",_this.form.installRetain);//安装扣量保留
        _param.append("packageRemark",_this.form.packageRemark);//备注
        _param.append("packageStatus",packageStatus);//安装包状态
        Axios.post(api,_param).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
      },
      //得到全部渠道
      searchChannel:function(){
        let _this = this;
        let url = window.g.merchant;
        Axios.get(url+'/findAll').then(function(value){
          console.log(value);
          _this.form.regionone = value.data.data;
          console.log(_this.regionone);
        }).catch(function(res){
          console.log(res);
        });
      }
    },
    mounted(){
      this.searchChannel();
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
