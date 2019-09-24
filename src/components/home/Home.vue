<template>
  <div class="home">
      <Swiper>
        <div class="wrap">
            <div class="top">
                <span></span>
                <!-- <div>点此也可登录/注册哦<i></i></div> -->
            </div>
            <div class="img"></div>
            <!-- 分类 -->
            <ul class="sort">
                <li @click="goCard">
                    <span class="card"></span>
                    <div>
                        <p>我的银行卡</p>
                        <span>银行卡交易更安全</span>
                    </div>
                </li>
                <li @click="goAccount">
                    <span class="balance"></span>
                    <div>
                        <p>账户余额</p>
                        <span>扫码收款获得</span>
                    </div>
                </li>
                <li @click="goRecord">
                    <span class="record"></span>
                    <div>
                        <p>交易记录</p>
                        <span>收入和支付记录</span>
                    </div>
                </li>
                <li @click="goRate">
                    <span class="rate"></span>
                    <div>
                        <p>额度费率</p>
                        <span>额度费率查询</span>
                    </div>
                </li>
                <li @click="goUserLevel">
                    <span class="grade"></span>
                    <div>
                        <p>商户等级</p>
                        <span>认证用户享更高额度</span>
                    </div>
                </li>
            </ul>
            <!-- 收款方式 -->
            <div class="ways">
                <div class="title">
                    <i></i>收款方式
                </div>
                <ul>
                    <li class="sweep_code" @click="goSweep">
                        <p>扫码收款</p>
                        <span>支付宝/微信</span>
                    </li>
                    <li class="credit_card" @click="goCreditCard">
                        <p>信用卡收款</p>
                        <span>快捷支付，无需POS机</span>
                    </li>
                </ul>
            </div>
        </div>
      </Swiper>
      <Tabbar isSelected=true></Tabbar>
  </div>
</template>

<script>
    import Tabbar from '../public/Tabbar'
    import Swiper from '../public/Swiper'
export default {
 name: "",
  data () {
    return {
    }
  },
  components: {
      Tabbar,
      Swiper
  },
  computed: {},
  watch: {},
  methods: {
    //登录/注册
    goLogin() {
        this.$router.push("/login");
    },
    //银行卡
    goCard() {
        this.$router.push("/card");
    },
    // 账户余额
    goAccount() {
        this.$router.push("/account");
    },
    // 交易记录
    goRecord() {
        this.$router.push("/record");
    },
    // 额度
    goRate() {
        this.$router.push("/rate");
    },
    // 商户等级
    goUserLevel() {
        this.$router.push("/userlevel");
    },
    // 扫码收款
    goSweep() {
        this.$router.push("/sweep");
    },
    // 信用卡收款
    goCreditCard() {
        this.$router.push("/creditcard");
    }
  },
  created () {},
  mounted () {},
}
</script>
<style scoped>
    @import '../../assets/css/home.css';
</style>