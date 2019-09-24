<template>
  <div class="Vcode">
		<button class="getmodBtn" @click="getCode()" :disabled="!login.canGet">
			 <span v-show="!login.canGet">{{login.waitTime+"s后重新获取"}}</span>
			 <span v-show="login.canGet">获取验证码</span>
		</button>
  </div>
</template>

<script>
	import { Toast } from 'mint-ui';
	function timeCountdown(obj) { //obj包括timer、waitTime 、canGet 
    const TIME_COUNT = 60; //默认倒计时秒数
    if (!obj.timer) {
        obj.waitTime = TIME_COUNT;
        obj.canGet = false;
        obj.timer = setInterval(() => {
            if (obj.waitTime>0 && obj.waitTime<=TIME_COUNT) {
                obj.waitTime--;
            }else{
                obj.canGet = true;
                clearInterval(obj.timer); //清空定时器
                obj.timer = null;
            }
        }, 1000)
    }
    return {
        timer: obj.timer,
        canGet: obj.canGet,
        waitTime: obj.waitTime
    }
}
	
	
export default {
  name: '',
  data (){
  return{            
    tempLogin:{ //定义一个临时对象
      canGet: true,
      timer: null,
      waitTime: 60
      },
    }
},
props: [
	"phone"
],
computed: {
	login(){ //最终对象
  if(!this.tempLogin.canGet){
    return timeCountdown(this.tempLogin);
  }else{
    return this.tempLogin;
  }
}
},
methods:{
    getCode(){
        //在点击获取验证码的时候 判断手机是否正确 是否为空
    	 if(this.phone == ""){
			 Toast({
			 	message: '手机号不能为空',
			 	duration: 1000
			 });
    		return false
    	}else if(!/^1[3-9]\d{9}$/.test(this.phone)){
			 Toast({
				message: '请输入正确的手机号',
				duration: 1000
			});
    		return false;
    	}else{
    		//倒计时开始
    		timeCountdown(this.login);  //参数为最终对象
    		this.baseJs.ajaxReq("/jikeyou/api/sendSmsCode",{phone:this.phone},"get","")
    		.then(res => {
    			// console.log(res);
    			if(res.code == "200"){
					Toast({
						message: res.msg,
						duration: 1000
					});
    			}
    		})
    		.catch(err => {
    			console.log(err);
    		})
    		return true
    	}
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.Vcode .getmodBtn{
		width: 2.36rem;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		border-radius: .23rem;
		color: #2480a6;;
		background-image: linear-gradient(#e9f6fc, #e9f6fc), linear-gradient(#ffeff0, #ffeff0);
		font-size: .24rem;
	}
</style>
