<template>
  <div class="basicUser">
      <Swiper>
          <HeaderTop title="基础用户"/>
          <ul>
              <li>
                  <p>姓名</p>
                  <p>{{ info.ownerName }}</p>
              </li>
              <li>
                  <p>身份证号</p>
                  <p v-if="info.idCardNo !==undefined">{{ getNum(info.idCardNo) }}</p>
              </li>
              <li>
                  <p>收款账户</p>
                  <p>已完善<!-- <i></i> --></p>
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
        info: ""
    }
  },
  components: {
      Swiper,
      HeaderTop
  },
  computed: {},
  watch: {},
  methods: {
      //隐藏身份证号   
      getNum(num) {
        return num.substr(num.length-4) + " " + "****" + " " + num.substr(num.length-4);
      }
  },
  created () {
      let token = localStorage.getItem("token");
      this.baseJs.ajaxReq("/jikeyou/api/getIncomeCard",{},"get",token)
      .then(res => {
        // console.log(res);
        if(res.code === "200"){
            this.info = res.data[0];
            // console.log(this.info);
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
.basicUser{
    width: 100%;
    height: 100%;
}
.basicUser ul{
    margin: 0 .4rem;
    margin-top: 1rem;
}
.basicUser ul li{
    font-size: .28rem;
    display: flex;
    margin-bottom: .5rem;
    padding-bottom: .3rem;
    border-bottom: 1px solid #f1f1f1;
}
.basicUser ul li p{
    flex: 1;
}
.basicUser ul li p:last-child{
    text-align: right;
}
.basicUser ul li p i{
    display: inline-block;
    width: .13rem;
    height: .24rem;
    background: url(../../assets/images/home/rocket.png) no-repeat left top;
    background-size: 100%;
    margin-left: .2rem;
    margin-bottom: -.04rem;
}
</style>