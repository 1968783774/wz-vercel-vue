<script>
export default {
  name: "PropertyRegistration",
  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"neighbourhood"})
  },
}
</script>

<template>
  <div>
    Property Registration
  </div>
</template>

<style scoped>

</style>