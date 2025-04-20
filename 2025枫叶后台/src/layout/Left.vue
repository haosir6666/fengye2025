<template>
    <div class="nav-top px-6">
        <div class="flex-1 left">
            <div class="logo">
                <img src="/logo.gif" />
            </div>
            <div class="nav-list">
                <div @click="changeActiveIndex(i.path)" :class="['nav-item', activeIndex === i.path ? 'active' : '']"
                    v-for="i in navList" :key="i">
                    <span class="item-name  font-540">{{ i.name }}</span>
                </div>
            </div>
        </div>
        <div class="user-info flex  items-center gap-4">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <el-button @click="userStore.logout">退出</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { useUserStore } from '@/pinia'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
const userStore = useUserStore()
//获取当前路由路径
const activeIndex = ref(route.path)
// 监听路由变化，更新 activeIndex
watch(
    () => route.path,
    (newPath) => {
        activeIndex.value = newPath
    }
)

function changeActiveIndex(path) {
    activeIndex.value = path
    router.push({ path: path })
}

const navList = ref([
    {
        name: '欢迎',
        path: '/welcome'
    },
  {
    name: '商城管理',
    path: '/shop'
  },
    // {
    //     name: '日志',
    //     path: '/log'
    // },
])

</script>

<style lang="scss" scoped>
.active {
    transition: all .2s ease-in-out;
    color: $color-yellow2;
}

.nav-top {
  width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    overflow: hidden;
    background-color: #fff;

    .left {
        height: 100%;
        gap: 60px;
        display: flex;
        align-items: center;
    }

    .nav-list {
        display: flex;
        align-items: center;
        gap: 18px;

        .nav-item {
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 7px;
            max-width: 100px;
            transition: all 0.3s ease-in-out;
            //文版超出显示省略号
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 10px 18px;

            &:hover {
                color: $color-yellow2;
            }
        }
    }

    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80%;

        img {
            height: 100%;
        }
    }
}
</style>