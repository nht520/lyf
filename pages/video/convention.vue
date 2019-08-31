<template>
    <div class="convention">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <div class="conttab">
        <el-row class="search" :model="form" :gutter="15">
            <el-col :span="3" :xs="10">
                <el-input v-model="form.packageNo" placeholder="请输入包编号"  size="small"></el-input>
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
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="packageNo"
            label="包编号">
            </el-table-column>
           <el-table-column
             prop="productType"
             label="产品类型">
           </el-table-column>
            <el-table-column
            label="渠道编号"
            prop="merchantNo"
            >
            </el-table-column>
            <el-table-column
            prop="merchantLoginName"
            label="渠道账号">
            </el-table-column>
            <el-table-column

            label="扣量状态">
              <template slot-scope="scope">
                <div v-if="scope.row.deductionStatus==0">是</div>
                <div v-if="scope.row.deductionStatus==1">否</div>
              </template>
            </el-table-column>
            <el-table-column
            label="扣量基数"
            prop="deductionBase"
            >
            </el-table-column>
            <el-table-column
            prop="deductionRatio"
            label="扣量比列">
            </el-table-column>
           <el-table-column
             label="扣量时间"
             prop="deductionTime"
           >
           </el-table-column>
           <el-table-column
             label="结算比例"
             prop="primaryChannel"
           >
           </el-table-column>
            <el-table-column
            fixed="right"
            align="right"
             width="100"
            >
            <template slot="header">
              <nuxt-link to="/video/addconvention">
                <el-button type="primary" icon="el-icon-plus" size="mini" plain>添加</el-button>
              </nuxt-link>
            </template>
            <template slot-scope="scope" >
                <el-button
                    size="mini"
                    icon="el-icon-edit"
                    @click="compile(scope.$index, scope.row)"
                >编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 分业 -->
        <el-row class="Pagination">
            <el-col :span="10" :offset="5">
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
            txtone:"渠道管理",
            txtTwo:"",
            hedTitle:"",
            text:"",
            form: {
              name: '',
              region:"",
              condition:"",
              packageNo:'',
            },
           selectIds:[],//选中的ids
            current: 0,
            branches:0,
            list: [],
            search: ''
        }
    },
    methods:{
      onSubmit() {
        console.log('submit!');
      },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.atnumber = val;
        this.conventionlist();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.atcurrent = val;
        this.conventionlist();
      },
        //全选
      toggleSelect(rows) {
        const _this = this;
        _this.selectIds=[];
        rows.forEach(row=>{
          _this.selectIds.push()
        });
        // console.log(rows);
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
        // console.log(val);
        val.forEach(i=>{
          console.log(i);
        })
      },
      // 编辑
      compile(index, rows){
        console.log(rows);
        this.$router.push({path:'/video/addconvention',query: {id:rows.id}})
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
        this.atcurrent=1;
        this.conventionlist();
        // console.log(this.form);
      },
      //数据 
      conventionlist(){
        const api = window.g.videoProductPackage;
        const _this = this;
        const date ={
            params:{
                current:this.atcurrent,
                size:this.atnumber,
              packageNo:this.form.packageNo,
            }
        }
        Axios.get(api,date).then((res)=>{
          console.log(res)
          _this.list = res.data.records;
          this.branches = res.data.total;
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    mounted(){
      // 获取列表数据
      this.conventionlist();
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
