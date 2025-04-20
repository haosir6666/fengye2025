<template>
    <div class="welcome-index">
        <div class="left">
            <div class="data bay-data">
                <div class="headr">
                    <span class="font-600 font-size-17px">交易情况</span>
                    <span class="color-gray font-size-12px">
                        刷新以获得最新数据
                    </span>
                </div>
                <div class="headr mt-20px">
                    <span class="color-gray font-size-12px">
                        更多数据和信息，持续更新中...
                    </span>
                </div>
            </div>
        </div>
        <div class="right  ">
            <div class="headr data">帮助中心</div>
            <div class="headr data">
                <span class="color-gray font-size-12px">
                    更多数据和信息，持续更新中...
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.welcome-index {
    display: flex;
    gap: 10px;
    height: calc(100vh - 75px);
    .data {
        padding: 10px;
        background-color: #fff;
        border-radius: 7px;
    }

    .left {
        flex: 1;
    }

    .right {
        width: 260px;
    }
}
</style>