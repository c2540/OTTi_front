<template>
    <div class="container">
        <h2>1대1 문의</h2>
        <div>
            <label>제목</label>
            <input type="text" v-model="state.title" class="in" style="background-color:rgba(0, 0, 0, 0.4);color:white;padding: 10px; border-radius:10px;margin-left:10px;width:90%">
        </div>
        <br />
        <label style="display:inline-block;">문의내용</label>
        <div style="background-color:rgba(0, 0, 0, 0.4);padding: 10px; border-radius:10px;width:100%">
            <v-textarea cols="100" rows="10" v-model="state.content" style="background-color:rgba(0, 0, 0, 0);" ></v-textarea>
        </div>
        <br />
        <span style="color:red; font-weight:bold;font-size:large;">!</span>
        <span> 한번 등록된 문의기록은 삭제하실수 없습니다.</span>
        
        <div style="text-align:right">
            <v-btn @click="postQNA()" rounded variant="outlined" class="btn">접수하기</v-btn>
            <v-btn @click="service" rounded variant="outlined" class="btn">취소</v-btn>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import { getCurrentInstance, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();

        const state = reactive({
            title : "",
            content : "",
            token : sessionStorage.getItem("token"),
        })

        const service = () =>{
            router.push({path:'/service'})
        }

        const postQNA = async() => {
            if(state.title === ""){
                alert("제목을 입력하세요")
                return false;
            }
            if(state.content === ""){
                alert("내용을 입력하세요")
                return false;
            }
            const url = `${proxy.foo}/center/postQNA.json`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN"    : state.token
            }
            const body = {
                title : state.title,
                content : state.content
            }
            const {data} = await axios.post(url,body,{headers})
            if(data.status === 200){
                alert('1:1 문의가 등록되었습니다.');
                router.push({path:'/service'})
            }
        }

        return {state,service,postQNA}
    }
}
</script>

<style lang="css" scoped>
    .container {
        padding:50px;
        border-radius: 10px;
        margin-bottom: 10px;
        background-color:rgba(255, 255, 255, 0.5);
        color:white;
    }
    .btn{
        margin-right:4px;
        border: none;
        background-color: rgba(31, 57, 133, 0.555);
        color: white;
    }
    .in:focus{
        outline: none;
    }


</style>

