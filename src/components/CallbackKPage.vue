<template>
    <div class="div1" v-if="state.info===1">
        <div style="padding:10px;">
            <h3 style="text-align:center; color:#f9e000; font-size:50px;">Kakao/JOIN</h3>
            <p style="text-align:center; color:#f9e000;">최초 1회 추가정보 입력이 필요합니다.</p>
            <div style="text-align:center">
                <label>출생년도</label><br>
                <input type="number" class="in" v-model="state.birth" placeholder="ex) 1994" />
            </div>
            <div style="text-align:center">
                <label>연락처</label><br>
                <input type="text" placeholder = "ex) 010-1234-5678" v-model="state.phone" class="in" @keyup="handlePhonecheck">
            </div>
            <div style="text-align:center">
                <div v-html="state.phonecheck" style="position: relative; bottom:44px; left:220px; font-size:small; height:0;"></div>
            </div>
            <div style="text-align:center">
                <button @click="save_before()" style="margin-top:15px; border:none;background-color: #f9e000;; border-radius: 3px;height:45px; width:513px; color:black; font-weight: bold; font-size: 16px; cursor: pointer;">
                    가입완료 하기
                </button>
            </div>
        </div>
    </div>
    <div style="height:500px;">
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { getCurrentInstance, onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
    setup () {
        const { proxy } = getCurrentInstance();

        const store = useStore();
        const router = useRouter();
        const state = reactive({
            query : window.location.search,
            token : null,
            accesstoken : null,
            id : '',
            nickname:'',
            birth : '',
            phone : '',
            info : 0,
            phonecheck : '',
            phonechecknum : 0,
        })
        
        onMounted(()=>{
            kakaologin();
        })

        const handlePhonecheck = async() => {
            if (state.phone.length >= 10){
                const url = `${proxy.foo}/member/phonecheck.json?phone=${state.phone}`;
                const headers = {"Content-Type":"application/json"};
                const {data} = await axios.get(url, {headers});
                if(data.status === 0){
                    state.phonecheck ='<font color="red">사용불가</font>';
                    state.phonechecknum = 0;
                }
                if(data.status !== 0){
                    state.phonecheck ='<font color="#f9e000">사용가능</font>';
                    state.phonechecknum = 1;
                }                                                         
            }
            else{
                state.phonecheck ='<font color="red">사용불가</font>';
                state.phonechecknum = 0;
            }
        };

        const kakaologin = async() => {
            // 아마존 서버
            const url = `${proxy.foo}/kakao/oauth${state.query}&re=http://3.35.109.169:8080${proxy.foo}/callback_kakao`
            // 학원 서버
            // const url = `${proxy.foo}/kakao/oauth${state.query}&re=http://1.234.5.158:28080${proxy.foo}/callback_kakao`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.accesstoken = data.result
            userinfo();
        }

        const userinfo = async()=>{
            const url = `${proxy.foo}/kakao/v2?access_token=${state.accesstoken}&app_admin_key=6dae72f66cbb94cb9599268ba0f42624`
            const headers = {"Content-type":"application/x-www-form-urlencoded;charset=utf-8"}
            const data = await axios.get(url,{headers})
            state.id = data.data.id;
            state.nickname = data.data.nickname;
            idcheck();
        }

        const idcheck = async()=>{
            const url = `${proxy.foo}/member/idcheck.json?id=${state.id}`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            if(data.status === 200){
                if(data.result === true){
                    save();
                }
                else{
                    state.info = 1;
                }                                                  
            }
        }

        const save_before = () => {
            if(state.birth === ''){
                alert('출생년도를 입력해주세요.');
                return false;
            }
            if(state.birth>=2023 || state.birth<=1900){
                alert('출생년도를 정확히 입력해주세요.');
                return false;
            }
            if(state.phone === ''){
                alert('연락처를 정확히 입력하세요.');
                return false;
            }
            if(state.phonechecknum===0){
                alert('연락처를 확인해주세요.');
                return false;
            }
            if(state.phone.includes('-')){
               state.phone = state.phone.split("-")[0]+state.phone.split("-")[1]+state.phone.split("-")[2]
            }
            save();
        }
        const save = async() => {
            const url = `${proxy.foo}/kakao/login.json`
            const headers = {"Content-Type":"application/json"}
            const body = {
                userid : state.id,
                nickname : state.nickname,
                birth : state.birth,
                phone : state.phone,
                social : "kakao"
            }
            const {data} = await axios.post(url,body,{headers})
            if(data.status === 200){
                if(data.result === "banned user"){
                    alert("차단된 유저입니다.")
                    router.push({path:'/login'})
                }
                else{
                    sessionStorage.setItem("token",data.result)
                    sessionStorage.setItem("role",data.role)
                    sessionStorage.setItem("imageno",data.imageno)
                    sessionStorage.setItem("userid",data.userid)
                    sessionStorage.setItem("nickname",data.nickname)
                    sessionStorage.setItem("social",data.social)
                    
                    store.commit("setLogged",true)
                    store.commit("setRole",data.role)
                    store.commit("setToken",data.result)
                    store.commit("setUserid",data.userid)
                    store.commit("setNickname",data.nickname)
                    store.commit("setImageno",data.imageno)
                    store.commit("setSocial",data.social)
                    router.push({path:'/main'})
                }
            }
        }
        return {state, save, save_before, handlePhonecheck}
    }
}
</script>

<style lang="css" scoped>
    .div1{
        color: white;
        padding:10px;
        border-radius: 10px;
    }
    label{
        display : inline-block;
        width   : 511px;
        text-align: left;
        font-weight: bold;
        font-size:14px;
    }
    .in{
        color: white;
        width:510px;
        height:45px;
        margin-bottom: 12px;
        margin-top: 3px;
        border: 1px solid lightgray;
        border-radius: 3px;
        padding : 0 5px;
        background-color:rgba(255, 255, 255, 0.2);
        transition: all .2s;
    }
    .in:focus{
        outline: none;
        border: 2px solid #f9e000;
        transition: all .2s;
    }
    .in::placeholder{
        color:rgba(255, 255, 255, 0.65);
    }
</style>