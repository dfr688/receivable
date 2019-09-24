<template>
  <div class="card">
    <Swiper>
      <HeaderCom @choosePay="choosePay" @chooseReceivable="chooseReceivable" :active="active" :isShow="true">
          <p slot="tit_one">支付卡</p>
          <p slot="tit_two">收款卡</p>
      </HeaderCom>  
      <mt-tab-container v-model="active" :swipeable=true>
          <!-- 支付卡 -->
        <mt-tab-container-item id="container1">
          <div class="pay_card">
            <p class="title">我的卡 <span>共 {{ bankLength }} 张</span></p>
            <ul>
              <li @click="payCard" :class="{Agricultural_Bank: 1===item.bankType,Industrial_Bank:2===item.bankType,China_Merchants_Bank:3===item.bankType}" v-for="(item,index) in bankList" :key="index">
                <div class="left">
                  <i></i>
                  <div>
                    <p>{{ bank[item.bankType-1] }}</p>
                    <span>信用卡</span>
                  </div>
                </div>
                <div class="right">
                    {{ getNum(item.bankCardNo) }}
                </div>
              </li>
            </ul>
            <div class="ripple" :class="{diff:isShow}" @click="goAddPayCard">
              <i class="add"></i>添加银行卡
            </div>
          </div>
        </mt-tab-container-item>
        <!-- 收款卡 -->
        <mt-tab-container-item id="container2">
          <div class="pay_card receivable_card" v-if="isAdd">
            <ul>
              <li :class="{Agricultural_Bank: 1===detail.bankType,Industrial_Bank:2===detail.bankType,China_Merchants_Bank:3===detail.bankType}" v-for="(detail,index) in incomeCardList" :key="index">
                <div class="left">
                  <i></i>
                  <div>
                    <p>{{ bank[detail.bankType - 1] }}</p>
                    <span>储蓄卡</span>
                  </div>
                </div>
                <div class="right">
                    {{ getNum(detail.bankCardNo) }}
                </div>
              </li>
            </ul>
            <div class="tip">注：交易将全部结算至此账户，必须为储蓄卡</div>
             <div class="ripple" @click="goModifyCard">
              <i class="modify"></i>修改银行卡
            </div>
          </div>
          <div class="pay_card add_card" v-if="!isAdd">
            <p>还没有收款卡,可添加收款卡</p>
            <div class="ripple" @click="goAddReceivableCard">
              <i class="add"></i>添加银行卡
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </Swiper>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <Pay ref="pay" @closePopup="closePopup" @forgetPopup="forgetPopup" @prompt="prompt"/>
    </mt-popup>
    <mt-popup
      v-model="popupVisibleDiff"
      popup-transition="popup-fade">
      <div class="boxs">
        <p>提示</p>
        <span>密码输入错误</span>
        <ul>
          <li @click="goCancel">取消</li>
          <li @click="goReinput">重新输入</li>
        </ul>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popupVisiblego"
      popup-transition="popup-fade">
      <div class="boxs forgetTip">
        <p>提示</p>
        <span>商户支付终端未授权</span>
        <ul>
          <li @click="goSure">确定</li>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import HeaderCom from '../public/HeaderCom'
import Pay from './Pay'
import bus from '../../assets/js/bus.js'
const bank = ["中国农业银行","兴业银行","招商银行"]
export default {
 name: "",
  data () {
    return {
      active: "container1",
      isAdd: false,
      bank: bank,
      bankList: "",
      bankLength: "",
      incomeCardList: "",
      isShow: true,
      popupVisible: false,
      popupVisibleDiff: false,
      popupVisiblego: false,
      remark: ""
    }
  },
  components: {
      Swiper,
      HeaderCom,
      Pay
  },
  watch: {
    popupVisible(newV,oldV){
      if(newV == false){
        this.$refs.pay.clearPasswordHandle();
      }
    }
  },
  computed: {},
  methods: {
      // 支付卡
      choosePay() {
        this.active = "container1";
      },
      // 收款卡
      chooseReceivable() {
        this.active = "container2";
      },
      // 添加支付卡
      goAddPayCard() {
        this.$router.push("/addpaycard");
      },
      // 添加收款卡
      goAddReceivableCard() {
        this.$router.push("/addreceivablecard");
      },
      // 修改银行卡
      goModifyCard() {
        this.$router.push("/modifycard");
      },
      // 隐藏银行卡号 四位
      getNum(num) {
        return "****"+" "+num.substr(num.length-4);
      },
      // 支付
      payCard() {
        if(this.remark == undefined){
          this.popupVisible = false;
        }else if(this.remark == 1){
          this.popupVisible = true;
        }
      },
      // 关闭弹框
      closePopup() {
        this.popupVisible = false;
      },
      // 忘记密码弹框
      forgetPopup() {
        this.popupVisiblego = true;
      },
      // 忘记密码弹框中的确定按钮
      goSure() {
        this.popupVisiblego = false;
      },
      // 密码错误弹框
      prompt() {
        this.popupVisibleDiff = true;
      },
      //密码错误弹框里的取消按钮
      goCancel() {
        this.popupVisible = false;
        this.popupVisibleDiff = false;
      },
       //密码错误弹框里的重新输入按钮
      goReinput() {
        this.$refs.pay.clearPasswordHandle();
        this.popupVisibleDiff = false;
      }
  },
  created () {
    this.remark = this.$route.query.remark;
    let token = localStorage.getItem("token");
    // 获取支付卡
    this.baseJs.ajaxReq("/jikeyou/api/getPayCard",{},"get",token)
    .then(res => {
      // console.log(res);
      if(res.code === "200"){
        this.bankList =res.data;
        if(this.bankList.length === 0){
          this.isShow = true;
        }else{
          this.isShow = false;
        }
        this.bankLength = res.data.length;
      }
    })
    .catch(err => {
      console.log(err);
    });
    bus.$on('changeActive',(data) => {
      this.active = data;
      console.log(this.active)
    });
    // 获取收款卡
    this.baseJs.ajaxReq("/jikeyou/api/getIncomeCard",{},"get",token)
    .then(res => {
      // console.log(res);
      if(res.code === "200"){
        this.incomeCardList = res.data;
        // 判断是否已经添加过收款卡
        if(this.incomeCardList.length === 0){
          this.$router.push("/addreceivablecard");
          this.isAdd = false;
        }else{
          this.isAdd = true;
        };
      }
    })
    .catch(err => {
      console.log(err);
    });
  },
  mounted () {},
}
</script>
<style scoped>
    @import '../../assets/css/card.css';
</style>