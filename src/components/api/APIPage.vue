<template>
    <div v-if="state.datas" style="background-color: white ;" >
        {{state.datas}}
        <button @click="post()" >드라마</button>
        <hr>
        <button @click="post2()" >영화</button>
    </div>
</template>

<script>
import axios from 'axios'
import {  getCurrentInstance, reactive, toRefs } from 'vue'

export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const state = reactive({
            data : "",
            datas : [],
        })

        const post = () => {
            api1()
        }

        const post2 = () => {
            API1()
        }

        const handledata = async() => {
            for(let tmp of state.datas){
                const url = `https://api.themoviedb.org/3/tv/${tmp}/watch/providers?api_key=a97e8456c333e46c3010084e17ebe837`
                const headers = {"Content-Type":"application/json"}
                const {data} = await axios.get(url,{headers})
                if(typeof(data.results['KR']) !== "undefined"){
                    if(typeof(data.results.KR['flatrate']) !== 'undefined'){
                        for(let i=0;i<data.results.KR.flatrate.length;i++){
                            state.data = data.results.KR.flatrate[i].provider_id
                            console.log(state.data)
                            api(tmp);
                        }
                    }
                }
            }
        }
        const api = async(tmp) => {
            const url =`${proxy.foo}/api/tet.json?no=${tmp}`
            const headers = {"Content-Type":"application/json"}
            const body = {
                id : state.data
            }
            const {data} = await axios.post(url,body,{headers})
            console.log(data)
        }

        const api1 = async() => {
            const url =`${proxy.foo}/api/tet2.json`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.datas = data.ID
            handledata()
        }

        const handledata1 = async() => {
            for(let tmp of state.datas){
                const url = `https://api.themoviedb.org/3/movie/${tmp}/watch/providers?api_key=a97e8456c333e46c3010084e17ebe837`
                const headers = {"Content-Type":"application/json"}
                const {data} = await axios.get(url,{headers})
                if(typeof(data.results['KR']) !== "undefined"){
                    if(typeof(data.results.KR['flatrate']) !== 'undefined'){
                        for(let i=0;i<data.results.KR.flatrate.length;i++){
                            state.data = data.results.KR.flatrate[i].provider_id
                            console.log(state.data)
                            API(tmp);
                        }
                    }
                }
            }
        }
        const API = async(tmp) => {
            const url =`${proxy.foo}/api/tetM.json?no=${tmp}`
            const headers = {"Content-Type":"application/json"}
            const body = {
                id : state.data
            }
            const {data} = await axios.post(url,body,{headers})
            console.log(data)
        }

        const API1 = async() => {
            const url =`${proxy.foo}/api/tetM2.json`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.datas = data.ID
            handledata1()
        }
    
        return {
            ...toRefs(state),state,post,post2
        }
    }
}
</script>

<style lang="scss" scoped>

</style>