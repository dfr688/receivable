<template>
  <div class="rate">
      <Swiper>
         <HeaderCom @chooseQuota="chooseQuota" @chooseRate="chooseRate" :active="active" :isShow="false">
             <p slot="tit_one">额度</p>
             <p slot="tit_two">费率</p>
         </HeaderCom>
         <mt-tab-container v-model="active" :swipeable=true>
            <mt-tab-container-item id="container1">
               <div class="quota_detail">
                   <div class="current_grade" @click="goBasicUser">
                       <div class="left">
                           当前等级
                       </div>
                       <p class="right">基础用户<i></i></p>
                   </div>
                   <div class="detail">
                       <p class="title">信用卡收款额度（元）</p>
                       <ul>
                           <li>
                               <p class="type">类别</p>
                               <p>借记卡</p>
                               <p>信用卡</p>
                           </li>
                           <li>
                               <p class="type">单笔限额</p>
                               <p>10000</p>
                               <p>5000</p>
                           </li>
                           <li>
                               <p class="type">单卡日限额</p>
                               <p>50000</p>
                               <p>50000</p>
                           </li>
                           <li>
                               <p class="type">单月限额</p>
                               <p>200000</p>
                               <p>100000</p>
                           </li>
                       </ul>
                   </div>
                   <div class="detail">
                       <p class="title">扫码收款额度（元）</p>
                       <ul>
                           <li>
                               <p class="type">类别</p>
                               <p>支付宝</p>
                               <p>微信</p>
                           </li>
                           <li>
                               <p class="type">单笔限额</p>
                               <p>50000</p>
                               <p>50000</p>
                           </li>
                           <li>
                               <p class="type">单卡日限额</p>
                               <p>50000</p>
                               <p>200000</p>
                           </li>
                           <li>
                               <p class="type">单月限额</p>
                               <p>500000</p>
                               <p>200000</p>
                           </li>
                       </ul>
                   </div>
               </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="container2">
               <div class="quota_detail rate_detail">
                   <div class="arrival_account">
                       <p>次日到账</p>
                       <p>立即到账</p>
                   </div>
                   <div class="detail">
                       <p class="title">信用卡收款额度（元）</p>
                       <ul>
                           <li>
                               <p class="type">卡类型</p>
                               <p>信用卡</p>
                               <p>借记卡</p>
                               <p>境外卡</p>
                           </li>
                           <li>
                               <p class="type">标准费率</p>
                               <p>暂不支持</p>
                               <p>暂不支持</p>
                               <p>暂不支持</p>
                           </li>
                           <li>
                               <p class="type">标准费率</p>
                               <p>0.07%</p>
                               <p>0.07%</p>
                               <p>0.07%</p>
                           </li>
                           <li>
                               <p class="type">提现手续费</p>
                               <p>2元/笔</p>
                               <p>2元/笔</p>
                               <p>2元/笔</p>
                           </li>
                       </ul>
                   </div>
               </div>
            </mt-tab-container-item>
        </mt-tab-container> 
      </Swiper>
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import HeaderCom from '../public/HeaderCom'
export default {
 name: "",
  data () {
    return {
        active: "container1"
    }
  },
  components: {
      Swiper,
      HeaderCom
  },
  computed: {},
  watch: {},
  methods: {
    //额度
      chooseQuota() {
           this.active = "container1";
      },
    //费率
      chooseRate() {
           this.active = "container2";
      },
    //基础用户
      goBasicUser() {
          this.$router.push("/basicuser");
      }
  },
  created () {},
  mounted () {},
}
</script>
<style scoped>
@import '../../assets/css/rate.css';
</style>