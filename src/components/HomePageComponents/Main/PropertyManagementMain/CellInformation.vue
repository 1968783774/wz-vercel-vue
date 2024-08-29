<script>

export default {
  name: "cellInformation",
  data() {
    return {
      pageNum:1,
      pageSize:10,
      total:50,
      tableData: [],
      selectedRows: [],
      dialogVisible: false,
      dialogTitle: '',
      isSaving: false,
      formData: {
        id: null,
        neighbourhoodName: '',
        neighbourhoodAddress: '',
        floorRage: null,
        city: '',
        phone: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value1: ''
    }
  },

  methods:{

    // 获取所有数据
    getAllData() {
      this.$commonMethods.getAll(this,this.$httpUrl+'/neighbourhood/list')
    },

    // 保存数据
    save() {
      this.$commonMethods.save(this,this.$httpUrl+'/neighbourhood/add')
    },

    deleteById(id) {
      this.$commonMethods.handleDelete(this,id,this.$httpUrl+'/neighbourhood/delete')
    },

    // 批量删除
    deleteSelectedIds() {
      this.$commonMethods.deleteSelectedIds(this,this.$httpUrl+'/neighbourhood/delete')
    },

    update() {
      this.$commonMethods.update(this,this.$httpUrl+'/neighbourhood/update')
    },

    showForm() {
      this.dialogTitle = '新增小区';
      this.dialogVisible = true;
      this.resetForm();
    },


    cancel() {
      this.dialogVisible = false;
      this.resetForm();
    },

    resetForm() {
      this.formData = {
        neighbourhoodName: '',
        neighbourhoodAddress: '',
        floorRage: null,
        city: '',
        phone: ''
      };
    },


    formatter (row) {
      const zoneDate = new Date(row.createdAt).toJSON()
      return new Date(+new Date(zoneDate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },

    //收集选中的行的小区id
    handleSelectionChange(selectedItems) {
      this.selectedRows = selectedItems.map(item => item.id);
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.dialogTitle = '修改小区信息';
      this.formData = { ...row };
    },


    saveOrUpdate() {
      if (this.dialogTitle === '新增小区'){
        this.save();
      }else {
        this.update();
      }
    },

    down(){
      window.location.href=this.$httpUrl+'/neighbourhood/down';
      this.$message.success("导出成功");
    },

    handleDateChange(value) {
      if (value && value.length === 2) {
        let localStartDateTime = value[0]
        let localEndDateTime = value[1]
        this.$axios.post(this.$httpUrl + '/neighbourhood/dateRange', {
          startDate: localStartDateTime,
          endDate: localEndDateTime
        })
            .then(res=> {
              if (res.data.code === 200) {
                console.log(res.data)
                this.tableData = res.data.data
              } else {
                this.$message({
                  message: '系统出错，请联系管理员',
                  type: 'error',
                  center: true
                });
              }
            })
            .catch(error=> {
              this.$message.error({
                message: error,
                center: true
              })
            });
      }
    }
  },

  mounted(){

  },

  beforeMount() {
    this.$store.commit("setTypeMenu",{menuType:"property"})
    this.getAllData();
  },
}
</script>

<template>
  <el-container style="height: 100%">
    <el-header>
      <el-date-picker class="date-picker-style" @change="handleDateChange"  :default-time="['00:00:00', '23:59:59']"  value-format="yyyy-MM-dd HH:mm:ss"
      v-model="value1"
      type="daterange"
      align="left"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
      </el-date-picker>
      <el-button plain round @click="showForm" type="primary">新增小区</el-button>
      <el-button plain round @click="deleteSelectedIds" type="danger">删除小区</el-button>
      <el-button plain round @click="down" type="warning">导出</el-button>
      <el-dialog :visible.sync="dialogVisible">
        <span slot="title" style="font-size: 20px;margin-bottom: 10px">{{dialogTitle}}</span>
        <el-form label-width="80px">
          <el-form-item label="小区名称">
            <el-input v-model="formData.neighbourhoodName"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="formData.neighbourhoodAddress"></el-input>
          </el-form-item>
          <el-form-item label="占地面积">
            <el-input v-model="formData.floorRage"></el-input>
          </el-form-item>
          <el-form-item label="所在城市">
            <el-select v-model="formData.city" placeholder="请选择城市">
              <el-option label="北京" value="北京"></el-option>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="广州" value="广州"></el-option>
              <el-option label="深圳" value="深圳"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="formData.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  :loading="isSaving" @click="saveOrUpdate">确定</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
          <el-table-column fixed prop="id" label="小区id" width="180"></el-table-column>
          <el-table-column prop="neighbourhoodName" label="小区名称" width="200"></el-table-column>
          <el-table-column prop="neighbourhoodAddress" label="地址" width="200"></el-table-column>
          <el-table-column prop="floorRage" label="占地面积" width="180"></el-table-column>
          <el-table-column prop="city" label="所在城市" width="200"></el-table-column>
          <el-table-column prop="phone" label="联系方式" width="200"></el-table-column>
          <el-table-column :formatter="formatter" prop="createdAt" label="创建时间" width="300"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
              <el-button type="text" icon="el-icon-delete" circle @click="deleteById(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>

      <el-footer style="margin-bottom: 20px">
        <el-divider></el-divider>
        <el-pagination style=" display: flex;justify-content: flex-end; /* 使子元素居右 */;margin-top: 10px"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageNum"
                       :page-sizes="[10, 20, 50]"
                       :page-size="pageSize"
                       layout="total, prev, pager, next,sizes, jumper"
                       :total="total">>
        </el-pagination>
      </el-footer>
    </el-card>

  </el-container>
</template>

<style scoped>
.date-picker-style{
  margin-right: 30px;
  width:400px
}
.cellMain{
  height: 600px;
}
.cellMain-card{
  width: 1650px;
  margin-left: 18px;
  height: 750px;
  border-radius:15px
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