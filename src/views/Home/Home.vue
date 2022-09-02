<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="userinfo">
            <p class="name">IMP</p>
            <p class="access">Admin</p>
          </div>
        </div>
        <div class="login">
          <p>Login: <span>XuZhou</span></p>
          <p>Time: &nbsp; <span>2022</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 522px; margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(value, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="value"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">$ {{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover"
        ><echart style="height: 290px" :chartData="echartData.order"></echart
      ></el-card>
      <div class="graph">
        <el-card shadow="hover"
          ><echart style="height: 260px" :chartData="echartData.user"></echart
        ></el-card>
        <el-card shadow="hover"
          ><echart style="height: 260px" :chartData="echartData.video" :isAxisChart="false"></echart
        ></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from "../../components/EChart.vue";
export default {
  components: { Echart },
  data() {
    return {
      userImg: require("../../assets/image/1.png"),
      countData: [
        {
          name: "Tuesday",
          value: "111",
          icon: "s-opportunity",
          color: "#2ec7c9",
        },
        {
          name: "Today",
          value: "111",
          icon: "s-opportunity",
          color: "#2ec7c9",
        },
        {
          name: "Yesterday",
          value: "1010",
          icon: "s-flag",
          color: "#2ec7c9",
        },
        {
          name: "Monday",
          value: "1110",
          icon: "s-ticket",
          color: "#2ec7c9",
        },
        {
          name: "Thursday",
          value: "111",
          icon: "s-finance",
          color: "#2ec7c9",
        },
        {
          name: "Wednesday",
          value: "1090",
          icon: "s-check",
          color: "#2ec7c9",
        },
      ],
      tableData: [],
      tableLabel: {
        todayBuy: "TodayBuy",
        totalBuy: "TotalBuy",
        monthBuy: "MonthBuy",
        name: "Class",
      },
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  methods: {
    getTableData() {
      this.$http.get("/home/getData").then((res) => {
        //发起http请求
        res = res.data; //将数据赋值给res
        this.tableData = res.data.tableData; //将图表的数据赋值给tableData
        const order = res.data.orderData;
        console.log(" ", order); //测试order数据
        this.echartData.order.xData = order.date; //将date数据添加到表x轴
        // 第一步取出series中的name部分——键名
        let keyArray = Object.keys(order.data[0]);
        console.log(" ", keyArray);
        // 第二步，循环添加数据(折线图)
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key === "wechat" ? "小程序" : key, //中文转换
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        
        const user = res.data.userData; //接受userData参数
        console.log(" ", user); //打印测试
        this.echartData.user.xData = user.date; //添加柱状图x轴数据
        this.echartData.user.series.push({
          name: "New", //柱命名
          data: res.data.userData.map((item) => item.new), //通过map方法从对象里拿去new的数据
          type: "bar", //图表类型
        }); //添加y轴数据
        this.echartData.user.series.push({
          name: "Old", //柱命名
          data: res.data.userData.map((item) => item.active), //通过map方法从对象里拿去active的数据
          type: "bar", //图表类型
        }); //添加y轴数据
        //user柱状图

        this.echartData.video.series.push({
          data: res.data.videoData,
          type: "pie",
        });
      });//viedo饼图
    },
  },
  created() {
    this.getTableData();//挂载方法
  },
};
</script>

<style lang='scss' scoped>
@import "~@/assets/scss/home";
</style>