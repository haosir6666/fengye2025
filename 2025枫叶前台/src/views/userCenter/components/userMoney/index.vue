<template>
  <div class="moneys text-#555555">
    <div class="money-item ">
      <div class="select-item h-45px border-solid border-#FBDBB2 border-1px border-x-0 flex">
        <p class="font-size-15px">提现中的现金点:
          <span class="font-size-16px font-bold">{{ userMoney.cashCan }}</span>
        </p>
      </div>
      <div class="select-item h-45px border-solid border-#FBDBB2 border-1px border-x-0 flex">
        <p class="font-size-15px">现金点:
          <span class="font-size-16px font-bold">{{ userMoney.cash }}</span>
        </p>
      </div>
      <div class="select-item h-45px border-solid border-#FBDBB2 border-1px border-x-0 flex">
        <p class="font-size-15px">乐豆:
          <span class="font-size-16px font-bold">{{ userMoney.bonds }}</span>
        </p>
      </div>
      <div class="select-item h-45px border-solid border-#FBDBB2 border-1px border-x-0 flex">
        <p class="font-size-15px">提现中的乐豆:
          <span class="font-size-16px font-bold">{{ userMoney.canBonds }}</span>
        </p>
      </div>
      <div class="select-item h-45px border-solid border-#FBDBB2 border-1px border-x-0 flex">
        <p class="font-size-15px">枫点:
          <span class="font-size-16px font-bold">{{ userMoney.point }}</span>
        </p>
      </div>
      <div class="select-item h-45px border-solid border-#FBDBB2 border-1px border-x-0 flex">
        <p class="font-size-15px">提现的枫点:
          <span class="font-size-16px font-bold">{{ userMoney.pointCan }}</span>
        </p>
      </div>
    </div>
    <div class="select-item h-45px flex flex-wrap gap-10px">
      <a-button class="flex-1" type="primary" @click="open = true"><a>退还资金</a></a-button>
      <a-modal v-model:open="open" @ok="handleOk">
        <a-select style="width: 100px" placeholder="请选择币种" size="large" v-model:value="moneyType">
          <a-select-option v-for="i in amountType" :key="i.value" :value="i.value">{{ i.label }}</a-select-option>
        </a-select>
        <a-input class="mt-15px" v-model:value="inputMoney" placeholder="输入退还金额" />
      </a-modal>
    </div>
    <div class="select-item h-45px flex">
      <a-button class="w-full" type="primary" @click="() => router.push('sponsor')"><a>贊助我們</a></a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import api from '../../api/index.ts'
import { message as antdMessage } from 'ant-design-vue'
const amountType = [

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
const userMoney = ref<any>({
  cash: 0,
  cashCan: 0,
  bonds: 0,
  canBonds: 0,
  point: 0,
  pointCan: 0, 
})
const open = ref(false)
const moneyType = ref(1)
const inputMoney = ref()
async function handleOk() {
  if (!inputMoney.value) {
    antdMessage.error('请输入退还金额')
    return
  }
  let { code, message } = await api.withdraw(moneyType.value, inputMoney.value)
  if (code === 200) {
    antdMessage.success(message)
    open.value = false
    inputMoney.value = ''
    getMoney()
  } else {
    antdMessage.error(message)
  }
}

async function getMoney() {
  let { code, data } = await api.readUserMoney()
  if (code === 200) {
    userMoney.value = data
  }
}
onMounted(() => {
  getMoney()
})
</script>

<style scoped lang="scss">
.moneys {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.money-item {
  flex: 1;
}

.select-item {
  p {
    padding: 0;
    margin: 0;
  }

  align-items: center;
}
</style>
