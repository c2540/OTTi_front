<template>
    <div>
        <div v-if="!state.data"
        style="text-align:center; color: azure; margin: 30% auto auto auto; font-weight:bold; font-size: 20px; ">
            <img :src="require('@/assets/imgs/loading.gif')" style="width:100px;" /><br /><br />
            <span>컨텐츠 정보를 불러오는 중입니다. 잠시만 기다려주세요.</span>
        </div>
        <v-container id="app" v-if="state.data">
            <v-row style="min-width:800px;">
                <v-col class="d-flex" cols="12" sm="2">
                    <v-select v-model="state.type" v-on:update:model-value="reset()"
                        :items="[
                            {value:'tv',title:'드라마'},
                            {value:'movie',title:'영화'},
                        ]"
                        style="width:80px; margin-top: 5px; color: azure; ">
                    </v-select>
                </v-col>
                <v-col class="d-flex" cols="12" sm="4">
                    <v-select v-model="state.provider" v-on:update:model-value="pagereset(), prov()"
                        :items="[
                            {value:'1',title:'전체 OTT 보기'},
                            {value:'8',title:'넷플릭스'},
                            {value:'337',title:'디즈니 플러스'},
                            {value:'350',title:'애플 TV'},
                            {value:'119',title:'아마존 프라임'},
                            {value:'97',title:'왓챠'},
                            {value:'356',title:'웨이브'},
                            {value:'3897',title:'티빙'}
                        ]"
                        style="width:80px; margin-top: 5px; color: azure;">
                    </v-select>
                </v-col>
                <v-col v-if="state.type==='tv'" class="d-flex" cols="12" sm="3">
                    <v-select v-model="state.genre" v-on:update:model-value="pagereset(),genre()"
                        :items="[
                            {value:'1',title:'전체 장르'},
                            {value:'16',title:'애니메이션'},
                            {value:'18',title:'드라마'},
                            {value:'35',title:'코미디'},
                            {value:'37',title:'서부'},
                            {value:'80',title:'범죄'},
                            {value:'99',title:'다큐멘터리'},
                            {value:'9648',title:'미스터리'},
                            {value:'10751',title:'가족'},
                            
                            {value:'10759',title:'액션&모험'},
                            {value:'10762',title:'어린이'},
                            {value:'10765',title:'SF&판타지'},
                            {value:'10768',title:'전쟁&정치'},               
                        ]"
                        style="width:80px; margin-top: 5px; color: azure;">
                    </v-select>
                </v-col>
                <v-col v-if="state.type==='movie'" class="d-flex" cols="12" sm="3">
                    <v-select v-model="state.genre" v-on:update:model-value="pagereset(),genre()"
                        :items="[
                            {value:'1',title:'전체 장르'},
                            {value:'16',title:'애니메이션'},
                            {value:'18',title:'드라마'},
                            {value:'35',title:'코미디'},
                            {value:'37',title:'서부'},
                            {value:'80',title:'범죄'},
                            {value:'99',title:'다큐멘터리'},
                            {value:'9648',title:'미스터리'},
                            {value:'10751',title:'가족'},
                            
                            {value:'12',title:'모험'},
                            {value:'14',title:'판타지'},
                            {value:'27',title:'공포'},
                            {value:'28',title:'액션'},
                            {value:'36',title:'역사'},
                            {value:'53',title:'스릴러'},
                            {value:'878',title:'SF'},
                            {value:'10402',title:'음악'},
                            {value:'10749',title:'로멘스'},
                            {value:'10752',title:'전쟁'},             
                        ]"
                        style="width:80px; margin-top: 5px; color: azure;">
                    </v-select>
                </v-col>
                <v-col class="d-flex" cols="12" sm="3">
                    <v-select v-model="state.sort" v-on:update:model-value="sort(),pagereset()"
                        :items="[
                            {value:'release_date.desc',title:'최신순으로 보기'},
                            {value:'release_date.asc',title:'오래된 순으로 보기'},
                            {value:'vote_average.desc',title:'높은 평점부터 보기'},
                            {value:'vote_average.asc',title:'낮은 평점부터 보기'}
                        ]"
                        style="width:80px; margin-top: 5px; color: azure;">
                    </v-select>
                </v-col>
            </v-row>
        </v-container>
        <br>
        <div v-if="state.data.total === 0"
            style="font-weight:bold;font-size: 25px; color:azure; text-align: center; margin-top: 150px;">
            <p> 컨텐츠가 없습니다 </p>
        </div>
        <div v-if="state.data.total > 0" class="mainpalette">
            <div v-for="tmp of state.data.result" :key="tmp" class="contentpalette" @click="content(tmp.id)" style="cursor:pointer" >
                <div>
                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`' v-if="tmp.poster_path" style="width:200px; float: left; border-radius:15px"/>
                    <img :src = "require('@/assets/noposter.png')" v-if="!tmp.poster_path" style="width:200px; float: left; border-radius:15px" />
                </div>
                <div style="padding:5px">
                    <p v-if="state.type==='tv'" class="title">{{tmp.name}}</p>
                    <p v-if="state.type==='movie'" class="title">{{tmp.title}}</p><br />
                    <p>평점 : {{tmp.voteaverage}}/10</p><br />
                        <div>
                            <div v-if="tmp.overview === '' "  style="min-height:80px; line-height:100px;">등록된 작품 소개가 없습니다</div>
                            <div v-else class="overview">{{tmp.overview}}</div>
                        </div>
                        <br/>
                    <div style="bottom:5px;">
                        <div v-if="state.type==='movie'">
                            <p v-if="tmp.releasedate === null"> 개봉예정작 </p>
                            <p v-else> 개봉일 {{tmp.releasedate}} </p>
                        </div>
                        <div v-if="state.type==='tv'">
                            <p v-if="tmp.firstairdate === null"> 방영 예정작 </p>
                            <p v-else>첫 방영일 {{tmp.firstairdate}} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        <div style="text-align: center; color: azure;">
            <v-pagination
            v-model="state.page" :length="Math.ceil(state.data.total/10)" @click="page(state.page)"
            ></v-pagination>
        </div>
    </div>
    <!-- 맨위로 버튼 -->
    <div @click="scrollToTop()" :class="['back-to-top-btn', {'go-top': isTop}]">
        <p style="font-size:35px; transform: translate(0px, -5px); ">▲</p> 
    </div> 
</template>

<script>
import axios from 'axios'
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import "@/assets/css/global.css";
import "@/assets/css/totop.scss";

export default {
setup () {
        const { proxy } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            data    : "",
            page    : 1,
            provider: 1,
            sort    : "release_date.desc",
            type    : "tv",
            genre   : 1,
            isTop   : false,
        })

        onMounted(()=>{
            window.addEventListener('scroll', () => {
                let scrollPos = window.scrollY
                if(scrollPos >= 100){
                    state.isTop = true
                } else {
                    state.isTop = false
                }
            })
            state.page = route.query.page
            state.sort = route.query.sort
            state.type = route.query.type
            state.provider = route.query.provider
            state.genre = route.query.genre
            
            handledata()
        })
        const scrollToTop = async() =>{
            window.scrollTo(0, 0);
        }

        const handledata = async() => {
            if(state.type === "tv"){
                if(state.provider==1 && state.genre==1){
                    const url = `${proxy.foo}/contentlist/alltv?sort=${state.sort}&page=${state.page}`
                    const headers = {"Content-Type":"application/json"}
                    const {data} = await axios.get(url,{headers})
                    state.data = data
                    window.scrollBy(0,-5000)
                }
                else{
                    const url = `${proxy.foo}/contentlist/tvlist.json?sort=${state.sort}&provider=${state.provider}&page=${state.page}&genre=${state.genre}`
                    const headers = {"Content-Type":"application/json"}
                    const {data} = await axios.get(url,{headers})
                    state.data = data
                    window.scrollBy(0,-5000)
                }
            }
            else if(state.type === "movie"){
                if(state.provider==1 && state.genre==1){
                    const url = `${proxy.foo}/contentlist/allmovie?sort=${state.sort}&page=${state.page}`
                    const headers = {"Content-Type":"application/json"}
                    const {data} = await axios.get(url,{headers})
                    state.data = data
                    window.scrollBy(0,-5000)
                }
                else{
                    const url = `${proxy.foo}/contentlist/movielist.json?sort=${state.sort}&provider=${state.provider}&page=${state.page}&genre=${state.genre}`
                    const headers = {"Content-Type":"application/json"}
                    const {data} = await axios.get(url,{headers})
                    state.data = data
                    window.scrollBy(0,-5000)
                }
            }
        }

        const genre =() => {
            handledata()
            router.push({path:"/contentfind", query:{page:state.page,type:state.type,genre:state.genre,provider:state.provider,sort:state.sort}});
        }

        const sort = () => {
            handledata()
            router.push({path:"/contentfind", query:{page:state.page,type:state.type,genre:state.genre,provider:state.provider,sort:state.sort}});
        }
        const prov = () => {
            handledata()
            router.push({path:"/contentfind", query:{page:state.page,type:state.type,genre:state.genre,provider:state.provider,sort:state.sort}});
        }
        const content = (no) => {
            router.push({path:'/content',query:{no:no,type:state.type}})
        }
        const type = () => {
            handledata()
            router.push({path:"/contentfind", query:{page:state.page,type:state.type,genre:state.genre,provider:state.provider,sort:state.sort}});
        }
        const page = () =>{
            handledata()
            router.push({path:"/contentfind", query:{page:state.page,type:state.type,genre:state.genre,provider:state.provider,sort:state.sort}});
        }
        const pagereset = () => {
            state.page = 1
            router.push({path:"/contentfind", query:{page:state.page,type:state.type,genre:state.genre,provider:state.provider,sort:state.sort}});
        }
        const provreset = () => {
            state.provider = 1
            router.push({path:"/contentfind", query:{page:state.page,type:state.type,genre:state.genre,provider:state.provider,sort:state.sort}});
        }
        const genrereset = () => {
            state.genre = 1
            router.push({path:"/contentfind", query:{page:state.page,type:state.type,genre:state.genre,provider:state.provider,sort:state.sort}});
        }
        const reset = () => {
            state.page = 1
            state.provider = '1'
            state.genre = '1'
            router.push({path:"/contentfind", query:{page:state.page,type:state.type,genre:state.genre,provider:state.provider,sort:state.sort}});
            handledata()
        }
        
    
        return {
            ...toRefs(state),state,sort,prov,content,type,page,pagereset,provreset,genre,genrereset,reset,scrollToTop
        }
    }
}
</script>

<style lang="scss" scoped>

    .gen{
        background-color: royalblue;
        padding : 5px;
        margin:2px;
        border-radius: 5px;
        color:white;
    }
    .gen1{
        background-color: crimson;
        padding : 5px;
        margin:2px;
        border-radius: 5px;
        color:white;
    }
    .gen-btn{
        font-family: Arial;
        font-weight:bold;
        width: 100px;
        height: 30px;
        color: azure;
        background-color:transparent;
        text-align: center;
        display: inline-block;
        border-radius: 3px;
        font-size: 20px;   
    }
.title{
    color:azure;
    font-weight:bold;
    font-size: 30px;
}

</style>