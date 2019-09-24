<template>
  <div class="addReceivableCard">
      <Swiper>
          <HeaderTop title="添加收款卡"/>
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
                      <input type="text" placeholder="请输入银行卡卡号" v-model="bankNumber"/>
                  </div>
              </li>
              <li>
                  <div class="left">
                      所属银行
                  </div>
                  <div class="right">
                    <select v-model="bank">
                        <option disabled value="">请选择所属银行</option>
                        <option>中国农业银行</option>
                        <option>兴业银行</option>
                        <option>招商银行</option>
                    </select>
                    <i></i>
                  </div>
              </li>
              <li>
                  <div class="left">
                      银行所在地
                  </div>
                  <div class="right">
                      <input type="text" placeholder="请填写银行所在地" v-model="bankPlace"/>
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
              <li class="code">
                  <div class="left">
                      验证码
                  </div>
                  <div class="right">
                      <input type="text" placeholder="请输入验证码" v-model="code"/>
                      <div>
                          <VcodeDiff :phone="phone"/>
                      </div>
                  </div>
              </li>
          </ul>
          <Button text="提交" @submitIncomeCard="submitIncomeCard"/>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import HeaderTop from '../public/HeaderTop'
import Button from '../public/Button'
import VcodeDiff from './VcodeDiff'
import { Toast } from 'mint-ui';
import bus from '../../assets/js/bus.js'
import Qs from 'qs'
export default {
 name: "",
  data () {
    return {
        name: "",
        idNumber: "",
        bankNumber: "",
        bank: "",
        bankPlace: "",
        phone: "",
        code: "",
        bankIndex: ""
    }
  },
  components: {
      Swiper,
      HeaderTop,
      Button,
      VcodeDiff
  },
  computed: {},
  watch: {},
  methods: {
    //提交
    submitIncomeCard() {
        if(this.name === ""){
            Toast({
                message: '请输入持卡人姓名',
                duration: 1000
            });
        }else if(this.idNumber === ""){
            Toast({
                message: '请输入持卡人身份证号',
                duration: 1000
            });
        }else if(this.bankNumber === ""){
            Toast({
                message: '请输入银行卡卡号',
                duration: 1000
            });
        }else if(this.bank === ""){
            Toast({
                message: '请选择所属银行',
                duration: 1000
            });
        }else if(this.bankPlace === ""){
            Toast({
                message: '请填写银行所在地',
                duration: 1000
            });
        }else if(this.phone === ""){
            Toast({
                message: '请输入手机号',
                duration: 1000
            });
        }else if(this.code === ""){
            Toast({
                message: '请输入验证码',
                duration: 1000
            });
        }else{
            let token = localStorage.getItem("token");
            if(this.bank === "中国农业银行"){
                this.bankIndex = 1;
            };
            if(this.bank === "兴业银行"){
                this.bankIndex = 2;
            };
            if(this.bank === "招商银行"){
                this.bankIndex = 3;
            };
            let data = {
                realName: this.name,
                idCardNo: this.idNumber,
                bankCardNo: this.bankNumber,
                bankType: this.bankIndex,
                bankAddress: this.bankPlace,
                phone: this.phone,
                smsCode: this.code
            };
            this.baseJs.ajaxReq("/jikeyou/api/addIncomeCard",Qs.stringify(data),"post",token)
            .then(res => {
                // console.log(res);
                if(res.code === "200"){
                    Toast({
                        message: res.msg,
                        duration: 1000
                    });
                    this.$router.push("/card");
                    bus.$emit('changeActive','container2');
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
.addReceivableCard{
    width: 100%;
    height: 100%;
}
.addReceivableCard ul{
    margin: 0 .4rem;
    margin-top: .8rem;
    margin-bottom: 1rem;
}
.addReceivableCard ul li{
    display: flex;
    font-size: .3rem;
    margin-bottom: .5rem;
    padding-bottom: .3rem;
    border-bottom: 1px solid #f1f1f1;
}
.addReceivableCard ul li .left{
    flex: 1;
}
.addReceivableCard ul li .right{
    flex: 1;
    text-align: right;
}
.addReceivableCard ul li .right input{
    text-align: right;
    font-size: .3rem;
}
.addReceivableCard ul li .right select{
    border: none;
    font-size: .3rem;
    appearance:none; /*清除select默认样式 */
    -moz-appearance:none;
    -webkit-appearance:none;
    direction: rtl;
}
.addReceivableCard ul li .right i{
    display: inline-block;
    width: .13rem;
    height: .24rem;
    background: url(../../assets/images/home/rocket.png) no-repeat left top;
    background-size: 100%;
    margin-bottom: -.03rem;
}
.addReceivableCard ul .code .right{
    display: flex;
}
.addReceivableCard ul .code .right input{
    width: 2.2rem;
    margin-right: .6rem;
    color: #333;
}
</style>