<template>
  <div id="app">
    <point-simplifier @drag="dragMap" class="mapbox"></point-simplifier>
  </div>
</template>

<script>
import PointSimplifier from './components/PointSimplifier'
export default {
  name: 'app',
  components: {
    PointSimplifier
  },
  data () {
    return {
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null
      }
    }
  },
  methods: {
    dragMap (data) {
      console.log(data)
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        nearestJunction: data.nearestJunction,
        nearestRoad: data.nearestRoad,
        nearestPOI: data.nearestPOI
      }
    }
  }
}
</script>

<style lang="css" src="@/assets/App.css"></style>
