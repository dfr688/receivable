<template>
  <div class="modifyCard">
      <Swiper>
          <HeaderTop title="收款账户"/>
          <ul>
              <li>
                  <div class="left">
                      姓名
                  </div>
                  <div class="right">
                      <input type="text" placeholder="请输入持卡人姓名" v-model="name"/>
                  </div>
              </li>
              <li>
                  <div class="left">
                      身份证号
                  </div>
                  <div class="right">
                      <input type="text" placeholder="请输入持卡人身份证号码" v-model="idNumber"/>
                  </div>
              </li>
              <li>
                  <div class="left">
                      卡号
                  </div>
                  <div class="right">
                      <input type="text" placeholder="请输入银行卡卡号" v-model="cardNumber"/>
                  </div>
              </li>
              <li>
                  <div class="left">
                      所属银行
                  </div>
                  <div class="right">
                      <input type="text" placeholder="请选择银行名称" v-model="bank"/>
                  </div>
              </li>
              <li>
                  <div class="left">
                      银行所在地
                  </div>
                  <div class="right">
                      <input type="text" placeholder="请选择银行所在地" v-model="bankPlace"/>
                  </div>
              </li>
              <li>
                  <div class="left">
                      手机号
                  </div>
                  <div class="right">
                      <input type="text" placeholder="请输入银行预留手机号" v-model="phone"/>
                  </div>
              </li>
          </ul>
          <Button text="修改"/>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import HeaderTop from '../public/HeaderTop'
import Button from '../public/Button'
export default {
 name: "",
  data () {
    return {
        name: "张三",
        idNumber: "**** **** **** 5284",
        cardNumber: "**** **** **** 5284",
        bank: "中国农业银行",
        bankPlace: "安徽 蚌埠",
        phone: "19956362512"
    }
  },
  components: {
      Swiper,
      HeaderTop,
      Button
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {},
}
</script>
<style scoped>
.modifyCard{
    width: 100%;
    height: 100%;
}
.modifyCard ul{
    margin: 0 .4rem;
    margin-top: .8rem;
    margin-bottom: 1rem;
}
.modifyCard ul li{
    display: flex;
    font-size: .3rem;
    margin-bottom: .5rem;
    padding-bottom: .3rem;
    border-bottom: 1px solid #f1f1f1;
}
.modifyCard ul li .left{
    flex: 1;
}
.modifyCard ul li .right{
    flex: 1;
}
.modifyCard ul li .right input{
    text-align: right;
    font-size: .3rem;
    color: #333;
}
</style>