<template>
  <div class="pb-16px px-20px flex flex-col items-center justify-center">
    <div class="text-left w-full flex gap-10px">
      <a-select style="width: 140px" placeholder="请选择商品类型" size="large" v-model:value="itemType">
        <a-select-option v-for="i in itemTypeList" :key="i.value" :value="i.value">{{ i.label }}</a-select-option>
      </a-select>
      <a-select style="width: 140px" placeholder="请选择审核状态" size="large" v-model:value="tradeType">
        <a-select-option v-for="i in tradeTypeList" :key="i.value" :value="i.value">{{ i.label }}</a-select-option>
      </a-select>
      <a-select style="width: 140px" placeholder="请选择出售状态" size="large" v-model:value="buyOrSell">
        <a-select-option v-for="i in buyOrSellList" :key="i.value" :value="i.value">{{ i.label }}</a-select-option>
      </a-select>
      <a-button type="primary" size="large" @click="fetchData">查询</a-button>
    </div>
    <a-table v-if="dataList" class="mt-10px" :columns="columns" :data-source="dataList" :scroll="{ x: tableWidth }"
      :pagination="pagination" @change="onTableChange" sticky>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'itemId'">
          <img class="w-50px h-50px" :src="`https://maplestory.io/api/twms/256/item/${record.itemId}/icon`" alt="" />
        </template>
        <template v-if="column.dataIndex === 'operation' && buyOrSell == -1">
          <a-button @click="deleteMyShop(record.id)">
            下架
          </a-button>
        </template>
      </template>
    </a-table>
    <a-spin class="mt-20px" size="large" v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import api from "../../api/index";
import type { TablePaginationConfig } from "ant-design-vue";
import type { ItemType } from "@/views/shop/api/types.ts";
import { message as antdMessage } from 'ant-design-vue'

const buyOrSell = ref(-1); //-1出售 1购买
const itemType = ref();
const tradeType = ref();
const buyOrSellList = [
  {
    value: -1,
    label: "出售",
  },
  {
    value: 1,
    label: "购买",
  },
];
const tradeTypeList = [
  {
    value: 10086,
    label: "全部",
  },
  {
    value: 0,
    label: "待审核",
  },
  {
    value: 1,
    label: "待购买",
  },
  {
    value: 2,
    label: "已购买",
  },
  {
    value: -1,
    label: "未通过审核",
  },
  {
    value: -2,
    label: "自主下架",
  },
  {
    value: -3,
    label: "通过后驳回",
  },
];

const itemTypeList: ItemType[] = [
  {
    value: 10086,
    label: "全部",
  },
  {
    value: 1,
    label: "装备",
  },
  {
    value: 2,
    label: "装饰",
  },
  {
    value: 3,
    label: "消耗",
  },
  {
    value: 4,
    label: "其他",
  },
  {
    value: 5,
    label: "特殊",
  },
  {
    value: 6,
    label: "时装",
  },
];
const pagination = ref({
  current: 1,
  pageSize: 6,
  total: 0,
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 條`,
});
let dataList = ref([]);

watch(buyOrSell, () => {
  dataList.value = [];
  fetchData();
});

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: "物品",
    dataIndex: "itemId",
    key: "itemId",
    width: 100,
  },
  {
    title: "物品类型",
    dataIndex: "itemType",
    key: "itemType",
    width: 100,
  },
  {
    title: "物品名称",
    dataIndex: "itemName",
    key: "itemName",
    width: 100,
  },
  {
    title: "数量",
    dataIndex: "itemNumber",
    key: "itemNumber",
    width: 100,
  },
  {
    title: "币种",
    dataIndex: "amountType",
    key: "amountType",
    width: 100,
  },
  {
    title: "售价",
    dataIndex: "amount",
    key: "amount",
    width: 100,
  },
  {
    title: "审核状态",
    dataIndex: "tradeType",
    key: "tradeType",
    width: 100,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 100,
  }
];
const amountType: ItemType[] = [
  {
    value: 10086,
    label: "全部",
  },
  {
    value: 1,
    label: "现金点",
  },
  {
    value: 2,
    label: "乐豆",
  },
  {
    value: 3,
    label: "枫点",
  },
];
function getAmountTypeLabel(value: number, list: ItemType[]) {
  const item = list.find((item) => item.value === value);
  return item ? item.label : "";
}
const tableWidth = computed(() =>
  columns.reduce((acc, cur) => acc + cur.width, 0)
);


const fetchData = async () => {
  let { code, data } = await api.getShopList({
    pageNo: pagination.value.current,
    pageSize: pagination.value.pageSize,
    buyOrSell: buyOrSell.value,
    itemType: itemType.value,
    tradeType: tradeType.value,
  });
  if (code === 200) {
    dataList.value = data.dataList;
    console.log(dataList.value);
    dataList.value.forEach((item) => {
      item.itemType = getAmountTypeLabel(item.itemType, itemTypeList);
      item.tradeType = getAmountTypeLabel(item.tradeType, tradeTypeList);
      item.amountType = getAmountTypeLabel(item.amountType, amountType);
    });
    pagination.value.total = data.count;
  }
};

const onTableChange = (paginationConfig: TablePaginationConfig) => {
  const { current = 1, pageSize = 6 } = paginationConfig;
  pagination.value = {
    ...pagination.value,
    current,
    pageSize,
  };
  fetchData();
};

const deleteMyShop = async (id: number) => {
  let { code, message } = await api.deleteShop(id);
  if (code === 200) {
    antdMessage.success("下架成功");
    fetchData();
  } else {
    antdMessage.error(message || '下架失败')
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
