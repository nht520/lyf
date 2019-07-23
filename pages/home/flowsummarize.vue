<template>
    <div class="convention">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <div class="conttab">
        <el-row class="search" :model="form" :gutter="15">
            <el-col :span="2">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" size="small"></el-date-picker>
            </el-col>
            <el-col :span="2">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;" size="small"></el-date-picker>
            </el-col>
            <el-col :span="2">
               <el-button type="primary" icon="el-icon-search" size="small" @click="seekdithc()" plain>搜索</el-button>
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
            prop="date"
            label="日期">
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
            label="扣量数"
             prop="deductionCount"
            >
            </el-table-column>
            <el-table-column
            label="扣量收益"
            prop="deductionYield"
            >
            </el-table-column>
            <el-table-column
            label="渠道收益[代]"
             prop="channelRevenue"
            >
            </el-table-column>
            <el-table-column
            label="渠道收益"
            prop="channelProfit"
            >
            </el-table-column>
            <el-table-column
            label="收益"
            prop="revenue"
            >
            </el-table-column>
            <el-table-column
            label="活跃量"
            prop="activeCount"
            >
            </el-table-column>
            <el-table-column
            label="安装量"
            prop="installCount"
            >
            </el-table-column>
            <el-table-column
            label="成功率"
             prop="successRate"
            >
            </el-table-column>
            <el-table-column
            label="AP"
            prop="ap"
            >
            </el-table-column>
            <el-table-column
            label="计费情况"
            >
              <template slot-scope="scope">
                <span style="color: #22af00 ">{{scope.row.chargingRequestCount}}</span>
                <p style="color: #f00">{{scope.row.chargingPayCount}}</p>
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
            <el-col :span="14" :offset="10">
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage1"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="100">
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
            txtone:"统计分析",
            txtTwo:"",
            hedTitle:"",
            text:"",
            form: {
              name: '',
              qzhong:'',
              region:"",
              condition:"",
              date1:"",
              date2:"",
              regionone:"",
              
            },
            currentPage1: 4,
            list: [
              // {
              //   date: '2016-05-02',
              //   name: '王小虎',
              //   address: '上海市普陀区金沙江路 1518 弄'
              //   }, {
              //   date: '2016-05-04',
              //   name: '王小虎',
              //   address: '上海市普陀区金沙江路 1517 弄'
              //   }, {
              //   date: '2016-05-01',
              //   name: '王小虎',
              //   address: '上海市普陀区金沙江路 1519 弄'
              //   }, {
              //   date: '2016-05-03',
              //   name: '王小虎',
              //   address: '上海市普陀区金沙江路 1516 弄'
              //   }
                ],
                search: ''
        }
    },
    methods:{
      onSubmit() {
        console.log('submit!');
      },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
        console.log(this.form);
      },
      getData:function(){
        let _this = this;
        let url = window.g.flowsummarize;
        let param = _this.getParams();
        Axios.get(url,param).then(function(value){
          let data = value.data.records;
          console.log(data);
          for(let i =0;i<data.length;i++){
           let jsonArray =  _this.nullChangeZero(data[i]);
            _this.list.push(jsonArray);
          }
        }).catch(function(res){
          console.log(res);
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
</style>
