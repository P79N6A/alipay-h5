<template>
    <cubePage title="选择车系" type="drawer">
        <div slot="content">
            <div class="view-wrapper">
                <div class="index-list-wrapper">
                    <cube-index-list
                            :navbar="false"
                            :data="carSeries"
                            @select="selectItem"
                    ></cube-index-list>
                </div>
            </div>
        </div>
    </cubePage>
</template>

<script>
  import cubePage from "@/components/cube-page";
  import { getCarSeries } from '@/api/index'
  import _ from 'lodash'

  export default {
    components: {
      cubePage
    },
    data () {
      return {
        carSeries: []
      }
    },
    methods: {
      selectItem (item) {
        this.$router.push({name: 'carModel', query: {carSeriesId: item.id}})
      },
      async get (brandId) {
        if (!brandId)
          return
        try {
          const params = {
            // type: 7,
            masterid: brandId,
            // rt: 'serial'
          }
          let {data} = await getCarSeries(params)
          this.init(data)
        } catch (e) {
          console.log(e)
        }
      },
      init (data) {
        // data = data.replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, "'$1':");
        // data = eval('(' + data + ')');
        this.carSeries = _.chain(data).groupBy(item => item.brandName).map((values, key)=>{
          const valueBean = values.map(item => {
            return {
              name: item.seriesName,
              value: item.id,
              ...item
            }
          })
          return {
            name: key,
            items: valueBean
          }
        }).value()
      }
    },
    mounted () {
      this.get(this.$route.query.brandId)
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
