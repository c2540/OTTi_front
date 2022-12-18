<template>
    <div class="container">
        <h2 style="border-radius:10px; padding:5px; margin-bottom:10px; display:inline-block">비밀번호 찾기</h2>
        <div style="text-align:center">
            <div>
                <label style="display:inline-block;width:100px;font-weight:bold">아이디</label>
                <input type="text" v-model="state.userid" style="width:400px;border-radius:10px;height:35px;background-color:rgba(255, 255, 255, 0.3);padding-left:10px;" placeholder="아이디를 입력하세요." /><br />
            </div>
            <div style="margin-top:5px">
                <label style="display:inline-block;width:100px;font-weight:bold">출생연도</label>
                <input type="number" v-model="state.birth" style="width:400px;border-radius:10px;height:35px;background-color:rgba(255, 255, 255, 0.3);padding-left:10px;" placeholder="ex) 1994" /><br />
            </div>
            <div style="margin-top:5px">
                <label style="display:inline-block;width:100px;font-weight:bold">연락처</label>
                <input type="text" v-model="state.phone" style="width:400px;border-radius:10px;height:35px;background-color:rgba(255, 255, 255, 0.3);padding-left:10px;" placeholder="연락처를 하이픈('-') 없이 입력하세요." /><br />
            </div>
            <input type="button" @click="submit()" value="비밀번호 변경하기" style=" width:400px;border-radius:10px; height:40px; margin:5px 0 0 100px;background-color:rgba(0, 0, 0, 0.3);color:white" />
        </div>
        <div>
            <v-dialog v-model="state.dialog" persistent style="text-align:center">
                <div style="background-color:rgba(255, 255, 255, 0.5);backdrop-filter: blur(10px);color:white;width:500px;padding:50px;border:1px solid gray;border-radius:10px; margin-left:auto; margin-right:auto;">
                    <h3 style="color:black">비밀번호 변경</h3> 
                    <hr />
                    <div>
                        <label style="display:inline-block;width:130px;font-weight:bold;color:black">바꿀 비밀번호</label>
                        <input type="password" v-model="state.userpw" style="width:350px;border-radius:10px;height:35px;background-color:rgba(255, 255, 255, 0.4);padding-left:10px;" />
                    </div>
                    <div>
                        <label style="display:inline-block;width:120px;font-weight:bold;color:black">비밀번호 확인</label>
                        <input type="password" v-model="state.userpw1" style="width:350px;border-radius:10px;height:35px;background-color:rgba(255, 255, 255, 0.4);padding-left:10px;" />
                    </div>
                    <div style="margin-top:10px">
                        <button style="background-color:rgba(0, 0, 0, 0.3); border-radius:10px; padding:5px 10px;color:white;" @click="submit2()" >비밀번호 변경하기</button>
                        <button style="background-color:rgba(0, 0, 0, 0.3); border-radius:10px; padding:5px 10px;color:white; margin-left:10px;" @click="state.dialog=false">닫기</button>
                    </div>
                </div>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const state = reactive({
            userid : "",
            birth : "",
            phone : "",
            dialog : false,
            userpw : "",
            userpw1 : "",
            social : "normal",
        })
        
        onMounted(()=>{ 
            window.scrollTo(0,0)
        });

        const submit = async() => {
            if(state.userid === ""){
                alert('아이디를 입력해주세요');
                return false;
            }
            if(state.birth === ""){
                alert('출생연도를 입력해주세요');
                return false;
            }
            if(state.phone === ""){
                alert('연락처를 입력해주세요');
                return false;
            }
            const url = `${proxy.foo}/member/findpw.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                userid : state.userid,
                birth : state.birth,
                phone : state.phone,
                social : state.social
            }
            const {data} = await axios.post(url, body, {headers});
            if(data.status===200){
                state.dialog=true;
            }
            else{
                alert("입력한 정보와 일치하는 회원이 없습니다. 다시 확인해주세요.")
            }
        }

        const submit2 = async() => {
            if(state.userpw === ''){
                alert('바꿀 비밀번호를 입력해주세요.');
                return false;
            }
            if(state.userpw != state.userpw1){
                alert('비밀번호가 일치하지 않습니다.');
                return false;
            }
            const url = `${proxy.foo}/member/findpw2.json`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                userid : state.userid,
                userpw : state.userpw,
            }
            const {data} = await axios.put(url, body, {headers});
            if(data.status===200 && data.result===1){
                alert("비밀번호 변경에 성공하였습니다.")
                router.push({path:'/login'});
            }
        }

        return {state, submit, submit2}
    }
}
</script>

<style lang="css" scoped>
    .container{
        background-color: rgba(255, 255, 255, 0.6);
        padding:30px;
        margin:0 200px;
        min-width:600px;
        border-radius: 10px;
        text-align: center;
        margin-top:150px
    }
</style>