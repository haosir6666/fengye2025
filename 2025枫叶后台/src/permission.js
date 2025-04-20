import router from '@/router'
import { useUserStore } from '@/pinia'

// 白名单
const whiteList = ['/login']
// 是否已加载路由
let routerIsLoaded = false

// 路由导航
router.beforeEach(async (to, from, next) => {

  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 跳转到登录页时，重置加载路由
  if (to.path === '/login') {
    routerIsLoaded = false
  }

  // 白名单内直接跳转直接进入
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  // 判断是否登录
  if (useUserStore().getToken() ) {
    // 判断路由是否加载
      if (to.matched.length) {
        next()
      } else {
        next('/404')
      }
  } else {
    // 未登录跳转到登录页
    next({ path: '/login' })
  }
})
