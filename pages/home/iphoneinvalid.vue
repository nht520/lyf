<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <el-row class="search" :model="form" :gutter="15">
        <el-col :span="3">
          <el-input v-model="form.name" placeholder="请输入订单编号"  size="small"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input v-model="form.name" placeholder="请输入包编号"  size="small"></el-input>
        </el-col>
        <el-col :span="2">
          <el-select  v-model="form.region"  size="small" placeholder="普通渠道">
            <el-option label="111" value="shanghai"></el-option>
            <el-option label="222" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select  v-model="form.region"  size="small" placeholder="代理渠道">
            <el-option label="111" value="shanghai"></el-option>
            <el-option label="222" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select  v-model="form.region"  size="small" placeholder="支付渠道">
            <el-option label="111" value="shanghai"></el-option>
            <el-option label="222" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select  v-model="form.region"  size="small" placeholder="接入类型">
            <el-option label="111" value="shanghai"></el-option>
            <el-option label="222" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select  v-model="form.region"  size="small" placeholder="支付类型">
            <el-option label="111" value="shanghai"></el-option>
            <el-option label="222" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="form.region"  size="small" placeholder="是否扣量">
            <el-option label="111" value="shanghai"></el-option>
            <el-option label="222" value="beijing"></el-option>
          </el-select>
        </el-col>
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
          prop="payNo"
          label="订单编号">
        </el-table-column>
        <el-table-column
          label="包编号"
          prop="payPackage"
        >
        </el-table-column>
        <el-table-column
          prop="payChannelId"
          label="渠道标识">
        </el-table-column>
        <el-table-column
          label="通道名称"
          prop="payUpper"
        >
        </el-table-column>
        <el-table-column
          label="接入类型"
        >
          <template slot-scope="scope">
            <span style="color: #22d5b1">{{scope.row.accessType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="支付类型"
        >
          <template slot-scope="scope">
            <span style="color: #60b4f0">{{scope.row.payType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="通道费率"
        >
          <template slot-scope="scope">
            <span style="color: rgb(255, 161, 14)">{{scope.row.payRate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          prop="payDesc"
        >
        </el-table-column>
        <el-table-column
          label="级别属性"
          prop="levelAttribute"
        >
        </el-table-column>
        <el-table-column
          label="预计件"
          prop="payAmount"
        >
        </el-table-column>
        <el-table-column
          label="实际计件"
          prop="payAmount"
        >
        </el-table-column>
        <el-table-column
          label="是否扣量"
        >
          <template slot-scope="scope">
            <span style="color: #f00">{{scope.row.isDisplay}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="payTime"
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
            txtone:"设备统计",
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
        let _param = {
          params:{
            payStatus:2,
          }
        };
        let url = window.g.iphonevalid;
        Axios.get(url,_param).then(function(value){
          console.log(value);
          _this.list = value.data.records;
        }).catch(function(res){
          console.log(res);
        })
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
