<template>
    <div v-if="!state.data"
        style="text-align:center; color: azure; margin: 30% auto auto auto; font-weight:bold; font-size: 20px; ">
            <img :src="require('@/assets/imgs/loading.gif')" style="width:100px;" /><br /><br />
            <span>사용자 정보를 불러오는 중입니다. 잠시만 기다려주세요.</span>
    </div>
    <div class="container" v-if="state.data">
        <div style="color:white">
            <div v-if="state.data.no === null || state.data.delete === 1" style="display:inline-block">
                <img :src = "require('@/assets/no.png')" style="width:150px; height:150px; border-radius:10px" />
            </div>
            <div v-if="state.imageno && state.data.delete === 0" style="display:inline-block">
                <img :src = "`${state.foo}/member/image?no=${state.imageno}`" style="width:150px; height:150px; border-radius:10px" />
            </div>
            <div style="display:inline-block; margin-left:30px" v-if="state.data.delete === 0">
                <h1>{{state.data.nickname}}님의 프로필</h1>
                <p style="font-weight:bold; font-size:16px">가입일</p><p>{{state.data.regdate}}</p><br />
            </div>
            <div style="display:inline-block; margin-left:30px" v-if="state.data.delete === 1">
                <h1>탈퇴한 회원입니다.</h1>
                <br /><br />
            </div>
        </div>
        <div v-if="state.data.delete === 0">
            <br />
            <h2 style="color:white;background-color:rgba(0, 0, 0, 0.2);display:inline-block; padding:3px 10px; border-radius:10px;margin-bottom:5px;">{{state.data.nickname}}님의 리뷰 목록</h2>
            <v-card style="border-radius:10px; background-color:rgba(255, 255, 255, 0.5);">
                <v-tabs v-model="state.tab" background-color="primary">
                    <v-tab value="one">영화</v-tab>
                    <v-tab value="two">드라마</v-tab>
                </v-tabs>
                <v-card-text>
                    <v-window v-model="state.tab">
                        <v-window-item value="one">
                            <div v-if="state.data1.length">
                                <span v-if="state.reviewmovie==='new'" @click="handleMovieReview()" style="font-weight:bold; cursor:pointer; margin-right:5px">최신순</span>
                                <span v-else @click="handleMovieReview()" style="cursor:pointer; margin-right:5px">최신순</span>
                                <span v-if="state.reviewmovie==='score'" @click="handleMovieReviewScore()" style="font-weight:bold;cursor:pointer">평점높은순</span>
                                <span v-else @click="handleMovieReviewScore()" style="cursor:pointer">평점높은순</span>
                                <v-table style="background-color:rgba(0, 0, 0, 0)">
                                    <thead>
                                        <tr>
                                            <th>포스터</th>
                                            <th>영화</th>
                                            <th>리뷰</th>
                                            <th>평점</th>
                                            <th>등록일</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="tmp of state.data1" :key="tmp">
                                            <td style="text-align:center">
                                                <img :src='`https://image.tmdb.org/t/p/w500${tmp.movieContent.poster_path}`' style="width:50px; border-radius:8px; padding:5px" />
                                            </td>
                                            <td @click="content(tmp.movieContent.id, 'movie')" style="text-align:center;cursor:pointer ; color: blueviolet">{{tmp.movieContent.title}}</td>
                                            <td @click="reviewone(tmp.id, 'movie')" style="text-align:center;cursor:pointer ; color: royalblue">
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
                                            <td style="text-align:center;">{{tmp.regdate}}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </div>
                            <div v-else>
                                <p>{{state.data.nickname}}님이 작성한 영화리뷰가 없습니다.</p>
                            </div>
                            <div>
                                <v-pagination v-if="state.reviewmovie === 'new'" v-model="state.moviereviewpage" :length="state.moviereviewpages" @click="moviereviewpage(state.moviereviewpage)"></v-pagination>
                                <v-pagination v-if="state.reviewmovie === 'score'" v-model="state.moviereviewscorepage" :length="state.moviereviewscorepages" @click="moviereviewscorepage(state.moviereviewscorepage)"></v-pagination>
                            </div>
                        </v-window-item>
                        <v-window-item value="two">
                            <div v-if="state.data2.length">
                                <span v-if="state.reviewdrama==='new'" @click="handleDramaReview()" style="font-weight:bold;cursor:pointer;margin-right:5px">최신순</span>
                                <span v-else @click="handleDramaReview()" style="cursor:pointer;margin-right:5px">최신순</span>
                                <span v-if="state.reviewdrama==='score'" @click="handleDramaReviewScore()" style="font-weight:bold;cursor:pointer">평점높은순</span>
                                <span v-else @click="handleDramaReviewScore()" style="cursor:pointer">평점높은순</span>
                                <v-table style="background-color:rgba(0, 0, 0, 0)">
                                    <thead>
                                        <tr>
                                            <th>포스터</th>
                                            <th>드라마제목</th>
                                            <th>리뷰</th>
                                            <th>평점</th>
                                            <th>등록일</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="tmp of state.data2" :key="tmp">
                                            <td style="text-align:center">
                                                <img :src='`https://image.tmdb.org/t/p/w500${tmp.dramaContent.poster_path}`' style="width:50px; border-radius:8px; padding:5px" />
                                            </td>
                                            <td @click="content(tmp.dramaContent.id, 'tv')" style="text-align:center;cursor:pointer; color: blueviolet">{{tmp.dramaContent.name}}</td>
                                            <td @click="reviewone(tmp.id, 'drama')" style="text-align:center;cursor:pointer; color: royalblue">
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
                                            <td style="text-align:center;">{{tmp.regdate}}</td>
                                        </tr>
                                    </tbody>
                                </v-table> 
                            </div>
                            <div v-else>
                                <p>{{state.data.nickname}}님이 작성한 드라마 리뷰가 없습니다.</p>
                            </div>
                            <div>
                                <v-pagination v-if="state.reviewdrama === 'new'" v-model="state.dramareviewpage" :length="state.dramareviewpages" @click="dramareviewpage(state.dramareviewpage)"></v-pagination>
                                <v-pagination v-if="state.reviewdrama === 'score'" v-model="state.dramareviewscorepage" :length="state.dramareviewscorepages" @click="dramareviewscorepage(state.dramareviewscorepage)"></v-pagination>
                            </div>
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
            <br />
            <h2 style="color:white;background-color:rgba(0, 0, 0, 0.2);display:inline-block; padding:3px 10px; border-radius:10px;margin-bottom:5px;">{{state.data.nickname}}님의 좋아요</h2>
            <h3 style="color:white">영화</h3>
            <div v-if="state.movielike.length">
                <div v-for="tmp of state.movielike" :key="tmp" style="display:inline-block;background-color:lightgray; margin:3px; width:170px; border-radius: 10px; background-color: rgba(1, 1, 1, 0.3);text-align:center;color:white" class="div">
                    <div>
                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.moviecode.poster_path}`' @click="content(tmp.moviecode.id, 'movie')" style="width:100%; border-radius: 10px 10px 0 0; cursor:pointer;"/><br/>
                    </div>
                    <div @click="content(tmp.moviecode.id, 'movie')">
                        <p style="padding: 0 5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; cursor:pointer;font-weight:bold; margin-bottom:5px">{{tmp.moviecode.title}}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p style="color:white">{{state.data.nickname}}님이 좋아요한 영화가 없습니다.</p>
            </div>
            <div>
                <v-pagination v-model="state.movielikepage" :length="state.movielikepages" @click="movielikepage(state.movielikepage)"></v-pagination>
            </div>
            <hr><br />
            <h3 style="color:white">드라마</h3>
            <div v-if="state.dramalike.length">
                <div v-for="tmp of state.dramalike" :key="tmp" style="display:inline-block;background-color:lightgray; margin:3px; width:170px; border-radius: 10px; background-color: rgba(1, 1, 1, 0.3);text-align:center;color:white" class="div">
                    <div>
                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.dramacode.poster_path}`' @click="content(tmp.dramacode.id, 'tv')" style="width:100%; border-radius: 10px 10px 0 0; cursor:pointer;" /><br/>
                    </div>
                    <div @click="content(tmp.dramacode.id, 'tv')">
                        <p style="padding: 0 5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; cursor:pointer;font-weight:bold; margin-bottom:5px">{{tmp.dramacode.name}}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p style="color:white">{{state.data.nickname}}님이 좋아요한 드라마가 없습니다.</p>
            </div>
            <div>
                <v-pagination v-model="state.dramalikepage" :length="state.dramalikepages" @click="dramalikepage(state.dramalikepage)"></v-pagination>
            </div>
            <hr><br />
            <h3 style="color:white">인물</h3>
            <div v-if="state.peoplelike.length">
                <div v-for="tmp of state.peoplelike" :key="tmp" style="display:inline-block;background-color:lightgray; margin:3px; width:170px; border-radius: 10px; background-color: rgba(1, 1, 1, 0.3);text-align:center;color:white" class="div">
                    <div>
                        <img :src='`https://image.tmdb.org/t/p/w500${tmp.profile_path}`' @click="peopleinfo(tmp.id)" style="width:100%; border-radius: 10px 10px 0 0; cursor:pointer;" /><br/>
                    </div>
                    <div @click="peopleinfo(tmp.id)">
                        <p style="padding: 0 5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; cursor:pointer;font-weight:bold; margin-bottom:5px">{{tmp.name}}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p style="color:white">{{state.data.nickname}}님이 좋아요한 인물이 없습니다.</p>
            </div>
            <div>
                <v-pagination v-model="state.peoplelikepage" :length="state.peoplelikepages" @click="peoplelikepage(state.peoplelikepage)"></v-pagination>
            </div>
        </div>
    </div>
    <div v-if="state.data.delete === 1" style="min-height:200px;">
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const route = useRoute();
        const state = reactive({
            data : '',
            data1 : '',
            data2 : '',
            imageno : '',
            moviereviewpage : 1,
            moviereviewpages : 1,
            moviereviewscorepage : 1,
            moviereviewscorepages : 1,
            dramareviewpage : 1,
            dramareviewpages : 1,
            dramareviewscorepage : 1,
            dramareviewscorepages : 1,
            movielike : '',
            movielikepage : 1,
            movielikepages : 1,
            dramalike : '',
            dramalikepage : 1,
            dramalikepages : 1,
            peoplelike : [],
            peoplelikepage : 1,
            peoplelikepages : 1,
            reviewmovie : 'new',
            reviewdrama : 'new',
            foo : proxy.foo
        })
        onMounted(()=>{
            window.scrollTo(0,0)
            handleData();
            handleMovieReview();
            handleDramaReview();
            handlemovielike();
            handledramalike();
            handlepeoplelike();
        })

        const handleData = async() => {
            const url = `${proxy.foo}/member/userprofile.json?id=${route.query.id}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            if(data.result.no != null){
                state.imageno = data.result.no.no;
            }
            state.data = data.result
        }

        const handleMovieReview = async() => {
            const url = `${proxy.foo}/member/moviereview.json?id=${route.query.id}&page=${state.moviereviewpage}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data1 = data.result;
            state.reviewmovie = 'new';
            state.moviereviewpages = data.pages;
        }
        const handleMovieReviewScore = async() => {
            const url = `${proxy.foo}/member/moviereviewscore.json?id=${route.query.id}&page=${state.moviereviewscorepage}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data1 = data.result;
            state.reviewmovie = 'score';
            state.moviereviewscorepages = data.pages;
        }

        const moviereviewpage = (no) =>{
            state.moviereviewpage = no;
            handleMovieReview();
        }
        const moviereviewscorepage = (no) =>{
            state.moviereviewscorepage = no;
            handleMovieReviewScore();
        }

        const handleDramaReview = async() => {
            const url = `${proxy.foo}/member/dramareview.json?id=${route.query.id}&page=${state.dramareviewpage}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data2 = data.result;
            state.reviewdrama = 'new';
            state.dramareviewpages = data.pages;
        }

        const handleDramaReviewScore = async() => {
            const url = `${proxy.foo}/member/dramareviewscore.json?id=${route.query.id}&page=${state.dramareviewscorepage}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data2 = data.result;
            state.reviewdrama = 'score';
            state.dramareviewscorepages = data.pages;
        }
        
        const dramareviewpage = (no) =>{
            state.dramareviewpage = no;
            handleDramaReview();
        }
        const dramareviewscorepage = (no) =>{
            state.dramareviewscorepage = no;
            handleDramaReviewScore();
        }

        const handlemovielike = async() => {
            const url = `${proxy.foo}/member/movielikelist.json?id=${route.query.id}&page=${state.movielikepage}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.movielike = data.result
            state.movielikepages = data.pages
            if(data.result.length === 0 && data.pages != 1){
                movielikepage(data.pages);
            }
        }

        const movielikepage = (no) =>{
            state.movielikepage = no
            handlemovielike();
        }

        const handledramalike = async() => {
            const url = `${proxy.foo}/member/dramalikelist.json?id=${route.query.id}&page=${state.dramalikepage}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.dramalike = data.result
            state.dramalikepages = data.pages
            if(data.result.length === 0 && data.pages != 1){
                dramalikepage(data.pages);
            }
        }
        const dramalikepage = (no) =>{
            state.dramalikepage = no
            handledramalike();
        }

        const handlepeoplelike = async() => {
            const url = `${proxy.foo}/member/peoplelikelist.json?id=${route.query.id}&page=${state.peoplelikepage}`
            const headers = {"Content-Type":"application/json"}
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
            state.peoplelikepages = data.pages
            if(data.result.length === 0 && data.pages != 1){
                peoplelikepage(data.pages);
            }
        }
        const peoplelikepage = (no) =>{
            state.peoplelike = []
            state.peoplelikepage = no
            handlepeoplelike();
        }

        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }

        const peopleinfo = (id) => {
            router.push({path:'/peopleinfo',query:{id:id}})
        }
        const reviewone = (id, type) => {
            router.push({path:'/reviewone',query:{code:id, type:type}})
        }

        return {state, moviereviewpage,moviereviewscorepage, dramareviewpage, dramareviewscorepage, movielikepage, dramalikepage, peoplelikepage, content, peopleinfo, reviewone, handleMovieReview, handleDramaReview, handleMovieReviewScore, handleDramaReviewScore}
    }
}
</script>

<style lang="css" scoped>
    .container {
        padding:50px;
        border-radius: 10px;
        margin-bottom: 10px;
        background-color:rgba(255, 255, 255, 0.5);
    }
    .div{
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }
    .div:hover{
        cursor:pointer;
        transform:scale(1.1);
        -o-transform:scale(1.1);
        -moz-transform:scale(1.1);
        -webkit-transform:scale(1.1);
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
        backdrop-filter: blur(10px);
    }
</style>