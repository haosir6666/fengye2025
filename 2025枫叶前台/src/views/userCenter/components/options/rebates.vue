<template>
    <div class="pb-16px px-20px flex flex-col items-center justify-center">
        <div class="text-left w-full flex flex-col gap-2">
            <div class="flex items-center gap-4">
                <span class="text-gray-600">返利总额:</span>
                <span class="font-bold">{{ rebatesInfo.paySum || 0 }}</span>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-gray-600">应获得总额:</span>
                <span class="font-bold">{{ rebatesInfo.expectedAmount || 0 }}</span>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-gray-600">可领取总额:</span>
                <span class="font-bold text-primary">{{ rebatesInfo.amountCanBeWithdrawn || 0 }}</span>
            </div>
        </div>
        <div class="w-full flex justify-between items-center mt-3">
            <a-segmented v-model:value="activeTab" :options="options" size="small" />
            <a-button type="primary" @click="showWithdrawModal"><a>申请领取</a></a-button>
        </div>
        <template v-if="activeTab === '返利订单'">
            <a-table v-if="data" class="mt-10px w-full" :columns="columns" :data-source="data" :scroll="{ x: tableWidth }"
                :pagination="pagination" @change="onTableChange" sticky>
            </a-table>
            <a-spin size="large" v-else />
        </template>
        <template v-else>
            <a-table v-if="withdrawData" class="mt-10px w-full" :columns="withdrawColumns" :data-source="withdrawData"
                :scroll="{ x: withdrawTableWidth }" :pagination="withdrawPagination" @change="onWithdrawTableChange" sticky>
            </a-table>
            <a-spin size="large" v-else />
        </template>

        <a-modal v-model:open="modalVisible" title="申请领取" @ok="handleWithdraw" :confirmLoading="confirmLoading">
            <template #footer>
                <a-button key="back" @click="modalVisible = false">取消</a-button>
                <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleWithdraw">
                    <a>确定</a>
                </a-button>
            </template>
            <a-form :model="withdrawForm" layout="vertical">
                <a-form-item label="领取金额" name="amount" :rules="[{ required: true, message: '请输入领取金额' }]">
                    <a-input-number v-model:value="withdrawForm.amount" :min="1" :max="rebatesInfo.amountCanBeWithdrawn" class="w-full" />
                    <div class="text-gray-400 text-sm mt-1">可领取金额：{{ rebatesInfo.amountCanBeWithdrawn }}</div>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, h, resolveComponent } from 'vue'
import { message } from 'ant-design-vue'
import api from '../../api/index'
import type { TablePaginationConfig } from 'ant-design-vue'

interface RebateRecord {
    nickname: string
    amount: number
    createTime: string
}

interface WithdrawRecord {
    amount: number
    state: number // 0: 待审核, 1: 通过审核, 2: 已发放
    createTime: string
}

interface RebatesInfo {
    paySum: number
    expectedAmount: number
    amountCanBeWithdrawn: number
}

const activeTab = ref('返利订单');
const options = ['返利订单', '领取记录'];
const modalVisible = ref(false);
const confirmLoading = ref(false);
const rebatesInfo = ref<RebatesInfo>({
    paySum: 0,
    expectedAmount: 0,
    amountCanBeWithdrawn: 0
});

const withdrawForm = ref({
    amount: 0
});

const totalRebates = ref(0)

// 返利订单相关
const pagination = ref({
    current: 1,
    pageSize: 6,
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 條`
})

const columns = [
    {
        title: '我邀请的玩家',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 100
    },
    {
        title: '贊助金額',
        dataIndex: 'amount',
        key: 'amount',
        width: 100
    },
    {
        title: '贊助时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 100
    }
]

// 提现记录相关
const withdrawPagination = ref({
    current: 1,
    pageSize: 6,
    total: 0,
    showSizeChanger: true,
    showTotal: (total: number) => `共 ${total} 條`
})

const withdrawColumns = [
    {
        title: '领取金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 100
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        width: 100,
        customRender: ({ text }: { text: number }) => {
            const colorMap: Record<number, string> = {
                0: 'processing',
                1: 'warning',
                2: 'success',
                [-1]: 'error'
            };
            const textMap: Record<number, string> = {
                0: '待审核',
                1: '通过审核',
                2: '已发放',
                [-1]: '已失效'
            };
            return h(resolveComponent('a-tag'), {
                color: colorMap[text]
            }, () => textMap[text]);
        }
    },
    {
        title: '申请时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 100
    }
]

const tableWidth = computed(() => columns.reduce((acc, cur) => acc + cur.width, 0))
const withdrawTableWidth = computed(() => withdrawColumns.reduce((acc, cur) => acc + cur.width, 0))

const data = ref<RebateRecord[]>([])
const withdrawData = ref<WithdrawRecord[]>([])

const fetchData = async (page: number, pageSize: number) => {
    try {
        const res = await api.readRebatesList({ pageNo: page, pageSize })
        if (res.code === 200) {
            data.value = res.data.dataList
            pagination.value.total = res.data.count
            totalRebates.value = res.data.totalRebates || 0
        }
    } catch (error) {
        console.error('獲取返利列表失敗:', error)
    }
}

const fetchWithdrawData = async (page: number, pageSize: number) => {
    try {
        // 这里需要替换为实际的提现记录API
        const res = await api.readWithdrawList({ pageNo: page, pageSize })
        if (res.code === 200) {
            withdrawData.value = res.data.dataList
            withdrawPagination.value.total = res.data.count
        }
    } catch (error) {
        console.error('获取提现记录失败:', error)
    }
}

const onTableChange = (paginationConfig: TablePaginationConfig) => {
    const { current = 1, pageSize = 6 } = paginationConfig
    pagination.value = {
        ...pagination.value,
        current,
        pageSize
    }
    fetchData(current, pageSize)
}

const onWithdrawTableChange = (paginationConfig: TablePaginationConfig) => {
    const { current = 1, pageSize = 6 } = paginationConfig
    withdrawPagination.value = {
        ...withdrawPagination.value,
        current,
        pageSize
    }
    fetchWithdrawData(current, pageSize)
}

const showWithdrawModal = () => {
    withdrawForm.value.amount = 0;
    modalVisible.value = true;
};

const handleWithdraw = async () => {
    if (!withdrawForm.value.amount) {
        message.warning('请输入领取金额');
        return;
    }
    if (withdrawForm.value.amount > rebatesInfo.value.amountCanBeWithdrawn) {
        message.warning('领取金额不能大于可领取金额');
        return;
    }

    confirmLoading.value = true;
    try {
        const res = await api.submitWithdraw({ amount: withdrawForm.value.amount });
        if (res.code === 200) {
            message.success('领取申请已提交');
            modalVisible.value = false;
            // 刷新返利信息
            fetchRebatesInfo();
            // 刷新领取记录（无论当前在哪个标签页）
            fetchWithdrawData(withdrawPagination.value.current, withdrawPagination.value.pageSize);
            // 如果不在领取记录页面，自动切换到领取记录页面
            if (activeTab.value !== '领取记录') {
                activeTab.value = '领取记录';
            }
        } else {
            message.error(res.message || '领取申请失败');
        }
    } catch (error) {
        message.error('领取申请失败');
    } finally {
        confirmLoading.value = false;
    }
};

const fetchRebatesInfo = async () => {
    try {
        const res = await api.readRebatesNum();
        if (res.code === 200) {
            rebatesInfo.value = res.data;
        }
    } catch (error) {
        console.error('获取返利信息失败:', error);
    }
};

onMounted(() => {
    fetchRebatesInfo();
    fetchData(pagination.value.current, pagination.value.pageSize);
    fetchWithdrawData(withdrawPagination.value.current, withdrawPagination.value.pageSize);
});
</script>

<style scoped>
:deep(.ant-segmented) {
    background-color: #f0f0f0;
}

:deep(.ant-btn-primary) {
    color: white !important;
}

:deep(.ant-modal-footer .ant-btn-primary) {
    color: white !important;
}
</style>
