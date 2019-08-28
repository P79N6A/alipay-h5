<template>
  <cubePage title="选择车型" type="drawer">
    <div slot="content">
      <div class="view-wrapper">
        <div class="index-list-wrapper">
          <cube-index-list
            :data="cityData"
            @select="selectItem"
          ></cube-index-list>
        </div>
      </div>
    </div>
  </cubePage>
</template>

<script>
import cubePage from "@/components/cube-page";
import cityData from '@/common/listJson.json'

export default {
  components: {
    cubePage
  },
   data() {
      return {
        cityData: cityData
      }
    },
    methods: {
      selectItem(item) {
        console.log(item.name)
        this.$router.push('/')
      }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .view-wrapper
    position: fixed
    top: 54px
    left: 0
    bottom: 0
    width: 100%
    .index-list-wrapper
      height: 98%
      width: 94%
      margin: 0 auto
      overflow: hidden
</style>