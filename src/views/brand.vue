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
  import { ready } from "@/utils";

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
            // type: 7,
            // pid: 0,
            // rt: 'master'
          }
          let {data} = await getBrand(params)
          this.init(data)
        } catch (e) {
          console.log(e)
        }
      },
      init (data) {
        // data = data.replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, "'$1':");
        // data = eval('('+ data + ')');
        this.brandData = _.chain(data).groupBy(item => {
          return item.alphabetCode
        }).map((values, key) => {
          const valueBean = values.map(item => {
            return {
              name: item.brandName,
              value: item.id,
              ...item
            }
          })
          return {name: key, items: valueBean}
        }).value()
      }
    },
    mounted () {
      this.get()
    }
  }
  ;
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
