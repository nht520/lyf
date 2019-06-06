<template>
    <div class="convention">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <div class="conttab">
        <el-row class="search" :model="form" :gutter="15">
            <el-col :span="2">
                <el-input v-model="form.name" placeholder="通道名称"  size="small"></el-input>
            </el-col>
            <el-col :span="2">
                <el-select  v-model="form.region"  size="small" placeholder="通道服务商">
                    <el-option label="111" value="shanghai"></el-option>
                    <el-option label="222" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-select v-model="form.condition"  size="small" placeholder="支付类型" >
                    <el-option label="111" value="shanghai"></el-option>
                    <el-option label="222" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-select v-model="form.condition"  size="small" placeholder="通道模式" >
                    <el-option label="111" value="shanghai"></el-option>
                    <el-option label="222" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-select v-model="form.condition"  size="small" placeholder="限量" >
                    <el-option label="111" value="shanghai"></el-option>
                    <el-option label="222" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-select v-model="form.condition"  size="small" placeholder="开启" >
                    <el-option label="111" value="shanghai"></el-option>
                    <el-option label="222" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
               <el-button type="primary" icon="el-icon-search" size="small" @click="seekdithc()">搜索</el-button>
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
            prop="date"
            label="通道名称">
            </el-table-column>
            <el-table-column
            label="服务商"
            prop="name"
            >
            </el-table-column>
            <el-table-column
            prop="date"
            label="支付类型">
            </el-table-column>
            <el-table-column
            label="通道模式"
            prop="name"
            >
            </el-table-column>
            <el-table-column
            prop="date"
            label="通道属性">
            </el-table-column>
            <el-table-column
            label="通道费率"
            prop="name"
            >
            </el-table-column>
            <el-table-column
            prop="date"
            label="单笔限额">
            </el-table-column>
            <el-table-column
            label="限量"
            prop="name"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="优先级">
            </el-table-column>
            <el-table-column
            label="状态"
            prop="name"
            >
            </el-table-column>
            <el-table-column
            width="170px"
            fixed="right"
            align="right">
            <template slot="header">
              <nuxt-link to="/home/addchanlinterface">
                <el-button type="primary" icon="el-icon-plus" size="mini">添加</el-button>
              </nuxt-link>
            </template>
            <template slot-scope="scope" >
                <el-button
                    size="mini"
                    icon="el-icon-edit"
                >编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="deleteRow(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 分业 -->
        <el-row class="Pagination">
            <el-col :span="5" >
                <el-button @click="toggleSelect(list)" size="mini">全选/反选</el-button>
                <el-button type="danger" size="mini" @click="qxDete" >删除</el-button>
            </el-col>
            <el-col :span="10" :offset="7">
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
            currentPage1: 4,
            list: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }],
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
      }
    },
    mounted(){
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
