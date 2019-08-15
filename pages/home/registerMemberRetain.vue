<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <el-row class="search"  :gutter="15">
        <el-col :span="3" :xs="5">
          <el-input v-model="packageNo" size="mini" placeholder="包编号"></el-input>
        </el-col>
        <el-col :span="3" :xs="6">
          <el-date-picker
            v-model="startTime"
            size="mini"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3" :xs="6">
          <el-date-picker
            v-model="endTime"
            size="mini"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="seekdithc()" plain>搜索</el-button>
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
          label="时间">
        </el-table-column>
        <el-table-column
          label="包名"
          prop="packageNo"
        >
        </el-table-column>
        <el-table-column
          label="总uv"
          prop="webUv"
        >
        </el-table-column>
        <el-table-column
          label="会员注册人数"
          prop="registerCount"
        >
        </el-table-column>
        <el-table-column
          label="会员绑定手机人数"
          prop="memberPhoneCount"
        >
        </el-table-column>
        <!--        <el-table-column-->
        <!--          label="各金额充值次数"-->
        <!--          prop="vipStartTime"-->
        <!--        >-->
        <!--        </el-table-column>-->
        <el-table-column
          label="次日留存数"
          prop="retainCount"
        >
        </el-table-column>
        <el-table-column
          label="三日留存数"
          prop="threeRetainCount"
        >
        </el-table-column>
        <el-table-column
          label="大于等于七日留存数"
          prop="sevenRetainCount"
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
<!--        <el-col :span="14" :offset="10">-->
<!--          <div class="block">-->
<!--            <el-pagination-->
<!--              @size-change="handleSizeChange"-->
<!--              @current-change="handleCurrentChange"-->
<!--              :current-page="current"-->
<!--              :page-sizes="[10, 20, 30, 40]"-->
<!--              :page-size="10"-->
<!--              layout="total, sizes, prev, pager, next, jumper"-->
<!--              :total="brtotal">-->
<!--            </el-pagination>-->
<!--          </div>-->
<!--        </el-col>-->
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
        txtone:"漫画统计",
        txtTwo:"",
        form: {
          date1:"",
          date2:"",
        },
        options: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }],
        startTime:'',
        endTime:'',
        hedTitle:"",
        text:"",
        list: [ ],
        search: '',
        packageNo:'',
        current:0,
        brtotal:0,

      }
    },
    methods:{

      selectionRowsChange(val){
        console.log(val);
      },

      getData(){
        let _this = this;
        let api = window.g.bookReport+'/retain';
        const date ={
          params:{
            startTime:this.startTime,
            endTime:this.endTime,

          }
        }
        if(this.packageNo!=''){
          date.params['packageNo'] = this.packageNo;
        }
        _this.list = [];
        Axios.get(api,date).then(function(res){
          let data = res.data.data;
          console.log(res);
          // _this.brtotal = res.data.total;
          // _this.current = res.data.current;
          _this.list = data;
          // for(let i = 0;i<data.length;i++){
          //   data[i].body = JSON.parse(data[i].body);
          //   _this.list.push(data[i]);
          // }
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
      update(row){
        const api = window.g.bookMember +'/update';
        let param= new URLSearchParams();
        param.append("id",this.memberId);
        param.append("memberPhone",this.memberPhone);
        param.append("memberLoginName",this.memberLoginName);
        param.append("memberPass",this.memberPass);
        param.append("memberGold",this.memberGold);
        param.append("isVip",this.isVip);
        param.append("startTime",this.startTime);
        param.append("endTime",this.endTime);

        Axios.post(api,param).then((res)=>{
          console.log(res);
          this.getData();
          this.dialogVisible = false;
        }).catch((err)=>{
          console.log(err);
        })
      },
      deleteBook(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const api = window.g.book+'/delete';
          let param= new URLSearchParams();
          param.append("bookId",row.bookId);
          Axios.post(api,param).then((res)=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch((err)=>{
            console.log(err);
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    mounted() {
      this.txtTwo = storage.get("linktxt");
      // this.startTime=new Date();
      // this.endTime = new Date();
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
      this.startTime = strDate;
      this.endTime = strDate;
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
  .el-date-editor.el-input
   width:100%;
</style>

