<template>
    <div class="ditch">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <div class="conttab">
        <el-row class="search" :model="form" :gutter="15">
<!--            <el-col :span="2" :xs="6">-->
<!--                <el-select  v-model="form.region"  size="mini" placeholder="查询类型">-->
<!--                    <el-option label="111" value="shanghai"></el-option>-->
<!--                    <el-option label="222" value="beijing"></el-option>-->
<!--                </el-select>-->
<!--            </el-col>-->
            <el-col :span="2" :xs="10">
                <el-input v-model="form.name" placeholder="请输入登录名"  size="mini"></el-input>
            </el-col>
<!--            <el-col :span="2" :xs="6">-->
<!--                <el-select v-model="form.condition"  size="mini" placeholder="状态" >-->
<!--                    <el-option label="111" value="shanghai"></el-option>-->
<!--                    <el-option label="222" value="beijing"></el-option>-->
<!--                </el-select>-->
<!--            </el-col>-->
            <el-col :span="2">
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
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="登录名"
            prop="spMerchantLoginName"
            >
            </el-table-column>
<!--            <el-table-column-->
<!--            prop="spMerchantType"-->
<!--            label="类型">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--            label="昵称"-->
<!--            prop="spMerchantNickName"-->
<!--            >-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--            prop="spMerchantMobile"-->
<!--            label="电话">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--            label="邮箱"-->
<!--            prop="spMerchantEmail"-->
<!--            >-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--            prop="date"-->
<!--            label="是否扣量">-->
<!--            </el-table-column>-->
<!--           <el-table-column-->
<!--             prop="spCreateDate"-->
<!--             label="扣量日期">-->
<!--           </el-table-column>-->
           <el-table-column
             label="状态"
             prop="spMerchantStatus"
           >
           </el-table-column>
            <el-table-column
            label="备注"
            prop="spMerchantStatus"
            >
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作"
            width="180px"
            align="right">
            <template slot="header">
              <nuxt-link to="/home/addditch">
                <el-button type="primary" icon="el-icon-plus" size="mini" plain>添加</el-button>
              </nuxt-link>
            </template>
            <template slot-scope="scope" >
                <el-button
                    size="mini"
                    icon="el-icon-edit"
                    @click="compile(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="deleteRow(scope.$index, scope.row)" plain>删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 分业 -->
        <el-row class="Pagination">
<!--            <el-col :span="8" :xs="24">-->
<!--                      <el-row class="Pagination">-->
<!--                        <el-col :span="5" :xs="6">-->
<!--                            <el-button @click="toggleSelect(list)" size="mini">全选/反选</el-button>-->
<!--                        </el-col>-->
<!--                        <el-col :span="5" :xs="6">-->
<!--                            <el-button size="mini" @click="frozenOrThaw(1)" icon="el-icon-lock">冻 结</el-button>-->
<!--                        </el-col>-->
<!--                        <el-col :span="5" :xs="7">-->
<!--                            <el-button size="mini" @click="frozenOrThaw(0)" icon="el-icon-unlock">解 冻</el-button>    -->
<!--                        </el-col>-->
<!--                        <el-col :span="5" :xs="7">-->
<!--                            <el-button size="mini" icon="el-icon-brush">密码初始</el-button>-->
<!--                        </el-col>-->
<!--                        <el-col :span="4" :xs="6">-->
<!--                            <el-button type="danger" size="mini" icon="el-icon-delete" @click="qxDete" plain>删除</el-button>-->
<!--                        </el-col>-->
<!--                      </el-row>-->
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
            txtone:"渠道管理",
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
            list: [],
            search: '',
          ids:[],
          rowIsSelected:0,
        }
    },
    methods:{
      onSubmit() {
        console.log('submit!');
      },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.present=val;
        this.ditch();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.number=val;
        this.ditch();
      },
        //全选
      toggleSelect(rows) {
        let _this = this;
        _this.ids = [];
        if(_this.rowIsSelected==0){
          _this.rowIsSelected = 1;
        }else{
          _this.rowIsSelected = 0;
        }
        if (rows) {
          rows.forEach(row => {
            if(_this.rowIsSelected==1){
              _this.ids.push(row.id);
            }else{
              _this.ids = [];
            }
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          _this.ids = [];
          this.$refs.multipleTable.clearSelection();
        }
        console.log(_this.ids);
      },
       //获取全选的key
      selectionRowsChange(val){
        console.log(val);
      },
      //冻结/解冻
      frozenOrThaw:function(status){
        let _this = this;
        let url = window.g.merchant;
        var _param = new URLSearchParams();
        _param.append("status",status);
        _param.append("ids",_this.ids);
        Axios.post(url+'/enables',_param).then(function(value){
          console.log(value);
        }).catch(function(res){
          console.log(res);
        });
      },
      //删除当前一行
    async  deleteRow(index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

               const api = window.g.merchantdelete;
                const date = new URLSearchParams();
                      date.append("spIsDelete","1");
                      date.append("id",rows.id)
                Axios.post(api,date).then((res)=>{
                  console.log(res);
                  this.ditch();
                }).catch((err)=>{
                  console.log(err);
                });

              this.$message({
                type: 'success',
                message: '删除成功!',
              });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 编辑
      compile(index, rows){
        console.log(rows);
        this.$router.push({path:'/home/addditch',query: {id:rows.id}})
      },
      //删除选中数据
      merchantdelete(index, rows){
        const api = window.g.merchantdelete;
        const date = new URLSearchParams();
              date.append("spIsDelete","1");
              date.append("id",rows.id)
        Axios.post(api,date).then((res)=>{
          console.log(res);
          this.ditch();
        }).catch((err)=>{
          console.log(err);
        })
        console.log("删除选中数据");
      },
      // 批量删除
      qxDete(){

      },
     //   搜索
      seekdithc(){
        this.ditch();
        // console.log(this.form);
      },
      // 获取数据
      ditch(){
        const api = window.g.merchant;
        const date ={
            params:{
                current:this.number,
                size:this.present,
              spMerchantLoginName:this.form.name,
            }
        }
        Axios.get(api,date).then((res)=>{
          console.log(res)
          this.list=res.data.records;
          this.branches = res.data.total;
          this.current = res.current;
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    mounted(){
      this.txtTwo = storage.get("linktxt");
      this.ditch();
    }
}

</script>

<style lang="stylus" scoped>
  .search
   padding 1% 0%   
  .el-input__inner 
   width 90% !important
  .ditch
    background #ffffff
    padding 1%
  .ditch .el-form
    margin 2% 4%
    width 50%
    text-align left   
   .Pagination
    margin-top 1%
</style>
