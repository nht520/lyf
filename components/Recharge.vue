<template>
    <div>
    <!-- 补量 -->
      <v-layout row justify-center>
        <v-dialog v-model="dialog"  max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">补量操作</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
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
export default {
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
            console.log(this.name)
            this.dialog=false;
        }
    },
    mounted(){

    }
}
</script>

<style>

</style>
