<template>
  <div class="headerCom">
      <div class="top">
           <i class="back" @click="goBack"></i>
           <ul>
             <li @click="chooseOne">
                 <slot name="tit_one"></slot>
                <span :class="{line_one:isShow,line_three:!isShow}" v-if="isChoose"></span>
             </li>
             <li @click="chooseTwo">
                <slot name="tit_two"></slot>
                <span :class="{line_two:isShow,line_four:!isShow}" v-if="!isChoose"></span>
             </li>
           </ul>
        </div>
  </div>
</template>

<script>
export default {
 name: "",
  data () {
    return {
        isChoose: true
    }
  },
  props: [
      "active",
      "isShow"
  ],
  watch: {
    active(newV,oldV) {
      if(newV === "container1"){
        this.isChoose = true;
      }else{
        this.isChoose = false;
      }
    }
  },
  components: {},
  computed: {},
  methods: {
    goBack() {
        this.$router.push("/home");
    },
    chooseOne() {
        this.isChoose = true;
        this.$emit("choosePay");
        this.$emit("chooseQuota");
    },
    chooseTwo() {
        this.isChoose = false;
        this.$emit("chooseReceivable");
        this.$emit("chooseRate");
    }
  },
  created () {},
  mounted () {},
}
</script>
<style scoped>
.headerCom .top{
    width: 100%;
    height: 1.5rem;
    background: #2480a6;
    font-size: .32rem;
    color: #fff;
    position: relative;
}
.headerCom .top .back{
    position: absolute;
    top: .52rem;
    left: 0;
    width: .8rem;
    height: .8rem;
    background: url(../../assets/images/public/back.png) no-repeat center;
    background-size: 20%;
}
.headerCom .top ul{
    display: flex;
    height: 100%;
    margin: 0 1rem;
}
.headerCom .top ul li{
    flex: 1;
    text-align: right;
    margin-top: .7rem;
    position: relative;
}
.headerCom .top ul li:last-child{
    text-align: left;
    margin-left: 1rem;
}
.headerCom .top ul li span{
    position: absolute;
    bottom: 0;
    width: 1.09rem;
	height: .05rem;
	background: #fff;
	border-radius: .02rem;
}
.headerCom .top ul li .line_one{
    left: 1.22rem;
}
.headerCom .top ul li .line_two{
    right: 1.22rem;
}
.headerCom .top ul li .line_three{
    left: 1.38rem;
}
.headerCom .top ul li .line_four{
     right: 1.38rem;
}
</style>