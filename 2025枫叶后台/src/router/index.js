import { createRouter, createWebHashHistory ,  } from 'vue-router'

const routes = [
    { // 使用layout布局（头部，侧边导航，tag导航标签）的内页都放这里
        path: '/',
        name: 'layout',
        redirect: '/login',
        component: () => import('@/layout/Index.vue'),
        children: [
            { // 有了欢迎光临，动态路由再也不怕没有首页了
                path: '/welcome',
                name: 'welcome',
                component: () => import('@/views/Welcome/index.vue'),
                meta: {
                    title: '欢迎'
                }
            },
            {
                path: '/log',
                name: 'log',
                redirect: '/log/login',
                component: () => import('@/views/Log/index.vue'),
                meta: {
                    title: '日志'
                },
                children: [
                    {
                        path: '/log/login',
                        name: 'loginLog',
                        component: () => import('@/views/Log/loginLog.vue'),
                        meta: {
                            title: '登录日志'
                        }
                    },
                    {
                        path: '/log/operate',
                        name: 'operateLog',
                        component: () => import('@/views/Log/operate.vue'),
                        meta: {
                            title: '操作日志'
                        }
                    },
                ]
            },
            {
                path: '/shop',
                name: 'shop',
                redirect: '/shop/list',
                component: () => import('@/views/shop/index.vue'),
                meta: {
                    title: '商城管理'
                },
                children: [
                    {
                        path: '/shop/list',
                        name: 'shopList',
                        component: () => import('@/views/shop/shopList.vue'),
                        meta: {
                            title: '商品列表'
                        }
                    },
                    {
                        path: '/shop/role',
                        name: 'shopRole',
                        component: () => import('@/views/shop/role.vue'),
                        meta: {
                            title: '交易规则'
                        }
                    },
                ]
            },
            { // 404页面有了，403, 500有没必要？
                path: '/404',
                name: 'notfound',
                component: () => import('@/views/Error/NotFound.vue'),
                meta: {
                    title: '404'
                }
            },
            { // 为什么写了要注释掉。写是因为404需要动态匹配并重定向才行。注释掉是因为动态路由的原因，把这个路由用router.addRoute的方式引入进来了。
                path: '/:pathMatch(.*)',
                name: '404',
                redirect: '/404',
                component: () => import('@/views/Error/NotFound.vue')
            }
        ]
    },
    { // 非内页，不需要layout布局的放外面，如登录，大屏等
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/Index.vue'),
        meta: {
            title: '网站管理系统'
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
