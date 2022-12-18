<template>
  <div>
    <div style="padding:10px 10px; min-width: 1200px; " id="overlay" >
      <div>
        <div class="btn ; router" v-if="state.logged">
          <v-menu v-model="menu" :close-on-content-click="false" location="end">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" style="background-color: rgba(255, 255, 255, 0);">
                <div v-if="state.imageno.length === 0">
                  <img :src = "require('@/assets/no.png')" style="width:40px; height:40px ; border-radius:50% ; border:1px solid gray" />
                </div>
                <div v-else>
                    <img :src = "`${state.foo}/member/image?no=${state.imageno}`" style="width:40px; height:40px ; border-radius:50% ; border:1px solid gray" /> 
                    </div> 
                    <span style="margin-left:5px;">환영합니다 {{state.nickname}}님</span>
                </v-btn>
              </template>
              <v-card width="200" style="background-color: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); padding:15px; border-radius:10px; text-align:center">
                    <div v-if="state.imageno.length === 0">
                      <img :src = "require('@/assets/no.png')" style="width:100px; height:120px ; border-radius:10px ; border:1px solid gray" />
                    </div>
                    <div v-else>
                     <img :src = "`${state.foo}/member/image?no=${state.imageno}`" style="width:100px; height:100px ; border-radius:10px ; border:1px solid gray" /> 
                    </div> 
                    <span style="font-weight:bold; color:white; background-color: rgba(0, 0, 0, 0.5);border-radius:10px;padding:5px;">{{state.nickname}}</span> 
                <div style="margin-top:5px;text-align: center;">
                  <span @click="profile()" style="text-decoration:none;color:black; cursor:pointer;background-color: rgba(255, 255, 255, 0.3); display:inline-block; border:1px solid gray; border-radius:12px;height:24px;width:100%;margin-top:5px;">내 프로필</span>
                  <router-link to="/mypage" @click="warp" style="text-decoration:none;color:black;background-color: rgba(255, 255, 255, 0.3); display:inline-block;border:1px solid gray; border-radius:12px;height:24px;width:100%;margin-top:5px">마이 페이지</router-link><br />
                  <router-link to="/like" @click="warp" style="text-decoration:none;color:black;background-color: rgba(255, 255, 255, 0.3); display:inline-block;border:1px solid gray; border-radius:12px;height:24px;width:100%;margin-top:5px">좋아요 모아보기</router-link><br />
                  <router-link to="/later" @click="warp" style="text-decoration:none;color:black;background-color: rgba(255, 255, 255, 0.3); display:inline-block;border:1px solid gray; border-radius:12px;height:24px;width:100%;margin-top:5px">찜한 작품보기</router-link><br />
                  <router-link to="/myreview" @click="warp" style="text-decoration:none;color:black;background-color: rgba(255, 255, 255, 0.3); display:inline-block;border:1px solid gray; border-radius:12px;height:24px;width:100%;margin-top:5px">내가 쓴 리뷰</router-link>
                </div>
                  <v-btn text @click="menu = false" style="margin-top:10px;width:100%; background-color: rgba(0, 0, 0, 0.3); color:white">
                    닫기
                  </v-btn>
              </v-card>
            </v-menu>
          </div>
        </div>
           
        <router-link to="/main" class="logo" @click="warp">
          <img :src="require('@/assets/logofull_D_min.png')" alt="메인으로" style="width:30%">
        </router-link>
        <v-btn @click="warp(),logout()" variant="outlined" class="btn router" v-if="state.logged">로그아웃</v-btn>
        <router-link to="/service" class="router"><v-btn @click="warp" variant="outlined" class="btn">고객센터</v-btn></router-link>
        <router-link to="/join" class="router" v-if="!state.logged"><v-btn @click="warp" variant="outlined" class="btn">회원가입</v-btn></router-link>
        <router-link to="/login" class="router" v-if="!state.logged"><v-btn @click="warp" variant="outlined" class="btn">로그인</v-btn></router-link>
        <!-- <v-btn @click="warp(),page()" variant="outlined" class="routerbtn">인물</v-btn> -->
        <v-btn @click="warp(),routermovie()" variant="outlined" class="routerbtn" >컨텐츠</v-btn>
        <router-link to="/search" class="router"><v-btn @click="warp" variant="outlined" class="btn">검색</v-btn></router-link>
        <router-link to="/recommend" class="router"><v-btn @click="warp" variant="outlined" class="btn">추천</v-btn></router-link>
        <router-link to="/admin" class="router" v-if="state.role === 'ADMIN' "><v-btn rounded variant="outlined" class="btn">관리자페이지</v-btn></router-link>
      </div>
    <div style="padding:10px 200px; min-width: 1200px;" id="overlay">
            <router-view :key="$route.fullPath"></router-view>
          </div>
    <canvas id="pixi-canvas">  
    </canvas>
  </div>
  <footer style="height:120px; width: 100%; text-align: center; line-height : 120px;" >
    <div id="overlayF">
      <div>
          <div class="foottext">
            <span style="font-weight:bold">Developed by </span>
            <span>신세계 서욱진 최형록 김정환</span>
          </div>  
            <img :src="img1" style="width:100%;" class="footimg" />
            <!-- <img v-if="!state.logged" :src="img" style="width:100%;" class="footimg" /> -->
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import * as PIXI from "pixi.js";
import { onMounted} from "@vue/runtime-core";
import { useRouter } from 'vue-router';
  
  export default {
    data : ()=>({
      img : require('./assets/imgs/footermoon.png'),
      img1 : require('./assets/imgs/footerearth.png'),
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }),

    setup() {
      const router = useRouter();
      const store = useStore();
      const state = reactive({
        logged  : computed(() => store.getters.getLogged),
        role  : computed(() => store.getters.getRole),
        token : computed(() => store.getters.getToken),
        userid : computed(() => store.getters.getUserid),
        nickname : computed(() => store.getters.getNickname),
        imageno : computed(() => store.getters.getImageno),
        social : computed(() => store.getters.getSocial),
        foo : "/TEST201",
        height:0,
        width:0,
      })
      
      

      const page = () => {
        router.push({path:"/people", query:{page:1}});
      }
      const profile = () => {
        router.push({path:"/userprofile", query:{id:state.userid}});
      }

      const routermovie = () => {
        router.push({path:"/contentfind", query:{page:1,type:"tv",provider:1,genre:1,sort:"release_date.desc"}});
      }

      //star warp
      const starAmount = 1000;
      let cameraZ = 0;
      const fov = 15;
      const baseSpeed = 0.025;
      let speed = 0;
      let warpSpeed = 0;
      const starStretch = 6;
      const starBaseSize = 0.05;



      onMounted(() => {
        const app = createPixiApp();
        draw(app);
      });

      const createPixiApp = () => {
        var canvas = document.getElementById("pixi-canvas");
        // 그려지는 원본에 맞춰 창크기로 출력함 수정할 수 없음  2022-11-11 resizeHandler추가 창 크기변화감시 추가
        const app = new PIXI.Application({
          width: window.innerWidth,
          height: window.innerHeight,
          view: canvas,
        });
  
        return app;
      };
      
      const warp = async() => {
        
        warpSpeed = warpSpeed > 0 ? 0 : 1;
        setTimeout(function() {
          warpSpeed=0
        }, 5000);
        
      };
  
      const draw = (app) => {
        const starTexture = PIXI.Texture.from(require("./assets/imgs/star.png"));
          // 별생성
            const stars = [];
            for (let i = 0; i < starAmount; i++) {
                const star = {
                    sprite: new PIXI.Sprite(starTexture),
                    z: 0,
                    x: 0,
                    y: 0,
                };
                star.sprite.anchor.x = 0.5;
                star.sprite.anchor.y = 0.7;
                randomizeStar(star, true);
                app.stage.addChild(star.sprite);
                stars.push(star);
            }
            // 무작위배치
            function randomizeStar(star, initial) {
            star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;
              const deg = Math.random() * Math.PI * 2;
              const distance = Math.random() * 50 + 1;
              star.x = Math.cos(deg) * distance;
              star.y = Math.sin(deg) * distance;
            }

            
            app.ticker.add((delta) => {
                
                speed += (warpSpeed - speed) / 20;
                cameraZ += delta * 10 * (speed + baseSpeed);
                for (let i = 0; i < starAmount; i++) {
                    const star = stars[i];
                    if (star.z < cameraZ) randomizeStar(star);

                    
                    const z = star.z - cameraZ;
                    star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
                    star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

                    
                    const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
                    const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
                    const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
                    const distanceScale = Math.max(0, (2000 - z) / 2000);
                    star.sprite.scale.x = distanceScale * starBaseSize;
                    
                    star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
                    star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
                }
            });
        };

      const logout = () => {
        if(confirm('로그아웃 하시겠습니까?')){
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("role");
          sessionStorage.removeItem("userid");
          sessionStorage.removeItem("imageno");
          sessionStorage.removeItem("nickname");
          sessionStorage.removeItem("social");
          store.commit('setLogged', false);
          store.commit('setRole', null);
          store.commit('setToken', null);
          store.commit('setUserid', null);
          store.commit('setImageno', null);
          store.commit('setNickname', null);
          store.commit('setSocial', null);
          router.push({path:sessionStorage.getItem('to'),query:JSON.parse(sessionStorage.getItem('toquery'))});
        }
      }
  
      return {
        state,
        warp,
        draw,
        logout,
        page,
        routermovie,
        profile
      };
    },
  };


</script>

<style lang="css" scoped>
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
}
#pixi-canvas { position:fixed; top:0; left:0; z-index:-1; min-width: 100%; min-height: 100%;}
#overlay     { position:relative; top:0; z-index:1; margin-top: 10px; padding-bottom: 99999px; }
#overlayF    { position:relative; width: 100%; bottom: 0; z-index:1; margin-top: 25%;}
.footimg{
  position:absolute;
  left:0;
  bottom:0;
  width: 100%;
}
.foottext{
  position:relative;
  bottom:35%; 
  z-index:1;
  color: azure;
}
@media(max-width:1000px) { .foottext {bottom:80px} }
@media (min-width:1000px) and (max-width:1700px) { .foottext {bottom:160px} }
.logo{
    color:azure;
    font-weight:bold;
    font-size: 30px; 
    text-decoration: none;
    padding:0 10px;
    border-radius: 100px;
    margin:20px 0;
    display: inline-block;
  }
  .router{
    text-decoration: none;
    float: right;
  }
  .btn{
    margin-right:4px;
    border: none;
    color: white;
  }

  .routerbtn{
    margin-right:4px;
    border: none;
    color: white;
    text-decoration: none;
    float: right;
  }
</style>