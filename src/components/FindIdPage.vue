<template>
    <div class="container">
        <h2 style="border-radius:10px; padding:5px; margin-bottom:10px; display:inline-block">아이디찾기</h2>
        <div style="text-align:center">
            <div>
                <label style="display:inline-block;width:100px;font-weight:bold">출생연도</label> 
                <input type="number" v-model="state.birth" style="width:400px;border-radius:10px;height:35px;background-color:rgba(255, 255, 255, 0.3);padding-left:10px;" placeholder="ex) 1994" /><br />
            </div>
            <div style="margin-top:5px">
                <label style="display:inline-block;width:100px;font-weight:bold">연락처</label> 
                <input type="text" v-model="state.phone" style="width:400px;border-radius:10px;height:35px;background-color:rgba(255, 255, 255, 0.3);padding-left:10px;" placeholder="연락처를 하이픈('-') 없이 입력하세요." /><br />
            </div>
            <input type="button" @click="submit()" value="아이디 찾기" style=" width:400px;border-radius:10px; height:40px; margin:5px 0 0 100px;background-color:rgba(0, 0, 0, 0.3);color:white" />
        </div>
        <div>
            <v-dialog v-model="state.dialog" persistent style="text-align:center">
                <div style="background-color:rgba(255, 255, 255, 0.5);backdrop-filter: blur(10px);color:white;width:500px;padding:50px;border:1px solid gray;border-radius:10px; margin-left:auto; margin-right:auto;">
                    <h3 style="color:black">찾은 아이디</h3> 
                    <hr />
                    <span style="font-weight:bold;color:black">아이디</span><span style="color:black"> / {{state.userid}}</span><br />
                    <div style="margin-top:10px">
                        <router-link to="/main"><button style="background-color:rgba(0, 0, 0, 0.3); border-radius:10px; padding:5px 10px;color:white">홈으로</button></router-link>
                        <router-link to="/login"><button style="background-color:rgba(0, 0, 0, 0.3); border-radius:10px; padding:5px 10px; margin-left:10px;color:white">로그인하기</button></router-link>
                    </div>                
                </div>
            </v-dialog>
        </div>
    </div>
    <br>
    <br>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios'
import { getCurrentInstance, onMounted } from '@vue/runtime-core';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const state = reactive({
            birth : "",
            phone : "",
            dialog : false,
            userid : "",
            social : "normal",
        })

        onMounted(()=>{ 
            window.scrollTo(0,0)
        });
        
        const submit = async() => {
            if(state.birth === ""){
                alert('출생연도를 입력해주세요');
                return false;
            }
            if(state.phone === ""){
                alert('연락처를 입력해주세요');
                return false;
            }
            const url = `${proxy.foo}/member/findid.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                birth : state.birth,
                phone : state.phone,
                social : state.social
            }
            const {data} = await axios.post(url, body, {headers});
            if(data.status===200){
                state.userid=data.result;
                state.dialog=true;
            }
            else{
                alert('아이디를 찾을 수 없습니다. 입력한 정보를 다시 확인해주세요.')
            }
        }
        return {state, submit}
    }
}
</script>

<style lang="css" scoped>
    .container{
        background-color: rgba(255, 255, 255, 0.6);
        padding:30px;
        margin:0 300px;
        min-width:600px;
        border-radius: 10px;
        text-align: center;
        margin-top:150px
    }
</style>