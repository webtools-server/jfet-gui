<template lang="html">
  <el-breadcrumb separator="/">
    <span class="breadcrumb-loc">位置：</span>
    <el-breadcrumb-item v-for="item in breadcrumbs" :to="item">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'tp-breadcrumb',

  data() {
    return {
      breadcrumbs: []
    };
  },

  mounted() {
    this.breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || [];
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb-loc {
  float: left;
}
</style>
