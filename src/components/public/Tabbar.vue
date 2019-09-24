<template>
  <div class="tabbar">
      <ul>
          <li class="home" @click="goHome">
              <span :class={selected:isSelected}></span>
              <p>首页</p>
          </li>
          <li class="my" @click="goMy">
              <span :class={selected:!isSelected}></span>
              <p>我的</p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
 name: "Tabbar",
  data () {
    return {
    }
  },
  props: [
      "isSelected"
  ],
  components: {},
  computed: {},
  watch: {},
  methods: {
    //去首页
    goHome() {
        this.$router.push("/home");
    },
    // 去我的页面
    goMy() {
        this.$router.push("/my");
    }
  },
  created () {},
  mounted () {},
}
</script>
<style scoped>
    .tabbar{
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #fff;
	    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
    }
    .tabbar ul{
        display: flex;
    }
    .tabbar ul li{
        flex: 1;
        text-align: center;
        color: #b1b9dc;
        font-size: .22rem;
        padding: .12rem 0;
    }
    .tabbar ul li span{
        display: inline-block;
        width: .4rem;
        height: .39rem;
    }
    .tabbar ul .home span{
        background: url(../../assets/images/tabbar/home.png) no-repeat left top;
        background-size: 100%;
    }
    .tabbar ul .home span.selected{
        background: url(../../assets/images/tabbar/home_selected.png) no-repeat left top;
        background-size: 100%;
    }
    .tabbar ul .my span{
        background: url(../../assets/images/tabbar/my.png) no-repeat left top;
        background-size: 100%;
    }
    .tabbar ul .my span.selected{
        background: url(../../assets/images/tabbar/my_selected.png) no-repeat left top;
        background-size: 100%;
    }
</style>