<template>
  <div class="additch">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="second">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12">
            <el-form ref="form" :model="form" label-width="150px">
              <el-form-item label="*渠道编号">
                <el-input v-model="form.chantno"></el-input>
              </el-form-item>
              <el-form-item label="*用户名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="*密码">
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="*状态">
                <el-switch
                  v-model="form.status"
                  active-color="#13ce66"
                  inactive-color="#dddddd">
                </el-switch>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.eremark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="addditch()" plain>立即创建</el-button>
                <el-button size="mini">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="银行信息" name="first">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12">
            <el-form ref="form" :model="form" label-width="150px">
              <el-form-item label="*开户银行">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="*收款人">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="*银行账号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="*银行地址">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="addditch()" plain>立即创建</el-button>
                <el-button size="mini">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Breadcrumb from '../../components/Breadcrumb';
  import storage from '~~/plugins/storage';
  import Axios from 'axios';

  export default {
    components: {
      Breadcrumb
    },
    data() {
      return {
        activeName: 'second',
        txtone: "渠道管理",
        txtTwo: "添加渠道",
        form: {
          id: '',
          name: '',
          password: "",
          chantno: "",
          eremark: "",
          status:true,
          region: '',
          regionone: ["1", "2", "3"],
          date1: '',
          date2: '',
          delivery: false,
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log(this.form);
      },
      addditch() {
        let api = window.g.merchant;
        let _params = new URLSearchParams();
        if (this.form.id != '') {
          api = api + '/update';
          console.log(this.form.id);
          _params.append("id",this.form.id);
        }
        let status = 0;
        if(!this.form.status){
          status = 1;
        }
        _params.append("spMerchantStatus",status);
        _params.append("spMerchantNo",this.form.chantno);
        _params.append("spMerchantLoginName", this.form.name);
        _params.append("spMerchantLoginPass", this.form.password);
        _params.append("spRemark", this.form.eremark);
        Axios.post(api, _params).then((res) => {
          console.log(res);
          alert("操作成功");
        }).catch((err) => {
          console.log(err)
        })
      },
      getDitchById(){
        const api = window.g.merchant+'/findById';
        let _param = {
          params:{
            id:this.form.id,
          }
        };
        Axios.get(api,_param).then((res)=>{
          console.log("byid======");
          console.log(res);
          const data = res.data.data;
          this.form.id = data.id;
          this.form.name = data.spMerchantLoginName;
          this.form.chantno = data.spMerchantNo;
          this.form.status = true;
          if(data.spMerchantStatus!=0){
            this.form.status = false;
          }
          this.form.eremark = data.spRemark;
        }).catch((err)=>{
          console.log(err);
        })
      },
    },

    mounted() {
      const id = this.$route.query.id;
      const _this = this;
      if (id != undefined) {
        this.form.id = id;
        _this.getDitchById();
      }
      console.log(this.$route.query.id);
    }
  }
</script>

<style lang="stylus" scoped>
  .additch
    background #ffffff
    padding 1%

  .additch .el-tabs
    margin-top 1%

  .additch .el-form
    margin 2% 4%
    text-align left
</style>

