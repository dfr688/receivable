<template>
  <div class="login forget">
      <Swiper>
        <div class="top">
            <i @click="goBack"></i>
        </div>
        <div class="login_detail register_detail">
            <ul>
                <li>
                    <i class="psw_icon"></i><input type="password" placeholder="旧密码" v-model="oldPsw"/>
                </li>
                <li>
                    <i class="psw_icon"></i><input type="password" placeholder="新密码" v-model="newPsw"/>
                </li>
            </ul>
            <div class="btn" @click="goModify">确认修改</div>
        </div>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import { Toast } from 'mint-ui';
import Qs from 'qs'
export default {
 name: "",
  data () {
    return {
        oldPsw: "",
        newPsw: ""
    }
  },
  components: {
      Swiper,
  },
  computed: {},
  watch: {},
  methods: {
      goBack() {
          this.$router.go(-1);
      },
      goModify() {
          if(this.oldPsw == ""){
                Toast({
                    message: '请填写旧密码',
                    duration: 1000
                });
            }else if(!/^[0-9]{6,18}$/.test(this.oldPsw)){
                Toast({
                    message: '请输入6到18位数字！',
                    duration: 1000
                });
            }else if(this.newPsw == ""){
                Toast({
                    message: '请填写新密码',
                    duration: 1000
                });
            }else if(!/^[0-9]{6,18}$/.test(this.newPsw)){
                Toast({
                    message: '请输入6到18位数字！',
                    duration: 1000
                });
            }else{
                let token = localStorage.getItem("token");
                let data = {
                    oldPassword: this.oldPsw,
                    newPassword: this.newPsw
                }
                this.baseJs.ajaxReq("/jikeyou/api/updatePassword",Qs.stringify(data),"post",token)
                .then(res => {
                    // console.log(res);
                    if(res.code === "200"){
                        Toast({
                            message: res.msg,
                            duration: 1000
                        });
                        this.$router.push("/login");
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