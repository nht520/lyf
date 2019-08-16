<template>
    <div class="channel">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" >
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="*包编号">
            <el-input v-model="form.packageNo"></el-input>
          </el-form-item>
          <el-form-item label="所属渠道">
            <el-select v-model="form.merchantNo" filterable placeholder="请选择所属渠道">
              <el-option v-for="(item,idx) in form.regionone" :key="idx" :label="item.spMerchantLoginName" :value="idx" ></el-option>
            </el-select>
          </el-form-item>
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
                  <template slot="append">元</template>
              </el-input>
          </el-form-item>
          <el-form-item label="扣量比列">
              <el-input placeholder="请输入内容" v-model="form.deductionRatio">
                  <template slot="append">%</template>
              </el-input>
          </el-form-item>
          <el-form-item label="扣量时间">
            <el-date-picker
              v-model="form.deductionTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd 00:00:00"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.packageRemark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="addconvention()" plain>添加</el-button>
            <el-button size="mini">取消</el-button>
          </el-form-item>
        </el-form>
        </el-col>
      </el-row>
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
              id:'',
              name: '',
              region: '',
              regionone:[],
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: '',
              deductionTime:'',
              merchantNo:'',
            }
        }
    },
    methods:{
      onSubmit() {
        console.log(this.form);
      },
      addconvention(){
        let api = window.g.productPackage;
        let _this = this;
        let _param = new URLSearchParams();
        if(_this.form.id!=''){
          api = api+'/update';
          _param.append("id",_this.form.id);
        }
        let merchant = _this.form.regionone[_this.form.merchantNo];
        let deductionStatus = _this.form.deductionStatus;
        if(deductionStatus=='是'){
          deductionStatus = 0;
        }else{
          deductionStatus=1;
        }
        let packageStatus = 0;
        if(merchant){
          _param.append("merchantId",merchant.id);
          _param.append("merchantNo",merchant.spMerchantNo);//渠道编号
          _param.append("merchantLoginName",merchant.spMerchantLoginName);//渠道账号

        }
          _param.append("packageNo",_this.form.packageNo);//包编号
          _param.append("deductionStatus",deductionStatus);//扣量状态
          _param.append("deductionBase",_this.form.deductionBase);//扣量基数
          _param.append("deductionRatio",_this.form.deductionRatio);//扣量比例
          _param.append("pageUrl",_this.form.pageUrl);//落地页地址
          _param.append("packageUrl",_this.form.packageUrl);//包下载地址
          _param.append("packageRemark",_this.form.packageRemark);//备注
          _param.append("packageStatus",packageStatus);//安装包状态
        _param.append("kouTime",this.form.deductionTime);
        Axios.post(api,_param).then((res)=>{
          console.log(res);
          if(res.data.code === 200){
              this.$message({
                  message: '操作成功',
                  type: 'success'
              });
            this.$router.push({path:'/home/convention'})
          }
        }).catch((err)=>{
          console.log(err)
        })
      },
      getConventionById(){
        const api = window.g.productPackage+'/findById';
        let _param = {
          params:{
            id:this.form.id,
          }
        };
        Axios.get(api,_param).then((res)=>{
          console.log(res);
          const data = res.data.data;
          this.form.id = data.id;
          this.form.merchantNo = data.merchantNo;
          this.form.packageNo = data.packageNo;
          this.form.deductionBase = data.deductionBase;
          this.form.deductionRatio = data.deductionRatio;
          this.form.pageUrl = data.pageUrl;
          this.form.packageUrl = data.packageUrl;
          let deductionStatus = data.deductionStatus; ;
          if(deductionStatus==0){
            _this.form.deductionStatus = '是';
          }else{
            _this.form.deductionStatus = '否';
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      //得到包
      searchChannel(){
        let _this = this;
        let url = window.g.merchant;
        Axios.get(url+'/findAll').then(function(value){
          console.log(value);
          _this.form.regionone = value.data.data;
          console.log(_this.regionone);
          _this.getConventionById();

        }).catch(function(res){
          console.log(res);
        });
      }
    },
    mounted(){
      this.searchChannel();
      this.txtTwo = storage.get("linktxt")
      const id = this.$route.query.id;
      if (id != undefined) {
        this.form.id = id;

      }
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
