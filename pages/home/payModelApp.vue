<template>
  <div class="convention">
    <!-- 面包屑 -->
    <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
    <!-- 内容 -->
    <div class="conttab">
      <el-row class="search" :model="form" :gutter="15">
        <el-col :span="4" :xs="6">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="createJson()" plain>生成静态文件</el-button>
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
          label="编号">
        </el-table-column>
        <el-table-column
          prop="modelName"
          label="模式名称">
        </el-table-column>
        <el-table-column
          label="模式提示"
          prop="modelTips"
        >
        </el-table-column>
        <el-table-column
          label="是否默认"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isDefault==0">是</div>
            <div v-if="scope.row.isDefault==1">否</div>
          </template>
        </el-table-column>
        <el-table-column
          label="模式类型"
          prop="modelType"
        >
        </el-table-column>
        <el-table-column
          label="模式排序"
          prop="modelSort"
        >
        </el-table-column>
        <el-table-column
          label="是否显示"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.isDisable==0">是</div>
            <div v-if="scope.row.isDisable==1">否</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="openDiagnosis(scope.row)" type="text" size="small">设置</el-button>
            <el-button @click="setDefault(scope.row)" type="text" size="small">默认</el-button>
            <el-button v-if="scope.row.isDisable==1" @click="setDisable(scope.row,0)" type="text" size="small">显示</el-button>
            <el-button v-if="scope.row.isDisable==0" @click="setDisable(scope.row,1)" type="text" size="small">不显示</el-button>
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
      width="70%"
      :before-close="handleClose">
      <div class="channe">
        <el-row :gutter="20">
          <el-row :gutter="20">
            <el-col :span="5" :offset="1" :xs="8">
              模式名称:
            </el-col>
            <el-col :span="17" :xs="14">
              <el-input v-model="modelName" placeholder="请输模式名称"></el-input>
            </el-col>
          </el-row>
          <el-col :span="5" :offset="1" :xs="8">
            模式提示:
          </el-col>
          <el-col :span="17" :xs="14">
            <el-input v-model="modelTips" placeholder="请输入模式提示"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1" :xs="8">
            模式排序:
          </el-col>
          <el-col :span="17" :xs="14">
            <el-input  v-model="modelSort" value="是"  placeholder="请输入模式排序"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1" :xs="8">
            是否默认:
          </el-col>
          <el-col :span="17" :xs="14">
            <el-input v-if="isDefault==0" value="是" disabled="true" ></el-input>
            <el-input v-if="isDefault==1" value="否" disabled="true" ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5" :offset="1" :xs="8">
            模式类型
          </el-col>
          <el-col :span="17" :xs="14">
            <el-input v-model="modelType" disabled="true" ></el-input>
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
        },
        id:'',
        modelName:'',
        modelTips:'',
        isDefault:'',
        modelType:'',
        modelSort:'',
        dialogVisible:false,
        hedTitle:"",
        text:"",
        list: [ ],
        search: '',
        current:0,
        brtotal:0,

      }
    },
    methods:{
      openDiagnosis(row){
        console.log(row);
        this.id = row.id;
        this.modelName = row.modelName;
        this.modelTips = row.modelTips;
        this.isDefault = row.isDefault;
        this.modelType = row.modelType;
        this.modelSort = row.modelSort;
        this.dialogVisible = true;
      },
      //弹出层
      handleClose(done) {
        this.dialogVisible = false;
      },
      selectionRowsChange(val){
        console.log(val);
      },
      createJson(){
        const api = window.g.payModelApp +'/createJson';
        Axios.post(api).then((res)=>{
          alert("生成成功");
        }).catch((err)=>{
          console.log(err);
        })
      },
      getData(){
        let _this = this;
        let api = window.g.payModelApp;
        const date ={
          params:{
          }
        }
        _this.list = [];
        Axios.get(api,date).then(function(res){
          let data = res.data.records;
          console.log(res);
          _this.list = data;
        })
          .catch(function(err){
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
      update(){
        const api = window.g.payModelApp +'/update';
        let param= new URLSearchParams();
        param.append("id",this.id);
        param.append("modelName",this.modelName);
        param.append("modelTips",this.modelTips);
        param.append("modelSort",this.modelSort);
        Axios.post(api,param).then((res)=>{
          console.log(res);
          this.getData();
          this.dialogVisible = false;
        }).catch((err)=>{
          console.log(err);
        })
      },
      setDefault(row){
        const api = window.g.payModelApp +'/setDefault';
        let param= new URLSearchParams();
        param.append("id",row.id);
        Axios.post(api,param).then((res)=>{
          console.log(res);
          this.getData();
          this.dialogVisible = false;
        }).catch((err)=>{
          console.log(err);
        })
      },
      setDisable(row,isDisable){
        const api = window.g.payModelApp +'/update';
        let param= new URLSearchParams();
        param.append("id",row.id);
        param.append("isDisable",isDisable);
        Axios.post(api,param).then((res)=>{
          console.log(res);
          this.getData();
          this.dialogVisible = false;
        }).catch((err)=>{
          console.log(err);
        })
      }
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
  .channe .el-col-5
    text-align right
</style>

