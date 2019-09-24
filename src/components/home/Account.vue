<template>
  <div class="account">
      <Swiper>
          <HeaderTop title="提现"/>
          <div class="withdraw">
            <ul>
              <li :class="{Agricultural_Bank: 1===detail.bankType,Industrial_Bank:2===detail.bankType,China_Merchants_Bank:3===detail.bankType}" v-for="(detail,index) in accountDetail" :key="index">
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
            <div class="withdraw_balance">
                <p class="title">提现金额（元）</p>
                <div class="money">
                    <span>¥</span><input type="tel" v-model="allMoney"/>
                </div>
                <div class="useful">
                    <div>可用余额 <span>{{ availableMoney }}</span> 元</div>
                    <p @click="allWithdraw">全部提现</p>
                </div>
            </div>
          </div>
          <Button text="确认提现" @sureWithdraw="sureWithdraw"/>
      </Swiper>
  </div>
</template>

<script>
 import Swiper from '../public/Swiper'
 import HeaderTop from '../public/HeaderTop'
 import Button from '../public/Button'
 import { Toast } from 'mint-ui';
 import { MessageBox } from 'mint-ui';
 const bank = ["中国农业银行","兴业银行","招商银行"]
export default {
 name: "",
  data () {
    return {
      allMoney: "",
      availableMoney: "",
      accountDetail: "",
      bank: bank
    }
  },
  components: {
      Swiper,
      HeaderTop,
      Button
  },
  computed: {},
  watch: {},
  methods: {
    // 全部提现
    allWithdraw() {
      this.isChange = true;
      this.allMoney = this.availableMoney.toString();
    },
    // 确认提现
    sureWithdraw() {
      if(this.allMoney == ""){
        Toast({
          message: '请输入提现金额！',
          duration: 1000
        });
      }else if(this.availableMoney == 0){
        Toast({
          message: '可用余额不足！',
          duration: 1000
        });
      }else if(this.allMoney > this.availableMoney){
        Toast({
          message: '可用余额不足！',
          duration: 1000
        });
      }else{
        MessageBox.confirm('确定执行此操作?').then(action => {
          MessageBox.alert('提现失败').then(action => {
            this.$router.push("/home");
          }).catch(() => {
            // console.log(1);
          });
        }).catch(() => {
            // console.log(2);
        });
      }
    },
     // 隐藏银行卡号 四位
      getNum(num) {
        return "****"+" "+num.substr(num.length-4);
      }
  },
  created () {
    let token = localStorage.getItem("token");
    this.baseJs.ajaxReq("/jikeyou/api/getAccountBalance",{},"get",token)
    .then(res => {
      // console.log(res);
      if(res.code === "200"){
        this.availableMoney = res.data.balance;
      }
    })
    .catch(err => {
      console.log(err);
    });
    // 获取收款卡
    this.baseJs.ajaxReq("/jikeyou/api/getIncomeCard",{},"get",token)
    .then(res => {
      // console.log(res);
      if(res.code === "200"){
        this.accountDetail = res.data;
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
   @import '../../assets/css/account.css';
</style>