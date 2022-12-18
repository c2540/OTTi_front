import { createStore} from 'vuex';

export default createStore({
    state() {
        let tmp = false;
        if(sessionStorage.getItem("token") !== null){
            tmp = true;
        }
        return {
            logged  : tmp,
            role : sessionStorage.getItem("role"),
            counter : 1,
            token : sessionStorage.getItem("token"),
            userid : sessionStorage.getItem("userid"),
            nickname : sessionStorage.getItem("nickname"),
            imageno : sessionStorage.getItem("imageno"),
            social : sessionStorage.getItem("social"),
        }
    },

    getters : {
        getLogged : state => {
            return state.logged;
        },
        getRole : state => {
            return state.role;
        },
        getCounter : state => {
            return state.counter;
        },
        getToken : state => {
            return state.token;
        },
        getUserid : state => {
            return state.userid;
        },
        getNickname : state => {
            return state.nickname;
        },
        getImageno : state => {
            return state.imageno;
        },
        getSocial : state => {
            return state.social;
        },
        

    },

    mutations:{
        setLogged(state, value){
            state.logged = value;
        },
        setRole(state, value){
            state.role = value;
        },
        setCounter(state) {
            state.counter++;
        },
        setToken(state, value) {
            state.token = value;
        },
        setUserid(state, value) {
            state.userid = value;
        },
        setNickname(state, value) {
            state.nickname = value;
        },
        setImageno(state, value) {
            state.imageno = value;
        },
        setSocial(state, value) {
            state.social = value;
        },
    },

    actions:{ 
        // 벡엔드 연동 시간이 필요한 작업들..
        // 토큰을 이용해서 토큰이 유효한지 확인
    }
});