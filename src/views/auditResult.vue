<template>
    <div class="result">
        <div v-if="!pass" class="result-ing">—— 评估中，请耐心等待 ——</div>
        <div v-else class="result-message">
            <span class="res-key">您的评估结果：</span>
            <span class="res-value">{{msg}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "auditResult",
    data() {
      return {
        pass: true,
        msg: '通过'//通过 拒绝 电话审核 未下单客户 支付宝账户异常客户 支付宝账户未实名 订单信息与本人信息不一致
      }
    }
  }
</script>

<style scoped>
    .result {
        font-size: 18px;
        padding-top: 20px;
    }

    .result-ing {
        text-align: center;
    }

    .result-message {
        padding-left: 10px;
    }

    .res-key {
        color: #999;
    }
</style>
