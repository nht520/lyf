<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <el-row class="search" :model="form" :gutter="15">
        <el-col :span="3">
          <el-input v-model="memberLoginName" placeholder="请输入会员登录名"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="memberPhone" placeholder="会员手机号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" size="small" @click="getData()" plain>搜索</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table
        :data="list"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionRowsChange" >
        <el-table-column
          prop="memberCreateDate"
          label="会员注册时间">
        </el-table-column>
        <el-table-column
          label="会员手机号"
          prop="memberPhone"
        >
        </el-table-column>
        <el-table-column
          label="会员登录名"
          prop="memberLoginName"
        >
        </el-table-column>
        <el-table-column
          label="总充值金额"
          prop="rechargeAmount"
        >
        </el-table-column>
        <el-table-column
          label="总充值次数"
          prop="rechargeCount"
        >
        </el-table-column>
<!--        <el-table-column-->
<!--          label="各金额充值次数"-->
<!--          prop="vipStartTime"-->
<!--        >-->
<!--        </el-table-column>-->
        <el-table-column
          label="签到总次数"
          prop="signCount"
        >
        </el-table-column>
        <el-table-column
          label="账户剩余金币"
          prop="memberGold"
        >
        </el-table-column>
        <el-table-column
          label="总消耗金币"
          prop="consumeGold"
        >
        </el-table-column>
        <el-table-column
          label="时长"
          prop="surplusTime"
        >
        </el-table-column>
      </el-table>
      <!-- 分业 -->
      <el-row class="Pagination">
        <el-col >
          <!-- <el-button @click="toggleSelect(list)" size="mini">全选/反选</el-button>
          <el-button  size="mini">保存权重</el-button>
          <el-button type="danger" size="mini" @click="qxDete" >删除</el-button> -->
        </el-col>
        <el-col :span="14" :offset="10">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="current"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="brtotal">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>


  </div>
</template>

<script>
  import Breadcrumb from '../../components/Breadcrumb';
  import storage from '~~/plugins/storage';
  import Axios from 'axios';
  export default {
    transition:"transleft",
    components:{
      Breadcrumb
    },
    data(){
      return{
        txtone:"会员统计",
        txtTwo:"",
        form: {
          date1:"",
          date2:"",
        },
        options: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }],
        memberId:'',
        memberLoginName:'',
        memberPhone:'',
        memberPass:'',
        isVip:'',
        memberGold:'',
        startTime:'',
        endTime:'',
        dialogVisible: false,
        hedTitle:"",
        text:"",
        list: [ ],
        current: 0,
        brtotal:0,
        search: '',
      }
    },
    methods:{
      openDiagnosis(row){
        console.log(row);
        this.memberId = row.id;
        this.memberPhone = row.memberPhone;
        this.memberLoginName = row.memberLoginName;
        this.memberPass = row.memberPass;
        this.isVip = row.isVip;
        this.startTime = row.vipStartTime;
        this.endTime = row.vipEndTime;
        this.memberGold = row.memberGold;
        this.dialogVisible = true;
      },
      selectionRowsChange(val){
        console.log(val);
      },
      //弹出层
      handleClose(done) {
        this.memberId = '';
        this.memberPhone = '';
        this.memberLoginName = '';
        this.memberPass = ''
        this.isVip = '';
        this.startTime = '';
        this.endTime = '';
        this.memberGold = '';
        this.dialogVisible = false;
      },
      getData(){
        let _this = this;
        let api = window.g.bookMember+'/memberSituation';
        const date ={
          params:{
            current:this.number,
            size:this.present,
            memberPhone:this.memberPhone,
            memberLoginName:this.memberLoginName
          }
        }
        _this.list = [];
        Axios.get(api,date).then(function(res){
          let data = res.data.records;
          console.log(res);
          _this.brtotal = res.data.total;
          _this.current = res.data.current;
          _this.list = data;
          // for(let i = 0;i<data.length;i++){
          //   data[i].body = JSON.parse(data[i].body);
          //   _this.list.push(data[i]);
          // }
        }).catch(function(err){
          console.log(err);
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.present=val;
        this.getData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.number=val;
        this.getData();
      },
      update(row){
        const api = window.g.bookMember +'/update';
        let param= new URLSearchParams();
        param.append("id",this.memberId);
        param.append("memberPhone",this.memberPhone);
        param.append("memberLoginName",this.memberLoginName);
        param.append("memberPass",this.memberPass);
        param.append("memberGold",this.memberGold);
        param.append("isVip",this.isVip);
        param.append("startTime",this.startTime);
        param.append("endTime",this.endTime);

        Axios.post(api,param).then((res)=>{
          console.log(res);
          this.getData();
          this.dialogVisible = false;
        }).catch((err)=>{
          console.log(err);
        })
      },
      deleteBook(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const api = window.g.book+'/delete';
          let param= new URLSearchParams();
          param.append("bookId",row.bookId);
          Axios.post(api,param).then((res)=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch((err)=>{
            console.log(err);
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    mounted() {
      this.txtTwo = storage.get("linktxt");
      this.getData();
    }
  }
</script>

<style lang="stylus" scoped>
  .search
    padding 1% 0%
  .el-input__inner
    width 90% !important
  .convention
    background #ffffff
    padding 1%
  .convention .el-form
    margin 2% 4%
    width 50%
    text-align left
  .Pagination
    margin-top 1%
  .channe .el-row
    margin-bottom 3%
</style>

