<template>
    <div id="app" class="wrapper">
        <cube-popup class="cube-extend-popup" :mask="false" type="my-popup" ref="myPopup">
            {{errorMessage}}
        </cube-popup>
        <cube-view></cube-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import CubeView from './components/cube-view.vue'
  import { authorization, getUserInfo } from '@/api'
  import { getQueryString, ready } from '@/utils'

  export default {
    data () {
      return {
        errorMessage: ''
      }
    },
    computed: {
      authData () {
        return this.$store.state.authData
      },
      user () {
        return this.$store.state.user
      },
      model () {
        return this.$store.state.model
      }
    },
    components: {
      CubeView
    },
    methods: {
      showPopup (refId, e = '请求错误') {
        this.errorMessage = e
        const component = this.$refs[refId]
        component.show()
        setTimeout(() => {
          component.hide()
        }, 2000)
      },
      async getUserInfo () {
        try {
          const {data} = await getUserInfo({
            id: this.user.customerId
          })
          this.model.name = data.customerName
          this.model.idCard = data.certificateNum
          this.model.phoneNumber = data.createdStamp
        } catch (e) {
          this.showPopup('myPopup', JSON.stringify(e))
        }
      },
      async authorization () {
        try {
          this.authData.authCode = getQueryString('auth_code')
          this.authData.state = getQueryString('state')
          if (!this.authData.authCode && this.payEnv === 'alipay') {
            location.replace(`https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019082366406532&scope=auth_user&state=${this.user.customerId}&redirect_uri=${encodeURI(window.location.href)}`)
          }
          if (this.authData.authCode && this.authData.state) {
            const params = {
              auth_code: this.authData.authCode,
              state: this.authData.state
            }
            const {data} = await authorization(params)
            this.user.aliPayUserId = data.data.aliPayUserId
          }
          this.getUserInfo()
        } catch (e) {
          this.showPopup('myPopup', JSON.stringify(e))
        }
      },
      init () {
        this.user.customerId = getQueryString('customerId') || '170828129252'
        this.user.token = getQueryString('token') || 'CFDE472E32C543F29B4CBFFB7ACD9E05'
        localStorage.setItem('token', this.user.token)
        // 判断微信还是支付宝
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
          // 微信
          this.payEnv = 'weixin';
        } else if (/AlipayClient/.test(window.navigator.userAgent)) {
          // 支付宝
          this.payEnv = 'alipay';
        } else {
          this.payEnv = 'others';
        }
        this.authorization()
      }
    },
    mounted () {
      this.init()
      ready(function () {
        // AlipayJSBridge.call('verifyIdentity', {verifyId: 'xxx', isNeedFP: 'true',}, function (result) {
        //   AlipayJSBridge.call('toast', {
        //     content: result.code
        //   });
        //   // AlipayJSBridge.call('toast', {
        //   //   content: result.verifyId
        //   // });
        // });
      });

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
