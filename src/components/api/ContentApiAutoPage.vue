<template>
    <div style="color:white; text-align:center">
        <img :src="require('@/assets/imgs/loading.gif')" style="width:100px; margin-top:150px;" />
        <h2>작품정보를 불러오는 중 입니다. 잠시만 기다려주세요.</h2>
    </div>
    <br><br><br><br><br>
</template>

<script>
import axios from 'axios'
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            id : route.query.no,
            type : route.query.type,
            OttInfo : [],
            ContentInfo :"",
            imdb : "",
            key :"",
            runtime : 0,
        })

        onMounted(()=>{
            loadinfo();
        })

        const Ott = async() => {
            const url = `https://api.themoviedb.org/3/${route.query.type}/${route.query.no}/watch/providers?api_key=a97e8456c333e46c3010084e17ebe837`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.OttInfo = []
    
            if(typeof(data.results['KR']) !== "undefined"){
                if(typeof(data.results.KR['flatrate']) !== 'undefined'){
                    for(let i=0;i<data.results.KR.flatrate.length;i++){
                        state.OttInfo += data.results.KR.flatrate[i].provider_id + ","
                    }
                }
            }    
        }

        const Genre = async() => {
            const url = `${proxy.foo}/api/contentinfo.json?type=${route.query.type}&id=${route.query.no}`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            state.ContentInfo = data
        }

        const imdbId = async() => {
            const url = `https://api.themoviedb.org/3/${route.query.type}/${route.query.no}/external_ids?api_key=a97e8456c333e46c3010084e17ebe837&language=ko-KR`
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            console.log(data)
            state.imdb = data.imdb_id
        }

        const Content_postD = async() => {
            if(state.ContentInfo.episode_run_time.length === 0){
                state.runtime = null;
            }
            else{
                state.runtime = state.ContentInfo.episode_run_time[0];
            }
            const url = `${proxy.foo}/api/postoneinfoD.json`
            const headers = {"Contnet-type":"application/json"}
            const body = {
                id : state.id,
                adult : state.ContentInfo.adult,
                backdrop_path : state.ContentInfo.backdrop_path,
                episode_run_time : state.runtime,
                first_air_date : state.ContentInfo.first_air_date,
                imdb_id : state.imdb,
                name : state.ContentInfo.name,
                number_of_episodes : state.ContentInfo.number_of_episodes,
                number_of_seasons : state.ContentInfo.number_of_seasons,
                overview : state.ContentInfo.overview,
                popularity : state.ContentInfo.popularity,
                poster_path : state.ContentInfo.poster_path,
                vote_average : state.ContentInfo.vote_average,
                vote_count : state.ContentInfo.vote_count,
                trailer : state.key
            }
            const {data} = await axios.post(url,body,{headers})
            console.log(data)
            if(data.status === 200){
                OttD_post()
                GenreD_post()
            }
        }
        const Content_postM = async() => {
            const url = `${proxy.foo}/api/postoneinfoM.json`
            const headers = {"Contnet-type":"application/json"}
            const body = {
                id : state.id,
                adult : state.ContentInfo.adult,
                backdrop_path : state.ContentInfo.backdrop_path,
                runtime : state.ContentInfo.runtime,
                release_date : state.ContentInfo.release_date,
                imdb_id : state.imdb,
                title : state.ContentInfo.title,
                overview : state.ContentInfo.overview,
                popularity : state.ContentInfo.popularity,
                poster_path : state.ContentInfo.poster_path,
                vote_average : state.ContentInfo.vote_average,
                vote_count : state.ContentInfo.vote_count,
                trailer : state.key
            }
            const {data} = await axios.post(url,body,{headers})
            console.log(data)
            if(data.status === 200){
                OttM_post()
                GenreM_post()
            }
        }
        const OttD_post = async() => {
            const url = `https://api.themoviedb.org/3/${route.query.type}/${route.query.no}/watch/providers?api_key=a97e8456c333e46c3010084e17ebe837`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            if(typeof(data.results['KR']) !== "undefined"){
                if(typeof(data.results.KR['flatrate']) !== 'undefined'){
                    for(let i=0;i<data.results.KR.flatrate.length;i++){
                        const url =`${proxy.foo}/api/dramaottpost.json?no=${route.query.no}`
                        const headers = {"Content-Type":"application/json"}
                        const body = {
                            id : data.results.KR.flatrate[i].provider_id
                        }
                        const result = await axios.post(url,body,{headers})
                        console.log(result)
                        console.log(data.results.KR.flatrate[i])
                    }
                }
            }
        }
        const OttM_post = async() => {
            const url = `https://api.themoviedb.org/3/${route.query.type}/${route.query.no}/watch/providers?api_key=a97e8456c333e46c3010084e17ebe837`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            if(typeof(data.results['KR']) !== "undefined"){
                if(typeof(data.results.KR['flatrate']) !== 'undefined'){
                    for(let i=0;i<data.results.KR.flatrate.length;i++){
                        const url =`${proxy.foo}/api/movieottpost.json?no=${route.query.no}`
                        const headers = {"Content-Type":"application/json"}
                        const body = {
                            id : data.results.KR.flatrate[i].provider_id
                        }
                        const result = await axios.post(url,body,{headers})
                        console.log(result)
                        console.log(data.results.KR.flatrate[i])
                    }
                }
            }
        }
        const GenreD_post = async() => {
            for(var i=0;i<state.ContentInfo.genres.length;i++){
                const url = `${proxy.foo}/api/dramagenrepost.json?id=${route.query.no}`;
                const headers = {"Content-Type":"application/json"};
                const body = {
                    id : state.ContentInfo.genres[i].id
                }
                const result = await axios.post(url, body, {headers});
                console.log(result);
            }
        }

        const GenreM_post = async() => {
            for(var i=0;i<state.ContentInfo.genres.length;i++){
                const url = `${proxy.foo}/api/moviegenrepost.json?id=${route.query.no}`;
                const headers = {"Content-Type":"application/json"};
                const body = {
                    id : state.ContentInfo.genres[i].id
                }
                const result = await axios.post(url, body, {headers});
                console.log(result);
            }
        }
        const youtube = async() => {
            const url2 = `${proxy.foo}/api/trailer.json?id=${route.query.no}&type=${route.query.type}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url2, {headers});
            if(!response.data.results[0]){
                state.key = null;
            }
            else{
                state.key = response.data.results[0].key
            }
        }

        const loadinfo = async() => {
            await Ott()
            await Genre()
            await imdbId()
            await youtube()
            await post()
        }
        
        const post = async() => {
            if(state.type === "tv"){
                await Content_postD()
            }
            else{
                await Content_postM()
            }
            
            router.push({path:'/content',query:{no:state.id, type:state.type}})
        }
    
        return {
            ...toRefs(state),state,post,loadinfo
        }
    }
}
</script>

<style lang="scss" scoped>

</style>