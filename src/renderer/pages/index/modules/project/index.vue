<template>
  <div class="project-wrapper">
    <p class="project-desc">暂无项目，请先打开项目或创建项目</p>
    <div class="project-section">
      <el-button round icon="el-icon-fa-folder-open-o" size="mini">打开项目</el-button>
      <el-button round type="primary" icon="el-icon-fa-plus" size="mini">创建项目</el-button>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.project-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 40px);
}

.project-desc {
  margin-bottom: 16px;
  text-align: center;
}

.project-section {
  text-align: center;
}
</style>


