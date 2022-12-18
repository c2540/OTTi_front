<template>
    <div style="background-color:rgba(255, 255, 255, 0.4); margin:2px; border-radius:10px; padding:25px; " >
        <h2>회원정보수정</h2><br />
        <div>
            <label style="font-weight:bold">닉네임</label><br>
            <input type="text" class="in" v-model="state.nickname" :ref="el => {form[0] = el}" @keyup="handleNickcheck"/>
        </div>
        <div style="text-align:center">
            <div v-html="state.nickcheck" style="position: relative; bottom:44px; left: 220px; font-size:small; height:0;"></div>
        </div>
        <div >
            <label style="font-weight:bold">출생연도</label><br>
            <input type="number" class="in" v-model="state.birth" />
        </div>
        <div>
            <label style="font-weight:bold">휴대폰 번호</label>
            <br /><span style="font-size:small">연락처를 하이픈없이 입력하세요.</span><br>
            <input type="text" class="in" v-model="state.phone" :ref="el => {form[1] = el}" @keyup="handlePhonecheck" />
        </div>
        <div style="text-align:center">
            <div v-html="state.phonecheck" style="position: relative; bottom:44px; left:220px; font-size:small; height:0;"></div>
        </div>
        <v-btn @click="handleUpdate" style="background-color:rgba(0, 0, 0, 0.2); margin:2px; border-radius:10px; color:white;">정보수정</v-btn>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { getCurrentInstance, onMounted,ref } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const form = ref([]);
        const state = reactive({
            nickname : '',
            phone : '',
            birth  : '',
            token : sessionStorage.getItem("token"),
            nickcheck: '',
            nickcheck1: 1,
            phonecheck: '',
            phonecheck1: 1,

        });

        const handleData = async() => {
            const url = `${proxy.foo}/member/selectone.json`;
            const headers = {
                "Content-Type"  : "application/json",
                "TOKEN"         : state.token
            }
            const { data } = await axios.get(url, {headers});
            state.nickname = data.result.nickname;
            state.phone = data.result.phone;
            state.birth = data.result.birth;  
        };

        const handleNickcheck = async() => {
            if (state.nickname.length >= 2){
                const url = `${proxy.foo}/member/nickcheck.json?nickname=${state.nickname}`;
                const headers = {"Content-Type":"application/json"};
                const {data} = await axios.get(url, {headers});
                if(data.status === 0){
                    state.nickcheck ='<font color="red">사용불가</font>';
                    state.nickcheck1 = 0
                }
                if(data.status != 0){
                    state.nickcheck ='<font color="blue">사용가능</font>';
                    state.nickcheck1 = 1
                }                                                         
                
            }
            else{
                state.nickcheck ='<font color="red">2자이상</font>';
                state.nickcheck1 = 0
            }
        };

        const handlePhonecheck = async() => {
            if (state.phone.length >= 10){
                const url = `${proxy.foo}/member/phonecheck.json?phone=${state.phone}`;
                const headers = {"Content-Type":"application/json"};
                const {data} = await axios.get(url, {headers});
                if(data.status === 0){
                    state.phonecheck ='<font color="red">사용불가</font>';
                    state.phonecheck1 = 0
                }
                if(data.status !== 0){
                    state.phonecheck ='<font color="blue">사용가능</font>';
                    state.phonecheck1 = 1
                }                                                         
                
            }
            else{
                state.phonecheck ='<font color="red">사용불가</font>';
                state.phonecheck1 = 0
            }
        };

        const handleUpdate = async() =>{
            if(state.nickcheck1 === 0){
                alert('닉네임을 확인해주세요.');
                form.value[0].focus();
                return false;
            }
            if(state.phonecheck1 === 0){
                alert('연락처를 확인해주세요.');
                form.value[1].focus();
                return false;
            }
            const url = `${proxy.foo}/member/update.json`;
            const headers = {
                "Content-Type" : "application/json",
                "TOKEN":state.token
            }
            const body = {
                nickname : state.nickname,
                phone : state.phone,
                birth : state.birth
            }
            const {data} = await axios.put(url,body,{headers});
            if(data.status === 200){
                alert('정보가 수정되었습니다.');
                handleReload();
            }
            else{
                alert('정보 변경에 실패했습니다. 다시 확인해주세요.')
            }
        }

        const handleReload = async() =>{
            const url=`${proxy.foo}/member/sessionreload.json`;
            const headers = {"Content-Type":"application/json","TOKEN":state.token};
            const {data} = await axios.get(url, {headers});
                sessionStorage.setItem("nickname",data.nickname)
                store.commit("setNickname",data.nickname)
        }

        onMounted(() => {
            handleData();
            
        });

        return {state,handleData,form,handleUpdate,handleNickcheck,handlePhonecheck}
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