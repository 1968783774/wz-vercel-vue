<script>

export default {
  name: "PositionManagement",
  data() {
    return{
      options: [],
      neighbourhoodName:null,
      selectedRows: [],
      value: null,
      formData: {
        id: null,
        name: '',
        neighbourhoodId: null,
        total:null,
      },
      tableData:[],
      positionChart1: null,
      dialogTitle: '',
      dialogVisible: false,
      isSaving: false,
    }
  },

  computed: {
    pieChartTitle() {
      if(this.neighbourhoodName===null){
        return '小区岗位详情'
      }
      return this.neighbourhoodName+'小区岗位详情'
    },
    chartShow(){
      if(this.value===null){
        return []
      }
      return this.tableData
    }
  },

  methods: {
    // 单个删除
    deleteById(id) {
      this.$commonMethods.handleDelete(this,id,this.$httpUrl+'/position/delete')
    },
    // 获取所有数据
    getAllData() {
      this.value = null;
      this.neighbourhoodName = null;
      this.$commonMethods.getAll(this,this.$httpUrl+'/position/list')
    },
    save() {
      this.$commonMethods.save(this,this.$httpUrl+'/position/add')
    },
    // 批量删除
    deleteSelectedIds() {
      this.$commonMethods.deleteSelectedIds(this,this.$httpUrl+'/position/delete')
    },

    update() {
      this.$commonMethods.update(this,this.$httpUrl+'/position/update')
    },

    initChart() {
      this.positionChart1 = this.$echarts.init(this.$refs.positionChart1);
      this.renderPieChart();
    },
    renderPieChart() {

      const option1 =  {
        title: {
          text:this.pieChartTitle,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.chartShow.map(({ name, total }) => ({ name, value: total })).map(item => item.name)
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.chartShow.map(({ name, total }) => ({ name, value: total })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.positionChart1.setOption(option1);
    },
    getNeighbourhoodNameList() {
      this.$axios.get(this.$httpUrl +'/neighbourhood/nameList')
          .then(res => {
            if (res.data.code === 200) {
             this.options = res.data.data;
              console.log(res.data.data)
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
    },
    showForm() {
      this.dialogTitle = '新增岗位';
      this.dialogVisible = true;
      this.resetForm();
    },

    saveOrUpdate() {
      if (this.dialogTitle === '新增岗位'){
        this.save();
      }else {
        this.update();
      }
    },

    formatter (row) {
      const zoneDate = new Date(row.createdAt).toJSON()
      return new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },

    handleSelectionChange(selectedItems) {
      this.selectedRows = selectedItems.map(item => item.id);
    },

    handleEdit(row) {
      this.dialogVisible = true;
      this.dialogTitle = '修改岗位信息';
      this.formData = { ...row };
    },

    filter() {
      if (this.value === null||this.value.length === 0) {
        return
      }
      // 通过value获取选中的小区对象
      let selectedNeighbourhood = this.options.find(item => item.id === this.value);
      // 将选中的小区的neighbourhoodName保存在name变量中
      this.neighbourhoodName = selectedNeighbourhood ? selectedNeighbourhood.name : '';
      console.log(this.value)
      this.$commonMethods.getDataByParams(this,this.$httpUrl+'/position/list/nbhId',this.value)
    },
    cancel() {
      this.dialogVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        id: null,
        name: '',
        neighbourhoodId: null,
        total:null,
      };
    },
  },
  mounted() {
    this.getNeighbourhoodNameList();
    this.getAllData();

  },
  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"property"})
  },
}
</script>

<template>
  <div>
    <el-dialog :visible.sync="dialogVisible">
      <span slot="title" style="font-size: 20px;margin-bottom: 10px">{{dialogTitle}}</span>
      <el-form label-width="80px">
        <el-form-item label="岗位名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="所属小区">
          <el-select v-model="formData.neighbourhoodId">
            <el-option
                v-for="item in this.options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位需求人数">
          <el-input v-model="formData.total"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  :loading="isSaving" @click="saveOrUpdate">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div style="margin-bottom: 20px">

      <el-select class="position-select"
                 v-model="value"
                 clearable
                 placeholder="请选择小区"
                 @clear="getAllData"
                 @change="filter">
        <el-option
            v-for="item in this.options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-button plain round type="primary" @click="showForm">新增岗位</el-button>
      <el-button plain round type="warning" @click="deleteSelectedIds">删除岗位</el-button>
      <el-button plain round type="success">启用</el-button>
      <el-button plain round type="danger">禁用</el-button>
    </div>
    <div class="separator"></div>
    <div style="display: flex;flex-wrap: wrap">
      <el-card class="position-card2">
        <el-table :data="tableData"
                  @selection-change="handleSelectionChange"
                  header-cell-style="background-color: rgba(242,242,242); color: black"
                  stripe
                  size="small"
                  style="width: 100%;border-radius: 10px">
          <el-table-column type="selection"></el-table-column>
          <el-table-column fixed prop="id" label="岗位id" width="100"></el-table-column>
          <el-table-column prop="name" label="岗位名称" width="120"></el-table-column>
          <el-table-column prop="neighbourhoodName" label="所属小区" width="120"></el-table-column>

          <el-table-column prop="total" label="总数" width="100"></el-table-column>
          <el-table-column prop="occupyCount" label="已有人数" width="100"></el-table-column>
          <el-table-column prop="noOccupyCount" label="剩余人数" width="100"></el-table-column>
          <el-table-column prop="status" label="状态" width="100">
          </el-table-column>
          <el-table-column :formatter="formatter" prop="createdAt" label="创建时间" width="200"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template v-slot="scope">
              <el-button type="text" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
              <el-button type="text" icon="el-icon-delete" circle @click="deleteById(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="position-card3">
        <div ref="positionChart1" style="height:700px;width:560px;margin-top:35px"></div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.position-select{
  margin-left: 20px;
  margin-right: 20px;
}

.separator {
  height: 10px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: white;
  margin-bottom: 10px;
  width: 1650px;
}

.position-card2 {
  width: 1000px;
  margin-top: 10px;
  height: 770px;
  border-radius: 15px;
  margin-left: 20px
}
.position-card3{
  width:600px;
  height: 770px;
  border-radius: 15px;
  margin-top: 10px;
  margin-left: 45px;

}
</style>