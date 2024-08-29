<script>
export default {
  name: "ParkManagement",
  data() {
    return {
      value: '',
      tableData: [
        {
          id: 1,
          name: "停车场1",
          neighbourhoodName: "小区1",
          type: 1,
          capacity: 100,
          createdAt: "2021-01-01 12:00:00"
        },
        {
          id: 2,
          name: "停车场2",
          neighbourhoodName: "小区2",
          type: 2,
          capacity: 200,
          createdAt: "2021-01-02 12:00:00"
        },
        {
          id: 3,
          name: "停车场3",
          neighbourhoodName: "小区3",
          type: 1,
          capacity: 300,
          createdAt: "2021-01-03 12:00:00"
        },
        {
          id: 4,
          name: "停车场4",
          neighbourhoodName: "小区4",
          type: 2,
          capacity: 400,
          createdAt: "2021-01-04 12:00:00"
        },
      ],
    }
  },
  methods: {
    filterTag(value, row) {
      return row.type === value;
    },
  },
  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"park"})
  },
}
</script>

<template>
  <el-container>
    <el-header>
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
            v-for="item in this.$store.state.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-header>
    <div class="separator"></div>
    <el-card class="cellMain-card">
      <el-main class="cellMain">
        <el-table :data="tableData"
                  @selection-change="handleSelectionChange"
                  header-cell-style="background-color: rgba(242,242,242); color: black"
                  stripe
                  style="width: 100%;border-radius: 10px">
          <el-table-column type="selection"></el-table-column>
          <el-table-column fixed prop="id" label="停车场id" width="180"></el-table-column>
          <el-table-column prop="name" label="停车场名称" width="200"></el-table-column>
          <el-table-column prop="neighbourhoodName" label="所属小区" width="200"></el-table-column>
          <el-table-column
              prop="type"
              label="停车场类型"
              width="180"
              :filters="[{ text: '地上停车场', value:1  }, { text: '地下停车场', value: 2 }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                  :type="scope.row.type === 1 ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.type === 1 ? '地上停车场' : (scope.row.type === 2 ? '地下停车场' : 'info')}}</el-tag>
            </template>

          </el-table-column>
          <el-table-column prop="capacity" label="容量" width="200"></el-table-column>
          <el-table-column :formatter="formatter" prop="createdAt" label="创建时间" width="300"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="text"  @click="handleEdit(scope.row)">修改</el-button>
              <el-button type="text"  @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-card>


  </el-container>
</template>

<style scoped>
.cellMain{
  height: 600px;
}
.cellMain-card{
  width: 1650px;margin-left: 18px;height: 750px
}
.separator {
  height: 10px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
  margin-bottom: 20px;
  width: 1650px;
}
</style>