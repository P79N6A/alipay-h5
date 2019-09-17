<template>
    <div id="app" class="wrapper">
        <cube-view></cube-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import CubeView from './components/cube-view.vue'
  import { getQueryString } from '@/utils'

  export default {
    components: {
      CubeView
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      init () {
        this.user.customerId = getQueryString('customerId') || '170828129252'
        this.user.token = getQueryString('token') || '6A966FF90AB44233A1D18F878EAA99B2'
        this.user.alipayVersion = Ali.alipayVersion
        localStorage.setItem('token', this.user.token)
        if(!this.user.customerId || !this.user.token) {
          this.$router.replace({
            name: 'notFound'
          })
        }
      }
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
