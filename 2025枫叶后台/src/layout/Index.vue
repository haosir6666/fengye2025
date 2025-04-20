<template>
  <div class="layout">
    <Left ></Left>
    <router-view class="flex-1 center px-6"></router-view>
  </div>
</template>
<script setup>
import Left from './Left.vue';

</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 10px;
  width: 100vw;
  height: 100vh;
  background-color: $bg-color;
  overflow: hidden;
}
</style>