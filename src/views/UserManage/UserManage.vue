/* 用户页面
   表单组件和表格组件 
 */
<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? 'add' : 'update'"
      :visible.sync="isShow"
    >
      <CommonForm :formLabel="operateLabel" :form="operateForm"></CommonForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confim">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="Add">+Add</el-button>
      <CommonForm inline :formLabel="formLabel" :form="searchFrom"
        ><!-- 将表单和表头传入表单组件 -->
        <el-button type="primary" @click="getlist(searchFrom.keyword)"
          >Search</el-button
        >
      </CommonForm>
    </div>
    <CommonTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getlist"
      @edit="adduser"
      @delete="deluser"
    ></CommonTable
    ><!-- 
           将表格和表头传入  
           @changePage="getlist"自定义方法实现分页查询将子组件的
           @current-change="changePage"携带page获取调用getlist方法
           (每点一个页数发起一个请求)
           :tableData="tableData"将父组件的tableData数据赋值给:tableData传入子组件
    -->
  </div>
</template>

<script>
import CommonForm from "../../components/CommonFrom.vue";
import CommonTable from "../../components/CommonTable.vue";
export default {
  components: { CommonForm, CommonTable },
  data() {
    return {
      isShow: false,
      operateType: "add",
      tableData: [], //准备图表数据
      tableLabel: [
        {
          prop: "name",
          label: "Name",
        },
        {
          prop: "age",
          label: "Age",
        },
        {
          prop: "sexlabel",
          label: "Sex",
        },
        {
          prop: "birth",
          label: "Birth",
        },
        {
          prop: "addr",
          label: "Address",
        },
      ], //准备表头
      searchFrom: {
        keyword: "", //关键字
      }, //准备表单
      formLabel: [
        {
          model: "keyword", //model字段与searchFrom里的keyword对应
          label: "",
          optios: [],
        },
      ], //表单头部
      config: {
        page: 1, //首页
        total: 20, //总页数
        loading: false, //是否等待
      }, //分页
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      operateLabel: [
        {
          model: "name",
          label: "Name",
        },
        {
          model: "age",
          label: "Age",
        },
        {
          model: "sex",
          label: "Sex",
          type: "select",
          optios: [
            { sexlabel: "boy", sex: 1 },
            { sexlabel: "girl", sex: 0 },
          ],
        },
        {
          model: "addr",
          label: "Address",
        },
        {
          model: "birth",
          label: "Birth",
          type: "date",
        },
      ],
    };
  },
  methods: {
    getlist(name) {
      this.config.loading = true; //发送请求开发设置等待
      this.$http
        .get("/user/getUser", {
          params: {
            page: this.config.page,
            name,
          },
        }) //通过params携带page参数
        .then((res) => {
          console.log(res.data.list);
          this.tableData = res.data.list.map((item) => {
            item.sexlabel = item.sex === 0 ? "gril" : "boy"; //将性别进行转换
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false; //取消等待
        });
    },/* 展示数据(查) */
    adduser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },/* 自定义事件adduser(增加用户) */
    Add() {
      this.isShow = true;
      this.operateType = "add";
    },
    confim() {
      if (this.operateType == "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          //console.log(' ', this.operateForm)
          this.isShow = false;
          this.getlist();//
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          console.log(res.data);
          this.isShow = false;
          this.getlist();
        }); 
               
      }
    },/* 提交 */
    deluser(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = row.id;
          this.$http
            .get("/user/del", {
              params: {
                id,
              },
            })
            .then((res) => {
              this.getlist();
              console.log(" ", res.data);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getlist(); //挂载方法
  },
};
</script>

<style lang='scss' scoped>
@import "~@/assets/scss/common";
</style>