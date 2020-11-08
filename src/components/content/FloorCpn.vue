<template>
  <div>
    <div class="floor-title">
      {{floorTitle}}
    </div>
    <div class="floor-body">
      <div class="floor-one">
        <img :src="floorData0.image" width="100%">
      </div>
      <div>
        <div class="floor-two">
          <img :src="floorData1.image" width="100%">
        </div>
        <div>
          <img :src="floorData2.image" width="100%">
        </div>
      </div>
    </div>
    <div class="floor-rule">
        <div v-for="(item, index) in floorData.slice(3)" :key="index">
          <img :src="item.image" width="100%">
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'FloorCpn',
    props: {
      floorData: {
        type: Array,
        default() {
          return []
        }
      },
      floorTitle: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        floorData0: {},
        floorData1: {},
        floorData2: {}
      }
    },
    watch: {
      floorData(val) {
        this.floorData0 = this.floorData[0]
        this.floorData1 = this.floorData[1]
        this.floorData2 = this.floorData[2]
      }
    }
  }
</script>

<style scoped>
  .floor-title {
    text-align: center;
    font-size: 0.875rem;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .floor-body {
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .floor-body div {
    width: 10rem;
    box-sizing: border-box;
  }
  .floor-one {
    border-right: 1px solid #ddd;
  }
  .floor-two {
    border-bottom: 1px solid #ddd;
  }
  .floor-rule {
    display: flex;
    background-color: #fff;
  }
  .floor-rule div {
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
  }
  .floor-rule div:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
</style>