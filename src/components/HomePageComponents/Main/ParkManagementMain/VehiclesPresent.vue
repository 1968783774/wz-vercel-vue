<script>
export default {
  name: "VehiclesPresent",
  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"park"})
  },
}
</script>

<template>
  <div>
    <h2>Vehicles Present</h2>
  </div>
</template>

<style scoped>

</style>