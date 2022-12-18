<template>
    <div class="div1">
        <div></div>
        <div>
            <div style="padding:10px;">
                <h3 style="text-align:center; color:royalblue; font-size:50px;">LOGIN</h3>
                <div style="text-align:center">
                    <label>아이디</label><br>
                    <input type="text" v-model="state.id" class="in" />
                </div>
                <div style="text-align:center;">
                    <label>비밀번호</label><br>
                    <input type="password" v-model="state.pw" class="in" @keyup.enter="submit()" v-show="state.inputtype === 'password' ">
                    <input type="text" v-model="state.pw" class="in" @keyup.enter="submit()" v-show="state.inputtype === 'text' " ><br />
                    <div style="position:absolute;">
                        <button v-if="state.inputtype === 'password'" @click="typechange()" style="position: relative; bottom:50px; left:470px;">
                            <img :src="require('../assets/imgs/vis.png')" class="icon">
                        </button>
                        <button v-if="state.inputtype === 'text'" @click="typechange()" style="position: relative; bottom:50px; left:470px;">
                            <img :src="require('../assets/imgs/invis.png')"  class="icon">
                        </button>
                    </div>
                </div>
                <div style="text-align:center">
                    <input type="button" @click="submit()" value="로그인" class="btn"><br/>
                    <div style="margin-top: 5px;">
                        <input type="checkbox" v-model="state.check" @click="idchange()" />
                        <span> 아이디 저장</span><br />
                        <router-link to="/findid"><button style="color:azure">아이디찾기</button></router-link>
                        <span style="border-right:2px solid gray; padding-right:5px;margin-right:5px"></span>
                        <router-link to="/findpw"><button style="color:azure">비밀번호찾기</button></router-link>
                        <span style="border-right:2px solid gray; padding-right:5px;margin-right:5px"></span>
                        <router-link to="/join"><button style="color:azure">회원가입</button></router-link>
                    </div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr">
                <div style="cursor:pointer; padding:10px;">
                    <img :src="require(`@/assets/login/naver_login.png`)" @click="naverlogin()" style="width: 100%; height: 60px; border-radius: 10px;">
                </div>
                <div style="cursor:pointer; padding:10px;">
                    <img :src="require(`@/assets/login/kakao_login.png`)" @click="kakaologin()" style="width: 100%; height: 60px; border-radius: 10px;">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { getCurrentInstance, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router =useRouter();
        const store = useStore();
        const state = reactive({
            id : "",
            pw : "",
            inputtype : "password",
            client_id : "NorOMfFixWqv2LMj8T2X",
            callbackUrl : encodeURIComponent(`http://3.35.109.169:8080${proxy.foo}/callback`),
            kakao_client_id : "0fd79a0944e5a65300e5fdd8b4c193db",
            // 아마존서버
            kakao_redirect_uri : `http://3.35.109.169:8080${proxy.foo}/callback_kakao`,
            // 학원서버
            // kakao_redirect_uri : `http://1.234.5.158:28080${proxy.foo}/callback_kakao`,
            check : false,
        })
        
        onMounted(()=>{ 
            window.scrollTo(0,0)
            state.id = sessionStorage.getItem("id");
            if(state.id){
                state.check = true
            }
        });

        const submit = async() => {
            const url = `${proxy.foo}/member/login.json`
            const headers = {"Content-Type":"application/json"}
            if(state.id === ""){
                alert("아이디를 입력하세요")
                return false;
            }
            else if(state.pw ===""){
                alert("비밀번호를 입력하세요")
                return false;
            }
            else{
                const body = {
                    userid : state.id,
                    userpw : state.pw
                }
                const {data} = await axios.post(url,body,{headers})
                if(data.status === 200){
                    if(data.result === "banned user"){
                        alert("차단된 유저입니다.")
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
                        if(state.check === true){
                            sessionStorage.setItem("id",state.id);
                        }
                        else if(state.check === false){
                            sessionStorage.removeItem("id");
                        }
                        router.push({path:sessionStorage.getItem("from"),query:JSON.parse(sessionStorage.getItem('query'))});
                    }
                }
                else{
                    alert("로그인실패")
                }
            }
        }

        const naverlogin = async() => {
            var url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${state.client_id}&redirect_uri=${state.callbackUrl}&state=OTT`;
            window.location.replace(url);
        }
        
        const kakaologin = async() => {
            var url = `https://kauth.kakao.com/oauth/authorize?client_id=${state.kakao_client_id}&redirect_uri=${state.kakao_redirect_uri}&response_type=code`;
            window.location.replace(url);
        }

        const idchange = () => {
            if(state.check === false){
                state.check = true
            }
            else{
                state.check = false
            }
        }   

        const typechange = () => {
            if(state.inputtype === 'password'){
                state.inputtype = 'text'
            }
            else{
                state.inputtype = 'password'
            }
        }   

        return {state,submit,naverlogin,kakaologin,typechange,idchange}
    }
}
</script>

<style lang="css" scoped>
.div1{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    color: azure;
    padding:10px;
    border-radius: 10px;
}
label{
    color: azure;
    display : inline-block;
    width   : 510px;
    text-align: left;
    font-weight: bold;
    font-size:14px;
}
.in{
    color: azure;
    width:511px;
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
    border: 2px solid royalblue;
    transition: all .2s;
}
.btn{
    border:none;
    background-color: royalblue; 
    border-radius: 3px;height:45px; 
    width:513px; color:white; 
    font-weight: bold; 
    font-size: 16px; 
    cursor: pointer;
    margin-top:5px;
    transition: all .2s;
}
.btn:hover{
    background-color: rgb(51, 84, 182);
    transition: all .2s;
}
.icon{
    width:35px;
}

#keyShow {
  font-size: 15px;
  cursor: pointer;
  color: rgb(196, 26, 26);
}

</style>