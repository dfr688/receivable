<template>
  <div id="app" v-cloak>
    <!-- <transition :name="transitionName"> -->
      <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
        transitionName: '',
        currentPath: '',
    }
  },
  watch: {
    $route(to,from) {
      const name = to.name;
      switch (name) {
      case 'home': this.currentPath = '/home'; break;
      case 'my': this.currentPath = '/my'; break;
      }

      if (to.meta.index > from.meta.index) {
        if(to.meta.level === from.meta.level){
          this.transitionName = 'slide-left';
        }else if(to.meta.level > from.meta.level){
          this.transitionName = 'slide-top';
        }
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = '';
      } else if (to.meta.index === from.meta.index) {
        this.transitionName = '';
      }
    }
  }
}
</script>

<style scoped>
.slide-top-enter-active,
.slide-top-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all .4s;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-top-enter{
  opacity: 0;
  transform: translate3d(0,100%, 0);
}
.slide-top-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
[v-cloak]{
  display:none;
}
</style>
