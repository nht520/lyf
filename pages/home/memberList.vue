<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <el-row class="search" :model="form" :gutter="15">
        <el-col :span="3" :xs="8">
          <el-input v-model="memberLoginName" size="mini" placeholder="请输入会员登录名"></el-input>
        </el-col>
        <el-col :span="3" :xs="8">
          <el-input v-model="memberPhone" size="mini" placeholder="会员手机号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getData()" plain>搜索</el-button>
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
          prop="id"
          label="会员id">
        </el-table-column>
        <el-table-column
          label="会员手机号"
          prop="memberPhone"
        >
        </el-table-column>
        <el-table-column
          label="会员登录名"
          prop="memberLoginName"
        >
        </el-table-column>
        <el-table-column
          label="会员密码"
          prop="memberPass"
        >
        </el-table-column>
        <el-table-column
          label="是否会员"
          prop="isVip"
        >
        </el-table-column>
        <el-table-column
          label="会员开始时间"
          prop="vipStartTime"
        >
        </el-table-column>
        <el-table-column
          label="会员结束时间"
          prop="vipEndTime"
        >
        </el-table-column>
        <el-table-column
          label="会员书币"
          prop="memberGold"
        >
        </el-table-column>
        <el-table-column
          label="会员创建时间"
          prop="memberCreateDate"
        >
        </el-table-column>
        <el-table-column
          label="会员最近一次登录时间"
          prop="memberUpdateDate"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="50">
          <template slot-scope="scope">
            <el-button @click="openDiagnosis(scope.row)" type="text" size="mini">操作</el-button>
<!--            <el-button type="text" @click="deleteBook(scope.row)" size="mini">移除</el-button>-->
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
        <el-col :span="14" >
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
    <!--    弹出层-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
      <div class="channe">
          <el-row :gutter="20">
            <el-col :span="5" :offset="1" :xs="7">
              会员手机号:
            </el-col>
            <el-col :span="17" :xs="15">
              <el-input v-model="memberPhone" placeholder="请输入排序"></el-input>
            </el-col>
          </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1" :xs="7">
            会员登录名:
          </el-col>
          <el-col :span="17" :xs="15">
            <el-input v-model="memberLoginName" placeholder="请输入排序"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1" :xs="7">
            会员密码:
          </el-col>
          <el-col :span="17" :xs="15">
            <el-input v-model="memberPass" placeholder="请输入排序"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1" :xs="7">
            是否会员:
          </el-col>
          <el-col :span="17" :xs="15">
            <el-select v-model="isVip" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1" :xs="7">
            会员开始时间:
          </el-col>
          <el-col :span="17" :xs="15">
            <el-date-picker
              v-model="startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1" :xs="7">
            会员结束时间:
          </el-col>
          <el-col :span="17" :xs="15">
            <el-date-picker
              v-model="endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1" :xs="7">
            会员书币:
          </el-col>
          <el-col :span="17" :xs="15">
            <el-input v-model="memberGold" placeholder="请输入会员书币"></el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose()">取 消</el-button>
    <el-button type="primary" @click="update()">确 定</el-button>
  </span>
    </el-dialog>

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
        txtone:"会员管理",
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
        memberId:'',
        memberLoginName:'',
        memberPhone:'',
        memberPass:'',
        isVip:'',
        memberGold:'',
        startTime:'',
        endTime:'',
        dialogVisible: false,
        hedTitle:"",
        text:"",
        list: [ ],
        current: 0,
        brtotal:0,
        search: '',
      }
    },
    methods:{
      openDiagnosis(row){
        console.log(row);
        this.memberId = row.id;
        this.memberPhone = row.memberPhone;
        this.memberLoginName = row.memberLoginName;
        this.memberPass = row.memberPass;
        this.isVip = row.isVip;
        this.startTime = row.vipStartTime;
        this.endTime = row.vipEndTime;
        this.memberGold = row.memberGold;
        this.dialogVisible = true;
      },
      selectionRowsChange(val){
        console.log(val);
      },
      //弹出层
      handleClose(done) {
        this.memberId = '';
        this.memberPhone = '';
        this.memberLoginName = '';
        this.memberPass = ''
        this.isVip = '';
        this.startTime = '';
        this.endTime = '';
        this.memberGold = '';
        this.dialogVisible = false;
      },
      getData(){
        let _this = this;
        let api = window.g.bookMember;
        const date ={
          params:{
            current:this.number,
            size:this.present,
            memberPhone:this.memberPhone,
            memberLoginName:this.memberLoginName
          }
        }
        _this.list = [];
        Axios.get(api,date).then(function(res){
          let data = res.data.records;
          console.log(res);
          _this.brtotal = res.data.total;
          _this.current = res.data.current;
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
  .channe .el-col-17
    text-align left 
.el-date-editor.el-input{
    width:100%;
}
</style>

