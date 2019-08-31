<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <el-row class="search" :model="form" :gutter="15">
        <el-col :span="2" :xs="6">
          <el-input v-model="form.wayName" placeholder="上游名称" size="mini"></el-input>
        </el-col>
        <el-col :span="3" :xs="9">
          <el-date-picker type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期" v-model="form.date1" style="width: 100%;" size="mini"></el-date-picker>
        </el-col>
        <el-col :span="3" :xs="9">
          <el-date-picker type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期" v-model="form.date2" style="width: 100%;" size="mini"></el-date-picker>
        </el-col>
        <el-col :span="2" :xs="6">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="seekdithc()" plain>搜索</el-button>
        </el-col>
        <el-col :span="2" :xs="6">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="sysComicsStatistics()" plain>同步</el-button>
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
         >
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          label="上游名称"
          prop="wayName"
        >
        </el-table-column>
        <el-table-column
          label="请求量"
          prop="requestCount"
        >
        </el-table-column>
        <el-table-column
          label="效果数"
          prop="payCount"
        >
        </el-table-column>
        <el-table-column
          label="请求金额"
          prop="requestAmount"
        >
        </el-table-column>
        <el-table-column
          prop="payAmount"
          label="效果金额">
        </el-table-column>
        <el-table-column
          label="成功率">
          <template slot-scope="scope">{{ ((scope.row.payCount/scope.row.requestCount)*100).toFixed(2) }}%</template>
        </el-table-column>
      </el-table>
      <!-- 分业 -->
      <el-row class="Pagination">
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
        txtone:"漫画统计",
        txtTwo:"",
        hedTitle:"",
        text:"",
        form: {
          date1:"",
          date2:"",
          wayName:'',
        },
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
          if(index===6){
            if(sums[3]==0){
              sums[index]='0%';
            }else{
              sums[index]=((sums[3]/sums[2])*100).toFixed(2)+'%';
            }

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
            sums[index] = 'N/A';
          }
        });
        return sums;
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
      //   搜索
      seekdithc(){
        console.log(this.form.date1 + this.form.date2);
        this.getData();
      },
      sysComicsStatistics(){
        let _this = this;
        let api = window.g.dayway+'/synch';
        Axios.post(api).then((res)=>{
          console.log(res);
          alert("同步成功");
          this.getData();
        }).catch((err)=>{
          console.log(err);
        })
      },
      // 获取列表数据
      getData(){
        let _this = this;
        let api = window.g.dayway;
        const date ={
          params:{
            current:this.number,
            size:this.present,
            startTime:this.form.date1,
            endTime:this.form.date2,
            wayName:this.form.wayName,
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
    },
    mounted(){
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
      this.form.date1 = strDate;
      this.form.date2 = strDate;
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

</style>
