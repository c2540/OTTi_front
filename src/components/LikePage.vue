<template>
    <div class="container">
        <h1>좋아요 페이지</h1>
        <hr><br />
        <h3>좋아요한 영화</h3>
        <br/>
        <div v-if="state.movielike.length">
            <div v-for="tmp of state.movielike" :key="tmp" style="display:inline-block;background-color:lightgray; margin:3px; width:170px; border-radius: 10px; background-color: rgba(1, 1, 1, 0.3);text-align:center;">
                <div>
                <img :src='`https://image.tmdb.org/t/p/w500${tmp.moviecode.poster_path}`' @click="content(tmp.moviecode.id, 'movie')" style="width:100%; border-radius: 10px 10px 0 0; cursor:pointer;"/><br/>
                </div>
                <div @click="content(tmp.moviecode.id, 'movie')">
                    <p style="padding: 0 5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; cursor:pointer;font-weight:bold">{{tmp.moviecode.title}}</p>
                </div>
                <input type="button" value="좋아요 취소" @click="movielikecancel(tmp.moviecode.id)" style="border-radius:10px; margin:5px; background-color: rgba(1, 1, 1, 0.3); padding:5px; width:94%">
            </div>
            <div>
                <v-pagination v-model="state.moviepage" :length="state.moviepages" @click="moviepage(state.moviepage)"></v-pagination>
            </div>
        </div>
        <div v-else>
            <p>아직 좋아요한 영화가 없습니다.</p><br />
        </div>
        <hr><br />
        <h3>좋아요한 드라마</h3>
        <br/>
        <div v-if="state.dramalike.length">
            <div v-for="tmp of state.dramalike" :key="tmp" style="display:inline-block;background-color:lightgray; margin:3px; width:170px; border-radius: 10px; background-color: rgba(1, 1, 1, 0.3);text-align:center;">
                <div>
                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.dramacode.poster_path}`' @click="content(tmp.dramacode.id, 'tv')" style="width:100%; border-radius: 10px 10px 0 0; cursor:pointer;" /><br/>
                </div>
                <div @click="content(tmp.dramacode.id, 'tv')">
                    <p style="padding: 0 5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; cursor:pointer;font-weight:bold">{{tmp.dramacode.name}}</p>
                </div>
                <input type="button" value="좋아요 취소" @click="dramalikecancel(tmp.dramacode.id)" style="border-radius:10px; margin:5px; background-color: rgba(1, 1, 1, 0.3); padding:5px; width:94%">
            </div>
            <div>
                <v-pagination v-model="state.dramapage" :length="state.dramapages" @click="dramapage(state.dramapage)"></v-pagination>
            </div>
        </div>
        <div v-else>
            <p>아직 좋아요한 드라마가 없습니다.</p><br />
        </div>
        <hr><br />
        <h3>좋아요한 인물</h3>
        <br/>
        <div v-if="state.peoplelike.length">
            <div v-for="tmp of state.peoplelike" :key="tmp" style="display:inline-block;background-color:lightgray; margin:3px; width:170px; border-radius: 10px; background-color: rgba(1, 1, 1, 0.3);text-align:center;">
                <div>
                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.profile_path}`' @click="peopleinfo(tmp.id)" style="width:100%; border-radius: 10px 10px 0 0; cursor:pointer;" /><br/>
                </div>
                <div @click="peopleinfo(tmp.id)">
                    <p style="padding: 0 5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; cursor:pointer;font-weight:bold">{{tmp.name}}</p>
                </div>
                <input type="button" value="좋아요 취소" @click="peoplelikecancel(tmp.id)" style="border-radius:10px; margin:5px; background-color: rgba(1, 1, 1, 0.3); padding:5px; width:94%">
            </div>
            <div>
                <v-pagination v-model="state.peoplepage" :length="state.peoplepages" @click="peoplepage(state.peoplepage)"></v-pagination>
            </div>
        </div>
        <div v-else>
            <p>아직 좋아요한 인물이 없습니다.</p><br />
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const state = reactive({
            movielike : [],
            moviepage : 1,
            moviepages : 0,
            dramalike : [],
            dramapage : 1,
            dramapages : 0,
            peoplelike : [],
            peoplepage : 1,
            peoplepages : 0,
            token : sessionStorage.getItem("token"),
        })

        onMounted(()=>{
            handlemovie();
            handledrama();
            handlepeople();
        })

        const handlemovie = async() => {
            const url = `${proxy.foo}/content/movielikelist.json?page=${state.moviepage}`
            const headers = {"Content-Type":"application/json", "TOKEN": state.token}
            const {data} = await axios.get(url,{headers})
            state.movielike = data.result
            state.moviepages = data.pages
            if(data.result.length === 0 && data.pages != 1){
                moviepage(data.pages);
            }
        }

        const moviepage = (no) =>{
            state.moviepage = no
            handlemovie();
        }

        const handledrama = async() => {
            const url = `${proxy.foo}/content/dramalikelist.json?page=${state.dramapage}`
            const headers = {"Content-Type":"application/json", "TOKEN": state.token}
            const {data} = await axios.get(url,{headers})
            state.dramalike = data.result
            state.dramapages = data.pages
            if(data.result.length === 0 && data.pages != 1){
                dramapage(data.pages);
            }
        }

        const dramapage = (no) =>{
            state.dramapage = no
            handledrama();
        }

        const handlepeople = async() => {
            const url = `${proxy.foo}/people/likelist.json?page=${state.peoplepage}`
            const headers = {"Content-Type":"application/json", "TOKEN": state.token}
            const {data} = await axios.get(url,{headers})
            for(let i=0;i<data.result.length;i++){
                const url1 = `${proxy.foo}/api/peopleinfo.json?key=${data.result[i].peoplecode}`
                const response = await axios.get(url1,{headers})
                const koreanname = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
                for(let j=0;j<response.data.also_known_as.length;j++){
                    if(koreanname.test(response.data.also_known_as[j])){
                        response.data.name = response.data.also_known_as[j];
                        break;
                    }
                }
                state.peoplelike.push(response.data)
            }
            state.peoplepages = data.pages
            if(data.result.length === 0 && data.pages != 1){
                peoplepage(data.pages);
            }
        }
        
        const peoplepage = (no) =>{
            state.peoplelike = []
            state.peoplepage = no
            handlepeople();
        }

        const movielikecancel = async(id) => {
            const url = `${proxy.foo}/content/movielikeinsert.json?type=1&id=${id}`;
            const headers = {"Content-Type":"application/json", "TOKEN": state.token };
            const body = {}
            const {data} = await axios.post(url, body, {headers})
            if(data.status===200){
                handlemovie();
            }
            else{
                alert("좋아요 취소에 실패하였습니다. 다시 시도해주세요.")
            }
        }

        const dramalikecancel = async(id) => {
            const url = `${proxy.foo}/content/dramalikeinsert.json?type=1&id=${id}`;
            const headers = {"Content-Type":"application/json", "TOKEN": state.token };
            const body = {}
            const {data} = await axios.post(url, body, {headers})
            if(data.status===200){
                handledrama();
            }
            else{
                alert("좋아요 취소에 실패하였습니다. 다시 시도해주세요.")
            }
        }

        const peoplelikecancel = async(id) => {
            const url = `${proxy.foo}/people/likeinsert.json?type=1&code=${id}`;
            const headers = {"Content-Type":"application/json", "TOKEN": state.token };
            const body = {}
            const {data} = await axios.post(url, body, {headers})
            if(data.status===200){
                state.peoplelike = []
                handlepeople();
            }
            else{
                alert("좋아요 취소에 실패하였습니다. 다시 시도해주세요.")
            }
        }

        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }
        const peopleinfo = (id) => {
            router.push({path:'/peopleinfo',query:{id:id}})
        }
        return {state, movielikecancel, dramalikecancel, peoplelikecancel, moviepage, dramapage, peoplepage, content, peopleinfo}
    }
}
</script>

<style lang="css" scoped>
    .container {
        padding:50px;
        border-radius: 10px;
        margin-bottom: 10px;
        background-color:rgba(255, 255, 255, 0.5);
        color:white
    }
</style>