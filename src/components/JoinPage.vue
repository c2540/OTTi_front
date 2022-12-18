<template>
    <div class="div1">
        <div style="padding:10px;">
            <h3 style="text-align:center; color:royalblue; font-size:50px;">JOIN</h3>
            <div style="text-align:center">
                <label>아이디</label><br>
                <input type="text" v-model="state.id" class="in" :ref="el => {form[0] = el}" 
                    @keyup="handleIDCheck">
            </div>
            <div style="text-align:center">
                <div v-html="state.idcheck" style="position: relative; bottom:44px; left:220px; font-size:small; height:0;"></div>
            </div>
            <div style="text-align:center;">
                <label>비밀번호</label><br>
                <input type="password" v-model="state.pw" class="in" :ref="el => {form[1] = el}">
            </div>
            <div style="text-align:center">
                <label>비밀번호 확인</label><br>
                <input type="password" v-model="state.pw2" class="in" :ref="el => {form[2] = el}">
            </div>
            <div style="text-align:center">
                <label>닉네임</label><br>
                <input type="text" class="in" v-model="state.nickname"
                    :ref="el => {form[3] = el}" @keyup="handleNickcheck">
            </div>
            <div style="text-align:center">
                <div v-html="state.nickcheck" style="position: relative; bottom:44px; left:220px; font-size:small; height:0;"></div>
            </div>
            <div style="text-align:center">
                <label>연락처</label><br>
                <input type="text" placeholder = "ex) 010-1234-5678" v-model="state.phone" 
                    class="in" :ref="el => {form[4] = el}" @keyup="handlePhonecheck">
            </div>
            <div style="text-align:center">
                <div v-html="state.phonecheck" style="position: relative; bottom:44px; left:220px; font-size:small; height:0;"></div>
            </div>
            <div style="text-align:center">
                <label>출생년도</label><br>
                <input type="number" class="in" v-model="state.birth" :ref="el => {form[5] = el}" placeholder="ex) 1994" />
            </div>
            <div style="text-align:center">
                <label>서비스 이용약관</label><br />
            </div>
            <div style="text-align:center;">
                <div style="display:inline-block;width:510px;padding:5px;border:1px solid lightgray;border-radius: 3px; background-color: white;overflow-y: scroll; height:140px;">
                    <p style="text-align:center; color: black;"> 
                        <span style="font-weight:bold">
                            <span style="color:orange">OTT</span>[<span style="color:royalblue"> i </span>]
                        </span>
                        를 이용해 주셔서 감사합니다.
                    </p>
                    <p style="text-align:left; color: black;">1. <span style="font-size:18px;font-weight:bold">다</span>른 이용자의 권리를 상호간 존중해주세요. 부적절한 활동으로 타인의 권리를 침해시 사이트 이용이 제한 될 수있습니다.</p>
                    <p style="text-align:left; color: black;">2. <span style="font-size:18px;font-weight:bold">부</span>적절한 프로필사진 혹은 닉네임을 사용시 사이트 이용이 제한 될 수있습니다.</p>
                    <p style="text-align:left; color: black;">3. <span style="font-size:18px;font-weight:bold">회</span>원탈퇴시 아이디를 제외한 모든 개인정보는 즉시 폐기됩니다. 단, 작성한 리뷰 기록은 탈퇴해도 다른 이용자가 열람할 수 있습니다.</p>
                    <p style="text-align:left; color: black;">4. <span style="font-size:18px;font-weight:bold">건</span>의사항이나 신고사항이 있을 시 1:1 문의 게시판을 이용해주세요.</p>
                    <p style="text-align:left; color: black;">5. <span style="font-size:18px;font-weight:bold">컨</span>텐츠 정보에 오류가 있거나 변동사항이 있을 시 수정요청을 통해 내용 변경을 관리자에게 요청 할 수 있습니다.</p>
                </div><br />
                <div style="text-align:left; width:510px;display:inline-block;">
                        <input style="margin-top:20px;" type="checkbox" v-model="state.check" :ref="el => {form[6] = el}" />
                        <span style="margin-top:20px;"> OTT[i]의 서비스 이용약관에 동의합니다.</span>
                </div> 
            </div>
            <div style="text-align:center">
                <button @click="submit()" style="margin-top:15px; border:none;background-color: royalblue; border-radius: 3px;height:45px; width:513px; color:white; font-weight: bold; font-size: 16px; cursor: pointer;">
                    가입하기
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router =useRouter();
        const form = ref([]);
        const state= reactive({
            id  : "",
            pw  : "",
            pw2 : "",
            phone : "",
            phone1 : "",
            nickname : "",
            birth : "",
            idcheck: '',
            nickcheck: '',
            check : false,
            phonecheck : '',
            nickcheck1 : 0,
            idcheck1 : 0,
            phonecheck1 : 0,
        })
        onMounted(()=>{ 
            window.scrollTo(0,0)
        });
        
        const handleIDCheck = async() => {
            if (state.id.length >= 4){
                const url = `${proxy.foo}/member/idcheck.json?id=${state.id}`;
                const headers = {"Content-Type":"application/json"};
                const {data} = await axios.get(url, {headers});
                if(data.status === 200){
                    if(data.result ===true){
                        state.idcheck ='<font color="red">사용불가</font>';
                        state.idcheck1 = 0
                    }
                    if(data.result !==true){
                        state.idcheck ='<font color="royalblue">사용가능</font>';
                        state.idcheck1 = 1
                    }                                                         
                }
            }
            else{
                state.idcheck ='<font color="red">4자이상</font>';
            }
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
                if(data.status !== 0){
                    state.nickcheck ='<font color="royalblue">사용가능</font>';
                    state.nickcheck1 = 1
                }                                                         
            }
            else{
                state.nickcheck ='<font color="red">2자이상</font>';
            }
        };

        const handlePhonecheck = async() => {
            if (state.phone.length >= 10){
                const url = `${proxy.foo}/member/phonecheck.json?phone=${state.phone}`;
                const headers = {"Content-Type":"application/json"};
                const {data} = await axios.get(url, {headers});
                if(data.status !== 0){
                    state.phonecheck ='<font color="royalblue">사용가능</font>';
                    state.phonecheck1 = 1;
                }
                if(data.status === 0){
                    state.phonecheck ='<font color="red">사용불가</font>';
                    state.phonecheck1 = 0;
                }
            }
            else{
                state.phonecheck ='<font color="red">사용불가</font>';
                state.phonecheck1 = 0;
            }

        };

        const submit = async() => {
            if(state.id === ""){
                alert("아이디를 입력하세요")
                form.value[0].focus();
                return false;
            }
            if(state.id.length < 4 ){
                alert("아이디 4자이상 입력하세요")
                form.value[0].focus();
                return false;
            }
            if(state.id.length < 4 ){
                alert("아이디 4자이상 입력하세요")
                form.value[0].focus();
                return false;
            }
            if(state.idcheck1 === 0){
                alert("중복된 아이디입니다.")
                form.value[0].focus();
                return false;
            }
            if(state.pw === ''){
                alert('비밀번호를 입력하세요.');
                form.value[1].focus();
                return false;
            }
            if(state.pw2 === ''){
                alert('비밀번호 확인을 입력하세요.');
                form.value[2].focus();
                return false;
            }
            if(state.pw != state.pw2){
                alert('비밀번호가 일치하지 않습니다.');
                form.value[1].focus();
                return false;
            }
            if(state.nickname === ''){
                alert('닉네임을 입력하세요.');
                form.value[3].focus();
                return false;
            }
            if(state.nickname.length <2 ){
                alert('닉네임 2자이상 입력하세요.');
                form.value[3].focus();
                return false;
            }
            if(state.nickcheck1 === 0){
                alert('중복된 닉네임입니다..');
                form.value[3].focus();
                return false;
            }
            if(state.phone === ''){
                alert('연락처를 입력하세요.');
                form.value[4].focus();
                return false;
            }
            if(state.phonecheck1 === 0){
                alert('연락처를 정확하게 입력하세요.');
                form.value[4].focus();
                return false;
            }
            if(state.birth === ''){
                alert('출생년도를 입력해주세요.');
                form.value[5].focus();
                return false;
            }
            if(state.birth>=2023 || state.birth<=1900){
                alert('출생년도를 정확히 입력해주세요.');
                form.value[5].focus();
                return false;
            }
            if(state.check == false ){
                alert('서비스 이용약관에 동의해주세요.');
                form.value[6].focus();
                return false;
            }
            if(state.phone.includes('-')){
                for(let i=0; i<state.phone.split("-").length; i++){
                    state.phone1 += state.phone.split("-")[i]
                }
            }
            const url = `${proxy.foo}/member/join.json`
            const headers = {"Content-Type":"application/json"}
            const body = {
                userid : state.id,
                userpw : state.pw,  
                phone : state.phone1,
                birth : state.birth,  
                nickname :state.nickname,
                social : "normal"
            };
            const {data} = await axios.post(url,body,{headers})
            if(data.status===200){
                alert('회원가입이 완료되었습니다.');
                router.push({path:'/'});
            }
        }
        return {state,submit,handleIDCheck,form,handleNickcheck,handlePhonecheck, }
    }
}
</script>

<style lang="css" scoped>
    .div1{
        color: azure;
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
        border: 2px solid royalblue;
        transition: all .2s;
    }
    .in::placeholder{
        color:rgba(255, 255, 255, 0.65);
    }
    .sel{
        width:512px;
        height:48px;
        margin-bottom: 12px;
        margin-top: 3px;
        border: 1px solid lightgray;
        border-radius: 3px;
        padding : 0 5px;
    }
    .sel:focus{
        outline: none;
        border: 2px solid royalblue;
    }
</style>