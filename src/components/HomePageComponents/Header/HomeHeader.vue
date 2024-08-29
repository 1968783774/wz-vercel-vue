<script>
export default {
  name: "homeHeader",
  data() {
    return {
      hover: false, // 用于判断鼠标是否悬停在按钮上
      options: [{
        value: '选项1',
        label: '黄金糕小区'
      }, {
        value: '选项2',
        label: '双皮奶小区'
      }, {
        value: '选项3',
        label: '蚵仔煎小区'
      }, {
        value: '选项4',
        label: '龙须面小区'
      }, {
        value: '选项5',
        label: '北京烤鸭小区'
      }],
      value: ''
    };
  },
  methods:{
    getDrawer(){
      this.$emit('clickBrother')
    },
    open() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem("loginToken")
        this.$router.replace("/")
      }).catch(() => {
      });
    }
  }
}
</script>

<template>
  <div>
    <button class="custom-button"  @click="getDrawer">
      <i class="el-icon-menu hover-icon" @mouseover="hover = true" @mouseout="hover = false"></i>
      <span class="hover-text" @mouseover="hover = true" @mouseout="hover = false">菜单</span>
    </button>
    <el-select class="custom-select" v-model="value" placeholder="请选择小区">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-dropdown class="setting-button">
        <i class="el-icon-setting custom-button-icon"></i>
      <el-dropdown-menu style="width: 200px">
        <el-button style="border-color: transparent;width: 100%" icon="el-icon-switch-button" @click="open">退出登录</el-button>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<style scoped>
.custom-select{
  margin-left: 1500px;
}
.custom-button-icon{
  font-size: 35px;
  color: white;
}
.setting-button{
  width: 35px;
  height: 35px;
  background-color: rgba(69,91,117);
  border-color: transparent;
  margin-left: 30px;
  border-radius: 10px;
  transition: background-color 0.3s ease; /* 平滑过渡效果 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.setting-button:hover {
  background-color: rgba(125,141,160); /* 鼠标悬停时背景颜色变为绿色 */
}

.setting-button:not(:hover) {
  background-color: rgba(69,91,117); /* 鼠标离开后背景颜色恢复 */
}
.custom-button{
  border-radius: 20px;
  border-color: transparent;
  height: 40px;
  width: 90px;
}


.hover-icon,
.hover-text {
  transition: color 0.3s; /* 添加颜色变化的过渡效果 */
  color: rgba(89,89,89);
}

.hover-icon {
  font-size: 15px; /* 根据需要调整图标大小 */
}

.hover-text {
  margin-left: 5px; /* 图标和文本之间的间距 */
}

.custom-button:hover .hover-icon,
.custom-button:hover .hover-text {
  color: rgba(90,206,183);
  background-color: white/* 悬停时的颜色 */
}
</style>