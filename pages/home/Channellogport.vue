<template>
    <div class="convention">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <div class="conttab">
        <el-row class="search" :model="form" :gutter="15">
<!--            <el-col :span="3">-->
<!--                <el-input v-model="form.name" placeholder="请输入错误代码"  size="small"></el-input>-->
<!--            </el-col>-->
<!--             <el-col :span="3">-->
<!--                <el-input v-model="form.name" placeholder="请输入系统订单编号"  size="small"></el-input>-->
<!--            </el-col>           -->
<!--            <el-col :span="3">-->
<!--                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" size="small"></el-date-picker>-->
<!--            </el-col>-->
<!--            <el-col :span="3">-->
<!--                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;" size="small"></el-date-picker>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--               <el-button type="primary" icon="el-icon-search" size="small" @click="seekdithc()" plain>搜索</el-button>-->
<!--            </el-col>-->
        </el-row>
        <!-- 表格 -->
           <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="payName"
              label="通道"
              width="180">
            </el-table-column>
            <el-table-column
              prop="logTime"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="logData"
              label="日志内容">
            </el-table-column>
          </el-table>
        <!-- 分业 -->
        <el-row class="Pagination">
            <el-col :span="10">
                <!-- <el-button @click="toggleSelect(tableData)" size="mini">全选/反选</el-button> -->
                <!-- <el-button  size="mini">批量结算</el-button> -->
                <!-- <el-button type="danger" size="mini" @click="qxDete" >删除</el-button> -->
            </el-col>
            <el-col :span="10" :offset="13">
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
            tableData: [

              ],
              search: '',
          number:0,
          brtotal:0,
          current:1,
        }
    },
    methods:{
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
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
            sums[index] += ' 元';
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
      getData(){
        const _this = this;
        const api = window.g.payLog;
        const date ={
          params:{
            current:this.number,
            size:this.present,
          }
        }
        _this.tableData = [];
        Axios.get(api,date).then(function(res){
          let data = res.data.records;
          console.log(res);
          _this.brtotal = res.data.total;
          _this.current = res.data.current;
          _this.tableData = data;
        }).catch(function(err){
          console.log(err);
        });
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
    },
    mounted(){
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
</style>
