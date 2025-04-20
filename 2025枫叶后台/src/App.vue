<template>
  <div class="wrapper">
    <el-config-provider :size="size" :z-index="zIndex">
      <router-view/>
    </el-config-provider>
    <div class="mask" :style="{ backgroundColor: maskColor }"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const maskColor = ref('rgba(0, 0, 0, 0)');
const size = ref('default');
const zIndex = ref(100);
const changeMaskOpacity = (opacity) => {
  maskColor.value = `rgba(0, 0, 0, ${opacity})`;
};

</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.setup{
  position: absolute;
  top: 50%;
  left: calc(100% - 70px);
  transform: translate(-50%);
  z-index: 1000;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
}
</style>
