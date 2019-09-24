import Vue from 'vue'
import Router from 'vue-router'
import { Toast } from 'mint-ui';

// 解决vue router 报错： Uncaught (in promise) 
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import("@/components/home/Home"),
      meta: {
        index: 1,
        level: 2
      }
    },
    {
      path: '/my',
      name: 'my',
      component: () => import("@/components/my/My"),
      meta: {
        index: 1,
        level: 2
      }
    },
    {
      path: '/card',
      name: 'card',
      component: () => import("@/components/home/Card"),
      meta: {
        index: 2,
        level: 2,
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import("@/components/home/Account"),
      meta: {
        index: 2,
        level: 2,
        requiresAuth: true
      }
    },
    {
      path: '/record',
      name: 'record',
      component: () => import("@/components/home/Record"),
      meta: {
        index: 2,
        level: 2,
        requiresAuth: true
      }
    },
    {
      path: '/rate',
      name: 'rate',
      component: () => import("@/components/home/Rate"),
      meta: {
        index: 2,
        level: 2,
        requiresAuth: true
      }
    },
    {
      path: '/userlevel',
      name: 'userlevel',
      component: () => import("@/components/home/UserLevel"),
      meta: {
        index: 2,
        level: 2,
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/components/login/Login"),
      meta: {
        index: 2,
        level: 2
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import("@/components/login/Forget"),
      meta: {
        index: 3,
        level: 2
      }
    },
    {
      path: '/basicuser',
      name: 'basicuser',
      component: () => import("@/components/home/BasicUser"),
      meta: {
        index: 3,
        level: 2,
        requiresAuth: true
      }
    },
    {
      path: '/creditcard',
      name: 'creditcard',
      component: () => import("@/components/home/CreditCard"),
      meta: {
        index: 3,
        level: 2,
        requiresAuth: true
      }
    },
    {
      path: '/sweep',
      name: 'sweep',
      component: () => import("@/components/home/Sweep"),
      meta: {
        index: 2,
        level: 2,
        requiresAuth: true
      }
    },
    {
      path: '/identify',
      name: 'identify',
      component: () => import("@/components/home/Identify"),
      meta: {
        index: 3,
        level: 2,
        requiresAuth: true
      }
    },
    {
      path: '/addpaycard',
      name: 'addpaycard',
      component: () => import("@/components/home/AddPayCard"),
      meta: {
        index: 3,
        level: 3,
        requiresAuth: true
      }
    },
    {
      path: '/addreceivablecard',
      name: 'addreceivablecard',
      component: () => import("@/components/home/AddReceivableCard"),
      meta: {
        index: 3,
        level: 3,
        requiresAuth: true
      }
    },
    {
      path: '/modifycard',
      name: 'modifycard',
      component: () => import("@/components/home/ModifyCard"),
      meta: {
        index: 3,
        level: 3,
        requiresAuth: true
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import("@/components/login/Privacy"),
      meta: {
        index: 3,
        level: 2,
      }
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
});

//  路由权限控制 进入my组件时候 需要登录状态
router.beforeEach((to,from,next) => {
  // console.log(to.meta.requiresAuth)
  if(to.meta.requiresAuth){
    // 如果不为空 说明已经登录 直接放行
   // console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token")!= null){
      next();
    }else{
     Toast({
        message: '请先登录！',
        duration: 1000
      });
      next({path: "/login"});
    }
  }else{
    next();
  }
   });

export default router;

