<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <!-- 表格 -->
      <el-table
        :data="list"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        >
        <el-table-column
          prop="cdnName"
          label="cdn名称">
        </el-table-column>
        <el-table-column
          label="cdn地址"
          prop="cdnUrl"
        >
        </el-table-column>
        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.cdnStatus==0">使用中</div>
            <div v-if="scope.row.cdnStatus==1">未使用</div>
          </template>
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="50"
        >
        <template slot-scope="scope">
          <el-button @click="enableCdn(scope.row)" v-if="scope.row.cdnStatus==1" type="text" size="mini" style="color: #00bd07;">启用</el-button>
<!--          <el-button @click="vipFree(scope.row,true)" v-if="scope.row.body.vipFree==false" type="text" size="mini" style="color: #00bd07;">vip免费</el-button>-->
<!--          <el-button @click="vipFree(scope.row,false)" v-if="scope.row.body.vipFree" type="text" size="mini" style="color: #f00;">vip收费</el-button>-->
<!--          <el-button @click="openDiagnosis(scope.row)" type="text" size="mini">操作</el-button>-->
<!--          <el-button type="text" @click="deleteBook(scope.row)" size="mini" style="color:#F00">移除</el-button>-->
        </template>
        </el-table-column>

      </el-table>
      <!-- 分业 -->
      <el-row class="Pagination">
        <el-col :span="14" :xs="24">
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
    transition:"transleft",
    components:{
      Breadcrumb
    },
    data(){
      return{
        txtone:"cdn设置",
        txtTwo:"",
        form: {
        },
        memberLoginName:'',
        memberPhone:'',
        startTime:"",
        endTime:"",
        hedTitle:"",
        text:"",
        list: [ ],
        current: 0,
        brtotal:0,
        search: '',
        number:1,
        present:10,
      }
    },
    methods:{
      enableCdn(row){
        let _this = this;
        let api = window.g.cdnSetting;
        const param = new URLSearchParams();
        param.append("id",row.id);
        Axios.post(api,param).then((res)=>{
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          _this.getData();
        }).catch((err)=>{
          console.log(err);
        })
      },
      getData(){
        let _this = this;
        let api = window.g.cdnSetting;
        const date ={
          params:{
            current:this.number,
            size:this.present,
          }
        }
        _this.list = [];
        Axios.get(api,date).then(function(res){
          let data = res.data.records;
          console.log(res);
          _this.brtotal = res.data.total;
          _this.current = res.data.current;
          _this.list = data;
        }).catch(function(err){
          console.log(err);
        });
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
    },
    mounted() {
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
  .channe .el-row
    margin-bottom 3%
  .el-date-editor.el-input{
    width:100%;
  }
</style>

