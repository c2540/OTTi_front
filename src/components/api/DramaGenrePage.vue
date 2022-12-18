<template>
    <div style="color:white">
        <h3>드라마 장르 api 저장</h3>
        {{state.data}}
        {{state.data1}}
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const state = reactive({
            data : [],
            data1 : '',
        })

        onMounted(()=>{
            idData();
        })
        const idData = async() => {
            const url = `${proxy.foo}/api/dramaidget.json`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            state.data = data.id;
            genreData();
        }

        const wait = (sec) => {
            let start = Date.now(), now = start;
            while (now - start < sec * 1000) {
                now = Date.now();
            }
        }

        const genreData = async() => {
            for(var i=0;i<state.data.length;i++){
                const url = `https://api.themoviedb.org/3/tv/`+state.data[i]+`?api_key=a97e8456c333e46c3010084e17ebe837&language=ko-KR`;
                const headers = {"Content-Type":"application/json"};
                const {data} = await axios.get(url, {headers});
                state.data1 = data.genres;
                for(var j=0;j<state.data1.length;j++){
                    const url = `${proxy.foo}/api/dramagenrepost.json?id=${state.data[i]}`;
                    const headers = {"Content-Type":"application/json"};
                    const body = {
                        id : state.data1[j].id
                    }
                    const {data} = await axios.post(url, body, {headers});
                    console.log(data);
                    wait(1);
                }
            }
        }

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>