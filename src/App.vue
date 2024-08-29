<template>
  <div id="app">
    <router-view>
      <LoginInterface></LoginInterface>
    </router-view>
  </div>
</template>

<script>
import LoginInterface from "src/components/LoginComponents/LoginInterface.vue";

export default {
  name: 'App',
  components: {
    LoginInterface,
  },
  // created() {
  //   if (this.$router.path !== "/home"&&this.$router.path !== "/")
  //     this.$router.replace("home",()=>{})
  // }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
