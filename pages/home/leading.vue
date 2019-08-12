<template>
    <div class="leading">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="*扣量开关">
          <el-switch
            v-model="form.bucklone"
            active-color="#13ce66"
            inactive-color="#dddddd">
          </el-switch>
        </el-form-item>
        <el-form-item label="*扣量基数">
          <el-input v-model="form.buckleSwitch"></el-input>
        </el-form-item>
        <el-form-item label="*扣量比列">
          <el-input v-model="form.deductionBase"></el-input>
        </el-form-item>
        <el-form-item label="*金额区间">
          <el-input v-model="form.deductionRatio"></el-input>
        </el-form-item>
        <el-form-item label="*图片域名">
          <el-input v-model="form.amountInterval"></el-input>
        </el-form-item>
        <el-form-item label="*媒体域名">
          <el-input v-model="form.imageDomain"></el-input>
        </el-form-item>
        <el-form-item label="*限制转移包（APP）">
          <el-input v-model="form.videoDomain"></el-input>
        </el-form-item>
        <el-form-item label="*闲置转移包（h5）">
          <el-input v-model="form.transferApp"></el-input>
        </el-form-item>
        <el-form-item label="*落地页模版">
          <el-input v-model="form.transferWeb"></el-input>
        </el-form-item>
        <el-form-item label="*APK下载模版">
          <el-input v-model="form.landingTemplate"></el-input>
        </el-form-item>
        <el-form-item label="*H5网页模版">
          <el-input v-model="form.templateApk"></el-input>
        </el-form-item>
        <el-form-item label="*包升级开关">
          <el-switch
            v-model="form.buckltwo"
            active-color="#13ce66"
            inactive-color="#dddddd">
          </el-switch>
        </el-form-item>
        <el-form-item label="*升级包签名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" plain>立即创建</el-button>
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
            txtone:"常规设置",
            txtTwo:"",
            form: {
              buckleSwitch:"",
              deductionBase:"",
              deductionRatio:"",
              amountInterval:"",
              imageDomain:"",
              videoDomain:"",
              transferApp:"",
              transferWeb:"",
              landingTemplate:"",
              templateApk:"",
              templateWeb:"",
              packageUpgrade:"",
              packageSign:"",
              bucklone:false,
              buckltwo:false,
            }
        }
    },
    methods:{
      onSubmit() {
        // console.log(this.form);
        const _this = this;
        const url = window.g.webConfig;
        const _param = new URLSearchParams();
        let buckleSwitch = 0;
        if(!_this.form.buckleSwitch){
          buckleSwitch = 1;
        }
        let packageUpgrade = 1;
        if(!_this.form.packageUpgrade){
          packageUpgrade = 0;
        }
        _param.append("amountInterval",_this.form.amountInterval);
        _param.append("buckleSwitch",buckleSwitch);
        _param.append("deductionBase",_this.form.deductionBase);
        _param.append("deductionRatio",_this.form.deductionRatio);
        _param.append("id",_this.form.id);
        _param.append("imageDomain",_this.form.imageDomain);
        _param.append("landingTemplate",_this.form.landingTemplate);
        _param.append("packageSign",_this.form.packageSign);
        _param.append("packageUpgrade",packageUpgrade);
        _param.append("templateApk",_this.form.templateApk);
        _param.append("templateWeb",_this.form.templateWeb);
        _param.append("transferApp",_this.form.transferApp);
        _param.append("transferWeb",_this.form.transferWeb);
        _param.append("videoDomain",_this.form.videoDomain);
        Axios.post(url,_param).then(function(value){
          console.log(value);
        }).catch(function(res){
          console.log(res);
        })
      },
      webConfig(){
        const _this = this;
        const api = window.g.webConfig;
        // const params = new URLSearchParams();
        const date={
          params:{
            buckltwo:"",
            bucklone:"",
            buckleSwitch:this.present,
            deductionBase:this.number,
            deductionRatio:this.number,
            amountInterval:this.number,
            imageDomain:this.number,
            videoDomain:this.present,
            transferApp:this.number,
            transferWeb:this.number,
            landingTemplate:this.number,
            templateApk:this.number, 
            templateWeb:this.number,
            packageUpgrade:this.number,
            packageSign:this.number,           
          }
        };
        Axios.get(api).then((res)=>{
          // console.log(res.data.data)
          _this.form = res.data.data;

          console.log(_this.form);
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    mounted(){
      this.txtTwo = storage.get("linktxt");
      this.webConfig();
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
    // width 50%
    text-align left  
</style>
