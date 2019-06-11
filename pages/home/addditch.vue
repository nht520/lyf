<template>
    <div class="additch">
        <!-- 面包屑 -->
        <Breadcrumb :txtone="txtone" :txtTwo="txtTwo"></Breadcrumb>
        <!-- 内容 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="second">
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="*用户名">
                    <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="*密码">
                    <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="*渠道类型">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="普通"></el-radio>
                            <el-radio label="代理"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="代理渠道">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option v-for="item in form.regionone" :label="item" :value="item" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="*昵称">
                    <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="*电话">
                    <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="*邮件">
                    <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="*状态">
                        <el-switch
                            v-model="form.value"
                            active-color="#13ce66"
                            inactive-color="#dddddd">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="onSubmit" plain>立即创建</el-button>
                    <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="银行信息" name="first">
                <el-form ref="form" :model="form" label-width="150px" >
                    <el-form-item label="*开户银行">
                    <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="*收款人">
                    <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="*银行账号">
                    <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="*银行地址">
                    <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="onSubmit" plain>立即创建</el-button>
                    <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb'; 
import storage from '~~/plugins/storage';
export default {
    components:{
        Breadcrumb
    },
    data(){
        return{
         activeName: 'second',
         txtone:"渠道管理",
         txtTwo:"添加渠道",
            form: {
                name: '',
                region: '',
                regionone:["1","2","3"],
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log(this.form);
      }
    },
    mounted(){
      
    }
}
</script>

<style lang="stylus" scoped>
    .additch
     background #ffffff
     padding 1%
    .additch .el-tabs
     margin-top 1% 
    .additch .el-form
     margin 2% 4%
     width 50%
     text-align left  
</style>

