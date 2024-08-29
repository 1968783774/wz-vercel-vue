<script>
export default {
  name: "homeMainMenu",
  methods: {
    selectHome() {
      this.$emit('selectMenu', 'home');
      this.$router.push("/home",() => {})
    },
    selectMenuItem(itemIndex,typeMenu) {
      this.$router.push(itemIndex,() => {})
      this.$emit('selectMenu',itemIndex,typeMenu);
    }
  }
}
</script>

<template>
  <div style="display: flex;flex-direction: row;flex-wrap: wrap">
    <el-button style="margin-top: 20px;margin-left: 20px;width: 100px;border-radius: 10px" @click="selectHome">首页</el-button>
    <el-divider direcyion="horizontal"></el-divider>
    <el-card  class="drawer-card-style">
      <div style="display: flex;flex-direction: row;">
        <div>
          <el-button class="property-button" @click="selectMenuItem('/property/1','property')">
            <i class="el-icon-s-platform" style="margin-right: 5px;"></i>物业管理</el-button>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div style="display: flex;flex-direction: row;flex-wrap: wrap;align-items: flex-start">
          <el-button class="menu-button" @click="selectMenuItem('/property/1','property')">物业信息</el-button>
          <el-button class="menu-button" @click="selectMenuItem('/property/2','property')">小区信息</el-button>
          <el-button class="menu-button" @click="selectMenuItem('/property/3','property')">岗位管理</el-button>
          <el-button class="menu-button" @click="selectMenuItem('/property/4','property')">员工管理</el-button>
        </div>
      </div>
    </el-card>
    <el-card  class="drawer-card-style">
      <div style="display: flex;flex-direction: row;">
        <div>
          <el-button class="property-button" @click="selectMenuItem('/neighbourhood/houses','neighbourhood')">
            <i class="el-icon-office-building" style="margin-right: 5px;"></i>小区管理</el-button>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div style="display: flex;flex-direction: row;flex-wrap: wrap;align-items: flex-start">
          <el-button class="menu-button" @click="selectMenuItem('/neighbourhood/houses','neighbourhood')">房屋管理</el-button>
          <el-button class="menu-button" @click="selectMenuItem('/neighbourhood/register','neighbourhood')">产权登记</el-button>
          <el-button class="menu-button" @click="selectMenuItem('/neighbourhood/structure','neighbourhood')">小区结构</el-button>
          <el-button class="menu-button" @click="selectMenuItem('/neighbourhood/publicity','neighbourhood')">小区公示</el-button>
        </div>
      </div>
    </el-card>
    <el-card  class="drawer-card-style">
      <div style="display: flex;flex-direction: row;">
        <div>
          <el-button class="property-button" @click="selectMenuItem('/park/management','park')">
            <i class="el-icon-truck" style="margin-right: 5px;"></i>停车场管理</el-button>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div style="display: flex;flex-direction: row;flex-wrap: wrap;align-items: flex-start">
          <el-button class="menu-button" @click="selectMenuItem('/park/management','park')">停车场管理</el-button>
          <el-button class="menu-button" @click="selectMenuItem('/park/stall','park')">车位管理</el-button>
          <el-button class="menu-button" @click="selectMenuItem('/park/car','park')">车辆管理</el-button>
          <el-button class="menu-button" @click="selectMenuItem('/park/present','park')">在场车辆</el-button>
          <el-button class="menu-button" @click="selectMenuItem('/park/record','park')">停车记录</el-button>
        </div>
      </div>
    </el-card>
    <el-card  class="drawer-card-style">
      <div style="display: flex;flex-direction: row;">
        <div>
          <el-button class="property-button" @click="selectMenuItem('/property/1')">
            <i class="el-icon-s-custom" style="margin-right: 5px;"></i>业主管理</el-button>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div style="display: flex;flex-direction: row;flex-wrap: wrap;align-items: flex-start">
          <el-button class="menu-button">业主信息</el-button>
          <el-button class="menu-button">业主账户</el-button>
          <el-button class="menu-button">故障报修</el-button>
          <el-button class="menu-button">业主投诉</el-button>
          <el-button class="menu-button">满意度调查</el-button>
        </div>
      </div>
    </el-card>
    <el-card  class="drawer-card-style">
      <div style="display: flex;flex-direction: row;">
        <div>
          <el-button class="property-button" @click="selectMenuItem('/property/1')">
            <i class="el-icon-suitcase" style="margin-right: 5px;"></i>设备管理</el-button>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div style="display: flex;flex-direction: row;flex-wrap: wrap;align-items: flex-start">
          <el-button class="menu-button">监控设备</el-button>
          <el-button class="menu-button">门禁设备</el-button>
          <el-button class="menu-button">道闸与充电桩</el-button>
        </div>
      </div>
    </el-card>
    <el-card  class="drawer-card-style">
      <div style="display: flex;flex-direction: row;">
        <div>
          <el-button class="property-button" @click="selectMenuItem('/property/1')">
            <i class="el-icon-s-order" style="margin-right: 5px;"></i>费用管理</el-button>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div style="display: flex;flex-direction: row;flex-wrap: wrap;align-items: flex-start">
          <el-button class="menu-button">物业费</el-button>
          <el-button class="menu-button">车位费</el-button>
          <el-button class="menu-button">生活费用</el-button>
        </div>
      </div>
    </el-card>
    <el-card  class="drawer-card-style">
      <div style="display: flex;flex-direction: row;">
        <div>
          <el-button class="property-button" @click="selectMenuItem('/property/1')">
            <i class="el-icon-setting" style="margin-right: 5px;"></i>账号设置</el-button>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div style="display: flex;flex-direction: row;flex-wrap: wrap;align-items: flex-start">
          <el-button class="menu-button">个人中心</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.drawer-card-style{
  width: 448px;
  height: 130px;
  margin-left: 20px;
  margin-top: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
}
::v-deep .el-divider--vertical{
  height: 90px;
}
::v-deep .el-divider--horizontal {
  width: 920px;
  margin-left: 20px;
  margin-bottom: 1px;
  background-color: rgba(230,230,230);
}
.menu-button{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90px;
  height: 20px;
  border: none;
  margin-left: 5px;
  color: rgba(150,150,150)
}
.menu-button:hover,
.menu-button:active {
  color: #007aff; /* 更改悬停和点击时的颜色 */
}
.property-button {
  display: flex;
  justify-content: center;
  border: none;
  margin-right: 5px;
  width: 100px;
  font-size: 15px;
  color: rgba(89, 89, 89);
  transition: color 0.3s ease; /* 添加过渡效果 */
}

.property-button:hover,
.property-button:active {
  color: #007aff; /* 更改悬停和点击时的颜色 */
}

.property-button i {
  margin-right: 5px;
}

/* 如果需要，你还可以为图标单独设置颜色变化 */
.property-button:hover i,
.property-button:active i {
  color: #007aff; /* 图标在悬停和点击时的颜色 */
}
</style>