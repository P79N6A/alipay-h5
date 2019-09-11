<template>
    <cubePage title="选择车型" type="drawer">
        <div slot="content">
            <div class="view-wrapper">
                <div class="index-list-wrapper">
                    <cube-index-list
                            :navbar="false"
                            :data="modelList"
                            @select="selectItem"
                    ></cube-index-list>
                </div>
            </div>
        </div>
    </cubePage>
</template>

<script>
  import cubePage from "@/components/cube-page";
  import { getCardModel } from '@/api/index'

  export default {
    components: {
      cubePage
    },
    computed: {
      model() {
        return this.$store.state.model
      }
    },
    data () {
      return {
        modelList: []
      }
    },
    methods: {
      selectItem (item) {
        this.model.vehicleModel = item.name
        // this.$store.dispatch('setModelName', item.name)
        this.$router.push({name: 'name'})
      },
      async get (carSeriesId) {
        if (!carSeriesId)
          return
        try {
          const params = {
            param: {serialId: carSeriesId}
          }
          const {data} = await getCardModel(params);
          this.init(data)
        } catch (e) {
          console.log(e)
        }
      },
      init (data) {
        if (data && data.list) {
          const arr = data.list.map(item => {
            return {
              name: item.carName,
              ...item
            }
          })
          this.modelList = [
            {
              name: '在售车型',
              items: arr
            }
          ]
        }

      }
    },
    mounted () {
      this.get(this.$route.query.carSeriesId)
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
