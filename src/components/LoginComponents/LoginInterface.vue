<script>
  import LoginMain from "src/components/LoginComponents/LoginMain.vue";
  import LoginFoot from "src/components/LoginComponents/LoginFoot.vue"

  export default {
    name: "LoginInterface",
    components: {LoginMain,LoginFoot}
  }

</script>

<template>
  <el-container style="background-color: whitesmoke; height: 100%">
    <el-header style="height: 10%">

    </el-header>
    <el-main style="background-color: rgba(238,238,238);height: 100%">
      <LoginMain></LoginMain>
    </el-main>
    <el-footer style="background-color: rgba(46,46,55); height: 12%">
      <LoginFoot></LoginFoot>
    </el-footer>
  </el-container>
</template>

<style scoped>


</style>