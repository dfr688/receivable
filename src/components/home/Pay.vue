<template>
  <div class="pay-tool">
    <div class="pay-tool-title border-bottom">
      <span class="pay-close" @click="backHandle">×</span>
      <span class="pay-title">请输入交易密码</span>
    </div>
    <div class="pay-tool-content">
      <div class="pay-tool-inputs">
        <div class="item" v-for="(i, index) in items" :key="index">
          <span class="icon_dot" v-if="password[i]"></span>
        </div>
      </div>
      <div class="pay-tool-link">
        <div class="link" @click="forgotPassword()">忘记密码？</div>
      </div>
    </div>
    <div class="pay-tool-keyboard">
      <ul>
        <li @click="keyUpHandle($event, index)" v-for="(val, index) in keys" :key="index">
          {{ val }}
        </li>
        <li class="del" @click="delHandle"><span class="icon-del">删除</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
export default {
  data () {
    return {
      items: [0, 1, 2, 3, 4, 5],
      keys: keys(),
      password: '',
    }
  },
  methods: {
    backHandle () { // 关闭密码输入
      this.clearPasswordHandle();
      this.$emit("closePopup");  // 返回时清除password
    },
    forgotPassword () { // 忘记密码
        this.$emit("forgetPopup")
    },
    keyUpHandle (e, index) { // 更新密码
      // let text = e.currentTarget.innerText
      // console.log(this.keys[index].toString())
      let text = this.keys[index].toString()
      let len = this.password.length
      if (!text || len >= 6) return
      this.password = this.password + text
      this.passwordData() // 为6位输出密码
    },
    delHandle () { // 删除密码
      if (this.password.length <= 0) return false
      // this.password.shift()
      this.password = this.password.substring(0, this.password.length-1)
    },
    passwordData () { // 输出密码
      // console.log(parseInt(this.password.join(' ').replace(/\s/g, '')))
      // console.log(this.password)
      this.$emit('passwordData', this.password)
    },
    clearPasswordHandle: function () { // 清空密码
      this.password = ''
    }
  },
  watch: {
      password(newV,oldV){
          if(newV.length == 6){
            this.$emit("prompt");
          }
      }
  }
}
</script>
<style>
.pay-tool {
  width: 100%;
  font-size: .45rem;
  height: 8rem;
  background-color: #fff;
  overflow: hidden;
}
.pay-tool-title {
  width: 100%;
  height: .9rem;
  border-bottom: 1px solid #f7f7f7;
  line-height: .9rem;
  text-align: center;
  overflow: hidden;
  position: relative;
}
.pay-tool-title .pay-close {
  font-size: .5rem;
  position: absolute;
  display: inline-block;
  width: 1rem;
  height: .9rem;
  left: 0;
}
.pay-tool-title .pay-title {
  font-size: 0.35rem;
  color: #323333;
}
.pay-tool-content .pay-tool-inputs {
  width: 6rem;
  height: 1rem;
  margin: .6rem .75rem 0 .75rem;
  border: 1px solid #b9b9b9;
  border-radius: 5px;
  box-shadow: 0 0 1px #e6e6e6;
  display: flex;
}
.pay-tool-content .pay-tool-inputs .item {
  width: 16.66666666%;
  height: 1rem;
  border-right: 1px solid #b9b9b9;
  line-height: 1rem;
  text-align: center;
}
.pay-tool-content .pay-tool-inputs .item:last-child {
  border-right: none;
}
.pay-tool-content .pay-tool-inputs .item .icon_dot {
  display: inline-block;
  width: .2rem;
  height: .2rem;
  background: #323333;
  border-radius: 20px;
  background-size: cover;
}
.pay-tool-content .pay-tool-link {
  padding: 0.53333333rem 0.8rem 0;
  text-align: right;
}
.pay-tool-content .pay-tool-link .link {
  font-size: 0.26rem;
  color: #3c8cfb;
}
.pay-tool .pay-tool-keyboard {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.pay-tool .pay-tool-keyboard ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.pay-tool .pay-tool-keyboard ul li {
  width: 33%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-right: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  font-size: 0.4rem;
  font-weight: 500;
  list-style: none;
}
.pay-tool .pay-tool-keyboard ul li:nth-child(1),
.pay-tool .pay-tool-keyboard ul li:nth-child(2),
.pay-tool .pay-tool-keyboard ul li:nth-child(3) {
  border-top: 1px solid #eee;
}
.pay-tool .pay-tool-keyboard ul li:nth-child(3),
.pay-tool .pay-tool-keyboard ul li:nth-child(6),
.pay-tool .pay-tool-keyboard ul li:nth-child(9),
.pay-tool .pay-tool-keyboard ul li:nth-child(12) {
  border-right: none;
}
.pay-tool .pay-tool-keyboard ul li:nth-child(10),
.pay-tool .pay-tool-keyboard ul li:nth-child(11),
.pay-tool .pay-tool-keyboard ul li:nth-child(12) {
  border-bottom: none;
}
.pay-tool .pay-tool-keyboard ul li:nth-child(10),
.pay-tool .pay-tool-keyboard ul li:nth-child(12){
  background-color: #d1d4dd;
}
.pay-tool .pay-tool-keyboard ul li:nth-child(12):active {
  background-color: #fff;
}
.pay-tool .pay-tool-keyboard ul .del .icon-del {
  line-height: 1rem;
  display: block;
}
</style>