<template>
    <div class="convention">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <div class="conttab">
        <el-row class="search" :model="form" :gutter="15">
<!--            <el-col :span="2">-->
<!--                <el-input v-model="form.region" placeholder="通道名称"  size="small"></el-input>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--                <el-select  v-model="form.region"  size="small" placeholder="通道服务商">-->
<!--                    <el-option label="111" value="shanghai"></el-option>-->
<!--                    <el-option label="222" value="beijing"></el-option>-->
<!--                </el-select>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--                <el-select v-model="form.condition"  size="small" placeholder="支付类型" >-->
<!--                    <el-option label="111" value="shanghai"></el-option>-->
<!--                    <el-option label="222" value="beijing"></el-option>-->
<!--                </el-select>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--                <el-select v-model="form.condition"  size="small" placeholder="通道模式" >-->
<!--                    <el-option label="111" value="shanghai"></el-option>-->
<!--                    <el-option label="222" value="beijing"></el-option>-->
<!--                </el-select>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--                <el-select v-model="form.condition"  size="small" placeholder="限量" >-->
<!--                    <el-option label="111" value="shanghai"></el-option>-->
<!--                    <el-option label="222" value="beijing"></el-option>-->
<!--                </el-select>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--                <el-select v-model="form.condition"  size="small" placeholder="开启" >-->
<!--                    <el-option label="111" value="shanghai"></el-option>-->
<!--                    <el-option label="222" value="beijing"></el-option>-->
<!--                </el-select>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--               <el-button type="primary" icon="el-icon-search" size="small" @click="seekdithc()" plain>搜索</el-button>-->
<!--            </el-col>-->
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
            width="170px"
            fixed="right"
            label="操作"
            align="right">
            <template slot="header">
<!--              <nuxt-link to="/home/addchanlinterface">-->
<!--                <el-button type="primary" icon="el-icon-plus" size="mini" plain>添加</el-button>-->
<!--              </nuxt-link>-->
            </template>
            <template slot-scope="scope" >
              <el-button @click="enableWay(scope.row,1)" v-if="scope.row.payStatus==0" type="text" size="mini" style="color: #00bd07;">禁用</el-button>
              <el-button @click="enableWay(scope.row,0)" v-if="scope.row.payStatus==1" type="text" size="mini" style="color: #00bd07;">启用</el-button>
<!--                <el-button-->
<!--                    size="mini"-->
<!--                    icon="el-icon-edit"-->
<!--                >编辑</el-button>-->
<!--                <el-button-->
<!--                size="mini"-->
<!--                type="danger"-->
<!--                @click="deleteRow(scope.$index, scope.row)" plain>删除</el-button>-->
            </template>
            </el-table-column>
        </el-table>
        <!-- 分业 -->
        <el-row class="Pagination">
<!--            <el-col :span="5" >-->
<!--                <el-button @click="toggleSelect(list)" size="mini">全选/反选</el-button>-->
<!--                <el-button type="danger" size="mini" @click="qxDete" plain>删除</el-button>-->
<!--            </el-col>-->
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
      enableWay(row,status){
        let _this = this;
        let url = window.g.chanlinterface+'/update';
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
        let url = window.g.chanlinterface;
        let _param = _this.getParam();
        Axios.get(url,_param).then(function (value) {
          console.log(value);
          _this.list = value.data.records;
          this.branches = res.data.total;
          this.current = res.current;
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
