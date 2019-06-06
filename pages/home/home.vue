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
    <div class="home">
         <!-- 统计+ -->
             <!-- 用户量 -->
         <h5>最近3天用户下单统计</h5>
         <ve-line :data="chartData" class="homchaert"></ve-line>
    </div>
    <div class="home">
         <!-- 流水 -->
         <h5>最近3天流水分析</h5>
         <ve-histogram :data="running"></ve-histogram>
    </div>
  </div>
    
</template>

<script>
export default {
    // 页面切换动画
    transition:"transleft",
    components:{
    },
    data(){
        return{
            chartData: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    { '日期': '1', '访问用户': 1393, '下单用户': 1093, '下单率': 132 },
                    { '日期': '2', '访问用户': 3530, '下单用户': 3230, '下单率': 226 },
                    { '日期': '3', '访问用户': 2923, '下单用户': 2623, '下单率': 776 },
                    { '日期': '4', '访问用户': 1723, '下单用户': 1423, '下单率': 449 },
                    { '日期': '5', '访问用户': 3792, '下单用户': 3492, '下单率': 3323 },
                    { '日期': '6', '访问用户': 4593, '下单用户': 4293, '下单率': 778 },
                    { '日期': '7', '访问用户': 1723, '下单用户': 1423, '下单率': 449 },
                    { '日期': '8', '访问用户': 3792, '下单用户': 3492, '下单率': 3323 },
                    { '日期': '9', '访问用户': 4593, '下单用户': 4293, '下单率': 778 }
                ]
            },
            running: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    { '日期': '1', '访问用户': 1393, '下单用户': 1093, '下单率': 1000 },
                    { '日期': '2', '访问用户': 3530, '下单用户': 3230, '下单率': 1500 },
                    { '日期': '3', '访问用户': 2923, '下单用户': 2623, '下单率': 2000 },
                    { '日期': '4', '访问用户': 1723, '下单用户': 1423, '下单率': 1800 },
                    { '日期': '5', '访问用户': 3792, '下单用户': 3492, '下单率': 1400 },
                    { '日期': '6', '访问用户': 4593, '下单用户': 493, '下单率': 2200 },
                    { '日期': '7', '访问用户': 3530, '下单用户': 3230, '下单率': 150 },
                    { '日期': '8', '访问用户': 293, '下单用户': 263, '下单率': 2000 },
                    { '日期': '9', '访问用户': 1723, '下单用户': 1423, '下单率': 800 },
                    { '日期': '10', '访问用户': 372, '下单用户': 392, '下单率': 100 },
                    { '日期': '11', '访问用户': 4593, '下单用户': 293, '下单率': 200 }
                ]
            }
        }
    },
    methods:{

    },
    mounted(){
        
    }
}
</script>
<style lang="stylus" scoped>
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
