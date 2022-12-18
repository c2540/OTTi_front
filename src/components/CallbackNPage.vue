<template>
    <div v-if="state.token">
        {{state}}<br>
        <h3>콜백 화면</h3>
    </div>
    <div style="height:500px;">
    </div>
</template>

<script>

import axios from 'axios'
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {
        const { proxy } = getCurrentInstance();

        const store = useStore();
        const router = useRouter();
        const state = reactive({
            query : window.location.search,
            id : "NorOMfFixWqv2LMj8T2X",
            secret : "PY684GXakz",
            token : null,
            data : null,
        })

        onMounted(async()=>{
            naverlogin()
        })

        const naverlogin = async() => {
            const url = `${proxy.foo}/naver/oauth2.0${state.query}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            if(data.status === 200){
                if(data.result === "banned user"){
                    alert("차단된 유저입니다.")
                    router.push({path:'/login'})
                }
                else{
                    sessionStorage.setItem("token",data.result)
                    sessionStorage.setItem("role",data.role)
                    sessionStorage.setItem("imageno",data.imageno)
                    sessionStorage.setItem("userid",data.userid)
                    sessionStorage.setItem("nickname",data.nickname)
                    sessionStorage.setItem("social",data.social)

                    store.commit("setLogged",true)
                    store.commit("setRole",data.role)
                    store.commit("setToken",data.result)
                    store.commit("setUserid",data.userid)
                    store.commit("setNickname",data.nickname)
                    store.commit("setImageno",data.imageno)
                    store.commit("setSocial",data.social)
                    router.push({path:'/main'})
                }
            }
        }

        return {
            ...toRefs(state),state
        }
    }
}
</script>

<style lang="scss" scoped>

</style>