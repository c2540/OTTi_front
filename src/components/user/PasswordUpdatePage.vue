<template>
    <div style="background-color:rgba(255, 255, 255, 0.4); margin:2px; border-radius:10px; padding:25px;">
        <h2>비밀번호 변경</h2><br />
        <div>
            <label style="font-weight:bold">현재 비밀번호</label>
            <input type="password" class="in" v-model="state.pw"><br />
        </div>
        <div>
            <label style="font-weight:bold">새 비밀번호</label><br />
            <input type="password" class="in" v-model="state.pw1"><br />
        </div>
        <div>
            <label style="font-weight:bold">새 비밀번호 확인</label><br />
            <input type="password" class="in" v-model="state.pw2"><br />
        </div>
        <v-btn @click="handleUpdatePw" style="background-color:rgba(0, 0, 0, 0.2); margin:2px; border-radius:10px; color:white;">변경</v-btn>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getCurrentInstance } from '@vue/runtime-core';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            pw : '', 
            pw1 : '',  
            pw2 : '',
            token : sessionStorage.getItem("token"),
        });

        const handleUpdatePw = async() =>{
            if(state.pw1 != state.pw2){
                alert('새 비밀번호가 일치하지 않습니다.');
                return false;
            }
            
            const url = `${proxy.foo}/member/updatepw.json`;
            const headers = {"Content-Type" : "application/json",
                        "TOKEN" : state.token            
            };
            const body = {
                password: state.pw,
                newpassword : state.pw1
            };
            const {data} = await axios.put(url, body, {headers});
            if(data.status ===200){
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
                alert('비밀번호가 변경되었습니다. 다시 로그인해 주세요.');
                router.push({path:'/main'});
            }
            else{
                alert('입력값이 올바르지 않습니다. 다시 확인해 주세요.')
            }
        }

        return {state,handleUpdatePw}
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
    outline: 0;
    border: 2px solid royalblue;
    transition: all .2s;    
}
</style>