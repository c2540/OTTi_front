<template>
    <div class="container">
        <div style="display:grid;grid-template-columns:2fr 6fr; color:white">
            <div>
                <div style="max-width:260px;text-align: center; border-radius: 10px; background-color: rgba(47, 79, 79, 0.6);">
                    <img :src= '`${state.imgurl}${state.data.profile_path}`' v-if="state.data.profile_path" style="width:100%;border-radius: 10px 10px 0 0;" />
                    <img :src="require('@/assets/no.png')" v-if="!state.data.profile_path" style="width:100%;border-radius: 10px 10px 0 0;" />            
                    <img :src = "require('@/assets/sns/instagram.png')" @click="sns('instagram', state.ids.instagram_id)" v-if="state.ids.instagram_id" class="sns" />
                    <img :src = "require('@/assets/sns/facebook.png')" @click="sns('facebook', state.ids.facebook_id)" v-if="state.ids.facebook_id" class="sns" />
                    <img :src = "require('@/assets/sns/twitter.png')" @click="sns('twitter', state.ids.twitter_id)" v-if="state.ids.twitter_id" class="sns" />
                    <div v-if="state.logged" style="border-top:1px solid gray;margin:0 10px;">
                        <input type="button" value="♡ 좋아요" v-if="state.type_like === 0" @click="likeinsert()" style="margin:10px 0;width:110px;display:inline-block;border-radius: 5px;background-color: rgba(0, 0, 0, 0.35); color: white;height:30px">
                        <input type="button" value="♥ 좋아요" v-if="state.type_like === 1" @click="likeinsert()" style="margin:10px 0;width:110px;display:inline-block;border-radius: 5px;background-color: rgba(0, 0, 0, 0.35); color: white;height:30px">
                    </div>
                </div>
            </div>
            <div style="margin-left:10px">
                <div>
                    <br />
                    <h1 v-if="!state.koreanname">{{state.data.name}}</h1>
                    <div v-if="state.koreanname">
                        <h1 style="display:inline-block">{{state.koreanname}}</h1>
                        <h3 style="display:inline-block;margin-left:5px">({{state.data.name}})</h3><br />
                    </div>
                    <!-- <span v-if="state.data.also_known_as" style="font-size:small">{{state.data.also_known_as}}</span> -->
                </div>
                <div>
                    <h3>유명분야</h3>           
                    <span v-if="state.data.known_for_department === 'Acting'" style="font-size:18px">배우</span>
                    <span v-if="state.data.known_for_department === 'Directing'" style="font-size:18px">감독</span>
                    <span v-if="state.data.known_for_department === 'Production'" style="font-size:18px">제작</span>
                    <span v-if="state.data.known_for_department === 'Writing'" style="font-size:18px">극본</span>
                    <span v-if="state.data.known_for_department === 'Art'" style="font-size:18px">미술감독</span>
                    <span v-if="state.data.known_for_department === 'Camera'" style="font-size:18px">카메라감독</span>
                    <span v-if="state.data.known_for_department === 'Sound'" style="font-size:18px">음향감독</span>
                    <span v-if="state.data.known_for_department === 'Costume & Make-Up'" style="font-size:18px">의상&메이크업</span>
                    <span v-if="state.data.known_for_department === 'Crew'" style="font-size:18px">스태프</span>
                    <span v-if="state.data.known_for_department === 'Editing'" style="font-size:18px">편집</span>
                    <span v-if="state.data.known_for_department === 'Visual Effects'" style="font-size:18px">CG감독</span>
                </div>
                <div>
                    <br />
                    <h3>성별</h3>
                    <span v-if="state.data.gender===1" style="font-size:18px">여자</span>
                    <span v-if="state.data.gender===2" style="font-size:18px">남자</span>
                    <span v-if="state.data.gender===3" style="font-size:18px">논바이너리</span>
                </div>
                <div>
                    <br />
                    <h3>출생</h3>
                    <span style="font-size:18px">{{state.data.birthday}}</span>
                </div>
                <div v-if="state.data.deathday">
                    <br />
                    <h3>사망</h3>
                    <span style="font-size:18px">{{state.data.deathday}}</span>
                </div>
                <div v-if="state.data.place_of_birth">
                    <br />
                    <h3>출생지</h3>
                    <span style="font-size:18px">{{state.data.place_of_birth}}</span>
                </div>
            </div>
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr">
            <div style="background-color:rgba(0, 0, 0, 0.3); border-radius:10px; margin-top:10px; text-align: center;padding-top: 5px;display: inline-block;color:white;">
                <h2 style="padding-top:10px">참여영화</h2>
                <div style="overflow-y: scroll; height:350px; padding:10px; border-radius: 0 0 10px 10px;" class="scroll">
                    <br /><div v-for="tmp of state.movie.cast" :key="tmp" @click="content(tmp.id, 'movie')" style="display:inline-block;">
                        <div v-if="tmp.poster_path" class="div1">
                            <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`' style="width:140px;" /><br/>
                            <span style="padding: 0 10px;">{{tmp.title}}</span><br />
                            <div>
                                <span v-if="tmp.release_date===''">미정</span>
                            </div>
                            <span>{{tmp.release_date}}</span>
                        </div>
                    </div>
                </div>
                <div style="height:10px"></div>
            </div>
            <div style="background-color:rgba(0, 0, 0, 0.3); border-radius:10px; margin-top:10px; text-align: center;padding-top: 5px;display: inline-block;color:white;margin-left:10px" class="div">
                <h2 style="padding-top:10px">참여드라마</h2>
                <div style="overflow-y: scroll; height:350px; padding:10px; border-radius: 0 0 10px 10px;" class="scroll">
                    <br /><div v-for="tmp of state.drama.cast" :key="tmp" @click="content(tmp.id, 'tv')" style="display:inline-block;">
                        <div v-if="tmp.poster_path" class="div1">
                            <img :src='`https://image.tmdb.org/t/p/w500${tmp.poster_path}`' style="width:140px;" /><br/>
                            <span style="padding: 0 10px;">{{tmp.name}}</span><br />
                            <span>{{tmp.first_air_date}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:10px"></div>
        </div>
    </div>
</template>

<script>
import { computed, getCurrentInstance, onMounted, reactive } from '@vue/runtime-core'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const route = useRoute();
        const store = useStore();
        const state = reactive({
            logged  : computed(() => store.getters.getLogged),
            token : sessionStorage.getItem("token"),
            imgurl : "https://image.tmdb.org/t/p/w500",
            koreanname : '',
            data : '',
            ids : '',
            movie : '',
            drama : '',
            type_like : 0,
        })
        onMounted(()=>{
            window.scrollBy(0,-50000)
            handledata(),
            handlecontent()
        })
        const handledata = async() => {
            const url = `${proxy.foo}/api/peopleinfo.json?key=${route.query.id}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data = data

            if(state.logged){
                handleliketypeview();
            }

            const url2 = `${proxy.foo}/api/peoplesns.json?key=${route.query.id}`
            const response = await axios.get(url2,{headers})
            state.ids = response.data

            check()
        }

        const handlecontent = async() => {
            const url = `${proxy.foo}/api/peoplecontent.json?key=${route.query.id}&type=movie`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.movie = data

            const url2 = `${proxy.foo}/api/peoplecontent.json?key=${route.query.id}&type=tv`
            const response = await axios.get(url2,{headers})
            state.drama = response.data
        }

        const sns = (sns, id) =>{
            window.open("https://www."+sns+".com/"+id);
        }
        const check = () => {
            const koreanname = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
            for(let i=0;i<state.data.also_known_as.length;i++){
                if(koreanname.test(state.data.also_known_as[i])){
                    state.koreanname = state.data.also_known_as[i];
                    break;
                }
            }
        }

        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }

        const handleliketypeview = async() => {
            const url = `${proxy.foo}/people/likeview.json?code=${route.query.id}`
            const headers = {"Content-Type":"application/json","TOKEN" : state.token}
            const {data} = await axios.get(url,{headers})
            state.type_like = data.type;
        }

        const likeinsert = async() => {
            const url = `${proxy.foo}/people/likeinsert.json?code=${route.query.id}&type=${state.type_like}`
            const headers = {"Content-Type":"application/json","TOKEN" : state.token}
            const body = {}
            const {data} = await axios.post(url,body,{headers})
            if(data.status===200){
                handleliketypeview();
            }
        }

        return {state, sns, content, likeinsert}
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
    .div1{
        display:inline-block;
        width:140px;
        text-align: center;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        margin:5px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.2);
        cursor:pointer;
        color:white;
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }
    .div1:hover{
        cursor:pointer;
        transform:scale(1.15);
        -o-transform:scale(1.15);
        -moz-transform:scale(1.15);
        -webkit-transform:scale(1.15);
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }
    .scroll::-webkit-scrollbar {
        width: 8px;
    }
    .scroll::-webkit-scrollbar-track{
        background-color: rgba(47, 79, 79, 0);
    }
    .scroll::-webkit-scrollbar-thumb {
        background-color: #d3d3d3a8;
        border-radius: 10px;
    }
    .sns{
        width:45px;  
        border: 1px solid gray;
        border-radius: 13px;
        margin:4px;
        cursor: pointer;
    }

</style>