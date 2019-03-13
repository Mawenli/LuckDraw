<template>
<div class="wrapper">
<div class="up">
<div class="prize-wrap">
<div class="prize-content">
<div v-for="(item,index) in items" :key="index" class="prize" @click="runF(index);" :style="{background:(itemStatus[item.id] ?'#feb8b8':'')}">
<img :src="item.img">
<!-- {{item.id}} -->
</div>
<!-- <div class="prize-btn" @click="runF" ></div> -->
</div>
</div>
</div>
<div class="down">
<div class="list-wrap">
<div class="list-content">
<!-- 中奖名单 -->
 <ul id="con1" ref="con1" :class="{anim:animate==true}">
    <li v-for="(temp,index) in temps" :key="index">
      {{temp.mobile}}获得了{{temp.short_name}}
 </li>

 </ul>
</div>
</div>
</div>
<!--弹出提示-->
<div class="alert-tit"></div>
<div v-show="mask" class="mask1" >

        <div class="popup-prize-back" v-for="(items,index) in p_items" :key="index" v-show ="items.id === show">
        <img :src="items.img" class="popup-prize">
        <!-- </div> -->
        <div class="prize-name">{{prize_name}}</div>
        <div class="prize-time">( 剩余抽奖机会 : <span class="remain_time">{{remain_time}}</span>次 )</div>
        <div class="instruction" >
        <p class="entity" v-show="entityInfo">
        兑奖说明：<br>
        1、 中奖后，请务必按照页面提示准确填写用户信息，工作人员将在活动结束后5个工作日内与您电话联系；<br>
        2、 <span class="instr-name">{{instr_name}}</span>将会在工作人员与中奖者确认信息后的5个工作日内寄出，请务必保证中奖页面中的个人信息准确无误，以确保您的权益；<br>
        3、 活动期间若遇问题，请联系大海客服：400-186-5291。
        </p>
        <p class="fictitious" v-show="fictitiousInfo">
        兑奖说明：<br>
        1、 <span class="instr-name">学习资料包</span>为大海1对1提供的线上学习资料包，以电子形式呈现；<br>
        2、领取方式：请按中奖页面的提示语，关注“大海教育”微信公众号，回复“学习资料包”获得领取链接，即可完成领取；<br>
        3、 活动期间若遇问题，请联系大海客服：400-186-5291。
        </p>
        </div>
        <router-link to="/address">
        <div class="receive-btn" @click="receive_btn">立即领取</div>
        </router-link>
        <img class="close-btn" src="../assets/nine-dail/close_btn.png" alt="" @click="close_btn()">
</div>
</div>

</div>

</template>
<script>
import {httpPost} from "../utils/axios"
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import item1 from "../assets/nine-dail/prize1.png"
import item2 from "../assets/nine-dail/prize2.png"
import item3 from "../assets/nine-dail/prize3.png"
import item4 from "../assets/nine-dail/prize4.png"
import item5 from "../assets/nine-dail/prize5.png"
import item6 from "../assets/nine-dail/prize6.png"
import item7 from "../assets/nine-dail/prize7.png"
import item8 from "../assets/nine-dail/prize0.png"
import item9 from "../assets/nine-dail/prize_btn.png"
import p_item1 from "../assets/nine-dail/pop_prize1.png"
import p_item2 from "../assets/nine-dail/pop_prize2.png"
import p_item3 from "../assets/nine-dail/pop_prize3.png"
import p_item4 from "../assets/nine-dail/pop_prize4.png"
import p_item5 from "../assets/nine-dail/pop_prize5.png"
import p_item6 from "../assets/nine-dail/pop_prize6.png"
import p_item7 from "../assets/nine-dail/pop_prize7.png"
import p_item8 from "../assets/nine-dail/pop_prize0.png"
import p_item9 from "../assets/nine-dail/close_btn.png"
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'HelloWorld',
  data() {
     return {
       //item1, item2, item3, item8, item9, item7, item6, item4, item5
     p_items:[
       {id: 4, img: p_item8},
       {id: 1, img: p_item2},
       {id: 2, img: p_item3},
       {id: 3, img: p_item4},
       {id: 7, img: p_item5},
       {id: 5, img: p_item6},
       {id: 6, img: p_item7},
       {id: 8, img: p_item8},
      //  {id: 8, img: p_item8}
     ],
     items: [
       {id: 0, img: item1},
       {id: 1, img: item2},
       {id: 2, img: item3},
       {id: 7, img: item8},
       {id: 8, img: item9},
       {id: 3, img: item4},
       {id: 6, img: item7},
       {id: 5, img: item6},
       {id: 4, img: item5}
     ],
     swiperOption: {
        
        paginationClickable: true,
        autoplay: true,
        autoplayDisableOnInteraction: false,
        loop: true,
         
        },
     temps:[],
     animate:false,
     itemStatus: [false, false, false, false, false, false, false, false, false],
     prize_name:'',
     remain_time:0,
     instr_name:'',
     prize_receive:'',
     clickTime:'',
     mask:false,
     stopStep:0,
     show:'',
     fictitiousInfo:false,
     entityInfo:false,
     winner_mob:'',
     winner_name:'',
     activeIndex: 0,
      prevIndex: -1,
      currentIndex: 0,
      interval: null,
    
     }
     
  },
created(){
  setInterval(this.scroll,1000) // 在钩子函数中调用我在method 里面写的scroll()方法，注意此处不要忘记加this,我在这个位置掉了好几次坑，都是因为忘记写this。
},
  mounted() {
      
          // const _this=this;
       const data={
           activity_id: 8,
            channel_id: "0",
            mobile: 18310640806
          }
        httpPost('/mockjsdata/17/api/event/union/prize_draw',data)
              .then((res) => {
                 this.stopStep = res.data.result.prize.id;
              })

  },
  methods:{

    scroll(){
      const that = this;   
      const data={
           activity_id: 8,
            channel_id: "0",
            mobile: 18310640806
          }
       
    let con1 = that.$refs.con1;
    console.log(con1,'sss')
    con1.style.marginTop='-30px';
    that.animate=!this.animate;
    setTimeout(function(){
        httpPost('/mockjsdata/17/api/event/activity/prize_user',data)
              .then((res) => {
                that.temps = res.data.result.list;
                  // console.log(that.temps)
                  con1.style.marginTop='0px';
                  that.animate=!that.animate;
                  
       })
       
    },500)
  },
     prize_get(index){
        var entityPrizeIds = [1,2,3,4,5,6,7]; // 实物奖品id
        var fictitiousPrizeIds = [8]; // 虚拟奖品id
        const this_ = this;
        var runT= null;
        var timer='';
        const data={
           activity_id: 0,
            channel_id: "277",
            mobile: 18310640806
          }
          if(index == 4){
            httpPost('/mockjsdata/17/api/event/union/prize_draw',data)
              .then((res) => {
              console.log(res.data.result)
              if (res.data.result.prize.length == 0) {
              alertContent('已无抽奖机会');
              return false;
              }
              this.stopStep = res.data.result.prize.id;
              console.log(this_.stopStep)
              timer = window.setTimeout(function () {
              if (entityPrizeIds.indexOf(this_.stopStep) > -1) { // 实物奖品
                    this_.mask = true;
                    this_.show = res.data.result.prize.id
                    this_.item = res.data.result.prize.id;
                    this_.prize_name = res.data.result.prize.short_name;
                    this_.instr_name = res.data.result.prize.short_name;
                    this_.remain_time = res.data.result.prize.remain_cnt;
                    console.log('22');
              
              } else if (fictitiousPrizeIds.indexOf(this_.stopStep) > -1) { // 虚拟奖品
                 
                  this_.show = res.data.result.prize.id
                  this_.fictitiousInfo = true;
                  this_.prize_name = res.data.result.prize.short_name;
                  this_.remain_time = res.data.result.remain_cnt;
                  this_.mask = true;
                  console.log('33');
              } else { // 谢谢参与
              }
              }, 4500)
              // runT=setTimeout(runF,100);
              // alert('1');
              })
              
          }
            
      },
      close_btn(){
        this.show = '';
        this.mask= false;
        
      },
     runF(index){
      // var stopStep = this.$options.methods.prize_get();
      this.prize_get(index);
     
        console.log(1111)
        var stopStep = this.stopStep;
        console.log(stopStep,'1');
    
      if(index == 4)
      {
        var flag = 0;
        const _this = this
        let step = 0
        setInterval(function() {
          if((flag+stopStep)/8 <4 ){
          if ( step == 8) {
            step = 0
          } else {
            if (step > 0) {
            _this.$set(_this.itemStatus, step - 1, false)
            _this.$set(_this.itemStatus, step, true)
            }
          }
            _this.$set(_this.itemStatus, 7, false)
            _this.$set(_this.itemStatus, step, true)            
            step = step + 1
            }
                     flag++;    
                    // console.log(flag)
                    clearInterval(); 
               
        }, 100)
                       
      }
      
    },
    receive_btn(){
      const _this=this;
        //  window.location.href = '/address_double12_consultant';
        _this.$router.push('/address');
    }
    
    

}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.list-content{
  width: 300px;
  height: 95px;
  line-height: 30px;
  overflow: hidden;
  padding-left: 64px;
  /* border: 1px solid black; */
  transition: all 0.5s;
  margin-top:1.3rem;
}
.anim{
  transition: all 0.5s;
}
#con1 li{
  list-style: none;
  line-height: 30px;
  height: 30px;
}
img{
  width: 100%;
  display: block;
}
button {
  border: none;
}
div {
  padding-top: 0.1px;
}
.wrapper{
padding-top: 0.1px;
position: relative;
width: 100%;
overflow: hidden;
}
.up {
  width: 100%;
  height: 12.11rem;
  background: url('../assets/nine-dail/up_back.png') center no-repeat;
  background-size: 100%;
}
.prize-wrap {
  width: 6.62rem;
  height: 6.64rem;
  background: url('../assets/nine-dail/prize_back.png') center no-repeat;
  background-size: 100%;
  margin: 4.86rem auto 0;
  padding-top: 0.1px;
}
.prize-content {
  width: 5.8rem;
  /* height: 5.82rem; */
  margin: 0.41rem auto 0;
  display: flex;
  flex-wrap: wrap;
}
.prize {
  width: 1.8rem;
  height: 1.8rem;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
  padding-top: 0.1px;
  /* background: #ffe0e0; */
  background: url('../assets/nine-dail/prize_item_back.png') no-repeat center;
  background-size: 100%;
  position: relative;
}
.prize-btn {
  position:fixed;
  top:360px;
  left:138px;
  width: 1.8rem;
  height: 1.8rem;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
  background: url('../assets/nine-dail/prize_btn.png') center no-repeat;
  background-size: 100%;
}
.prize img {
  width: 1.55rem;
  height: 1.55rem;
  margin: 0.12rem 0.16rem;
}
.down {
  width: 100%;
  height: 8.66rem;
  background: url('../assets/nine-dail/down_back.png') center no-repeat;
  background-size: 100%;
  padding-top: 0.1px;
  margin-top:-13px;
}
.list-wrap {
  width: 6.46rem;
  height: 8.02rem;
  background: url('../assets/nine-dail/list_back.png') center no-repeat;
  background-size: 100%;
  margin: 0.16rem auto 0;
}

.mask1 {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.6);
  z-index: 900;
  padding-top: 0.1px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-thanks {
  width: 5.58rem;
  height: 6.61rem;
  background: url('../assets/nine-dail/popup_thanks.png') no-repeat center;
  background-size: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding-top: 0.1px;
  display: none;
}
.popup-thanks .time-wrap {
  width: 100%;
  text-align: center;
  margin: 2.73rem auto 0;
  font-size: 0.21rem;
  color: #EF3036;
  font-weight: 300;
}
/* 奖品弹窗 */
.popup-prize-back {
  width: 6.3rem;
  height: 10.17rem;
  background: url('../assets/nine-dail/popup_prize_back.png') no-repeat center;
  background-size: 100%;
  position: relative;
  padding-top: 0.1px;
  color: #fff;
  /* margin-top:-987px; */
  /* margin-left: 30px; */
}
.popup-prize {
  width: 3.24rem;
  height: 2.5rem;
  margin: 1.57rem auto 0;
}
.pop-prize1,.pop-prize2,.pop-prize3,.pop-prize4,.pop-prize5,.pop-prize6,.pop-prize7,.pop-prize0 ,{
  display: none;
}
.popup-prize-back .prize-name {
  font-size: 0.36rem;
  font-family: 'FZLTZCHK--GBK1-0';
  width: 100%;
  text-align: center;
}
.popup-prize-back .prize-time {
  width: 100%;
  text-align: center;
  font-size: 0.24rem;
}
.instruction {
  width: 5.43rem;
  height: 2.63rem;
  line-height: 0.3rem;
  margin: 0.1rem auto 0;
  font-size: 0.24rem;
  text-align: justify;
  letter-spacing: 0.01rem;
  font-family: MicrosoftYaHei;
}
.entity {
  
  display: block;
}
.fictitious {
  display: block;
}
.receive-btn {
  width: 4.95rem;
  height: 1.6rem;
  background: url('../assets/nine-dail/popup_btn.png') center no-repeat;
  background-size: 100%;
  text-align: center;
  padding-top: 0.5rem;
  margin: 0 auto;
  font-size: 0.3rem;
  font-family: 'PingFangSC-Medium';
  font-weight: 500;
}
.close-btn {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  right: 0.18rem;
  top: 0.17rem;
}
/* 手提袋弹窗 */


.close-btn {
  width: 0.54rem;
  height: 0.54rem;
  position: absolute;
  right: 0.18rem;
  top: 0.18rem;
  z-index: 400;
  /* display: none; */
}
.close-btn-thanks {
  width: 0.54rem;
  height: 0.54rem;
  position: absolute;
  right: 0.18rem;
  top: 0.18rem;
  z-index: 400;
  /* display: none; */
}
</style>
