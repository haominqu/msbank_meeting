import Vue from 'vue'
import VueRouter from 'vue-router'
const index = () =>  import('../views/index.vue')
const meetingRegister = () =>  import('../views/meetingRegister.vue')
const meetingQuery = () =>  import('../views/meetingQuery.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      title: '首页',
    }
  },
  {
    path: '/meetingRegister',
    name: 'meetingRegister',
    component: meetingRegister,
    meta: {
      title: '会议登记',
    }
  },
  {
    path: '/meetingQuery',
    name: 'meetingQuery',
    component: meetingQuery,
    meta: {
      title: '会议查询',
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   // 处理后退
//   console.log(to)
//   next()
// })
export default router
