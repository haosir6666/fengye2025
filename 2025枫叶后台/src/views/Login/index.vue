<template>
  <div class="login w-full h-100vh">
    <div class="logo flex flex-col gap-4">
      <img class="h-40" src="/logo.gif" alt="logo">
      <span class="font-size-14">后台管理系统</span>
    </div>
    <div class="login-form">
      <p class="font-size-5 p1 font-600">欢迎登录</p>
      <p class="font-size-4 p2">枫叶网站后台管理系统 <img src="https://www.emojiall.com/images/60/qq/173@2x.gif" /></p>
      <el-input class="mt-4" size="large" v-model="loginFrom.username" placeholder="请输入账号">
        <template #prefix>
          <el-icon class="el-input__icon">
            <User />
          </el-icon>
        </template>
      </el-input>
      <el-input class="mt-4" size="large" v-model="loginFrom.password" placeholder="请输入密码">
        <template #prefix>
          <el-icon>
            <Unlock />
          </el-icon>
        </template>
      </el-input>
      <p class="mt-6 mb-4 font-size-3 c-blueGray cursor-pointer">不支持注册</p>
      <el-button class="w-100% " size="large" type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/pinia'
import { User, Unlock } from '@element-plus/icons-vue'
import router from "@/router/index.js";
import {encryptMessage} from '@/utils/rsa'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()

const loginFrom = reactive({
  username: 'admin',
  password: '123456'
})
const login = () => {
  if (!loginFrom.username || !loginFrom.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  userStore.login(loginFrom.username,encryptMessage(loginFrom.password))
}

</script>
<style lang="scss" scoped>
.login {
  background-color: $color-yellow1;
  background-image: linear-gradient(45deg, $color-yellow2 25%, transparent 0, transparent 75%, $color-yellow2 0),
    linear-gradient(45deg, $color-yellow2 25%, transparent 0, transparent 75%, $color-yellow2 0);
  background-position: 0 0, 50px 50px;
  /* 保持对齐 */
  background-size: 100px 100px;
  /* 每个方格大小 */
  background-repeat: repeat;
  /* 重复背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}

.login-form {
  overflow: hidden;
  position: relative;
  border-radius: 7px;
  padding: 30px 20px;
  margin-right: 200px;
  width: 400px;
  background: $color-white;

  .p2 {
    color: rgb(70, 71, 71);
    display: flex;
    align-items: center;

    img {
      margin-left: 10px;
      width: 22px;
    }
  }
}
</style>