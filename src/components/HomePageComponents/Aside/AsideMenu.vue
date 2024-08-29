<script>
export default {
  name: "asideMenu",
  props: {
    activeIndex: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
    };
  },
  computed: {
    getTypeMenu(){
      return this.$store.getters.getTypeMenu;
    }
  },
  methods: {
  },
}
</script>

<template>
  <div>
    <el-menu
        class="wzz"
        router="router"
        :default-active="activeIndex"
        v-if="getTypeMenu === 'property'"
        >
      <el-menu-item index="/property/1" style="color: rgba(140,140,140)">
        <i class="el-icon-menu"></i>
        <span slot="title">物业信息</span>
      </el-menu-item>
      <el-menu-item index="/property/2" style="color: rgba(140,140,140)">
        <i class="el-icon-menu"></i>
        <span slot="title">小区信息</span>
      </el-menu-item>
      <el-menu-item index="/property/3" style="color: rgba(140,140,140)">
        <i class="el-icon-setting"></i>
        <span slot="title">岗位管理</span>
      </el-menu-item>
      <el-menu-item index="/property/4" style="color: rgba(140,140,140)">
        <i class="el-icon-setting"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
    </el-menu>

    <el-menu
        class="wzz"
        router="router"
        :default-active="activeIndex"
        v-if="getTypeMenu === 'park'"
    >
      <el-menu-item index="/park/management" style="color: rgba(140,140,140)">
        <i class="el-icon-menu"></i>
        <span slot="title">停车场管理</span>
      </el-menu-item>
      <el-menu-item index="/park/stall" style="color: rgba(140,140,140)">
        <i class="el-icon-menu"></i>
        <span slot="title">车位管理</span>
      </el-menu-item>
      <el-menu-item index="/park/car" style="color: rgba(140,140,140)">
        <i class="el-icon-setting"></i>
        <span slot="title">车辆管理</span>
      </el-menu-item>
      <el-menu-item index="/park/present" style="color: rgba(140,140,140)">
        <i class="el-icon-setting"></i>
        <span slot="title">在场车辆</span>
      </el-menu-item>
      <el-menu-item index="/park/record" style="color: rgba(140,140,140)">
        <i class="el-icon-setting"></i>
        <span slot="title">停车记录</span>
      </el-menu-item>
    </el-menu>

    <el-menu
        class="wzz"
        router="router"
        :default-active="activeIndex"
        v-if="getTypeMenu === 'neighbourhood'"
    >
      <el-menu-item index="/neighbourhood/houses" style="color: rgba(140,140,140)">
        <i class="el-icon-menu"></i>
        <span slot="title">房屋管理</span>
      </el-menu-item>
      <el-menu-item index="/neighbourhood/register" style="color: rgba(140,140,140)">
        <i class="el-icon-menu"></i>
        <span slot="title">产权登记</span>
      </el-menu-item>
      <el-menu-item index="/neighbourhood/structure" style="color: rgba(140,140,140)">
        <i class="el-icon-setting"></i>
        <span slot="title">小区结构</span>
      </el-menu-item>
      <el-menu-item index="/neighbourhood/publicity" style="color: rgba(140,140,140)">
        <i class="el-icon-setting"></i>
        <span slot="title">小区公示</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>

.wzz{
  border:0!important;
}
</style>