<template>                  
    <div class="container">
        <h2 style="font-weight:bold;font-size: 30px;text-decoration: none;">내가 쓴 리뷰</h2>
        <br>
        <v-card style="border-radius:10px; background-color:rgba(255, 255, 255, 0.5);">
            <v-tabs v-model="state.tab" background-color="primary">
                <v-tab value="one">드라마</v-tab>
                <v-tab value="two">영화</v-tab>
            </v-tabs>
        <v-card-text>
            <v-window v-model="state.tab">
                <v-window-item value="one">
                    <div v-if="state.data.length">
                        <span v-if="state.reviewdrama==='new'" @click="handletv()" style="font-weight:bold;cursor:pointer;margin-right:5px">최신순</span>
                        <span v-else @click="handletv()" style="cursor:pointer;margin-right:5px">최신순</span>
                        <span v-if="state.reviewdrama==='score'" @click="handletvscore()" style="font-weight:bold;cursor:pointer">평점높은순</span>
                        <span v-else @click="handletvscore()" style="cursor:pointer">평점높은순</span>
                        <v-table style="background-color:rgba(0, 0, 0, 0)">
                            <thead>
                                <tr>
                                    <th>리뷰번호</th>
                                    <th>포스터</th>
                                    <th>제목</th>
                                    <th>리뷰</th>
                                    <th>평점</th>
                                    <th>등록일</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tmp of state.data" :key="tmp">
                                    <td style="text-align:center">{{tmp.id}}</td>
                                    <td style="text-align: center;"><img :src='`https://image.tmdb.org/t/p/w500${tmp.dramaContent.poster_path}`' @click="content(tmp.dramaContent.id, 'tv')" style="cursor:pointer;width:50px; border-radius:8px; padding:5px" /></td>
                                    <td @click="content(tmp.dramaContent.id, 'tv')" style="cursor:pointer ; color: blueviolet; text-align: center;">{{tmp.dramaContent.name}}</td>
                                    <td @click="reviewOne(tmp.id, 'drama')" style="cursor:pointer; color: royalblue;text-align: center;">
                                        <p style="max-width:500px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{tmp.content}}</p>
                                        <p style="max-width:500px;font-weight: bold;">[상세보기]</p>
                                    </td>
                                    <td style="text-align:center;width:125px;min-width: 125px;">
                                        <div style="background-color:rgba(0, 0, 0, 0.15);padding:3px;border-radius:10px;">
                                            <img v-if="tmp.score===1" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                            <img v-if="tmp.score>=2" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                            <img v-if="tmp.score===3" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                            <img v-if="tmp.score>=4" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                            <img v-if="tmp.score===5" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                            <img v-if="tmp.score>=6" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                            <img v-if="tmp.score===7" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                            <img v-if="tmp.score>=8" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                            <img v-if="tmp.score===9" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                            <img v-if="tmp.score===10" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                            <img v-if="tmp.score<=2" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                            <img v-if="tmp.score<=4" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                            <img v-if="tmp.score<=6" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                            <img v-if="tmp.score<=8" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                        </div>
                                    </td>  
                                    <td style="text-align:center">{{tmp.regdate}}</td>
                                    <td style="text-align:center"><v-btn @click="handleDelete(tmp.id)" style="background-color:rgba(0, 0, 0, 0.3); color:white">삭제</v-btn></td>
                                </tr>
                            </tbody>
                        </v-table> 
                        <div>
                            <v-pagination v-if="state.reviewdrama === 'new'" v-model="state.tvpage" :length="state.tvpages" @click="tvpage(state.tvpage)"></v-pagination>
                            <v-pagination v-if="state.reviewdrama === 'score'" v-model="state.tvscorepage" :length="state.tvscorepages" @click="tvscorepage(state.tvscorepage)"></v-pagination>
                        </div>
                    </div>
                    <div v-else>
                        <p>아직 작성된 리뷰가 없습니다.</p>
                    </div>
                </v-window-item>

        <v-window-item value="two">
            <div v-if="state.data1.length">
                <span v-if="state.reviewmovie==='new'" @click="handlemovie()" style="font-weight:bold; cursor:pointer; margin-right:5px">최신순</span>
                <span v-else @click="handlemovie()" style="cursor:pointer; margin-right:5px">최신순</span>
                <span v-if="state.reviewmovie==='score'" @click="handlemoviescore()" style="font-weight:bold;cursor:pointer">평점높은순</span>
                <span v-else @click="handlemoviescore()" style="cursor:pointer">평점높은순</span>
                <v-table style="background-color:rgba(0, 0, 0, 0)">
                    <thead>
                        <tr>
                            <th>리뷰번호</th>
                            <th>포스터</th>
                            <th>제목</th>
                            <th>리뷰</th>
                            <th>평점</th>
                            <th>등록일</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tmp of state.data1" :key="tmp">
                            <td style="text-align:center">{{tmp.id}}</td>
                            <td style="text-align: center;"><img :src='`https://image.tmdb.org/t/p/w500${tmp.movieContent.poster_path}`' @click="content(tmp.movieContent.id, 'movie')" style="cursor:pointer;width:50px; border-radius:8px; padding:5px" /></td>
                            <td @click="content(tmp.movieContent.id, 'movie')" style="cursor:pointer ; color: blueviolet; text-align: center;">{{tmp.movieContent.title}}</td>
                            <td @click="reviewOne(tmp.id, 'movie')" style="cursor:pointer; color: royalblue;text-align: center;">
                                <p style="max-width:500px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{tmp.content}}</p>
                                <p style="max-width:500px;font-weight: bold;">[상세보기]</p>
                            </td>
                            <td style="text-align:center;width:125px;min-width: 125px;">
                                <div style="background-color:rgba(0, 0, 0, 0.15);padding:3px;border-radius:10px;">
                                    <img v-if="tmp.score===1" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                    <img v-if="tmp.score>=2" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                    <img v-if="tmp.score===3" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                    <img v-if="tmp.score>=4" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                    <img v-if="tmp.score===5" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                    <img v-if="tmp.score>=6" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                    <img v-if="tmp.score===7" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                    <img v-if="tmp.score>=8" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                    <img v-if="tmp.score===9" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                    <img v-if="tmp.score===10" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                    <img v-if="tmp.score<=2" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                    <img v-if="tmp.score<=4" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                    <img v-if="tmp.score<=6" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                    <img v-if="tmp.score<=8" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                </div>
                            </td>  
                            <td style="text-align:center">{{tmp.regdate}}</td>
                            <td style="text-align:center"><v-btn @click="handleDelete1(tmp.id)" style="background-color:rgba(0, 0, 0, 0.3); color:white">삭제</v-btn></td>
                        </tr>
                    </tbody>
                </v-table>
                <div>
                    <v-pagination v-if="state.reviewmovie === 'new'" v-model="state.moviepage" :length="state.moviepages" @click="moviepage(state.moviepage)"></v-pagination>
                    <v-pagination v-if="state.reviewmovie === 'score'" v-model="state.moviescorepage" :length="state.moviescorepages" @click="moviescorepage(state.moviescorepage)"></v-pagination>
                </div>
            </div>
            <div v-else>
                <p>아직 작성된 리뷰가 없습니다.</p>
            </div>
        </v-window-item>

    </v-window>
            </v-card-text>
        </v-card>

    </div>
</template>

<script>
import { computed, getCurrentInstance, onMounted, reactive } from '@vue/runtime-core';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            token : sessionStorage.getItem("token"),
            userid : computed(() => store.getters.getUserid),
            data:"",
            data1:"",
            type : "tv",
            type1 : "movie",
            tab : "one",
            moviepage : 1,
            moviepages : 1,
            moviescorepage : 1,
            moviescorepages : 1,
            tvpage : 1,
            tvpages : 1,
            tvscorepage : 1,
            tvscorepages : 1,
            reviewmovie : 'new',
            reviewdrama : 'new',
        })

        onMounted(()=>{
            window.scrollBy(0,-5000)
            handletv();
            handlemovie();
        })

        const handletv = async() =>{
            const url = `${proxy.foo}/member/dramareview.json?id=${state.userid}&page=${state.tvpage}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const {data} = await axios.get(url,{headers})
            state.data = data.result
            state.reviewdrama = 'new';
            state.tvpages = data.pages
        }
        const handletvscore = async() =>{
            const url = `${proxy.foo}/member/dramareviewscore.json?id=${state.userid}&page=${state.tvscorepage}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const {data} = await axios.get(url,{headers})
            state.data = data.result
            state.reviewdrama = 'score';
            state.tvscorepages = data.pages
        }

        const handlemovie = async() =>{
            const url = `${proxy.foo}/member/moviereview.json?id=${state.userid}&page=${state.moviepage}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const {data} = await axios.get(url,{headers})
            state.data1 = data.result
            state.reviewmovie = 'new';
            state.moviescorepages = data.pages
        }
        const handlemoviescore = async() =>{
            const url = `${proxy.foo}/member/moviereviewscore.json?id=${state.userid}&page=${state.moviescorepage}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const {data} = await axios.get(url,{headers})
            state.data1 = data.result
            state.reviewmovie = 'score';
            state.moviescorepages = data.pages
        }

        const tvpage = (no) =>{
            state.tvpage = no
            handletv();
        }
        const tvscorepage = (no) =>{
            state.tvscorepage = no
            handletvscore();
        }
        const moviepage = (no) =>{
            state.moviepage = no;
            handlemovie();
        }
        const moviescorepage = (no) =>{
            state.moviescorepage = no;
            handlemoviescore();
        }
      
        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }

        const reviewOne = (no, type) => {
            router.push({path:'/reviewone',query:{code:no,type:type}})
        }

        const handleDelete = async(no) =>{
            const url = `${proxy.foo}/content/deletetvreview.json?no=${no}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const {data} = await axios.delete(url,{headers,data:{}})
            if(data.status===200){
                alert('삭제되었습니다.');
                handletv();
            }
        }

        const handleDelete1 = async(no) =>{
            const url = `${proxy.foo}/content/deletemoviereview.json?no=${no}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const {data} = await axios.delete(url,{headers,data:{}})
            if(data.status===200){
                alert('삭제되었습니다.');
                handlemovie();
            }
        }

        return {state,handletv,handletvscore,handlemovie,handlemoviescore,content,handleDelete,handleDelete1,reviewOne
                ,tvpage,tvscorepage,moviepage,moviescorepage}
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