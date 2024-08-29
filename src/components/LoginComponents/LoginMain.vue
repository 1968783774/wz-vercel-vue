<script>
export default {
  name: "LoginMain",
  data() {
    return {
      isLogin:true,
      isAgree:false,
      username: null,
      password: null,
      isLoginSuccess:null,
      loginResult:null,
      loginToken:null,
      registerForm: {
        username: null,
        password: '',
        phone: null,
      },

    };
  },
  methods:{
    // 登录
    login() {
      this.$axios.post(this.$httpUrl + '/login/login',
          {
            username: this.username,
            password: this.password
          })
          .then(res => {
            if (res.data.code === 200 && res.data.data.isLoginSuccess=== true) {
              this.$message({
                message: res.data.data.loginResult,
                type: 'success'
              });
              sessionStorage.setItem('loginToken', res.data.data.loginToken)
              this.$router.replace('/home')
            } else if (res.data.code === 200 && res.data.data.isLoginSuccess=== false) {
              this.$message({
                message: res.data.data.loginResult,
                type: 'error'
              });
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              });
            }
          })
          .catch(error => {
            this.$message({
              message: error,
              type: 'error'
            });
          })
    },

    loginOrRegister() {
      this.isLogin=!this.isLogin
    },

    agree(){
      this.isAgree=true
    },

    // 注册
    register() {
      if (this.isAgree === false) {
        this.$message({
          message: "请先同意并勾选政策和协议",
          type: 'warning'
        });
      }else {
        this.$axios.post(this.$httpUrl + '/login/register',
            this.registerForm).then(res => {
          if (res.data.code === 200 && res.data.data === true) {
            this.$message({
              message: "注册成功",
              type: 'success'
            });
            this.loginOrRegister()
          } else if (res.data.code === 200 && res.data.data === false) {
            this.$message({
              message: "注册失败",
              type: 'error'
            });
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            });
          }
        }).catch(error => {
          this.$message({
            message: error,
            type: 'error'
          });
        })
      }
    },

    forgetPassword() {
    },

  }
}
</script>

<template>
  <div class="loginForm">
    <div>
      <el-button class="picture"></el-button>
    </div>
    <div class="loginFormItem">
      <el-form v-if="isLogin">
        <el-form-item>
          <el-input class="usernameInput" type="text" auto-complete="off" placeholder="请输入用户名" v-model="username">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="passwordInput" type="text" auto-complete="off" placeholder="请输入密码" v-model="password">
          </el-input>
        </el-form-item>
        <el-link class="forgetPassword" type="primary">忘记密码？</el-link>
        <el-form-item>
          <el-button class="loginButton" type="primary" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="loginButton" type="primary" plain>其他方式登录</el-button>
        </el-form-item>
        <div class="register">
          没有账号？
          <el-link class="registerLink" type="primary" @click="loginOrRegister">免费注册</el-link>
        </div>
      </el-form>
      <div v-else class="registerFormItem">
        <div>
          <span class="registerTitle">注册</span>
        </div>
        <div class="registerForm">
          <el-form ref="registerForm" :model="registerForm">
            <el-form-item>
              <el-input class="usernameInput" v-model="registerForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input class="passwordInput" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input class="passwordInput" v-model="registerForm.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-checkbox class="checkboxRegister" v-model="isAgree" @click="agree">已同意政策或协议</el-checkbox>
            <el-form-item>
              <el-button class="registerButton" type="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="register">
          已有账号？ <el-link style="font-size: 15px" type="primary" @click="loginOrRegister">立即登录</el-link>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.el-form-item{
  text-align: center;
}
.usernameInput{
  width: 400px;
}
.checkboxRegister{
  margin-top: 20px;
}
.passwordInput{
  width: 400px;
  margin-top: 15px;
}
.forgetPassword{
  line-height: 20px;
  margin-top: 1px;
  margin-left: 330px;
}
.loginButton{
  width: 400px;
  height: 40px;
  margin-top: 15px;
  font-size: 15px;
}
.registerLink{
  font-size: 15px
}
.loginForm{
  display: flex;
  justify-content: center;
  align-content: center;
}
.picture{
  width: 900px;
  height: 600px;
  margin-top: 50px;
  margin-left: 100px;
  border-radius: 30px;
  background-image: url("background.png");
  background-size: cover;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
.loginFormItem{
  background-color: white;
  height: 600px;
  width: 500px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: 200px;
  border-radius: 30px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: column; /* 子元素垂直堆叠 */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
.registerFormItem{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: column; /* 子元素垂直堆叠 */
}
.register{
  font-size: 15px;
  margin-top: 100px;
  display: flex;
  justify-content: center; /* 水平居中 */
}
.registerForm{
  margin-top: 20px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: column; /* 子元素垂直堆叠 */
}
.registerTitle{
  font-size: 20px;
  font-weight: bold;
  margin-top: 1px;
}
.registerButton{
  width: 400px;
  height: 40px;
  font-size: 15px;
  margin-top: 20px;
}
</style>