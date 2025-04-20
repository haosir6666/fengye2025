<template>
    <div class="log-index">
        <div class="data">
            <div class="headr  flex justify-between items-center">
                <span class="font-600 font-size-17px">登录日志</span>
                <el-button @click="router.go(-1)">上一页</el-button>
            </div>
            <div class="data-from mt-4 px-1 flex ">
                <div class="flex-1 flex gap-10 flex-wrap">
                    <div style="width: 280px;" class="from-item flex items-center ">
                        <span class="item-tit w-100px">
                            用户账号
                        </span>
                        <el-input v-model:value="username" placeholder="请输入搜索内容">
                            <template #suffix></template>
                        </el-input>
                    </div>
                    <div style="width: 280px;" class="from-item flex items-center ">
                        <span class="item-tit w-80px">
                            用户IP
                        </span>
                        <el-input  v-model:value="ipaddr"  placeholder="请输入搜索内容">
                            <template #suffix></template>
                        </el-input>
                    </div>
                </div>
                <el-button :icon="RefreshRight" @click="refreshTableData()">重置</el-button>
                <el-button :icon="Search" type="primary" @click="getTableData(currentPage.value, pageSize.value,username.value,ipaddr.value)">搜索</el-button>
            </div>
        </div>
        <div class="data data-list flex-1 flex flex-col">
            <el-table :data="tableData" class="w-full flex-1">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
            </el-table>
            <el-pagination :total="total" v-model:current-page="currentPage" v-model:page-size="pageSize"
                class="mt-10px" background layout="prev, pager, next" />
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue'
import { Search, RefreshRight } from '@element-plus/icons-vue'
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import  {getLoginLog} from  '@/api/log.js'
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const username = ref('')
const ipaddr = ref('')
const tableData =ref( [
])

async function getTableData(pageNo, pageSize,username,ipaddr) {
  const res = await getLoginLog({pageNo, pageSize,username,ipaddr})
  if (res.code === 200) {
    tableData.value = res.data.list
    total.value = res.data.total
  }
}

async function refreshTableData() {
  currentPage.value = 1
  total.value = 0
  tableData.value = []
  await getTableData(currentPage.value, pageSize.value,username.value,ipaddr.value)
}
onMounted(() => {
  refreshTableData()
})

</script>

<style lang="scss" scoped>
.log-index {
    height: 100%;
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