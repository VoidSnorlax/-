<template>
<!-- 表格组件 -->
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <!-- 这里的:data="tableData"中tableData为父组件的:tableData -->
      <el-table-column label="Number" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            (config.page - 1) * 20 + scope.$index + 1
          }}</span
          ><!-- 序号(页码-1)* 条数 + scope.$index(自带序号) +1-->
        </template> </el-table-column
      ><!-- 序号 -->
      <el-table-column
        show-overflow-tooltip="true"
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template> </el-table-column
      ><!-- 数据 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
      ><!-- @current-change页面跳转方法 -->
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
    }, //表数据
    tableLabel: {
      type: Array,
    }, //表头
    config: {
      type: Array,
    }, //分页器
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("delete",row);
    },
    changePage() {
      this.$emit("changePage"); //通过emit联系父组件的changePage方法
    }, //分页方法(点击页数跳转)
  },
};
</script>


<style lang="scss" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>
