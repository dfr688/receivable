<template>
  <div class="btn" @click="handle">
      {{ text }}
  </div>
</template>

<script>
export default {
 name: "",
  data () {
    return {
    }
  },
  props: [
      "text"
  ],
  components: {},
  computed: {},
  watch: {},
  methods: {
      handle() {
          this.$emit("stepTo");
          this.$emit("stepTwo");
          this.$emit("goNextStep");
          this.$emit("submitIncomeCard");
          this.$emit("sureWithdraw");
          this.$emit("goPay");
          this.$emit("goFinish");
      }
  },
  created () {},
  mounted () {},
}
</script>
<style scoped>
/* 按钮水波纹效果 */
.btn {
    position: relative;
    /* 隐藏溢出的径向渐变背景 */
    overflow: hidden;
    color: #fefefe;
    font-size: .3rem;
    width: 6.55rem;
    text-align: center;
    height: .74rem;
    line-height: .74rem;
	background-image: linear-gradient(#2480a6, #2480a6), linear-gradient(#fd7663,#fd7663);
	box-shadow: 0px 0px 7px 0px rgba(51, 51, 51, 0.2);
    border-radius: .1rem;
    margin: 0 auto;
}
.btn:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    /* 设置径向渐变 */
    background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
}
.btn:active:after {
    transform: scale(0, 0);
    opacity: .3;
    /* 设置初始状态 */
    transition: 0s;
}
</style>