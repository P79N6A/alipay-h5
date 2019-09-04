<template>
    <cubePage title="选择品牌" type="drawer">
        <div slot="content">
            <div class="view-wrapper">
                <div class="index-list-wrapper">
                    <cube-index-list
                            ref="indexList"
                            :data="brandData"
                            @select="selectItem"
                    ></cube-index-list>
                </div>
            </div>
        </div>
    </cubePage>
</template>

<script>
  import cubePage from "@/components/cube-page";
  import { getBrand } from '@/api/index'
  import _ from 'lodash'

  export default {
    components: {
      cubePage
    },
    data () {
      return {
        brandData: []
      }
    },
    methods: {
      selectItem (item) {
        this.$router.push({name: 'carSeries', query: {brandId: item.id}})
      },
      async get () {
        try {
          const params = {
            type: 7,
            pid: 0,
            rt: 'master'
          }
          let data = await getBrand(params)
          this.init(data)
        } catch (e) {
          console.log(e)
        }
      },
      init (data) {
        data = data.replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, "'$1':");
        data = eval('('+ data + ')');
        this.brandData = _.chain(data.DataList).groupBy(item => {
          return item.tSpell
        }).map((values, key) => ({name: key, items: values})).value()
        console.log(this.brandData)
      }
    },
    mounted () {
      this.get()
    }
  }
  ;
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
