<template>
    <cubePage title="申请评估协议" type="drawer">
        <div slot="content">
            <div class="view-wrapper">
                <iframe class="my-iframe" src="/serviceagreement/qcfqdb.html" frameborder="0"></iframe>
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
    mounted () {
    }
  };
</script>

<style lang="stylus">

    .my-iframe {
        width 100%
        height 100vh
    }
</style>

