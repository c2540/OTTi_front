<template>
    <div style="color:white">
        <div>
            <div style="text-align:center; margin-top:100px">
                <select v-model="state.type" class="searchsel" style="width:15%" @change="reset">
                    <option :value="{name: 'movie'}">영화</option>
                    <option :value="{name: 'tv'}">드라마</option>
                    <option :value="{name: 'people'}">인물</option>
                </select>
                <input type="text" @keyup.enter="find()" v-model="text" style="width:70%" placeholder="검색어를 입력하세요." class="searchin">
                <v-btn @click="find()" plain style="height:57px; margin-left:10px; border-radius:10px; background-color:rgba(255, 255, 255, 0.8)">
                    <img :src="require('@/assets/imgs/searchicon.png')" style="width:20px;" >
                </v-btn>
            </div>
            <div v-if="data.results" style="font-weight:bold;font-size: 20px;margin-top:20px; text-align:center ">
                <p v-if="state.type.name === 'tv'"> 드라마 컨텐츠 중 "{{state.searchtext}}"의 검색결과</p>
                <p v-if="state.type.name === 'movie'"> 영화 컨텐츠 중 "{{state.searchtext}}"의 검색결과</p>
                <p v-if="state.type.name === 'people'"> 인물 컨텐츠 중 "{{state.searchtext}}"의 검색결과</p>
                <br/> 
                <p v-if="data.results.length === 0">검색결과 없음</p> 
            </div>
            <div v-else style="text-align:center;center;">
                <div @click="content2(tmp.id, tmp.media_type)" v-for="tmp of trends" :key="tmp" class="conbtn">    
                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`'  style="height:50px; border-radius:10px;vertical-align:middle;" >
                    <span style="font-weight:bold; text-align: center; color: white;padding : 5px">{{tmp.name}}{{tmp.title}}</span>
                </div>
            </div>
        </div> 
        <div v-if="type.name != 'people'">
            <div v-for="tmp of data.results" :key="tmp">
                <div @click="content(tmp.id)" class="result">
                    <div>
                        <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`' style="width: 200px; float: left;" 
                        class="resultimg" />
                    </div>
                    <div>
                        <p style="font-weight:bold;font-size: 20px;display:inline-block;" v-if="type.name=='movie'">{{tmp.title}}</p>
                        <p style="font-weight:bold;font-size: 20px;display:inline-block;" v-else>{{tmp.name}}</p>
                        <p class="resultcontent" v-if="type.name==='movie'">{{tmp.release_date}}</p>
                        <p class="resultcontent" v-else>{{tmp.first_air_date}}</p>
                        <br/>
                        <p class="resultcontent">{{tmp.overview}}</p>
                        <br/>
                        <p class="resultcontent">평점 : {{tmp.vote_average}}/10 점</p>
                        <p class="resultcontent" v-if="type.name==='tv'">시즌수 : {{tmp.number_of_seasons}} 시즌</p>
                        <p class="resultcontent" v-if="type.name==='tv'">에피소드수 : {{tmp.number_of_episodes}} 회</p>
                        <p class="resultcontent" v-if="type.name==='movie'">러닝타임 : {{tmp.runtime}} 분</p>
                        <p class="resultcontent" v-if="type.name==='tv'">러닝타임 : {{tmp.episode_run_time}} 분</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="type.name === 'people'" style="color:white;margin-top:20px">
            <div v-if = "state.lo === 0" style="text-align:center; color: azure; font-weight:bold; font-size: 20px; ">
                <img :src="require('@/assets/imgs/loading.gif')" style="width:100px;" /><br /><br />
                인물검색중입니다. 잠시만 기다려주세요.
            </div>
            <div v-if="data1.results&&state.lo===1" >
                <div v-for="tmp of data1.results" :key="tmp" @click="peopleinfo(tmp.id)" class="peoplediv">
                    <img :src="require('@/assets/no.png')" v-if="!tmp.profile_path" style="width:150px;height:225px;" />
                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.profile_path}`' v-if="tmp.profile_path" style="width:150px" /><br />
                    <p v-if="tmp.known_for_department === 'Acting'" style="font-size:small">배우</p>
                    <p v-if="tmp.known_for_department === 'Directing'" style="font-size:small">감독</p>
                    <p v-if="tmp.known_for_department === 'Production'" style="font-size:small">제작</p>
                    <p v-if="tmp.known_for_department === 'Writing'" style="font-size:small">극본</p>
                    <p v-if="tmp.known_for_department === 'Art'" style="font-size:small">미술감독</p>
                    <p v-if="tmp.known_for_department === 'Camera'" style="font-size:small">카메라감독</p>
                    <p v-if="tmp.known_for_department === 'Sound'" style="font-size:small">음향감독</p>
                    <p v-if="tmp.known_for_department === 'Costume & Make-Up'" style="font-size:small">의상&메이크업</p>
                    <p v-if="tmp.known_for_department === 'Crew'" style="font-size:small">스태프</p>
                    <p v-if="tmp.known_for_department === 'Editing'" style="font-size:small">편집</p>
                    <p v-if="tmp.known_for_department === 'Visual Effects'" style="font-size:small">CG감독</p>
                    <p style="font-weight:bold">{{tmp.name}}</p>
                </div>
            </div>
            <div>
                <v-pagination v-model="peoplepage" :length="data1.total_pages" @click="handlepeoplepage(peoplepage)"></v-pagination>
            </div>
        </div>
        <div style="height:500px;">
        </div>
    </div>
    <!-- 맨위로 버튼 -->
    <div @click="scrollToTop()" :class="['back-to-top-btn', {'go-top': isTop}]">
        <p style="font-size:35px; transform: translate(0px, -5px); ">▲</p> 
    </div> 
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import "@/assets/css/totop.scss"
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const state = reactive({
            data :"",
            data1 : "",
            text : "",
            searchtext : "",
            type : {name: 'movie'},
            peoplepage : 1,
            trends : [],
            lo : 2,
            isTop   : false,
        })

        const content = (no) => {
            router.push({path:"/content",query:{no:no,type:state.type.name}})
        }
        onMounted(()=>{
            window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY
                if(scrollPos >= 100){
                    state.isTop = true
                } else {
                    state.isTop = false
                }
            });
            handletrend();
        })
        const scrollToTop = async() =>{
            window.scrollTo(0, 0);
        }

        const find = async() => {
            state.searchtext = state.text
            if(state.type.name === "tv"){
                const url = `${proxy.foo}/DB/serchd.json?text=${state.text}`
                const headers = {"Content-Type":"application/json"}
                const {data} = await axios.get(url,{headers})
                state.data = data
            }
            else if(state.type.name==="movie"){
                const url = `${proxy.foo}/DB/serchm.json?text=${state.text}`
                const headers = {"Content-Type":"application/json"}
                const {data} = await axios.get(url,{headers})
                state.data = data
            }
            else if(state.type.name==="people"){
                if(state.text === ""){
                    alert('검색어를 입력해주세요.')
                    return false;
                }
                const url = `${proxy.foo}/api/peoplesearch.json?text=${state.text}&page=${state.peoplepage}`
                const headers = {"Content-Type":"application/json"}
                const {data} = await axios.get(url,{headers})
                state.lo = 0;
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
                state.lo = 1;
                state.data1 = data
            }
        }
        const peopleinfo = (id) => {
            router.push({path:'/peopleinfo',query:{id:id}})
        }
        const handlepeoplepage = (no) =>{
            state.peoplepage = no
            find();
        }

        const shuffleArray = (array) => {
            for (let i = 0; i < array.length; i++) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const handletrend = async() => {
            const url = `${proxy.foo}/api/trandingapi.json`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            const data2 = shuffleArray(data.results);
            // 트렌딩 제목 한글화.. 켜놓으니 느림
            for(let i=0;i<5;i++){
                const url1 = `${proxy.foo}/DB/selectone.json?no=${data2[i].id}&type=${data2[i].media_type}`;
                const response = await axios.get(url1,{headers})
                if(response.data.status === 200){
                    data2[i].poster_path=response.data.result.poster_path
                    if(typeof(data2[i]['title'])==='undefined'){
                        data2[i].name=response.data.result.name
                    }
                    else{
                        data2[i].title=response.data.result.title
                    }
                }
            }
            data2.splice(5, 15);
            state.trends = data2;
        }

        const content2 = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }

        const reset = () => {
            state.data = '';
            state.text = '';
        }

        return {...toRefs(state),state,find,content,peopleinfo,handlepeoplepage, content2, reset,scrollToTop}
    }
}
</script>

<style lang="scss">
    .in{
        margin-top: 5px;
        margin-right: 5px;
        padding:5px;
        color:white;
        text-align: center;
    }
    option{
        color:black;
    }
    .in1{
        border-radius: 8px;
        padding:5px;
        height:55px;
        width:400px;
        color:white;
    }
    .conbtn{
        display:inline-block;
        margin:10px 5px;
        background-color:rgba(255, 255, 255, 0.4);
        border-radius:10px;
        font-size:small;
        cursor:pointer;
        transition: 0.3s;
    }
    .conbtn:hover{
        background-color: royalblue;
        transition: 0.3s;
    }
    .result{
        display: grid;
        grid-template-columns: 260px 2fr ;
        color: azure;
        transition: 0.5s;
        margin-bottom:10px;
        cursor:pointer;
    }
    .result:hover{
        background-color: rgba(255, 255, 255, 0.2);
        border-radius:10px;
        transition: 0.5s;
    }
    .resultimg{
        width:250px;
        margin:3px;
        border-radius: 10px;
    }
    .resultcontent{
        color: azure;
        font-size: 15px;
    }
    .peoplediv{
        display:inline-block;
        width:150px;
        text-align: center;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        margin:3px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.3);
        cursor:pointer;
        color:white;
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }
    .peoplediv:hover{
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
    .searchsel{
        color:white; 
        border:1px solid lightgray; 
        background-color:rgba(255, 255, 255, 0.3);
        padding:15px;
        border-radius:10px;
        margin-right:10px;
        text-align:center;
    }
    .searchsel:focus{
        outline: none;
        padding:14px;
        border: 2px solid royalblue;
        transition:all .2s
    }
</style>