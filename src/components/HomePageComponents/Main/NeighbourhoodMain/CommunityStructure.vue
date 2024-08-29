<script>
export default {
  name: "CommunityStructure",
  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"neighbourhood"})
  },
}
</script>

<template>
<div>
  <h1>Community Structure</h1>
  <p>This is the Community Structure page</p>
</div>
</template>

<style scoped>

</style>