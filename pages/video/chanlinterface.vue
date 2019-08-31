<template>
    <div class="convention">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <div class="conttab">
        <el-row class="search" :model="form" :gutter="15">

        </el-row>
        <!-- 表格 -->
         <el-table
            :data="list"
            ref="multipleTable"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="selectionRowsChange" >
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="payName"
            label="通道名称">
            </el-table-column>
            <el-table-column
            label="支付宝"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.accessTypeAlipay==0">支持</div>
                <div v-if="scope.row.accessTypeAlipay==1">不支持</div>
              </template>
            </el-table-column>
           <el-table-column
             label="微信"
           >
             <template slot-scope="scope">
               <div v-if="scope.row.accessTypeWx==0">支持</div>
               <div v-if="scope.row.accessTypeWx==1">不支持</div>
             </template>
           </el-table-column>
           <el-table-column
             label="通道费率"
           >
             <template slot-scope="scope">
               {{scope.row.payRate}}%
             </template>
           </el-table-column>
            <el-table-column
            label="状态"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.payStatus==0">使用中</div>
                <div v-if="scope.row.payStatus==1">未使用</div>
              </template>
            </el-table-column>
            <el-table-column
            width="50px"
            fixed="right"
            label="操作"
            align="right">
            <template slot="header">
            </template>
            <template slot-scope="scope" >
              <el-button @click="enableWay(scope.row,1)" v-if="scope.row.payStatus==0" type="text" size="mini" style="color: #00bd07;">禁用</el-button>
              <el-button @click="enableWay(scope.row,0)" v-if="scope.row.payStatus==1" type="text" size="mini" style="color: #00bd07;">启用</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 分业 -->
        <el-row class="Pagination">
          <el-col :span="10"  :xs="24">

            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="branches">
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
            txtone:"通道管理",
            txtTwo:"",
            hedTitle:"",
            text:"",
            form: {
              name: '',
              region:"",
              condition:"",
            },
          current: 0,
          branches:0,
            currentPage1: 4,
            list: [ ],
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
      enableWay(row,status){
        let _this = this;
        let url = window.g.videoChanlinterface+'/update';
        let _param = new URLSearchParams();
        _param.append("id",row.id);
        _param.append("payStatus",status);
        Axios.post(url,_param).then((res)=>{
          alert("操作成功");
          _this.getData();
        }).catch((err)=>{
          console.log(err);
        })

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
        let url = window.g.videoChanlinterface;
        let _param = _this.getParam();
        Axios.get(url,_param).then(function (value) {
          console.log(value);
          _this.list = value.data.records;
          this.branches = value.data.total;
          this.current = value.current;
        }).catch(function (res) {
          console.log(res);
        })
      },
      getParam:function(){},
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
