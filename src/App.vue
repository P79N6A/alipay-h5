<template>
    <div id="app" class="wrapper">
        <cube-view></cube-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import CubeView from './components/cube-view.vue'
  import { getQueryString } from '@/utils'
  import { authorization, getUserInfo } from '@/api'

  export default {
    components: {
      CubeView
    },
    computed: {
      model () {
        return this.$store.state.model
      },
      user () {
        return this.$store.state.user
      },
      authData () {
        return this.$store.state.authData
      },
    },
    methods: {
      init () {
        this.user.customerId = getQueryString('customerId') || '170828129252'
        this.user.token = getQueryString('token') || '6A966FF90AB44233A1D18F878EAA99B2'
        if(Ali.alipayVersion) {
          this.user.alipayVersion = Ali.alipayVersion.split('.').slice(0, 3).join('.')
        }
        // this.user.alipayVersion = '10.0'
        localStorage.setItem('token', this.user.token)
        if(!this.user.customerId || !this.user.token) {
          this.$router.replace({
            name: 'notFound'
          })
          return
        }
        this.getPlatform()
      },
      showPopup (e = '请求错误') {
        const toast = this.$createToast({
          txt: e,
          type: 'warn',
          time: 2000,
        })
        toast.show()
      },
      // 获取用户信息
      async getUserInfo () {
        try {
          const {data} = await getUserInfo({
            id: this.user.customerId
          })
          this.model.name = data.customerName
          this.model.idCard = data.certificateNum
          this.model.phoneNumber = data.createdStamp
        } catch (e) {
          console.log(e)
          this.showPopup(e)
        }
      },
      // 授权
      async authorization () {
        try {
          this.authData.authCode = getQueryString('auth_code')
          this.authData.state = getQueryString('state')
          if (!this.authData.authCode && this.payEnv === 'alipay') {
            location.replace(`https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019082366406532&scope=auth_user&state=customer_${this.user.customerId}&redirect_uri=${window.location.href}`)
            return
          }
          if (this.authData.authCode && this.authData.state) {
            const params = {
              auth_code: this.authData.authCode,
              state: this.authData.state
            }
            const {data} = await authorization(params)
            this.user.aliPayUserId = data.aliPayUserId
          }
          this.getUserInfo()
        } catch (e) {
          this.showPopup(e)
        }
      },
      // 初始化
      getPlatform () {
        const userAgent = window.navigator.userAgent
        // 判断微信还是支付宝
        if (/MicroMessenger/.test(userAgent)) {
          // 微信
          this.payEnv = 'weixin';
        } else if (/AlipayClient/.test(userAgent)) {
          // 支付宝
          this.payEnv = 'alipay';
        } else {
          this.payEnv = 'others';
        }
        this.authorization()
      },
    },
    created () {
      this.init()
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .wrapper {
        background-color: #efeff4;
    }

    html, body, #app
        height: 100%

    body
        background-color: #fff
        overflow: hidden

    .cube-bar
        z-index: 10
        position: absolute
        right: 0
        left: 0
        height: 44px
        line-height: 44px
        text-align: center
        background-color: #EDF0F4
        box-shadow: 0 2px 1px #e9eaea
        -webkit-backface-visibility: hidden
        backface-visibility: hidden

        h1
            font-size: 18px
            font-weight: 500

    .cube-content
        position: absolute
        top: 10px;
        left: 0
        right: 0
        bottom: 0
        overflow: scroll
        -webkit-overflow-scrolling: touch

        .cube-list
            padding-left: 10px
            z-index: 1

            .cube-index-list-group
                .cube-index-list-anchor
                    font-size: 16px

                ul
                    .cube-item
                        height: 40px
                        line-height: 40px
                        padding-left: 16px

                        .link
                            display: block
                            position: relative
                            width: 100%
                            color: #333
                            text-decoration: none
                            outline: 0

                            .cubeic-arrow
                                position: absolute
                                right: 0
                                padding: 0 5px
                                color: #ccc

            .cube-index-list-nav
                margin-right: 0px
                padding: 8px 5px
                border-radius: 3px 0 0 3px
                background: #f7f7f7
                box-shadow: 0 0 5px #808080 47

                > ul
                    > li
                        padding: 8px 0

            .cube-index-list-fixed
                font-size: 16px


    .view-wrapper
        position: fixed
        top: 10px;
        left: 0
        bottom: 0
        width: 100%

        .index-list-wrapper
            height: 98%
            width: 94%
            margin: 0 auto
            overflow: hidden

    .cube-extend-popup .cube-popup-content {
        padding: 20px;
        color: #fff;
        font-size 16px;
        background-color: rgba(0, 0, 0, .8);
    }
</style>
