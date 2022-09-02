<template>
  <!-- 菜单组件 -->
  <!-- 菜单标签 -->
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    ><!-- :collapse="isCollapse" 折叠参数 -->
    <!-- 菜单数据 -->
    <el-menu-item
      :index="item.path"
      v-for="item in noChilder"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-` + item.icon"></i><!-- 图标 -->
      <span slot="title">{{ item.label }}</span><!-- 数据 -->
    </el-menu-item>
    <!-- 折叠菜单 -->
    <el-submenu index="index" v-for="(item, index) in haveChilder" :key="index">
      <template slot="title">
        <i :class="`el-icon-` + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subitem.path"
          v-for="(subitem, index) in item.children"
          :key="index"
          @click="clickMenu(subitem)"
        >
          <i :class="`el-icon-` + subitem.icon"></i>
          <span>{{ subitem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    noChilder() {
      return this.menu.filter((item) => !item.children);
    },//计算属性判断是否含有子菜单
    haveChilder() {
      return this.menu.filter((item) => item.children);
    },//计算属性判断是否含有子菜单
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },//计算属性是否折叠
    menu() {
      return this.$store.state.tab.menu;
    },//获取菜单
  },
  data() {
    return {
      asideMenu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
        },
        {
          path: "/video",
          name: "video",
          label: "视频管理",
          icon: "video-play",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
        },
        {
          label: "其他",
          icon: "user",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
            },
          ],
        },
      ],
    };
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name });//通过路由去跳转
      this.$store.commit("selectMenu", item);//调用vuex面包屑方法
    },
  },
};
</script>

<style lang="scss">
.el-menu {
  height: 100%;
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>