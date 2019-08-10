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
        @selection-change="selectionRowsChange" >
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="paySort"
          label="排序">
        </el-table-column>
        <el-table-column
          label="金额"
          prop="payAmount"
        >
        </el-table-column>
        <el-table-column
          label="充值书币"
          prop="rechargeMoney"
        >
        </el-table-column>
        <el-table-column
          label="送书币"
          prop="bookMoney"
        >
        </el-table-column>
        <el-table-column
          label="总书币"
          prop="totalMoney"
        >
        </el-table-column>
        <el-table-column
          label="首充送币"
          prop="firstGold"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="是否vip充值"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isVip==1">是</div>
            <div v-if="scope.row.isVip==0">否</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="openDiagnosis(scope.row)" type="text" size="small">设置</el-button>
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

      </el-row>
    </div>

    <!--    弹出层-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="channe">
        <el-row :gutter="20">
          <el-row :gutter="20">
            <el-col :span="5" :offset="1">
              金额:
            </el-col>
            <el-col :span="17">
              <el-input v-model="payAmount" placeholder="请输入充值金额"></el-input>
            </el-col>
          </el-row>
          <el-col :span="5" :offset="1">
            充值书币:
          </el-col>
          <el-col :span="17">
            <el-input v-model="rechargeMoney" placeholder="请输入充值书币"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1">
            送书币:
          </el-col>
          <el-col :span="17">
            <el-input v-model="bookMoney" placeholder="请输入充值送书币"></el-input>
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
        txtone:"支付设置",
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
        paySettingId:'',
        payAmount:0,
        rechargeMoney:0,
        bookMoney:0,
        dialogVisible:false,
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
      openDiagnosis(row){
        console.log(row);
        this.paySettingId = row.id;
        this.payAmount = row.payAmount;
        this.rechargeMoney = row.rechargeMoney;
        this.bookMoney = row.bookMoney;
        this.dialogVisible = true;
      },
      //弹出层
      handleClose(done) {
        this.dialogVisible = false;
      },
      selectionRowsChange(val){
        console.log(val);
      },

      getData(){
        let _this = this;
        let api = window.g.paySetting+'/list';
        const date ={
          params:{
          }
        }
        _this.list = [];
        Axios.get(api,date).then(function(res){
          let data = res.data.data;
          console.log(res);
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
      update(row){
        const api = window.g.paySetting +'/update';
        let param= new URLSearchParams();
        param.append("id",this.paySettingId);
        param.append("payAmount",this.payAmount);
        param.append("rechargeMoney",this.rechargeMoney);
        param.append("bookMoney",this.bookMoney);
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
</style>

