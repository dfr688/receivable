<template>
  <div class="userLevel">
      <Swiper>
          <HeaderTop title="用户等级"/>
          <ul>
              <li @click="goBasicUser">
                  <div>
                      基础用户
                  </div>
                  <p>已认证<i></i></p>
              </li>
              <li @click="goIdentify">
                  <div>
                      认证用户
                  </div>
                  <p class="uncertified" v-if="isConfirm">未认证<i></i></p>
                  <p v-if="!isConfirm">已认证<i></i></p>
              </li>
          </ul>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import HeaderTop from '../public/HeaderTop'
export default {
 name: "",
  data () {
    return {
        isConfirm: true,
    }
  },
  components: {
      Swiper,
      HeaderTop
  },
  computed: {},
  watch: {},
  methods: {
      goBasicUser() {
        this.$router.push("/basicuser");   
      },
      goIdentify() {
          this.$router.push("/identify");
      }
  },
  created () {
      let sign = localStorage.getItem("sign");
      if(sign == null){
          this.isConfirm = true;
      }else if(sign == 1){
          this.isConfirm = false;
      }
  },
  mounted () {},
}
</script>
<style scoped>
.userLevel{
    width: 100%;
    height: 100%;
}
.userLevel ul{
    margin: 0 .5rem;
    margin-top: 1rem;
}
.userLevel ul li{
    display: flex;
    font-size: .28rem;
    padding-bottom: .3rem;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: .4rem;
}
.userLevel ul li div{
    flex: 1;
}
.userLevel ul li p{
    flex: 1;
    text-align: right;
}
.userLevel ul li .uncertified{
    color: #e82222;
}
.userLevel ul li p i{
    display: inline-block;
    width: .13rem;
    height: .24rem;
    background: url(../../assets/images/home/rocket.png) no-repeat left top;
    background-size: 100%;
    margin-left: .4rem;
    margin-bottom: -.03rem;
}
</style>