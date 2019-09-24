<template>
  <div class="headerTop">
      <i class="back" @click="goBack"></i>
      {{ title }}
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
      "title"
  ],
  components: {},
  computed: {},
  watch: {},
  methods: {
      goBack() {
          this.$router.go(-1);
      }
  },
  created () {},
  mounted () {},
}
</script>
<style scoped>
.headerTop{
    width: 100%;
    height: 1.5rem;
    background: #2480a6;
    font-size: .32rem;
    color: #fff;
    text-align: center;
    padding-top: .7rem;
    box-sizing: border-box;
    position: relative;
}
.headerTop i{
    position: absolute;
    top: .52rem;
    left: 0;
    width: .8rem;
    height: .8rem;
    background: url(../../assets/images/public/back.png) no-repeat center;
    background-size: 20%;
}
</style>