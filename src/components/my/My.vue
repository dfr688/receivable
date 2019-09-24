<template>
  <div class="my">
      <Swiper>
        <div class="top">
            <i @click="goBack"></i>
            <span @click="show = !show"></span>
            <transition name="fade">
              <ul v-if="show">
                <li @click="goForget">
                  修改密码
                </li>
                <li @click="signOut">
                  退出登录
                </li>
              </ul>
            </transition>
        </div>
        <div class="content">
          <span class="img_head"></span>
          <div class="info">
            <p v-if="isLogin">{{ phone }}</p>
            <p v-if="!isLogin" @click="goLogin" class="login_register"><span>点此登录/注册<i></i></span>登录/注册</p>
            <span>等级：基础用户</span>
          </div>
          <ul>
            <li>
              <span>致电客服</span>
              <a href="#">19956362512</a>
            </li>
            <li>
              <span>系统版本</span>
              <a href="#">2.0</a>
            </li>
          </ul>
        </div>
      </Swiper>
      <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../public/Tabbar'
import Swiper from '../public/Swiper'
export default {
 name: "",
  data () {
    return {
      show: false,
      isLogin: false,
      phone: ""
    }
  },
  components: {
      Tabbar,
      Swiper
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
      this.$router.push("/home");
    },
    // 修改密码
    goForget() {
      this.$router.push("/forget");
    },
    //登录/注册
    goLogin() {
      this.$router.push("/login");
    },
    //隐藏手机中间四位
		geTel(tel) {
			return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
    },
    //退出登录
    signOut() {
      localStorage.removeItem("phone");
      localStorage.removeItem("token");
      this.isLogin = false;
    }
  },
  created () {
    this.phone = localStorage.getItem("phone");
		if(this.phone != null){
		  this.phone = this.geTel(this.phone);
		  this.isLogin = true;
    }
  },
  mounted () {},
}
</script>
<style scoped>
    @import '../../assets/css/my.css';
</style>