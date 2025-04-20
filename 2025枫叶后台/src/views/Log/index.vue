<template>
    <div class="log-index">
        <div class="left data">
            <div class="nav-list">
                <div v-for="i in nav" :key="i" @click="changeActiveIndex(i.path)"
                    :class="['nav-item', activeIndex === i.path ? 'active' : '']">
                    <span>{{ i.name }}</span>
                </div>
            </div>
        </div>
        <div class="right">
            <RouterView></RouterView>
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
const nav = ref([
    {
        name: '登录日志',
        path: '/log/login'
    }, {
        name: '操作日志',
        path: '/log/operate'
    },
])

</script>

<style lang="scss" scoped>
.active {
    transition: all .2s ease-in-out;
    color: $color-yellow2;
}

.nav-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

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

.log-index {
    display: flex;
    gap: 10px;

    .data {
        padding: 10px;
        background-color: #fff;
        border-radius: 7px;
    }

    .left {
        width: 200px;
    }

    .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}
</style>