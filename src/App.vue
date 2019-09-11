<template>
    <div id="app" class="wrapper">
        <cube-view></cube-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import CubeView from './components/cube-view.vue'
  import { authorization } from '@/api'
  import { getQueryString, ready } from '@/utils'

  export default {
    data () {
      return {}
    },
    computed: {
      authData () {
        return this.$store.state.authData
      }
    },
    components: {
      CubeView
    },
    methods: {
      async authorization () {
        try {
          location.replace(`https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019082366406532&scope=auth_user&state=customer_123&redirect_uri=${encodeURI(window.location.href)}`)
          this.authData.authCode = getQueryString('auth_code')
          this.authData.state = getQueryString('state')
          if (this.authData.authCode && this.authData.state) {
            const params = {
              auth_code: this.authData.authCode,
              state: this.authData.state
            }
            const {data} = await authorization(params)
            ready(function () {
              AlipayJSBridge.call('toast', {
                content: JSON.stringify(data)
              });
            })
          }
        }catch (e) {
          ready(function () {
              AlipayJSBridge.call('toast', {
                content: e
              });
          })
        }
      },
      init () {
        // 判断微信还是支付宝
        if (/MicroMessenger/.test(window.navigator.userAgent)) {
          // 微信
          this.payEnv = 'weixin';
        } else if (/AlipayClient/.test(window.navigator.userAgent)) {
          // 支付宝
          this.payEnv = 'alipay';
          this.authorization()
        } else {
          this.payEnv = 'others';
        }
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
</style>
