<script>
export default {
  name: "CarManagement",
  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"park"})
  },
}
</script>

<template>
  <div>
    <h1>Car Management</h1>
  </div>
</template>

<style scoped>

</style>