<template>
    <div>
        <h2>리뷰관리</h2>
        <div>
            <v-card style="padding:10px;background-color:rgba(0, 0, 0, 0.4);border-radius:10px;color:white">
                <v-tabs v-model="state.tab" background-color="primary">
                    <v-tab value="one">드라마</v-tab>
                    <v-tab value="two">영화</v-tab>
                </v-tabs>
            <v-card-text>

                <v-window v-model="state.tab">
                    <v-window-item value="one">

                        <v-table style="background-color:rgba(0, 0, 0, 0.0);color:azure">
                            <thead>
                                <tr>
                                    <th>리뷰번호</th>
                                    <th>드라마제목</th>
                                    <th>리뷰</th>
                                    <th>평점</th>
                                    <th>등록일</th>
                                    <th>유저아이디</th>
                                    <th>닉네임</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="tmp of state.data" :key="tmp" class="colored">
                                    <td>{{tmp.id}}</td>
                                    <td @click="content(tmp.dramaContent.id, 'tv')" style="cursor:pointer">{{tmp.dramaContent.name}}</td>
                                    <td>
                                        <p @click="reviewone(tmp.id, 'drama')" style="font-weight:bold;cursor:pointer;max-width:300px;">{{tmp.content}}</p>
                                    </td>
                                    <td>{{tmp.score}}</td>  
                                    <td>{{tmp.regdate}}</td>
                                    <td class="user" @click="userprofile(tmp.member.userid)" style="cursor:pointer">{{tmp.member.userid}}</td>
                                    <td class="nick" @click="userprofile(tmp.member.userid)" style="cursor:pointer">{{tmp.member.nickname}}</td>
                                    <td><v-btn @click="handleDelete(tmp.id)" style="background-color:rgba(0, 0, 0, 0.4); width:100px;">삭제</v-btn></td>
                                    
                                </tr>
                            </tbody>
                        </v-table>
                        <v-pagination
                        v-model="state.dramapage"
                        :length="state.dramapages" @click="dramapage(state.dramapage)"
                        ></v-pagination>
                    </v-window-item>
                
                    <v-window-item value="two">
                        <v-table style="background-color:rgba(0, 0, 0, 0.0);color:azure">
                            <thead>
                                <tr>
                                    <th>리뷰번호</th>
                                    <th>영화제목</th>
                                    <th>리뷰</th>
                                    <th>평점</th>
                                    <th>등록일</th>
                                    <th>유저아이디</th>
                                    <th>닉네임</th>
                                    <th>버튼</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tmp of state.data1" :key="tmp" class="colored">
                                    <td>{{tmp.id}}</td>
                                    <td @click="content(tmp.movieContent.id, 'movie')" style="cursor:pointer">{{tmp.movieContent.title}}</td>
                                    <td>
                                        <p @click="reviewone(tmp.id, 'movie')" style="font-weight:bold;cursor:pointer;max-width:300px;">{{tmp.content}}</p>
                                    </td>
                                    <td>{{tmp.score}}</td>
                                    <td>{{tmp.regdate}}</td>
                                    <td class="user" @click="userprofile(tmp.member.userid)" style="cursor:pointer">{{tmp.member.userid}}</td>
                                    <td class="nick" @click="userprofile(tmp.member.userid)" style="cursor:pointer">{{tmp.member.nickname}}</td>
                                    <td><v-btn @click="handleDelete1(tmp.id)" style="background-color:rgba(0, 0, 0, 0.4); width:100px;">삭제</v-btn></td>
                                    
                                </tr>
                            </tbody>
                        </v-table>
                        <v-pagination
                        v-model="state.moviepage"
                        :length="state.moviepages" @click="moviepage(state.moviepage)"
                        ></v-pagination>

                    </v-window-item>    
                </v-window>
            </v-card-text>
        </v-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { reactive } from '@vue/reactivity'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("token"),
            data:"",
            data1:"",
            tab : "one",
            dramapage: 1,
            dramapages: 1,
            moviepage: 1,
            moviepages: 1,
        })

        onMounted(()=>{
            handledrama();
            handlemovie();
        })

        const handledrama = async() =>{
            const url = `${proxy.foo}/content/admin/review.json?page=${state.dramapage}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const {data} = await axios.get(url,{headers})
            state.data = data.result
            state.dramapages = data.pages   
        }

        const handlemovie = async() =>{
            const url = `${proxy.foo}/content/admin/review.json?page=${state.moviepage}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const {data} = await axios.get(url,{headers})
            state.data1 = data.result1   
            state.moviepages = data.pages1   
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
            }
            handledrama();
            handlemovie();
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
            }
            handledrama();
            handlemovie();
        }
        
        const dramapage = (no) =>{
            state.dramapage = no
            handledrama();
        }
        const moviepage = (no) =>{
            state.moviepage = no
            handlemovie();
        }

        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }

        const userprofile = (userid) => {
            router.push({path:'/userprofile', query:{id:userid}})
        }

        const reviewone = (code, type) => {
            router.push({path:'/reviewone', query:{code:code, type:type}})
        }

        return {state,handledrama,handlemovie,handleDelete,handleDelete1,moviepage,dramapage, content, userprofile, reviewone}
    }
}
</script>

<style lang="scss" scoped>
    .review{
        max-width:300px;
        max-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        white-space: normal;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .user{
        max-width:100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .nick{
        max-width:100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    tr.colored:nth-child(even){
        background-color:rgba(155, 155, 155, 0.7);
        color:azure;
    }
    tr.colored:nth-child(odd){
        background-color:rgba(155, 155, 155, 0.3);
        color:azure;
    }
</style>