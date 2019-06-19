<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{txtone}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{txtTwo}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-page-header @back="goBack()" :content="txtTwo" size="mini"></el-page-header> -->
    </div>
</template>

<script>
export default {
    props:["txtone","txtTwo"],
    data(){
        return{

        }
    },
    methods:{
    //  goBack() {
    //     console.log('go back详情页面');
    //   }
    },
    mounted(){

    }
}
</script>

<style lang="stylus" scoped>

</style>

