/* 表单组件 */
<template>
  <el-form :inline="true" :model="form" ref="form" label-width="100px"
    ><!-- 绑定表单:model="form"-->
    <el-form-item
      v-for="item in formLabel"
      :key="item.model"
      :label="item.label"
      ><!-- 通过循环渲染表头 -->
      <el-input
        v-model="form[item.model]"
        :placeholder="`please enter` + item.label"
        v-if="!item.type"
      ></el-input>
      <!-- 
        v-model="form[item.model]" 
        form[item.model]===searchFrom里的keyword
        通过拿去item里的model字段获取传入的值
        v-if="!item.type"
        如果不传入类型默认为input 
      -->
      <el-select
        v-model="form[item.model]"
        placeholder="select"
        v-if="item.type === 'select'"
      >
        <el-option
          v-for="items in item.optios"
          :key="items.value"
          :label="items.sexlabel"
          :value="items.sex"
        >
        </el-option> </el-select
      ><!-- 下拉框 -->
      <el-switch
        v-model="form[item.model]"
        v-if="item.type === 'switch'"
      ></el-switch
      ><!-- 按钮 -->
      <el-date-picker
        v-model="form[item.model]"
        type="date"
        placeholder="选择日期"
        v-if="item.type === 'date'"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <slot></slot
      ><!-- 插槽放置按钮 -->
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array,
  }, //接受参数
};
</script>

<style>
</style>