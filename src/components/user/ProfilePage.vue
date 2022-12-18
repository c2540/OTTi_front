<template>
    <div style="background-color:rgba(255, 255, 255, 0.4); margin:2px; border-radius:10px; padding:25px;">
        <h2>프로필 사진 관리</h2>
        <br />
        <div style="text-align:center">
            <h3>현재 프로필사진</h3>
            <br/>
            <div v-if="state.imageno.length === 0">
                <img :src = "require('@/assets/no.png')" style="width:100px; height:120px; border-radius:10px;" />
            </div>
            <div v-else>
                <img :src = "`${state.foo}/member/image?no=${state.imageno}`" style="width:150px; height:150px; border-radius:10px;" />
            </div>
            <v-btn @click = "handleDelete(state.imageno)" style="background-color:rgba(0, 0, 0, 0.2); margin:2px; border-radius:10px; color:white; width:150px;">이미지 삭제</v-btn><br />
            
            <br /><hr /><br />

            <h3>프로필사진 등록/변경</h3>
            <br/>
            <img :src="state.img" style="width:150px; border-radius:10px;" />
            <br /><input type="file" accept="image/*" @change="handleImage($event)" style="background-color:rgba(0, 0, 0, 0.2); border-radius:0 10px 10px 0;" />
            <p style="font-size:small">
                이미지 확장자(<strong> gif, png, jpeg, bmp, webp </strong>)인 파일만 업로드 가능합니다.
            </p>
            <br /><v-btn @click = "handleInsert()" style="background-color:rgba(0, 0, 0, 0.2); margin:2px; border-radius:10px; margin-top:5px;color:white; width:150px;">이미지 등록</v-btn>   
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { getCurrentInstance, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const state= reactive({
            img     : require('@/assets/imgs/default.png'),
            file    : null,
            token   : sessionStorage.getItem("token"),
            imageno : [],
            foo: proxy.foo
        })

        onMounted(()=>{ 
            handleDataImage(); 
        });

        const handleDataImage = async() => {
            const url=`${proxy.foo}/member/image.json`;
            const headers = {"Content-Type":"application/json","TOKEN":state.token};
            const {data} = await axios.get(url, {headers});
            state.imageno = data.result;
        }

        const handleDelete = async(no) => {
            const url=`${proxy.foo}/member/image?no=${no}`;
            const headers = {"Content-Type":"application/json","TOKEN":state.token};
            const {data} = await axios.delete(url, {headers:headers, data:{}});
            if(data.status===200){
                handleDataImage();
                alert('프로필사진이 삭제되었습니다.');
                handleReload();
            }
        }

        const handleReload = async() =>{
            const url=`${proxy.foo}/member/sessionreload.json`;
            const headers = {"Content-Type":"application/json", "TOKEN":state.token};
            const {data} = await axios.get(url, {headers});
                sessionStorage.setItem("imageno",data.imageno)
                store.commit("setImageno",data.imageno)
        }

        const handleImage = (e) => {
            if(e.target.files.length > 0){
                state.file = e.target.files[0];
                state.img  = URL.createObjectURL( e.target.files[0] );
            }
            else {
                state.file = '';
                state.img  = require('@/assets/imgs/default.png');
            }
        };

        const handleInsert = async() =>{
            if(state.file === null){
                alert('등록된 사진이 없습니다. 사진을 첨부해주세요.');
                return false;
            }
            if(state.file.type.indexOf('image') < 0){
                alert('올바른 이미지 파일이 아닙니다.');
                return false;
            }


            const url=`${proxy.foo}/member/insertimage.json`;
            const headers = {"Content-Type":"multipart/form-data", "TOKEN" : state.token};
            let body = new FormData();
            body.append("file",state.file);


            if(Array.isArray(state.imageno) && state.imageno.length != 0){
                handleUpdate();
                window.location.reload();
            }
            else{
                const {data} = await axios.post(url, body, {headers});
                if(data.status === 200){
                    handleDataImage();
                }
            }
            alert('프로필 사진이 등록되었습니다.');
            handleReload();
        };

        const handleUpdate = async()=>{
            const url=`${proxy.foo}/member/updateimage.json`;
            const headers = {"Content-Type":"multipart/form-data", "TOKEN" : state.token};
            let body = new FormData();
            body.append("file",state.file);
            body.append("imageno", state.imageno);
            const {data} = await axios.post(url, body, {headers});
            console.log(data);
        }

        return {handleImage,state,handleInsert,handleDataImage,handleDelete} 
    }
}
</script>

<style lang="css" scoped>
    label{
        display : inline-block;
        width   : 511px;
        text-align: left;
        font-weight: bold;
        font-size:14px;
    }
</style>