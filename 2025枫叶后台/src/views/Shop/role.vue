<template>
  <div class="log-index">
    <div class="data">
      <div class="headr  flex justify-between items-center">
        <span class="font-600 font-size-17px">交易规则</span>
        <div>
          <el-button @click="router.go(-1)">上一页</el-button>
          <el-button @click="updateTrade()">修改</el-button>
        </div>
      </div>
    </div>
    <div class="data flex flex-col gap-20px">
      <div style="width: 350px;" class="from-item flex items-center ">
                        <span class="item-tit w-280px">
                            现金点最低出售数量
                        </span>
        <el-input v-model:value="tradeRule.cashLimit" placeholder="请输入搜索内容">
          <template #suffix></template>
        </el-input>
      </div>
      <div style="width: 350px;" class="from-item flex items-center ">
                        <span class="item-tit w-280px">
                           乐豆最低出售数量
                        </span>
        <el-input v-model:value="tradeRule.bondsLimit" placeholder="请输入搜索内容">
          <template #suffix></template>
        </el-input>
      </div>
      <div style="width: 350px;" class="from-item flex items-center ">
                        <span class="item-tit w-280px">
                            枫点最低出售数量
                        </span>
        <el-input v-model:value="tradeRule.pointLimit" placeholder="请输入搜索内容">
          <template #suffix></template>
        </el-input>
      </div>
      <div style="width: 350px;" class="from-item flex items-center ">
                        <span class="item-tit w-280px">
                            上架手续费
                        </span>
        <el-input v-model:value="tradeRule.shelvesCommission" placeholder="请输入搜索内容">
          <template #suffix></template>
        </el-input>
      </div>
      <div style="width: 350px;" class="from-item flex items-center ">
                        <span class="item-tit w-280px">
                           指定购买手续费
                        </span>
        <el-input v-model:value="tradeRule.appointCommission" placeholder="请输入搜索内容">
          <template #suffix></template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue'
import { Search, RefreshRight } from '@element-plus/icons-vue'
import {ElTable, ElTableColumn, ElPagination, ElMessage} from 'element-plus'
import  {queryTradeRule,updateTradeRule} from  '@/api/shop.js'
const tradeRule = ref({})
async function getTradeRule() {
  const res = await queryTradeRule()
  if(res.code === 200){
    tradeRule.value = res.data
  }
}

async function updateTrade() {
  const res = await updateTradeRule(tradeRule.value.cashLimit,tradeRule.value.bondsLimit,tradeRule.value.pointLimit,tradeRule.value.shelvesCommission,tradeRule.value.appointCommission)
  if(res.code === 200){
    await getTradeRule()
    ElMessage.success(res.message)
  }else {
    ElMessage.success(res.message)
  }
}

onMounted(() => {
  getTradeRule()
})

</script>

<style lang="scss" scoped>
.log-index {
  height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;

  .data {
    width: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 7px;
  }
}
</style>