<template>
    <div class="convention">
      <!-- 面包屑 -->
      <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
      <!-- 内容 -->
      <div class="conttab">
        <el-row class="search" :model="form" :gutter="15">
            <el-col :span="2">
                <el-select v-model="form.condition"  size="small" placeholder="请选择渠道" >
                    <el-option label="111" value="shanghai"></el-option>
                    <el-option label="222" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-select v-model="form.condition"  size="small" placeholder="请选择代理渠道" >
                    <el-option label="111" value="shanghai"></el-option>
                    <el-option label="222" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-select v-model="form.condition"  size="small" placeholder="结算状态" >
                    <el-option label="111" value="shanghai"></el-option>
                    <el-option label="222" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" size="small"></el-date-picker>
            </el-col>
            <el-col :span="2">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;" size="small"></el-date-picker>
            </el-col>
            <el-col :span="2">
               <el-button type="primary" icon="el-icon-search" size="small" @click="seekdithc()" plain>搜索</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
           <el-table
            :data="tableData"
            border
            show-summary
            @selection-change="selectionRowsChange" 
            ref="multipleTable"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="渠道名称">
            </el-table-column>
            <el-table-column
              prop="name"
              label="渠道账户">
            </el-table-column>
            <el-table-column
              prop="amount1"
              sortable
              label="请求量">
            </el-table-column>
            <el-table-column
              prop="amount2"
              sortable
              label="成功量">
            </el-table-column>
            <el-table-column
              prop="amount3"
              sortable
              label="收益">
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="安装量">
            </el-table-column>
            <el-table-column
              prop="amount5"
              sortable
              label="活跃量">
            </el-table-column>
            <el-table-column
              prop="amount6"
              sortable
              label="补量金额">
            </el-table-column>
            <el-table-column
              prop="amount7"
              sortable
              label="AP">
            </el-table-column>
            <el-table-column
              prop="name"
              label="状态">
            </el-table-column>
            <el-table-column
              label="操作"
              >
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    icon="el-icon-edit"
                    @click="open(scope.row)"
                >补量</el-button>
              </template>
            </el-table-column>
          </el-table>
        <!-- 分业 -->
        <el-row class="Pagination">
            <el-col :span="5">
                <el-button @click="toggleSelect(tableData)" size="mini">全选/反选</el-button>
                <el-button  size="mini">批量结算</el-button>
                <!-- <el-button type="danger" size="mini" @click="qxDete" >删除</el-button> -->
            </el-col>
            <el-col :span="14" :offset="5">
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
      <!-- 补量 -->
      <Recharge ref="recharge"></Recharge>
    </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb'; 
import Recharge from '../../components/Recharge'; 
import storage from '~~/plugins/storage';
export default {
    // 页面切换动画
    transition:"transleft",
    components:{
      Breadcrumb,Recharge
    },
    data(){
        return{
            txtone:"统计分析",
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
                id: '12987122',
                name: '王小虎',
                amount1: '234',
                amount2: '3.2',
                amount3: '10.1',
                amount4: '10.2',
                amount5: '11.3',
                amount6: '5.3',
                amount7: '1.5',
              }, {
                id: '12987123',
                name: '王小虎',
                amount1: '165',
                amount2: '4.43',
                amount3: 12,
                amount4: 10,
                amount5: 11,
                amount6: 5,
                amount7: 1,
              }, {
                id: '12987124',
                name: '王小虎',
                amount1: '324',
                amount2: '1.9',
                amount3: 9,
                amount4: 10,
                amount5: 11,
                amount6: 5,
                amount7: 1,
              }, {
                id: '12987125',
                name: '王小虎',
                amount1: '621',
                amount2: '2.2',
                amount3: 17,
                amount4: 10,
                amount5: 11,
                amount6: 5,
                amount7: 1,
              }, {
                id: '12987126',
                name: '王小虎',
                amount1: '539',
                amount2: '4.1',
                amount3: 15,
                amount4: 10,
                amount5: 11,
                amount6: 5,
                amount7: 1,
              }],
              search: ''
        }
    },
    methods:{
      // 补量
      open(e) {
        console.log(e);
        this.$refs.recharge.open();
      },
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
