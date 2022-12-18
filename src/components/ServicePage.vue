<template>
    <div class="con">
        <v-card class="in" style="background-color:rgba(255, 255, 255, 0);box-shadow:none">
            <v-tabs v-model="state.tab" background-color="primary">
                <v-tab value="one">자주 묻는 질문</v-tab>
                <v-tab value="two">1대 1 문의</v-tab>
            </v-tabs>

            <v-card-text>
            <v-window v-model="state.tab">
                <v-window-item value="one">
                    <v-expansion-panels variant="accordion">
                        <v-expansion-panel 
                            title="Q. OTT[i]는 무슨 뜻인가요?"
                            text="A. OTT를 의미하는 Over The Top에 index를 더하여 이곳에 OTT의 모든것을 담고 있다는 뜻입니다." 
                            style="background-color:rgba(255, 255, 255, 0.5); border-radius: 10px;">
                        </v-expansion-panel>
                        <v-expansion-panel
                            title="Q. 컨텐츠 업데이트는 언제 되나요?"
                            text="A. 사용자가 존재하지 않는 컨텐츠에 접근시 자동으로 데이터베이스에 갱신됩니다." 
                            style="background-color:rgba(255, 255, 255, 0.5)">
                        </v-expansion-panel>
                        <v-expansion-panel
                            title="Q. 컨텐츠 정보가 잘못되었는데 직접 수정할 수 있나요?"
                            text="A. 컨텐츠 상세페이지에서 수정요청 버튼을 클릭시 관리자에게 수정을 요청할 수 있습니다. 관리자가 확인 후 승인하면 최종적으로 수정됩니다." 
                            style="background-color:rgba(255, 255, 255, 0.5)">
                        </v-expansion-panel>
                        <v-expansion-panel
                            title="Q. 1대1 문의 내역 보관 기간은 어떻게 되나요?"
                            text="A. 법정 보유기간 3년을 준수합니다. 보존 연한 3년 초과분에 데이터는 삭제되는 점 참고 부탁드립니다." 
                            style="background-color:rgba(255, 255, 255, 0.5)">
                        </v-expansion-panel>
                        <v-expansion-panel
                            title="Q. 탈퇴한 계정을 다시 복구할 수 있나요?"
                            text="A. 회원 탈퇴 시점에 대부분의 회원정보가 영구 삭제되기 때문에 복구가 어려우니, 탈퇴 시 신중하게 결정해주세요."
                            style="background-color:rgba(255, 255, 255, 0.5)">
                        </v-expansion-panel>
                        <v-expansion-panel
                            title="Q. 새로운 기능을 제안하고 싶어요."
                            text="A. OTT[i]는 회원분들의 의견을 가장 소중하게 생각하고 있어요. 사용성 개선 관련하여 아래 1대 1문의로 의견 주시면 논의를 통해 반영될 수 있도록 하겠습니다."
                            style="background-color:rgba(255, 255, 255, 0.5); border-radius: 10px;">
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-window-item>
            
                <v-window-item value="two">
                    <div v-if="state.logged === true">
                        <v-table style="background-color:rgba(1, 1, 1, 0);border-radius: 10px;border-bottom:1px;">
                            <thead>
                                <tr>
                                    <th style="background-color:rgba(255, 255, 255, 0.5);border-top: none;">번호</th>
                                    <th style="background-color:rgba(255, 255, 255, 0.5);border-top: none;">제목</th>
                                    <th style="background-color:rgba(255, 255, 255, 0.5);border-top: none;">작성자</th>
                                    <th style="background-color:rgba(255, 255, 255, 0.5);border-top: none;">답변여부</th>
                                    <th style="background-color:rgba(255, 255, 255, 0.5);border-top: none;">날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tmp of state.data.result" :key="tmp">
                                    <td style="text-align:center;background-color:rgba(255, 255, 255, 0.5)">{{tmp.id}}</td>
                                    <td  @click="questionone(tmp.id)" style="cursor: pointer; background-color:rgba(255, 255, 255, 0.5)">{{tmp.title}}</td>
                                    <td v-if="tmp.member.delete === 0" @click="profile(tmp.member.userid)" style="background-color:rgba(255, 255, 255, 0.5);text-align: center;font-weight:bold;cursor:pointer">{{tmp.member.nickname}}</td>
                                    <td v-if="tmp.member.delete === 1" style="background-color:rgba(255, 255, 255, 0.5);text-align: center;">탈퇴한 회원</td>
                                    <td v-if="tmp.answerYN === 1" style="color:green; text-align:center;background-color:rgba(255, 255, 255, 0.5)">답변완료</td>
                                    <td v-if="tmp.answerYN === 0" style="color:red; text-align:center;background-color:rgba(255, 255, 255, 0.5)">미답변</td>
                                    <td style="background-color:rgba(255, 255, 255, 0.5);text-align:center;">{{tmp.regdate}}</td>
                                </tr>
                            </tbody>
                        </v-table>
                        <div class="text-center">
                            <v-pagination
                            v-model="state.page"
                            :length=(state.data.total/15)+1 @click="page(state.page)"
                            ></v-pagination>
                        </div>
                        
                        <div class="float">
                            <v-btn @click="question" rounded variant="outlined" class="btn">문의하기</v-btn>
                        </div>
                    </div>
                    <div v-else>
                        <br /><br /><br /><br />
                        <span style="color:red;font-weight:bold;font-size:20px">! </span>
                        <span>1:1 문의는 로그인 후 이용하실 수 있습니다.</span>
                        <br /><br /><br /><br />
                    </div>
                </v-window-item>    
            </v-window>
            </v-card-text>
        </v-card>
    </div>
    <div  v-if="state.logged === false" style="min-height:200px;">
    
    </div>
</template>

<script>
import { computed, reactive } from '@vue/reactivity'
import axios from 'axios';
import { getCurrentInstance, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const router = useRouter();
        const state = reactive({
            logged : computed(()=> store.getters.getLogged),
            from : sessionStorage.getItem("from"),
            tab : "one",
            data : "",
            token : sessionStorage.getItem("token"),
            page : 1,
        })

        onMounted(()=>{
            if(state.from === "/questionone"){
                state.tab = "two";
            }
            handledata();
        })

        const handledata = async() => {
            if(state.logged === true){
                const url = `${proxy.foo}/center/QNAList.json?no=${state.page}`
                const headers = {
                    "content-type":"application/json",
                    "TOKEN":state.token
                }
                const {data} = await axios.get(url,{headers})
                state.data = data
            }
        }

        const question = () =>{
            if(state.logged === false){
                alert("로그인이 필요한 서비스입니다.")
            }
            else{
                router.push({path:'/question'})
            }
        }
        const questionone = (no) =>{
            router.push({path:'/questionone',query:{id:no}})
        }

        const page = (no) =>{
            state.page=no
            handledata()
        }

        const profile = (userid) => {
            router.push({path:'/userprofile', query:{id:userid}})
        }



        return {state,question,questionone,page, profile}
    }
}
</script>

<style lang="css" scoped>
    .con{
        background-color: rgba(255, 255, 255, 0.6);
        padding:30px;
        border-radius: 10px;
    }
    .tbl{
        border-radius: 8px;
        margin-right: 3px;
        padding:5px;
        width:100%;
    }
    th{
        height:40px;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        background-color: rgba(65, 105, 225, 0.219);
    }
    td{
        height:30px;
        padding:0 5px;
        border-bottom: 1px solid gray;
    }
    .float{
        float: right;
    }
    .btn{
        margin-right:4px;
        border: none;
        background-color: rgba(31, 57, 133, 0.555);
        color: white;
    }
</style>