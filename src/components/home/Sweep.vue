<template>
  <div class="sweep">
      <Swiper>
          <HeaderTop title="扫码收款"/>
          <div class="money" v-if="isSure">
              <p>收款金额（元）</p>
              <input type="text" placeholder="请输入收款金额" v-model="scanReceiptNum" readonly onfocus="this.blur()"/>
          </div>
          <!-- 计算器 -->
          <div class="calculator" v-if="isSure">
              <ul>
                <li class="calculator-item"
                      :class="item.text===3?'num-three':''"
                      v-for="(item,index) in calculatorContent"
                      :key="index"
                      @click="triggerEvent(item.type,item.text)">
                <span>{{item.text}}</span> 
                </li>
			        </ul>
              <div class="sure" @click="goSure">确认</div>
          </div>
          <div id="qrCode" ref="qrCodeDiv"></div> 
      </Swiper>
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import HeaderTop from '../public/HeaderTop'
import {calculatorContent} from '../../assets/js/config';
import QRCode from 'qrcodejs2';
export default {
 name: "",
  data () {
    return {
        scanReceiptNum: "",
        calculatorContent: "",
        // prevNumber: "",
        isSure: true
    }
  },
  components: {
      Swiper,
      HeaderTop
  },
  computed: {},
  watch: {},
  methods: {
    triggerEvent(type,text) {
      if (type==='sign') {
        this.operatorEvent(text)
      } else if (type==='number') {
        this.passValue(text)
      } else {
        this.functionalEvent(text)
      }
    },
    passValue(num) {
      this.scanReceiptNum += String(num);
    },
    operatorEvent(operator) {
      if (operator === '=') {
        this.calculationEvent(this.operator)
      } else {
        this.keepOperator(operator);
      }
    },
    keepOperator(operator){
      this.prevNumber = this.scanReceiptNum;
      this.scanReceiptNum = '';
      this.operator = operator
    },
    calculationEvent(operator) {
      switch (operator) {
        case '+': this.scanReceiptNum= String((+this.prevNumber+(+this.scanReceiptNum)).toFixed(2));break;
        case '-': this.scanReceiptNum= String((+this.prevNumber-(+this.scanReceiptNum)).toFixed(2));break;
        case '×': this.scanReceiptNum= String((+this.prevNumber*(+this.scanReceiptNum)).toFixed(2));break;
        case '/': this.scanReceiptNum= String((+this.prevNumber/(+this.scanReceiptNum)).toFixed(2));break;
      }
    },
    functionalEvent(text) {
      if (text === '清除') {
        this.scanReceiptNum = '';
        this.operator = ''
      } else {
        this.scanReceiptNum = this.scanReceiptNum.substr(0,this.scanReceiptNum.length-1)
      }
    },
    bindQRCode() {
      new QRCode(this.$refs.qrCodeDiv, {
          text: this.scanReceiptNum,
          // width: 200,
          // height: 200,
          colorDark: "#333", //二维码颜色
          colorLight: "#fff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      })
    },
    // 点击确定
    goSure() {
      this.isSure = false;
      this.bindQRCode();
    }
  },
  created () {
    this.calculatorContent = calculatorContent;
  },
  mounted () {},
}
</script>
<style scoped>
@import '../../assets/css/sweep.css';
</style>