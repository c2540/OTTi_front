<template>
    <div style="color:white">
        <h3>영화 상세정보 저장</h3>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { getCurrentInstance, onMounted } from '@vue/runtime-core';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const state = reactive({
            data : [],
            data1 : '',
            key : '',
        })

        onMounted(()=>{
            idData();
        })
        const idData = async() => {
            const url = `${proxy.foo}/api/movieidget.json`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            state.data = data.id;
            getInfo();
        }
        const getInfo = async() => {
            for(var i=0;i<state.data.length;i++){
                const url = `https://api.themoviedb.org/3/movie/${state.data[i]}?api_key=a97e8456c333e46c3010084e17ebe837&language=ko-KR`;
                const headers = {"Content-Type":"application/json"};
                const {data} = await axios.get(url, {headers});
                state.data1 = data;
            
                // 유튜브 영상 키 불러오기
                const url2 = `https://api.themoviedb.org/3/movie/${state.data[i]}/videos?api_key=a97e8456c333e46c3010084e17ebe837&language=ko-KR`;
                const response1 = await axios.get(url2, {headers});
                if(!response1.data.results[0]){
                    state.key = null;
                }
                else{
                    state.key = response1.data.results[0].key
                }
                // DB 저장하기
                const url3 = `${proxy.foo}/api/movieinfopost.json?id=${state.data[i]}`;
                const body = {
                    runtime : data.runtime,
                    imdb_id : data.imdb_id,
                    trailer : state.key
                }
                const response2 = await axios.post(url3, body, {headers});
                console.log(response2)
                state.key = '';
            }
        }

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>