<template>
    <div class="cube-form-item border-bottom-1px cube-form-item_required">
        <div class="cube-form-label"><span>所选车型</span></div>
        <div class="cube-validator cube-form-field" :class="{'cube-validator_invalid': !model.vehicleModel && invalid}">
            <div class="cube-validator-content" @click="chooseModel">
                <div class="cube-input">
                    <div class="cube-input-field model-box">
                                        <span v-if="!model.vehicleModel" class="input-placeholder">
                                            请选择车型
                                        </span>
                        <span v-else>
                                            {{model.vehicleModel}}
                                        </span>
                    </div>
                </div>
            </div>
            <i class="cubeic-arrow" v-if="!invalid"></i>
            <div class="cube-validator-msg" @click="showToastType">
                <span class="cube-validator-msg-def"></span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "model",
    props: {
      invalid: {
        type: Boolean,
        default: false
      },
      model: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      chooseModel () {
        this.$router.push("/brand");
      },
      showToastType() {
        const toast = this.$createToast({
          txt: '此为必填项',
          type: 'warn',
          time: 1000,
        })
        toast.show()
      }
    }
  }
</script>

<style scoped>

</style>
