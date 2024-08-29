<script>
import {right} from "core-js/internals/array-reduce";

export default {
  name: "StaffManagement",
  data() {
    return{
      neighbourhoodOptions: [],
      positionOptions: [],
      selectedRows: [],
      value: null,
      tableDataAside:[],
      formData:{
        name: '',
        positionId: null,
        positionName: '',
        neighbourhoodId: null,
        neighbourhoodName: '',
        age: null,
        idCard: '',
        phone: '',
        status: null,
        createdAt: ''
      },
      dialogTitle: '',
      dialogVisible: false,
      isSaving: false,
      tableData: []

    }
  },
  watch: {
    'formData.neighbourhoodId': function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.formData.positionId = null; // 重置positionId的值
      }
    }
  },
  methods: {
    right,
    deleteData(){
      if (this.selectedRows.length === 1) {
        console.log(this.selectedRows[0])
        this.deleteById(this.selectedRows[0])
        this.selectedRows = []
      }
      else{
        this.deleteSelectedIds()
        this.selectedRows = []
      }
    },
    // 单个删除
    deleteById(id) {
      this.$commonMethods.handleDelete(this,id,this.$httpUrl+'/staff/delete')
    },
    // 获取所有数据
    getAllData() {
      this.$commonMethods.getAll(this,this.$httpUrl+'/staff/list')
    },
    save() {
      this.$commonMethods.save(this,this.$httpUrl+'/staff/add')
    },
    // 批量删除
    deleteSelectedIds() {
      this.$commonMethods.deleteSelectedIds(this,this.$httpUrl+'/staff/delete')
    },

    update() {
      this.$commonMethods.update(this,this.$httpUrl+'/staff/update')
    },


    getNeighbourhoodNameList() {
      this.$axios.get(this.$httpUrl +'/neighbourhood/nameList')
          .then(res => {
            if (res.data.code === 200) {
              this.neighbourhoodOptions = res.data.data;
              console.log(res.data.data)
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
    },
    getPositionsByNbhId() {
      this.$axios.get(this.$httpUrl +'/position/list/nbhId' ,{ params:{neighbourhoodId:this.formData.neighbourhoodId}  })
          .then(res => {
            if (res.data.code === 200) {
              this.positionOptions = res.data.data;
              console.log(res.data.data)
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
    },
    showForm() {
      this.dialogTitle = '新增员工';
      this.dialogVisible = true;
    },

    saveOrUpdate() {
      if (this.dialogTitle === '新增员工'){
        this.save();
      }else {
        this.update();
      }
    },


    handleEdit(row) {
      this.dialogVisible = true;
      this.dialogTitle = '修改员工信息';
      this.tableData = { ...row };
    },

    filter() {
      if (this.value === null || this.value.length === 0) {
        return
      }
      this.$axios.get(this.$httpUrl + '/staff/list/nbhId', {
        params: {
          neighbourhoodId: this.value
        }
      })
          .then(res => {
            if (res.data.code === 200) {
              this.tableData = res.data.data;
              this.tableDataAside = [];
              this.tableData.forEach(item => {
                let combinedNameId = item.positionName + '(' + item.neighbourhoodName + ')';
                this.tableDataAside.push({ date: combinedNameId ,neighbourhoodId:item.neighbourhoodId,positionId:item.positionId});
              });
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
    },
    cancel() {
      this.dialogVisible = false;
      this.resetForm();
    },
    handleRowClick(row) {
      this.$axios.post(this.$httpUrl +'/staff/list/positionIdAndNbhId',{neighbourhoodId:row.neighbourhoodId,positionId:row.positionId})
          .then(res => {
             if (res.data.code === 200) {
               this.tableData=res.data.data;
             }
          })
          .catch(err => {
            this.$message.error(err);
          });
    },
    resetForm() {
      this.formData = {
        name: '',
        positionId: null,
        positionName: '',
        neighbourhoodId: null,
        neighbourhoodName: '',
        age: null,
        idCard: '',
        phone: '',
        status: null,
        createdAt: ''
      };
    },
  },
  mounted() {
    this.getAllData();
    this.getNeighbourhoodNameList();
  },
  beforeMount() {

    this.$store.commit("setTypeMenu",{menuType:"property"})
  },
}
</script>

<template>
  <div>
    <el-dialog :visible.sync="dialogVisible">
      <span slot="title"  class="dialog-title">{{dialogTitle}}</span>
      <el-form label-width="80px">
        <el-form-item label="员工姓名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="所属小区">
          <el-select v-model="formData.neighbourhoodId" @change="getPositionsByNbhId">
            <el-option
                v-for="item in this.neighbourhoodOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属职位">
          <el-select v-model="formData.positionId" :disabled="!formData.neighbourhoodId">
            <el-option
                v-for="item in this.positionOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formData.age"></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="formData.idCard"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker
              v-model="formData.createdAt"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
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
            v-for="item in this.neighbourhoodOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      <el-button plain round type="primary" @click="showForm">新增员工</el-button>
      <el-button plain round type="warning" @click="deleteData">删除员工</el-button>
      <el-button plain round type="success">启用</el-button>
      <el-button plain round type="danger">禁用</el-button>
    </div>
    <div class="separator"></div>
    <div style="display: flex;flex-wrap: wrap">
      <el-card class="staff-card">
        <div style="display: flex; align-items: flex-start;">
          <div>
            <el-table class="my-custom-table"
                      height="720px"
                      @row-click="handleRowClick"
                      :data="tableDataAside">
              <el-table-column
                  prop="date"
                  label="全部岗位"
                  width="190px">
              </el-table-column>
            </el-table>
          </div>
          <div class="staff-info-style">
            <div class="staff-info-title-style">
              <span class="table-info-4">员工详情</span>
              <el-checkbox v-model="selectedRows[index]" class="checkbox-style">
                全选
              </el-checkbox>
              <el-input size="small" class="my-custom-table" placeholder="请输入员工姓名"></el-input>
            </div>
            <div class="table-style">
              <div v-for="(item, index) in tableData" :key="index" class="staff-info-item">
                <div style="display: flex;flex-direction:column">
                  <div>
                    <el-checkbox v-model="selectedRows"  :label="item.id"  class="checkbox-style"></el-checkbox>
                    <span class="table-info-1">{{item.name }}</span>
                    <span class="table-info-2">{{item.positionName }} {{ '(' + item.neighbourhoodName + ')' }}</span>
                  </div>
                  <div class="table-info-3">
                    <span>年龄：{{ item.age }} | 证件号：{{ item.idCard }} | 手机号：{{
                        item.phone
                      }} | 状态：{{ item.status === 0 ? '启用' : '禁用' }} | 入职时间：{{ item.createdAt }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.table-info-1{
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;color:rgb(25,170,141)
}
.table-info-2{
  margin-top: 15px;
  font-size: 15px;
  margin-left:50px;color: rgba(140,140,140)
}
.table-info-3{
  margin-left: 65px;
  margin-top:15px;
  font-size:15px;color:rgba(140,140,140)
}
.table-info-4{
  font-size: 18px;
  font-weight: bold;
}
.checkbox-style{
  margin-top: 15px;
  margin-right:30px;
  margin-left:20px;
  color: white;
}
.table-style{
  max-height: 670px;
  overflow-y: auto
}
.dialog-title{
  font-size: 20px;
  margin-bottom: 10px
}
.staff-info-title-style{
  border-bottom: 1px solid rgb(193,193,193);
  border-top: 1px solid rgb(193,193,193);
  height:50px;
  position: sticky;
  z-index: 1
}
.my-custom-table{
  width: 200px
}
/* 针对 WebKit 浏览器修改滚动条样式 */
.my-custom-table ::-webkit-scrollbar {
  width: 5px; /* 滚动条宽度 */
}

.my-custom-table ::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滚动条轨道背景色 */
}

.my-custom-table ::-webkit-scrollbar-thumb {
  background: rgb(193,193,193); /* 滚动条滑块背景色 */
}

.my-custom-table ::-webkit-scrollbar-thumb:hover {
  background: #555; /* 鼠标悬停时滚动条滑块背景色 */
}
.staff-info-item{
  border-bottom: 1px solid rgb(193,193,193);
  height:90px;
}
.staff-info-item:hover {
  background-color: #f2f2f2; /* 灰色 */
}
.staff-info-style{
  position: relative;
  background-color:white;
  width: 1400px;
  height: 720px;
  margin-left: 20px;
  border-top: 1px solid rgb(193,193,193);
}
/deep/ .my-custom-table .el-table__header-wrapper th {
  background-color: rgb(221,243,238); /* 替换为你想要的表头颜色 */
  color: black; /* 可选：设置表头文字颜色，确保在深色背景上可读 */
  border-bottom: 2px solid rgb(24,170,141); /* 设置下边框为深绿色 */
}
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
.staff-card {
  width: 1650px;
  margin-top: 10px;
  height: 770px;
  border-radius: 15px;
  margin-left: 20px;
}
</style>