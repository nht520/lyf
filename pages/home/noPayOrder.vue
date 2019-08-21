<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <el-row class="search" :model="form" :gutter="15">
        <el-col :span="2" :xs="12">
          <el-input v-model="memberLoginName" size="mini" placeholder="请输入会员登录名"></el-input>
        </el-col>
        <el-col :span="2" :xs="12">
          <el-input v-model="memberPhone"  size="mini" placeholder="会员手机号"></el-input>
        </el-col>
        <el-col :span="3" :xs="9">
          <el-date-picker
            v-model="startTime"
            type="datetime"
            size="mini"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3" :xs="9">
          <el-date-picker
            v-model="endTime"
            size="mini"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getData()" plain>搜索</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button type="primary" icon="el-icon-search" size="mini" @click="exportExcel()" plain>导出excel</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table
        :data="list"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        :summary-method="getSummaries"
        show-summary
        @selection-change="selectionRowsChange" >
        <el-table-column
          prop="payNo"
          label="订单编号">
        </el-table-column>
        <el-table-column
          label="创建订单时间"
          prop="payTime"
        >
        </el-table-column>
        <el-table-column
          label="会员手机号"
          prop="memberPhone"
        >
        </el-table-column>
        <el-table-column
          label="会员登录名称"
          prop="memberLoginName"
        >
        </el-table-column>
        <el-table-column
          label="包编号"
          prop="packageNo"
        >
        </el-table-column>
        <el-table-column
          label="上游名称"
          prop="payUpperName"
        >
        </el-table-column>
        <el-table-column
          label="支付金额"
          prop="payAmount"
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
        <el-col :span="14" :xs="24">
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
        txtone:"成功订单",
        txtTwo:"",
        form: {
        },
        memberLoginName:'',
        memberPhone:'',
        startTime:"",
        endTime:"",
        hedTitle:"",
        text:"",
        list: [ ],
        current: 0,
        brtotal:0,
        search: '',
      }
    },
    methods:{
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          };

          if(index!=6){

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
      exportExcel(){
        let api = window.g.payOrder+'/exportExcel';
        let date = "current="+this.number+"&size="+this.present+"&payStatus=0&startTime="+this.startTime+"&endTime="+this.endTime+"&memberPhone="+this.memberPhone+"&memberLoginName="+this.memberLoginName;
        window.open(api+'?'+date);
      },
      selectionRowsChange(val){
        console.log(val);
      },
      getData(){
        let _this = this;
        let api = window.g.payOrder;
        const date ={
          params:{
            current:this.number,
            size:this.present,
            payStatus:0,
            startTime:this.startTime,
            endTime:this.endTime,
            memberPhone: this.memberPhone,
            memberLoginName: this.memberLoginName,
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
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      if(month<10){
        month = "0"+month;
      }
      if(day<10){
        day = "0"+day;
      }
      const strDate = year+'-'+month+'-'+day;
      this.startTime = strDate+" 00:00:00";
      this.endTime = strDate+" 23:59:59";
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
.el-date-editor.el-input{
    width:100%;
}
</style>

