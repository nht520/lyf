<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <el-row class="search"  :gutter="15">
<!--        <el-col :span="3" :xs="4">-->
<!--          <el-input v-model="packageNo"  size="mini"  placeholder="包编号"></el-input>-->
<!--        </el-col>-->
        <el-col :span="3" :xs="9">
          <el-date-picker
            v-model="startTime"
            type="datetime"
            size="mini"
            format="yyyy-MM-dd HH:00:00"
            value-format="yyyy-MM-dd HH:00:00"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3" :xs="9">
          <el-date-picker
            v-model="endTime"
            type="datetime"
            size="mini"
            format="yyyy-MM-dd HH:00:00"
            value-format="yyyy-MM-dd HH:00:00"
            placeholder="选择结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3" :xs="6">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="seekdithc()" plain>搜索</el-button>
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
          prop="packageNo"
          label="包名">
        </el-table-column>
        <el-table-column
          label="uv"
          prop="webUv"
        >
        </el-table-column>
        <el-table-column
          label="请求量"
          prop="requestCount"
        >
        </el-table-column>
        <el-table-column
          prop="payCount"
          label="效果数">
        </el-table-column>
        <el-table-column
          label="效果金额"
          prop="payAmount"
        >
        </el-table-column>
        <el-table-column
          label="收益"
          prop="revenue"
        >
        </el-table-column>
        <el-table-column
          label="新增会员"
          prop="installCount"
        >
        </el-table-column>
        <el-table-column
          label="成功率">
          <template slot-scope="scope">{{ scope.row.successRate }}%</template>
        </el-table-column>
        <el-table-column
          label="AP"
          prop="ap"
        >
        </el-table-column>
        <el-table-column
          label="uv/注册占比"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.installCount==0">0%</div>
            <div v-if="scope.row.installCount!=0">{{(scope.row.installCount/scope.row.webUv).toFixed(2)}}%</div>
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
        startTime:'',
        endTime:'',
        packageNo:'',
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
          // if(index===1){
          //   sums[index]='';
          //   return;
          // }
          if(index===7){
            sums[index]=((sums[2]/sums[1])*100).toFixed(2)+'%';
            return;
          }
          if(index===8){
            if(sums[4]==0){
              sums[index] = 0;
            } else{
              sums[index]=(sums[4]/sums[5]).toFixed(2);
            }
            return;
          }
          if(index==9){
            if(sums[6]==0){
              sums[index] = '0%';
            }else{
              sums[index]=(sums[6]/sums[1]).toFixed(2)+'%';
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
      //   搜索
      seekdithc(){
        console.log(this.startTime);
        this.getData();
      },
      // 获取列表数据
      getData(){
        let _this = this;
        let api = window.g.bookReport+'/dayTimInterVal';
        const date ={
          params:{
            current:this.number,
            size:this.present,
            packageNo:this.packageNo,
            startTime:this.startTime,
            endTime:this.endTime,
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
      this.endTime = strDate+" 23:00:00";
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
.el-date-editor.el-input{
    width:100%;
}
</style>
