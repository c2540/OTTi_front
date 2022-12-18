<template>
    <div style="background-color: aliceblue;padding:10px">
        <select v-model="state.type" @change="type(),genrereset(),pagereset()" class="sel">
            <option value="tv">드라마</option>
            <option value="movie">영화</option>
        </select>
        <br>
        <div>
            <button v-if="state.genre===null" class="gen1">전체</button>
            <button v-if="state.genre!=null" @click="state.genre=null,pagereset(),genre()" class="gen">전체</button>
            <button v-if="state.type==='movie' && state.genre===12" class="gen1">모험</button>
            <button v-if="state.type==='movie' && state.genre!=12" @click="state.genre=12,pagereset(),genre()" class="gen">모험</button>
            <button v-if="state.type==='movie' && state.genre===14" class="gen1">판타지</button>
            <button v-if="state.type==='movie' && state.genre!=14" @click="state.genre=14,pagereset(),genre()" class="gen">판타지</button>
            <button v-if="state.genre===16" class="gen1">애니메이션</button>
            <button v-if="state.genre!=16" @click="state.genre=16,pagereset(),genre()" class="gen">애니메이션</button>
            <button v-if="state.genre===18" class="gen1">드라마</button>
            <button v-if="state.genre!=18" @click="state.genre=18,pagereset(),genre()" class="gen">드라마</button>
            <button v-if="state.type==='movie' && state.genre===27" class="gen1">공포</button>
            <button v-if="state.type==='movie' && state.genre!=27" @click="state.genre=27,pagereset(),genre()" class="gen">공포</button>
            <button v-if="state.type==='movie' && state.genre===28" class="gen1">액션</button>
            <button v-if="state.type==='movie' && state.genre!=28" @click="state.genre=28,pagereset(),genre()" class="gen">액션</button>
            <button v-if="state.genre===35" class="gen1">코미디</button>
            <button v-if="state.genre!=35" @click="state.genre=35,pagereset(),genre()" class="gen">코미디</button>
            <button v-if="state.type==='movie' && state.genre===36" class="gen1">역사</button>
            <button v-if="state.type==='movie' && state.genre!=36" @click="state.genre=36,pagereset(),genre()" class="gen">역사</button>
            <button v-if="state.genre===37" class="gen1">서부</button>
            <button v-if="state.genre!=37" @click="state.genre=37,pagereset(),genre()" class="gen">서부</button>
            <button v-if="state.type==='movie' && state.genre===53" class="gen1">스릴러</button>
            <button v-if="state.type==='movie' && state.genre!=53" @click="state.genre=53,pagereset(),genre()" class="gen">스릴러</button>
            <button v-if="state.genre===80" class="gen1">범죄</button>
            <button v-if="state.genre!=80" @click="state.genre=80,pagereset(),genre()" class="gen">범죄</button>
            <button v-if="state.genre===99" class="gen1">다큐멘터리</button>
            <button v-if="state.genre!=99" @click="state.genre=99,pagereset(),genre()" class="gen">다큐멘터리</button>
            <button v-if="state.type==='movie' && state.genre===878" class="gen1">SF</button>
            <button v-if="state.type==='movie' && state.genre!=878" @click="state.genre=878,pagereset(),genre()" class="gen">SF</button>
            <button v-if="state.genre===9648" class="gen1">미스터리</button>
            <button v-if="state.genre!=9648" @click="state.genre=9648,pagereset(),genre()" class="gen">미스터리</button>
            <button v-if="state.type==='movie' && state.genre===10402" class="gen1">음악</button>
            <button v-if="state.type==='movie' && state.genre!=10402" @click="state.genre=10402,pagereset(),genre()" class="gen">음악</button>
            <button v-if="state.type==='movie' && state.genre===10749" class="gen1">로맨스</button>
            <button v-if="state.type==='movie' && state.genre!=10749" @click="state.genre=10749,pagereset(),genre()" class="gen">로맨스</button>
            <button v-if="state.genre===10751" class="gen1">가족</button>
            <button v-if="state.genre!=10751" @click="state.genre=10751,pagereset(),genre()" class="gen">가족</button>
            <button v-if="state.type==='movie' && state.genre===10752" class="gen1">전쟁</button>
            <button v-if="state.type==='movie' && state.genre!=10752" @click="state.genre=10752,pagereset(),genre()" class="gen">전쟁</button>
            <button v-if="state.type==='tv' && state.genre===10759" class="gen1">액션&모험</button>
            <button v-if="state.type==='tv' && state.genre!=10759" @click="state.genre=10759,pagereset(),genre()" class="gen">액션&모험</button>
            <button v-if="state.type==='tv' && state.genre===10762" class="gen1">어린이</button>
            <button v-if="state.type==='tv' && state.genre!=10762" @click="state.genre=10762,pagereset(),genre()" class="gen">어린이</button>
            <button v-if="state.type==='tv' && state.genre===10765" class="gen1">SF&판타지</button>
            <button v-if="state.type==='tv' && state.genre!=10765" @click="state.genre=10765,pagereset(),genre()" class="gen">SF&판타지</button>
            <button v-if="state.type==='tv' && state.genre===10766" class="gen1">연속극</button>
            <button v-if="state.type==='tv' && state.genre!=10766" @click="state.genre=10766,pagereset(),genre()" class="gen">연속극</button>
            <button v-if="state.type==='tv' && state.genre===10768" class="gen1">전쟁&정치</button>
            <button v-if="state.type==='tv' && state.genre!=10768" @click="state.genre=10768,pagereset(),genre()" class="gen">전쟁&정치</button>
        </div>
        <br>
        <select v-model="state.sort" @change="sort()" class="sel">
            <option value="id" >작품코드 내림차순</option>
            <option value="vote_average.desc" >평점 내림차순</option>
            <option value="vote_average.asc" >평점 오름차순</option>
            <option value="release_date.desc" >방영일 내림차순</option>
            <option value="release_date.asc" >방영일 오름차순</option>
        </select>
        <table border="1" v-if="state.data">
            <tr>
                <th>작품코드</th>
                <th>작품명</th>
                <th>줄거리</th>
                <th>방영시작일</th>
                <th v-if="state.type==='tv'">
                    에피소드 수
                </th>
                <th>평점</th>
                <th>이미지</th>
            </tr>
            <tr v-for="tmp of state.data.result" :key="tmp">
                <td @click="content(tmp.id)" style="text-align:center; width:50px">
                    {{tmp.id}}
                </td>
                <td v-if="state.type==='tv'">
                    {{tmp.name}}
                </td>
                <td v-if="state.type==='movie'">
                    {{tmp.title}}
                </td>
                <td>{{tmp.overview}}</td>
                <td v-if="state.type==='tv'">
                    {{tmp.firstairdate}}
                </td>
                <td v-if="state.type==='movie'">
                    {{tmp.releasedate}}
                </td>
                <td v-if="state.type==='tv'">
                    {{tmp.number_of_episodes}}
                </td>
                <td>{{tmp.voteaverage}}</td>
                <td>
                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`' style="width:200px" />
                </td>
            </tr>
        </table>
        <div class="text-center">
            <v-pagination
            v-model="state.page"
            :length="Math.ceil(state.data.total/10)" @click="page(state.page)"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router';

export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            data : "",
            page : 1,
            provider: 1,
            sort : "id",
            genre : null,
            type : "tv",
        })

        onMounted(()=>{
            state.page = route.query.page
            state.sort = route.query.sort
            state.type = route.query.type
            state.genre = route.query.genre
            handledata()
        })

        const handledata = async() => {
            if(state.type === "tv"){
                const url = `${proxy.foo}/DB/findalltv.json?provider=${state.provider}&sort=${state.sort}&page=${state.page}`
                const headers = {"Content-Type":"application/json"}
                const {data} = await axios.get(url,{headers})
                state.data = data
                window.scrollBy(0,-5000)
            }
            else{
                const url = `${proxy.foo}/DB/findallmovie.json?provider=${state.provider}&sort=${state.sort}&page=${state.page}`
                const headers = {"Content-Type":"application/json"}
                const {data} = await axios.get(url,{headers})
                state.data = data
                window.scrollBy(0,-5000)
            }
        }

        const sort = () => {
                genre();
                router.push({path:"/genre", query:{page:state.page,type:state.type,genre:state.genre,sort:state.sort}});
        }
        
        const genre = async() => {
            if(state.genre === null){
                handledata();
            }
            else{
                if(state.type === "tv"){
                    const url = `${proxy.foo}/DB/findgenretv.json?genre=${state.genre}&sort=${state.sort}&page=${state.page}`
                    const headers = {"Content-Type":"application/json"}
                    const {data} = await axios.get(url,{headers})
                    state.data = data
                    window.scrollBy(0,-5000)
                }
                else{
                    const url = `${proxy.foo}/DB/findgenremovie.json?genre=${state.genre}&sort=${state.sort}&page=${state.page}`
                    const headers = {"Content-Type":"application/json"}
                    const {data} = await axios.get(url,{headers})
                    state.data = data
                    window.scrollBy(0,-5000)
                }
            }
        }
        const content = (no) => {
            router.push({path:'/content',query:{no:no,type:state.type}})
        }

        const type = () => {
            genre()
            router.push({path:"/genre", query:{page:state.page,type:state.type,genre:state.genre,sort:state.sort}});
        }
        
        const page = (no) =>{
            state.page=no
            genre()
            router.push({path:"/genre", query:{page:state.page,type:state.type,genre:state.genre,sort:state.sort}});
        }

        const pagereset = () => {
            state.page = 1
            router.push({path:"/genre", query:{page:state.page,type:state.type,genre:state.genre,sort:state.sort}});
        }

        const genrereset = () => {
            state.genre = null
            router.push({path:"/genre", query:{page:state.page,type:state.type,genre:state.genre,sort:state.sort}});
        }
    
        return {
            ...toRefs(state),state,sort,genre,content,type,page,pagereset,genrereset
        }
    }
}
</script>

<style lang="css" scoped>
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
    .sel{
        border:2px solid black;
        padding:5px 10px;
        border-radius: 5px;
    }
</style>