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
        console.log(item.name)
        this.$router.push({name: 'carModel', query: {carSeriesId: item.id}})
      },
      async get (brandId) {
        if (!brandId)
          return
        try {
          const params = {
            type: 7,
            pid: brandId,
            rt: 'serial'
          }
          let data = await getCarSeries(params)
          this.init(data)
        } catch (e) {
          console.log(e)
        }
      },
      init (data) {
        data = data.replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, "'$1':");
        data = eval('(' + data + ')');
        this.carSeries = data.map(item => {
          return {
            name: item.gname,
            items: item.child
          }
        })
        console.log(this.carSeries)
      }
    },
    mounted () {
      this.get(this.$route.query.brandId)
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
