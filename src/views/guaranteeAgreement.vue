<template>
    <cubePage title="汽车分期业务综合授信(担保)协议" type="drawer">
        <div slot="content">
            <div class="view-wrapper">
                <div style="width: 100%; height: 100vh">
                    <cube-scroll
                            ref="scroll"
                            :data="items"
                            :options="options">
                        <img class="img-item" v-for="(item, index) in items" :src="item" :key="index" alt="">
                    </cube-scroll>
                </div>
            </div>
        </div>
    </cubePage>
</template>

<script>
  import cubePage from "@/components/cube-page";

  export default {
    components: {
      cubePage
    },
    data () {
      return {
        items: [
          '/serviceagreement/dbxy/dbxy_0.jpg',
          '/serviceagreement/dbxy/dbxy_1.jpg',
          '/serviceagreement/dbxy/dbxy_2.jpg',
          '/serviceagreement/dbxy/dbxy_3.jpg',
          '/serviceagreement/dbxy/dbxy_4.jpg',
          '/serviceagreement/dbxy/dbxy_5.jpg',
          '/serviceagreement/dbxy/dbxy_6.jpg',
        ],
        options: {
          scrollbar: {fade: true},
          startY: 0
        }
      }
    },
    mounted () {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 800)
    }
  };
</script>

<style lang="stylus">

    .img-item {
        width 100%;
        margin 0;
        padding 0;
        display block
    }
</style>

