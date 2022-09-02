<template>
  <el-container style="height: 100%">
    <el-aside width="auto"><CommonAside></CommonAside></el-aside>
    <el-container>
      <el-header><CommonHeader></CommonHeader></el-header>
      <CommonTab></CommonTab>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonTab from "../components/CommonTab.vue";
export default {
  components: { CommonHeader, CommonAside,CommonTab },
};
</script>

<style lang="scss">
.el-header {
  background-color: black;
}
</style>