<template>

 <div class="content">
		<div class="banner">
			<div class="bannerbox">
				<p class="title">
					恭喜您中奖！<br/>请填写收货信息
				</p>
                <form>
				<div class="bannerbox01">
					<input type="text" class="bannerpeople" placeholder="请填写收货人姓名" v-model="w_name" name="w_name">
                    <span v-show="errors.has('w_name')" class="error">{{ errors.first('w_name') }}</span>
				</div>
				<div class="bannerbox02">
					<input type="text" class="bannerphone" placeholder="请填写收货人手机号码" v-model="w_moible" name="w_moible">
				    <span v-show="errors.has('w_moible')" class="error">{{ errors.first('w_moible') }}</span>
                </div>
				<div class="bannerbox03">
					<input type="text" class="banneraddre" placeholder="请填写收货地址" v-model="w_address" name="w_address">
                    <span v-show="errors.has('w_address')" class="error">{{ errors.first('w_address') }}</span>
				</div>
               
				<p class="does">
					提示 : 请填写正确的地址和有效的联系电话，
					确保工作人员可以与您联系，大海1对1向您承诺 : 将对您的个人信息进行保密，绝不泄露！
				</p>
				<div class="bannerbox04">
					<a href="javascrit:;" class="submit" @click="submitForm()">提交</a>
				</div>
                 </form>
			</div>
		</div>
		<div class="success" v-show="success">
			<div class="successbox">
				<div class="close">
					<img src="../assets/winner-list/close.png" alt="" @click="close_btn">
				</div>
				<p class="title">提交成功！</p>
				<p class="dosc">提示：请填写正确的地址和有效的联系电话，确保工作人员可以与您联系。大海1对1向您承诺：将对您的个人信息进行保密，绝不泄露！</p>
			</div>
		</div>
 </div>
</template>
<script>
import {httpGet} from "../utils/axios"
import { httpPost} from '../utils/axios';
import VeeValidate, {Validator} from 'vee-validate';
import cn from 'vee-validate/dist/locale/zh_CN';
 const dict = {
    cn: {messages: {required: (name) => `${w_name}不能为空!`}}
  }
  Validator.localize(dict);
   validator: null
  export default{
      data() {
          return {
            w_name:'',
            w_moible:'',
            w_address:'',
            success:false,
            error:null
           
          }
      },
      methods: {
       submitForm(){
           let formData = {
               user_name: this.w_name,
               user_moible:this.w_moible,
               user_address:this.w_address
            }
       httpPost('/mockjsdata/17/api/event/activity/address',formData)
              .then((res) => {
                  console.log(res)
                  if (res.data.status == 1) {
                      console.log(1)
                        this.success=true;
                    }
                })
       },
       created(){
         this.validator = new Validator({});
         Validator.extend('mobile', {
        getMessage: field => "请输入正确的手机号码",
        validate: value => value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
         });
         Validator.extend('name', {
                getMessage: field => "请输入正确姓名",
                validate: value => value == 'tom'
         });
         Validator.extend('address', {
                getMessage: field => "收货人地址不能超过32位",
                validate: value => value.length <=32
         });
         this.validator.attach({name:'w_name',rules:'requried|name',alias:"姓名"});
         this.validator.attach({name:'w_moible',rules:'requried|moible',alias:"手机号码"});
         this.validator.attach({name:'w_address',rules:'requried|address',alias:"收获地址"});

         this.$set(this, 'errors', this.validator.errors);

       },
       close_btn(){
           this.success=false;
       }

      }
  };
</script>

<style>
* {
    box-sizing: border-box;
}
.content {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
}
.banner{
    width: 100%;
    background: url("../assets/winner-list/bg.png") no-repeat;
    background-size: 100% 100%;
}
.bannerbox{
    width: 100%;
    text-align: center;
    overflow: hidden;
}
.bannerbox input{
    width: 5.26rem;
    height: 1rem;
    border-radius:2px;
    box-shadow:0px 0px 9px 1px rgba(199,199,199,0.65);
    color: #333333;
    font-size: 0.26rem;
    text-indent: 0.28rem;
}
.bannerbox .title{
    font-size:.52rem;
    line-height: .74rem;
    font-family:FZLTZCHK--GBK1-0;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-top: 1.68rem;
}
.bannerbox .bannerbox01{
    margin-top: 0.3rem;
    width: 100%;
    height: 1rem;
    margin-bottom: 0.24rem;
}
.bannerbox .bannerbox02{
    width: 100%;
    height: 1rem;
    margin-bottom: 0.24rem;
}
.bannerbox .bannerbox03{
    width: 100%;
    height: 1rem;
}
.bannerbox .does{
    width: 4.76rem;
    font-size:10px;
    margin: 0.34rem auto;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:15px;
    text-align: left;
}
.bannerbox .bannerbox04{
    width: 100%;
    height: 6rem;
}
.bannerbox .bannerbox04 a{
    display: block;
    color: #FEFEFE;
    width: 5.5rem;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    border-radius: 1rem;
    background:linear-gradient(-8deg,rgba(255,118,18,1),rgba(255,213,66,1));
    box-shadow:0px 4px 22px 0px rgba(201,14,30,0.58);
    font-size: 0.36rem;
    font-weight: 400;
    margin: 0 auto;
}

.placeholder_word input::-webkit-input-placeholder { /* WebKit browsers */
    color:#FF4242;
}
.placeholder_word input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#FF4242;
}
.placeholder_word input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#FF4242;
}
.placeholder_word input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#FF4242;
}

.success{
    width: 100%;
    background:rgba(0,0,0,0.6);
    height: 100%;
    position: absolute;
    z-index: 100;
    display: block;
    top:0;
}
.success .successbox{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 5.28rem;
    height: 6.71rem;
    background:url("../assets/winner-list/bgsuccess.png") no-repeat;
    background-size: 100% 100%;
    overflow: auto;
    z-index: 101;
}
.success .successbox .close{
    position: absolute;
    top: 0.24rem;
    right: 0.30rem;
    width: 0.4rem;
    height: 0.4rem;
}
.success .successbox .close img{
    width: 100%;
    height: 100%;
}
.success .successbox .title{
    height:0.3rem;
    font-size: 0.3rem;
    font-family:FZLTZCHK--GBK1-0;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-top:  2.16rem;
    text-align: center;
}
.success .successbox .dosc{
    width:4.5rem;
    height:0.48srem;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0.46rem auto;
    text-align: left;
}

</style>