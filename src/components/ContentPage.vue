<template> 
    <div v-if="!state.data"
        style="text-align:center; color: azure; margin: 30% auto auto auto; font-weight:bold; font-size: 20px; ">
            <img :src="require('@/assets/imgs/loading.gif')" style="width:100px;" /><br /><br />
            <span>컨텐츠 정보를 불러오는 중입니다. 잠시만 기다려주세요.</span>
    </div>
    <div class="container" v-if="state.data" style="min-width:1100px">
        <div v-bind:style="{ backgroundImage: 'url(' +state.imgurl+state.data.result.backdrop_path+ ')' }" class="divdiv" >
            <div style="display:grid;grid-template-columns:2fr 6fr; background-color:rgba(0, 0, 0, 0.6);padding : 50px;border-radius: 10px;" >
                <div>
                    <div style="min-width:200px; max-width:300px; text-align: center; border-radius: 10px; background-color: darkslategray;">
                        <img :src= '`${state.imgurl}${state.data.result.poster_path}`' v-if="state.data.result.poster_path" style="width:100%;border-radius: 10px 10px 0 0;" />
                        <img :src = "require('@/assets/noposter.png')" v-if="!state.data.result.poster_path" @click="content(tmp.id,tmp.media_type)" style="width:100%; border-radius:10px 10px 0 0;" /><br />
                        <div v-if="state.data.provider.length">
                            <div v-for="tmp of state.data.provider" :key="tmp" style="display:inline-block; margin:2px;">
                                <a href="https://www.netflix.com/kr" target="_blank"><img :src="require(`@/assets/logo/${tmp.logo_path}`)" v-if="tmp.id===8" style="width:50px; border:1px solid gray; border-radius: 5px;" /></a>
                                <a href="https://watcha.com/ko-KR" target="_blank"><img :src="require(`@/assets/logo/${tmp.logo_path}`)" v-if="tmp.id===97" style="width:50px; border:1px solid gray; border-radius: 5px;" /></a>
                                <a href="https://www.primevideo.com" target="_blank"><img :src="require(`@/assets/logo/${tmp.logo_path}`)" v-if="tmp.id===119" style="width:50px; border:1px solid gray; border-radius: 5px;" /></a>
                                <a href="https://www.disneyplus.com/ko-kr" target="_blank"><img :src="require(`@/assets/logo/${tmp.logo_path}`)" v-if="tmp.id===337" style="width:50px; border:1px solid gray; border-radius: 5px;" /></a>
                                <a href="https://www.apple.com/kr/apple-tv-plus/" target="_blank"><img :src="require(`@/assets/logo/${tmp.logo_path}`)" v-if="tmp.id===350" style="width:50px; border:1px solid gray; border-radius: 5px;" /></a>
                                <a href="https://www.wavve.com/" target="_blank"><img :src="require(`@/assets/logo/${tmp.logo_path}`)" v-if="tmp.id===356" style="width:50px; border:1px solid gray; border-radius: 5px;" /></a>
                                <a href="https://www.tving.com/" target="_blank"><img :src="require(`@/assets/logo/${tmp.logo_path}`)" v-if="tmp.id===3897" style="width:50px; border:1px solid gray; border-radius: 5px;" /></a>
                            </div>
                        </div>
                        <div style="border-top:1px solid gray; margin:0 10px;display:grid;grid-template-columns: 1fr 1fr">
                            <div>
                                <input type="button" value="♡ 좋아요" v-if="state.type_like === 0" @click="likeinsert()" style="margin:10px 0;width:95%;display:inline-block;border-radius: 5px;background-color: rgba(0, 0, 0, 0.35); color: white;height:30px;">
                                <input type="button" value="♥ 좋아요" v-if="state.type_like === 1" @click="likeinsert()" style="margin:10px 0;width:95%;display:inline-block;border-radius: 5px;background-color: rgba(0, 0, 0, 0.35); color: white;height:30px;">
                            </div>
                            <div>
                                <input type="button" value="☆ 찜" v-if="state.type_later === 0" @click="laterinsert()" style="margin:10px 0; width:95%;display:inline-block;border-radius: 5px;background-color: rgba(0, 0, 0, 0.35); color: white;height:30px;">
                                <input type="button" value="★ 찜" v-if="state.type_later === 1" @click="laterinsert()" style="margin:10px 0; width:95%;display:inline-block;border-radius: 5px;background-color: rgba(0, 0, 0, 0.35); color: white;height:30px;">
                            </div>
                        </div>  
                    </div>
                </div>
                <div style="color:white;margin-left:10px">
                    <h1>{{state.data.result.title}}{{state.data.result.name}}</h1>
                    <span v-for="tmp of state.data.genre" :key="tmp" @click="genrepick(tmp.id)" style="background-color:rgba(255, 255, 255, 0.4); padding:5px; border-radius:5px; margin:10px 3px; cursor:pointer;">{{tmp.name}}</span><br /><br />
                    <p v-if="state.data.result.runtime"><span style="font-weight:bold">런타임</span> / {{state.data.result.runtime}}분</p>
                    <p v-if="state.data.result.episode_run_time"><span style="font-weight:bold">런타임</span> / {{state.data.result.episode_run_time}}분</p>
                    <p v-if="state.data.result.release_date"><span style="font-weight:bold">공개일</span> / {{state.data.result.release_date}}</p>
                    <p v-if="state.data.result.first_air_date"><span style="font-weight:bold">첫 방영일</span> / {{state.data.result.first_air_date}}</p>
                    <p v-if="state.data.result.number_of_seasons"><span style="font-weight:bold">시즌 수</span> / {{state.data.result.number_of_seasons}}</p>
                    <p v-if="state.data.result.number_of_episodes"><span style="font-weight:bold">에피소드 수</span> / {{state.data.result.number_of_episodes}}</p>
                    <br /><p>{{state.data.result.overview}}</p>
                    <br />
                    <h3>평점</h3>
                    <span>
                        <img :src="require('@/assets/logofull_D_min.png')" style="height:20px;" />
                        <span v-if="state.avg != 0" style="margin-left:8px;">
                            <span style="font-size:22px">{{state.avg}}</span>/10
                        </span>
                        <span v-if="state.avg === 0" style="margin-left:8px;">
                            아직 평가한 사람이 없습니다. 평점을 매겨주세요.
                        </span>
                    </span>
                    <p>
                        <img :src="require('@/assets/tmdb.png')" style="width:50px;" />
                        <span style="margin-left:8px;"><span style="font-size:22px">{{state.data.result.vote_average}}</span>/10</span>
                    </p>
                    <v-col cols="auto" v-if="state.data.result.trailer != null" style="display:inline-block">
                        <v-dialog transition="dialog-top-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn style="background-color:rgba(0, 0, 0, 0.6); backdrop-filter: blur(10px);" v-bind="props">▶트레일러 보기</v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <v-card style="background-color:rgba(255, 255, 255, 0.3); padding:10px; backdrop-filter: blur(10px); border-radius: 10px; margin-left:auto; margin-right:auto;" class="scroll">
                                    <v-card-text>
                                        <iframe style="border-radius:10px" width="1200px" height="600px"  :src="`https://www.youtube.com/embed/${state.data.result.trailer}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                        </iframe>
                                    </v-card-text>
                                    <v-card-actions class="justify-end" style="text-align:center">
                                        <v-btn variant="text" @click="isActive.value = false" style="width:80%;text-align:center;background-color:rgba(0, 0, 0, 0.3);color:white;margin:0 10%;">닫기</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-col>
                    <v-col cols="auto" v-if="state.data.result.youtubereview != null" style="display:inline-block;">
                        <v-dialog transition="dialog-top-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn style="background-color:rgba(0, 0, 0, 0.6); backdrop-filter: blur(10px);" v-bind="props">▶유튜버 리뷰 보기</v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <v-card style="background-color:rgba(255, 255, 255, 0.3); padding:10px; backdrop-filter: blur(10px); border-radius: 10px; margin-left:auto; margin-right:auto;" class="scroll">
                                    <v-card-text>
                                        <iframe style="border-radius:10px" width="1200px" height="600px" :src="`https://www.youtube.com/embed/${state.data.result.youtubereview}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                        </iframe>
                                    </v-card-text>
                                    <v-card-actions class="justify-end" style="text-align:center">
                                        <v-btn variant="text" @click="isActive.value = false" style="width:80%;text-align:center;background-color:rgba(0, 0, 0, 0.3);color:white;margin:0 10%;">닫기</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-col>
                </div>    
            </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr">
            <div style="background-color:rgba(0, 0, 0, 0.3); border-radius:10px; margin-top:10px; text-align: center;padding-top: 5px;display: inline-block;color:white;">
            <h2 style="border-bottom: 1px solid gray;margin:0 10px;">배우</h2>
                <div style="overflow-y: scroll; height:220px; padding:10px; border-radius: 0 0 10px 10px;" class="scroll">
                    <div v-if="state.re===0" style="text-align:center;margin-top: 50px;">
                        <img :src="require('@/assets/imgs/loading.gif')" style="width:100px;" /><br /><br />
                    </div>
                    <div v-for="tmp of state.credit.cast" :key="tmp" @click="people(tmp.id)" style="display:inline-block;cursor:pointer">    
                        <div v-if="tmp.profile_path" style="display:inline-block; width:120px;" class="divp">
                            <img :src='`https://image.tmdb.org/t/p/w500${tmp.profile_path}`' style="width:100px; border-radius: 10px" /><br />
                            <p style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;color:white">{{tmp.name}}</p>
                        </div>
                    </div>
                </div>
                <div style="height:10px"></div>
            </div>
            <div style="background-color:rgba(1, 1, 1, 0.3); border-radius:10px; margin-top:10px; margin-left: 10px; text-align: center;padding-top: 5px;display: inline-block;color:white">
                <h2 style="border-bottom: 1px solid gray;margin:0 10px;">제작진</h2>
                <div style="overflow-y: scroll; height:220px; padding:10px; border-radius: 0 0 10px 10px;" class="scroll">
                    <div v-if="state.re===0" style="text-align:center; margin-top: 50px;">
                        <img :src="require('@/assets/imgs/loading.gif')" style="width:100px;" /><br /><br />
                    </div>
                    <div v-for="tmp of state.credit.crew" :key="tmp" @click="people(tmp.id)" style="display:inline-block;cursor:pointer;">    
                        <div v-if="tmp.profile_path" style="display:inline-block; width:120px;" class="divp">
                            <img :src='`https://image.tmdb.org/t/p/w500${tmp.profile_path}`' style="width:100px; border-radius: 10px" /><br />
                            <p v-if="tmp.department === 'Directing'">감독</p>
                            <p v-if="tmp.department === 'Production'">제작</p>
                            <p v-if="tmp.department === 'Writing'">극본</p>
                            <p v-if="tmp.department === 'Art'">미술감독</p>
                            <p v-if="tmp.department === 'Camera'">카메라감독</p>
                            <p v-if="tmp.department === 'Sound'">음향감독</p>
                            <p v-if="tmp.department === 'Costume & Make-Up'">의상&메이크업</p>
                            <p v-if="tmp.department === 'Crew'">스태프</p>
                            <p v-if="tmp.department === 'Editing'">편집</p>
                            <p v-if="tmp.department === 'Visual Effects'">CG감독</p>
                            <p style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{tmp.name}}</p>
                        </div>
                    </div>
                </div>
                <div style="height:10px"></div>
            </div>
        </div>

        <div  style="background-color:rgba(0, 0, 0, 0.3); border-radius:10px;color:white;margin-top: 10px;padding:10px">
            <div>
                <h2 style="display:inline-block;margin-right:5px;display: inline-block;">리뷰 목록</h2>
                <div style="display: inline-block;">
                    <span v-if="state.sort==='likes'" @click="OneSelect(2)" style="font-weight:bold;cursor:pointer; margin-right:5px; font-size:small">추천순</span>
                    <span v-else @click="OneSelect(2)" style="cursor:pointer; margin-right:5px; font-size:small">추천순</span>
                    <span v-if="state.sort==='new'" @click="OneSelect(1)" style="font-weight:bold; cursor:pointer; font-size:small">최신순</span>
                    <span v-else @click="OneSelect(1)" style="cursor:pointer;font-size:small;">최신순</span>
                </div>

                <div v-if="state.data1" style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr 1fr;">
                    <div v-for="tmp of state.data1" :key="tmp" style="display:inline-block; background-color:rgba(0, 0, 0, 0.3);border-radius:10px;padding:10px;margin:3px;">
                        <div @click="userprofile(tmp.member.userid)" style="background-color:rgba(0, 0, 0, 0.3);border-radius:10px;padding:10px;cursor:pointer">
                            <img :src = "require('@/assets/no.png')" v-if="tmp.no === null || tmp.member.delete === 1" @click="userprofile(tmp.member.userid)" style="width:50px; height:50px; border-radius:10px;vertical-align:middle;" />
                            <img :src = "`${state.foo}/member/image?no=${tmp.no.no}`" v-else @click="userprofile(tmp.member.userid)" style="width:50px; height:50px; border-radius:10px;vertical-align:middle;" />
                            <div style="display: inline-block;vertical-align: middle;">
                                <p v-if="tmp.member.delete === 0" style="margin-left:10px;font-weight: bold;font-size:18px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width:100px;">{{tmp.member.nickname}}</p>
                            </div>
                            <span v-if="tmp.member.delete === 1" style="margin-left:10px;font-weight: bold; font-size:15px;">탈퇴한 회원</span>
                        </div>
                        <div style="margin-top:5px" class="scroll">
                            <div>
                                <span style="font-weight:bold; margin-right:5px;">평점</span>
                                <img v-if="tmp.score===1" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                <img v-if="tmp.score>=2" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                <img v-if="tmp.score===3" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                <img v-if="tmp.score>=4" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                <img v-if="tmp.score===5" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                <img v-if="tmp.score>=6" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                <img v-if="tmp.score===7" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                <img v-if="tmp.score>=8" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                <img v-if="tmp.score===9" :src="require(`@/assets/star_half.png`)" style="width:16px" />
                                <img v-if="tmp.score===10" :src="require(`@/assets/star_full.png`)" style="width:16px" />
                                <img v-if="tmp.score<=2" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                <img v-if="tmp.score<=4" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                <img v-if="tmp.score<=6" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                                <img v-if="tmp.score<=8" :src="require(`@/assets/star_empty.png`)" style="width:16px" />
                            </div>
                            <span style="font-weight:bold; margin-right:5px;">등록일</span><span style="margin-bottom:5px;font-size:small">{{tmp.regdate}}</span>
                            <div style="margin-top:10px;">
                                <v-textarea v-if="state.type==='tv'" @click="reviewone(tmp.id, 'drama')"
                                    v-model="tmp.content"
                                    readonly="true"
                                    no-resize
                                    rows="3"
                                    style="cursor:pointer"
                                    class="scroll"
                                    >
                                </v-textarea>
                                <v-textarea v-if="state.type==='movie'" @click="reviewone(tmp.id, 'movie')"
                                    v-model="tmp.content"
                                    readonly="true"
                                    no-resize
                                    rows="3"
                                    style="cursor:pointer"
                                    class="scroll"
                                    >
                                </v-textarea>
                            </div>
                            <div>
                                <v-btn @click="reviewlike(tmp.id)" v-if="state.type==='tv'" class="btn" style="width:48%;">👍추천 {{tmp.likes}}</v-btn>
                                <v-btn @click="reviewlike(tmp.id)" v-if="state.type==='movie'" class="btn" style="width:48%;">👍추천 {{tmp.likes}}</v-btn>
                                <v-btn v-if="state.type==='movie'" @click="reviewone(tmp.id, 'movie')" class="btn" style="width:48%;margin-left: 4%;">💬댓글 {{tmp.reviewmoviecoment.length}}</v-btn>
                                <v-btn v-if="state.type==='tv'" @click="reviewone(tmp.id, 'drama')" class="btn" style="width:48%;margin-left: 4%;">💬댓글 {{tmp.reviewdramacoment.length}}</v-btn>
                            </div>
                        </div>
                    </div>
                </div>
                <v-pagination v-if="state.data1" v-model="state.reviewpage" :length="state.reviewpages" @click="reviewpage(state.reviewpage)"></v-pagination>
               
                <div v-if="!state.data1">
                    <br /><p>등록된 리뷰가 없습니다. 해당 작품의 첫 리뷰를 작성해보세요.</p><br />
                </div>
            </div>
            <hr /><br />
            <div v-if="state.data3 !== 'true'">
                <h2 style="display:inline-block;">리뷰 작성</h2>
                <div>
                    <h3 style="display:inline-block; margin-right:5px; margin-top:10px">평점</h3><br />
                    <button @click="scoreminus"><img :src="require(`@/assets/btn_minus.png`)" style="width:15px;margin-right:3px" /></button>
                    <div class="starpoint_wrap">
                        <div class="starpoint_box">
                            <label for="starpoint_1" class="label_star" title="1"><span class="blind">1점</span></label>
                            <label for="starpoint_2" class="label_star" title="2"><span class="blind">2점</span></label>
                            <label for="starpoint_3" class="label_star" title="3"><span class="blind">3점</span></label>
                            <label for="starpoint_4" class="label_star" title="4"><span class="blind">4점</span></label>
                            <label for="starpoint_5" class="label_star" title="5"><span class="blind">5점</span></label>
                            <label for="starpoint_6" class="label_star" title="6"><span class="blind">6점</span></label>
                            <label for="starpoint_7" class="label_star" title="7"><span class="blind">7점</span></label>
                            <label for="starpoint_8" class="label_star" title="8"><span class="blind">8점</span></label>
                            <label for="starpoint_9" class="label_star" title="9"><span class="blind">9점</span></label>
                            <label for="starpoint_10" class="label_star" title="10"><span class="blind">10점</span></label>
                            <input type="radio" name="starpoint" id="starpoint_1" class="star_radio" v-model="state.score2" value="1">
                            <input type="radio" name="starpoint" id="starpoint_2" class="star_radio" v-model="state.score2" value="2">
                            <input type="radio" name="starpoint" id="starpoint_3" class="star_radio" v-model="state.score2" value="3">
                            <input type="radio" name="starpoint" id="starpoint_4" class="star_radio" v-model="state.score2" value="4">
                            <input type="radio" name="starpoint" id="starpoint_5" class="star_radio" v-model="state.score2" value="5">
                            <input type="radio" name="starpoint" id="starpoint_6" class="star_radio" v-model="state.score2" value="6">
                            <input type="radio" name="starpoint" id="starpoint_7" class="star_radio" v-model="state.score2" value="7">
                            <input type="radio" name="starpoint" id="starpoint_8" class="star_radio" v-model="state.score2" value="8">
                            <input type="radio" name="starpoint" id="starpoint_9" class="star_radio" v-model="state.score2" value="9">
                            <input type="radio" name="starpoint" id="starpoint_10" class="star_radio" v-model="state.score2" value="10">
                            <span class="starpoint_bg"></span>
                        </div>
                    </div>
                    <button @click="scoreplus"><img :src="require(`@/assets/btn_plus.png`)" style="width:15px; margin-left:3px" /></button>
                    <span style="margin-left:5px;"><span style="font-size:24px;font-weight:bold">{{state.score2}}</span>/10</span>
                </div>
                <v-row>
                    <v-col cols="12" sm="12">
                        <h3 style="margin-top:10px">리뷰</h3>
                        <v-textarea v-if="state.logged === true" v-model="state.content"
                                    label="리뷰를 작성해주세요"
                                    rows="3"
                                    >
                        </v-textarea>
                        <v-textarea v-if="state.logged === false" v-model="state.content"
                                    label="로그인 후 이용할 수 있습니다"
                                    disabled
                                    rows="3"
                                    >
                        </v-textarea>
                    </v-col>
                </v-row>
                <div style="text-align:right">
                        <v-btn @click="reviewinsert" style="background-color:rgba(0, 0, 0, 0.3);border-radius:10px;width:150px">등록</v-btn>
                </div>  
            </div>
            <div v-else-if="state.reviewedit === 0">
                <h2>내 리뷰</h2>
                <h3 tyle="margin-top:10px">평점</h3>
                <div class="starpoint_wrap">
                    <div class="starpoint_box">
                        <label for="starpoint_1" class="label_star" title="0.5"><span class="blind">1점</span></label>
                        <label for="starpoint_2" class="label_star" title="1"><span class="blind">2점</span></label>
                        <label for="starpoint_3" class="label_star" title="1.5"><span class="blind">3점</span></label>
                        <label for="starpoint_4" class="label_star" title="2"><span class="blind">4점</span></label>
                        <label for="starpoint_5" class="label_star" title="2.5"><span class="blind">5점</span></label>
                        <label for="starpoint_6" class="label_star" title="3"><span class="blind">6점</span></label>
                        <label for="starpoint_7" class="label_star" title="3.5"><span class="blind">7점</span></label>
                        <label for="starpoint_8" class="label_star" title="4"><span class="blind">8점</span></label>
                        <label for="starpoint_9" class="label_star" title="4.5"><span class="blind">9점</span></label>
                        <label for="starpoint_10" class="label_star" title="5"><span class="blind">10점</span></label>
                        <input type="radio" name="starpoint" id="starpoint_1" class="star_radio1" v-model="state.score1" value="1" onclick="return(false);">
                        <input type="radio" name="starpoint" id="starpoint_2" class="star_radio1" v-model="state.score1" value="2" onclick="return(false);">
                        <input type="radio" name="starpoint" id="starpoint_3" class="star_radio1" v-model="state.score1" value="3" onclick="return(false);">
                        <input type="radio" name="starpoint" id="starpoint_4" class="star_radio1" v-model="state.score1" value="4" onclick="return(false);">
                        <input type="radio" name="starpoint" id="starpoint_5" class="star_radio1" v-model="state.score1" value="5" onclick="return(false);">
                        <input type="radio" name="starpoint" id="starpoint_6" class="star_radio1" v-model="state.score1" value="6" onclick="return(false);">
                        <input type="radio" name="starpoint" id="starpoint_7" class="star_radio1" v-model="state.score1" value="7" onclick="return(false);">
                        <input type="radio" name="starpoint" id="starpoint_8" class="star_radio1" v-model="state.score1" value="8" onclick="return(false);">
                        <input type="radio" name="starpoint" id="starpoint_9" class="star_radio1" v-model="state.score1" value="9" onclick="return(false);">
                        <input type="radio" name="starpoint" id="starpoint_10" class="star_radio1" v-model="state.score1" value="10" onclick="return(false);">
                        <span class="starpoint_bg"></span>
                    </div>
                </div>
                <span style="margin-left:5px;"><span style="font-size:24px;font-weight:bold">{{state.score1}}</span>/10</span>
                <h3 tyle="margin-top:20px">리뷰</h3>
                <v-textarea v-model="state.content1"
                                    label="리뷰 내용"
                                    rows="3"
                                    readonly
                                    style="width:100%;"
                                    >
                </v-textarea>
                <div>
                    <div style="display:inline-block;background-color: rgba(0, 0, 0, 0.3);border-radius:5px;padding: 5px">
                        <span>👍추천</span>
                        <span style="margin-left:5px;font-weight:bold">{{state.myreviewlikecnt}}</span>
                    </div>
                    <div v-if="state.type==='movie'" @click="reviewone(state.id, 'movie')" style="display:inline-block;background-color: rgba(0, 0, 0, 0.3);border-radius:5px;padding: 5px; margin-left:5px; cursor:pointer;">
                        <span>💬댓글</span>
                        <span style="margin-left:5px;cursor:pointer"><span style="font-weight:bold">{{state.myreviewcomentcnt}}</span></span>
                    </div>
                    <div v-if="state.type==='tv'" @click="reviewone(state.id, 'drama')" style="display:inline-block;background-color: rgba(0, 0, 0, 0.3);border-radius:5px;padding: 5px; margin-left:5px; cursor:pointer;">
                        <span>💬댓글</span>
                        <span style="margin-left:5px;cursor:pointer"><span style="font-weight:bold">{{state.myreviewcomentcnt}}</span></span>
                    </div>
                    <span v-if="state.type==='movie'" @click="reviewone(state.id, 'movie')" style="margin-left:5px;background-color: rgba(0, 0, 0, 0.3);border-radius:5px;padding: 8px;cursor:pointer">▷ 리뷰 상세페이지로 이동</span>
                    <span v-if="state.type==='tv'" @click="reviewone(state.id, 'drama')" style="margin-left:5px;background-color: rgba(0, 0, 0, 0.3);border-radius:5px;padding: 8px;cursor:pointer">▷ 리뷰 상세페이지로 이동</span>
                </div>
                <div style="text-align:right">
                    <v-btn @click="state.reviewedit = 1" style="background-color:rgba(0, 0, 0, 0.3); margin-top: 10px;">리뷰 수정</v-btn>
                    <v-btn @click="ReviewDelete(state.id)" style="background-color:rgba(0, 0, 0, 0.3); margin-left:10px; margin-top: 10px;">리뷰 삭제</v-btn>
                </div>
            </div>
            <div v-else-if="state.reviewedit === 1">
                <h2>리뷰 수정</h2>
                <h3 tyle="margin-top:10px">평점</h3>
                <button @click="scoreminus1"><img :src="require(`@/assets/btn_minus.png`)" style="width:15px; margin-right:3px" /></button>
                <div class="starpoint_wrap">
                    <div class="starpoint_box">
                        <label for="starpoint_1" class="label_star" title="1"><span class="blind">1점</span></label>
                        <label for="starpoint_2" class="label_star" title="2"><span class="blind">2점</span></label>
                        <label for="starpoint_3" class="label_star" title="3"><span class="blind">3점</span></label>
                        <label for="starpoint_4" class="label_star" title="4"><span class="blind">4점</span></label>
                        <label for="starpoint_5" class="label_star" title="5"><span class="blind">5점</span></label>
                        <label for="starpoint_6" class="label_star" title="6"><span class="blind">6점</span></label>
                        <label for="starpoint_7" class="label_star" title="7"><span class="blind">7점</span></label>
                        <label for="starpoint_8" class="label_star" title="8"><span class="blind">8점</span></label>
                        <label for="starpoint_9" class="label_star" title="9"><span class="blind">9점</span></label>
                        <label for="starpoint_10" class="label_star" title="10"><span class="blind">10점</span></label>
                        <input type="radio" name="starpoint" id="starpoint_1" class="star_radio" v-model="state.score1" value="1">
                        <input type="radio" name="starpoint" id="starpoint_2" class="star_radio" v-model="state.score1" value="2">
                        <input type="radio" name="starpoint" id="starpoint_3" class="star_radio" v-model="state.score1" value="3">
                        <input type="radio" name="starpoint" id="starpoint_4" class="star_radio" v-model="state.score1" value="4">
                        <input type="radio" name="starpoint" id="starpoint_5" class="star_radio" v-model="state.score1" value="5">
                        <input type="radio" name="starpoint" id="starpoint_6" class="star_radio" v-model="state.score1" value="6">
                        <input type="radio" name="starpoint" id="starpoint_7" class="star_radio" v-model="state.score1" value="7">
                        <input type="radio" name="starpoint" id="starpoint_8" class="star_radio" v-model="state.score1" value="8">
                        <input type="radio" name="starpoint" id="starpoint_9" class="star_radio" v-model="state.score1" value="9">
                        <input type="radio" name="starpoint" id="starpoint_10" class="star_radio" v-model="state.score1" value="10">
                        <span class="starpoint_bg"></span>
                    </div>
                </div>
                <button @click="scoreplus1"><img :src="require(`@/assets/btn_plus.png`)" style="width:15px; margin-left:3px" /></button>
                <span style="margin-left:5px;"><span style="font-size:24px;font-weight:bold">{{state.score1}}</span>/10</span>
                <h3 tyle="margin-top:10px">리뷰</h3>
                <v-textarea v-model="state.content1"
                    no-resize
                    rows="3"
                    style="width:100%;"
                    >
                </v-textarea>
                <div style="text-align:right">
                    <v-btn @click="ReviewUpdate()" style="background-color:rgba(0, 0, 0, 0.3);">수정하기</v-btn>
                    <v-btn @click="state.reviewedit = 0" style="background-color:rgba(0, 0, 0, 0.3);margin-left: 10px;">수정취소</v-btn>
                </div>
            </div>
        </div>
        <div v-if="state.data2.total_results !== 0" style="background-color:rgba(1, 1, 1, 0.3);border-radius:10px; padding:10px; margin-top:10px;">
            <div id="mainslider">
                <h2 style="text-align:center;color:white; border-bottom: 1px solid gray;padding-bottom:2px">이 작품과 유사한 작품</h2>
                <splide :options="options" v-if="state.data2.results">
                    <splide-slide @click="content(tmp.id, state.type)"  v-for="tmp of state.data2.results" :key="tmp">    
                        <div class="divp" style="cursor:pointer; margin:5px;border-radius: 10px;background-color:rgba(255, 255, 255, 0.2); display:inline-block; margin:10px; width:150px;backdrop-filter: blur(10px);">
                            <img :src= '`${state.imgurl}${tmp.poster_path}`' v-if="tmp.poster_path" @click="content(tmp.id,tmp.media_type)" style="height:225px;width:150px;border-radius: 10px 10px 0 0;" />
                            <img :src = "require('@/assets/noposter.png')" v-if="!tmp.poster_path" @click="content(tmp.id,tmp.media_type)" style="height:225px;width:150px; border-radius:10px 10px 0 0;" /><br />
                            <p style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap; font-weight:bold; text-align:center; color:white; padding:0 8px;">{{tmp.name}}{{tmp.title}}</p>
                            <p style="text-align:center; color:white">{{tmp.first_air_date}}{{tmp.release_date}}</p>
                        </div>
                        <div style="height:25px"></div>
                    </splide-slide>
                </splide>
            </div>
        </div>
        <div style="text-align:right; margin-top:10px">
            <v-btn @click="update()" style="background-color:rgba(0, 0, 0, 0.5); backdrop-filter: blur(10px); margin-left: 10px; color:white;border-radius: 10px;" >수정요청</v-btn>
        </div>
    </div>
    <!-- 맨위로 버튼 -->
    <div @click="scrollToTop()" :class="['back-to-top-btn', {'go-top': isTop}]">
        <p style="font-size:35px; transform: translate(0px, -5px); ">▲</p> 
    </div> 
</template>

<script>
import { computed, reactive } from '@vue/reactivity'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import '@/assets/css/score.css'
import "@/assets/css/totop.scss"
export default {
    name:"MainSlider",
    components: {
    Splide,
    SplideSlide,
    },
    data() {
      return {
        options: {
        perPage     : 7,
        perMove     : 1,
        wheel       : true,
        autoplay    : true,
        },
      };
    },
    setup () {
        const { proxy } = getCurrentInstance();
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            logged  : computed(() => store.getters.getLogged),
            token : sessionStorage.getItem("token"),
            no : Number(route.query.no),
            type : String(route.query.type),
            data : "",
            data1 : "",
            data2 : "",
            data3 : "",
            data4 : "",
            imgurl : "https://image.tmdb.org/t/p/w500",
            videourl : "https://www.youtube.com/embed",
            logourl : "https://www.themoviedb.org/t/p/original/",
            type_like : 0,
            type_later : 0,
            credit : "",
            content:"",
            content1:"",
            score:"",
            score1:"",
            score2:10,
            avg:"",
            id:"",
            page : 1,
            pages : 1,
            reviewedit : 0,
            myreviewlikecnt : 0,
            myreviewcomentcnt: 0,
            reviewpage : 1,
            reviewpages : 1,
            sort : 'likes',
            foo : proxy.foo,
            isTop   : false,
            re : 0,
        })

        
        onMounted(()=>{
            window.scrollTo(0,0)
            window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY
                if(scrollPos >= 100){
                    state.isTop = true
                } else {
                    state.isTop = false
                }
            });
            handledata();
            OneSelect(2);
            ReviewChk();
        })

        const scrollToTop = async() =>{
            window.scrollTo(0, 0);
        }
        
        const handledata = async() => {
            const url = `${proxy.foo}/DB/selectone.json?no=${state.no}&type=${state.type}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            if(data.status === 200){
                if(data.result.hit === 1){
                    window.location.reload();
                }
                state.data = data;
                if(state.logged === true ){ 
                    handleliketypeview();
                    handlelatertypeview();
                }
                handlecredit();
                similar();
            }
            else{
                // 아마존서버
                window.location.replace(`http://3.35.109.169:8080${proxy.foo}/contentapiauto?type=${route.query.type}&no=${route.query.no}`)
                // 학원서버
                // window.location.replace(`http://1.234.5.158:28080${proxy.foo}/contentapiauto?type=${route.query.type}&no=${route.query.no}`)
            }
        }

        const similar = async() => {
            const url = `${proxy.foo}/api/recommend.json?type=${state.type}&no=${state.no}`
            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data2 = data
        }

        const content = (no,type) => {
            router.push({path:"/content",query:{no:no,type:type}})
            state.no=no
            state.type=type
            handledata()
            OneSelect(2);
            ReviewChk();
            window.scrollBy(0,-50000)
        }

        const handleliketypeview = async() => {
            var url =""
            if(route.query.type === "movie"){
                url = `${proxy.foo}/content/movielikeview.json?id=${route.query.no}`
            }
            else{
                url = `${proxy.foo}/content/dramalikeview.json?id=${route.query.no}`
            }
                const headers = {"Content-Type":"application/json","TOKEN" : state.token}
                const {data} = await axios.get(url,{headers})
                state.type_like = data.type;
        }
        
        const handlelatertypeview = async() => {
            var url = ""
            if(route.query.type === "movie"){
                url = `${proxy.foo}/content/movielaterview.json?id=${route.query.no}`
            }
            else{
                url = `${proxy.foo}/content/dramalaterview.json?id=${route.query.no}`
            }
            const headers = {"Content-Type":"application/json","TOKEN" : state.token}
            const {data} = await axios.get(url,{headers})
            state.type_later = data.type;
        }

        const likeinsert = async() => {
            if(state.logged===true){
                var url = ""
                if(route.query.type === "movie"){
                    url = `${proxy.foo}/content/movielikeinsert.json?id=${route.query.no}&type=${state.type_like}`
                }
                else{
                    url = `${proxy.foo}/content/dramalikeinsert.json?id=${route.query.no}&type=${state.type_like}`
                }

                const headers = {"Content-Type":"application/json","TOKEN" : state.token}
                const body = {}
                const {data} = await axios.post(url,body,{headers})

                if(data.status===200){
                    handleliketypeview();
                }
            }
            else{
                alert("로그인이 필요한 서비스입니다.")
            }
        }

        const laterinsert = async() => {
            if(state.logged === true){
                var url =""
                if(route.query.type === "movie"){
                    url = `${proxy.foo}/content/movielaterinsert.json?id=${route.query.no}&type=${state.type_later}`
                }
                else{
                    url = `${proxy.foo}/content/dramalaterinsert.json?id=${route.query.no}&type=${state.type_later}`
                }
                const headers = {"Content-Type":"application/json","TOKEN" : state.token}
                const body = {}
                const {data} = await axios.post(url,body,{headers})
                if(data.status===200){
                    handlelatertypeview();
                }
            }
            else{
                alert("로그인이 필요한 서비스입니다.")
            }
            
        }

        const handlecredit = async() => {
            const url = `${proxy.foo}/api/credit.json?type=${route.query.type}&key=${route.query.no}`;
            const headers = {"Content-Type":"application/json"};
            const {data} = await axios.get(url,{headers})
            const koreanname = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
            if(data.cast.length <= 15){
                for(let i=0;i<data.cast.length;i++){
                    const url2 = `${proxy.foo}/api/peopleinfo.json?key=${data.cast[i].id}`
                    const response = await axios.get(url2,{headers})
                    for(let j=0;j<response.data.also_known_as.length;j++){
                        if(koreanname.test(response.data.also_known_as[j])){
                            data.cast[i].name = response.data.also_known_as[j];
                            break;
                        }
                    }
                }
            }
            if(data.crew.length <= 10){
                for(let i=0;i<data.crew.length;i++){
                    const url3 = `${proxy.foo}/api/peopleinfo.json?key=${data.crew[i].id}`
                    const response = await axios.get(url3,{headers})
                    for(let j=0;j<response.data.also_known_as.length;j++){
                        if(koreanname.test(response.data.also_known_as[j])){
                            data.crew[i].name = response.data.also_known_as[j];
                            break;
                        }
                    }
                }
            }
            state.re=1;
            state.credit = data;
        }

        const people = (id) => {
            router.push({path:'/peopleinfo',query:{id:id}})
        }

        const genrepick = (id) => {
            router.push({path:'/contentfind',query:{
                type:route.query.type,
                genre:id,
                page:1,
                provider:1,
                sort:'release_date.desc'
            }})
        }

        const reviewinsert = async() => {
            if(state.content === ""){
                alert("리뷰 내용이 없습니다. 리뷰를 작성해주세요.");
                return false;
            }
            if(state.logged === true){
                var url =""
                if(state.type === "tv"){
                    url = `${proxy.foo}/content/tvreview.json?no=${state.no}`;
                }
                else{
                    url = `${proxy.foo}/content/moviereview.json?no=${state.no}`
                }
                const headers = {"Content-Type":"application/json","TOKEN" : state.token};
                const body = {
                    content : state.content,
                    score : state.score2,
                }
                const response = await axios.post(url, body, {headers});
                if(response.data.status === 200){
                    alert("리뷰등록이 완료되었습니다.")
                    ReviewChk();
                    OneSelect(2);
                }
            }
            else{
                alert('로그인 후 이용해주세요.')
            }
        };

        const OneSelect = async(num) => {
            var url =""
            if(state.type === "tv"){
                url = `${proxy.foo}/content/dramareviewonelike.json?no=${state.no}&page=${state.reviewpage}&sort=${num}`
            }
            else if(state.type === "movie"){
                url = `${proxy.foo}/content/moviereviewonelike.json?no=${state.no}&page=${state.reviewpage}&sort=${num}`
            }

            const headers = {"Content-Type":"application/json"}
            const {data} = await axios.get(url,{headers})
            state.data1 = data.result
            if(isNaN(Math.round(data.avg*100)/100)===false){
                state.avg = Math.round(data.avg*100)/100
            }else{
                state.avg = 0
            }
            state.reviewpages = data.pages
            if(num === 1){
                state.sort = 'new'
            }else{
                state.sort = 'likes'
            }
        }
      
        const reviewpage = (no) =>{
            state.reviewpage = no
            OneSelect(2);
        }

        const ReviewChk = async() => {
            if(state.logged === true){
                var url = ""
                if(state.type === "tv"){
                    url = `${proxy.foo}/content/mydramareviewchk.json?no=${state.no}`
                }
                else{
                    url = `${proxy.foo}/content/mymoviereviewchk.json?no=${state.no}`
                }
                const headers = {"Content-Type":"application/json","TOKEN" : state.token}
                const {data} = await axios.get(url,{headers})
                state.data3 = data.result
                state.content1 = data.content
                state.score1 = data.score
                if(data.id){
                    state.id = data.id
                    var url1 = ""
                    var url2 = ""
                    if(state.type === "tv"){
                        url1 = `${proxy.foo}/content/dramareviewlikecnt.json?id=${state.id}`;
                        url2 = `${proxy.foo}/content/dramareviewreplycnt.json?id=${state.id}`;
                    }
                    else{
                        url1 = `${proxy.foo}/content/moviereviewlikecnt.json?id=${state.id}`;
                        url2 = `${proxy.foo}/content/moviereviewreplycnt.json?id=${state.id}`;
                    }
                    const response = await axios.get(url1, {headers});
                    const response2 = await axios.get(url2, {headers});

                    state.myreviewlikecnt = response.data.result
                    state.myreviewcomentcnt = response2.data.result
                }
            }
        }

        const ReviewUpdate = async() => {
            if(state.content1 === ""){
                alert("리뷰 내용이 없습니다. 리뷰를 작성해주세요.");
                return false;
            }
            var url = ""
            if(state.type === "tv"){
                url = `${proxy.foo}/content/updatetvreview.json?no=${state.no}`
            }
            else{
                url = `${proxy.foo}/content/updatemoviereview.json?no=${state.no}`
            }
            const headers = {"Content-Type":"application/json","TOKEN" : state.token}
            const body = {
                    content : state.content1,
                    score : state.score1,
                }
            const {data} = await axios.put(url, body, {headers})
            if(data.status === 200){
                state.reviewedit = 0;
                alert('리뷰 수정이 완료 되었습니다.')
                OneSelect(2);
            }
        }

        const ReviewDelete= async(no) => {
                var url =""
                if(state.type === "tv"){
                    url = `${proxy.foo}/content/deletetvreview.json?no=${no}`
                }
                else{
                    url = `${proxy.foo}/content/deletemoviereview.json?no=${no}`
                }
                const headers = {"Content-Type":"application/json","TOKEN" : state.token}
                const {data} = await axios.delete(url, {headers:headers, data:{}});
                if(data.status===200){
                    alert('리뷰 삭제가 완료되었습니다.')
                    OneSelect(2);
                    ReviewChk();
                }else{
                    alert('삭제에 실패하였습니다. 다시 시도해주세요.')
                }
        }

        const userprofile = (userid) => {
            router.push({path:'/userprofile', query:{id:userid}})
        }

        const reviewlike = async(id) => {
            if(state.logged===true){
                var url = ""
                if(state.type === "tv"){
                    url = `${proxy.foo}/content/dramareviewlike.json?id=${id}`
                }
                else{
                    url = `${proxy.foo}/content/moviereviewlike.json?id=${id}`
                }
                const headers = {"Content-Type":"application/json","TOKEN" : state.token}
                const body = {}
                const {data} = await axios.post(url,body,{headers})
                if(data.status === 200){
                    OneSelect(2);
                }
                else{
                    alert('이미 추천한 리뷰입니다.')
                }
            }   
            else{
                alert("로그인이 필요한 서비스입니다.")
            }
        }

        const update = () => {
            router.push({path:"/contentU",query:{no:state.no,type:state.type}})
        }

        const reviewone = (code, type) => {
            router.push({path:'/reviewone', query:{code:code, type:type}})
        }

        const scoreplus = () => {
            if(state.score2 < 10){
                state.score2 = Number(state.score2)+1;
            }
        }
        const scoreminus = () => {
            if(state.score2 > 1){
                state.score2 = Number(state.score2)-1;
            }
        }
        const scoreplus1 = () => {
            if(state.score1 < 10){
                state.score1 = Number(state.score1)+1;
            }
        }
        const scoreminus1 = () => {
            if(state.score1 > 1){
                state.score1 = Number(state.score1)-1;
            }
        }
        return {state, likeinsert, laterinsert, people,reviewinsert,OneSelect,
            ReviewChk,ReviewUpdate, ReviewDelete,userprofile,similar,content,
            reviewlike,reviewone,reviewpage,update, genrepick, scoreplus, scoreplus1, scoreminus, scoreminus1,scrollToTop}

    }
}
</script>

<style lang="scss" scoped>

    .container {
        padding:10px;
        border-radius: 10px;
        margin-bottom: 10px;
        background-color:rgba(255, 255, 255, 0.5);
    }
    .divdiv{
        border-radius: 10px;
        background-repeat : no-repeat;
        background-size : cover;
    }
    .container1 {
        margin-top: 10px;
        background-color: white;
        border: solid 1px gray;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
    }
    .scroll::-webkit-scrollbar {
        width: 5px;
    }
    .scroll::-webkit-scrollbar-track{
        background-color: rgba(0, 0, 0, 0);
    }
    .scroll::-webkit-scrollbar-thumb {
        background-color: #d3d3d3a8;
        border-radius: 10px;
    }
    .btn{
        background-color:rgba(0, 0, 0, 0.3);
        width: 100%;
        border-radius: 10px;
    }
    .divp{
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }
    .divp:hover{
        transform:scale(1.05);
        -o-transform:scale(1.05);
        -moz-transform:scale(1.05);
        -webkit-transform:scale(1.05);
        transition: transform .35s;
        -o-transition: transform .35s;
        -moz-transition: transform .35s;
        -webkit-transition: transform .35s;
    }


    .starpoint_wrap{display:inline-block;}
    .starpoint_box{position:relative;background:url('../assets/starscore.png') 0 0 no-repeat;font-size:0;}
    .starpoint_box .starpoint_bg{display:block;position:absolute;top:0;left:0;height:18px;background:url('../assets/starscore.png') 0 -20px no-repeat;pointer-events:none;}
    .starpoint_box .label_star{display:inline-block;width:10px;height:18px;box-sizing:border-box;}
    .starpoint_box .star_radio{opacity:0;width:0;height:0;position:absolute;}
    .starpoint_box .star_radio1{opacity:0;width:0;height:0;position:absolute;}
    .starpoint_box .star_radio:nth-of-type(1):hover ~ .starpoint_bg,
    .starpoint_box .star_radio:nth-of-type(1):checked ~ .starpoint_bg{width:10%;}
    .starpoint_box .star_radio1:nth-of-type(1):checked ~ .starpoint_bg{width:10%;}
    .starpoint_box .star_radio:nth-of-type(2):hover ~ .starpoint_bg,
    .starpoint_box .star_radio:nth-of-type(2):checked ~ .starpoint_bg{width:20%;}
    .starpoint_box .star_radio1:nth-of-type(2):checked ~ .starpoint_bg{width:20%;}
    .starpoint_box .star_radio:nth-of-type(3):hover ~ .starpoint_bg,
    .starpoint_box .star_radio:nth-of-type(3):checked ~ .starpoint_bg{width:30%;}
    .starpoint_box .star_radio1:nth-of-type(3):checked ~ .starpoint_bg{width:30%;}
    .starpoint_box .star_radio:nth-of-type(4):hover ~ .starpoint_bg,
    .starpoint_box .star_radio:nth-of-type(4):checked ~ .starpoint_bg{width:40%;}
    .starpoint_box .star_radio1:nth-of-type(4):checked ~ .starpoint_bg{width:40%;}
    .starpoint_box .star_radio:nth-of-type(5):hover ~ .starpoint_bg,
    .starpoint_box .star_radio:nth-of-type(5):checked ~ .starpoint_bg{width:50%;}
    .starpoint_box .star_radio1:nth-of-type(5):checked ~ .starpoint_bg{width:50%;}
    .starpoint_box .star_radio:nth-of-type(6):hover ~ .starpoint_bg,
    .starpoint_box .star_radio:nth-of-type(6):checked ~ .starpoint_bg{width:60%;}
    .starpoint_box .star_radio1:nth-of-type(6):checked ~ .starpoint_bg{width:60%;}
    .starpoint_box .star_radio:nth-of-type(7):hover ~ .starpoint_bg,
    .starpoint_box .star_radio:nth-of-type(7):checked ~ .starpoint_bg{width:70%;}
    .starpoint_box .star_radio1:nth-of-type(7):checked ~ .starpoint_bg{width:70%;}
    .starpoint_box .star_radio:nth-of-type(8):hover ~ .starpoint_bg,
    .starpoint_box .star_radio:nth-of-type(8):checked ~ .starpoint_bg{width:80%;}
    .starpoint_box .star_radio1:nth-of-type(8):checked ~ .starpoint_bg{width:80%;}
    .starpoint_box .star_radio:nth-of-type(9):hover ~ .starpoint_bg,
    .starpoint_box .star_radio:nth-of-type(9):checked ~ .starpoint_bg{width:90%;}
    .starpoint_box .star_radio1:nth-of-type(9):checked ~ .starpoint_bg{width:90%;}
    .starpoint_box .star_radio:nth-of-type(10):hover ~ .starpoint_bg,
    .starpoint_box .star_radio:nth-of-type(10):checked ~ .starpoint_bg{width:100%;}
    .starpoint_box .star_radio1:nth-of-type(10):checked ~ .starpoint_bg{width:100%;}

    .blind{position:absolute;clip:rect(0 0 0 0);margin:-1px;width:1px;height: 1px;overflow:hidden;}

</style>