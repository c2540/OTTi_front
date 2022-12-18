<template>
    <div>
        <div id="mainslider" >
            <span style="color:azure;font-weight:bold;font-size: 33px;">Trends</span>
            <div v-if="!state.data">
                <div class="spinner"></div>
                <div class="bar"></div>
                <div style="color:azure; text-align: center;" >
                    <br/>
                    <p>트렌드를 불러오는 중입니다</p>
                </div>
            </div>
            <splide :options="options" v-if="state.data">
                <splide-slide @click="content(tmp.id, tmp.media_type)"  v-for="tmp of state.data.results" :key="tmp">    
                    <div class="tr">
                        <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`'  class="img" >
                        <p style="font-weight:bold; text-align: center; color: azure;">{{tmp.name}}{{tmp.title}}</p>
                        <p style="font-size:small; text-align: center; color: azure;">🍿{{tmp.vote_average}}</p>
                        <p style="font-size:small; text-align: center; color: azure;">{{tmp.release_date}}{{tmp.first_air_date}}</p>
                    </div> 
                    <div style="height:25px">
                    </div>
                </splide-slide>
            </splide>
        </div>
        <br/>
        <br/>
        <div id="mainslider" >
            <span style="color:azure;font-weight:bold;font-size: 27px;">개발자 추천작</span>
            <div class="divd">            
                <splide :options="options1" >
                    <splide-slide @click="content(tmp.id, 'tv')"  v-for="tmp of state.data4" :key="tmp">
                            <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`'  class="img2" style="cursor:pointer">
                            <div style="display:inline-block; width: 70%; margin-left:20px;">
                                <label style="color:azure; font-weight:bold;font-size: 30px; margin-top:0;cursor:pointer">{{tmp.name}}</label><br>
                                <label style="color:azure; cursor:pointer">{{tmp.release_date}}{{tmp.first_air_date}}</label><br>
                                <label style="color:azure; cursor:pointer">🍿{{tmp.vote_average}}</label><br><br>
                                <label style="color:azure; cursor:pointer"> 총 {{tmp.number_of_seasons}}시즌</label><br><br>
                                <label style="color:azure; cursor:pointer">{{tmp.overview}}</label><br>
                            </div>
                    </splide-slide>
                </splide>
            </div>
        </div>
        <br />
        <br />
        <div id="mainslider" >
            <span style="color:azure;font-weight:bold;font-size: 27px;">최신 영화</span>
            <splide :options="options2" >
                <splide-slide @click="content(tmp.id, 'movie')"  v-for="tmp of state.data3.results" :key="tmp">    
                    <div class="newdiv">
                        <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`'  class="img1" >
                        <p style="font-weight:bold; text-align: center; color: azure; text-overflow: ellipsis;overflow: hidden;white-space: nowrap; padding:0 5px;margin-top:8px">{{tmp.title}}</p>
                        <p style="font-size:small; text-align: center; color: azure;">🍿{{tmp.voteaverage}}</p>
                        <p style="font-size:small; text-align: center; color: azure;margin-bottom:3px">{{tmp.releasedate}}</p>
                    </div> 
                    <div style="height:25px">
                    </div>
                </splide-slide>
            </splide>
        </div>
        <br />
        <br />
        <div id="mainslider" >
            <span style="color:azure;font-weight:bold;font-size: 27px;">최신 TV시리즈</span>
            <splide :options="options2" >
                <splide-slide @click="content(tmp.id, 'tv')"  v-for="tmp of state.data2.results" :key="tmp">    
                    <div class="newdiv">
                        <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`'  class="img1" >
                        <p style="font-weight:bold; text-align: center; color: azure; text-overflow: ellipsis;overflow: hidden;white-space: nowrap; padding: 0 5px;margin-top:8px">{{tmp.name}}</p>
                        <p style="font-size:small; text-align: center; color: azure;">🍿{{tmp.voteaverage}}</p>
                        <p style="font-size:small; text-align: center; color: azure;margin-bottom:3px">{{tmp.firstairdate}}</p>
                    </div>
                    <div style="height:25px">
                    </div>
                </splide-slide>
            </splide>
        </div>
        <br />
        <br />
        <div id="mainslider" >
            <span style="color:azure;font-weight:bold;font-size: 27px;">고전 명작</span>
            <splide :options="options2" >
                <splide-slide @click="content(tmp.id, 'movie')"  v-for="tmp of state.data5" :key="tmp">    
                    <div class="newdiv">
                        <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`'  class="img1" >
                        <p style="font-weight:bold; text-align: center; color: azure; text-overflow: ellipsis;overflow: hidden;white-space: nowrap; padding:0 5px;margin-top:8px">{{tmp.title}}</p>
                        <p style="font-size:small; text-align: center; color: azure;">🍿{{tmp.voteaverage}}</p>
                        <p style="font-size:small; text-align: center; color: azure;margin-bottom:3px">{{tmp.releasedate}}</p>
                    </div> 
                    <div style="height:25px">
                    </div>
                </splide-slide>
            </splide>
        </div>
    </div>
    <div @click="scrollToTop()" :class="['back-to-top-btn', {'go-top': isTop}]">
        <p style="font-size:35px; transform: translate(0px, -5px); ">▲</p> 
    </div>
</template>


                           
<div v-for="tmp of state.data.results" :key="tmp" @click="content(tmp.id, tmp.media_type)" class="div"></div>



<script>
import axios from 'axios'
import { getCurrentInstance, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import "@/assets/css/totop.scss"
//$ npm install @splidejs/vue-splide     <-- 설치 로컬에서만 사용, main.js등록필요없음
export default {
    name:"MainSlider",
    components: {
    Splide,
    SplideSlide,
    },
    data() {
      return {
        options: {
        perPage     : 5,
        perMove     : 1,
        wheel       : true,
        autoplay    : true,
        },
        options1: {
        perPage     : 1,
        perMove     : 1,
        wheel       : true,
        autoplay    : true,
        },
        options2: {
        perPage     : 8,
        perMove     : 1,
        wheel       : true,
        autoplay    : true,
        },
      };
    },
    setup () {
        const { proxy } = getCurrentInstance();
        
        const router = useRouter();
        const state = reactive({
            data : "",
            data2 : "",
            data3 : "",
            data4 : "",
            data5 : "",
            random : [],
            isTop : false,
        })

        const handledata = async() => {
            const url = `${proxy.foo}/api/trandingapi.json`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            // 트렌딩 제목 한글화.. 켜놓으니 느림
            for(let i=0;i<data.results.length;i++){
                const url1 = `${proxy.foo}/DB/selectone.json?no=${data.results[i].id}&type=${data.results[i].media_type}`;
                const response = await axios.get(url1,{headers})
                if(response.data.status === 200){
                    data.results[i].poster_path=response.data.result.poster_path
                    if(typeof(data.results[i]['title'])==='undefined'){
                        data.results[i].name=response.data.result.name
                        data.results[i].vote_average = Math.round(data.results[i].vote_average*10)/10.0;
                    }
                    else{
                        data.results[i].title=response.data.result.title
                        data.results[i].vote_average = Math.round(data.results[i].vote_average*10)/10.0;
                    }
                }
            }
            state.data = data
        }

        const handledata2 = async() => {
            const url = `${proxy.foo}/DB/newtvcontent.json`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data2 = data
        }

        const handledata3 = async() => {
            const url = `${proxy.foo}/DB/newmoviecontent.json`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data3 = data
        }

        const no1 = [1396,94605,87739,63174,37680]
        const no2 = [97970,95484,70626,1419]
        const no3 = [64840,456,87108,106651]

        const random = () => {
            var arr = []
            for(let i=0;i<3;i++){
                arr.push(no1[Math.floor(Math.random()*4)])
                arr.push(no2[Math.floor(Math.random()*3)])
                arr.push(no3[Math.floor(Math.random()*3)])
            }
            const dup = new Set(arr)
            for(let tmp of dup)
            state.random.push(tmp)
            handledata4()
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
            handledata();
            handledata2();
            handledata3();
            random();
            handledata5();
        })
        const scrollToTop = async() =>{
            window.scrollTo(0, 0);
        }

        const handledata4 = async() => {
            const url = `${proxy.foo}/DB/editors.json`
            const headers = {"Content-Type":"application/json"}
            const body = {
                id : state.random
            }
            const {data} = await axios.post(url,body,{headers})
            state.data4 = data.results
        }

        const shuffleArray = (array) => {
            for (let i = 0; i < array.length; i++) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const handledata5 = async() => {
            const url = `${proxy.foo}/DB/oldcontent.json`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data5 = shuffleArray(data.results);
        }

        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }
        
        return {state,handledata,content,random,scrollToTop}
    }
}
</script>

<style lang="scss" scoped>

    .spinner {
        width: 25px;
        height: 27px;
        background-color: rgb(0, 162, 232);
        margin: 50px auto 25px auto;
        -webkit-animation: sk-rotateplane 1.5s infinite ease-in-out;
        animation: sk-rotateplane 1.5s infinite ease-in-out;
    }
    @-webkit-keyframes sk-rotateplane {
        0% { -webkit-transform: perspective(120px) }
        50% { -webkit-transform: perspective(120px) rotateY(180deg) }
        100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
    }
    @keyframes sk-rotateplane {
        0% { 
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
        } 50% { 
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
        } 100% { 
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        }
    }
    .bar{
        width: 25px;
        height: 160px;
        background-color: azure;
        margin: 0 auto 0 auto;

    }
    .img{
        width: 100%;
        margin:3px;
        border-radius: 10px;
    }  
    .img2{
        width: 25%;
        max-width:250px;
        margin:3px;
        border-radius: 10px;
        float: left;
    }  
    .img1{
        width: 100%;
        border:none;
        border-radius: 10px 10px 0 0;
    }
    .newdiv{
        display:inline-block;
        width:95%;
        height:90%;
        text-align: center;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        margin:3px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.2);
        cursor:pointer;
        color:white;
        backdrop-filter: blur(10px);
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }
    .newdiv:hover{
        transform:scale(0.97);
        -o-transform:scale(0.97);
        -moz-transform:scale(0.97);
        -webkit-transform:scale(0.97);
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }
    .tr{
        cursor:pointer;
        width:90%;
        margin-top:10px;
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }
    .tr:hover{
        transform:scale(1.05);
        -o-transform:scale(1.05);
        -moz-transform:scale(1.05);
        -webkit-transform:scale(1.05);
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }
    .divd{
        transition: transform .35s;
        transition: all .2s;
    }
    .divd:hover{
        border-radius: 10px;
        cursor:pointer;
        background-color: rgba(255, 255, 255, 0.1);
        transition: all .2s;
    }
</style>