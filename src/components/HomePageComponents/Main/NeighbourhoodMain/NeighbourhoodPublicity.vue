<script>
export default {
  name: "NeighbourhoodPublicity",
  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"neighbourhood"})
  },
}
</script>

<template>
  <div>
    <h1>Neighbourhood Publicity</h1>
  </div>
</template>

<style scoped>

</style>