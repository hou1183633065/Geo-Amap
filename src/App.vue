<template>
  <div id="app">
    <!-- <electric-fence></electric-fence> -->
    <track-play-back></track-play-back>
  </div>
</template>

<script>
import TrackPlayBack from "@/components/TrackPlayBack";
import ElectricFence from "@/components/ElectricFence";
export default {
  name: "app",
  components: {
    TrackPlayBack,
    ElectricFence
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="css" src="@/assets/App.css"></style>
