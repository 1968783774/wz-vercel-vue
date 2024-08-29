<script>
export default {
  name: "ParkingRecord",
  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"park"})
  },
}
</script>

<template>
  <div>
    <h1>Parking Record</h1>
  </div>
</template>

<style scoped>

</style>