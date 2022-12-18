<template>
    <div style="margin:0 auto 0 auto">
      <div class="scene">
        <div class="box">
          <div class="box__face box__face--front">
            <router-link to="/main">
              <img :src="img" />
            </router-link>
          </div>
          <div class="box__face box__face--left"></div>
          <div class="box__face box__face--right"></div>
        </div>
      </div>
      <p class="text">모든 우주의 모든 OTT 여기 모여있다</p>
      
    </div>
  </template>
  
  <script>
import { onMounted} from 'vue';

  export default {
    data : ()=>({
        img : require('../assets/logo.png')
      }),
  
    setup () {

      onMounted(()=>{
        window.scrollBy(0,-5000)
      })
  
      return {

      }
    }
  }
  </script>
  
  <style lang="scss">
    .scene {
      margin: 5% auto 0 auto;
        width: 300px;
        height: 400px;
        perspective: 500px;
      }
      
      .box:hover {
        position: relative;
        transform: scale(0.9);
        transform-style: preserve-3d;
        transform: translate(0,0,-50px) rotate3d(0,0,0);
        animation: rotation 3s forwards;
      }

      .box__face {
        position: absolute;
        justify-content: center;
        align-items: center;
        font-size: 1.5em;
        opacity: 0;
        
        &--front {
          top: 2px;
          opacity: 1;
          width: 297px;
          height: 455px;
          transform: rotateY(0deg) translateZ(50px);
        }
        &--left {
          opacity: 1;
          top: 0;
          left: 100px;
          width: 100px;
          height: 455px;
          background: royalblue;
          transform: rotateY(-90deg) translateZ(150px);
        }
        &--right{
          opacity: 1;
          top: 0; 
        }
      }

      html {
        height: 100%;
      }
      h1 {
        margin-bottom: 30px;
      }

      @keyframes rotation {
        100% {
          transform: translateZ(-50px) rotate3d(0,1,0,30deg);
        }
      }
    .text{
      font-weight:bold;
      font-size: 25px;
      color:azure; 
      text-align: center;
      margin-top: 10%; 
    }
  </style>