<template>
    <!--    <div>-->
    <!--        <header class="cube-bar">-->
    <!--            <h1>申请评估</h1>-->
    <!--        </header>-->
    <section class="cube-content" ref="mfct">
        <cube-form :model="model" @validate="validateHandler" ref="formData" class="cube-form_groups">
            <cube-form-group>
                <cube-form-item v-for="(item, index) in fields" :key="index" :field="item"></cube-form-item>
                <model :model="model" :invalid="invalid"></model>
                <cube-checkbox v-model="model.agree" class="protocol-checkbox">
                    本人已阅读并同意 <span class="link-blue" @click.stop="openProtocol">服务协议</span>、<span class="link-blue" @click.stop="openGuaranteeAgreement">汽车分期业务综合授信(担保)协议</span>
                </cube-checkbox>
            </cube-form-group>
            <cube-form-group>
                <cube-button @click="submitHandler" :disabled="!model.agree">提交申请</cube-button>
            </cube-form-group>
        </cube-form>
    </section>
    <!--    </div>-->
</template>

<script>
  import model from './model'
  // import { ready } from '@/utils'
  import { getVid, submit } from '@/api'

  export default {
    name: "home",
    components: {
      model
    },
    computed: {
      model () {
        return this.$store.state.model
      },
      user () {
        return this.$store.state.user
      }
    },
    data () {
      return {
        validity: {},
        invalid: false,
        valid: undefined,
        fields: [
          {
            type: "input",
            modelKey: "name",
            label: "申请姓名",
            props: {
              placeholder: "请输入姓名"
            },
            rules: {
              required: true,
              custom: val => {
                return val.length >= 2;
              }
            },
            messages: {
              custom: "不能少于两位"
            }
          },
          {
            type: "input",
            modelKey: "idCard",
            label: "身份证号",
            props: {
              placeholder: "请输入身份证号"
            },
            rules: {
              required: true
            }
          },
          {
            type: "input",
            modelKey: "phoneNumber",
            label: "手机号码",
            props: {
              placeholder: "请输入手机号"
            },
            rules: {
              required: true
            }
          }
        ]
      };
    },
    methods: {
      // 表单提交
      submitHandler () {
        this.model.vehicleModel ? this.invalid = false : this.invalid = true
        if (this.valid && this.model.vehicleModel) {
          this.getVid()
        }
      },
      /**
       * 获取Vid
       * @return {Promise<void>}
       */
      async getVid () {
        // this.showPopup(this.user.alipayVersion)
        try {
          const params = {
            customerId: this.user.customerId,
            customerName: this.model.name,
            alipayVersion: this.user.alipayVersion
          }
          const {data} = await getVid(params)
          this.user.vid = data.vid
          if(/AlipayClient/.test(window.navigator.userAgent)) {
            //this.verifyIdentity()
            this.submit()
          } else {
            this.submit()
          }
        } catch (e) {
          this.showPopup(e)
        }
      },
      /**
       * 验证vid
       */
      verifyIdentity () {
        Ali.call('verifyIdentity', {verifyId: this.user.vid, isNeedFP: 'true',}, function (result) {
          // this.showPopup(result.code)
          if(result.code == 1000) {
            this.submit()
          }
        })
      },
      // 提交申请评估
      async submit () {
        try {
          const params = {
            customerId: this.user.customerId,
            customerName: this.model.name,
            alipayVersion: this.user.alipayVersion,
            vid: this.user.vid,
          }
          const {data} = await submit(params)
          if(data.needAuth) {
            this.showBtn()
          }
        }catch (e) {
          this.showPopup(e)
        }
      },
      showBtn() {
        this.$createDialog({
          type: 'confirm',
          icon: 'cubeic-alert',
          title: 'A类认证',
          content: '系统检测到您还未进行A类认证，请你在24小时之内完成A类认证，方可继续进行评估申请',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            //http://custweb.stable.alipay.net/certify/personal/car_fin // 测试环境
            //https://custweb.alipay.com/certify/personal/car_fin // 生产环境
            location.replace(`https://custweb.alipay.com/certify/personal/car_fin?continue=${encodeURI(window.location.href)}&exit=false`)
          },
          onCancel: () => {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: '取消'
            }).show()
          }
        }).show()
      },
      // 表单验证
      validateHandler (result) {
        // this.validity = result.validity;
        this.valid = result.valid;
      },
      // 查看协议
      openProtocol () {
        this.$router.push('/evaluationAgreement')
      },
      openGuaranteeAgreement () {
        this.$router.push('/guaranteeAgreement')
      },
      showPopup (e = '请求错误') {
        const toast = this.$createToast({
          txt: e,
          type: 'warn',
          time: 2000,
        })
        toast.show()
      }
    },
    mounted () {
      this.$refs.formData.validate();
    }
  };
</script>

<style lang="stylus">

    .cube-content {
        margin: 10px;
    }

    .cube-bar h1 {
        font-size: 16px;
        font-weight: 700;
    }

    .link-blue {
        color: #0099FF;
        cursor pointer
    }

    .cube-form_standard .cube-input .model-box {
        padding: 0.346667rem 0;
        background-color: transparent;
    }

    .cube-validator .cube-input .model-box {
        color: inherit;

        .input-placeholder {
            color: $input-placeholder-color;
        }

    }

    .cube-checkbox-label {
        position absolute
        left 20px;
        z-index 2
    }

    .protocol-checkbox {
        height 60px;
    }
</style>
