<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <el-row class="search" :model="form" :gutter="15">
        <el-col :span="4" :xs="9">
          <el-date-picker type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期" v-model="form.date1" style="width: 100%;" size="small"></el-date-picker>
        </el-col>
        <el-col :span="4"  :xs="9">
          <el-date-picker type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期" v-model="form.date2" style="width: 100%;" size="small"></el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" size="small" @click="seekdithc()" plain>搜索</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="list"
        :summary-method="getSummaries"
        show-summary
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionRowsChange" >
        <el-table-column
          prop="applyTime"
          label="申请日期">
        </el-table-column>
        <el-table-column
          label="商户编号"
          prop="channelNo"
        >
        </el-table-column>
        <el-table-column
          label="结算金额"
          prop="settlementAmount"
        >
        </el-table-column>
        <el-table-column
          prop="serviceCharge"
          label="手续费">
        </el-table-column>
        <el-table-column
          label="到账金额"
          prop="amountOnAccount"
        >
        </el-table-column>
        <el-table-column
          label="银行名称"
          prop="merchantBank"
        >
        </el-table-column>
        <el-table-column
          label="支行名称"
          prop="merchantBranch"
        >
        </el-table-column>
        <el-table-column
          label="银行卡号"
          prop="merchantBankAccount"
        >
        </el-table-column>
        <el-table-column
          label="所属省"
          prop="merchantBankCity"
        >
        </el-table-column>
        <el-table-column
          label="所属市"
          prop="merchantBankProvince"
        >
        </el-table-column>
        <el-table-column
          label="处理时间"
          prop="handleTime"
        >
        </el-table-column>
<!--        <el-table-column-->
<!--          label="状态"-->
<!--          prop="settlementStatus"-->
<!--        >-->
<!--        </el-table-column>-->

        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.settlementStatus === 0 ">未结算</div>
            <div v-else-if="scope.row.settlementStatus === 1">已结算</div>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.settlementStatus === 0 ">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="openDiagnosis(scope.row)"
            >结算</el-button>
            </div>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分业 -->
      <el-row class="Pagination">
        <el-col >
          <!-- <el-button @click="toggleSelect(list)" size="mini">全选/反选</el-button>
          <el-button  size="mini">保存权重</el-button>
          <el-button type="danger" size="mini" @click="qxDete" >删除</el-button> -->
        </el-col>
        <el-col :span="14" >
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
<!--    弹出层-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="channe">
        <el-row :gutter="20">
          <el-col :span="5" :offset="1">
            手续费:
          </el-col>
          <el-col :span="17">
            <el-input v-model="serviceCharge" placeholder="请输入手续费"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1">
            到账金额:
          </el-col>
          <el-col :span="17">
            <el-input v-model="amountOnAccount" placeholder="请输入到账金额"></el-input>
          </el-col>
        </el-row>

      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose()">取 消</el-button>
    <el-button type="primary" @click="settment()">确 定</el-button>
  </span>
    </el-dialog>
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
        txtone:"漫画渠道结算",
        txtTwo:"",
        dialogVisible: false,
        hedTitle:"",
        text:"",
        form: {
          date1:"",
          date2:"",
        },
        settmentId:'',
        amountOnAccount:0,
        serviceCharge:0,
        currentPage1: 4,
        list: [ ],
        requestCountTotal:0,
        payCountTotal:0,
        payAmount:0,
        revenue:0,
        current: 0,
        brtotal:0,
        newMemberTotal:0,
        successRevenue:0,
        Ap:0,
        search: ''
      }
    },
    methods:{
      openDiagnosis(row){
        this.settmentId = row.id;
        this.serviceCharge = row.serviceCharge;
        this.amountOnAccount = row.settlementAmount;
        this.dialogVisible = true;
      },
      //弹出层
      handleClose(done) {
        this.settmentId ='';
        this.serviceCharge ='';
        this.amountOnAccount = '';
        this.dialogVisible = false;

        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});

      },
      // 结算
      settment() {
        const api = window.g.bookChannelSettlement+'/channelSettlement'
        let param = new URLSearchParams();
        param.append("id",this.settmentId);
        param.append("serviceCharge",this.serviceCharge);
        param.append("amountOnAccount",this.amountOnAccount);
        Axios.post(api,param).then((res)=>{
          console.log(res);
          this.getData();
        }).catch((err)=>{
          console.log(err);
        })
        this.dialogVisible = false;
        // console.log(e);
        // this.$refs.settement.open();
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          };
          if(index===1){
            sums[index]='';
            return;
          }
          if(index===7){
            sums[index]='';
            return;
          }
          if(index===8){
            sums[index]='';
            return;
          }
          if(index===9){
            sums[index]='';
            return;
          }
          if(index===10){
            sums[index]='';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '';
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      onSubmit() {
        console.log('submit!');
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
      //全选
      toggleSelect(rows) {
        console.log(rows);
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //获取全选的key
      selectionRowsChange(val){
        console.log(val);
      },
      //删除当前一行
      deleteRow(index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除选中数据
      qxDete(){
        console.log("删除选中数据");
      },
      //   搜索
      seekdithc(){
        console.log(this.form.date1 + this.form.date2);
        this.getData();
      },
      // 获取列表数据
      getData(){
        let _this = this;
        let api = window.g.bookChannelSettlement;
        const date ={
          params:{
            current:this.number,
            size:this.present,
            startTime:this.form.date1,
            endTime:this.form.date2,
          }
        }
        Axios.get(api,date).then(function(res){
          let data = res.data.records;
          console.log(res);
          _this.list = [];
          _this.brtotal = res.data.total;
          _this.current = res.data.current;
          for(let i =0; i<data.length; i++){
            let jsonArray =  _this.nullChangeZero(data[i]);
            _this.list.push(jsonArray);
          }
        }).catch(function(err){
          console.log(err);
        });
      },
      nullChangeZero:function(data){
        let json = {};
        for(let item in data){
          if(data[item]==null || data[item]=='null' || data[item]==undefined || data[item]=='undefined'){
            json[item] = 0;
          }else{
            json[item] =data[item];
          }
        }
        return json;
      },
      getParams:function(){

      },
    },
    mounted(){
      this.getData();
      this.txtTwo = storage.get("linktxt")
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
