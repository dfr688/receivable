<template>
  <div class="addPayCard">
      <Swiper>
          <HeaderTop title="添加支付卡"/>
          <ul>
              <li>
                  <div class="left">
                      持卡人
                  </div>
                  <div class="right">
                      <input type="text" placeholder="请输入持卡人姓名" v-model="name"/>
                  </div>
              </li>
              <li>
                  <div class="left">
                      卡号
                  </div>
                  <div class="right">
                      <input type="text" placeholder="请输入信用卡卡号" v-model="cardNumber"/>
                  </div>
              </li>
              <li>
                  <div class="left">
                      所属银行
                  </div>
                  <div class="right">
                    <select v-model="selected">
                        <option disabled value="">请选择所属银行</option>
                        <option>中国农业银行</option>
                        <option>兴业银行</option>
                        <option>招商银行</option>
                    </select>
                    <i></i>
                  </div>
              </li>
          </ul>
          <div class="next_btn" v-if="!isWrite" @click="goNext">
              下一步
          </div>
          <Button text="下一步" v-if="isWrite" @goNextStep="goNextStep"/>
      </Swiper>     
  </div>
</template>

<script>
import Swiper from "../public/Swiper"
import HeaderTop from "../public/HeaderTop"
import Button from '../public/Button'
import { Toast } from 'mint-ui';
import Qs from 'qs'
export default {
 name: "",
  data () {
    return {
        name: "",
        cardNumber: "",
        isWrite: false,
        selected: "",
        selectedIndex: ""
    }
  },
  components: {
      Swiper,
      HeaderTop,
      Button
  },
  computed: {},
  watch: {
      name(newV,oldV){
            if(newV !== ""){
                if(this.cardNumber !==""){
                    if(this.selected !==""){
                        this.isWrite = true;
                    }
                }
            }else{
                this.isWrite = false;
            }
      },
      cardNumber(newV,oldV){
            if(newV !== ""){
                if(this.name !== ""){
                    if(this.selected !==""){
                        this.isWrite = true;
                    }
                }
            }else{
                this.isWrite = false;
            }
      },
      selected(newV,oldV){
          if(newV !== ""){
                if(this.name !== ""){
                    if(this.cardNumber !==""){
                        this.isWrite = true;
                    }
                }
            }else{
                this.isWrite = false;
            }
      }
  },
  methods: {
    //下一步
    goNext() {
        Toast({
            message: '请补充完整信息',
            duration: 1000
        });
    },
    goNextStep() {
        if(!/^[\u4e00-\u9fa5]{2,5}$/.test(this.name)){
            Toast({
                message: '请输入正确的姓名！',
                duration: 1000
            });
        }else if(!/^([1-9]{1})(\d{14}|\d{18})$/.test(this.cardNumber)){
            Toast({
                message: '请输入正确的卡号！',
                duration: 1000
            });
        }else{
            if(this.selected === "中国农业银行"){
                this.selectedIndex = 1;
            }
            if(this.selected === "兴业银行"){
                this.selectedIndex = 2;
            }
            if(this.selected === "招商银行"){
                this.selectedIndex = 3;
            }
            let token = localStorage.getItem("token");
            let data = {
                realName: this.name,
                cardNo: this.cardNumber,
                bankType: this.selectedIndex
            }
            this.baseJs.ajaxReq("/jikeyou/api/addPayCard",Qs.stringify(data),"post",token)
            .then(res => {
                // console.log(res);
                if(res.code === "200"){
                    Toast({
                        message: res.msg,
                        duration: 1000
                    });
                    this.$router.push("/card");
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
.addPayCard{
    width: 100%;
    height: 100%;
}
.addPayCard ul{
    margin: 0 .4rem;
    margin-top: .8rem;
    margin-bottom: 1rem;
}
.addPayCard ul li{
    font-size: .3rem;
    display: flex;
    margin-bottom: .5rem;
    padding-bottom: .3rem;
    border-bottom: 1px solid #f1f1f1;
}
.addPayCard ul li .left{
    flex: 1;
}
.addPayCard ul li .right{
    flex: 1;
    text-align: right;
}
.addPayCard ul li input{
    font-size: .3rem;
    text-align: right;
}
.addPayCard ul li .right select{
    border: none;
    font-size: .3rem;
    appearance:none; /*清除select默认样式 */
    -moz-appearance:none;
    -webkit-appearance:none;
    direction: rtl;
}
.addPayCard ul li .right i{
    display: inline-block;
    width: .13rem;
    height: .24rem;
    background: url(../../assets/images/home/rocket.png) no-repeat left top;
    background-size: 100%;
    margin-bottom: -.03rem;
}
.addPayCard .next_btn{
    width: 6.55rem;
	height: .74rem;
	background-image: linear-gradient(#dbdbdb, #dbdbdb), linear-gradient(#70c0e3, #70c0e3);
	box-shadow: 0px 0px 7px 0px rgba(51, 51, 51, 0.2);
	border-radius: .1rem;
    line-height: .74rem;
    text-align: center;
    font-size: .32rem;
    color: #fff;
    margin: 0 auto;
}
</style>