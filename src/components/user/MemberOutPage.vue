<template>
    <div style="background-color:rgba(255, 255, 255, 0.4); margin:2px; border-radius:10px; padding:25px;">
        <h2>회원탈퇴</h2><br />
        <div>
            <label style="font-weight:bold">비밀번호</label><br />
            <p style="font-size:small">소셜회원일 경우 입력란에 "password"를 입력해주세요.</p>
            <input type="password" class="in" v-model="state.pw"/><br />
        </div>
        <label style="font-weight:bold">탈퇴확인</label>
        <br /><span style="font-size:large; color:red; font-weight:bold">!</span>
        <span style="font-size:small"> 한번 탈퇴하면 계정정보를 다시 되돌릴 수 없습니다.</span>
        <br /><span style="font-size:small">정말 탈퇴하려면 아래에 "</span><span style="font-size:small; font-weight:bold">탈퇴하겠습니다</span><span style="font-size:small">"를 입력해 주세요.</span>
        <input type="text" class="in" v-model="state.deleteok" /><br />
        <v-btn @click="handleDelete" style="background-color:rgba(0, 0, 0, 0.2); margin:2px; border-radius:10px; color:white;">회원탈퇴</v-btn>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, getCurrentInstance } from '@vue/runtime-core';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const router =useRouter();
        const state = reactive({
            social : computed(() => store.getters.getSocial),
            pw : '',
            deleteok : '',
            token : sessionStorage.getItem("token"),
        });
        
        const handleDelete = async() =>{
            if(state.pw === "password" && state.social === "naver"){
                state.pw = "null"
            }
            if(state.pw === "password" && state.social === "kakao"){
                state.pw = "null"
            }
            if(state.pw === ""){
                alert("비밀번호를 입력해주세요.")
                return false;
            }
            if(state.deleteok === ""){
                alert("탈퇴 문구를 입력해주세요.")
                return false;
            }
            if(state.deleteok != "탈퇴하겠습니다"){
                alert("탈퇴 문구가 올바르지 않습니다.")
                return false;
            }
            if(!confirm('정말 탈퇴하시겠습니까?')){
                alert("탈퇴가 취소되었습니다.")
                return false;
            }
            const url = `${proxy.foo}/member/delete.json`;
            const headers = {"Content-Type" : "application/json",
                        "TOKEN" : state.token            
            };
            const body = {
                userpw: state.pw,
            };
            const {data} = await axios.delete(url, {headers:headers, data:body});
            if(data.result===1){
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("role");
                sessionStorage.removeItem("ban");
                sessionStorage.removeItem("imageno");
                sessionStorage.removeItem("nickname");
                sessionStorage.removeItem("social");
                store.commit('setLogged', false);
                store.commit('setRole', null);
                store.commit('setBan', null);
                store.commit('setToken', null);
                store.commit('setImageno', null);
                store.commit('setNickname', null);
                store.commit('setSocial', null);
                alert('회원탈퇴가 완료되었습니다.')
                router.push({path:'/'});
            }
            else{
                alert("비밀번호가 올바르지 않습니다.")
            }
        };

        return {state,handleDelete}
    }
}
</script>

<style lang="css" scoped>
.in{
    width:100%;
    height:45px;
    text-align: left;
    color:black;
    margin-bottom: 12px;
    margin-top: 3px;
    border: 1px solid white;
    border-radius: 5px;
    padding : 0 5px;
    background-color: rgba(255, 255, 255, 0.25);
    transition: all .2s;
}
.in:focus{
    outline: none;
    border: 2px solid royalblue;
    transition: all .2s;
}
</style>