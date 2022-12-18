<template>
    <div style="color:white">
        <h3>장르 카테고리 전송</h3>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive } from '@vue/runtime-core';
import axios from 'axios';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const state = reactive({
            movie : "",
            drama : "",
        })
        
        onMounted(()=>{
            movieData();
            dramaData();
        })

        const movieData = async() =>{
            const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=a97e8456c333e46c3010084e17ebe837&language=ko-KR`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            state.movie = data.genres;
            console.log(data);
            movieDataSend();
        }

        const dramaData = async() =>{
            const url = `https://api.themoviedb.org/3/genre/tv/list?api_key=a97e8456c333e46c3010084e17ebe837&language=ko-KR`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            state.drama = data.genres
            console.log(data)
            dramaDataSend();
        }

        const movieDataSend = async() =>{
            for(var i=0;i<state.movie.length;i++){
                const url = `${proxy.foo}/api/genrespost.json`
                const headers = {"Content-Type":"application/json"};
                const body = {
                    id:state.movie[i].id,
                    name:state.movie[i].name
                }
                const data = await axios.post(url, body, {headers});
                console.log(data);
            }
        }

        const dramaDataSend = async() =>{
            for(var i=0;i<state.drama.length;i++){
                const url = `${proxy.foo}/api/genrespost.json`
                const headers = {"Content-Type":"application/json"};
                const body = {
                    id:state.drama[i].id,
                    name:state.drama[i].name
                }
                const data = await axios.post(url, body, {headers});
                console.log(data);
            }
        }

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>