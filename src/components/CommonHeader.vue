<template>
<!-- 头部组件 -->
  <header>
    <div class="l-content">
      <el-button
        type="primary"
        icon="el-icon-s-platform"
        size="mini"
        @click="collapseMenu"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.name" v-if="current">{{
          current.label
        }}</el-breadcrumb-item><!-- 面包屑 -->
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img :src="userImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="loginout">退出</el-dropdown-item><!--@事件.native表示使用vue原生的方法  -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      current: (state) => state.tab.currentMenu,
    }),
  },
  data() {
    return {
      userImg: require("../assets/image/1.png"),//头像
    };
  },
  methods: {
    collapseMenu(){//菜单收缩方法
      this.$store.commit('collapseMenu');//调用vuex中的菜单收缩方法
    },
    loginout(){//登出
      this.$store.commit('clearToken');//调用vuex中的清楚clearToken方法
      this.$store.commit('clearMenu');//调用vuex中的清楚菜单方法
      location.reload();//刷新
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;

  align-items: center;
  .el-button {
    margin-right: 10px;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__item {
 .el-breadcrumb__inner {
  color: aliceblue;
}
&:last-child{
   .el-breadcrumb__inner {
  color: aliceblue;
}
}
  }

</style>