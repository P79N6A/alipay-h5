<template>
    <cubePage title="申请评估协议" type="drawer">
        <div slot="content">
            <div class="view-wrapper">
                <iframe class="my-iframe" src="http://file.keking.cn/onlinePreview?url=http%3A%2F%2Ffile.keking.cn%3A80%2Fdemo%2F%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE20190529clean.docx&officePreviewType=pdf" frameborder="0"></iframe>
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

