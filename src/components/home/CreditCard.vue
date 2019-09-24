<template>
  <div class="creditCard">
      <Swiper>
          <HeaderTop title="信用卡收款"/>
          <div class="money">
              <p>收款金额（元）</p>
              <input type="tel" placeholder="请输入收款金额" v-model="amountMoney"/>
          </div>
          <ul>
              <li>
                  <div class="left">
                      <span>收款卡</span>
                      <p v-if="detail.bankCardNo !==undefined">{{ bank[detail.bankType - 1] }} ({{ getNum(detail.bankCardNo) }})</p>
                  </div>
                  <div class="right">
                      <!-- <i></i> -->
                  </div>
              </li>
              <li>
                  <div class="left">
                      <span>到帐方式</span>
                      <p>立即到账（费率0%+2.00）</p>
                  </div>
                  <div class="right">
                      <!-- <i></i> -->
                  </div>
              </li>
          </ul>
          <div class="btn_disable" v-if="isFill" @click="handlestep">
              下一步
          </div>
          <Button text="下一步" v-if="!isFill" @goPay="goPay"/>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import HeaderTop from '../public/HeaderTop'
import Button from '../public/Button'
import { Toast } from 'mint-ui';
const bank = ["中国农业银行","兴业银行","招商银行"]
export default {
 name: "",
  data () {
    return {
        amountMoney: "",
        isFill: true,
        detail: "",
        bank: bank
    }
  },
  components: {
      Swiper,
      HeaderTop,
      Button
  },
  computed: {},
  watch: {
      amountMoney(newV,oldV){
          if(newV ==="") {
              this.isFill = true;
          }else{
              this.isFill = false;
          }
      }
  },
  methods: {
      handlestep() {
        Toast({
            message: '请填写收款金额',
            duration: 1000
        });
    },
    // 跳转到下一步去支付
    goPay() {
        this.$router.push({name:"card",query:{remark:1}});
    },
    // 截取卡号后四位
    getNum(card) {
        return card.substr(card.length-4);
    }
  },
  created () {
    // 获取收款卡
    let token = localStorage.getItem("token");
    this.baseJs.ajaxReq("/jikeyou/api/getIncomeCard",{},"get",token)
    .then(res => {
      // console.log(res);
      if(res.code === "200"){
        this.detail = res.data[0];
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
.creditCard{
    width: 100%;
    height: 100%;
}
.creditCard .money{
    width: 100%;
    height: 3.46rem;
    background: #f9f9f9;
    text-align: center;
    padding-top: .5rem;
    box-sizing: border-box;
}
.creditCard .money p{
    font-size: .32rem;
    text-align: left;
    margin-left: .4rem;
}
.creditCard .money input{
    font-size: .5rem;
    text-align: center;
}
.creditCard ul{
    margin: 0 .4rem;
    margin-top: .6rem;
    margin-bottom: .8rem;
}
.creditCard ul li{
    font-size: .32rem;
    margin-bottom: .4rem;
    padding-bottom: .3rem;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
}
.creditCard ul li .left{
    flex: 2;
}
.creditCard ul li .left span{
    font-size: .22rem;
    color: #999;
}
.creditCard ul li .right{
    flex: 1;
    text-align: right;
    height: .84rem;
    line-height: 1.3rem;
}
.creditCard ul li .right i{
    display: inline-block;
    width: .13rem;
    height: .24rem;
    background: url(../../assets/images/home/rocket.png) no-repeat left top;
    background-size: 100%;
}
.creditCard .btn_disable{
    width: 6.55rem;
	height: .74rem;
	background-image: linear-gradient(#dbdbdb, #dbdbdb), linear-gradient(#70c0e3, #70c0e3);
	box-shadow: 0px 0px 7px 0px rgba(51, 51, 51, 0.2);
    border-radius: .1rem;
    margin: 0 auto;
    font-size: .32rem;
    color: #fff;
    text-align: center;
    line-height: .74rem;
}
</style>