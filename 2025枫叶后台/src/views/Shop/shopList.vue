<template>
    <div class="log-index">
        <div class="data">
            <div class="headr  flex justify-between items-center">
                <span class="font-600 font-size-17px">商品列表</span>
                <el-button @click="router.go(-1)">上一页</el-button>
            </div>
            <div class="data-from mt-4 px-1 flex ">
                <div class="flex-1 flex gap-10 flex-wrap">
                    <div style="width: 280px;" class="from-item flex items-center ">
                        <span class="item-tit w-100px">
                            物品ID
                        </span>
                        <el-input v-model:value="inputItemId" placeholder="请输入搜索内容">
                            <template #suffix></template>
                        </el-input>
                    </div>

                    <div style="width: 280px;" class="from-item flex items-center ">
                        <span class="item-tit w-85px">
                            物品名称
                        </span>
                        <el-input  v-model:value="inputItemName"  placeholder="请输入搜索内容">
                            <template #suffix></template>
                        </el-input>
                    </div>
                  <div style="width: 280px;" class="from-item flex items-center ">
                        <span class="item-tit w-80px">
                            物品类型
                        </span>
                    <el-select
                        v-model="itemTypeValue"
                        placeholder="Select"
                        style="width: 240px"
                    >
                      <el-option
                          v-for="item in itemType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      />
                    </el-select>
                  </div>
                  <div style="width: 280px;" class="from-item flex items-center ">
                        <span class="item-tit w-80px">
                            货币类型
                        </span>
                    <el-select
                        v-model="inputAmountType"
                        placeholder="Select"
                        style="width: 240px"
                    >
                      <el-option
                          v-for="item in amountType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      />
                    </el-select>
                  </div>
                  <div style="width: 280px;" class="from-item flex items-center ">
                        <span class="item-tit w-80px">
                            审核状态
                        </span>
                    <el-select
                        v-model="inputTradeType"
                        placeholder="Select"
                        style="width: 240px"
                    >
                      <el-option
                          v-for="item in tradeType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      />
                    </el-select>
                  </div>
                  <div style="width: 280px;" class="from-item flex items-center ">
                    <el-radio-group v-model="createTimeOrder">
                      <el-radio-button label="降序" :value="false" />
                      <el-radio-button label="升序" :value="true" />
                    </el-radio-group>
                  </div>
                </div>
                <el-button :icon="RefreshRight" @click="refreshTableData()">重置</el-button>
                <el-button :icon="Search" type="primary" @click="getTableData(currentPage.value, pageSize.value,itemTypeValue.value,inputItemId.value,inputItemName.value,inputAmountType.value,inputTradeType.value,createTimeOrder.value)">搜索</el-button>
            </div>
        </div>
        <div class="data data-list flex-1 flex flex-col">
            <el-table :data="tableData" class=" flex-1">
              <el-table-column prop="id" label="单号"  />
              <el-table-column prop="itemId" label="物品ID" />
                <el-table-column prop="itemName" label="物品名称" />
              <el-table-column  label="售价" min- >
                <template #default="scope">
                 <span>{{scope.row.amount}} {{getAmountTypeLabel(scope.row.amountType,amountType)}}</span>
                </template>
              </el-table-column>
              <el-table-column  label="审核状态" min- >
                <template #default="scope">
                  <span>{{getAmountTypeLabel(scope.row.tradeType,tradeType)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="itemNumber" label="物品数量"   />
              <el-table-column prop="shelvesTime" label="上架时间"   />
              <el-table-column prop="createTime" label="创建时间"   />
              <el-table-column fixed="right" label="Operations">
                <template #default="scope">
                  <el-select
                      v-model="scope.row.tradeType"
                      placeholder="审核"
                      @change="Up_audit(scope.row.id,scope.row.tradeType)"
                  >
                    <el-option
                        v-for="item in Table_tradeType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                  </el-select>
                  <el-button @click="Up_offShelf(scope.row.id)"  type="danger" size="small" >
                    下架
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination  @current-change="handleCurrentChange" :total="total" v-model:current-page="currentPage" v-model:page-size="pageSize"
                class="mt-10px" background layout="prev, pager, next" />
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue'
import { Search, RefreshRight } from '@element-plus/icons-vue'
import {ElTable, ElTableColumn, ElPagination, ElMessage} from 'element-plus'
import {audit, getShopList, offShelf} from '@/api/shop.js'
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)
const amountType=[
  {
    value: 10086,
    label: '全部'
  },
  {
    value: 1,
    label: '现金点'
  },
  {
    value: 2,
    label: '乐豆'
  },
  {
    value: 3,
    label: '枫点'
  },
]
const tradeType=[
  {
    value: 10086,
    label: '全部'
  },
    {
        value: 0,
        label: '待审核'
    },
  {
    value: 1,
    label: '待购买'
  },
  {
    value: 2,
    label: '已购买'
  },
  {
    value: -1,
    label: '未通过'
  },
  {
    value: -2,
    label: '自主下加'
  },
  {
    value: -3,
    label: '驳回'
  },
]
const itemTypeValue = ref(10086)
const itemType=[
  {
    value:10086,
    label: '全部',
  },
  {
    value: 1,
    label: '装备',
  },
  {
    value: 2,
    label: '装饰',
  },
  {
    value: 3,
    label: '消耗',
  },
  {
    value: 4,
    label: '其他',
  },
  {
    value:5,
    label: '特殊',
  },
  {
    value: 6,
    label: '时装',
  },
]
const inputItemId = ref('')
const inputItemName = ref('')
const inputAmountType = ref(10086)
const inputTradeType = ref(10086)
const createTimeOrder=ref(false)
const Table_tradeType=[
  {
    value: 0,
    label: '待审核'
  },
  {
    value: 1,
    label: '通过'
  },

  {
    value: -1,
    label: '未通过'
  },
  {
    value: -3,
    label: '下架'
  },
]
function getAmountTypeLabel(value,list) {
  const item = list.find(item => item.value === value)
  return item ? item.label : ''
}
const tableData =ref( [
])
function handleCurrentChange(page) {
  currentPage.value = page
   getTableData(page, pageSize.value,itemTypeValue.value,inputItemId.value,inputItemName.value,inputAmountType.value,inputTradeType.value,createTimeOrder.value)
}
async function getTableData(pageNo, pageSize,itemType,itemId,itemName,amountType,tradeType,createTimeOrder) {
  const res = await getShopList({pageNo, pageSize,itemType,itemId,itemName,amountType,tradeType,createTimeOrder})
  if (res.code === 200) {
    tableData.value = res.data.dataList
    total.value = res.data.count
  }
}

async function Up_audit(id,type){
  const res = await audit(id,type)
  if (res.code === 200) {
    ElMessage.success(res.message)
    await getTableData(currentPage.value, pageSize.value,itemTypeValue.value,inputItemId.value,inputItemName.value,inputAmountType.value,inputTradeType.value,createTimeOrder.value)
  }else {
    ElMessage.warning(res.message)
  }
}

async function Up_offShelf(id) {
  const res = await offShelf(id)
  if (res.code === 200) {
   await getTableData(currentPage.value, pageSize.value,itemTypeValue.value,inputItemId.value,inputItemName.value,inputAmountType.value,inputTradeType.value,createTimeOrder.value)
   ElMessage.success(res.message)
  }else {
    ElMessage.warning(res.message)
  }
}
async function refreshTableData() {
  currentPage.value = 1
  total.value = 0
  tableData.value = []
  inputItemId.value = ''
  inputItemName.value = ''
  inputAmountType.value = 10086
  inputTradeType.value = 10086
  createTimeOrder.value = false
  await getTableData(currentPage.value, pageSize.value)
}
onMounted(() => {
  refreshTableData()
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
  .data-list{
        overflow-y: auto;
  }
}
</style>