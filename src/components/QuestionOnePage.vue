<template>
    <div class="container">
        <h2>1대1 문의 / 상세</h2>
        <div style="background-color:rgba(0, 0, 0, 0.2);padding: 10px; border-radius:10px">
            <div v-if="state.data">
                <h2 style="margin-left:10px;">문의내용</h2>
                <label>번호</label><span style="margin-left:5px">{{state.data.result.id}}</span> <br />
                <label>제목</label><span style="margin-left:5px;font-weight:bold">{{state.data.result.title}}</span> <br />
                <label>질문자</label><span style="margin-left:5px;cursor:pointer" @click="profile(state.data.result.member.userid)">{{state.data.result.member.nickname}} ({{state.data.result.member.userid}})</span><br />
                <label>질문일자</label><span style="margin-left:5px">{{state.data.result.regdate}}</span><br />
                <label>내용</label><br />
                <p style="background-color:rgba(255, 255, 255, 0.2);padding:10px; border-radius:10px;margin:5px">{{state.data.result.content}}</p>
            </div>   
            <label style="margin-top:5px;">답변</label>
            <div v-if="!state.data1.length">
                <p v-if="state.role==='MEMBER'" style="margin:20px 0;text-align: center;">아직 답변이 없습니다.</p>
                <p v-if="state.role==='ADMIN'" style="margin:20px 0;text-align: center">아직 답변이 없습니다. 답변을 등록해주세요.</p>
            </div>
            <v-table v-if="state.data1.length" style="background-color:rgba(0,0,0,0);color:white">
                <thead>
                    <tr>
                        <th>답변자</th>
                        <th>내용</th>
                        <th>등록일</th>
                        <th v-if="state.role === 'ADMIN'">버튼</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tmp of state.data.answer" :key="tmp">
                        <td style="text-align:center">{{tmp.member.nickname}}</td>
                        <td>{{tmp.content}}</td>
                        <td style="text-align:center">{{tmp.regdate}}</td>
                        <td v-if="state.role === 'ADMIN'" style="text-align:center">
                            <v-btn @click="deleteAnswer(tmp.id)" style="background-color:rgba(255, 255, 255, 0.2); border-radius:10px">삭제</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <div v-if="state.role === 'ADMIN'" style="text-align:center" >
                <input type="text" placeholder="답변입력" v-model="state.answer" class=in2>
                <v-btn @click="insertAnswer" style="background-color:rgba(255, 255, 255, 0.2); margin-left:5px; border-radius:10px">답변등록</v-btn>
            </div>
            <br />
            <div class="in">
                <v-btn @click="service" style="background-color:rgba(255, 255, 255, 0.2); border-radius:10px;">목록으로</v-btn> 
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive } from '@vue/reactivity';
import axios from 'axios';
import { getCurrentInstance, onMounted } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            role : computed(()=>store.getters.getRole),
            data : '',
            data1 : '',
            no : Number(route.query.id),
            answer : "",
            token : sessionStorage.getItem("token"),
            adminanswer : "",
        });
        
        onMounted(() => {
            handleData();
        })

        const handleData = async() =>{
            const url = `${proxy.foo}/center/SelectQNA.json?no=${state.no}`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            state.data = data
            state.data1 = data.answer
        };

        const service = () =>{
            router.push({path:'/service'})   
        }

        const deleteAnswer = async(no) => {
            const url = `${proxy.foo}/center/deleteAnswer.json`
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : no
            }
            const {data} = await axios.delete(url, {headers:headers, data:body});
            if(data.status === 200){
                handleData();
            }
            else{
                alert("답변 삭제에 실패하였습니다.")
            }
        }

        const insertAnswer = async() => {
            const url = `${proxy.foo}/center/insertanswer.json?no=${state.no}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            };
            const body = {
                content : state.answer
            }
            const {data} = await axios.post(url,body,{headers})
            if(data.status===200){
                alert('답변이 등록되었습니다');
                state.answer = null;
            }
            handleData();
        }

        
        const profile = (userid) => {
            router.push({path:'/userprofile', query:{id:userid}})
        }


        return {state,service,insertAnswer,deleteAnswer, profile}
    }
}
</script>

<style lang="css" scoped>
.btn{
    margin-right:4px;
    border: none;
    background-color: rgba(31, 57, 133, 0.555);
    color: white;
}
.in{
    text-align:center;
}
.in2{
    border-radius:10px;
    background-color:rgba(255, 255, 255, 0.1); 
    color:white; 
    width:80%; 
    padding:0px 10px;
    height:40px
}
.in2::placeholder{
    color:white
}
.in2:focus{
    outline:none;
    border:2px solid royalblue
}
.container {
    padding:50px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color:rgba(255, 255, 255, 0.5);
    color:white;
}
label{
    display: inline-block;
    width:100px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.2);
    margin:2px;
    text-align: center;
    padding: 3px 0px;
    border-radius:10px
}

</style>