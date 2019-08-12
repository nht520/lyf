<template>
    <div>
        <div class="text-xs-center">
            <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="225"
            offset-x
            >
            <v-card>
                <v-list>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{nickname}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{aduser}}</v-list-tile-sub-title>
                    </v-list-tile-content>
<!-- 
                    <v-list-tile-action>
                        <v-btn
                            :class="fav ? 'red--text' : ''"
                            icon
                            @click="fav = !fav"
                        >
                            <v-icon>favorite</v-icon>
                        </v-btn>
                    </v-list-tile-action> -->
                </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <!-- <v-list>
                    <v-list-tile>
                        <v-list-tile-action>
                            <v-switch v-model="message" color="purple"></v-switch>
                        </v-list-tile-action>
                        <v-list-tile-title>11111</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                        <v-switch v-model="hints" color="purple"></v-switch>
                        </v-list-tile-action>
                        <v-list-tile-title>2222</v-list-tile-title>
                    </v-list-tile>
                </v-list>
                 -->
                <v-list>
                    <v-list-tile>
                        <v-list-tile-action>
                            邮 箱:
                        </v-list-tile-action>
                        <v-list-tile-title>{{email}}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-action>
                            电 话:
                        </v-list-tile-action>
                        <v-list-tile-title>{{phone}}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="menu = false">取消</v-btn>
                <v-btn color="primary" flat @click="quit()">退出</v-btn>
                </v-card-actions>
            </v-card>
            </v-menu>
        </div>
    </div>
</template>

<script>
import storage from '~~/plugins/storage';
export default {
    data(){
        return{
            fav: true,
            menu: false,
            message: false,
            hints: true,
            nickname:"",
            aduser:"",
            email:"",
            phone:"",
        }
    },
    methods:{
        tishi(){
          this.menu=true;
        },
        quit(){
            this.menu=false;
            storage.remove("user");
            this.$router.push({path:'/'});
        },
        // 获取用户资料
        user(){
            this.user = storage.get("user");
            this.nickname = this.user.nickname;
            this.aduser = this.user.username;
            this.email = this.user.email;
            this.phone = this.user.phone;
        }
    },
    mounted(){
        this.user();
    }
}
</script>
<style lang="stylus" scoped>
.v-menu__content
 right 250px
 left 87% !important
 top 65px !important
 box-shadow 0 2px 4px -1px rgba(199,203,255,0.2), 0 4px 5px 0 rgba(221,228,255,0.14), 0 1px 10px 0 rgba(206,207,255,0.12)
</style>

