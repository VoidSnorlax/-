<template>
<!-- 标签组件 -->
  <div class="tabs">
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      size="small"
      @click="changeMenu(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'pink'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState} from "vuex";
export default {
  computed: {
    ...mapState({
      tags: (state) => state.tab.tablist,
    }),
  },
  data() {
    return {
      //dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    handleClose(item) {
      this.$router.push({ name:'home' });
      this.$store.commit("closeTab", item);
    },
    changeMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  padding: 10px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>