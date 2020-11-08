<template>
  <van-nav-bar>
    <slot slot="left" name="left" class="left"></slot>
    <slot slot="title" name="title" class="title"></slot>
    <slot slot="right" name="right" class="right"></slot>
  </van-nav-bar>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>

<style scoped>

</style>