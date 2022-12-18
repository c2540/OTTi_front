<template>
    <div>
        <h2>컨텐츠 수정요청</h2>
        <v-table style="padding:5px;background-color:rgba(0, 0, 0, 0.4);border-radius:10px;color:white">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>타입</th>
                    <th>개요</th>
                    <th>요청내용</th>
                    <th>트레일러</th>
                    <th>리뷰영상</th>
                    <th>요청자</th>
                    <th>요청일</th>
                    <th>버튼</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tmp, i) in state.data.content" :key="tmp" class="colored">
                    <td>{{tmp.no}}</td>
                    <td v-if="tmp.type==='tv'">
                        <span @click="content(tmp.contentcode, 'tv')" style="font-weight:bold;cursor:pointer">{{tmp.name}}</span>
                    </td>
                    <td v-if="tmp.type==='movie'">
                        <span @click="content(tmp.contentcode, 'movie')" style="font-weight:bold;cursor:pointer">{{tmp.title}}</span>
                    </td>
                    <td v-if="tmp.type==='tv'">드라마</td>
                    <td v-if="tmp.type==='movie'">영화</td>
                    <td>
                        <div>
                            <v-menu v-model="menu[i]" :close-on-content-click="false" location="end">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" style="background-color:rgba(255,255,255,0.3); border-radius:10px;color:rgb(40, 40, 40)">
                                        확인
                                    </v-btn>
                                </template>
                                <v-card width="400" style="background-color: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); padding:15px; border-radius:10px; text-align:center">
                                    <div>
                                    <p>{{tmp.overview}}</p>
                                    </div>
                                    <v-btn text @click="menu[i] = false" style="margin-top:10px;width:100%; background-color: rgba(0, 0, 0, 0.3); color:white">
                                        닫기
                                    </v-btn>
                                </v-card>
                            </v-menu>
                        </div>
                    </td>
                    <td>
                        <div>
                            <v-menu v-model="menu2[i]" :close-on-content-click="false" location="end">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" style="background-color:rgba(255,255,255,0.3); border-radius:10px;color:rgb(40, 40, 40)">
                                        확인
                                    </v-btn>
                                </template>
                                <v-card width="400" style="background-color: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); padding:15px; border-radius:10px; text-align:center">
                                    <div>
                                        <span style="font-weight:bold">OTT</span> / {{tmp.provider}}
                                            <span v-if="!tmp.provider">OTT정보 없음</span> <br />
                                        <span style="font-weight:bold">장르</span> / {{tmp.genre}}
                                            <span v-if="!tmp.genre">장르정보 없음</span> <br />
                                        <span style="font-weight:bold">성인물여부</span> / 
                                            <span v-if="tmp.adult === true">성인물</span>
                                            <span v-else>No</span><br />
                                        <div v-if="tmp.type === 'movie'">
                                            <span style="font-weight:bold">공개일</span> / 
                                                <span v-if="tmp.release_date">{{tmp.release_date}}</span>
                                                <span v-else>정보 없음</span><br />
                                            <span style="font-weight:bold">런타임</span> / 
                                                <span v-if="tmp.run_time">{{tmp.run_time}}분</span>
                                                <span v-else>정보 없음</span><br />
                                        </div>
                                        <div v-if="tmp.type === 'tv'">
                                            <span style="font-weight:bold">첫방영일</span> /
                                                <span v-if="tmp.first_air_date">{{tmp.first_air_date}}</span>
                                                <span v-else>정보 없음</span><br />
                                                <span style="font-weight:bold">런타임</span> / 
                                            <span v-if="tmp.episode_run_time">{{tmp.episode_run_time}}분</span>
                                                <span v-else>정보 없음</span><br />
                                            <span style="font-weight:bold">시즌수</span> /
                                                <span v-if="tmp.number_of_seasons">{{tmp.number_of_seasons}}</span> 
                                                <span v-else>정보 없음</span><br />
                                            <span style="font-weight:bold">에피소드수</span> / 
                                                <span v-if="tmp.number_of_episodes">{{tmp.number_of_episodes}}</span>
                                                <span v-else>정보 없음</span><br />
                                        </div>
                                    </div>
                                    <v-btn text @click="menu2[i] = false" style="margin-top:10px;width:100%; background-color: rgba(0, 0, 0, 0.3); color:white">
                                        닫기
                                    </v-btn>
                                </v-card>
                            </v-menu>
                        </div>
                    </td>
                    <td v-if="!tmp.trailer">없음</td>
                    <td v-else>
                        <div>
                            <v-menu v-model="menu3[i]" :close-on-content-click="false" location="end">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" style="background-color:rgba(255,255,255,0.3); border-radius:10px;color:rgb(40, 40, 40)">
                                        확인
                                    </v-btn>
                                </template>
                                <v-card style="background-color: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); padding:15px; border-radius:10px; text-align:center">
                                    <div>
                                        <iframe style="border-radius:10px" width="600px" height="300px" :src="`https://www.youtube.com/embed/${tmp.trailer}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                        </iframe>
                                    </div>
                                    <v-btn text @click="menu3[i] = false" style="margin-top:10px;width:100%; background-color: rgba(0, 0, 0, 0.3); color:white">
                                        닫기
                                    </v-btn>
                                </v-card>
                            </v-menu>
                        </div>
                    </td>
                    <td v-if="!tmp.youtubereview">없음</td>
                    <td v-else>
                        <div>
                            <v-menu v-model="menu4[i]" :close-on-content-click="false" location="end">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" style="background-color:rgba(255,255,255,0.3); border-radius:10px;color:rgb(40, 40, 40)">
                                        확인
                                    </v-btn>
                                </template>
                                <v-card style="background-color: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); padding:15px; border-radius:10px; text-align:center">
                                    <div>
                                        <iframe style="border-radius:10px" width="600px" height="300px" :src="`https://www.youtube.com/embed/${tmp.youtubereview}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                        </iframe>
                                    </div>
                                    <v-btn text @click="menu4[i] = false" style="margin-top:10px;width:100%; background-color: rgba(0, 0, 0, 0.3); color:white">
                                        닫기
                                    </v-btn>
                                </v-card>
                            </v-menu>
                        </div>
                    </td>
                    <td @click="userprofile(tmp.userid)">
                        <span style="font-weight:bold;cursor:pointer">{{tmp.userid}}</span>
                    </td>
                    <td>{{tmp.regdate}}</td>
                    <td>
                        <v-btn @click="confirm(tmp.no)" class="btn">승인</v-btn>
                        <v-btn @click="deleteinfo(tmp.no)" class="btn">거절</v-btn>
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
import axios from 'axios'
import { useRouter } from 'vue-router';
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'

export default {
    data : ()=>({
      menu: [false, false, false, false, false, false, false, false, false, false],
      menu2: [false, false, false, false, false, false, false, false, false, false],
      menu3: [false, false, false, false, false, false, false, false, false, false],
      menu4: [false, false, false, false, false, false, false, false, false, false]
    }),
    setup () {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const state = reactive({
            token : sessionStorage.getItem("token"),
            data : "",
            page : 1,
            pages : 1,
        })

        onMounted(()=>{
            handledata()
        })
        const handledata = async() => {
            const url = `${proxy.foo}/content/admin/updatecontentlist.json?page=${state.page}`
            const headers = {
                "Content-Type":"application/json",
                "TOKEN":state.token
        }
            const {data} = await axios.get(url,{headers})
            state.data = data.result;
            state.pages = data.result.totalPages;
        }

        const page = (no) =>{
            state.page = no
            handledata();
        }

        const deleteinfo = async(no) => {
            const url = `${proxy.foo}/content/deleteinfo.json?no=${no}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.delete(url,{headers,data:{}})
            if(data.status===200){
                "컨텐츠 수정 요철을 거절 하셨습니다."
            }
            handledata();
        }

        const confirm = async(no) =>{
            const url = `${proxy.foo}/content/updatedone.json?no=${no}`
            const headers ={"Content=Type":"application/json"}
            const {data} = await axios.put(url,{headers})
            if(data.status === 200){
                alert('컨텐츠 수정 요청을 승인하였습니다.')
                deleteinfo(no);
            }
            handledata();
        }

        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }

        const userprofile = (userid) => {
            router.push({path:'/userprofile', query:{id:userid}})
        }
    
        return {
            ...toRefs(state),state,deleteinfo,confirm,content,userprofile,page
        }
    }
}
</script>

<style lang="css" scoped>
    .btn{
        background-color:rgba(0, 0, 0, 0.4);
        margin:2px;
        width:50px;
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
