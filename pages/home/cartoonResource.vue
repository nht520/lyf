<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <el-row class="search" :model="form" :gutter="15">
        <el-col :span="3">
          <el-select v-model="value" :span="3" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="isHomePage" :span="3" placeholder="是否首页">
            <el-option
              v-for="item in optionsHome"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input v-model="bookId" placeholder="请输入bookId"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="name" placeholder="请输入书名"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" size="small" @click="getData()" plain>搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" size="small" @click="plxgvipOpen()" plain>批量修改vip是否免费</el-button>
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
          prop="bookId"
          label="漫画bookId">
        </el-table-column>
        <el-table-column
          label="漫画名称"
          prop="body.keywords"
        >
        </el-table-column>
        <el-table-column
          label="漫画状态"
          prop="body.status.value"
        >
        </el-table-column>
        <el-table-column
          label="vip是否免费"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.body.vipFree">是</div>
            <div v-if="scope.row.body.vipFree==false">否</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button @click="vipFree(scope.row,true)" v-if="scope.row.body.vipFree==false" type="text" size="small">vip免费</el-button>
            <el-button @click="vipFree(scope.row,false)" v-if="scope.row.body.vipFree" type="text" size="small">vip收费</el-button>
            <el-button @click="openDiagnosis(scope.row)" type="text" size="small">操作</el-button>
            <el-button type="text" @click="deleteBook(scope.row)" size="small">移除</el-button>
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
        <el-col :span="14" :offset="10">
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
      width="30%"
      :before-close="handleClose">
      <div class="channe">
        <el-row :gutter="20">
          <el-row :gutter="20">
            <el-col :span="5" :offset="1">
              bookId:
            </el-col>
            <el-col :span="17">
              {{settmentId}}
            </el-col>
          </el-row>
          <el-col :span="5" :offset="1">
            书名:
          </el-col>
          <el-col :span="17">
            {{bookName}}
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1">
            排序:
          </el-col>
          <el-col :span="17">
            <el-input v-model="bookSort" placeholder="请输入排序"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1">
            首页:
          </el-col>
          <el-select v-model="isHomePage"  :span="3" placeholder="请选择">
            <el-option
              v-for="item in optionsHome"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1">
            类型:
          </el-col>
          <el-select v-model="value1" multiple :span="3" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row>

      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose()">取 消</el-button>
    <el-button type="primary" @click="update()">确 定</el-button>
  </span>
    </el-dialog>

    <!--vip是否免费弹窗-->
    <el-dialog
      title="提示"
      :visible.sync="isPlxgvipOpen"
      width="30%"
      :before-close="plxgvipOpen">
      <div class="channe">
        <el-row :gutter="20">
          <el-col :span="5" :offset="1">
            排序:
          </el-col>
          <el-col :span="17">
            <el-input v-model="bookIds" placeholder="请输入排序"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1">
            是否免费:
          </el-col>
          <el-select v-model="isFree"  :span="3" placeholder="请选择">
            <el-option
              v-for="item in isFreeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="plxgvipOpen()">取 消</el-button>
    <el-button type="primary" @click="updatesVipFree()">确 定</el-button>
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
          options: [
            {
              value: '',
              label: '请选择'
            }, {
              value: 'isWeekExemption',
              label: '每周限免'
            },{
            value: 'isWheelPlanting',
            label: '首页轮播'
          }, {
            value: 'isWatching',
            label: '大家都在看'
          }, {
            value: 'isDailyUpdate',
            label: '每日上新'
          }, {
            value: 'isBestSellerList',
            label: '畅销榜'
          }, {
            value: 'isPopularityList',
            label: '人气榜'
          }, {
            value: 'isEndList',
            label: '完结榜'
          }, {
            value: 'isNewBook',
            label: '新书榜'
          }, {
            value: 'isWeight',
            label: '重磅推荐'
          }, {
            value: 'isGuessLikeIt',
            label: '猜你喜欢'
          }, {
              value: 'isVip',
              label: 'vip'
            }],
          optionsHome: [
            {
              value: '0',
              label: '是'
            }, {
              value: '1',
              label: '否'
            }],
          bookId:'',
          name:'',
          value: '',
          value1:[],
          input:'',
          txtone:"漫画资源",
          txtTwo:"",
          form: {
            date1:"",
            date2:"",
          },
          dialogVisible: false,
          isPlxgvipOpen:false,//批量修改资源是否免费
          bookName:'',
          bookSort:'',
          hedTitle:"",
          text:"",
          settmentId:'',
          amountOnAccount:0,
          serviceCharge:0,
          currentPage1: 4,
          list: [ ],
          current:0,
          brtotal:0,
          newMemberTotal:0,
          successRevenue:0,
          search: '',
          isHomePage:0,
          bookIds:'',
          isFree:false,
          isFreeArr:[{
            value: true,
            label: '是'
          },
            {
              value: false,
              label: '否'
            }
          ],
        }
      },
      methods:{
        openDiagnosis(row){
          console.log(row);
          this.settmentId = '';
          this.bookName = '';
          this.settmentId = row.bookId;
          this.bookName = row.body.keywords;
          this.dialogVisible = true;
        },
        selectionRowsChange(val){
          console.log(val);
        },
        //弹出层
        handleClose(done) {
          this.dialogVisible = false;
        },
        vipFree(row,isFree){
          const api = window.g.book+'/updateVipFree'
          let param = new URLSearchParams();
          param.append("bookId",row.bookId);
          param.append("isFree",isFree)
          Axios.post(api,param).then((res)=>{
            console.log(res);
            this.getData();
          }).catch((err)=>{
            console.log(err);
          })
        },
        updatesVipFree(){
          const api = window.g.book+'/updatesVipFree'
          let param = new URLSearchParams();
          param.append("bookIds",this.bookIds);
          param.append("isFree",this.isFree)
          Axios.post(api,param).then((res)=>{
            console.log(res);
            this.getData();
            this.isPlxgvipOpen = false;
          }).catch((err)=>{
            console.log(err);
          })
        },
        plxgvipOpen(){
          this.isPlxgvipOpen = !this.isPlxgvipOpen;
        },
        getData(){
          let _this = this;
          let api = window.g.book;
          const date ={
            params:{
              current:this.number,
              size:this.present,
              bookId: this.bookId,
              name: this.name,
              isHomePage: this.isHomePage,
            }
          }
          if(this.value!=''){
            date.params[this.value] = '0';
            // date.params['isHomePage'] = '0';
          }
          Axios.get(api,date).then(function(res){
            let data = res.data.records;
            console.log(res);
            _this.list = [];
            _this.brtotal = res.data.total;
            _this.current = res.data.current;
            for(let i = 0;i<data.length;i++){
              data[i].body = JSON.parse(data[i].body);
              _this.list.push(data[i]);
            }
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
          const api = window.g.book+'/update';
          console.log(this.value);
          let param= new URLSearchParams();
          param.append("bookId",this.settmentId);
          param.append("types",this.value1);
          param.append("bookSort",this.bookSort);
          param.append("isHomePage",this.isHomePage);
          Axios.post(api,param).then((res)=>{
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

