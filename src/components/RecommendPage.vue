<template>
    <div style="color:azure; min-height: 30%;">

        <div v-if="state.logged === true">
            <div class="wrapper">
                <input type="checkbox" id="switch" v-model="state.menu" value="true">
                <label for="switch" class="switch_label">
                    <span class="onf_btn">
                        <p v-if="state.menu === true" class="btn_txt">영화 추천</p>
                        <p v-if="state.menu === false" class="btn_txt">드라마 추천</p>
                    </span>
                </label>
                <div style="display:grid;grid-template-columns:1fr 1fr;min-width: 1000px;width:100%">
                    <div>
                        <span v-if="state.menu === true" @click="state.menu=false" style="position: relative; bottom:44px; font-weight:bold;cursor:pointer">
                            드라마 추천받기
                        </span>
                    </div>
                    <div>
                        <span v-if="state.menu === false" @click="state.menu=true" style="position: relative; bottom:44px;font-weight:bold;cursor:pointer">
                            영화 추천받기
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="state.logged === true">
            <h1 v-if="state.menu === true">{{state.nickname}}님을 위한 영화 컨텐츠 추천</h1>
            <h1 v-if="state.menu === false">{{state.nickname}}님을 위한 드라마 컨텐츠 추천</h1>
        </div>
        <div v-else>
            <h1>로그인이 필요한 서비스입니다.</h1>
        </div>
        <div>
            <div>
                <menu-1 v-if="state.menu === true" title="추천 영화" ></menu-1>
                <menu-2 v-if="state.menu === false" title="추천 드라마"></menu-2>
            </div>
        </div>
    </div>
    
    <div class="container">

        <div id="mainslider" v-if="state.movietop">
            <span style="font-weight:bold;font-size: 20px;">다른 사용자들이 많이 찾은 영화</span>
            <br/>
            <splide :options="options" >
                <splide-slide  v-for="tmp of state.movietop.results" :key="tmp">    
                    <div class="div1" @click="content(tmp.id, 'movie')" style="display:inline-block;background-color:lightgray; margin:3px; width:120px; cursor:pointer; border-radius: 10px; background-color: rgba(1, 1, 1, 0.3);text-align:center;backdrop-filter: blur(10px);">
                        <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`' style="width:100%; border-radius: 10px 10px 0 0;" >
                        <p style="font-size:small;font-weight:bold; text-align: center; text-overflow: ellipsis;overflow: hidden;white-space: nowrap; padding:0 5px;margin-top:3px">{{tmp.title}}</p>
                        <p style="font-size:small; text-align: center;">{{tmp.hit}}hit</p>
                    </div> 
                    <div style="height:25px">
                    </div>
                </splide-slide>
            </splide>
        </div>

        <div id="mainslider" v-if="state.dramatop">
            <span style="font-weight:bold;font-size: 20px;">다른 사용자들이 많이 찾은 드라마</span>
            <br/>
            <splide :options="options" >
                <splide-slide v-for="tmp of state.dramatop.results" :key="tmp">   
                    <div class="div1" @click="content(tmp.id, 'tv')" style="display:inline-block;background-color:lightgray; margin:3px; width:130px; border-radius: 10px; cursor:pointer; background-color: rgba(1, 1, 1, 0.3);text-align:center;backdrop-filter: blur(10px);">
                        <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`' @click="content(tmp.id, 'tv')" style="width:100%; border-radius: 10px 10px 0 0;" >
                        <p style="font-size:small;font-weight:bold; text-align: center; text-overflow: ellipsis;overflow: hidden;white-space: nowrap; padding:0 5px;margin-top:3px">{{tmp.name}}</p>
                        <p style="font-size:small; text-align: center;">{{tmp.hit}}hit</p>
                    </div> 
                    <div style="height:25px">
                    </div>
                </splide-slide>
            </splide>
        </div>

    </div>
</template>

<script>
import "@/assets/css/totop.scss"
import Menu1 from '@/components/recommend/ReMoviePage.vue';
import Menu2 from '@/components/recommend/ReTVPage.vue';

import '@/assets/css/switch.css'

import { reactive } from '@vue/reactivity'
import { computed, getCurrentInstance, onMounted } from '@vue/runtime-core'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
export default {
    name:"MainSlider",
    components: {
    Menu1,
    Menu2,
    Splide,
    SplideSlide,
    },
    data() {
      return {
        options: {
        perPage     : 8,
        perMove     : 1,
        wheel       : true,
        autoplay    : true,
        }
      };
    },
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            token : sessionStorage.getItem("token"),
            logged  : computed(() => store.getters.getLogged), 
            nickname : computed(() => store.getters.getNickname),
            recommend : "",
            movietop : "",
            dramatop : "",
            result : "",
            menu : false,
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
            });
            dramatop10();
            movietop10();
        })
        const scrollToTop = async() =>{
            window.scrollTo(0, 0);
        }
        
        const dramatop10 = async() => {
            const url = `${proxy.foo}/DB/dramahit10.json`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.dramatop = data
        }

        const movietop10 = async() => {
            const url = `${proxy.foo}/DB/moviehit10.json`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.movietop = data
        }

        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }

        return {state,movietop10,dramatop10,content,scrollToTop}
    }
}
</script>

<style lang="css" scoped>
    .container {
        padding:30px;
        border-radius: 10px;
        margin-top: 150px;
        margin-bottom: 10px;
        background-color:rgba(255, 255, 255, 0.5);
        color:white
    }
    .div1{
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }
    .div1:hover{
        cursor:pointer;
        transform:scale(0.95);
        -o-transform:scale(0.95);
        -moz-transform:scale(0.95);
        -webkit-transform:scale(0.95);
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
        backdrop-filter: blur(10px);
    }

    .btn{
        background-color:rgba(200, 200, 200, 0.5);
        margin:15px;
        border-radius:10px;
        color:white;
        width: 40%;
    }
    .btn_sel{
        background-color:royalblue;
        margin:15px;
        border-radius:10px;
        color:white;
        width: 55%;
    }
</style>