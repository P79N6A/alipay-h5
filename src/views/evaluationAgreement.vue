<template>
    <cubePage title="服务协议" type="drawer">
        <div slot="content">
            <div class="view-wrapper">
                <cube-scroll
                        ref="scroll"
                        :data="items"
                        :options="options">
                    <div class="image-list">
                        <img v-for="(item, index) in items" :src="item" :key="index" alt="">
                    </div>
                </cube-scroll>
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
    data() {
      return {
        items: [
          '/serviceagreement/fwxy/fwxy_0.jpg',
          '/serviceagreement/fwxy/fwxy_1.jpg',
          '/serviceagreement/fwxy/fwxy_2.jpg',
          '/serviceagreement/fwxy/fwxy_3.jpg',
          '/serviceagreement/fwxy/fwxy_4.jpg',
          '/serviceagreement/fwxy/fwxy_5.jpg',
          '/serviceagreement/fwxy/fwxy_6.jpg',
          '/serviceagreement/fwxy/fwxy_7.jpg',
        ],
        options: {
          scrollbar:{ fade: this.true },
          startY: 0
        }
      }
    },
    mounted () {
    }
  };
</script>

<style lang="stylus">

    .my-iframe {
        width 100%
        height 100vh
    }

    .image-list {
        height: 100%;
        overflow-y: auto;

        img {
            width 100%;
            margin 0;
            padding 0;
            display block
        }
    }
</style>

