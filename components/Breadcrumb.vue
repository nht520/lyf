<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{txtone}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{txtTwo}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props:["txtone","txtTwo"],
    data(){
        return{

        }
    }
}
</script>

<style lang="stylus" scoped>

</style>

