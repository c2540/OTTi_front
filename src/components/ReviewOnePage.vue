<template>
    <div class="container">
        <v-btn @click="back()" style="background-color:rgba(0, 0, 0, 0.2); border-radius:10px">돌아가기</v-btn><br />
        <div style="background-color:rgba(0, 0, 0, 0.2); margin-top:10px; padding:10px; border-radius: 10px;">
            <div v-if="state.data.movieContent" @click="content(state.content.id, 'movie')" style="background-color:rgba(0, 0, 0, 0.2); margin-top:10px; padding:10px; cursor:pointer; display:inline-block; border-radius: 10px;">
                <img :src= '`https://image.tmdb.org/t/p/w500${state.content.poster_path}`' style="height:70px; border-radius: 5px; vertical-align:middle;" />
                <span style="margin-left:3px">컨텐츠명 / {{state.content.title}}</span>
            </div>
            <div v-if="state.data.dramaContent" @click="content(state.content.id, 'tv')" style="background-color:rgba(0, 0, 0, 0.2); margin-top:10px; padding:10px; cursor:pointer; display:inline-block; border-radius: 10px;">
                <img :src= '`https://image.tmdb.org/t/p/w500${state.content.poster_path}`' style="height:70px; border-radius: 5px; vertical-align:middle;" />
                <span>컨텐츠명 / {{state.content.name}}</span>
            </div>
            <div @click="userprofile(state.member.userid)" style="background-color:rgba(0, 0, 0, 0.2); margin-left:10px; margin-top:10px; padding:10px; cursor:pointer; display:inline-block; border-radius: 10px;">
                <div v-if="!state.imageno" style="display:inline-block">
                    <img :src = "require('@/assets/no.png')" style="width:70px; height:70px; border-radius:5px; vertical-align:middle;" />
                </div>
                <div v-else-if="state.imageno.no && state.member.delete === 0" style="display:inline-block">
                    <img :src = "`${state.foo}/member/image?no=${state.imageno.no}`" style="width:70px; height:70px; border-radius:5px; vertical-align:middle;" />
                </div>
                <div v-else-if="state.imageno && state.member.delete === 0" style="display:inline-block">
                    <img :src = "`${state.foo}/member/image?no=${state.imageno}`" style="width:70px; height:70px; border-radius:5px; vertical-align:middle;" />
                </div>
                <div v-else style="display:inline-block">
                    <img :src = "require('@/assets/40725741.jpg')" style="width:50px; height:50px; border-radius:5px" />
                </div>
                <span v-if="state.member.delete === 0" style="margin-left:3px">리뷰어 / {{state.member.nickname}}</span>
                <span v-if="state.member.delete === 0" style="font-size:small"> (▷{{state.member.nickname}}님의 리뷰 더보기)</span>
                <span v-if="state.member.delete === 1" style="margin-left:3px">리뷰어 / 탈퇴한 회원입니다.</span>
            </div><br />
            <div style="margin-top:10px">
                <label style="display:inline-block;width:100px;text-align:center;background-color:rgba(0, 0, 0, 0.2); border-radius: 10px;margin-right: 5px;margin-bottom: 10px;">작성일시</label>
                <br /><span style="margin-left: 30px;">{{state.data.regdate}}</span><br />
                <label style="display:inline-block;width:100px;text-align:center;background-color:rgba(0, 0, 0, 0.2); border-radius: 10px;margin-top:10px;margin-right: 5px;margin-bottom: 5px;">평점</label>
                <br /><img v-if="state.data.score===1" :src="require(`@/assets/star_half.png`)" style="width:30px;margin-left: 30px;" />
                <img v-if="state.data.score>=2" :src="require(`@/assets/star_full.png`)" style="width:30px;margin-left: 30px" />
                <img v-if="state.data.score===3" :src="require(`@/assets/star_half.png`)" style="width:30px;" />
                <img v-if="state.data.score>=4" :src="require(`@/assets/star_full.png`)" style="width:30px" />
                <img v-if="state.data.score===5" :src="require(`@/assets/star_half.png`)" style="width:30px" />
                <img v-if="state.data.score>=6" :src="require(`@/assets/star_full.png`)" style="width:30px" />
                <img v-if="state.data.score===7" :src="require(`@/assets/star_half.png`)" style="width:30px" />
                <img v-if="state.data.score>=8" :src="require(`@/assets/star_full.png`)" style="width:30px" />
                <img v-if="state.data.score===9" :src="require(`@/assets/star_half.png`)" style="width:30px" />
                <img v-if="state.data.score===10" :src="require(`@/assets/star_full.png`)" style="width:30px" />
                <img v-if="state.data.score<=2" :src="require(`@/assets/star_empty.png`)" style="width:30px" />
                <img v-if="state.data.score<=4" :src="require(`@/assets/star_empty.png`)" style="width:30px" />
                <img v-if="state.data.score<=6" :src="require(`@/assets/star_empty.png`)" style="width:30px" />
                <img v-if="state.data.score<=8" :src="require(`@/assets/star_empty.png`)" style="width:30px" />
                <span style="font-weight:bold;font-size:38px; margin-left:15px;">{{state.data.score}}</span><span> / 10</span><br />
                <label style="display:inline-block;width:100px;text-align:center;background-color:rgba(0, 0, 0, 0.2); border-radius: 10px;margin-right: 5px;margin-bottom: 5px;">리뷰내용</label>
                <p style="padding:10px; background-color:rgba(255, 255, 255, 0.15);border-radius: 10px;min-height:150px;">{{state.data.content}}</p><br />
            </div>
            <div style="text-align:center;">
                <v-btn @click="like()" style="background-color:rgba(0, 0, 0, 0.2); border-radius:10px">👍추천 {{state.likecnt}}</v-btn>
                <span v-if="state.member.userid === state.userid ||state.role==='ADMIN'">
                    <v-btn v-if="state.type === 'movie'" @click="deleteReview('movie')" style="background-color:rgba(0, 0, 0, 0.2); border-radius:10px; margin-left:10px;">리뷰삭제</v-btn>
                    <v-btn v-if="state.type === 'drama'" @click="deleteReview('tv')" style="background-color:rgba(0, 0, 0, 0.2); border-radius:10px; margin-left:10px;">리뷰삭제</v-btn>
                </span>
            </div>
        </div>
        <div style="background-color:rgba(0, 0, 0, 0.2); border-radius:10px; margin-top:10px; padding: 10px;">
                <v-table style="background-color:rgba(1, 1, 1, 0);border-radius: 10px;border-bottom:1px; text-align: center;color:white">
                    <thead>
                        <tr>
                            <th>댓글작성자</th>
                            <th>댓글내용</th>
                            <th>작성일자</th>
                            <th>버튼</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tmp of state.reply" :key="tmp">
                            <td @click="userprofile(tmp.userid.userid)" style="font-weight:bold;cursor:pointer">
                                <img :src = "`${state.foo}/member/image?no=${tmp.no.no}`" v-if="tmp.no != null" style="width:30px; height:30px; border-radius:50%; vertical-align:middle;border:1px solid gray" />
                                <img :src = "require('@/assets/40725741.jpg')" v-else style="width:30px; height:30px; border-radius:50%;vertical-align:middle;border:1px solid gray" />
                                <span v-if="tmp.userid.delete === 0" style="margin-left:4px">{{tmp.userid.nickname}}</span>
                                <span v-else style="color:gray;margin-left:4px">탈퇴한 회원</span>
                            </td>
                            <td>{{tmp.content}}</td>
                            <td>{{tmp.regdate}}</td>
                            <td>
                                <v-btn @click="deleteReviewReply(tmp.id)" v-if="tmp.userid.userid === state.userid" style="background-color:rgba(0, 0, 0, 0.2); border-radius:10px;">댓글삭제</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <div v-if="!state.reply.length">
                    <p style="text-align:center;margin-top: 10px;">아직 댓글이 없습니다. 댓글을 작성해보세요.</p>
                </div>
                <v-pagination
                    v-model="state.page"
                    :length="state.pages" @click="page(state.page)"
                ></v-pagination>
            <div style="padding:20px">
                <h4>댓글작성</h4>
                <textarea v-if="state.logged === true" v-model="state.replycontent" placeholder="댓글을 입력해주세요."  rows="2" class="reply"></textarea>
                <textarea v-if="state.logged === false" placeholder="로그인 후 이용할 수 있습니다." rows="2" class="reply" disabled></textarea>
                <div style="text-align:right">
                    <v-btn @click="replyinsert()" style="background-color:rgba(0, 0, 0, 0.2); border-radius:10px;">댓글달기</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, getCurrentInstance, onMounted } from '@vue/runtime-core'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup () {
        const { proxy } = getCurrentInstance();
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            logged  : computed(() => store.getters.getLogged),
            token : sessionStorage.getItem("token"),
            userid : computed(() => store.getters.getUserid),
            role : computed(()=>store.getters.getRole),
            type : route.query.type,
            data : '',
            member : '',
            content : '',
            likecnt : '',
            imageno : '',
            replycontent : '',
            reply : [],
            page : 1,
            pages : 1,
            foo : proxy.foo
        })
        
        onMounted(() => {
            window.scrollTo(0,0)
            handleData();
            handleReply();
            likecnt();
        })

        const handleData = async() =>{
            const url = `${proxy.foo}/content/selectonereview${route.query.type}.json?id=${route.query.code}`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            state.data = data.result
            state.member = data.result.member
            state.imageno = data.imageno
            if(route.query.type === 'movie'){
                state.content = data.result.movieContent
            }
            else{
                state.content = data.result.dramaContent
            }
        };

        const handleReply = async() =>{
            const url = `${proxy.foo}/content/${route.query.type}reviewreplyselect.json?id=${route.query.code}&page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            if(data.status===200){
                state.reply = data.results.reverse();
                state.pages = data.pages
            }
        };

        const page = (no) =>{
            state.page=no
            handleReply()
        }

        const like = async() =>{
            if(state.logged===true){
                const url = `${proxy.foo}/content/${route.query.type}reviewlike.json?id=${route.query.code}`;
                const body={}
                const headers = {"Content-Type":"application/json", "TOKEN" : state.token};
                const {data} = await axios.post(url, body, {headers});
                if(data.status === 200){
                    likecnt();
                }
                else if(data.status === 0){
                    alert('이미 추천한 리뷰입니다.')
                }
            }   
            else{
                alert("로그인이 필요한 서비스입니다.")
            }
        };

        const likecnt = async() =>{
            const url = `${proxy.foo}/content/${route.query.type}reviewlikecnt.json?id=${route.query.code}`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url, {headers});
            state.likecnt = data.result
        };

        const content = (no, type) => {
            router.push({path:'/content',query:{no:no,type:type}})
        }
        const back = () => {
            history.back();
        }

        const deleteReview = async(type) => {
            if(confirm('정말 삭제하시겠습니까?')){
                const url = `${proxy.foo}/content/delete${type}review.json?no=${route.query.code}`
                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN" : state.token
                }
                const {data} = await axios.delete(url,{headers,data:{}})
                if(data.status===200){
                    alert('삭제되었습니다.');
                    history.back();
                }else{
                    alert('삭제에 실패하였습니다. 다시 시도해주세요.')
                }
            }
        }

        const deleteReviewReply = async(id) => {
            if(confirm('정말 삭제하시겠습니까?')){
                const url = `${proxy.foo}/content/delete${state.type}reviewreply.json?id=${id}`
                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN" : state.token
                }
                const {data} = await axios.delete(url,{headers,data:{}})
                if(data.status===200){
                    alert('삭제되었습니다.');
                    handleReply();
                }else{
                    alert('삭제에 실패하였습니다. 다시 시도해주세요.')
                }
            }
        }
        
        const userprofile = (userid) => {
            router.push({path:'/userprofile', query:{id:userid}})
        }

        const replyinsert = async() =>{
            if(state.logged === true){
                if(state.replycontent === ''){
                    alert('댓글내용을 입력해 주세요.');
                    return false;
                }
                const url = `${proxy.foo}/content/${state.type}reviewreply.json?id=${route.query.code}`
                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN" : state.token
                }
                const body = {
                    content : state.replycontent
                }
                const {data} = await axios.post(url,body, {headers})
                if(data.status===200){
                    state.replycontent = '';
                    handleReply();
                }else{
                    alert('등록에 실패하였습니다. 다시 시도해주세요.')
                }
            }
            else{
                alert('로그인 후 이용해주세요.')
            }
        }

        return {state, like, content, deleteReview, deleteReviewReply, userprofile, replyinsert, back, page}
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
    .reply{
        width:100%;
        background-color:rgba(255, 255, 255, 0.5);
        border:2px solid rgba(255, 255, 255, 0);
        padding:10px;
        border-radius:10px;
        transition:all .2s
    }
    .reply:focus{
        outline: none;
        border:2px solid royalblue;
        transition:all .2s
    }
</style>