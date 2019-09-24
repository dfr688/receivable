<template>
  <div class="login">
      <Swiper>
         <div class="top">
             <i @click="goBack"></i>
         </div>
         <ul class="login_register">
             <li class="login_item" :class="{choose:isSelected}" @click="login">
                 登录
                 <span class="login_sign" v-if="isSelected"></span>
             </li>
             <li class="register_item" :class="{choose:!isSelected}" @click="register">
                 注册
                 <span class="register_sign" v-if="!isSelected"></span>
             </li>
         </ul>
         <mt-tab-container v-model="active" :swipeable="true">
            <mt-tab-container-item id="container1">
                <div class="login_detail">
                    <ul>
                        <li>
                            <i class="phone_icon"></i><input type="tel" placeholder="填写手机号" v-model="loginPhone"/>
                        </li>
                        <li>
                            <i class="psw_icon"></i><input type="tel" class="login_psw" placeholder="登录密码" v-model="loginPsw"/>
                        </li>
                    </ul>
                    <div class="assist">
                        <!-- <p @click="goForget">忘记密码</p> -->
                    </div>
                    <div class="btn" @click="goLogin">立即登录</div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="container2">
                <div class="login_detail register_detail">
                    <ul>
                        <li>
                            <i class="phone_icon"></i><input type="tel" placeholder="填写手机号" v-model="registerPhone"/>
                        </li>
                        <li class="code_item">
                            <p><i class="code_icon"></i></p><input type="tel" placeholder="手机验证码" v-model="code"/><div><Vcode :phone="registerPhone"/></div>
                        </li>
                        <li>
                            <i class="psw_icon"></i><input type="tel" class="register_psw" placeholder="登录密码" v-model="registerPsw"/>
                        </li>
                        <li class="invite_code">
                            <input type="tel" placeholder="邀请码（选填）" v-model="inviteCode"/>
                        </li>
                    </ul>
                    <div class="btn" @click="goRegister">立即注册</div>
                    <div class="privacy">注册即表示同意<span @click="goPrivacy">《隐私政策》</span></div>
                </div>
            </mt-tab-container-item>
         </mt-tab-container>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import Vcode from './Vcode'
import { Toast } from 'mint-ui';
import Qs from 'qs'
export default {
 name: "",
  data () {
    return {
        active: "container1",
        isSelected: true,
        registerPhone: "",
        code: "",
        registerPsw: "",
        inviteCode: "",
        loginPhone: "",
        loginPsw: ""
    }
  },
  components: {
      Swiper,
      Vcode
  },
  computed: {},
  watch: {
      active(newV,oldV){
          if(newV === "container1"){
              this.isSelected = true;
          }else{
              this.isSelected = false;
          }
      }
  },
  methods: {
      goBack() {
          this.$router.go(-1);
      },
      login() {
          this.active = "container1";
          this.isSelected = true;
      },
      register() {
          this.active = "container2";
          this.isSelected = false;
      },
      goPrivacy() {
          this.$router.push("/privacy");
      },
    //忘记密码
    goForget() {
        this.$router.push("/forget");
    },
    // 点击注册
    goRegister() {
        if(this.registerPhone == ""){
            Toast({
                message: '手机号不能为空',
                duration: 1000
            });
        }else if(this.registerPsw == ""){
            Toast({
                message: '密码不能为空',
                duration: 1000
            });
        }else if(!/^[0-9]{6,18}$/.test(this.registerPsw)){
            Toast({
                message: '请输入6到18位数字！',
                duration: 1000
            });
        }else if(this.code == ""){
            Toast({
                message: '验证码不能为空',
                duration: 1000
            });
        }else{
            let data = {
                phone: this.registerPhone,
                smsCode: this.code,
                password: this.registerPsw
            };
            this.baseJs.ajaxReq("/jikeyou/api/signUp",Qs.stringify(data),'post',"")
            .then(res => {
                // console.log(res);
                if(res.code != "200"){
                    Toast({
                        message: res.msg,
                        duration: 1000
                    });
                }else{
                    Toast({
                        message: res.msg,
                        duration: 1000
                    });
                    this.active = "container1";
                    this.isSelected = true;
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    // 点击登录
    goLogin() {
      if(this.loginPhone == ""){
        Toast({
          message: '手机号不能为空',
          duration: 1000
        });
      }else if(this.loginPsw == ""){
        Toast({
          message: '密码不能为空',
          duration: 1000
        });
      }else{
          let data = {
              phone: this.loginPhone,
              password: this.loginPsw
          };
        this.baseJs.ajaxReq("/jikeyou/api/signIn",Qs.stringify(data),'post',"")
        .then(res => {
        // console.log(res);
          if(res.code != "200"){
            Toast({
                message: res.msg,
                duration: 1000
            });
          }else{
          // 缓存token
          localStorage.setItem("token",res.data);
          // 缓存手机号
          localStorage.setItem("phone",this.loginPhone);
            Toast({
                message: res.msg,
                duration: 1000
            });
            this.$router.push("/my");
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  },
  created () {},
  mounted () {},
}
</script>
<style scoped>
@import '../../assets/css/login.css';
</style>