<template>
    <div>
        <h2>유저관리</h2>
        <v-table style="padding:10px;background-color:rgba(0, 0, 0, 0.4);border-radius:10px;color:azure">
            <thead>
                <tr>    
                    <th style="width:150px">ID</th>
                    <th>닉네임</th>
                    <th>정보확인</th>
                    <th>권한</th>
                    <th style="min-width:60px;">탈퇴 여부</th>
                    <th>차단</th>
                    <th>버튼</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tmp, i) in state.data.content" :key="tmp" class="colored">
                    <td @click="profile(tmp.userid)" style="text-align:center">
                        <p style="font-weight:bold;cursor:pointer; display:block;overflow: hidden; text-overflow: ellipsis;width:150px">{{tmp.userid}}</p>
                    </td>
                    <td v-if="tmp.nickname" @click="profile(tmp.userid)" style="cursor:pointer">{{tmp.nickname}}</td>
                    <td v-else>-</td>
                    <td>
                        <div>
                            <v-menu v-model="menu[i]" :close-on-content-click="false" location="end">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" style="background-color:rgba(255,255,255,0.3); border-radius:10px;color:rgb(40, 40, 40)">
                                        확인
                                    </v-btn>
                                </template>
                                <v-card style="background-color: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); padding:15px; border-radius:10px; text-align:center">
                                    <div style="text-align:left">
                                        <span style="font-weight:bold">연락처 / </span>
                                            <span v-if="tmp.phone">{{tmp.phone}}</span>
                                            <span v-else>-</span><br />
                                        <span style="font-weight:bold">출생연도 / </span>
                                            <span v-if="tmp.birth">{{tmp.birth}}</span>  
                                            <span v-else>-</span><br />
                                        <span style="font-weight:bold">가입일자 / </span>
                                            <span v-if="tmp.regdate">{{tmp.regdate}}</span><br />
                                        <span style="font-weight:bold">가입경로 / </span>
                                            <span v-if="tmp.social === 'normal'">일반</span>
                                            <span v-if="tmp.social === 'kakao'">카카오</span>
                                            <span v-if="tmp.social === 'naver'">네이버</span>
                                    </div>
                                    <v-btn text @click="menu[i] = false" style="margin-top:10px;width:100%; background-color: rgba(0, 0, 0, 0.3); color:white">
                                        닫기
                                    </v-btn>
                                </v-card>
                            </v-menu>
                        </div>
                    </td>  
                    <td v-if="tmp.role==='ADMIN'">관리자</td>
                    <td v-else-if="tmp.role==='MEMBER'">일반</td>
                    <td v-else>-</td>
                    <td v-if="tmp.delete===1">탈퇴</td>
                    <td v-else>-</td>
                    <td v-if="tmp.ban===1">차단</td>
                    <td v-else>-</td>
                    <td>
                        <v-btn @click="admin(tmp.userid)" v-if="tmp.role === 'MEMBER'"  class="btn" style="width:80px;margin:2px">관리자승급</v-btn>
                        <v-btn @click="removeadmin(tmp.userid)" v-if="tmp.role === 'ADMIN'" class="btn" style="width:80px;margin:2px">관리자해제</v-btn>
                        <v-btn @click="ban(tmp.userid)" v-if="tmp.ban===0" class="btn" style="width:80px; margin:2px">차단</v-btn>
                        <v-btn @click="unban(tmp.userid)" v-if="tmp.ban===1" class="btn" style="width:80px; margin:2px">차단 해제</v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-pagination
        v-model="state.page"
        :length="state.pages" @click="page(state.page)"
        ></v-pagination>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import axios from 'axios';
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    data : ()=>({
        menu: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    }),
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            token : sessionStorage.getItem("token"),
            role : computed(()=>store.getters.getRole),
            data : "",
            page : 1,
            pages : 1,
        })

        onMounted(()=>{
            if(state.role === "MEMBER"){
                router.push({path:"/main"})
                alert("접근불가 페이지 입니다.")
            }
            else{
                handledata();
            }
        })

        const handledata = async() =>{
            const url = `${proxy.foo}/member/admin/list.json?page=${state.page}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const {data} = await axios.get(url,{headers})
            state.data = data.result
            state.pages = data.result.totalPages;
        }

        const page = (no) =>{
            state.page = no
            handledata();
        }

        const admin = async(userid) => {
            const url = `${proxy.foo}/member/admin/makeadmin.json`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const body = {
                userid : userid
            }
            const {data} = await axios.post(url,body,{headers})
            state.data = data
            handledata();
        }

        const removeadmin = async(userid) => {
            const url = `${proxy.foo}/member/admin/removeadmin.json`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const body = {
                userid : userid
            }
            const {data} = await axios.post(url,body,{headers})
            state.data = data
            handledata();
        }

        const ban = async(userid) => {
            const url = `${proxy.foo}/member/admin/memberBan.json`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const body = {
                userid : userid
            }
            const {data} = await axios.post(url,body,{headers})
            state.data = data.result
            handledata();
        }

        const unban = async(userid) => {
            const url = `${proxy.foo}/member/admin/memberunBan.json`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN" : state.token
            }
            const body = {
                userid : userid
            }
            const {data} = await axios.post(url,body,{headers})
            state.data = data
            handledata();
        }

        const profile = (userid) => {
            router.push({path:'/userprofile', query:{id:userid}})
        }
    
        return {
            ...toRefs(state),
            state,
            admin,
            ban,
            unban,
            removeadmin,
            profile,
            page
        }
    }
}
</script>

<style lang="css" scoped>
    .btn{
        background-color:rgba(3, 3, 3, 0.4);
        width:80px;
        font-size:small;
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