<template>
    <div class="container">
        <h1>나중에 볼 작품 페이지</h1>
        <hr /><br />
        <h3>나중에 볼 영화</h3>
        <br/>
        <div v-if="state.movielater.length">
            <div v-for="tmp of state.movielater" :key="tmp" style="display:inline-block;background-color:lightgray; margin:3px; width:170px; border-radius: 10px; background-color: rgba(1, 1, 1, 0.3);text-align:center;">
                <div>
                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.moviecode.poster_path}`' @click="content(tmp.moviecode.id, 'movie')" style="width:100%; border-radius: 10px 10px 0 0; cursor:pointer;" /><br/>
                </div>
                <div @click="content(tmp.moviecode.id, 'movie')">
                    <p style="padding: 0 5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; cursor:pointer;font-weight:bold">{{tmp.moviecode.title}}</p>
                </div>
                <input type="button" value="삭제" @click="movielatercancel(tmp.moviecode.id)" style="border-radius:10px; margin:5px; background-color: rgba(1, 1, 1, 0.3); padding:5px; width:94%">
            </div>
            <div>
                <v-pagination v-model="state.moviepage" :length="state.moviepages" @click="moviepage(state.moviepage)"></v-pagination>
            </div>
        </div>
        <div v-else>
            <p>나중에 볼 영화가 없습니다.</p><br />
        </div>
        <hr /><br />
        <h3>나중에 볼 드라마</h3>
        <br/>
        <div v-if="state.dramalater.length">
            <div v-for="tmp of state.dramalater" :key="tmp" style="display:inline-block;background-color:lightgray; margin:3px; width:170px; border-radius: 10px; background-color: rgba(1, 1, 1, 0.3);text-align:center;">
                <div>
                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.dramacode.poster_path}`' @click="content(tmp.dramacode.id, 'tv')" style="width:100%; border-radius: 10px 10px 0 0; cursor:pointer;" /><br/>
                </div>
                <div @click="content(tmp.dramacode.id, 'tv')">
                    <p style="padding: 0 5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; cursor:pointer;font-weight:bold">{{tmp.dramacode.name}}</p>
                </div>
                <input type="button" value="삭제" @click="dramalatercancel(tmp.dramacode.id)" style="border-radius:10px; margin:5px; background-color: rgba(1, 1, 1, 0.3); padding:5px; width:94%">
            </div>
            <div>
                <v-pagination
                v-model="state.dramapage"
                :length="state.dramapages" @click="dramapage(state.dramapage)"
                ></v-pagination>
            </div>
        </div>
        <div v-else>
            <p>나중에 볼 드라마가 없습니다.</p><br />
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
            movielater : [],
            moviepage : 1,
            moviepages : 1,
            moviememo : 0,
            dramalater : [],
            dramapage : 1,
            dramapages : 1,
            token : sessionStorage.getItem("token"),
        })

        onMounted(()=>{
            handlemovie();
            handledrama();
        })
        
        const handlemovie = async() => {
            const url = `${proxy.foo}/content/movielaterlist.json?page=${state.moviepage}`
            const headers = {"Content-Type":"application/json", "TOKEN": state.token}
            const {data} = await axios.get(url,{headers})
            state.movielater = data.result
            state.moviepages = data.pages
            if(data.result.length === 0 && data.pages != 1){
                moviepage(data.pages);
            }
        }

        const moviepage = (no) =>{
            state.moviepage = no;
            handlemovie();
        }

        const handledrama = async() => {
            const url = `${proxy.foo}/content/dramalaterlist.json?page=${state.dramapage}`
            const headers = {"Content-Type":"application/json", "TOKEN": state.token}
            const {data} = await axios.get(url,{headers})
            state.dramalater = data.result
            state.dramapages = data.pages
            if(data.result.length === 0 && data.pages != 1){
                dramapage(data.pages);
            }
        }

        const dramapage = (no) =>{
            state.dramapage = no
            handledrama();
        }

        const movielatercancel = async(id) => {
            const url = `${proxy.foo}/content/movielaterinsert.json?type=1&id=${id}`;
            const headers = {"Content-Type":"application/json", "TOKEN": state.token };
            const body = {}
            const {data} = await axios.post(url, body, {headers})
            if(data.status===200){
                handlemovie();
            }
            else{
                alert("나중에 볼 작품 취소에 실패하였습니다. 다시 시도해주세요.")
            }
        }
        
        const dramalatercancel = async(id) => {
            const url = `${proxy.foo}/content/dramalaterinsert.json?type=1&id=${id}`;
            const headers = {"Content-Type":"application/json", "TOKEN": state.token };
            const body = {}
            const {data} = await axios.post(url, body, {headers})
            if(data.status===200){
                handledrama();
            }
            else{
                alert("나중에 볼 작품 취소에 실패하였습니다. 다시 시도해주세요.")
            }
        }

        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }

        return {state, movielatercancel, dramalatercancel, moviepage, dramapage, content}
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