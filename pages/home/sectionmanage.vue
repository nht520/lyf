<template>
    <div class="convention">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <div class="conttab">
        <el-row class="search" :model="form" :gutter="15">
            <el-col :span="3">
                <el-input v-model="form.name" placeholder="请输入部门名称"  size="small"></el-input>
            </el-col>
             <el-col :span="3">
                <el-input v-model="form.name" placeholder="请输入负责人"  size="small"></el-input>
            </el-col>       
            <el-col :span="2">
               <el-button type="primary" icon="el-icon-search" size="small" @click="seekdithc()" plain>搜索</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
          <el-table
            :data="tableData"
            style="width: 100%"
            row-key="id"
            border
            lazy
            @selection-change="selectionRowsChange" 
            ref="multipleTable"
            tooltip-effect="dark"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="date"
            label="部门名称">
            </el-table-column>
            <el-table-column
            prop="name"
            label="负责人">
            </el-table-column>
            <el-table-column
            prop="address"
            label="排序">
            </el-table-column>
            <el-table-column
            fixed="right"
            align="right">
            <template slot="header">
              <nuxt-link to="/home/addsection">
                <el-button type="primary" icon="el-icon-plus" size="mini" plain>添加</el-button>
              </nuxt-link>
            </template>
            <template slot-scope="scope" >
                <el-button
                    size="mini"
                    icon="el-icon-edit" 
                >编辑</el-button>
                <el-button
                     type="success"
                    size="mini" plain
                >新增(子)</el-button>
                <el-button
                size="mini"
                type="danger" plain
                @click="deleteRow(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>  
        </el-table>
        <!-- 分业 -->
        <el-row class="Pagination">
            <el-col :span="6">
                <el-button @click="toggleSelect(tableData)" size="mini">全选/反选</el-button>
                <el-button  size="mini">保存权重</el-button>
                <el-button type="danger" size="mini" @click="qxDete" plain>删除</el-button>
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
            txtone:"系统管理",
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
            tableData: [{
            id: 1,
            date: '技术部',
            name: 'back',
            address: '1',
            state:'开启',
            children: [{
                id: 31,
                date: '系统菜单',
                name: '王小虎',
                state:'开启',
                address: '2'
                }, {
                id: 32,
                date: '操作菜单',
                name: '王小虎',
                state:'开启',
                address: '3'
            }]
            },{
            id: 2,
            date: '网络部',
            name: 'back',
            address: '1',
            state:'开启',
            children: [{
                id: 31,
                date: '系统菜单',
                name: '王小虎',
                state:'开启',
                address: '2'
                }, {
                id: 32,
                date: '操作菜单',
                name: '王小虎',
                state:'开启',
                address: '3'
            }]
            },],
            search: ''
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
    //   
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
