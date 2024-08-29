<script>
export default {
  name: "HouseManagement",
  data() {
    return {
      data: [{
        label: '1号楼',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  },
  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"neighbourhood"})
  },
}
</script>

<template>
  <div class="house-management">
    <el-card class="house-management-title">
      <el-button  round type="primary">1</el-button>
      <el-button  round type="primary">2</el-button>
      <el-button  round type="primary">3</el-button>
    </el-card>
    <el-card class="house-management-1">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-card>
    <el-card class="house-management-2">
    </el-card>
  </div>

</template>

<style scoped>
.house-management{
  display: flex;
  flex-wrap: wrap;
}
.house-management-title{
  width:1690px;
  height:80px;
  border-radius: 10px;
  margin-left:10px;
}
.house-management-1 {
  height: 750px;
  width: 250px;
  border-radius: 10px;
  margin-top:20px;
  margin-left:10px;
}
.house-management-2{
  height: 750px;
  width:1400px;
  border-radius: 10px;
  margin-top:20px;
  margin-left:20px;
}
</style>