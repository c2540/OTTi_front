<template>
    <div class="container">
        <div class="nav">
            <p style="color:white;display:inline-block; padding:3px 10px; border-radius:10px;margin-bottom:50px;
                font-weight:bold; font-size: 30px; text-decoration: none;">마이페이지</p>
            <br />
            <v-btn v-if="state.menu === 1" @click="state.menu = 1" class="btn_sel">프로필사진 변경</v-btn> 
            <v-btn v-else @click="state.menu = 1" class="btn">프로필사진 변경</v-btn> <br/>
            <v-btn v-if="state.menu === 2" @click="state.menu = 2" class="btn_sel">회원정보 변경</v-btn>
            <v-btn v-else @click="state.menu = 2" class="btn">회원정보 변경</v-btn> <br/>
            <v-btn v-if="state.menu === 3" @click="state.menu = 3" class="btn_sel">비밀번호 변경</v-btn> 
            <v-btn v-else-if="state.social === 'normal'" @click="state.menu = 3" class="btn">비밀번호 변경</v-btn> <br v-if="state.social === 'normal'"/>
            <v-btn v-if="state.menu === 4" @click="state.menu = 4" class="btn_sel">회원탈퇴</v-btn> 
            <v-btn v-else @click="state.menu = 4" class="btn">회원탈퇴</v-btn> <br/>
        </div>
        <div class="contentbox">
            <menu-1 v-if="state.menu === 1" title="프로필관리" ></menu-1>
            <menu-2 v-if="state.menu === 2" title="회원정보수정"></menu-2>
            <menu-3 v-if="state.menu === 3" title="비밀번호변경"></menu-3>
            <menu-4 v-if="state.menu === 4" title="회원탈퇴"></menu-4>
        </div>
    </div>
</template>

<script>
import Menu1 from './user/ProfilePage.vue';
import Menu2 from './user/MemberUpdatePage.vue';
import Menu3 from './user/PasswordUpdatePage.vue';
import Menu4 from './user/MemberOutPage.vue';
import { computed, reactive } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    components : {
        Menu1,
        Menu2,
        Menu3,
        Menu4,
    },

    setup () {
        const store = useStore();
        const state = reactive({
            social : computed(() => store.getters.getSocial),
            menu : 1
        })
        return {state}
    }
}
</script>

<style lang="css" scoped>
    .container {
        display: grid;
        grid-template-columns: 3fr 6fr  1fr ;
        padding:30px;
        margin-bottom: 10px;
        
    }
    .contentbox{
        background-color:rgba(255, 255, 255, 0.5);
        padding:50px;
        border-radius: 10px;
        margin-bottom: 10px;
        min-width: 700px;
    }
    .nav{
        padding:50px;
        border-radius: 10px;
        margin-bottom: 10px;
        margin-right: 10px;
        text-align: center;
        left: 0;
    }
    .btn{
        background-color:rgba(200, 200, 200, 0.5);
        margin:15px;
        border-radius:10px;
        color:white;
        width: 70%;
    }
    .btn_sel{
        background-color:royalblue;
        margin:15px;
        border-radius:10px;
        color:white;
        width: 75%;
    }
</style>