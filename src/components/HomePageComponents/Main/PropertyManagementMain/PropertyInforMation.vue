<script>
export default {
  name: "propertyInformation",
  data() {
    return {
      companyInfo: {
        id:'',
        name: "",
        address: "",
        phone:'',
        email:'',
        setUpDate: "",
      },
      editing: false,
      form: {
        id:'',
        name: "",
        address: "",
        phone:'',
        email:'',
        setUpDate: "",
      }
    }
  },
  methods: {
    info(){
      this.$axios.get(this.$httpUrl + '/propertyInfo/info',[])
          .then(res => {
            if (res.data.code === 200){
              this.companyInfo = res.data.data;
              console.log(res.data.data)
            }
          })
          .catch(error => {
            this.$message.error({
              message: error,
              center: true
            })
          })
    },
    startEditing() {
      this.editing = true;
      // 将当前信息复制到表单中，以便编辑
      this.form.id = this.companyInfo.id;
      this.form.name = this.companyInfo.name;
      this.form.address = this.companyInfo.address;
      this.form.phone = this.companyInfo.phone;
      this.form.email = this.companyInfo.email;
      this.form.setUpDate = this.companyInfo.setUpDate;
    },
    cancelEditing() {
      this.editing = false;
      this.info();
    },
    saveChanges() {
      this.$axios.post(this.$httpUrl + '/propertyInfo/update', this.form)
          .then(res => {
            if (res.data.code === 200 && res.data.data === '更新成功') {
              this.$message.success({
                message: res.data.data,
                center: true
              })
            } else {
              this.$message.error({
                message: '更新失败',
                center: true
              })
            }
            this.cancelEditing()
          })
          .catch(error => {
            this.$message.error({
              message: error,
              center: true
            })
          })
    },
    cancel() {
      this.editing = false;
    }
  },
  beforeMount() {
    this.info();
    this.$store.commit("setTypeMenu",{menuType:"property"})
  }
}
</script>

<template>
  <div>
    <el-card style="width: 450px;height: 600px;background-color: rgb(245,246,247);margin-top: 10px;margin-left: 10px">
      <span style="font-size: 17px; font-weight: bold">物业信息</span>
      <div class="separator"></div>
      <div style="display: flex;flex-direction: column;margin-top: 30px">
        <div>
          <span style="font-size: 15px;color: rgba(0,0,0,0.57);margin-right: 20px">公司名称:</span>
          <span  v-if="!editing" style="font-size: 15px">{{ this.companyInfo.name }}</span>
          <el-input v-if="editing" v-model="form.name" placeholder="请输入公司名称" size="small" style="width: 200px"></el-input>
        </div>
        <div style="margin-top: 25px">
          <span style="font-size: 15px;color: rgba(0,0,0,0.57);margin-right: 20px">公司地址:</span>
          <span  v-if="!editing" style="font-size: 15px">{{this.companyInfo.address}}</span>
          <el-input v-if="editing" v-model="form.address" placeholder="请输入公司地址" size="small" style="width: 200px"></el-input>
        </div>
        <div style="margin-top: 25px">
          <span style="font-size: 15px;color: rgba(0,0,0,0.57);margin-right: 20px">公司电话:</span>
          <span v-if="!editing" style="font-size: 15px">{{ this.companyInfo.phone }}</span>
          <el-input v-if="editing" v-model="form.phone" placeholder="请输入公司电话" size="small" style="width: 200px"></el-input>
        </div>
        <div style="margin-top: 25px">
          <span style="font-size: 15px;color: rgba(0,0,0,0.57);margin-right: 20px">公司邮箱:</span>
          <span v-if="!editing" style="font-size: 15px">{{this.companyInfo.email}}</span>
          <el-input v-if="editing" v-model="form.email" placeholder="请输入公司邮箱" size="small" style="width: 200px"></el-input>
        </div>
        <div style="margin-top: 25px">
          <span style="font-size: 15px;color: rgba(0,0,0,0.57);margin-right: 20px">成立时间:</span>
          <span v-if="!editing" style="font-size: 15px">{{this.companyInfo.setUpDate}}</span>
          <el-input v-if="editing" v-model="form.setUpDate" placeholder="请输入成立时间" size="small" style="width: 200px"></el-input>
        </div>
      </div>
      <el-button v-if="editing" @click="saveChanges" style="margin-top: 170px">确定</el-button>
      <el-button v-if="editing" @click="cancelEditing" style="margin-top: 170px">取消</el-button>
      <el-button v-if="!editing" type="text" icon="el-icon-edit" @click="startEditing" style="margin-top: 200px;margin-left: 380px;line-height: 20px; font-size: 20px"></el-button>
    </el-card>
  </div>

</template>


<style scoped>
.separator {
  height: 1px;
  background-color: rgba(85, 104, 151, 0.44);
  margin-top: 20px;
  margin-bottom: 20px;
}
   /* 使用深度选择器来覆盖子组件的样式 */
 ::v-deep .el-dialog {
   border-radius: 10px; /* 设置你想要的圆角大小 */
 }
</style>