<script>
export default {
  name: "StallManagement",
  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"park"})
  },
}
</script>

<template>
  <div>
    <h1>Stall Management</h1>
  </div>
</template>

<style scoped>

</style>