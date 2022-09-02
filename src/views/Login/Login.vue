<template>
  <div style="padding: 20px">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''//登录密码和用户名
      }
    }
  },
  methods: {
    login() {
      this.$http.post('/permission/getMenu', this.form).then(res => {
        res = res.data//提交到后端接口
        if (res.code === 20000) {//如果登录成功
          this.$store.commit('clearMenu')//清除菜单
          this.$store.commit('setMenu', res.data.menu)//携带后端传入的菜单信息设置菜单
          this.$store.commit('setToken', res.data.token)//携带后端返回的Token设置token
          this.$store.commit('addMenu', this.$router)//调用设置菜单方法,传入vue路由
        console.log(' ', this.$router)
          this.$router.push({ name: 'home' })//跳转到home页面
        } else {
          this.$message.warning(res.data.message)//登录失败返回错误信息
        }
      })
    }//登录方法
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 50%;
  margin: auto;
  padding: 45px;
  height: 450px;
  background-color: #fff;
}
</style>
