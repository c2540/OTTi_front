<template>
    <div class="con">
        <h1 style="color:white">인물 찾기</h1>

        <div style="text-align:center;">
            <input type="text" @keyup.enter="find()" v-model="state.text" placeholder="찾을 인물을 검색하세요." class="searchin">
            <v-btn @click="find()" plain style="height:57px; margin-left:10px; border-radius:10px; background-color:rgba(255, 255, 255, 0.8)">
                <img :src="require('@/assets/imgs/searchicon.png')" style="width:20px;" >
            </v-btn>
        </div><br />
        
        <div>
            <div v-if="state.data.total_results === 0">
                <p style="font-size:22px;">검색결과가 없습니다.</p>
            </div>
            <div v-for="tmp of state.data.results" :key="tmp" @click="peopleinfo(tmp.id)" class="div" >
                <img :src='`https://image.tmdb.org/t/p/w500${tmp.profile_path}`' v-if="tmp.profile_path" style="width:150px;" />
                <img :src="require('@/assets/40725741.jpg')" v-if="!tmp.profile_path" style="width:150px;height:225px;" />
                <p style="font-weight:bold; padding:0 10px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{tmp.name}}</p>
                <p v-if="tmp.known_for_department === 'Acting'">배우</p>
                <p v-if="tmp.known_for_department === 'Directing'">감독</p>
                <p v-if="tmp.known_for_department != 'Directing' && tmp.known_for_department != 'Acting'">{{tmp.known_for_department}}</p>
            </div>
            <div>
                <v-pagination v-model="state.page" :length="state.data.total_pages" @click="page(state.page)"></v-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { getCurrentInstance, onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            data : [],
            page : 1,
            text : "",
            searchtext : "",
        })

        onMounted(()=>{
            state.page = route.query.page
            handledata();
        })

        const handledata = async() => {
            const url = `${proxy.foo}/api/peoplelist.json?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url,{headers});
            // =================== 이름 한글화(느림), 주석시 영문으로 나옴(빠름) ================
            const koreanname = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
            for(let i=0;i<data.results.length;i++){
                const url2 = `${proxy.foo}/api/peopleinfo.json?key=${data.results[i].id}`
                const response = await axios.get(url2,{headers})
                for(let j=0;j<response.data.also_known_as.length;j++){
                    if(koreanname.test(response.data.also_known_as[j])){
                        data.results[i].name = response.data.also_known_as[j];
                        if(
                        data.results[i].name === '승하' ||
                        data.results[i].name === '민도윤'||
                        data.results[i].name === '새봄'||
                        data.results[i].name === '한이슬'||
                        data.results[i].name === '민정'||
                        data.results[i].name === '유정'||
                        data.results[i].name === '소희'||
                        data.results[i].name === '한서아'||
                        data.results[i].name === '지은서'

                        ){
                            data.results.splice(i, 1);
                        }
                        break;
                    }
                }
            }
            // =============================================================================
            state.data = data
            for(let i=0; i<state.data.results.length;i++){
                if(
                    state.data.results[i].name === 'Angeli Khang' ||
                    state.data.results[i].name === "Christine Bermas" ||
                    state.data.results[i].name === "Rei Akasaka" ||
                    state.data.results[i].name === "Amy Yip" 
                    ){
                    state.data.results.splice(i, 1);
                }
            }
        }

        const page = (no) =>{
            state.page = no
            router.push({path:"/people", query:{page:state.page}});
            if(state.text === ''){
                handledata();
            }
            else{
                find();
            }
        }

        const find = async() => {
            if(state.text === ''){
                handledata();
            }
            else{
                if(state.searchtext != state.text){
                    state.page = 1
                }
                const url = `${proxy.foo}/api/peoplesearch.json?text=${state.text}&page=${state.page}`
                const headers = {"Content-Type":"application/json"}
                const {data} = await axios.get(url,{headers})
                console.log(state.text);
                console.log(data);
                
                const koreanname = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
                for(let i=0;i<data.results.length;i++){
                    const url2 = `${proxy.foo}/api/peopleinfo.json?key=${data.results[i].id}`
                    const response = await axios.get(url2,{headers})
                    for(let j=0;j<response.data.also_known_as.length;j++){
                        if(koreanname.test(response.data.also_known_as[j])){
                            data.results[i].name = response.data.also_known_as[j];
                        }
                    }
                }
                state.data = data
                state.searchtext = state.text
            }
        }
        

        const peopleinfo = (id) => {
            router.push({path:'/peopleinfo',query:{id:id}})
        }

        return {state, page, peopleinfo, find}
    }
}
</script>

<style lang="css" scoped>
.con{
    background-color: rgba(255, 255, 255, 0.6);
    padding:50px;
    min-width: 880px;
    border-radius: 10px;
    text-align: center;
}
.div{
    display:inline-block;
    width:150px;
    text-align: center;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
    margin:3px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    cursor:pointer;
    color:white;
}
.div:hover{
    cursor:pointer;
    transform:scale(1.2);
    -o-transform:scale(1.2);
    -moz-transform:scale(1.2);
    -webkit-transform:scale(1.2);
    transition: transform .35s;
    -o-transition: transform .35s;
    -moz-transition: transform .35s;
    -webkit-transition: transform .35s;
    backdrop-filter: blur(10px);
}

    .searchin{
        color:white; 
        border:1px solid lightgray; 
        background-color:rgba(255, 255, 255, 0.3);
        padding:15px;
        width:700px;
        border-radius:10px;
    }
    .searchin:focus{
        outline: none;
        padding:14px;
        border: 2px solid royalblue;
        transition:all .2s
    }
    .searchin::placeholder{
        color:white;
    }
    .searchin:focus::placeholder{
        color:gray;
    }

</style>