<template>
    <div class="dialogs">
        <v-layout row justify-center>
            <v-dialog
            v-model="dialog"
            max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">{{hedTitle}}</v-card-title>
                    <v-card-text>
                    {{text}}
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="dialog = false"
                    >
                        取消
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="dialog = false"
                    >
                        确定
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name:"Dialogs",
        props:["text","hedTitle"],
        data(){
            return{
                title:"我是dialogs组件",
                 dialog: false
            }
        },
        methods:{
            nuxtDialog(){
                this.dialog=true
            }
        }

    }
</script>

<style lang="stylus">
    .headline
     font-size 16px !important
    .v-dialog__content--active
     background rgba(0,0,0,0.5)
    .dialogs .theme--light
     border-radius 5px
    .v-dialog
     box-shadow 0px 11px 15px -7px rgba(0,0,0,0.0), 0px 24px 38px 3px rgba(0,0,0,0.0), 0px 9px 46px 8px rgba(0,0,0,0.0)
    
</style>
