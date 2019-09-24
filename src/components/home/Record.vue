<template>
  <div class="record">
      <Swiper>
          <HeaderTop title="交易记录"/>
          <div class="record_detail" v-if="isRecord">
              <p class="time">2019年8月</p>
              <ul>
                  <li>
                      <div class="left">
                          <img src="../../assets/images/home/type_1.png" alt=""/>
                          <div>
                              <p>扫码收款</p>
                              <span>8月10日 14:56</span>
                          </div>
                      </div>
                      <div class="right">
                        100.00
                      </div>
                  </li>
                  <li>
                      <div class="left">
                          <img src="../../assets/images/home/type_1.png" alt=""/>
                          <div>
                              <p>扫码收款</p>
                              <span>8月10日 14:56</span>
                          </div>
                      </div>
                      <div class="right">
                        100.00
                      </div>
                  </li>
              </ul>
          </div>
          <div class="nothing" v-if="!isRecord">
              暂无交易记录
          </div>
      </Swiper>    
  </div>
</template>

<script>
import HeaderTop from '../public/HeaderTop'
import Swiper from '../public/Swiper'
export default {
 name: "",
  data () {
    return {
        isRecord: false
    }
  },
  components: {
      HeaderTop,
      Swiper
  },
  computed: {},
  watch: {},
  methods: {},
  created () {
      let token = localStorage.getItem("token");
      this.baseJs.ajaxReq("/jikeyou/api/getTransactionRecord",{},"get",token)
      .then(res => {
        //   console.log(res);
          if(res.code === "200"){
              if(res.data.length === 0){
                  this.isRecord = false;
              }else{
                  this.isRecord = true;
              }
          }
      })
      .catch(err => {
          console.log(err);
      })
  },
  mounted () {},
}
</script>
<style scoped>
.record{
    width: 100%;
    height: 100%;
}
.record .record_detail{
    font-size: .22rem;
    margin: 0 .4rem;
    margin-top: .5rem;
}
.record .record_detail .time{
    width: 1.42rem;
	height: .5rem;
	background: #2480a6;
	border-radius: .1rem;
    line-height: .5rem;
    text-align: center;
    color: #fff;
    margin-bottom: .4rem;
}
.record .record_detail ul li{
    display: flex;
    margin: .2rem 0;
    padding-bottom: .3rem;
    border-bottom: 1px solid #f1f1f1;
}
.record .record_detail ul li .left{
    flex: 2;
}
.record .record_detail ul li .left img{
    width: .6rem;
    height: .6rem;
    margin-bottom: .04rem;
}
.record .record_detail ul li .left div{
    display: inline-block;
    margin-left: .5rem;
}
.record .record_detail ul li .left div p{
    font-size: .28rem;
    margin-bottom: .1rem;
}
.record .record_detail ul li .left div span{
    color: #999;
}
.record .record_detail ul li .right{
    flex: 1;
    text-align: right;
    font-size: .38rem;
    height: .8rem;
    line-height: .8rem;
}
.record .nothing{
    font-size: .36rem;
    text-align: center;
    margin-top: 3rem;
    color: #999;
}
</style>