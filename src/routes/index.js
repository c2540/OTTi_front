import { createWebHistory,createRouter } from "vue-router";

import PreConnectPage from '@/components/PreConnectPage.vue'
import MainPage from '@/components/MainPage.vue'
import ContentFindPage from '@/components/ContentFindPage.vue'
import ContentPage from '@/components/ContentPage.vue'
import ContentPageUpdate from '@/components/ContentPageUpdate.vue'
import JoinPage from '@/components/JoinPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import MyPage from '@/components/MyPage.vue'
import SearchPage from '@/components/SearchPage.vue'
import ServicePage from '@/components/ServicePage.vue'
import QuestionPage from '@/components/QuestionPage.vue'
import QuestionOnePage from '@/components/QuestionOnePage.vue'
import CallbackNPage from '@/components/CallbackNPage.vue'
import CallbackKPage from '@/components/CallbackKPage.vue'
import FindIdPage from '@/components/FindIdPage.vue'
import FindPwPage from '@/components/FindPwPage.vue'
import APIPage from '@/components/api/APIPage.vue'
import API2Page from '@/components/api/APIPage2.vue'
import ContentApiAutoPage from '@/components/api/ContentApiAutoPage.vue'
import GenreCatePage from '@/components/api/GenreCatePage.vue'
import MovieGenrePage from '@/components/api/MovieGenrePage.vue'
import MovieInfoPage from '@/components/api/MovieInfoPage.vue'
import DramaGenrePage from '@/components/api/DramaGenrePage.vue'
import DramaInfoPage from '@/components/api/DramaInfoPage.vue'
import LikePage from '@/components/LikePage.vue'
import LaterPage from '@/components/LaterPage.vue'
import PeoplePage from '@/components/PeoplePage.vue'
import PeopleInfoPage from '@/components/PeopleInfoPage.vue'
import AdminPage from '@/components/AdminPage.vue'
import AdminReviewPage from '@/components/admin/AdminReviewPage.vue'
import AdminUserPage from '@/components/admin/AdminUserPage.vue'
import GenrePage from '@/components/GenrePage.vue'
import MyReviewPage from '@/components/MyReviewPage.vue'
import UserProfilePage from '@/components/UserProfilePage.vue'
import ReviewOnePage from '@/components/ReviewOnePage.vue'
import RecommendPage from '@/components/RecommendPage.vue'


const routes = [
    {path:'/', component:PreConnectPage},
    {path:'/main',name:"main", component:MainPage},
    {path:'/content', component:ContentPage},
    {path:'/contentU', component:ContentPageUpdate},
    {path:'/contentfind', component:ContentFindPage},
    {path:'/join', component:JoinPage},
    {path:'/login',name:"login" , component:LoginPage},
    {path:'/mypage', component:MyPage},
    {path:'/search', component:SearchPage},
    {path:'/service', component:ServicePage},
    {path:'/question', component:QuestionPage},
    {path:'/questionone', component:QuestionOnePage},
    {path:'/callback', component:CallbackNPage},
    {path:'/callback_kakao', component:CallbackKPage},
    {path:'/findid', component:FindIdPage},
    {path:'/findpw', component:FindPwPage},
    {path:'/api', component:APIPage},
    {path:'/api2', component:API2Page},
    {path:'/contentapiauto', component:ContentApiAutoPage},
    {path:'/api/genrecate', component:GenreCatePage},
    {path:'/api/moviegenre', component:MovieGenrePage},
    {path:'/api/movieinfo', component:MovieInfoPage},
    {path:'/api/dramagenre', component:DramaGenrePage},
    {path:'/api/dramainfo', component:DramaInfoPage},
    {path:'/like', component:LikePage},
    {path:'/later', component:LaterPage},
    {path:'/people', component:PeoplePage},
    {path:'/peopleinfo', component:PeopleInfoPage},
    {path:'/Admin', component:AdminPage},
    {path:'/admin/adminreview', component:AdminReviewPage},
    {path:'/admin/adminuser', component:AdminUserPage},
    {path:'/genre', component:GenrePage},
    {path:'/myreview', component:MyReviewPage},
    {path:'/userprofile', component:UserProfilePage},
    {path:'/reviewone', component:ReviewOnePage},
    {path:'/recommend', component:RecommendPage}
];


const router = createRouter({
    history : createWebHistory('/TEST201'),
    routes : routes,
})


router.beforeEach( async (to, from, next) => {
    sessionStorage.setItem("query",JSON.stringify(from.query))
    sessionStorage.setItem("toquery",JSON.stringify(to.query))
    sessionStorage.setItem("to",to.path)
    
    if(to.path === '/contentapiauto' && from.path === '/content'){
        next({name:'main'});
    }
    
    if(from.path !== '/login' ){
        sessionStorage.setItem("from",from.path)
    }
    if(from.path === '/findid'
        || from.path === '/findpw'
        || from.path === '/callback'
        || from.path === '/callback_kakao'
        || from.path === '/join'
    ){
        sessionStorage.setItem("from",'/main')
    }

    if(to.path === '/mypage' 
        || to.path === '/like' 
        || to.path === '/later' 
        || to.path === '/myreview' 
        || to.path === '/admin' 
        || to.path === '/service' 
        || to.path === '/contentU'
        || to.path === '/questionone'
    ){
        sessionStorage.setItem("to",'/main')
    }

    if(to.path === '/login' && sessionStorage.getItem("token") !== null){
        router.push({path:sessionStorage.getItem("from"),query:JSON.parse(sessionStorage.getItem("query"))})
    }
    else{
        next()
    }
});


export default router;