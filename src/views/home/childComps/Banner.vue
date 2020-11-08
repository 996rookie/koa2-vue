<template>
  <div>
    <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
  </div>
</template>

<script>
  import { getHomeMultidata } from 'network/home'
  export default {
    name: 'Banner',
    data() {
      return {
        adBanner: {}
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.adBanner = res.advertesPicture
      })
    }
  }
</script>

<style scoped>

</style>