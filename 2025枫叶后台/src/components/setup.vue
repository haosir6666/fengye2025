<template>
  <div class="setup">
    设置
    {{ showSetup }}
    <el-progress :percentage="percentage" color="#ffd34b" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElProgress } from 'element-plus'
import  {useAppStore} from "@/pinia";
const appStore = useAppStore();
const percentage = ref(20)
const showSetup = ref(false);

</script>
<style scoped lang="scss">
.setup{
  border-radius: 7px;
  padding: 10px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>