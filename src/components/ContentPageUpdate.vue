<template>
    <div v-if="!state.data"
        style="text-align:center; color: azure; margin: 30% auto auto auto; font-weight:bold; font-size: 20px; ">
            <img :src="require('@/assets/imgs/loading.gif')" style="width:100px;" /><br /><br />
            <span>컨텐츠 정보를 불러오는 중입니다. 잠시만 기다려주세요.</span>
    </div>
    <div class="container" v-if="state.data">
        <div v-bind:style="{ backgroundImage: 'url(' +state.imgurl+state.data.result.backdrop_path+ ')' }" class="divdiv" >
            <div style="background-color:rgba(0, 0, 0, 0.6);padding : 50px;border-radius: 10px;" >
                <h1 style="color:azure">컨텐츠 수정요청</h1>
                <!-- 그리드 분할 시작 -->
                <div class="con">
                    <div>
                        <img :src= '`${state.imgurl}${state.data.result.poster_path}`' 
                            style="width:50%; margin: 0 auto 0 auto;" /><br />
                    </div>
                    <div style="color:azure;">
                        <label>제목</label>
                        <input v-if="state.type==='tv'" v-model="state.data.result.name" class="inupt">
                        <input v-if="state.type==='movie'" v-model="state.data.result.title" class="inupt">
                        <br/>
                        <label>런타임(분)</label>
                        <input type="number" v-if="state.type==='movie'" v-model="state.data.result.runtime" class="inupt">
                        <input type="number" v-if="state.type==='tv'" v-model="state.data.result.episode_run_time" class="inupt">
                        <br/>
                        <label>공개일</label>
                        <input type="text" v-if="state.type==='movie'" v-model="state.data.result.release_date" class="inupt">
                        <input type="text" v-if="state.type==='tv'" v-model="state.data.result.first_air_date" class="inupt">
                        <br/>
                        <label style="width:100%">줄거리</label><br />
                            <textarea v-model="state.data.result.overview"
                                style="background-color: azure; width: 100%; height: 50%; min-height: 100px; margin-top:5px">
                        </textarea>
                        <br />
                    </div>
                    <div v-if="state.type==='tv'" >
                        <label>시즌수</label>
                        <input type="text" v-model="state.data.result.number_of_seasons" class="inupt">
                        <br>
                        <label>에피소드수</label>
                        <input type="text" v-model="state.data.result.number_of_episodes" class="inupt">
                    </div>
                    <div>
                        <label>성인물 여부</label>
                        <select v-model="state.data.result.adult" style="background-color: azure;margin-bottom:5px; width:182px;">
                            <option value="true">yes</option>
                            <option value="false">no</option>
                        </select>
                        <br />
                        <label>IMDB_ID</label>
                        <input v-model="state.data.result.imdb_id" class="inupt"><br />
                    </div>
                    
                    <div style="color:azure;"> 
                        <!-- <label>장르</label> -->
                        <!-- 셀렉박스 추가로 22-11-25 주석처리함 -->
                        <!-- <span>&nbsp;*장르입력시 id값으로 입력할것 다중 입력시 , 로 구분</span>
                        <input v-if="state.type==='movie'" v-model="state.genre" style="background-color: azure;margin-bottom:5px; width:100%;"> -->
                    </div>
                    <!-- <div v-if="state.type==='tv'">
                        <input v-model="state.genre" style="background-color: azure;margin-bottom:5px; width:100%;">
                    </div> -->
                </div>
                <br>
                <div style="color:azure;">
                    <!-- {{state.genre}}{{state.provider}} -->
                    <label>장르</label>
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="12">
                            <v-select v-model="state.genre1" v-on:update:model-value="test()"
                                 v-if="state.type==='tv'"
                                :items="[
                                    {value:16,title:'애니메이션'},{value:18,title:'드라마'},{value:35,title:'코미디'},
                                    {value:80,title:'범죄'},{value:99,title:'다큐멘터리'},{value:9648,title:'미스터리'},
                                    {value:10751,title:'가족'},{value:10759,title:'Action & Adventure'},{value:10768,title:'War & Politics'},
                                    {value:10762,title:'Kids'},{value:10763,title:'News'},{value:10764,title:'Reality'},
                                    {value:10765,title:'Sci-Fi & Fantasy'},{value:10766,title:'Soap'},{value:10767,title:'TalkShow'},
                                    {value:37,title:'서부'},
                                ]"
                                attach
                                chips
                                label="장르 선택"
                                multiple
                                >
                            </v-select>
                            
                            <v-select v-model="state.genre1" v-on:update:model-value="test()"
                                v-if="state.type==='movie'"
                                :items="[
                                    {value:12,title:'모험'},{value:14,title:'판타지'},{value:16,title:'애니메이션'},
                                    {value:18,title:'드라마'},{value:27,title:'공포'},{value:28,title:'액션'},
                                    {value:35,title:'코미디'},{value:36,title:'역사'},{value:37,title:'서부'},
                                    {value:53,title:'스릴러'},{value:80,title:'범죄'},{value:99,title:'다큐멘터리'},
                                    {value:878,title:'SF'},
                                    {value:9648,title:'미스터리'},{value:10402,title:'음악'},{value:10749,title:'로맨스'},
                                    {value:10751,title:'가족'},{value:10752,title:'전쟁'},{value:10770,title:'TV 영화'},     
                                ]"
                                attach
                                chips
                                label="장르 선택"
                                multiple
                                >
                            </v-select>
                        </v-col>
                    </v-row>
                    <!-- <table border="1" v-if="state.data2.genre.length > 0">
                        <tr v-for="tmp of 10" :key="tmp">
                            <td class="tdid">{{state.data2.genre[tmp-1].id}}</td>
                            <td class="tdname">{{state.data2.genre[tmp-1].name}}</td>

                            <td class="tdid">{{state.data2.genre[tmp+9].id}}</td>
                            <td class="tdname">{{state.data2.genre[tmp+9].name}}</td>
            
                            <td class="tdid">{{state.data2.genre[tmp+16].id}}</td>
                            <td class="tdname">{{state.data2.genre[tmp+16].name}}</td>
                        </tr>
                    </table> -->
                </div>
                <div style="color:azure;">
                    <label>OTT 사이트</label>
                    <!-- <input v-model="state.provider" class="inupt">
                    <span>&nbsp;* 입력시 id값으로 입력할것 다중 입력시 , 로 구분  * ex) 8,97,337</span>
                    <table border="1">
                        <tr v-for="tmp of state.data2.ott" :key="tmp">
                            <td class="tdid">{{tmp.id}}</td>
                            <td class="tdname">{{tmp.provider_name}}</td>
                        </tr>
                    </table> -->
                    <v-row>
                        <v-col class="d-flex" cols="12" sm="12">
                            <v-select v-model="state.provider1" v-on:update:model-value="test1()"
                                :items="[
                                    {value:8,title:'NETFLIX'},{value:119,title:'AMAZON'},{value:356,title:'WAVVE'},
                                    {value:96,title:'NAVER'},{value:337,title:'DISNEY+'},{value:3897,title:'TVING'},
                                    {value:97,title:'WATCHA'},{value:350,title:'APPLETV'},
                                ]"
                                attach
                                chips
                                label="공급자 선택"
                                multiple
                                >
                            </v-select>
                            
                        </v-col>
                    </v-row>
                </div>
                <br/>
                <hr/>
                <br/>
                <div>
                    <iframe style="border-radius:10px; width:100%; height:500px" :src="`https://www.youtube.com/embed/${state.data.result.trailer}`"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe><br />
                    <label style="width: 150px; margin-bottom:5px;">트레일러 주소</label>
                        <span style="color:azure;">https://www.youtube.com/embed/</span>
                    <input type="text" v-model="state.data.result.trailer" class="inupt" >
                </div>
                <br/>
                <hr/>
                <br/>
                <div>
                    <iframe style="border-radius:10px; width:100%; height:500px" :src="`https://www.youtube.com/embed/${state.data.result.youtubereview}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe><br />
                    <label style="width: 150px; margin-bottom:5px;">유튜브 리뷰 주소</label>
                        <span style="color:azure;"> https://www.youtube.com/embed/</span>
                    <input type="text" v-model="state.data.result.youtubereview" class="inupt" >
                </div>
                    <button @click="update" class="btn">수정요청</button>
            </div>
        </div>
    </div>
    <!-- 맨위로 버튼 -->
    <div @click="scrollToTop()" :class="['back-to-top-btn', {'go-top': isTop}]">
        <p style="font-size:35px; transform: translate(0px, -5px); ">▲</p> 
    </div> 
</template>

<script>
import { computed, reactive} from '@vue/reactivity'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import "@/assets/css/totop.scss"
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const store = useStore();
        const route = useRoute();

        const state = reactive({
            logged  : computed(() => store.getters.getLogged),
            token : sessionStorage.getItem("token"),
            no : Number(route.query.no),
            type : String(route.query.type),
            data : "",
            data2 : "",
            provider : "",
            provider1 : [],
            genre : "",
            genre1 : [],
            isTop   : false,
            imgurl : "https://image.tmdb.org/t/p/w500",
            videourl : "https://www.youtube.com/embed",
            logourl : "https://www.themoviedb.org/t/p/original/",
        })       



        onMounted(()=>{
            window.scrollTo(0,0);
            window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY
                if(scrollPos >= 100){
                    state.isTop = true
                } else {
                    state.isTop = false
                }
            });
            if(state.logged === true){
                handledata()
                handledata2()
                window.scrollTo(0, 0);
            }
            else{
                alert("로그인이 필요한 서비스입니다.")
                router.push({path:"/login",query:{no:state.no,type:state.type}})
            }
        })
        const scrollToTop = async() =>{
            window.scrollTo(0, 0);
        }
        
        const handledata = async() => {
            const url = `${proxy.foo}/DB/selectone.json?no=${state.no}&type=${state.type}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            if(data.status === 200){
                state.data = data;
                
                if(data.provider.length!==0){
                    for(let i=0; i<data.provider.length;i++){
                        state.provider1.push(data.provider[i].id)
                        test1()
                    }
                }
               
                if(data.genre.length !== 0){
                    for(let i=0; i<data.genre.length;i++){
                        state.genre1.push(data.genre[i].id)
                        test()
                    }
                }
            }
        }
        
        const handledata2 = async() => {
            const url = `${proxy.foo}/DB/category.json`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data2 = data
                const len = state.data2.length;
                const mod = state.data2.length % 10;

                for(let i=0; i<10 -mod; i++ ){
                    state.data2[len+i] = {id:'', name:''};
                } 
        }

        const test = () => {
            state.genre = ""
            for(let i=0; i<state.genre1.length; i ++){
                state.genre += state.genre1[i]+","
            }
        }
        const test1 = () => {
            state.provider = ""
            for(let i=0; i<state.provider1.length; i ++){
                state.provider += state.provider1[i]+","
            }
        }
    

        const update = async() => {
            if(state.genre.length === 0){
                alert('장르를 추가해 주세요');
                return false;
            }


            const url = `${proxy.foo}/content/contentupdate.json`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN":state.token
            }
            const body = {
                contentcode : state.no,
                type : state.type,
                provider : state.provider,
                genre : state.genre,
                adult :state.data.result.adult,
                name : state.data.result.name,
                title :state.data.result.title,
                overview :state.data.result.overview,
                run_time :state.data.result.runtime,
                episode_run_time:state.data.result.episode_run_time,
                release_date:state.data.result.release_date,
                first_air_date:state.data.result.first_air_date,
                number_of_episodes:state.data.result.number_of_episodes,
                number_of_seasons:state.data.result.number_of_seasons,
                trailer:state.data.result.trailer,
                imdb_id:state.data.result.imdb_id,
                youtubereview:state.data.result.youtubereview
            }
            const {data} = await axios.post(url,body,{headers})
            if(data.status === 200){
                alert("수정요청이 완료되었습니다.")
                router.push({path:"/content",query:{no:state.no,type:state.type}})
            }
        }

        return {state,update,test,test1,scrollToTop}
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding:10px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color:rgba(255, 255, 255, 0.5);
}

.divdiv{
    border-radius: 10px;
    background-repeat : no-repeat;
    background-size : cover;
}
.con{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.inupt{
    background-color: azure;
    margin-bottom: 5px;
}
label{
    color: azure;
    display: inline-block;
    width:130px;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 2px 10px;
    border-radius: 5px;
    margin-right:5px;
    margin-left: 0;
    left: 0;
    text-align: center;
}
table {
    margin-left:auto; 
    margin-right:auto;
}
.btn{
    width:100%;
    margin-top:20px;
    background-color:rgba(255, 255, 255, 0.6);
    color: azure;
    padding:10px;
    border-radius:10px
}
.btn:hover{
    background-color: royalblue;
    color: azure;
    transition: 0.3s;
}
.vid{
    margin: 0 auto 0 auto;
    border-radius:10px;
    width:70%; 
    min-height:300px;
}
.tdid{
    width: 80px;
    background-color:rgba(255, 255, 255, 0.2);
    text-align: center;
}
.tdname{
    width: 180px;
    text-align: center;
}
</style>