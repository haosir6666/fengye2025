<template>
  <div class="user-center w-full h-full pt-88px pb-20px cus-scroll">
    <div class="content w-1200px max-w-full mx-auto p-10px">
      <div class="from w-full flex flex-wrap justify-between items-center">
        <div class="from-item">
          <a-input v-model:value="form.itemId" placeholder="输入商品ID或名称" size="large" />
        </div>
        <div class="from-item">
          <a-select style="width: 100px" placeholder="请选择商品类型" size="large" v-model:value="form.itemType">
            <a-select-option v-for="i in itemType" :key="i.value" :value="i.value">{{ i.label }}</a-select-option>
          </a-select>
        </div>
        <div class="from-item">
          <a-select style="width: 100px" placeholder="请选择币种" size="large" v-model:value="form.amountType">
            <a-select-option v-for="i in amountType" :key="i.value" :value="i.value">{{ i.label }}</a-select-option>
          </a-select>
        </div>
        <div class="from-item">
          <a-radio-group v-model:value="form.amountOrder" size="large">
            <a-radio-button :value="false">价格降序</a-radio-button>
            <a-radio-button :value="true">价格升序</a-radio-button>
          </a-radio-group>
        </div>
        <div class="from-item">
          <a-radio-group v-model:value="form.createTimeOrder" size="large">
            <a-radio-button :value="false">时间降序</a-radio-button>
            <a-radio-button :value="true">时间升序</a-radio-button>
          </a-radio-group>
        </div>
        <div class="from-item">
          <a-button type="primary" @click="search" size="large"><span class="color-white">搜索</span></a-button>
        </div>
      </div>
    </div>
    <div class="table content mt-10px  w-1200px max-w-full mx-auto p-10px">
      <div class="table-data " v-if="tableData.length">
        <div class="table-items" @click="getItemInfo(item)" v-for="(item, index) in tableData" :key="index">
          <div class="item-img">
            <img :src="`https://maplestory.io/api/twms/256/item/${item.itemId}/icon`" alt="" />
          </div>
          <div class="item-info">
            <div class="item-name">
              <span>{{ item.itemName }}</span> X <span>{{ item.itemNumber }}</span>
            </div>
            <div class="item-price font-size-14px flex flex-col">
              <span class="color-red my-8px">售价:{{ item.amount }}{{ getAmountTypeLabel(item.amountType, amountType)
              }}</span>
              <span class="creat-time color-coolgray">
                上架于:{{ item.shelvesTime }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <a-empty v-else />
      <a-pagination @change="changePage" class="mx-auto" v-model:page-size="form.pageSize" v-model:current="form.pageNo"
        :total="total" show-less-items />
    </div>
    <div class="alert-item-info" v-show="itemInfo.id">
      <div class="head">
        <span class="color-white">{{ itemInfo.itemName }}</span>
        <span class="color-white" @click="itemInfo = {}">❌</span>
      </div>
      <div class="item-img mt-10px gap-2">
        <div class="item-img-l w-100px h-100px">
          <img :src="`https://maplestory.io/api/twms/256/item/${itemInfo.itemId}/icon`" alt="" />
        </div>
        <div class="item-img-r flex-1 color-white flex flex-col gap-2px">
          <span class="color-#C6C5C5FF">level: {{ itemInfo.reqLevel }}</span>
          <span class="color-#C6C5C5FF">力量: {{ itemInfo.str }}</span>
          <span class="color-#C6C5C5FF">敏捷: {{ itemInfo.dex }}</span>
          <span class="color-#C6C5C5FF">智力: {{ itemInfo.ints }}</span>
          <span class="color-#C6C5C5FF">幸运: {{ itemInfo.luk }}</span>
        </div>
      </div>
      <div class="item-img-r pl-5px pt-10px flex-1 color-white flex flex-col gap-2px">
        <span class="color-#C6C5C5FF">星级: {{ itemInfo.chuc }}</span>
        <span class="color-#C6C5C5FF">最大血量: {{ itemInfo.maxHp }}</span>
        <span class="color-#C6C5C5FF">最大蓝量: {{ itemInfo.maxMp }}</span>
        <span class="color-#C6C5C5FF">物御: {{ itemInfo.pdd }}</span>
        <span class="color-#C6C5C5FF">魔防: {{ itemInfo.mdd }}</span>
        <span class="color-#C6C5C5FF">攻击力: {{ itemInfo.pad }}</span>
        <span class="color-#C6C5C5FF">魔法力: {{ itemInfo.mad }}</span>
        <span class="color-#C6C5C5FF">boss伤害: {{ itemInfo.bossDamage }}</span>
        <span class="color-#C6C5C5FF">速度: {{ itemInfo.speed }}</span>
        <span class="color-#C6C5C5FF">跳跃: {{ itemInfo.jump }}</span>
        <span class="color-#C6C5C5FF">无视防御: {{ itemInfo.ignorePdr }}</span>
        <span class="color-#C6C5C5FF">以强化次数: {{ itemInfo.cuc }}</span>
        <span class="color-#C6C5C5FF">剩余强化次数: {{ itemInfo.ruc }}</span>
        <span class="color-#C6C5C5FF">黄金锤子: {{ itemInfo.iuc }}</span>
        <span class="color-#C6C5C5FF">潜能: {{ itemInfo.optionName1 }}</span>
        <span class="color-#C6C5C5FF">潜能: {{ itemInfo.optionName2 }}</span>
        <span class="color-#C6C5C5FF">潜能: {{ itemInfo.optionName3 }}</span>
        <span class="color-#C6C5C5FF">潜能: {{ itemInfo.optionName4 }}</span>
        <span class="color-#C6C5C5FF">潜能: {{ itemInfo.optionName5 }}</span>
        <span class="color-#C6C5C5FF">潜能: {{ itemInfo.optionName6 }}</span>
      </div>
      <div class="item-img mt-10px gap-2 flex justify-end">
        <a-button @click="buyItem(itemInfo.id)">购买</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, } from 'vue'
import { containsNonNumericCharacters } from '@/utils/tools.ts'
import type { ItemType } from "./api/types";
import api from './api'
import { message as antdMessage } from 'ant-design-vue';
const total = ref(0)
const form = ref({
  pageNo: 1,
  pageSize: 18,
  itemId: '',
  itemName: '',
  itemType: 10086,
  amountType: 10086,
  tradeType: 1,
  createTimeOrder: false,//降序 创建时间排序
  amountOrder: false,//降序 出售金额排序
})

const itemInfo = ref<any>({})

const amountType: ItemType[] = [
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

const itemType: ItemType[] = [
  {
    value: 10086,
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
    value: 5,
    label: '特殊',
  },
  {
    value: 6,
    label: '时装',
  },
]
const tableData = ref([])
function getAmountTypeLabel(value: number, list: ItemType[]) {
  const item = list.find(item => item.value === value)
  return item ? item.label : ''
}
async function search() {
  let formValue = { ...form.value }

  if (containsNonNumericCharacters(formValue.itemId)) {
    formValue.itemName = formValue.itemId
    formValue.itemId = ''
  }
  if (formValue.itemType === 10086) {
    formValue.itemType = ''
  }
  if (formValue.amountType === 10086) {
    formValue.amountType = ''
  }
  const { code, data } = await api.getShopList(formValue)
  if (code === 200) {
    if (!data) {
      tableData.value = []
      total.value = 0
      return
    }
    tableData.value = data.dataList
    total.value = data.count
  }
}

function changePage(pageNo: number) {
  form.value.pageNo = pageNo
  search()
}

async function getItemInfo(item: any) {
  let { code, data } = await api.getShopItemInfo(item.id)
  if (code === 200) {
    itemInfo.value = data
    itemInfo.value.itemName = item.itemName
  }
}
//购买物品
const buyItem = async (id: number) => {
  let { code, data, message } = await api.buyShopItem(id)
  if (code === 200) {
    antdMessage.success('购买成功')
    await search()
  }
}

onMounted(() => {
  search()
})

</script>

<style lang="scss" scoped>
.user-center {
  background: url(@/assets/images/bg_usercenter.png) no-repeat center center;
  background-size: cover;
  height: 100vh;
  overflow-y: auto;
  width: 100%;
}

.alert-item-info {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 3;
  transform: translateX(-50%) translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  width: 240px;
  min-height: 50px;
  padding: 10px;
  border-radius: 10px;

  .item-img {
    display: flex;

    .item-img-l {
      border: 1px solid #787777;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: #484747;

      img {
        height: 80%;
      }
    }
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.content {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  border-radius: 20px;
  background-color: $h-bg-color;

  .table-data {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .table-items {
      width: 19%;
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: 10px;
      padding: 10px;

      &:hover {
        transition: all .2s ease-in-out;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }

      .item-info {
        margin-top: 10px;
      }

      .item-img {
        height: 100px;
        width: 100%;
        background: #ededed;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 50%;
        }
      }
    }
  }
}
</style>