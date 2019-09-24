<template>
  <div class="identify">
      <Swiper>
          <div class="top">
              <i @click="goBack"></i>认证用户
          </div>
          <div class="step">
              <div :class="{stepOne:isSee,stepTwo:isTrue,stepThree:isShow}"></div>
          </div>
          <div class="step_detail step_one" v-if="isSee">
              <div class="img" @click="uploadHeadImg1">
                  <img :src="userInfo.avatarPhoto" alt=""/>
                  <input type="file" accept="image/*" @change="handleFile(1)" class="hiddenInput1"/>
              </div>
              <Button text="下一步" @stepTo="stepTo"/>
          </div>
          <div class="step_detail step_two" v-if="isTrue">
              <div class="img" @click="uploadHeadImg2">
                  <img :src="userInfo.avatarOne" alt=""/>
                  <input type="file" accept="image/*" @change="handleFile(2)" class="hiddenInput2"/>
              </div>
              <div class="img img1" @click="uploadHeadImg3">
                  <img :src="userInfo.avatarTwo" alt=""/>
                  <input type="file" accept="image/*" @change="handleFile(3)" class="hiddenInput3"/>
              </div>
              <Button text="下一步" @stepTwo="stepTwo"/>
          </div>
          <div class="step_detail step_three" v-if="isShow">
              <div class="img" @click="uploadHeadImg4">
                  <img :src="userInfo.avatarBank" alt=""/>
                  <input type="file" accept="image/*" @change="handleFile(4)" class="hiddenInput4"/>
              </div>
              <Button text="完成" @goFinish="goFinish"/>
          </div>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../public/Swiper'
import Button from '../public/Button'
import { Toast } from 'mint-ui';
export default {
 name: "",
  data () {
    return {
        isSee: true,
        isTrue: false,
        isShow: false,
        userInfo: {
            avatarPhoto: "",
            avatarOne: "",
            avatarTwo: "",
            avatarBank: "",
        },
        urls: [] 
    }
  },
  components: {
      Swiper,
      Button
  },
  computed: {},
  watch: {},
  methods: {
      goBack() {
          this.$router.go(-1);
      },
      stepTo() {
          if(this.userInfo.avatarPhoto ==""){
            Toast({
                message: '请上传图片',
                duration: 1000
            });
          }else{
            this.isSee = false;
            this.isTrue = true;
          }
      },
      stepTwo() {
          if(this.userInfo.avatarOne =="" || this.userInfo.avatarTwo == ""){
            Toast({
                message: '请上传图片',
                duration: 1000
            });
          }else{
              this.isTrue = false;
              this.isShow = true;
          }
      },
      goFinish() {
          if(this.userInfo.avatarBank ==""){
            Toast({
                message: '请上传图片',
                duration: 1000
            });
          }else{
            Toast({
                message: '认证成功',
                duration: 1000
            });
            if(this.urls.length !== 0){
                localStorage.setItem("sign",1);
                this.$router.push("/userlevel");
            }
          }
      },
      // 打开图片上传
    uploadHeadImg1: function () {
        this.$el.querySelector('.hiddenInput1').click();
    },
    uploadHeadImg2: function () {
        this.$el.querySelector('.hiddenInput2').click();
    },
    uploadHeadImg3: function () {
        this.$el.querySelector('.hiddenInput3').click();
    },
    uploadHeadImg4: function () {
        this.$el.querySelector('.hiddenInput4').click();
    },
     // 将头像显示
    handleFile: function (step) {
        var e = window.event;
        // if (e.target.files.length === 0) return
        if(step === 1){
            let $target = e.target || e.srcElement
            let file = $target.files[0];
            var reader = new FileReader()
            reader.onload = (data) => {
                let res = data.target || data.srcElement
                this.userInfo.avatarPhoto = res.result
            }
            reader.readAsDataURL(file);
            // 把图片转换成file类型
            let param = new FormData();
            param.append('file', file);
            //console.log(param);
            // 发送请求
            let token = localStorage.getItem("token");
            this.baseJs.ajaxReq("/jikeyou/api/fileUpload",param,"post",token)
            .then(res => {
                // console.log(res);
                this.urls.push(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }else if(step === 2){
            let $target = e.target || e.srcElement
            let file = $target.files[0];
            var reader = new FileReader()
            reader.onload = (data) => {
                let res = data.target || data.srcElement
                this.userInfo.avatarOne = res.result
            }
            reader.readAsDataURL(file);
            // 把图片转换成file类型
            let param = new FormData();
            param.append('file', file);
            //console.log(param);
            // 发送请求
            let token = localStorage.getItem("token");
            this.baseJs.ajaxReq("/jikeyou/api/fileUpload",param,"post",token)
            .then(res => {
                // console.log(res);
                this.urls.push(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }else if(step === 3){
            let $target = e.target || e.srcElement
            let file = $target.files[0];
            var reader = new FileReader()
            reader.onload = (data) => {
                let res = data.target || data.srcElement
                this.userInfo.avatarTwo = res.result
            }
            reader.readAsDataURL(file);
            // 把图片转换成file类型
            let param = new FormData();
            param.append('file', file);
            //console.log(param);
            // 发送请求
            let token = localStorage.getItem("token");
            this.baseJs.ajaxReq("/jikeyou/api/fileUpload",param,"post",token)
            .then(res => {
                // console.log(res);
                this.urls.push(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            let $target = e.target || e.srcElement
            let file = $target.files[0];
            var reader = new FileReader()
            reader.onload = (data) => {
                let res = data.target || data.srcElement
                this.userInfo.avatarBank = res.result
            }
            reader.readAsDataURL(file);
            // 把图片转换成file类型
            let param = new FormData();
            param.append('file', file);
            //console.log(param);
            // 发送请求
            let token = localStorage.getItem("token");
            this.baseJs.ajaxReq("/jikeyou/api/fileUpload",param,"post",token)
            .then(res => {
                // console.log(res);
                this.urls.push(res.data);
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
@import '../../assets/css/identify.css';
</style>