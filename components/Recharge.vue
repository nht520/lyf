<template>
    <div>
    <!-- 补量 -->
      <v-layout row justify-center>
        <v-dialog v-model="dialog"  max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">扣量操作</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
<!--                    <p>{{bsid}}</p>-->

                                        <v-text-field label="*结算标识" v-model="name" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="*补量金额" v-model="citry"  required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="*操作密码" v-model="password" type="password"  required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <!-- <small>*indicates required field</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">取消</v-btn>
              <v-btn color="blue darken-1" flat @click="submit">提交</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </div>
</template>

<script>
  import Axios from 'axios';
export default {
    props: {
      bsid: String,
    },
    data(){
        return{
            dialog: false,
            name:"",
            citry:"",
            password:"",
        }
    },
    methods:{
        open(){
            this.dialog=true;
        },
        submit(){
          let url = window.g.channelearnings+'/supplementary';
          let _this = this;
          let _param = new URLSearchParams();
          _param.append("id",this.bsid);
          _param.append("password",_this.password);
          _param.append("supplementaryAmount",_this.citry);
          Axios.post(url,_param).then(function(value){
            if(value.data.code==200){
              _this.dialog=false;
            }
            console.log(value)}).catch(function(res){console.log(res)});
            console.log(this.bsid);

        }
    },
    mounted(){
      // console.log(this.bsid+"111");
    }
}
</script>

<style>

</style>
