<template>
  <div style="height: 100%" id="test" ref="echart">echart</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: {},
        }; //动态传入的参数
      },
    },
    isAxisChart: {
      type: Boolean,
      default: true,
    }, //图标类型
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
    isCollapse() {
      setTimeout(() => {
        this.resizeChart();
      }, 300);
    },
  },
  data() {
    return {
      echarts: null,
      axisOption: {
        legend: {
          textStyle: {
            color: "#333",
          },
        },
        tooltip: {
          trigger: "axis", //悬浮提示
        },
        xAxis: {
          type: "category",
          data: null,
          axisLine: {
            show: true,
            interval: "auto",
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            show: true,
            margin: 8,
            color: "#333",
          },
        }, //x轴数据
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: true,
              interval: "auto",
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089",
        ],
        series: [],
      },
      normalOption: {
        legend: {
          textStyle: {
            color: "#333",
          },
        },
        tooltip: {
          show: true,
          trigger: "item", //悬浮提示
        },
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089",
        ],
        series: [],
      },
    };
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
        console.log(" axis");
      } else {
        this.normalOption.series = this.chartData.series;
        console.log("normalOption ");
      }
    },
    resizeChart() {
      this.echart.resize(); //调用echart.resize()方法实现自适应
    },
  },
  mounted() {
    window.addEventListener("resize", this.resizeChart); //在生命周期(mounted)上挂载
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart); //销毁(防止内存泄漏)
  },
};
</script>

<style>
</style>