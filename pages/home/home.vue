<template>
  <div>
        <div class="home">
         <!-- 统计+ -->
         <h5>设备统计</h5>
         <el-row class="statistics"  :gutter="15">
            <el-col :span="4" :offset="1">
                <el-row class="search1"  :gutter="15">
                    <el-col :span="10">
                        <h2>100</h2>
                        <h6>网页UV量</h6>    
                    </el-col>
                    <el-col :span="14">
                         <v-icon>language</v-icon>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="4" :offset="2">
                <el-row class="search2" :gutter="15">
                    <el-col :span="10">
                        <h2>100</h2>
                        <h6>设备安装量</h6>    
                    </el-col>
                    <el-col :span="14">
                         <v-icon>settings_cell</v-icon>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="4" :offset="2">
                <el-row class="search3"  :gutter="15">
                    <el-col :span="10">
                        <h2>100</h2>
                        <h6>设备有效量</h6>    
                    </el-col>
                    <el-col :span="14">
                         <v-icon>visibility</v-icon>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="4" :offset="2">
                <el-row class="search4" :gutter="15">
                    <el-col :span="10">
                        <h2>100</h2>
                        <h6>设备无效量</h6>     
                    </el-col>
                    <el-col :span="14">
                         <v-icon>visibility_off</v-icon>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    <!-- <div class="home">
        <h5>最近3天流水分析</h5>
        <ve-line :data="running" class="homchaert"></ve-line>
    </div> -->
    <div class="home">
         <!-- 流水 -->
        <h5>最近3天流水分析</h5>
        <ve-line :data="running" class="homchaert"></ve-line>
    </div>
    <div class="home">
        <!-- 用户量 -->
        <h5>今日用户下单统计</h5>
        <ve-histogram :data="chartData"></ve-histogram>
    </div>
  </div>
    
</template>

<script>
  import Axios from "axios";
export default {
    // 页面切换动画
    transition:"transleft",
    components:{
    },
    data(){
        return{
            chartData: {
                columns: ['date', '访问用户', '下单用户'],
                rows: [
                    // { 'date': '1', '访问用户': 1393, '下单用户': 1093},
                    // { 'date': '2', '访问用户': 3530, '下单用户': 3230 },
                    // { 'date': '3', '访问用户': 2923, '下单用户': 2623},
                    // { 'date': '4', '访问用户': 1723, '下单用户': 1423 },
                    // { 'date': '5', '访问用户': 3792, '下单用户': 3492},
                    // { 'date': '6', '访问用户': 4593, '下单用户': 4293 },
                    // { 'date': '7', '访问用户': 1723, '下单用户': 1423},
                    // { 'date': '8', '访问用户': 3792, '下单用户': 3492 },
                    // { 'date': '9', '访问用户': 4593, '下单用户': 4293},
                    // { 'date': '10', '访问用户': 1393, '下单用户': 1093 },
                    // { 'date': '11', '访问用户': 1313, '下单用户': 1093},
                    // { 'date': '12', '访问用户': 3530, '下单用户': 3230 },
                    // { 'date': '13', '访问用户': 2923, '下单用户': 2623 },
                    // { 'date': '14', '访问用户': 1723, '下单用户': 1423 },
                    // { 'date': '15', '访问用户': 3792, '下单用户': 3492 },
                    // { 'date': '16', '访问用户': 4593, '下单用户': 4293 },
                    // { 'date': '17', '访问用户': 1723, '下单用户': 1423},
                    // { 'date': '18', '访问用户': 3792, '下单用户': 3492},
                    // { 'date': '19', '访问用户': 4593, '下单用户': 4293},
                    // {'date': '20', '访问用户': 4593, '下单用户': 4293 },
                    // { 'date': '21', '访问用户': 4593, '下单用户': 4293 },
                    // { 'date': '22', '访问用户': 4593, '下单用户': 4293 },
                    // { 'date': '23', '访问用户': 4593, '下单用户': 4293}

                ]
            },
            running: {
                columns: ['date', '前日流水', '昨日流水', '今日流水'],
                rows: [
                  //   { 'date': '00', '前日流水': 1393, '昨日流水': 1093, '今日流水': 132 },
                  //   { 'date': '01', '前日流水': 1393, '昨日流水': 1093, '今日流水': 132 },
                  //   { 'date': '02', '前日流水': 3530, '昨日流水': 3230, '今日流水': 226 },
                  //   { 'date': '03', '前日流水': 2923, '昨日流水': 2623, '今日流水': 776 },
                  //   { 'date': '04', '前日流水': 1723, '昨日流水': 1423, '今日流水': 449 },
                  //   { 'date': '05', '前日流水': 3792, '昨日流水': 3492, '今日流水': 3323 },
                  //   { 'date': '06', '前日流水': 4593, '昨日流水': 4293, '今日流水': 778 },
                  //   { 'date': '07', '前日流水': 1723, '昨日流水': 1423, '今日流水': 449 },
                  //   { 'date': '08', '前日流水': 3792, '昨日流水': 3492, '今日流水': 3323 },
                  //   { 'date': '09', '前日流水': 4593, '昨日流水': 4293, '今日流水': 778 },
                  //   { 'date': '10', '前日流水': 1393, '昨日流水': 1093, '今日流水': 132 },
                  //   { 'date': '11', '前日流水': 1313, '昨日流水': 1093, '今日流水': 132 },
                  //   { 'date': '12', '前日流水': 3530, '昨日流水': 3230, '今日流水': 226 },
                  //   { 'date': '13', '前日流水': 2923, '昨日流水': 2623, '今日流水': 776 },
                  //   { 'date': '14', '前日流水': 1723, '昨日流水': 1423, '今日流水': 449 },
                  //   { 'date': '15', '前日流水': 3792, '昨日流水': 3492, '今日流水': 3323 },
                  //   { 'date': '16', '前日流水': 4593, '昨日流水': 4293, '今日流水': 778 },
                  //   { 'date': '17', '前日流水': 1723, '昨日流水': 1423, '今日流水': 449 },
                  //   { 'date': '18', '前日流水': 3792, '昨日流水': 3492, '今日流水': 3323 },
                  //   { 'date': '19', '前日流水': 4593, '昨日流水': 4293, '今日流水': 778 },
                  // {'date': '20', '前日流水': 4593, '昨日流水': 4293, '今日流水': 778 },
                  // { 'date': '21', '前日流水': 4593, '昨日流水': 4293, '今日流水': 778 },
                  // { 'date': '22', '前日流水': 4593, '昨日流水': 4293, '今日流水': 778 },
                  // { 'date': '23', '前日流水': 4593, '昨日流水': 4293, '今日流水': 778 }
                ]
            },

        }
    },
    methods:{
      //得到最近3日24小时流水
      getLatelyDayData:function(){
        let url = window.g.latelyDayData;
        let _this = this;
        Axios.get(url).then(function(value){
          let data = value.data.data;
          for(let i = 0;i<data.length;i++){
            let json = { 'date': data[i].date, '前日流水': data[i].firstDay, '昨日流水': data[i].twoDay, '今日流水': data[i].threeDay };
            _this.running.rows.push(json);
          }
        }).catch(function(res){
          console.log("======近3日流水=====");
          console.log(res);
        })
      },
      //今日用户下单统计
      getTodayOrder:function(){
        let url = window.g.todayOrder;
        let _this = this;
        Axios.get(url).then(function(value) {
          console.log(value);
          let data = value.data.data;
          for(let i = 0;i<data.length;i++){
            console.log(data[i]);
            let json = { 'date':data[i].date, '访问用户': data[i].accessUsers, '下单用户': data[i].orderUsers};
            _this.chartData.rows.push(json);
          }
        }).then(function(res){
          console.log("======今日下单统计=====");
          console.log(res);
        })
      },
    },
    mounted(){
      this.getLatelyDayData();
      this.getTodayOrder();
    }
}
</script>
<style lang="stylus" scoped>
.running 
    margin 1% 0%
.running h5 
    padding 1%
    text-align left
.running .el-col-16
    background #ffffff
    padding 1%  
.running .el-col-7
    background #ffffff
    padding 1%      
.home
 background #ffffff
 padding 1%
 margin-bottom 1%
.home h5  
 text-align left 
 padding 1%
.homchaert
 width 100% !important 
.statistics
 margin 1% 0%
.statistics .v-icon 
    font-size 40px
    color #ffffff
    margin-top 10%
.statistics .search1
    background #19d4ae
    padding 5% 1%
    text-align center
    color #ffff
    border-radius 5px;
.statistics .search2
    background #5ab1ef
    padding 5% 1%
    text-align center
    color #ffff
    border-radius 5px;
.statistics .search3
    background #fa6e86
    padding 5% 1%
    text-align center
    color #ffff
    border-radius 5px;
.statistics .search4
    background #9076ff
    padding 5% 1%
    text-align center
    color #ffff
    border-radius 5px;
</style>
