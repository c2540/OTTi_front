<template>
    <div style="text-align:center">
        <div v-if="state.result === ''" style="width: 1000px;display: inline-block;">
            <div v-if="state.dr1">
                <div>
                    <h3>{{state.dr11}} 장르 추천작</h3>
                    <br/>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr;" >
                        <div v-for="(tmp, idx) of state.dr1" :key="tmp" class="con">
                            <div @click="content(tmp.id, 'tv')">
                                <div style="min-height:150px;">
                                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`' class="img" />
                                    <img :src=imgs[idx].imgSrc class="grade" />
                                </div>
                                <div style="margin-top:90%">
                                    <p class="title">{{tmp.name}}</p>
                                    <p>🍿{{tmp.voteaverage}}</p>
                                    <p>{{tmp.firstairdate}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><hr /><br />
                <div>
                    <h3>{{state.dr22}} 장르 추천작</h3>
                    <br/>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr;">
                        <div v-for="(tmp, idx) of state.dr2" :key="tmp" class="con">
                            <div @click="content(tmp.id, 'tv')">
                                <div style="min-height:150px;">
                                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`' class="img" />
                                    <img :src=imgs[idx].imgSrc class="grade" />
                                </div>
                                <div style="margin-top:90%">
                                    <p class="title">{{tmp.name}}</p>
                                    <p>🍿{{tmp.voteaverage}}</p>
                                    <p>{{tmp.firstairdate}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><hr /><br />
                <div>
                    <h3>{{state.dr33}} 장르 추천작</h3>
                    <br/>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr;">
                        <div v-for="(tmp, idx) of state.dr3" :key="tmp" class="con">
                            <div @click="content(tmp.id, 'tv')">
                                <div style="min-height:150px;">
                                    <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`' class="img" />
                                    <img :src=imgs[idx].imgSrc class="grade" />
                                </div>
                                <div style="margin-top:90%">
                                    <p class="title">{{tmp.name}}</p>
                                    <p>🍿{{tmp.voteaverage}}</p>
                                    <p>{{tmp.firstairdate}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-else-if="state.logged === true" style="text-align:center">
                <img :src="require('@/assets/imgs/loading.gif')" style="width:100px;" /><br /><br />
                <span>추천작품을 불러오는 중입니다. 잠시만 기다려주세요.</span>
            </div>
        </div>
        <div v-else>
            <span style="font-size:large;color:red;font-weight:bold">! </span>
            <span>{{state.result}}</span><br />
            <span>선호하는 작품에 충분히 좋아요를 누른 후 다시 조회해주세요.</span>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, getCurrentInstance, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
    
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            token : sessionStorage.getItem("token"),
            logged  : computed(() => store.getters.getLogged), 
            nickname : computed(() => store.getters.getNickname),
            recommend : "",
            dr1 : "",
            dr2 : "",
            dr3 : "",
            dr11 : "",
            dr22 : "",
            dr33 : "",
            result : "",
        })
        const imgs = [
            {imgSrc : require('@/assets/imgs/medal11.png')},
            {imgSrc : require('@/assets/imgs/medal22.png')},
            {imgSrc : require('@/assets/imgs/medal33.png')}
        ]

        onMounted(()=>{
            handlerecommend();
        })
        const handlerecommend = async() => {
            if(state.logged === true){
                const url = `${proxy.foo}/contentlist/recommenddrama.json`
                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN": state.token
                }
                const {data} = await axios.get(url,{headers})
                if(data.status===200){
                    state.dr1 = shuffleArray(data.dr1);
                    state.dr2 = shuffleArray(data.dr2);
                    state.dr3 = shuffleArray(data.dr3);
                    state.dr11 = data.dr11.name;
                    state.dr22 = data.dr22.name;
                    state.dr33 = data.dr33.name;
                }
                else if(data.status===0){
                    state.result = data.result
                }
            }
        }

        const shuffleArray = (array) => {
            for (let i = 0; i < array.length; i++) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            const array1 = array.splice(1,3)
            return array1;
        };
        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }

        return {state,content,imgs}
    }
}
</script>

<style lang="scss" scoped>
.img{
    width:100%;
    border-radius:10px;
    position:absolute;
    top:0px; 
    left:0px;
    z-index:-2;
}
.grade{
    width: 30%;
    position:absolute;
    top: 0px;
    left :0px;
    z-index:1
}

.title{
    font-weight:bold;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding:5px;
}
.medal{
    width: 60px;
    float: left;
}
.con{
    margin: 5% auto 0 auto; ; 
    cursor:pointer; 
    border-radius: 10px;
    text-align:center;
    backdrop-filter: blur(10px);
    min-height: 200px;
    min-width: 100px;
    width: 250px;
    transition: transform .35s;
    -o-transition: transform .35s;
    -moz-transition: transform .35s;
    -webkit-transition: transform .35s;
}
.con:hover{
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