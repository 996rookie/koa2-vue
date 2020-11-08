<template>
  <div>
    <FloorCpn :floorData="floor1" :floorTitle="floorName.floor1" />
    <FloorCpn :floorData="floor2" :floorTitle="floorName.floor2" />
    <FloorCpn :floorData="floor3" :floorTitle="floorName.floor3" />
  </div>
</template>

<script>
  import { getHomeMultidata } from 'network/home'

  import FloorCpn from 'components/content/FloorCpn'

  export default {
    name: 'Floor',
    components: {
      FloorCpn
    },
    data() {
      return {
        floor1: [],
        floor2: [],
        floor3: [],
        floorName: {}
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.floor1 = res.floor1
        this.floor2 = res.floor2
        this.floor3 = res.floor3
        this.floorName = res.floorName
      })
    }
  }
</script>

<style scoped>

</style>