<template>
    <div class="container">
        <h1>관리자 페이지</h1>
        <div>
            <v-btn @click="state.menu = 1" style="background-color:rgba(0, 0, 0, 0.4);color:white; margin-left:5px; border-radius:10px">유저관리</v-btn>
            <v-btn @click="state.menu = 2" style="background-color:rgba(0, 0, 0, 0.4);color:white; margin-left:5px; border-radius:10px">리뷰관리</v-btn>
            <v-btn @click="state.menu = 3" style="background-color:rgba(0, 0, 0, 0.4);color:white; margin-left:5px; border-radius:10px">컨텐츠 수정요청</v-btn>
        </div>
        <br /><hr />
        <div style="margin-top:10px">
            <menu-1 v-if="state.menu === 1" title="유저관리" ></menu-1>
            <menu-2 v-if="state.menu === 2" title="리뷰관리"></menu-2>
            <menu-3 v-if="state.menu === 3" title="컨텐츠 수정요청"></menu-3>
        </div>
           
    </div>
    <div @click="scrollToTop()" :class="['back-to-top-btn', {'go-top': isTop}]">
        <p style="font-size:35px; transform: translate(0px, -5px); ">▲</p> 
    </div> 
</template>

<script>
import Menu1 from './admin/AdminUserPage.vue';
import Menu2 from './admin/AdminReviewPage.vue';
import Menu3 from './admin/AdminContentPage.vue';

import { computed, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    components : {
        Menu1,
        Menu2,
        Menu3,
    },
    mounted(){
        const that = this
        window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY
            if(scrollPos >= 100){
                that.isTop = true
            } else {
                that.isTop = false
            }
        })
    },

    setup () {
        const router = useRouter();
        const store = useStore();
        const state = reactive({
            token   : sessionStorage.getItem("token"),
            role    : computed(()=>store.getters.getRole),
            menu    : 1,
            isTop   : false
        })

        onMounted(()=>{
            if(state.role !== "ADMIN"){
                router.push({path:"/main"})
                alert("접근불가 페이지입니다.")
            }
        })

        const scrollToTop = async() =>{
            window.scrollTo(0, 0);
        }


        return {
            ...toRefs(state),
            state,
            scrollToTop
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        background-color: rgba(255, 255, 255, 0.6);
        padding:50px;
        border-radius: 10px;
        text-align: center;
    }
    .back-to-top-btn {
        position:fixed;
        cursor: pointer;
        z-index: 9;
        right: 20px;
        color: royalblue;
        background-color: azure;
        width: 50px;
        height: 50px;
        opacity: 0;
        visibility: hidden;
        border-radius: 50%;
        transition: .6s;
        overflow: hidden;
        text-align: center;
    
        &.go-top {
            opacity: 1;
            visibility: visible;
            bottom: 50px;
        }
        &:hover {
            background-color: royalblue;
            color: azure;
            transition: .6s;
            box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
            transform: translateY(-5px);
        }
    }
</style>