<template>
    <div style="background-color: white;">
        <select v-model="state.type">
            <option value="tv" >tv</option>
            <option value="movie">movie</option>
        </select>
        <br>
        ott정보 : {{state.OttInfo}} <br>
        성인등급여부 : {{state.ContentInfo.adult}}<br>
        <div v-if="state.type==='tv'">
            이름 : {{state.ContentInfo.name}}<br>
        </div>
        <div v-if="state.type==='movie'">
            이름 : {{state.ContentInfo.title}}<br>
        </div>
        줄거리 : {{state.ContentInfo.overview}}<br>
        <div v-if="state.type==='tv'">
            런타임 : {{state.ContentInfo.episode_run_time}}<br>
        </div>
        <div v-if="state.type==='movie'">
            런타임 : {{state.ContentInfo.runtime}}<br>
        </div>
        <div v-if="state.type==='tv'">
            방영일 : {{state.ContentInfo.first_air_date}}<br>
        </div>
        <div v-if="state.type==='movie'">
            방영일 : {{state.ContentInfo.release_date}}<br>
        </div>
        장르 정보 : {{state.ContentInfo.genres}}<br>
        <div v-for="tmp of state.ContentInfo.genres" :key="tmp">
            {{tmp.id}}
        </div>
        인기도 : {{state.ContentInfo.popularity}}<br>
        포스터 : {{state.ContentInfo.poster_path}}<br>
        백드롭 : {{state.ContentInfo.backdrop_path}}<br>
        평점 : {{state.ContentInfo.vote_average}}<br>
        투표수 : {{state.ContentInfo.vote_count}}<br>
        <div v-if="state.type==='tv'">
            시즌수 : {{state.ContentInfo.number_of_seasons}}<br>
            에피소드 수 : {{state.ContentInfo.number_of_episodes}}<br>
        </div>
        IMDB_ID : {{state.imdb}} <br>
        예고편 : {{state.key}}

        <br>
        <input type="number" v-model="state.id" >
        <br>
        <button @click="loadinfo()">불러오기</button>
        <hr>
        <button @click="post()">post</button>
    </div>
</template>

<script>
import axios from 'axios'
import { getCurrentInstance, reactive, toRefs } from 'vue'

export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const state = reactive({
            id : 0,
            type : "tv",
            OttInfo : [],
            ContentInfo :"",
            imdb : "",
            key :"",
        })

        const Ott = async() => {
            const url = `https://api.themoviedb.org/3/${state.type}/${state.id}/watch/providers?api_key=a97e8456c333e46c3010084e17ebe837`
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
            const url = `${proxy.foo}/api/contentinfo.json?type=${state.type}&id=${state.id}`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            state.ContentInfo = data
        }

        const imdbId = async() => {
            const url = `https://api.themoviedb.org/3/${state.type}/${state.id}/external_ids?api_key=a97e8456c333e46c3010084e17ebe837&language=ko-KR`
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            console.log(data)
            state.imdb = data.imdb_id
        }

        const Content_postD = async() => {
            const url = `${proxy.foo}/api/postoneinfoD.json`
            const headers = {"Contnet-type":"application/json"}
            const body = {
                id : state.id,
                adult : state.ContentInfo.adult,
                backdrop_path : state.ContentInfo.backdrop_path,
                episode_run_time : state.ContentInfo.episode_run_time[0],
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
                runtime : state.ContentInfo.runtime[0],
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
            const url = `https://api.themoviedb.org/3/${state.type}/${state.id}/watch/providers?api_key=a97e8456c333e46c3010084e17ebe837`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            if(typeof(data.results['KR']) !== "undefined"){
                if(typeof(data.results.KR['flatrate']) !== 'undefined'){
                    for(let i=0;i<data.results.KR.flatrate.length;i++){
                        const url =`${proxy.foo}/api/dramaottpost.json?no=${state.id}`
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
            const url = `https://api.themoviedb.org/3/${state.type}/${state.id}/watch/providers?api_key=a97e8456c333e46c3010084e17ebe837`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            if(typeof(data.results['KR']) !== "undefined"){
                if(typeof(data.results.KR['flatrate']) !== 'undefined'){
                    for(let i=0;i<data.results.KR.flatrate.length;i++){
                        const url =`${proxy.foo}/api/movieottpost.json?no=${state.id}`
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
                const url = `${proxy.foo}/api/dramagenrepost.json?id=${state.id}`;
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
                const url = `${proxy.foo}/api/moviegenrepost.json?id=${state.id}`;
                const headers = {"Content-Type":"application/json"};
                const body = {
                    id : state.ContentInfo.genres[i].id
                }
                const result = await axios.post(url, body, {headers});
                console.log(result);
            }
        }
        const youtube = async() => {
            const url2 = `${proxy.foo}/api/trailer.json?id=${state.id}&type=${state.type}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url2, {headers});
            if(!response.data.results[0]){
                state.key = null;
            }
            else{
                state.key = response.data.results[0].key
            }
        }

        const loadinfo = () => {
            Ott()
            Genre()
            imdbId()
            youtube()
        }

        const post = async() => {
            if(state.type === "tv"){
                await Content_postD()
            }
            else{
                await Content_postM()
            }
        }
    
        return {
            ...toRefs(state),state,post,loadinfo
        }
    }
}
</script>

<style lang="scss" scoped>

</style>