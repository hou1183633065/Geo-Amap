<template>
  <div id="app">
    <marker-clusterer></marker-clusterer>
  </div>
</template>

<script>
import MarkerClusterer from "./components/MarkerCluster";
export default {
  name: "app",
  components: {
    MarkerClusterer
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="css" src="@/assets/App.css"></style>
